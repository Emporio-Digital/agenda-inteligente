'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

export default function AppointmentRow({ appt }: { appt: any }) {
  const [status, setStatus] = useState(appt.status)
  const [loading, setLoading] = useState(false)

  // 💰 SOMA O VALOR TOTAL DOS SERVIÇOS
  const totalPrice = appt.services.reduce((acc: number, s: any) => acc + Number(s.price), 0)

  const handleCancel = async () => {
    if (!confirm('Tem certeza que deseja cancelar? O horário ficará livre imediatamente.')) return

    setLoading(true)
    try {
      // Chama a rota de DELETE
      const res = await fetch(`/api/admin/appointments/${appt.id}`, {
        method: 'DELETE', 
      })
      
      if (res.ok) {
        setStatus('CANCELED')
      } else {
        alert('Erro ao cancelar. Tente atualizar a página.')
      }
    } catch (error) {
      console.error(error)
      alert('Erro de conexão.')
    }
    setLoading(false)
  }

  // Se foi cancelado, remove da tela visualmente
  if (status === 'CANCELED') return null 

  // Ajuste de fuso para visualização correta (Mostra horário Brasil)
  const timeZone = 'America/Sao_Paulo'
  // Converte a data UTC do banco para o fuso do Brasil
  const dataObj = toZonedTime(appt.date, timeZone)
  
  const dia = format(dataObj, "dd/MM", { locale: ptBR })
  const hora = format(dataObj, "HH:mm", { locale: ptBR })
  const servicosTexto = appt.services.map((s: any) => s.name).join(' + ')
  
  // Link do WhatsApp
  const cleanPhone = (phone: string) => phone.replace(/\D/g, '')
  const zapLink = `https://wa.me/55${cleanPhone(appt.customer.phone)}?text=Olá ${appt.customer.name}, passando para confirmar seu horário de ${servicosTexto} dia ${dia} às ${hora}.`

  return (
    <tr className="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0 group">
      {/* Coluna DATA */}
      <td className="p-5">
        <div className="flex flex-col">
          <span className="font-black text-xl text-gray-800">{dia}</span>
          <span className="text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded w-fit text-sm mt-1">{hora}</span>
        </div>
      </td>
      
      {/* Coluna CLIENTE */}
      <td className="p-5">
        <div className="font-bold text-gray-900 text-lg">{appt.customer.name}</div>
        <div className="text-sm text-gray-400 font-mono mt-1">{appt.customer.phone}</div>
      </td>
      
      {/* Coluna SERVIÇOS E PREÇO */}
      <td className="p-5">
        <div className="flex flex-col gap-1 items-start">
          {appt.services.map((s: any) => (
            <span key={s.id} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-gray-200">
              {s.name}
            </span>
          ))}
          {/* AQUI ESTÁ O PREÇO */}
          <span className="mt-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200 shadow-sm">
            R$ {totalPrice.toFixed(2)}
          </span>
        </div>
      </td>
      
      {/* Coluna PROFISSIONAL */}
      <td className="p-5">
        <span className="font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
            {appt.professional.name}
        </span>
      </td>
      
      {/* Coluna AÇÕES */}
      <td className="p-5">
        <div className="flex items-center gap-3 justify-end opacity-80 group-hover:opacity-100 transition-opacity">
            <a href={zapLink} target="_blank" className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-sm hover:bg-green-600 transition-colors flex items-center gap-1 shadow-sm">
                💬 Zap
            </a>
            <button 
                onClick={handleCancel} 
                disabled={loading}
                className="bg-white border border-red-200 text-red-500 px-3 py-2 rounded-lg font-bold text-sm hover:bg-red-50 transition-colors shadow-sm"
                title="Cancelar Agendamento"
            >
                {loading ? '...' : '🗑️'}
            </button>
        </div>
      </td>
    </tr>
  )
}