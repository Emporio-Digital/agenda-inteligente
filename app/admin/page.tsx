import { prisma } from "../lib/prisma"

// Essa página não terá cache
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' },
    include: {
      customer: true,
      service: true,
      professional: true,
      tenant: true // Precisamos dos dados da barbearia pra mensagem
    }
  })

  // Função simples para limpar telefone (deixar só números)
  // Como estamos num Server Component, isso roda no servidor rapidinho
  const cleanPhone = (phone: string) => phone.replace(/\D/g, '')

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Painel do Dono 🎩</h1>
            <p className="text-gray-500">Gestão de Agendamentos</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow text-sm border border-gray-200">
            Total na Agenda: <strong>{appointments.length}</strong>
          </div>
        </div>

        {/* Lista de Agendamentos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Data</th>
                <th className="p-4 font-semibold text-gray-600">Cliente</th>
                <th className="p-4 font-semibold text-gray-600">Serviço</th>
                <th className="p-4 font-semibold text-gray-600">Profissional</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800">
              {appointments.map((appt) => {
                const dataObj = new Date(appt.date)
                const dia = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                
                // Mensagem pronta para o WhatsApp
                const msg = `Olá ${appt.customer.name}, passando para confirmar seu agendamento na ${appt.tenant.name} para o dia ${dia} às ${hora}. Tudo certo?`
                const zapLink = `https://wa.me/55${cleanPhone(appt.customer.phone)}?text=${encodeURIComponent(msg)}`

                return (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-lg text-blue-600">{dia}</div>
                      <div className="text-gray-500 font-medium">{hora}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold">{appt.customer.name}</div>
                      <div className="text-xs text-gray-400">{appt.customer.phone}</div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{appt.service.name}</td>
                    <td className="p-4 flex items-center gap-2">
                      {appt.professional.photoUrl ? (
                          <img src={appt.professional.photoUrl} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">✂️</div>
                      )}
                      <span className="text-sm">{appt.professional.name}</span>
                    </td>
                    
                    {/* COLUNA DE AÇÕES (BOTÃO ZAP) */}
                    <td className="p-4 text-center">
                        <a 
                            href={zapLink}
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-bold transition-transform hover:scale-105 shadow-sm"
                            title="Enviar confirmação no WhatsApp"
                        >
                            <span>💬 Confirmar</span>
                        </a>
                    </td>
                  </tr>
                )
              })}

              {appointments.length === 0 && (
                <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-500">
                        Nenhum agendamento encontrado.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}