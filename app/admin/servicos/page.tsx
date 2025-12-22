"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GerenciarServicos() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false) // Novo estado para o botão salvar

  // Estados do Formulário
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("30")
  
  const [tenantId, setTenantId] = useState("")

  useEffect(() => {
    async function init() {
        const res = await fetch('/api/public-tenant-id?slug=barbearia-ze')
        const data = await res.json()
        if (data.id) {
            setTenantId(data.id)
            loadServices(data.id)
        }
    }
    init()
  }, [])

  async function loadServices(tId: string) {
    setLoading(true)
    // O cache: 'no-store' garante que ele sempre busque dados novos
    const res = await fetch(`/api/services?tenantId=${tId}`, { cache: 'no-store' })
    const data = await res.json()
    setServices(data)
    setLoading(false)
  }

  // --- AÇÃO DE CRIAR (Com Loading) ---
  async function handleCreate() {
    setSaving(true) // Trava o botão
    try {
        const res = await fetch('/api/services', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                durationMin: duration,
                tenantId: tenantId 
            })
        })

        if (res.ok) {
            const newService = await res.json()
            // Adiciona na lista IMEDIATAMENTE sem precisar recarregar tudo do banco
            setServices(prev => [...prev, newService])
            // Limpa formulário
            setName("")
            setPrice("")
        } else {
            alert("Erro ao salvar")
        }
    } catch (error) {
        alert("Erro de conexão")
    } finally {
        setSaving(false) // Destrava o botão
    }
  }

  // --- AÇÃO DE DELETAR (Instantânea - Optimistic UI) ---
  async function handleDelete(id: string) {
    if(!confirm("Tem certeza que deseja excluir este serviço?")) return

    // 1. ATUALIZA A TELA INSTANTANEAMENTE (Remove da lista visualmente)
    const backupServices = [...services] // Guarda cópia caso dê erro
    setServices(prev => prev.filter(s => s.id !== id))

    // 2. MANDA PRO SERVIDOR EM BACKGROUND
    try {
        const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' })
        if (!res.ok) {
            throw new Error("Falha ao deletar")
        }
    } catch (error) {
        // Se der erro, volta o item pra lista e avisa
        setServices(backupServices) 
        alert("Erro ao excluir. O serviço voltou.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="text-gray-500 hover:text-black font-medium transition-colors">
                    ← Voltar
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Meus Serviços ✂️</h1>
            </div>
        </div>

        {/* --- FORMULÁRIO --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Adicionar Novo Serviço</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
                {/* Nome */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ex: Corte Degrade"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Preço */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Preço (R$)</label>
                    <input 
                        type="number" 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Duração */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Duração</label>
                    <select 
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                        {Array.from({ length: 36 }, (_, i) => (i + 1) * 5).map(min => (
                            <option key={min} value={min}>{min} min</option>
                        ))}
                    </select>
                </div>
            </div>

            <button 
                onClick={handleCreate}
                disabled={!name || !price || saving}
                className={`mt-4 w-full md:w-auto font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2
                    ${saving || !name || !price ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md'}
                `}
            >
                {saving ? "Salvando..." : "Salvar Serviço"}
            </button>
        </div>

        {/* --- LISTA --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 font-semibold text-gray-600">Serviço</th>
                        <th className="p-4 font-semibold text-gray-600">Duração</th>
                        <th className="p-4 font-semibold text-gray-600">Preço</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y text-gray-800">
                    {services.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50 transition-colors animate-in fade-in">
                            <td className="p-4 font-bold">{service.name}</td>
                            <td className="p-4">
                                <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold">
                                    {service.durationMin} min
                                </span>
                            </td>
                            <td className="p-4 text-green-600 font-bold">R$ {Number(service.price).toFixed(2)}</td>
                            <td className="p-4 text-right">
                                <button 
                                    onClick={() => handleDelete(service.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                    {services.length === 0 && !loading && (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-gray-400">
                                Nenhum serviço cadastrado. Cadastre o primeiro acima! ☝️
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {loading && (
                <div className="p-8 text-center text-gray-500">
                    Carregando serviços...
                </div>
            )}
        </div>

      </div>
    </div>
  )
}