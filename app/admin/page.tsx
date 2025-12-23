import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import { redirect } from "next/navigation"
import LogoutButton from "./logout-button"
import AppointmentRow from "./appointment-row"

export const dynamic = 'force-dynamic'

interface AdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminDashboard({ searchParams }: AdminPageProps) {
  // 1. Autenticação
  const headerList = await headers()
  const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]

  if (!token) redirect('/login')

  let tenantId = ''
  let tenantName = ''
  let tenantSlug = ''
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    tenantId = payload.tenantId as string
    
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId }})
    tenantName = tenant?.name || 'Sua Empresa'
    tenantSlug = tenant?.slug || ''
  } catch (error) {
    redirect('/login')
  }

  // 2. Filtros (Abas)
  const params = await searchParams
  const filterProId = typeof params.proId === 'string' ? params.proId : undefined

  // Busca Profissionais
  const professionals = await prisma.professional.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' }
  })

  // 3. Busca Agendamentos
  const whereCondition: any = { 
    tenantId: tenantId, 
    date: { gte: new Date() } // Apenas futuros
  }
  
  // Se tiver um ID selecionado na aba, filtra só ele. Se não, traz tudo.
  if (filterProId && filterProId !== 'all') {
    whereCondition.professionalId = filterProId
  }

  const rawAppointments = await prisma.appointment.findMany({
    where: whereCondition,
    orderBy: { date: 'asc' },
    include: { customer: true, services: true, professional: true, tenant: true }
  })

  // 4. CORREÇÃO DECIMAL (Preço para String)
  const appointments = rawAppointments.map(appt => ({
    ...appt,
    services: appt.services.map(s => ({
      ...s,
      price: s.price.toString()
    }))
  }))

  // 5. Faturamento
  const totalRevenue = appointments.reduce((total, appt) => {
    const apptTotal = appt.services.reduce((sum, s) => sum + Number(s.price), 0)
    return total + apptTotal
  }, 0)

  const shareUrl = `${process.env.NEXT_PUBLIC_URL || 'https://agenda-inteligente.vercel.app'}/${tenantSlug}`
  
  // REGRA ATUALIZADA: Mostra abas sempre que houver profissionais cadastrados
  const showTabs = professionals.length > 0 

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Painel do Dono 🎩</h1>
                <p className="text-sm text-gray-500">Bem-vindo, {tenantName}</p>
            </div>
            
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <span className="text-[10px] uppercase font-bold text-gray-400">Seu Link</span>
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg border border-gray-200 w-full md:w-auto">
                    <code className="text-xs text-blue-600 font-mono truncate max-w-[200px]">{shareUrl}</code>
                    <a href={`/${tenantSlug}`} target="_blank" className="bg-white px-3 py-1 rounded border text-xs font-bold hover:bg-gray-50">Abrir ↗</a>
                </div>
            </div>
             <LogoutButton />
        </div>

        {/* ATALHOS & KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/admin/servicos" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 transition-all flex flex-col items-center justify-center gap-2 group">
                <span className="text-3xl">✂️</span>
                <span className="font-bold text-gray-700">Serviços</span>
            </Link>
            
            <Link href="/admin/profissionais" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-500 transition-all flex flex-col items-center justify-center gap-2 group">
                <span className="text-3xl">💈</span>
                <span className="font-bold text-gray-700">Equipe</span>
            </Link>
            
            <Link href="/admin/configuracoes" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-500 transition-all flex flex-col items-center justify-center gap-2 group">
                <span className="text-3xl">⚙️</span>
                <span className="font-bold text-gray-700">Configurações</span>
            </Link>
            
            <div className="bg-zinc-900 px-6 py-2 rounded-xl shadow-lg border border-gray-800 flex flex-col items-center justify-center text-white">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Faturamento Previsto</span>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-green-400">R$ {totalRevenue.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">{appointments.length} agendamentos</span>
                </div>
            </div>
        </div>

        {/* --- ABAS DE NAVEGAÇÃO POR PROFISSIONAL --- */}
        {showTabs && (
            <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Filtrar Agenda por Profissional:</p>
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {/* Botão TODOS */}
                    <Link 
                        href="/admin" 
                        className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm
                        ${!filterProId || filterProId === 'all' 
                            ? 'bg-black text-white ring-2 ring-black ring-offset-2' 
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                    >
                        Todos
                    </Link>

                    {/* Botões dos PROFISSIONAIS */}
                    {professionals.map(pro => (
                        <Link 
                            key={pro.id} 
                            href={`/admin?proId=${pro.id}`}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm flex items-center gap-2
                            ${filterProId === pro.id 
                                ? 'bg-black text-white ring-2 ring-black ring-offset-2' 
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <span>{pro.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        )}

        {/* TABELA */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
           <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase">Data</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase">Cliente</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase">Serviços</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase">Pro</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.length === 0 ? (
                    <tr><td colSpan={5} className="p-10 text-center text-gray-400">
                        {filterProId ? 'Nenhum agendamento para este profissional.' : 'Nenhum agendamento futuro encontrado.'}
                    </td></tr>
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