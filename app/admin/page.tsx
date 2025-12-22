import { prisma } from "../lib/prisma"

// Essa página não terá cache (Dados sempre frescos)
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // Busca agendamentos ordenados por data (do mais próximo para o mais distante)
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' },
    include: {
      customer: true,
      service: true,
      professional: true,
      tenant: true
    }
  })

  // Função para limpar telefone (deixar só números para o link do Zap)
  const cleanPhone = (phone: string) => phone.replace(/\D/g, '')

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Painel do Dono 🎩</h1>
            <p className="text-gray-500 mt-1 text-lg">Visão geral dos agendamentos da rede.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total na Agenda</span>
            <span className="text-3xl font-black text-blue-600">{appointments.length}</span>
          </div>
        </div>

        {/* Lista de Agendamentos */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Data & Hora</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Serviço</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Profissional</th>
                  <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appt) => {
                  const dataObj = new Date(appt.date)
                  const dia = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                  const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                  
                  // Mensagem inteligente para o WhatsApp
                  const msg = `Olá ${appt.customer.name}, passando para confirmar seu agendamento na ${appt.tenant.name} para o dia ${dia} às ${hora}. Tudo certo?`
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
                        <div className="text-xs text-gray-300 mt-1">{appt.tenant.name}</div>
                      </td>
                      <td className="p-5">
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                            {appt.service.name}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          {appt.professional.photoUrl ? (
                              <img src={appt.professional.photoUrl} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="Foto Pro" />
                          ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm shadow-sm">✂️</div>
                          )}
                          <span className="font-medium text-gray-700">{appt.professional.name}</span>
                        </div>
                      </td>
                      
                      {/* BOTÃO ZAP */}
                      <td className="p-5 text-center">
                          <a 
                              href={zapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105 shadow-md group-hover:shadow-lg w-full md:w-auto"
                          >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                              <span>Confirmar</span>
                          </a>
                      </td>
                    </tr>
                  )
                })}

                {appointments.length === 0 && (
                  <tr>
                      <td colSpan={5} className="p-20 text-center flex flex-col items-center justify-center text-gray-500">
                          <div className="text-6xl mb-4">💤</div>
                          <p className="text-xl font-medium">Nenhum agendamento encontrado.</p>
                          <p className="text-sm mt-2">Divulgue o link da barbearia!</p>
                      </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}