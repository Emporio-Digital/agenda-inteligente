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
    <div 
      onClick={() => setIsModalOpen(true)}
      className="group bg-white border border-slate-100/80 hover:border-blue-300/80 rounded-[2rem] p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.12)] relative overflow-hidden min-h-[250px] h-full"
    >
      {/* 1. CABEÇALHO: HORA E DATA */}
      <div className="flex justify-between items-center mb-3.5">
        <span className="bg-blue-50 text-blue-600 font-extrabold px-2.5 py-0.5 rounded-lg text-xs border border-blue-100 shadow-sm">
          {hora}
        </span>
        <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">
          {dia}
        </span>
      </div>

      {/* 2. PROFISSIONAL */}
      <div className="flex items-center gap-2.5 mb-2 min-w-0">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs border border-slate-200 overflow-hidden shrink-0 shadow-sm">
          {appt.professional.photoUrl ? (
            <img src={appt.professional.photoUrl} className="w-full h-full object-cover" alt="Profissional" />
          ) : (
            "👤"
          )}
        </div>
        <div className="min-w-0 leading-tight">
          <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest block">Profissional</span>
          <span className="text-xs md:text-sm font-black text-slate-900 truncate block">
            {appt.professional.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* LINHA DIVISÓRIA SUAVE */}
      <div className="border-t border-slate-100 my-2.5"></div>

      {/* 3. CLIENTE */}
      <div className="mb-2 min-w-0">
        <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest block mb-1">Cliente</span>
        <div className="min-w-0 leading-tight">
          <h4 className="font-extrabold text-slate-900 text-xs truncate leading-snug">
            {appt.customer.name}
          </h4>
          <p className="text-slate-500 text-[10px] font-mono truncate mt-1">
            {appt.customer.phone}
          </p>
        </div>
      </div>

      {/* LINHA DIVISÓRIA SUAVE */}
      <div className="border-t border-slate-100 my-2.5"></div>

      {/* 4. FINANCEIRO / ITENS */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest block mb-1">Item</span>
          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[8px] font-black border border-slate-200 uppercase whitespace-nowrap inline-block">
            {appt.services.length} {appt.services.length === 1 ? 'Item' : 'Itens'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest block mb-1">Valor</span>
          <span className="font-extrabold text-emerald-600 text-xs md:text-sm whitespace-nowrap block">
            R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* 5. AÇÕES RÁPIDAS NO RODAPÉ */}
      <div className="flex items-center gap-2 mt-auto pt-2.5 border-t border-slate-100">
        <a 
          href={zapLink} target="_blank" onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 h-8.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-[11px] font-extrabold shadow-sm"
        >
          <span>💬</span> Chat
        </a>
        <button 
          onClick={(e) => { e.stopPropagation(); setShowConfirmCancel(true); }}
          className="bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 w-8.5 h-8.5 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-sm"
        >
          ✕
        </button>
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
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 p-8 rounded-[2.5rem] max-w-xs w-full shadow-2xl text-center">
            <h3 className="text-slate-900 font-bold mb-6 italic uppercase tracking-tighter">Confirmar cancelamento?</h3>
            <div className="flex flex-col gap-2">
              <button onClick={handleCancel} disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-sm transition-all">
                {loading ? '...' : 'Sim, Cancelar'}
              </button>
              <button onClick={() => setShowConfirmCancel(false)} className="w-full text-slate-500 hover:text-slate-700 font-bold py-3 uppercase text-[10px] tracking-widest transition-colors">Voltar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALHES */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-250">
          <div onClick={() => setIsModalOpen(false)} className="absolute inset-0"></div>
          <div onClick={(e) => e.stopPropagation()} className="relative bg-white border border-slate-200 w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            
            {/* LINHA DE LUZ SUTIL NO TOPO DO MODAL */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="p-7 md:p-8">
              {/* CABEÇALHO DO MODAL */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1 min-w-0">
                  <h2 className="text-2xl font-black text-slate-900 leading-tight tracking-tight truncate pr-2">
                    {appt.customer.name}
                  </h2>
                  <span className="bg-blue-50 text-blue-600 border border-blue-100 font-mono text-[11px] font-bold px-2.5 py-1 rounded-xl w-fit flex items-center gap-1 shadow-sm">
                    📱 {appt.customer.phone}
                  </span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-8.5 h-8.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-full flex items-center justify-center transition-colors text-xs shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* RECIBO DE SERVIÇOS */}
              <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-200 mb-6">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                  Resumo dos Serviços
                </p>
                
                <div className="space-y-3">
                  {appt.services.map((s: any) => (
                    <div key={s.id} className="flex justify-between items-center gap-4 group/item">
                      <span className="text-slate-700 text-xs font-semibold leading-tight truncate">
                        <span className="text-blue-600 font-bold mr-1.5">/</span> {s.name}
                      </span>
                      <span className="text-slate-900 font-mono text-xs whitespace-nowrap font-bold">
                        R$ {Number(s.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-1 flex justify-between items-end border-t border-slate-200">
                    <span className="text-blue-600 font-black uppercase text-[9px] tracking-widest">Total Geral</span>
                    <span className="text-emerald-600 font-black text-2xl tracking-tighter">
                      R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* GRID DETALHES GERAIS */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-wider mb-1">Especialista</p>
                    <p className="text-xs text-slate-900 font-extrabold truncate tracking-tight">{appt.professional.name}</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-wider mb-1">Hora/Data</p>
                    <p className="text-[11px] text-slate-900 font-bold">{hora} - {dia}</p>
                </div>
              </div>

              {/* BOTÕES DE AÇÕES PRINCIPAIS */}
              <button 
                onClick={handleComplete} disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black py-4.5 rounded-2xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center uppercase tracking-widest text-[11px] mb-2"
              >
                {loading ? 'Finalizando...' : 'Concluir Atendimento'}
              </button>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-full text-slate-500 hover:text-slate-800 font-black text-[10px] uppercase tracking-widest py-2.5 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}