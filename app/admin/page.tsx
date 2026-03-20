import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import { redirect } from "next/navigation"
import LogoutButton from "./logout-button"
import AppointmentRow from "./appointment-row"
import HeaderActions from "./header-actions" 

export const dynamic = 'force-dynamic'

// --- DICIONÁRIO ORIGINAL (RESTAURADO 100%) ---
const ADMIN_THEMES: any = {
  BARBER: { serviceIcon: "✂️", serviceName: "Cortes/Serviços", proIcon: "💈", proName: "Barbeiros", bgGradient: "from-blue-900 to-slate-900" },
  BEAUTY: { serviceIcon: "💅", serviceName: "Procedimentos", proIcon: "👩‍", proName: "Especialistas", bgGradient: "from-pink-900 to-slate-900" },
  TATTOO: { serviceIcon: "🐉", serviceName: "Sessões", proIcon: "🎨", proName: "Tatuadores", bgGradient: "from-purple-900 to-slate-900" },
  CLINIC: { serviceIcon: "⚕️", serviceName: "Exames", proIcon: "🩺", proName: "Doutores", bgGradient: "from-teal-900 to-slate-900" },
  PHOTOGRAPHY: { serviceIcon: "📸", serviceName: "Ensaios", proIcon: "📷", proName: "Fotógrafos", bgGradient: "from-neutral-800 to-slate-950" },
  PROFESSIONAL: { serviceIcon: "💼", serviceName: "Consultorias", proIcon: "👔", proName: "Consultores", bgGradient: "from-slate-800 to-slate-950" },
  RESTAURANT: { serviceIcon: "📅", serviceName: "Reservas", proIcon: "🍽️", proName: "Unidades", bgGradient: "from-stone-800 to-stone-950" }
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
  let themeVariant = 'BARBER' 
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

  const themeConfig = ADMIN_THEMES[themeVariant] || ADMIN_THEMES.BARBER

  const now = new Date()
  const diffTime = Math.abs(now.getTime() - createdAt.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const isExpired = subscriptionStatus !== 'ACTIVE' && diffDays > 3

  if (isExpired) {
    return (
      <div className="min-h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <div className="text-5xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2 text-sans">Acesso Expirado</h1>
          <Link href="/admin/configuracoes" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl mt-4">Ver Planos</Link>
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

  // --- AGENDA FUTURA (FILTRADA) ---
  const todayRef = new Date()
  todayRef.setHours(0, 0, 0, 0)

  const whereCondition: any = { 
    tenantId: tenantId, 
    date: { gte: todayRef },
    status: 'SCHEDULED'
  }
  
  if (filterProId && filterProId !== 'all') whereCondition.professionalId = filterProId

  const rawAppointments = await prisma.appointment.findMany({
    where: whereCondition,
    orderBy: { date: 'asc' },
    include: { customer: true, services: true, professional: true }
  })

  const appointments = rawAppointments.map(appt => ({
    ...appt,
    services: appt.services.map(s => ({ ...s, price: String(s.price) }))
  }))

  // --- LÓGICA DE FATURAMENTO (FILTRADA POR MÊS E PRO) ---
  const realizedWhere: any = {
    tenantId,
    status: 'DONE',
    date: {
      gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
    }
  }

  if (filterProId && filterProId !== 'all') realizedWhere.professionalId = filterProId

  const realizedAppts = await prisma.appointment.findMany({
    where: realizedWhere,
    include: { services: true }
  })

  const totalRealizedRevenue = realizedAppts.reduce((total, appt) => {
    return total + appt.services.reduce((sum, s) => sum + Number(s.price), 0)
  }, 0)

  const shareUrl = `${process.env.NEXT_PUBLIC_URL || 'https://agenda-inteligente.vercel.app'}/${tenantSlug}`
  const currentProName = filterProId && filterProId !== 'all' 
    ? professionals.find(p => p.id === filterProId)?.name.split(' ')[0] 
    : 'Todos';

  return (
    <div className="min-h-[100dvh] bg-slate-950 p-6 md:p-12 font-sans text-slate-200 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER INOVADOR (CURTIDO PELO SÓCIO) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="w-full text-center md:text-left">
                <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">{tenantName}</h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Dashboard Ativa</p>
                </div>
            </div>
        </div>

        {/* MENU "CENTRAL DE COMANDO" (CURTIDO PELO SÓCIO) */}
        <div className="mb-12">
            <input type="checkbox" id="toggle-dashboard-menu" className="peer sr-only" />
            
            <label 
                htmlFor="toggle-dashboard-menu" 
                className="relative flex items-center justify-between px-8 py-5 bg-slate-900 border border-slate-800 rounded-[2.5rem] cursor-pointer hover:border-blue-500/50 transition-all shadow-2xl group overflow-hidden"
            >
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40 group-hover:rotate-6 transition-transform">
                        <span className="text-white text-xl">🚀</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black uppercase tracking-tighter text-lg leading-none">Central de Comando</span>
                        <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Gerenciamento</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                    <span className="text-slate-500 group-hover:text-white transition-transform duration-500 peer-checked:rotate-180">↓</span>
                </div>
            </label>

            {/* CONTEÚDO EXPANSÍVEL COM DESIGN ORIGINAL (IDÊNTICO) */}
            <div className="grid grid-cols-1 overflow-hidden transition-all duration-500 max-h-0 opacity-0 peer-checked:max-h-[1000px] peer-checked:opacity-100 peer-checked:mt-8">
                
                <div className="flex gap-3 items-center mb-8 pb-6 border-b border-slate-800 w-full md:w-auto">
                     <HeaderActions shareUrl={shareUrl} tenantSlug={tenantSlug} />
                     <div className="pl-4 border-l border-slate-800">
                        <LogoutButton />
                     </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-2">
                    {/* CARDS COM DESIGN ORIGINAL RESTAURADO */}
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

                    <Link href="/admin/faturamento" className={`bg-gradient-to-br ${themeConfig.bgGradient} p-6 rounded-3xl shadow-lg shadow-blue-900/20 text-white relative overflow-hidden border border-white/10 group hover:-translate-y-1 transition-all`}>
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                        <p className="text-[10px] font-black opacity-70 uppercase tracking-widest mb-2">Faturamento ({currentProName})</p>
                        {/* AJUSTE VISUAL: text-2xl no mobile para não bater na borda */}
                        <p className="text-2xl md:text-3xl font-black text-white">R$ {totalRealizedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p className="text-xs text-white/60 mt-2 border-t border-white/10 pt-2 inline-block">Ver Extrato Detalhado →</p>
                    </Link>
                </div>
            </div>
        </div>

        {/* AGENDA FUTURA */}
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-white uppercase italic tracking-tighter">Agenda Futura</h2>
                </div>
                
                {professionals.length > 0 && (
                    <details className="relative group" key={filterProId || 'default'}>
                        <summary className="list-none bg-slate-900 text-white border border-slate-800 px-5 py-2.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-blue-500/50 transition-all select-none">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Filtrar:</span>
                            <span className="font-bold text-sm text-blue-400">{currentProName}</span>
                            <span className="text-xs text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        
                        <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-2">
                            <Link 
                                href="/admin" 
                                className={`px-5 py-4 text-sm font-bold border-b border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-between ${!filterProId || filterProId === 'all' ? 'text-blue-400' : 'text-slate-400'}`}
                            >
                                Todos
                                {(!filterProId || filterProId === 'all') && <span>✓</span>}
                            </Link>
                            {professionals.map(pro => (
                                <Link 
                                    key={pro.id} 
                                    href={`/admin?proId=${pro.id}`} 
                                    className={`px-5 py-4 text-sm font-bold border-b border-slate-800 last:border-0 hover:bg-slate-800 transition-colors flex items-center justify-between ${filterProId === pro.id ? 'text-blue-400' : 'text-slate-400'}`}
                                >
                                    {pro.name}
                                    {filterProId === pro.id && <span>✓</span>}
                                </Link>
                            ))}
                        </div>
                    </details>
                )}
            </div>

            <div className="overflow-x-auto pb-20">
                <table className="w-full border-separate border-spacing-y-4">
                    <thead className="text-left">
                        <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <th className="pl-6 pb-2">Horário/Data</th>
                            <th className="pb-2">Cliente</th>
                            <th className="pb-2">Item</th>
                            <th className="pb-2">Profissional</th>
                            <th className="pr-6 pb-2 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="bg-slate-900 rounded-[2rem] p-12 text-center border border-slate-800">
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sem agendamentos para este filtro</p>
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