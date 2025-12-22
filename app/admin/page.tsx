import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import { redirect } from "next/navigation"
import LogoutButton from "./logout-button"
import AppointmentRow from "./appointment-row"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // 1. SEGURANÇA: Pegar dados do usuário logado
  const headerList = await headers()
  const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]

  if (!token) {
    redirect('/login')
  }

  let tenantId = ''
  let tenantName = ''
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    tenantId = payload.tenantId as string
    
    // Buscar nome da barbearia pra exibir
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId }})
    tenantName = tenant?.name || 'Sua Empresa'
  } catch (error) {
    redirect('/login')
  }

  // 2. BUSCA BLINDADA: Só traz dados DESTE tenant
  const appointments = await prisma.appointment.findMany({
    where: { 
        tenantId: tenantId, // <--- O SEGREDO DO SAAS
        date: { gte: new Date() } // Opcional: Mostra só futuros? Tire se quiser histórico
    },
    orderBy: { date: 'asc' },
    include: {
      customer: true,
      services: true,
      professional: true,
      tenant: true
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Painel do Dono 🎩</h1>
                <span className="bg-black text-white text-xs px-2 py-1 rounded uppercase font-bold">{tenantName}</span>
            </div>
            <p className="text-gray-500 mt-1">Gestão completa do seu negócio.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-2 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Na Agenda</span>
                <span className="text-2xl font-black text-blue-600">{appointments.length}</span>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* ATALHOS - AQUI ESTÁ O BOTÃO DE CONFIGURAÇÕES QUE FALTAVA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/admin/servicos" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <span className="text-3xl group-hover:scale-110 transition-transform">✂️</span>
                <span className="font-bold text-gray-700">Serviços</span>
            </Link>
            
            <Link href="/admin/profissionais" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <span className="text-3xl group-hover:scale-110 transition-transform">💈</span>
                <span className="font-bold text-gray-700">Equipe</span>
            </Link>

            {/* O BOTÃO NOVO 👇 */}
            <Link href="/admin/configuracoes" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <span className="text-3xl group-hover:scale-110 transition-transform">⚙️</span>
                <span className="font-bold text-gray-700">Configurações</span>
                <span className="text-[10px] text-gray-400">Cores, Logo e Tema</span>
            </Link>
            
            <a href={`/`} target="_blank" className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800 hover:bg-black hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer text-white">
                <span className="text-3xl group-hover:scale-110 transition-transform">👁️</span>
                <span className="font-bold">Ver Site</span>
            </a>
        </div>

        {/* TABELA */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Serviços</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Profissional</th>
                  <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-10 text-center text-gray-400">
                            Nenhum agendamento futuro encontrado.
                        </td>
                    </tr>
                ) : (
                    appointments.map((appt) => (
                        <AppointmentRow key={appt.id} appt={appt} />
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}