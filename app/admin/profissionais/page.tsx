"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GerenciarProfissionais() {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newName, setNewName] = useState("")
  const [editingPro, setEditingPro] = useState<any>(null)

  useEffect(() => { loadProfessionals() }, [])

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
        } else {
            alert(data.error || "Erro ao salvar")
        }
    } catch (error) { alert("Erro de conexão") } 
    finally { setSaving(false) }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingPro) {
      if (file.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2MB")
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
        } else {
            alert("Erro ao atualizar")
        }
    } catch (error) { alert("Erro de conexão") } 
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

  async function handleDelete(id: string) {
    if(!confirm("Tem certeza? Isso apagará os agendamentos deste profissional.")) return
    const backup = [...professionals]
    setProfessionals(prev => prev.filter(p => p.id !== id))
    try {
        const res = await fetch(`/api/professionals?id=${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error("Erro")
    } catch (error) {
        setProfessionals(backup)
        alert("Erro ao excluir.")
    }
  }

  const daysMap = [
      { label: "Dom", val: "0" }, { label: "Seg", val: "1" }, { label: "Ter", val: "2" },
      { label: "Qua", val: "3" }, { label: "Qui", val: "4" }, { label: "Sex", val: "5" }, { label: "Sab", val: "6" },
  ]

  return (
    <div className="min-h-[100dvh] bg-slate-950 p-6 md:p-12 font-sans relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="text-slate-400 hover:text-white font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 transition-colors">
                    ← Voltar
                </Link>
                <div>
                     <h1 className="text-2xl md:text-3xl font-black text-white">Equipe</h1>
                     <p className="text-slate-500 text-sm md:text-base">Gerencie quem atende em seu negócio.</p>
                </div>
            </div>
        </div>

        {/* CREATE CARD DARK */}
        <div className="bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 mb-10">
            <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <span className="bg-purple-600 w-2 h-6 rounded-full"></span>
                Adicionar Novo Membro
            </h2>
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nome do Profissional</label>
                    <input 
                        type="text" 
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Ex: Ana Silva"
                        className="w-full p-3 md:p-4 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none bg-slate-800 text-white placeholder-slate-600"
                    />
                </div>
                <button 
                    onClick={handleCreate}
                    disabled={!newName || saving}
                    // CORREÇÃO: "Contratar +"
                    className={`h-[50px] md:h-[60px] px-8 rounded-xl font-bold transition-all w-full md:w-auto text-sm
                        ${saving || !newName ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg'}
                    `}
                >
                    {saving ? "..." : "Contratar +"}
                </button>
            </div>
        </div>

        {/* LISTA DARK */}
        <div className="grid grid-cols-1 gap-4 pb-20">
             {professionals.map((pro) => (
                 <div key={pro.id} className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-4 w-full md:w-auto">
                           <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-2xl text-slate-500 shrink-0">
                                {pro.photoUrl ? <img src={pro.photoUrl} className="w-full h-full object-cover" /> : "👤"}
                           </div>
                           <div>
                                <h3 className="font-bold text-lg text-white">{pro.name}</h3>
                                <p className="text-sm text-slate-400">{pro.workStart} às {pro.workEnd}</p>
                           </div>
                      </div>
                      
                      <div className="flex gap-3 w-full md:w-auto">
                           <button onClick={() => setEditingPro(pro)} className="flex-1 md:flex-none px-4 py-2 bg-blue-900/20 text-blue-400 border border-blue-900/50 font-bold rounded-lg hover:bg-blue-900/40 transition-colors text-sm">Configurar</button>
                           <button onClick={() => handleDelete(pro.id)} className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 font-bold rounded-lg hover:bg-red-900/40 transition-colors text-sm">Excluir</button>
                      </div>
                 </div>
             ))}
             {professionals.length === 0 && !loading && (
                 <div className="text-center py-10 text-slate-500 bg-slate-900 rounded-2xl border border-slate-800">Nenhum profissional cadastrado.</div>
             )}
        </div>
      </div>

      {/* MODAL CONFIGURAÇÃO DARK */}
      {editingPro && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-800 custom-scrollbar">
                <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-slate-800 pb-4">
                    <h3 className="text-xl md:text-2xl font-black text-white">Editar Perfil</h3>
                    <button onClick={() => setEditingPro(null)} className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700">✕</button>
                </div>
                
                <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <div className="relative w-28 h-28 rounded-full bg-slate-800 border-4 border-slate-700 shadow-lg mb-4 overflow-hidden group cursor-pointer">
                            {editingPro.photoUrl ? (
                                <img src={editingPro.photoUrl} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl text-slate-600">👤</div>
                            )}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold uppercase">Trocar Foto</span>
                            </div>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Nome</label>
                        <input type="text" value={editingPro.name} onChange={(e) => setEditingPro({...editingPro, name: e.target.value})} className="w-full p-3 border border-slate-700 rounded-xl bg-slate-800 font-bold text-white focus:ring-1 focus:ring-blue-500 outline-none relative z-10" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Entrada</label>
                            {/* CORREÇÃO: Limpeza de placeholder e texto fantasma */}
                            <input type="time" placeholder="" value={editingPro.workStart} onChange={(e) => setEditingPro({...editingPro, workStart: e.target.value})} className="w-full p-3 border border-slate-700 rounded-xl bg-slate-800 text-white relative z-10" />
                        </div>
                        <div className="relative">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Saída</label>
                            <input type="time" placeholder="" value={editingPro.workEnd} onChange={(e) => setEditingPro({...editingPro, workEnd: e.target.value})} className="w-full p-3 border border-slate-700 rounded-xl bg-slate-800 text-white relative z-10" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Dias de Trabalho</label>
                        <div className="flex flex-wrap gap-2">
                            {daysMap.map((day) => {
                                const isSelected = editingPro.workDays?.split(',').includes(day.val)
                                return (
                                    <button key={day.val} onClick={() => toggleDay(day.val)} className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${isSelected ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'}`}>
                                        {day.label.charAt(0)}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="bg-orange-900/10 p-5 rounded-xl border border-orange-500/20">
                        <p className="text-[10px] font-bold text-orange-400 uppercase mb-3">Pausa / Almoço</p>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="time" value={editingPro.lunchStart || ""} onChange={(e) => setEditingPro({...editingPro, lunchStart: e.target.value})} className="w-full p-2 border border-slate-700 rounded bg-slate-800 text-white text-sm" />
                            <input type="time" value={editingPro.lunchEnd || ""} onChange={(e) => setEditingPro({...editingPro, lunchEnd: e.target.value})} className="w-full p-2 border border-slate-700 rounded bg-slate-800 text-white text-sm" />
                        </div>
                    </div>
                </div>

                <button onClick={handleUpdate} className="w-full mt-8 py-4 bg-blue-600 text-white hover:bg-blue-500 rounded-xl font-bold shadow-xl shadow-blue-900/20 text-lg transition-colors">
                    {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>
        </div>
      )}
    </div>
  )
}