import { prisma } from "@/app/lib/prisma"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import { redirect } from "next/navigation"
import Link from "next/link"
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

export const dynamic = 'force-dynamic'

interface FinancePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function FinancePage({ searchParams }: FinancePageProps) {
  const headerList = await headers()
  const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
  if (!token) redirect('/login')

  let tenantId = ''
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    tenantId = payload.tenantId as string
  } catch (error) { redirect('/login') }

  const params = await searchParams
  const filterMonth = typeof params.month === 'string' ? parseInt(params.month) : 0 
  const filterProId = typeof params.proId === 'string' ? params.proId : 'all'

  // Datas do Período
  const targetDate = subMonths(new Date(), filterMonth)
  const startDate = startOfMonth(targetDate)
  const endDate = endOfMonth(targetDate)

  // 1. Preparamos a regra do filtro antes de perguntar ao banco
  const whereCondition: any = {
    tenantId,
    date: { gte: startDate, lte: endDate },
    status: 'DONE' 
  }
  if (filterProId !== 'all') whereCondition.professionalId = filterProId

  // 2. DISPARO EM PARALELO (Aumenta a velocidade de navegação)
  const [professionals, appointments] = await Promise.all([
    prisma.professional.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' }
    }),
    prisma.appointment.findMany({
      where: whereCondition,
      include: { services: true, professional: true, customer: true },
      orderBy: { date: 'desc' }
    })
  ])

  // CÁLCULO DE SEGURANÇA (Regra #4)
  const totalRevenue = appointments.reduce((acc, appt) => 
    acc + appt.services.reduce((sAcc, s) => sAcc + Number(s.price), 0), 0)

  const monthsOptions = [0, 1, 2].map(m => ({
    value: m,
    label: format(subMonths(new Date(), m), "MMMM", { locale: ptBR })
  }))

  const currentMonthLabel = monthsOptions.find(m => m.value === filterMonth)?.label
  const currentProLabel = filterProId === 'all' ? 'Todos' : professionals.find(p => p.id === filterProId)?.name.split(' ')[0]

  return (
    <div className="min-h-[100dvh] bg-slate-50 p-4 md:p-12 font-sans text-slate-800 overflow-x-hidden">
      <div className="max-w-md mx-auto md:max-w-2xl">
        
        {/* CABEÇALHO PADRÃO COM BOTÃO ACIMA E TÍTULO RETO */}
        <div className="flex flex-col items-start gap-4 mb-8">
            <Link 
              href="/admin" 
              prefetch={true}
              className="group h-[40px] px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Voltar</span>
            </Link>
            
            <div>
                 <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                   Extrato de Serviços
                 </h1>
                 <p className="text-slate-500 text-xs md:text-sm mt-1">Acompanhe seu faturamento e atendimentos realizados.</p>
            </div>
        </div>

        {/* Seletores Dropdown com Auto-Close em Branco Clean */}
        <div className="flex gap-3 mb-8">
            <details className="relative flex-1 group" key={`month-${filterMonth}`}>
                <summary className="list-none bg-white border border-slate-200 p-4 rounded-3xl flex items-center justify-between cursor-pointer group-open:border-blue-500/50 transition-all shadow-sm select-none">
                    <div className="flex flex-col text-left">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Mês Referência</span>
                        <span className="font-bold text-slate-900 capitalize text-sm">{currentMonthLabel}</span>
                    </div>
                    <span className="text-blue-600 text-[10px] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="absolute top-[110%] left-0 right-0 bg-white border border-slate-200 rounded-3xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {monthsOptions.map((m) => (
                        <Link key={m.value} href={`/admin/faturamento?month=${m.value}&proId=${filterProId}`} prefetch={true} className="block px-6 py-4 text-sm font-bold border-b border-slate-100 last:border-0 hover:bg-blue-50 hover:text-blue-600 text-slate-700 capitalize transition-all">
                            {m.label}
                        </Link>
                    ))}
                </div>
            </details>

            <details className="relative flex-1 group" key={`pro-${filterProId}`}>
                <summary className="list-none bg-white border border-slate-200 p-4 rounded-3xl flex items-center justify-between cursor-pointer group-open:border-blue-500/50 transition-all shadow-sm select-none">
                    <div className="flex flex-col text-left">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Especialista</span>
                        <span className="font-bold text-slate-900 text-sm">{currentProLabel}</span>
                    </div>
                    <span className="text-blue-600 text-[10px] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="absolute top-[110%] left-0 right-0 bg-white border border-slate-200 rounded-3xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link href={`/admin/faturamento?month=${filterMonth}&proId=all`} prefetch={true} className="block px-6 py-4 text-sm font-bold border-b border-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-all">Todos</Link>
                    {professionals.map(pro => (
                        <Link key={pro.id} href={`/admin/faturamento?month=${filterMonth}&proId=${pro.id}`} prefetch={true} className="block px-6 py-4 text-sm font-bold border-b border-slate-100 last:border-0 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-all">
                            {pro.name}
                        </Link>
                    ))}
                </div>
            </details>
        </div>

        {/* Card de Faturamento (Visual Azul Royal da Dashboard) */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 rounded-[2.5rem] p-8 overflow-hidden shadow-[0_15px_35px_-5px_rgba(37,99,235,0.3)] mb-12 text-white border border-white/10">
            <div className="absolute -right-6 -top-6 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] mb-2">Total Realizado ({currentProLabel})</p>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-200">R$</span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
            </div>
            <div className="mt-6 flex items-center gap-3">
                <div className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-white font-black uppercase tracking-widest">{appointments.length} Atendimentos</span>
                </div>
            </div>
        </div>

        {/* Histórico Detalhado */}
        <div className="space-y-4 pb-24">
            <div className="flex items-center justify-between px-2 mb-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Linha do Tempo</h3>
                <div className="h-[1px] flex-1 bg-slate-200 ml-4"></div>
            </div>
            
            {appointments.length > 0 ? (
                appointments.map((appt) => {
                    const dataZonada = toZonedTime(appt.date, 'America/Sao_Paulo')
                    const valorTotal = appt.services.reduce((s, serv) => s + Number(serv.price), 0)
                    
                    return (
                        <div key={appt.id} className="bg-white border border-slate-100/80 p-6 rounded-[2.2rem] flex items-center justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.12)] transition-all group">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                    {format(dataZonada, "dd 'de' MMMM", { locale: ptBR })}
                                </span>
                                <h4 className="font-bold text-slate-900 text-lg tracking-tight leading-none">{appt.customer.name}</h4>
                                
                                <div className="flex flex-col gap-1.5 mt-1">
                                    {appt.services.map(s => (
                                        <span key={s.id} className="text-xs text-slate-600 font-medium flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0"></span>
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-right flex flex-col items-end gap-2">
                                <span className="text-emerald-600 font-black text-xl tracking-tighter">
                                    R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                                <div className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-1.5 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                                    <span className="text-[10px] text-slate-700 font-black uppercase tracking-wider">
                                        {appt.professional.name.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 text-2xl text-slate-400">📑</div>
                    <p className="text-slate-700 font-black text-xs uppercase tracking-widest">Sem movimentação</p>
                    <p className="text-slate-400 text-[10px] mt-2 italic px-10">Filtre por outro profissional ou mês para ver resultados.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  )
}