import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import { redirect } from "next/navigation"
import LogoutButton from "./logout-button"
import AppointmentRow from "./appointment-row"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
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

  const appointments = await prisma.appointment.findMany({
    where: { tenantId: tenantId, date: { gte: new Date() } },
    orderBy: { date: 'asc' },
    include: { customer: true, services: true, professional: true, tenant: true }
  })

  // URL DE COMPARTILHAMENTO
  // Nota: Em produção, isso pega o domínio real. Localmente pega localhost.
  const shareUrl = `${process.env.NEXT_PUBLIC_URL || 'https://agenda-inteligente-five.vercel.app'}/${tenantSlug}`

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & LINK DE COMPARTILHAMENTO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Painel do Dono 🎩</h1>
                <p className="text-sm text-gray-500">Bem-vindo, {tenantName}</p>
            </div>
            
            {/* BOX DO LINK PARA COPIAR */}
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <span className="text-[10px] uppercase font-bold text-gray-400">Seu Link de Agendamento</span>
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg border border-gray-200 w-full md:w-auto">
                    <code className="text-xs text-blue-600 font-mono truncate max-w-[200px] md:max-w-xs">{shareUrl}</code>
                    <a href={`/${tenantSlug}`} target="_blank" className="bg-white px-3 py-1 rounded border text-xs font-bold hover:bg-gray-50">
                        Abrir ↗
                    </a>
                </div>
            </div>
             <LogoutButton />
        </div>

        {/* ATALHOS */}
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
            
            <div className="bg-white px-6 py-2 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Agendados</span>
                <span className="text-3xl font-black text-blue-600">{appointments.length}</span>
            </div>
        </div>

        {/* TABELA */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
           {/* ... Mantive a tabela igual ... */}
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
                    <tr><td colSpan={5} className="p-10 text-center text-gray-400">Sem agendamentos futuros.</td></tr>
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