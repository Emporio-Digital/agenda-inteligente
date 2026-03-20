'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

export default function AppointmentRow({ appt }: { appt: any }) {
  const [status, setStatus] = useState(appt.status)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [showConfirmCancel, setShowConfirmCancel] = useState(false)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const totalPrice = appt.services.reduce((acc: number, s: any) => {
    return acc + Number(s.price)
  }, 0)

  const handleCancel = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/appointments/${appt.id}`, { method: 'DELETE' })
      if (res.ok) {
        setStatus('CANCELED')
        setNotification({ message: 'Cancelado com sucesso', type: 'success' })
      } else {
        setNotification({ message: 'Erro ao cancelar', type: 'error' })
      }
    } catch (error) { 
      setNotification({ message: 'Erro de conexão', type: 'error' })
    }
    setLoading(false)
    setShowConfirmCancel(false)
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/appointments/${appt.id}/done`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.ok) {
        setStatus('DONE')
        setIsModalOpen(false)
      } else {
        setNotification({ message: 'Erro ao finalizar', type: 'error' })
      }
    } catch (error) { 
      setNotification({ message: 'Erro de conexão', type: 'error' })
    }
    setLoading(false)
  }

  if (status === 'CANCELED' || status === 'DONE') return null 

  const timeZone = 'America/Sao_Paulo'
  const dataObj = toZonedTime(appt.date, timeZone)
  const dia = format(dataObj, "dd 'de' MMM", { locale: ptBR })
  const hora = format(dataObj, "HH:mm", { locale: ptBR })
  
  const cleanPhone = (phone: string) => phone.replace(/\D/g, '')
  const firstName = appt.customer.name.split(' ')[0]
  const serviceNames = appt.services.map((s: any) => s.name).join(', ')
  const message = `Olá ${firstName}, tudo bem? Confirmando: *${serviceNames}* dia *${dia}* às *${hora}*.`
  const zapLink = `https://wa.me/55${cleanPhone(appt.customer.phone)}?text=${encodeURIComponent(message)}`

  return (
    <tr 
      onClick={() => setIsModalOpen(true)}
      className="group transition-all duration-300 hover:bg-white/5 cursor-pointer"
    >
      {/* CÉLULA 1: DATA E HORA - AJUSTE: p-6 para efeito "gordinho" no mobile */}
      <td className="bg-slate-900 p-6 md:p-5 rounded-l-2xl border-y border-l border-slate-800 group-hover:border-slate-700">
        <div className="flex flex-col items-start leading-tight">
          <span className="font-bold text-base md:text-2xl text-white">{hora}</span>
          <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-tighter whitespace-nowrap">
            {dia}
          </span>
        </div>
      </td>
      
      {/* CÉLULA 2: CLIENTE - AJUSTE: p-6 */}
      <td className="bg-slate-900 p-6 md:p-5 border-y border-slate-800 group-hover:border-slate-700">
        <div className="font-bold text-slate-200 text-sm md:text-base">{appt.customer.name}</div>
        <div className="text-[10px] md:text-xs text-slate-500 font-mono mt-0.5">{appt.customer.phone}</div>
      </td>
      
      {/* CÉLULA 3: ITENS E PREÇO - AJUSTE: p-6 */}
      <td className="bg-slate-900 p-6 md:p-5 border-y border-slate-800 group-hover:border-slate-700">
        <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[9px] font-black border border-slate-700 whitespace-nowrap uppercase">
          {appt.services.length} {appt.services.length === 1 ? 'Item' : 'Itens'}
        </span>
        <div className="mt-1.5 font-bold text-green-400 text-[11px] md:text-xs whitespace-nowrap">
          R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </td>
      
      {/* CÉLULA 4: PROFISSIONAL - AJUSTE: p-6 */}
      <td className="bg-slate-900 p-6 md:p-5 border-y border-slate-800 group-hover:border-slate-700">
         <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] border border-slate-700 overflow-hidden shrink-0">
                {appt.professional.photoUrl ? <img src={appt.professional.photoUrl} className="w-full h-full object-cover" alt="P"/> : "👤"}
            </div>
            <span className="text-[12px] md:text-base font-black text-slate-300 whitespace-nowrap tracking-tight">
                {appt.professional.name.split(' ')[0]}
            </span>
         </div>
      </td>
      
      {/* CÉLULA 5: AÇÕES - AJUSTE: p-6 */}
      <td className="bg-slate-900 p-6 md:p-5 rounded-r-2xl border-y border-r border-slate-800 group-hover:border-slate-700 text-right">
        <div className="flex items-center justify-end gap-2">
            <a 
              href={zapLink} target="_blank" onClick={(e) => e.stopPropagation()}
              className="bg-green-900/30 text-green-400 border border-green-900/50 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
            >💬</a>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowConfirmCancel(true); }}
              className="bg-red-900/30 text-red-400 border border-red-900/50 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            >✕</button>
        </div>

        {/* NOTIFICAÇÃO TOAST */}
        {notification && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] animate-in slide-in-from-top-4 w-fit">
            <div className={`px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${
              notification.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'
            }`}>
              <span className="text-xs font-black uppercase tracking-widest">{notification.message}</span>
            </div>
          </div>
        )}

        {/* MODAL CONFIRMAÇÃO */}
        {showConfirmCancel && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div onClick={(e) => e.stopPropagation()} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] max-w-xs w-full shadow-2xl text-center">
              <h3 className="text-white font-bold mb-6 italic uppercase tracking-tighter">Confirmar cancelamento?</h3>
              <div className="flex flex-col gap-2">
                <button onClick={handleCancel} disabled={loading} className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl uppercase text-[10px] tracking-[0.2em]">
                  {loading ? '...' : 'Sim, Cancelar'}
                </button>
                <button onClick={() => setShowConfirmCancel(false)} className="w-full text-slate-500 font-bold py-3 uppercase text-[10px] tracking-widest">Voltar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DETALHES */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[4px] animate-in fade-in duration-200">
            <div onClick={() => setIsModalOpen(false)} className="absolute inset-0"></div>
            <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-950 border border-slate-800 w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-left">
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-black text-white leading-tight">{appt.customer.name}</h2>
                    <span className="text-blue-500 font-mono text-xs tracking-tight">{appt.customer.phone}</span>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors text-xs">✕</button>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800/50 mb-8">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest mb-5 border-b border-slate-800 pb-2">Resumo dos Serviços</p>
                  
                  <div className="space-y-4">
                    {appt.services.map((s: any) => (
                      <div key={s.id} className="flex justify-between items-center gap-4 group/item">
                        <span className="text-slate-400 text-xs font-medium leading-tight truncate">/ {s.name}</span>
                        <span className="text-white font-mono text-xs whitespace-nowrap">R$ {Number(s.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                    
                    <div className="pt-5 mt-2 flex justify-between items-end border-t border-slate-800">
                      <span className="text-blue-500 font-black uppercase text-[10px] tracking-widest">Total Geral</span>
                      <span className="text-green-400 font-black text-2xl tracking-tighter">
                        R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800/50 text-center">
                      <p className="text-[9px] font-bold text-slate-600 uppercase mb-1">Especialista</p>
                      <p className="text-[13px] text-white font-black truncate tracking-tight">{appt.professional.name}</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800/50 text-center">
                      <p className="text-[9px] font-bold text-slate-600 uppercase mb-1">Data/Hora</p>
                      <p className="text-[11px] text-white font-bold">{hora} - {dia}</p>
                  </div>
                </div>

                <button 
                  onClick={handleComplete} disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center uppercase tracking-widest text-[11px] mb-3"
                >
                  {loading ? 'Finalizando...' : 'Concluir Atendimento'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="w-full text-slate-600 font-bold text-[10px] uppercase tracking-widest py-2">Voltar</button>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  )
}