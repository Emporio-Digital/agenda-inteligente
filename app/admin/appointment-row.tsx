'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

export default function AppointmentRow({ appt }: { appt: any }) {
  const [status, setStatus] = useState(appt.status)
  const [loading, setLoading] = useState(false)

  // CÁLCULO DE SEGURANÇA (String -> Number)
  const totalPrice = appt.services.reduce((acc: number, s: any) => {
    // Garante que o preço seja tratado como número, mesmo vindo como string
    return acc + Number(s.price)
  }, 0)

  const handleCancel = async () => {
    if (!confirm('Cancelar este agendamento?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/appointments/${appt.id}`, { method: 'DELETE' })
      if (res.ok) setStatus('CANCELED')
      else alert('Erro ao cancelar.')
    } catch (error) { alert('Erro de conexão.') }
    setLoading(false)
  }

  if (status === 'CANCELED') return null 

  // --- LÓGICA DE DATA E HORA ---
  const timeZone = 'America/Sao_Paulo'
  const dataObj = toZonedTime(appt.date, timeZone)
  
  const dia = format(dataObj, "dd 'de' MMM", { locale: ptBR })
  const hora = format(dataObj, "HH:mm", { locale: ptBR })
  
  // --- LÓGICA WHATSAPP (CORRIGIDA) ---
  const cleanPhone = (phone: string) => phone.replace(/\D/g, '')
  
  const firstName = appt.customer.name.split(' ')[0]
  const serviceNames = appt.services.map((s: any) => s.name).join(', ')
  
  // Mensagem pré-definida formatada
  const message = `Olá ${firstName}, tudo bem? Passando para confirmar seu horário: *${serviceNames}* dia *${dia}* às *${hora}* com *${appt.professional.name}*. Confirmado?`
  
  // Link completo com mensagem codificada
  const zapLink = `https://wa.me/55${cleanPhone(appt.customer.phone)}?text=${encodeURIComponent(message)}`

  return (
    <tr className="group transition-all duration-300 hover:scale-[1.005]">
      
      {/* CÉLULAS DARK */}
      
      <td className="bg-slate-900 p-5 rounded-l-2xl border-y border-l border-slate-800 shadow-sm group-hover:border-slate-700">
        <div className="flex flex-col">
          <span className="font-bold text-2xl text-white">{hora}</span>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wide">{dia}</span>
        </div>
      </td>
      
      <td className="bg-slate-900 p-5 border-y border-slate-800 shadow-sm group-hover:border-slate-700">
        <div className="font-bold text-slate-200">{appt.customer.name}</div>
        <div className="text-xs text-slate-500 font-mono mt-0.5">{appt.customer.phone}</div>
      </td>
      
      <td className="bg-slate-900 p-5 border-y border-slate-800 shadow-sm group-hover:border-slate-700">
        <div className="flex flex-wrap gap-1">
          {appt.services.map((s: any) => (
            <span key={s.id} className="bg-slate-800 text-slate-300 px-2 py-1 rounded-md text-[10px] font-bold uppercase border border-slate-700">
              {s.name}
            </span>
          ))}
        </div>
        <div className="mt-2 font-bold text-green-400 text-xs">R$ {totalPrice.toFixed(2)}</div>
      </td>
      
      <td className="bg-slate-900 p-5 border-y border-slate-800 shadow-sm group-hover:border-slate-700">
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs border border-slate-700 overflow-hidden text-slate-400">
                {appt.professional.photoUrl ? <img src={appt.professional.photoUrl} className="w-full h-full object-cover"/> : "👤"}
            </div>
            <span className="text-sm font-medium text-slate-400">{appt.professional.name}</span>
         </div>
      </td>
      
      <td className="bg-slate-900 p-5 rounded-r-2xl border-y border-r border-slate-800 shadow-sm group-hover:border-slate-700 text-right">
        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <a href={zapLink} target="_blank" className="bg-green-900/30 text-green-400 border border-green-900 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors" title="Chamar no WhatsApp">
                💬
            </a>
            <button 
                onClick={handleCancel} 
                disabled={loading}
                className="bg-red-900/30 text-red-400 border border-red-900 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                title="Cancelar"
            >
                {loading ? '...' : '✕'}
            </button>
        </div>
      </td>
    </tr>
  )
}