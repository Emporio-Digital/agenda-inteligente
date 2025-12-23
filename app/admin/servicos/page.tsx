"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GerenciarServicos() {
  const [services, setServices] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([]) // Lista para o dropdown
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("30")
  const [selectedProId, setSelectedProId] = useState("") // Novo campo

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    // Busca Serviços
    const resServices = await fetch('/api/admin/services')
    const dataServices = await resServices.json()
    if (resServices.ok) setServices(dataServices)

    // Busca Profissionais (para o select)
    const resPros = await fetch('/api/professionals')
    const dataPros = await resPros.json()
    if (resPros.ok) {
        setProfessionals(dataPros)
        if (dataPros.length > 0) setSelectedProId(dataPros[0].id) // Seleciona o primeiro por padrão
    }
    
    setLoading(false)
  }

  async function handleCreate() {
    if (!selectedProId) {
        alert("Você precisa cadastrar um profissional antes de criar serviços.")
        return
    }

    setSaving(true)
    try {
        const res = await fetch('/api/admin/services', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                duration,
                professionalId: selectedProId // Envia o dono
            })
        })

        if (res.ok) {
            await loadData() // Recarrega tudo
            setName("")
            setPrice("")
            setDuration("30")
        } else {
            alert("Erro ao salvar")
        }
    } catch (error) {
        alert("Erro de conexão")
    } finally {
        setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Apagar serviço?")) return
    await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' })
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
            <Link href="/admin" className="text-gray-500 hover:text-black font-medium">← Voltar</Link>
            <h1 className="text-3xl font-bold text-gray-900">Catálogo de Serviços ✂️</h1>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Novo Serviço</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Nome do Serviço</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Corte Degrade" className="w-full p-3 border rounded-lg mt-1" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Preço (R$)</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" className="w-full p-3 border rounded-lg mt-1" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Duração (min)</label>
                    <input type="number" value={duration} onChange={e => setDuration(e.target.value)} step="5" className="w-full p-3 border rounded-lg mt-1" />
                </div>
                <div>
                    <label className="text-xs font-bold text-blue-600 uppercase">Realizado por:</label>
                    <select 
                        value={selectedProId} 
                        onChange={e => setSelectedProId(e.target.value)}
                        className="w-full p-3 border-2 border-blue-100 bg-blue-50 rounded-lg mt-1 font-bold text-gray-700"
                    >
                        {professionals.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button onClick={handleCreate} disabled={!name || !price || saving} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                {saving ? "Salvando..." : "Adicionar ao Catálogo"}
            </button>
        </div>

        {/* Lista */}
        <div className="space-y-3">
            {services.map(s => (
                <div key={s.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
                    <div>
                        <h3 className="font-bold text-lg">{s.name}</h3>
                        <div className="flex gap-3 text-sm text-gray-500">
                            <span>⏱ {s.durationMin} min</span>
                            <span className="text-green-600 font-bold">R$ {Number(s.price).toFixed(2)}</span>
                        </div>
                        {/* Mostra de quem é o serviço */}
                        <div className="mt-1">
                             <span className="text-[10px] uppercase font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                Feito por: {s.professional?.name || 'Todos'}
                             </span>
                        </div>
                    </div>
                    <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:text-red-600 p-2">🗑️</button>
                </div>
            ))}
            {services.length === 0 && !loading && <p className="text-center text-gray-400 py-10">Nenhum serviço cadastrado.</p>}
        </div>

      </div>
    </div>
  )
}