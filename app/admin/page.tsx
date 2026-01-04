import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import { redirect } from "next/navigation"
import LogoutButton from "./logout-button"
import AppointmentRow from "./appointment-row"

export const dynamic = 'force-dynamic'

// --- DICIONÁRIO DE ÍCONES DO ADMIN ---
const ADMIN_THEMES: any = {
  BARBER: { serviceIcon: "✂️", serviceName: "Cortes/Serviços", proIcon: "💈", proName: "Barbeiros", bgGradient: "from-blue-900 to-slate-900" },
  BEAUTY: { serviceIcon: "💅", serviceName: "Procedimentos", proIcon: "👩‍", proName: "Especialistas", bgGradient: "from-pink-900 to-slate-900" },
  TATTOO: { serviceIcon: "🐉", serviceName: "Sessões", proIcon: "🎨", proName: "Tatuadores", bgGradient: "from-purple-900 to-slate-900" },
  CLINIC: { serviceIcon: "⚕️", serviceName: "Exames", proIcon: "🩺", proName: "Doutores", bgGradient: "from-teal-900 to-slate-900" },
  PHOTOGRAPHY: { serviceIcon: "📸", serviceName: "Ensaios", proIcon: "📷", proName: "Fotógrafos", bgGradient: "from-neutral-800 to-slate-950" },
  PROFESSIONAL: { serviceIcon: "💼", serviceName: "Consultorias", proIcon: "👔", proName: "Consultores", bgGradient: "from-slate-800 to-slate-950" }
}

interface AdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminDashboard({ searchParams }: AdminPageProps) {
  const headerList = await headers()
  const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]

  if (!token) redirect('/login')

  let tenantId = ''
  let tenantName = ''
  let tenantSlug = ''
  let subscriptionStatus = 'TRIAL'
  let themeVariant = 'BARBER' // Default
  let createdAt = new Date()
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    tenantId = payload.tenantId as string
    
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId }})
    if (!tenant) throw new Error("Tenant not found")

    tenantName = tenant.name
    tenantSlug = tenant.slug
    subscriptionStatus = tenant.subscriptionStatus || 'TRIAL'
    themeVariant = tenant.themeVariant || 'BARBER'
    createdAt = new Date(tenant.createdAt)
  } catch (error) {
    redirect('/login')
  }

  // Config do Tema Atual
  const themeConfig = ADMIN_THEMES[themeVariant] || ADMIN_THEMES.BARBER

  const now = new Date()
  const diffTime = Math.abs(now.getTime() - createdAt.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const isExpired = subscriptionStatus !== 'ACTIVE' && diffDays > 3

  if (isExpired) {
    return (
      <div className="min-h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <div className="text-5xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Acesso Expirado</h1>
          <p className="text-slate-400 mb-8">O período de testes acabou. Assine para desbloquear.</p>
          <Link href="/admin/configuracoes" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">Ver Planos</Link>
        </div>
      </div>
    )
  }

  const params = await searchParams
  const filterProId = typeof params.proId === 'string' ? params.proId : undefined

  const professionals = await prisma.professional.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' }
  })

  const whereCondition: any = { 
    tenantId: tenantId, 
    date: { gte: new Date() }
  }
  
  if (filterProId && filterProId !== 'all') whereCondition.professionalId = filterProId

  const rawAppointments = await prisma.appointment.findMany({
    where: whereCondition,
    orderBy: { date: 'asc' },
    include: { customer: true, services: true, professional: true }
  })

  const appointments = rawAppointments.map(appt => ({
    ...appt,
    services: appt.services.map(s => ({ 
        ...s, 
        price: String(s.price) 
    }))
  }))

  const totalRevenue = appointments.reduce((total, appt) => {
    return total + appt.services.reduce((sum, s) => sum + Number(s.price), 0)
  }, 0)

  const shareUrl = `${process.env.NEXT_PUBLIC_URL || 'https://agenda-inteligente.vercel.app'}/${tenantSlug}`

  const currentProName = filterProId && filterProId !== 'all' 
    ? professionals.find(p => p.id === filterProId)?.name.split(' ')[0] 
    : 'Todos';

  return (
    // CORREÇÃO SCROLL: min-h-[100dvh] e overflow-x-hidden para evitar scroll lateral e borda branca
    <div className="min-h-[100dvh] bg-slate-950 p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="w-full md:w-auto">
                <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
                <p className="text-slate-400 font-medium">Gestão &bull; {tenantName}</p>
            </div>
            <div className="flex gap-4 items-center bg-slate-900 p-2 rounded-2xl shadow-lg border border-slate-800 w-full md:w-auto justify-between md:justify-start">
                 <div className="px-4 py-2">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Link Público</p>
                    <p className="text-blue-400 font-bold text-xs truncate max-w-[150px]">{shareUrl}</p>
                 </div>
                 <div className="flex gap-2">
                    <a href={`/${tenantSlug}`} target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors flex items-center h-10">
                        Ver Site ↗
                    </a>
                    <LogoutButton />
                 </div>
            </div>
        </div>

        {/* CARDS NAVEGAÇÃO DINÂMICOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            <Link href="/admin/servicos" className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 hover:border-blue-500/50 transition-all group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-slate-800 text-blue-400 rounded-2xl flex items-center justify-center text-2xl mb-4 relative z-10 border border-slate-700">
                    {themeConfig.serviceIcon}
                </div>
                <h3 className="font-bold text-white relative z-10">{themeConfig.serviceName}</h3>
                <p className="text-xs text-slate-400 mt-1 relative z-10">Editar preços</p>
            </Link>
            
            <Link href="/admin/profissionais" className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 hover:border-purple-500/50 transition-all group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-slate-800 text-purple-400 rounded-2xl flex items-center justify-center text-2xl mb-4 relative z-10 border border-slate-700">
                    {themeConfig.proIcon}
                </div>
                <h3 className="font-bold text-white relative z-10">{themeConfig.proName}</h3>
                <p className="text-xs text-slate-400 mt-1 relative z-10">Gestão de equipe</p>
            </Link>

            <Link href="/admin/configuracoes" className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 hover:border-orange-500/50 transition-all group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-orange-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 bg-slate-800 text-orange-400 rounded-2xl flex items-center justify-center text-2xl mb-4 relative z-10 border border-slate-700">⚙️</div>
                <h3 className="font-bold text-white relative z-10">Configurações</h3>
                <p className="text-xs text-slate-400 mt-1 relative z-10">Dados e Assinatura</p>
            </Link>

            <div className={`bg-gradient-to-br ${themeConfig.bgGradient} p-6 rounded-3xl shadow-lg shadow-blue-900/20 text-white relative overflow-hidden border border-white/10`}>
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-2">Faturamento Previsto</p>
                <p className="text-3xl font-black text-white">R$ {totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-slate-400 mt-2 border-t border-white/10 pt-2 inline-block">{appointments.length} agendamentos</p>
            </div>
        </div>

        {/* TABELA E FILTROS */}
        <div>
            <div className="flex items-center justify-between mb-6 relative z-30">
                <h2 className="text-xl font-bold text-white">Agenda Futura</h2>
                
                {professionals.length > 0 && (
                    /* CORREÇÃO DROPDOWN: key={filterProId} força o React a recriar o elemento ao mudar a URL, fechando o menu automaticamente */
                    <details className="relative group" key={filterProId || 'default'}>
                        <summary className="list-none bg-slate-900 text-white border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg hover:border-blue-500/50 transition-all select-none">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">Filtrar:</span>
                            <span className="font-bold text-sm text-blue-400">{currentProName}</span>
                            <span className="text-xs text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        
                        <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-2">
                            <Link 
                                href="/admin" 
                                className={`px-4 py-3 text-sm font-bold border-b border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-between ${!filterProId || filterProId === 'all' ? 'text-blue-400' : 'text-slate-400'}`}
                            >
                                Todos
                                {(!filterProId || filterProId === 'all') && <span>✓</span>}
                            </Link>
                            {professionals.map(pro => (
                                <Link 
                                    key={pro.id} 
                                    href={`/admin?proId=${pro.id}`} 
                                    className={`px-4 py-3 text-sm font-bold border-b border-slate-800 last:border-0 hover:bg-slate-800 transition-colors flex items-center justify-between ${filterProId === pro.id ? 'text-blue-400' : 'text-slate-400'}`}
                                >
                                    {pro.name.split(' ')[0]}
                                    {filterProId === pro.id && <span>✓</span>}
                                </Link>
                            ))}
                        </div>
                    </details>
                )}
            </div>

            <div className="overflow-x-auto pb-20">
                <table className="w-full border-separate border-spacing-y-3">
                    <thead className="text-left">
                        <tr>
                            <th className="pl-6 pb-2 text-xs font-bold text-slate-500 uppercase">Data</th>
                            <th className="pb-2 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                            <th className="pb-2 text-xs font-bold text-slate-500 uppercase">Item</th>
                            <th className="pb-2 text-xs font-bold text-slate-500 uppercase">Pro</th>
                            <th className="pr-6 pb-2 text-right text-xs font-bold text-slate-500 uppercase">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="bg-slate-900 rounded-2xl p-10 text-center shadow-sm border border-slate-800">
                                    <p className="text-slate-500 font-medium">Nenhum agendamento encontrado.</p>
                                </td>
                            </tr>
                        ) : (
                            appointments.map((appt) => <AppointmentRow key={appt.id} appt={appt} />)
                        )}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  )
}