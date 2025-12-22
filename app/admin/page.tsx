import { prisma } from "../lib/prisma"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' },
    include: {
      customer: true,
      services: true, // MUDOU AQUI: services no plural
      professional: true,
      tenant: true
    }
  })

  const cleanPhone = (phone: string) => phone.replace(/\D/g, '')

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Painel do Dono 🎩</h1>
            <p className="text-gray-500 mt-1 text-lg">Visão geral e gestão da sua barbearia.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total na Agenda</span>
            <span className="text-3xl font-black text-blue-600">{appointments.length}</span>
          </div>
        </div>

        {/* ATALHOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/admin/servicos" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <span className="text-3xl group-hover:scale-110 transition-transform">✂️</span>
                <span className="font-bold text-gray-700">Serviços</span>
            </Link>
            
            <Link href="/admin/profissionais" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <span className="text-3xl group-hover:scale-110 transition-transform">💈</span>
                <span className="font-bold text-gray-700">Equipe</span>
            </Link>
        </div>

        {/* TABELA */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Data & Hora</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Serviços</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Profissional</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appt) => {
                  const dataObj = new Date(appt.date)
                  const dia = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                  const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                  
                  // MUDANÇA: Junta os nomes dos serviços (ex: Corte + Barba)
                  const servicosTexto = appt.services.map(s => s.name).join(' + ')

                  const msg = `Olá ${appt.customer.name}, confirmo seu agendamento de ${servicosTexto} na ${appt.tenant.name} dia ${dia} às ${hora}.`
                  const zapLink = `https://wa.me/55${cleanPhone(appt.customer.phone)}?text=${encodeURIComponent(msg)}`

                  return (
                    <tr key={appt.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="p-5">
                        <div className="flex flex-col">
                            <span className="font-black text-xl text-gray-800">{dia}</span>
                            <span className="text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded w-fit text-sm mt-1">{hora}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="font-bold text-gray-900 text-lg">{appt.customer.name}</div>
                        <div className="text-sm text-gray-400 font-mono mt-1">{appt.customer.phone}</div>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col gap-1">
                            {/* Renderiza cada serviço como uma etiqueta */}
                            {appt.services.map(s => (
                                <span key={s.id} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200 w-fit">
                                    {s.name}
                                </span>
                            ))}
                        </div>
                      </td>
                      <td className="p-5">
                          <span className="font-medium text-gray-700">{appt.professional.name}</span>
                      </td>
                      <td className="p-5 text-center">
                          <a href={zapLink} target="_blank" className="text-green-500 hover:text-green-700 font-bold flex items-center justify-center gap-1">
                              💬 Confirmar
                          </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}