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
  const isExpired = subscriptionStatus !== 'ACTIVE' && diffDays > 7

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
  const showPast = params.showPast === 'true'

  const todayRef = new Date()
  todayRef.setHours(0, 0, 0, 0)

  // Condições de filtro para Agenda
  const whereCondition: any = { 
    tenantId: tenantId, 
    date: showPast ? { lt: todayRef } : { gte: todayRef },
    status: 'SCHEDULED'
  }
  if (filterProId && filterProId !== 'all') whereCondition.professionalId = filterProId

  // Condições de filtro para Faturamento
  const realizedWhere: any = {
    tenantId,
    status: 'DONE',
    date: {
      gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
    }
  }
  if (filterProId && filterProId !== 'all') realizedWhere.professionalId = filterProId

  // BUSCA EM PARALELO (Otimizado)
  const [professionals, pendingPastCount, rawAppointments, realizedAppts] = await Promise.all([
    prisma.professional.findMany({ where: { tenantId }, orderBy: { name: 'asc' } }),
    prisma.appointment.count({ where: { tenantId, status: 'SCHEDULED', date: { lt: todayRef } } }),
    prisma.appointment.findMany({
      where: whereCondition,
      orderBy: { date: 'asc' },
      include: { customer: true, services: true, professional: true }
    }),
    prisma.appointment.findMany({
      where: realizedWhere,
      include: { services: true }
    })
  ])

  // Formatação de Preços (Seu padrão)
  const appointments = rawAppointments.map(appt => ({
    ...appt,
    services: appt.services.map(s => ({ ...s, price: String(s.price) }))
  }))

  // Cálculo de Faturamento (Seu padrão)
  const totalRealizedRevenue = realizedAppts.reduce((total, appt) => {
    return total + appt.services.reduce((sum, s) => sum + Number(s.price), 0)
  }, 0)

  const shareUrl = `https://egkairos.com.br/${tenantSlug}`
  const currentProName = filterProId && filterProId !== 'all' 
    ? professionals.find(p => p.id === filterProId)?.name.split(' ')[0] 
    : 'Todos';

  return (
    <div className="min-h-[100dvh] bg-slate-950 font-sans text-slate-200 overflow-x-hidden flex flex-col">
      
      {/* GATILHO DO MENU INVISÍVEL (MANTIDO INTACTO NA LÓGICA DO CSS) */}
      <input type="checkbox" id="toggle-dashboard-menu" className="peer sr-only" />

      {/* FAIXA SUPERIOR FIXA */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-5">
          {/* LOGO */}
          <img src="/logo.png" alt="Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
          
          <div className="relative flex flex-col pt-2">
            {/* NOME KAIRÓS - Adicionado pr-4 e leading-tight para não cortar */}
            <span className="font-black tracking-[-0.05em] text-3xl md:text-4xl uppercase italic leading-tight bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none pr-4">
              KAIRÓS
            </span>
            
            {/* FLASH DE LUZ AZUL */}
            <div className="relative w-full h-[2px] -mt-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#3b82f6]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full bg-blue-300 blur-[1px]"></div>
            </div>
          </div>
        </div>
        
        {/* MENU HAMBURGUER COM EFEITO NEON CONDICIONAL */}
        {/* MENU HAMBURGUER COM BORDA GIRATÓRIA */}
        <label 
          htmlFor="toggle-dashboard-menu" 
          className="cursor-pointer relative p-[2px] rounded-2xl overflow-hidden group flex items-center justify-center transition-all active:scale-95 shadow-xl"
        >
          {/* BRILHO GIRATÓRIO (SÓ ATIVA NA NOTIFICAÇÃO) */}
          {pendingPastCount > 0 && (
            <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#f59e0b_50%,transparent_70%)] animate-[spin_3s_linear_infinite]" />
          )}
          
          {/* CORPO DO BOTÃO - Ajustado para brilhar azul no hover quando estiver limpo */}
          <div className={`
            relative z-10 p-2.5 rounded-[calc(1rem-2px)] w-full h-full flex items-center justify-center transition-all
            ${pendingPastCount > 0 
              ? 'bg-slate-950' 
              : 'bg-slate-900 border border-slate-800 group-hover:bg-slate-800 group-hover:border-blue-500/50 shadow-[group-hover:0_0_15px_rgba(59,130,246,0.2)]'
            }
          `}>
            <svg className={`w-7 h-7 transition-colors ${pendingPastCount > 0 ? 'text-amber-500' : 'text-slate-300 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        </label>
      </header>

      {/* ÁREA DO MENU DESLIZANTE QUE ENVOLVE OS CARDS E BOTÕES */}
      <div className="w-full bg-slate-950 border-b border-slate-800 overflow-hidden transition-all duration-500 max-h-0 opacity-0 peer-checked:max-h-[1500px] peer-checked:opacity-100 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase italic">{tenantName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Kairós Ativo</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-center w-full md:w-auto">
                 <HeaderActions shareUrl={shareUrl} tenantSlug={tenantSlug} />
                 <div className="pl-4 border-l border-slate-800">
                    <LogoutButton />
                 </div>
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

                {pendingPastCount > 0 && (
                    <div className="mt-4 bg-amber-900/10 border border-amber-900/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-left w-full">
                            <div className="w-8 h-8 rounded-full bg-amber-900/50 flex items-center justify-center border border-amber-800 text-amber-500 shrink-0">⚠️</div>
                            <div>
                                <h4 className="text-amber-500 font-bold text-sm tracking-tight">Faturamento Retido</h4>
                                <p className="text-xs text-slate-400 mt-0.5">Você tem {pendingPastCount} atendimento(s) no passado sem confirmação.</p>
                            </div>
                        </div>
                        <Link href="/admin?showPast=true" className="w-full md:w-auto text-center px-6 py-2.5 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-600/30 text-amber-500 text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap">
                            Revisar
                        </Link>
                    </div>
                )}

          </div>
        </div>

        {/* AGENDA FUTURA (Com Wrapper para alinhar o layout perfeitamente) */}
        <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <h2 className={`text-xl font-bold uppercase italic tracking-tighter ${showPast ? 'text-amber-500' : 'text-white'}`}>
                      {showPast ? 'Pendentes (Passado)' : 'Sua Agenda'}
                  </h2>
                  {showPast && (
                      <Link href="/admin" className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg uppercase tracking-widest mt-2 flex items-center gap-2 transition-all w-max shadow-sm">
                          ← Voltar para Agenda
                      </Link>
                  )}
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
                    {appointments.length > 0 && (
                    <thead className="text-left">
                        <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <th className="pl-6 pb-2 whitespace-nowrap">Horário/Data</th>
                            <th className="pb-2 pl-7 whitespace-nowrap">Cliente</th>
                            <th className="pb-2 pl-7 whitespace-nowrap">Item</th>
                            {/* Ajuste final: pl-10 para alinhar o título com o avatar/nome do profissional */}
                            <th className="pb-2 pl-7 whitespace-nowrap">Profissional</th>
                            <th className="pr-6 pb-2 text-right">Ações</th>
                        </tr>
                    </thead>
                    )}
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