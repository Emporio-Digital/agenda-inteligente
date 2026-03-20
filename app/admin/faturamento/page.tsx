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

  const professionals = await prisma.professional.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' }
  })

  // --- LÓGICA DE FILTRO CORRIGIDA (INTEGRALIDADE TOTAL) ---
  const whereCondition: any = {
    tenantId,
    date: { gte: startDate, lte: endDate },
    status: 'DONE' 
  }

  // Se o filtro não for 'all', injeta o ID do profissional na busca
  if (filterProId !== 'all') {
    whereCondition.professionalId = filterProId
  }

  const appointments = await prisma.appointment.findMany({
    where: whereCondition,
    include: { services: true, professional: true, customer: true },
    orderBy: { date: 'desc' }
  })

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
    <div className="min-h-[100dvh] bg-slate-950 p-4 md:p-12 font-sans text-slate-200 overflow-x-hidden">
      <div className="max-w-md mx-auto md:max-w-2xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <Link href="/admin" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-lg">
            ←
          </Link>
          <h1 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">Extrato de Serviços</h1>
          <div className="w-10 h-10"></div>
        </div>

        {/* Seletores Dropdown com Auto-Close (via key reset) */}
        <div className="flex gap-3 mb-8">
            <details className="relative flex-1 group" key={`month-${filterMonth}`}>
                <summary className="list-none bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-3xl flex items-center justify-between cursor-pointer group-open:border-blue-500/50 transition-all shadow-2xl select-none">
                    <div className="flex flex-col text-left">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Mês Referência</span>
                        <span className="font-bold text-white capitalize text-sm">{currentMonthLabel}</span>
                    </div>
                    <span className="text-blue-500 text-[10px] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="absolute top-[110%] left-0 right-0 bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {monthsOptions.map((m) => (
                        <Link key={m.value} href={`/admin/faturamento?month=${m.value}&proId=${filterProId}`} className="block px-6 py-4 text-sm font-bold border-b border-slate-800/50 last:border-0 hover:bg-blue-600 hover:text-white capitalize transition-all">
                            {m.label}
                        </Link>
                    ))}
                </div>
            </details>

            <details className="relative flex-1 group" key={`pro-${filterProId}`}>
                <summary className="list-none bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-3xl flex items-center justify-between cursor-pointer group-open:border-purple-500/50 transition-all shadow-2xl select-none">
                    <div className="flex flex-col text-left">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Especialista</span>
                        <span className="font-bold text-white text-sm">{currentProLabel}</span>
                    </div>
                    <span className="text-purple-500 text-[10px] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="absolute top-[110%] left-0 right-0 bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link href={`/admin/faturamento?month=${filterMonth}&proId=all`} className="block px-6 py-4 text-sm font-bold border-b border-slate-800/50 hover:bg-purple-600 hover:text-white transition-all">Todos</Link>
                    {professionals.map(pro => (
                        <Link key={pro.id} href={`/admin/faturamento?month=${filterMonth}&proId=${pro.id}`} className="block px-6 py-4 text-sm font-bold border-b border-slate-800/50 last:border-0 hover:bg-purple-600 hover:text-white transition-all">
                            {pro.name}
                        </Link>
                    ))}
                </div>
            </details>
        </div>

        {/* Card de Faturamento (Visual App de Banco) */}
        <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-[1px] rounded-[2.5rem] shadow-2xl shadow-blue-900/20 mb-12">
            <div className="bg-slate-950 rounded-[2.5rem] p-8 overflow-hidden relative">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Total Realizado ({currentProLabel})</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-500">R$</span>
                    <h2 className="text-5xl font-black text-white tracking-tighter">
                        {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="mt-6 flex items-center gap-3">
                    <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">{appointments.length} Atendimentos</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Histórico Detalhado */}
        <div className="space-y-4 pb-24">
            <div className="flex items-center justify-between px-2 mb-6">
                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Linha do Tempo</h3>
                <div className="h-[1px] flex-1 bg-slate-900 ml-4"></div>
            </div>
            
            {appointments.length > 0 ? (
                appointments.map((appt) => {
                    const dataZonada = toZonedTime(appt.date, 'America/Sao_Paulo')
                    const valorTotal = appt.services.reduce((s, serv) => s + Number(serv.price), 0)
                    
                    return (
                        <div key={appt.id} className="bg-slate-900/30 border border-slate-900 p-6 rounded-[2.2rem] flex items-center justify-between hover:bg-slate-900/60 transition-all group">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                    {format(dataZonada, "dd 'de' MMMM", { locale: ptBR })}
                                </span>
                                <h4 className="font-bold text-white text-lg tracking-tight leading-none">{appt.customer.name}</h4>
                                
                                {/* AJUSTE: ITENS MAIS VISÍVEIS */}
                                <div className="flex flex-col gap-1.5 mt-1">
                                    {appt.services.map(s => (
                                        <span key={s.id} className="text-xs text-slate-300 font-medium flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-right flex flex-col items-end gap-2">
                                <span className="text-white font-black text-xl tracking-tighter">
                                    R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                                <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl">
                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter italic">
                                        {appt.professional.name.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div className="text-center py-24 bg-slate-900/10 border-2 border-dashed border-slate-900/50 rounded-[3rem]">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800 text-2xl opacity-20">📑</div>
                    <p className="text-slate-600 font-black text-xs uppercase tracking-widest">Sem movimentação</p>
                    <p className="text-slate-700 text-[10px] mt-2 italic px-10">Filtre por outro profissional ou mês para ver resultados.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  )
}