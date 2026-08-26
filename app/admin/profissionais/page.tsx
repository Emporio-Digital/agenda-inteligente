"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GerenciarProfissionais() {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newName, setNewName] = useState("")
  const [editingPro, setEditingPro] = useState<any>(null)
  
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

  async function handleUpdate() {
    if (!editingPro) return
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
            setNotification({ message: "Erro ao atualizar", type: 'error' })
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
    <div className="min-h-[100dvh] bg-slate-950 p-6 md:p-12 font-sans relative overflow-x-hidden">
      
      {/* NOTIFICAÇÃO TOAST (DESIGN MODERNO) */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] animate-in slide-in-from-top-4">
          <div className={`px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${
            notification.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'
          }`}>
            <span className="text-xs font-bold uppercase tracking-widest">{notification.message}</span>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO (DESIGN DARK) */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-xs w-full shadow-2xl text-center">
            <h3 className="text-white font-bold mb-2">Tem certeza?</h3>
            <p className="text-slate-400 text-xs mb-8 text-center">Isso apagará os agendamentos deste profissional.</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleDelete} className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-500 transition-colors uppercase text-[10px] tracking-widest">Confirmar Exclusão</button>
              <button onClick={() => setShowConfirmDelete(null)} className="w-full text-slate-500 font-bold py-3 uppercase text-[10px] tracking-widest">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* CABEÇALHO UPGRADE */}
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="text-slate-300 hover:text-white font-extrabold bg-slate-900/90 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800/80 transition-all text-xs md:text-sm shadow-md">
                    ← Voltar
                </Link>
                <div>
                     <h1 className="text-2xl md:text-3xl font-black text-white">Equipe</h1>
                     <p className="text-slate-400 text-xs md:text-sm mt-0.5">Gerencie quem atende e configure escalas.</p>
                </div>
            </div>
        </div>

        {/* CARD ADICIONAR NOVO MEMBRO (VERSÃO AZUL) */}
        <div className="bg-slate-900/90 p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-800/80 mb-10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            
            <h2 className="text-base md:text-lg font-black mb-5 text-white flex items-center gap-2.5">
                <span className="bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] w-1.5 h-6 rounded-full"></span>
                Adicionar Novo Membro
            </h2>
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">Nome do Profissional</label>
                    <input 
                        type="text" 
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Ex: Ana Silva"
                        className="w-full p-3.5 border border-slate-800 focus:border-blue-500/50 rounded-2xl bg-slate-950/60 text-white placeholder-slate-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                    />
                </div>
                <button 
                    onClick={handleCreate}
                    disabled={!newName || saving}
                    className={`h-[50px] md:h-[52px] px-8 rounded-2xl font-black transition-all w-full md:w-auto text-xs uppercase tracking-widest shrink-0
                        ${saving || !newName 
                          ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.99]'}
                    `}
                >
                    {saving ? "Salvando..." : "Contratar Membro"}
                </button>
            </div>
        </div>

        {/* LISTA DE COLABORADORES UPGRADE */}
        <div className="grid grid-cols-1 gap-4 pb-20">
             {professionals.map((pro, index) => (
                 <div 
                   key={pro.id} 
                   className="bg-slate-900/90 p-4 md:p-5 rounded-3xl border border-slate-800/80 hover:border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                 >
                      <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
                           {/* BOTÕES DE ORDENAÇÃO ESTILIZADOS */}
                           <div className="flex flex-col gap-0.5 pr-1.5 border-r border-slate-800">
                                <button 
                                    onClick={() => handleMove(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1 hover:bg-slate-800 rounded-lg disabled:opacity-10 text-slate-400 hover:text-white transition-all active:scale-90"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path></svg>
                                </button>
                                <button 
                                    onClick={() => handleMove(index, 'down')}
                                    disabled={index === professionals.length - 1}
                                    className="p-1 hover:bg-slate-800 rounded-lg disabled:opacity-10 text-slate-400 hover:text-white transition-all active:scale-90"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                           </div>

                           {/* AVATAR COM SHADOW E BORDA */}
                           <div className="w-13 h-13 rounded-full bg-slate-800 border border-slate-700/50 overflow-hidden flex items-center justify-center text-xl text-slate-500 shrink-0 shadow-inner">
                                {pro.photoUrl ? (
                                  <img src={pro.photoUrl} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={pro.name} />
                                ) : (
                                  "👤"
                                )}
                           </div>
                           
                           <div className="min-w-0 leading-tight">
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-0.5">Membro #{index + 1}</span>
                                <h3 className="font-extrabold text-base md:text-lg text-white truncate leading-tight">
                                  {pro.name}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                                  ⏱ {pro.workStart} às {pro.workEnd}
                                </p>
                           </div>
                      </div>
                      
                      {/* BOTÕES DE CONFIGURAÇÃO DO MEMBRO */}
                      <div className="flex gap-2.5 w-full sm:w-auto shrink-0 mt-3 sm:mt-0">
                           <button 
                             onClick={() => setEditingPro(pro)} 
                             className="flex-1 sm:flex-none px-4.5 py-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-extrabold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-xs uppercase tracking-wider"
                           >
                             Configurar
                           </button>
                           <button 
                             onClick={() => setShowConfirmDelete(pro.id)} 
                             className="px-4.5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 font-extrabold rounded-xl hover:bg-red-600 hover:text-white transition-all text-xs uppercase tracking-wider"
                           >
                             Excluir
                           </button>
                      </div>
                 </div>
             ))}
             
             {professionals.length === 0 && !loading && (
                 <div className="text-center py-12 text-slate-400 bg-slate-900/90 rounded-[2rem] border border-slate-800/80 font-bold uppercase tracking-widest text-xs">
                   Nenhum profissional cadastrado.
                 </div>
             )}
        </div>
      </div> {/* FECHAMENTO DA MAX-W-5L */}

      {/* MODAL CONFIGURAÇÃO (GLOW & GLASSMORPHISM) */}
      {editingPro && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-250">
            <div className="bg-slate-950 border border-slate-800/80 rounded-[2.5rem] shadow-2xl p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 custom-scrollbar text-left">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                
                {/* TOPO DO MODAL */}
                <div className="flex justify-between items-center mb-6 border-b border-slate-850 pb-4">
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Editar Perfil</h3>
                    <button 
                      onClick={() => setEditingPro(null)} 
                      className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800/60 flex items-center justify-center transition-colors text-xs"
                    >
                      ✕
                    </button>
                </div>
                
                <div className="space-y-5">
                    {/* ENVIAR FOTO COM AVATAR EXCELÊNCIA */}
                    <div className="flex flex-col items-center justify-center mb-4">
                        <div className="relative w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800/80 shadow-xl overflow-hidden group cursor-pointer transition-all hover:border-blue-500/40">
                            {editingPro.photoUrl ? (
                                <img src={editingPro.photoUrl} loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Foto" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl text-slate-600">👤</div>
                            )}
                            <div className="absolute inset-0 bg-black/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-[9px] font-black uppercase tracking-wider">Trocar Foto</span>
                            </div>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                        </div>
                    </div>

                    {/* CAMPO NOME */}
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Nome Completo</label>
                        <input 
                          type="text" 
                          value={editingPro.name} 
                          onChange={(e) => setEditingPro({...editingPro, name: e.target.value})} 
                          className="w-full p-3 border border-slate-800 rounded-xl bg-slate-900/60 font-bold text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-200" 
                        />
                    </div>
                    
                    {/* ENTRADA E SAÍDA SIMÉTRICOS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Entrada</label>
                            <input 
                              type="time" 
                              value={editingPro.workStart} 
                              onChange={(e) => setEditingPro({...editingPro, workStart: e.target.value})} 
                              className="w-full p-3 border border-slate-800 rounded-xl bg-slate-900/60 text-white font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-200" 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Saída</label>
                            <input 
                              type="time" 
                              value={editingPro.workEnd} 
                              onChange={(e) => setEditingPro({...editingPro, workEnd: e.target.value})} 
                              className="w-full p-3 border border-slate-800 rounded-xl bg-slate-900/60 text-white font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all duration-200" 
                            />
                        </div>
                    </div>

                    {/* PASTILHAS DIAS DE TRABALHO */}
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2.5 ml-1">Dias de Expediente</label>
                        <div className="flex flex-wrap gap-1.5">
                            {daysMap.map((day) => {
                                const isSelected = editingPro.workDays?.split(',').includes(day.val)
                                return (
                                    <button 
                                      key={day.val} 
                                      onClick={() => toggleDay(day.val)} 
                                      className={`w-9.5 h-9.5 rounded-xl text-xs font-black transition-all border
                                        ${isSelected 
                                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/15' 
                                          : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        {day.label.charAt(0)}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* INTERVALO DE PAUSA */}
                    <div className="bg-orange-500/5 p-4 rounded-2xl border border-orange-500/10">
                        <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          <span>☕</span> Pausa para Almoço / Descanso
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="time" 
                              value={editingPro.lunchStart || ""} 
                              onChange={(e) => setEditingPro({...editingPro, lunchStart: e.target.value})} 
                              className="w-full p-2.5 border border-slate-800/80 rounded-xl bg-slate-900/60 text-white text-xs font-bold focus:border-orange-500/30 outline-none" 
                            />
                            <input 
                              type="time" 
                              value={editingPro.lunchEnd || ""} 
                              onChange={(e) => setEditingPro({...editingPro, lunchEnd: e.target.value})} 
                              className="w-full p-2.5 border border-slate-800/80 rounded-xl bg-slate-900/60 text-white text-xs font-bold focus:border-orange-500/30 outline-none" 
                            />
                        </div>
                    </div>
                </div>

                {/* ENVIAR ALTERAÇÕES */}
                <button 
                  onClick={handleUpdate} 
                  className="w-full mt-7 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.99] text-xs uppercase tracking-widest"
                >
                    {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>
        </div>
      )}
    </div>
  )
}