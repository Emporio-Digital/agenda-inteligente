'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function AppointmentRow({ appt }: { appt: any }) {
  const [status, setStatus] = useState(appt.status)
  const [loading, setLoading] = useState(false)

  const handleCancel = async () => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento? O horário ficará livre novamente.')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/appointments/${appt.id}`, {
        method: 'DELETE', // Vamos usar DELETE para mudar status ou apagar
      })
      
      if (res.ok) {
        setStatus('CANCELED')
      } else {
        alert('Erro ao cancelar.')
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  if (status === 'CANCELED') return null // Some da lista se cancelado (ou poderia ficar cinza)

  const dataObj = new Date(appt.date)
  const dia = format(dataObj, "dd/MM", { locale: ptBR })
  const hora = format(dataObj, "HH:mm", { locale: ptBR })
  const servicosTexto = appt.services.map((s: any) => s.name).join(' + ')
  const cleanPhone = (phone: string) => phone.replace(/\D/g, '')
  const zapLink = `https://wa.me/55${cleanPhone(appt.customer.phone)}?text=Olá ${appt.customer.name}, passando para confirmar seu horário de ${servicosTexto} dia ${dia} às ${hora}.`

  return (
    <tr className="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0">
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
          {appt.services.map((s: any) => (
            <span key={s.id} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-gray-200 w-fit">
              {s.name}
            </span>
          ))}
        </div>
      </td>
      <td className="p-5">
        <span className="font-medium text-gray-700">{appt.professional.name}</span>
      </td>
      <td className="p-5">
        <div className="flex items-center gap-3 justify-end">
            <a href={zapLink} target="_blank" className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-bold text-sm hover:bg-green-200 transition-colors flex items-center gap-1">
                💬 Zap
            </a>
            <button 
                onClick={handleCancel} 
                disabled={loading}
                className="bg-red-50 text-red-600 px-3 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors"
            >
                {loading ? '...' : '🗑️'}
            </button>
        </div>
      </td>
    </tr>
  )
}