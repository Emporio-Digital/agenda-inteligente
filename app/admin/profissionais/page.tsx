"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GerenciarProfissionais() {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newName, setNewName] = useState("")
  const [editingPro, setEditingPro] = useState<any>(null)
  const [showCustomHours, setShowCustomHours] = useState(false)
  
  // ESTADOS APENAS PARA A NOTIFICAÇÃO (SEM MUDAR O DESIGN)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null)

  useEffect(() => { loadProfessionals() }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  async function loadProfessionals() {
    setLoading(true)
    const res = await fetch(`/api/professionals`, { cache: 'no-store' })
    if (res.ok) {
        const data = await res.json()
        setProfessionals(data)
    }
    setLoading(false)
  }

  async function handleCreate() {
    setSaving(true)
    try {
        const res = await fetch('/api/professionals', {
            method: 'POST',
            body: JSON.stringify({ name: newName })
        })
        const data = await res.json()
        if (res.ok) {
            setProfessionals(prev => [...prev, data])
            setNewName("")
            setNotification({ message: "Salvo com sucesso!", type: 'success' })
        } else {
            setNotification({ message: data.error || "Erro ao salvar", type: 'error' })
        }
    } catch (error) { setNotification({ message: "Erro de conexão", type: 'error' }) } 
    finally { setSaving(false) }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingPro) {
      if (file.size > 4 * 1024 * 1024) {
        setNotification({ message: "A imagem deve ter no máximo 4MB", type: 'error' })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingPro({ ...editingPro, photoUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  function toggleCustomDay(dayValue: string) {
    if (!editingPro) return
    const currentHours = editingPro.workHours || {}
    const currentDay = currentHours[dayValue]
    const nextEnabled = !currentDay?.enabled

    const updatedDay = nextEnabled
      ? {
          enabled: true,
          workStart: currentDay?.workStart || editingPro.workStart || "09:00",
          workEnd: currentDay?.workEnd || editingPro.workEnd || "18:00",
          lunchStart: currentDay?.lunchStart ?? (editingPro.lunchStart || ""),
          lunchEnd: currentDay?.lunchEnd ?? (editingPro.lunchEnd || ""),
        }
      : { ...currentDay, enabled: false }

    setEditingPro({
      ...editingPro,
      workHours: { ...currentHours, [dayValue]: updatedDay }
    })
  }

  function updateCustomDayField(dayValue: string, field: string, value: string) {
    if (!editingPro) return
    const currentHours = editingPro.workHours || {}
    const currentDay = currentHours[dayValue] || { enabled: true }
    setEditingPro({
      ...editingPro,
      workHours: {
        ...currentHours,
        [dayValue]: { ...currentDay, [field]: value }
      }
    })
  }

  function toggleCustomDayNoLunch(dayValue: string, noLunch: boolean) {
    if (!editingPro) return
    const currentHours = editingPro.workHours || {}
    const currentDay = currentHours[dayValue] || { enabled: true }
    setEditingPro({
      ...editingPro,
      workHours: {
        ...currentHours,
        [dayValue]: {
          ...currentDay,
          lunchStart: noLunch ? "" : (editingPro.lunchStart || "12:00"),
          lunchEnd: noLunch ? "" : (editingPro.lunchEnd || "13:00"),
        }
      }
    })
  }

  async function handleUpdate() {
    if (!editingPro) return

    if (editingPro.workHours && typeof editingPro.workHours === 'object') {
      const activeDays = editingPro.workDays ? editingPro.workDays.split(',') : []
      for (const dayVal of activeDays) {
        const cfg = editingPro.workHours[dayVal]
        if (cfg?.enabled) {
          if (!cfg.workStart || !cfg.workEnd || cfg.workStart >= cfg.workEnd) {
            setNotification({ message: "Verifique entrada e saída nos horários específicos.", type: 'error' })
            return
          }
          const hasStart = Boolean(cfg.lunchStart)
          const hasEnd = Boolean(cfg.lunchEnd)
          if (hasStart !== hasEnd) {
            setNotification({ message: "Preencha início e fim da pausa ou marque sem pausa.", type: 'error' })
            return
          }
          if (hasStart && cfg.lunchStart >= cfg.lunchEnd) {
            setNotification({ message: "O fim da pausa deve ser maior que o início.", type: 'error' })
            return
          }
        }
      }
    }

    setSaving(true)
    try {
        const res = await fetch('/api/professionals', {
            method: 'PUT',
            body: JSON.stringify(editingPro)
        })
        if (res.ok) {
            const updated = await res.json()
            setProfessionals(prev => prev.map(p => p.id === updated.id ? updated : p))
            setEditingPro(null)
            setNotification({ message: "Atualizado com sucesso!", type: 'success' })
        } else {
            const errData = await res.json().catch(() => null)
            setNotification({ message: errData?.error || "Erro ao atualizar", type: 'error' })
        }
    } catch (error) { setNotification({ message: "Erro de conexão", type: 'error' }) } 
    finally { setSaving(false) }
  }

  function toggleDay(dayValue: string) {
    if(!editingPro) return
    const currentDays = editingPro.workDays ? editingPro.workDays.split(',') : []
    let newDays
    if (currentDays.includes(dayValue)) {
        newDays = currentDays.filter((d: string) => d !== dayValue)
    } else {
        newDays = [...currentDays, dayValue]
    }
    setEditingPro({ ...editingPro, workDays: newDays.join(',') })
  }

  async function handleDelete() {
    if(!showConfirmDelete) return
    const id = showConfirmDelete
    const backup = [...professionals]
    setProfessionals(prev => prev.filter(p => p.id !== id))
    setShowConfirmDelete(null)
    try {
        const res = await fetch(`/api/professionals?id=${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error("Erro")
        setNotification({ message: "Excluído com sucesso!", type: 'success' })
    } catch (error) {
        setProfessionals(backup)
        setNotification({ message: "Erro ao excluir.", type: 'error' })
    }
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const newPros = [...professionals]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex < 0 || targetIndex >= newPros.length) return

    // Troca os objetos de lugar no array local
    const [movedItem] = newPros.splice(index, 1)
    newPros.splice(targetIndex, 0, movedItem)

    // Atualiza o estado local para resposta imediata na UI
    setProfessionals(newPros)

    try {
      // Salva a nova posição de todos os afetados no banco
      // Enviamos apenas o ID e a nova Position
      await Promise.all(
        newPros.map((pro, idx) => 
          fetch('/api/professionals', {
            method: 'PUT',
            body: JSON.stringify({ id: pro.id, position: idx })
          })
        )
      )
    } catch (error) {
      setNotification({ message: "Erro ao salvar nova ordem", type: 'error' })
    }
  }

  const daysMap = [
      { label: "Dom", val: "0" }, { label: "Seg", val: "1" }, { label: "Ter", val: "2" },
      { label: "Qua", val: "3" }, { label: "Qui", val: "4" }, { label: "Sex", val: "5" }, { label: "Sab", val: "6" },
  ]

  return (
    <div className="min-h-[100dvh] bg-slate-50 p-6 md:p-12 font-sans relative overflow-x-hidden text-slate-800">
      
      {/* NOTIFICAÇÃO TOAST */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] animate-in slide-in-from-top-4">
          <div className={`px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${
            notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            <span className="text-xs font-bold uppercase tracking-widest">{notification.message}</span>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-xs w-full shadow-2xl text-center">
            <h3 className="text-slate-900 font-bold mb-2">Tem certeza?</h3>
            <p className="text-slate-500 text-xs mb-8 text-center">Isso apagará os agendamentos deste profissional.</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleDelete} className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl hover:bg-rose-700 transition-colors uppercase text-[10px] tracking-widest shadow-sm">Confirmar Exclusão</button>
              <button onClick={() => setShowConfirmDelete(null)} className="w-full text-slate-500 hover:text-slate-800 font-bold py-3 uppercase text-[10px] tracking-widest transition-colors">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* CABEÇALHO PADRÃO COM BOTÃO ACIMA E TÍTULO RETO */}
        <div className="flex flex-col items-start gap-4 mb-8">
            <Link 
              href="/admin" 
              className="group h-[40px] px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Voltar</span>
            </Link>
            
            <div>
                 <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                   Equipe
                 </h1>
                 <p className="text-slate-500 text-xs md:text-sm mt-1">Gerencie quem atende e configure escalas.</p>
            </div>
        </div>

        {/* CARD ADICIONAR NOVO MEMBRO BRANCO COM PROFUNDIDADE */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] border border-slate-100/80 mb-10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            
            <h2 className="text-base md:text-lg font-black mb-5 text-slate-900 flex items-center gap-2.5">
                <span className="bg-blue-600 shadow-sm w-1.5 h-6 rounded-full"></span>
                Adicionar Novo Membro
            </h2>
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5">Nome do Profissional</label>
                    <input 
                        type="text" 
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Ex: Ana Silva"
                        className="w-full p-3.5 border border-slate-200 focus:border-blue-500 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                    />
                </div>
                <button 
                    onClick={handleCreate}
                    disabled={!newName || saving}
                    className={`h-[50px] md:h-[52px] px-8 rounded-2xl font-black transition-all w-full md:w-auto text-xs uppercase tracking-widest shrink-0
                        ${saving || !newName 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md shadow-blue-500/20 active:scale-[0.99]'}
                    `}
                >
                    {saving ? "Salvando..." : "Contratar Membro"}
                </button>
            </div>
        </div>

        {/* LISTA DE COLABORADORES BRANCOS COM PROFUNDIDADE */}
        <div className="grid grid-cols-1 gap-4 pb-20">
             {professionals.map((pro, index) => (
                 <div 
                   key={pro.id} 
                   className="bg-white p-4 md:p-5 rounded-3xl border border-slate-100/80 hover:border-blue-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden group"
                 >
                      <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
                           {/* BOTÕES DE ORDENAÇÃO ESTILIZADOS */}
                           <div className="flex flex-col gap-0.5 pr-1.5 border-r border-slate-100">
                                <button 
                                    onClick={() => handleMove(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1 hover:bg-slate-100 rounded-lg disabled:opacity-20 text-slate-400 hover:text-slate-700 transition-all active:scale-90"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7"></path></svg>
                                </button>
                                <button 
                                    onClick={() => handleMove(index, 'down')}
                                    disabled={index === professionals.length - 1}
                                    className="p-1 hover:bg-slate-100 rounded-lg disabled:opacity-20 text-slate-400 hover:text-slate-700 transition-all active:scale-90"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                           </div>

                           {/* AVATAR COM SHADOW E BORDA */}
                           <div className="w-13 h-13 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-xl text-slate-400 shrink-0 shadow-sm">
                                {pro.photoUrl ? (
                                  <img src={pro.photoUrl} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={pro.name} />
                                ) : (
                                  "👤"
                                )}
                           </div>
                           
                           <div className="min-w-0 leading-tight">
                                <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest block mb-0.5">Membro #{index + 1}</span>
                                <h3 className="font-extrabold text-base md:text-lg text-slate-900 truncate leading-tight">
                                  {pro.name}
                                </h3>
                                <p className="text-xs text-slate-800 font-bold mt-1 flex items-center gap-1.5">
                                  <span className="text-blue-600 text-sm">⏱</span> 
                                  <span>{pro.workStart} às {pro.workEnd}</span>
                                </p>
                           </div>
                      </div>
                      
                      {/* BOTÕES DE CONFIGURAÇÃO DO MEMBRO */}
                      <div className="flex gap-2.5 w-full sm:w-auto shrink-0 mt-3 sm:mt-0">
                           <button 
                             onClick={() => { setEditingPro(pro); setShowCustomHours(false); }} 
                             className="flex-1 sm:flex-none px-4.5 py-2.5 bg-blue-50 text-blue-600 border border-blue-200 font-extrabold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-xs uppercase tracking-wider shadow-sm"
                           >
                             Configurar
                           </button>
                           <button 
                             onClick={() => setShowConfirmDelete(pro.id)} 
                             className="px-4.5 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 font-extrabold rounded-xl hover:bg-rose-600 hover:text-white transition-all text-xs uppercase tracking-wider shadow-sm"
                           >
                             Excluir
                           </button>
                      </div>
                 </div>
             ))}
             
             {professionals.length === 0 && !loading && (
                 <div className="text-center py-12 text-slate-400 bg-white rounded-[2rem] border border-slate-200 font-bold uppercase tracking-widest text-xs shadow-sm">
                   Nenhum profissional cadastrado.
                 </div>
             )}
        </div>
      </div> {/* FECHAMENTO DA MAX-W-5L */}

      {/* MODAL CONFIGURAÇÃO BRANCO */}
      {editingPro && (
        <div
          onClick={() => setEditingPro(null)}
          className="fixed inset-0 bg-slate-900/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200/90 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-md max-h-[92dvh] flex flex-col overflow-hidden relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 text-left"
          >
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"></div>

            {/* CABEÇALHO FIXO */}
            <div className="px-6 pt-5 pb-4 border-b border-slate-100 bg-white shrink-0">
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3 sm:hidden"></div>
              <div className="flex justify-between items-center gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate">
                    Editar Profissional
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold truncate">
                    Perfil, escala padrão e horários por dia
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPro(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200/80 flex items-center justify-center transition-colors text-xs shrink-0 outline-none"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* CORPO ROLÁVEL */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
              {/* 1. PERFIL (FOTO + NOME) */}
              <div className="flex items-center gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                <div className="relative w-18 h-18 rounded-2xl bg-white border-2 border-slate-200 shadow-sm overflow-hidden group cursor-pointer transition-all hover:border-blue-400 shrink-0">
                  {editingPro.photoUrl ? (
                    <img src={editingPro.photoUrl} loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Foto" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-slate-400">👤</div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[9px] font-black uppercase tracking-wider">Alterar</span>
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={editingPro.name}
                    onChange={(e) => setEditingPro({ ...editingPro, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white font-bold text-sm text-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. ESCALA PADRÃO */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
                    Escala Padrão
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {editingPro.workStart} – {editingPro.workEnd}
                  </span>
                </div>

                {/* ENTRADA E SAÍDA */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="min-w-0">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1 ml-1 truncate">Entrada</label>
                    <input
                      type="time"
                      value={editingPro.workStart}
                      onChange={(e) => setEditingPro({ ...editingPro, workStart: e.target.value })}
                      className="w-full min-w-0 py-2.5 px-1 text-center border border-slate-200 rounded-xl bg-white text-slate-900 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none [-webkit-appearance:none] box-border block"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1 ml-1 truncate">Saída</label>
                    <input
                      type="time"
                      value={editingPro.workEnd}
                      onChange={(e) => setEditingPro({ ...editingPro, workEnd: e.target.value })}
                      className="w-full min-w-0 py-2.5 px-1 text-center border border-slate-200 rounded-xl bg-white text-slate-900 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none [-webkit-appearance:none] box-border block"
                    />
                  </div>
                </div>

                {/* DIAS DE EXPEDIENTE */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2 ml-1">
                    Dias de Expediente
                  </label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {daysMap.map((day) => {
                      const isSelected = editingPro.workDays?.split(',').includes(day.val)
                      return (
                        <button
                          type="button"
                          key={day.val}
                          onClick={() => toggleDay(day.val)}
                          className={`h-9.5 rounded-xl text-xs font-black transition-all border outline-none ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {day.label.charAt(0)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* PAUSA ALMOÇO PADRÃO */}
                <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80">
                  <p className="text-[9px] font-black text-amber-800 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                    <span>☕</span> Pausa / Almoço Padrão
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <div className="min-w-0">
                      <input
                        type="time"
                        value={editingPro.lunchStart || ""}
                        onChange={(e) => setEditingPro({ ...editingPro, lunchStart: e.target.value })}
                        className="w-full min-w-0 py-2 px-1 text-center border border-amber-200 rounded-xl bg-white text-slate-900 text-xs font-bold focus:border-amber-400 outline-none appearance-none [-webkit-appearance:none] box-border block"
                      />
                    </div>
                    <div className="min-w-0">
                      <input
                        type="time"
                        value={editingPro.lunchEnd || ""}
                        onChange={(e) => setEditingPro({ ...editingPro, lunchEnd: e.target.value })}
                        className="w-full min-w-0 py-2 px-1 text-center border border-amber-200 rounded-xl bg-white text-slate-900 text-xs font-bold focus:border-amber-400 outline-none appearance-none [-webkit-appearance:none] box-border block"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. HORÁRIOS ESPECÍFICOS POR DIA (OPCIONAL) */}
              {(() => {
                const fullDayNames: Record<string, string> = {
                  "0": "Domingo", "1": "Segunda-feira", "2": "Terça-feira",
                  "3": "Quarta-feira", "4": "Quinta-feira", "5": "Sexta-feira", "6": "Sábado"
                }
                const activeWorkDays = (editingPro.workDays ? editingPro.workDays.split(',') : []).filter(Boolean)
                const customCount = activeWorkDays.filter((d: string) => editingPro.workHours?.[d]?.enabled).length

                return (
                  <div className="border border-slate-200/90 rounded-2xl bg-slate-50/70 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowCustomHours(!showCustomHours)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/70 transition-colors outline-none focus:outline-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-800 tracking-tight truncate">
                              Opcional • Dias com Horários Personalizados
                            </span>
                            {customCount > 0 && (
                              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-sm">
                                {customCount} {customCount === 1 ? 'dia' : 'dias'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${showCustomHours ? 'rotate-180 text-blue-600' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showCustomHours && (
                      <div className="p-3.5 pt-2.5 space-y-2.5 border-t border-slate-200/70 animate-in fade-in slide-in-from-top-2 duration-200">
                        {activeWorkDays.length === 0 ? (
                          <p className="text-xs text-slate-400 text-center py-3 font-medium">
                            Marque pelo menos um dia de expediente acima.
                          </p>
                        ) : (
                          daysMap
                            .filter((day) => activeWorkDays.includes(day.val))
                            .map((day) => {
                              const dayCfg = editingPro.workHours?.[day.val]
                              const isCustom = Boolean(dayCfg?.enabled)
                              const hasLunch = Boolean(dayCfg?.lunchStart || dayCfg?.lunchEnd)
                              return (
                                <div
                                  key={day.val}
                                  className={`bg-white p-3.5 rounded-xl border transition-all space-y-3 ${
                                    isCustom
                                      ? 'border-blue-300 shadow-sm ring-1 ring-blue-500/10'
                                      : 'border-slate-200/80'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                      <span className="text-xs font-black text-slate-900 block truncate">
                                        {fullDayNames[day.val]}
                                      </span>
                                      {!isCustom && (
                                        <span className="text-[10px] font-bold block truncate text-slate-400">
                                          Padrão ({editingPro.workStart} – {editingPro.workEnd})
                                        </span>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => toggleCustomDay(day.val)}
                                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all shrink-0 outline-none ${
                                        isCustom
                                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                                      }`}
                                    >
                                      {isCustom ? 'Personalizado' : 'Personalizar'}
                                    </button>
                                  </div>

                                  {isCustom && (
                                    <div className="space-y-3 pt-2.5 border-t border-slate-100">
                                      <div className="grid grid-cols-2 gap-2.5 w-full">
                                        <div className="min-w-0">
                                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1 text-center">Entrada</label>
                                          <input
                                            type="time"
                                            value={dayCfg?.workStart || ""}
                                            onChange={(e) => updateCustomDayField(day.val, 'workStart', e.target.value)}
                                            className="w-full min-w-0 py-2 px-1 text-center border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-xs font-bold outline-none focus:bg-white focus:border-blue-500 appearance-none [-webkit-appearance:none] box-border block"
                                          />
                                        </div>
                                        <div className="min-w-0">
                                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1 text-center">Saída</label>
                                          <input
                                            type="time"
                                            value={dayCfg?.workEnd || ""}
                                            onChange={(e) => updateCustomDayField(day.val, 'workEnd', e.target.value)}
                                            className="w-full min-w-0 py-2 px-1 text-center border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-xs font-bold outline-none focus:bg-white focus:border-blue-500 appearance-none [-webkit-appearance:none] box-border block"
                                          />
                                        </div>
                                      </div>

                                      {/* PÍLULA COM PAUSA / SEM PAUSA */}
                                      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
                                        <button
                                          type="button"
                                          onClick={() => toggleCustomDayNoLunch(day.val, false)}
                                          className={`py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all outline-none ${
                                            hasLunch
                                              ? 'bg-white text-amber-700 shadow-sm'
                                              : 'text-slate-500 hover:text-slate-700'
                                          }`}
                                        >
                                          ☕ Com pausa
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => toggleCustomDayNoLunch(day.val, true)}
                                          className={`py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all outline-none ${
                                            !hasLunch
                                              ? 'bg-white text-blue-600 shadow-sm'
                                              : 'text-slate-500 hover:text-slate-700'
                                          }`}
                                        >
                                          ⚡ Sem pausa
                                        </button>
                                      </div>

                                      {hasLunch && (
                                        <div className="grid grid-cols-2 gap-2.5 w-full">
                                          <div className="min-w-0">
                                            <label className="text-[9px] font-bold text-amber-700 uppercase block mb-1 text-center">Pausa Início</label>
                                            <input
                                              type="time"
                                              value={dayCfg?.lunchStart || ""}
                                              onChange={(e) => updateCustomDayField(day.val, 'lunchStart', e.target.value)}
                                              className="w-full min-w-0 py-2 px-1 text-center border border-amber-200 rounded-xl bg-amber-50/40 text-slate-900 text-xs font-bold outline-none focus:bg-white focus:border-amber-400 appearance-none [-webkit-appearance:none] box-border block"
                                            />
                                          </div>
                                          <div className="min-w-0">
                                            <label className="text-[9px] font-bold text-amber-700 uppercase block mb-1 text-center">Pausa Fim</label>
                                            <input
                                              type="time"
                                              value={dayCfg?.lunchEnd || ""}
                                              onChange={(e) => updateCustomDayField(day.val, 'lunchEnd', e.target.value)}
                                              className="w-full min-w-0 py-2 px-1 text-center border border-amber-200 rounded-xl bg-amber-50/40 text-slate-900 text-xs font-bold outline-none focus:bg-white focus:border-amber-400 appearance-none [-webkit-appearance:none] box-border block"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )
                            })
                        )}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>

            {/* RODAPÉ FIXO */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white/95 backdrop-blur-sm shrink-0">
              <button
                type="button"
                onClick={handleUpdate}
                disabled={saving}
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black rounded-2xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.99] text-xs uppercase tracking-widest disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}