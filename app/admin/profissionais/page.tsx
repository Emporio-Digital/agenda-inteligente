"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GerenciarProfissionais() {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Estado de Novo Profissional
  const [newName, setNewName] = useState("")

  // Estado de Edição (Modal)
  const [editingPro, setEditingPro] = useState<any>(null)

  useEffect(() => {
    loadProfessionals()
  }, [])

  async function loadProfessionals() {
    setLoading(true)
    const res = await fetch(`/api/professionals`, { cache: 'no-store' })
    if (res.ok) {
        const data = await res.json()
        setProfessionals(data)
    }
    setLoading(false)
  }

  // CRIAR
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
    } catch (error) {
        alert("Erro de conexão")
    } finally {
        setSaving(false)
    }
  }

  // ATUALIZAR (SALVAR EDIÇÃO)
  async function handleUpdate() {
    if (!editingPro) return
    setSaving(true)
    try {
        const res = await fetch('/api/professionals', {
            method: 'PUT',
            body: JSON.stringify(editingPro) // Envia o objeto editado completo (incluindo workDays)
        })

        if (res.ok) {
            const updated = await res.json()
            setProfessionals(prev => prev.map(p => p.id === updated.id ? updated : p))
            setEditingPro(null) // Fecha modal
        } else {
            alert("Erro ao atualizar")
        }
    } catch (error) {
        alert("Erro de conexão")
    } finally {
        setSaving(false)
    }
  }

  // Função para gerenciar os Dias de Trabalho
  function toggleDay(dayValue: string) {
    if(!editingPro) return

    // Se workDays for nulo ou vazio, assume padrão.
    const currentDays = editingPro.workDays ? editingPro.workDays.split(',') : []
    
    let newDays
    if (currentDays.includes(dayValue)) {
        newDays = currentDays.filter((d: string) => d !== dayValue)
    } else {
        newDays = [...currentDays, dayValue]
    }
    
    setEditingPro({ ...editingPro, workDays: newDays.join(',') })
  }

  // DELETAR
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
      { label: "Dom", val: "0" },
      { label: "Seg", val: "1" },
      { label: "Ter", val: "2" },
      { label: "Qua", val: "3" },
      { label: "Qui", val: "4" },
      { label: "Sex", val: "5" },
      { label: "Sab", val: "6" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="text-gray-500 hover:text-black font-medium">
                    ← Voltar
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Equipe 💈</h1>
            </div>
        </div>

        {/* --- FORMULÁRIO DE CADASTRO --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Novo Profissional</h2>
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nome do Profissional</label>
                    <input 
                        type="text" 
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Ex: Zé Barbeiro"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <button 
                    onClick={handleCreate}
                    disabled={!newName || saving}
                    className={`h-[50px] px-6 rounded-lg font-bold transition-all w-full md:w-auto
                        ${saving || !newName ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-md'}
                    `}
                >
                    {saving ? "..." : "Contratar (+)"}
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">* O limite depende do seu plano.</p>
        </div>

        {/* --- LISTA (COM SCROLL MOBILE) --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Profissional</th>
                            <th className="p-4 font-semibold text-gray-600 text-center">Horário</th>
                            <th className="p-4 font-semibold text-gray-600 text-center">Almoço</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-800">
                        {professionals.map((pro) => (
                            <tr key={pro.id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg overflow-hidden shrink-0">
                                        {pro.photoUrl ? <img src={pro.photoUrl} className="w-full h-full object-cover" /> : "👤"}
                                    </div>
                                    <span className="font-bold">{pro.name}</span>
                                </td>
                                <td className="p-4 text-center text-sm">
                                    {pro.workStart} - {pro.workEnd}
                                </td>
                                <td className="p-4 text-center text-sm text-gray-500">
                                    {pro.lunchStart ? `${pro.lunchStart} - ${pro.lunchEnd}` : '-'}
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button 
                                        onClick={() => setEditingPro(pro)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-bold px-3 py-1 hover:bg-blue-50 rounded"
                                    >
                                        Configurar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(pro.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {professionals.length === 0 && !loading && (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-400">Ninguém na equipe ainda.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* --- MODAL DE EDIÇÃO --- */}
      {editingPro && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Editar Profissional</h3>
                    <button onClick={() => setEditingPro(null)} className="text-gray-400 hover:text-black">✕</button>
                </div>
                
                <div className="space-y-6">
                    {/* Nome */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Nome</label>
                        <input 
                            type="text" 
                            value={editingPro.name} 
                            onChange={(e) => setEditingPro({...editingPro, name: e.target.value})}
                            className="w-full p-3 border rounded-lg mt-1"
                        />
                    </div>
                    
                    {/* Horários */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Início Expediente</label>
                            <input 
                                type="time" 
                                value={editingPro.workStart} 
                                onChange={(e) => setEditingPro({...editingPro, workStart: e.target.value})}
                                className="w-full p-3 border rounded-lg mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Fim Expediente</label>
                            <input 
                                type="time" 
                                value={editingPro.workEnd} 
                                onChange={(e) => setEditingPro({...editingPro, workEnd: e.target.value})}
                                className="w-full p-3 border rounded-lg mt-1"
                            />
                        </div>
                    </div>

                    {/* --- NOVO: Dias de Funcionamento --- */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Dias de Trabalho</label>
                        <div className="flex flex-wrap gap-2">
                            {daysMap.map((day) => {
                                const isSelected = editingPro.workDays?.split(',').includes(day.val)
                                return (
                                    <button
                                        key={day.val}
                                        onClick={() => toggleDay(day.val)}
                                        className={`w-10 h-10 rounded-lg text-sm font-bold border transition-all
                                            ${isSelected 
                                                ? 'bg-black text-white border-black' 
                                                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'}
                                        `}
                                    >
                                        {day.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Almoço */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <p className="text-xs font-bold text-orange-600 uppercase mb-2">Horário de Almoço (Bloqueio)</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Saída</label>
                                <input 
                                    type="time" 
                                    value={editingPro.lunchStart || ""} 
                                    onChange={(e) => setEditingPro({...editingPro, lunchStart: e.target.value})}
                                    className="w-full p-2 border rounded bg-white mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Retorno</label>
                                <input 
                                    type="time" 
                                    value={editingPro.lunchEnd || ""} 
                                    onChange={(e) => setEditingPro({...editingPro, lunchEnd: e.target.value})}
                                    className="w-full p-2 border rounded bg-white mt-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <button onClick={() => setEditingPro(null)} className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-bold">
                        Cancelar
                    </button>
                    <button onClick={handleUpdate} className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-bold shadow-lg">
                        {saving ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}