"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GerenciarProfissionais() {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Estados do Formulário
  const [name, setName] = useState("")
  const [tenantId, setTenantId] = useState("")

  useEffect(() => {
    async function init() {
        const res = await fetch('/api/public-tenant-id?slug=barbearia-ze')
        const data = await res.json()
        if (data.id) {
            setTenantId(data.id)
            loadProfessionals(data.id)
        }
    }
    init()
  }, [])

  async function loadProfessionals(tId: string) {
    setLoading(true)
    const res = await fetch(`/api/professionals?tenantId=${tId}`, { cache: 'no-store' })
    const data = await res.json()
    setProfessionals(data)
    setLoading(false)
  }

  // CRIAR
  async function handleCreate() {
    setSaving(true)
    try {
        const res = await fetch('/api/professionals', {
            method: 'POST',
            body: JSON.stringify({
                name,
                tenantId
            })
        })

        const data = await res.json()

        if (res.ok) {
            setProfessionals(prev => [...prev, data])
            setName("")
        } else {
            // AQUI APARECE A MENSAGEM DE "FAÇA UPGRADE"
            alert(data.error || "Erro ao salvar")
        }
    } catch (error) {
        alert("Erro de conexão")
    } finally {
        setSaving(false)
    }
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

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="text-gray-500 hover:text-black font-medium">
                    ← Voltar
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Equipe 💈</h1>
            </div>
        </div>

        {/* --- FORMULÁRIO --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Novo Profissional</h2>
            
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nome do Profissional</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ex: Zé Barbeiro"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <button 
                    onClick={handleCreate}
                    disabled={!name || saving}
                    className={`h-[50px] px-6 rounded-lg font-bold transition-all w-full md:w-auto
                        ${saving || !name ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-md'}
                    `}
                >
                    {saving ? "Verificando Plano..." : "Contratar (+)"}
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
                * O limite de profissionais depende do seu plano contratado.
            </p>
        </div>

        {/* --- LISTA --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 font-semibold text-gray-600">Nome</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Status</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y text-gray-800">
                    {professionals.map((pro) => (
                        <tr key={pro.id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                                    👤
                                </div>
                                <span className="font-bold">{pro.name}</span>
                            </td>
                            <td className="p-4 text-right">
                                <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold">
                                    Ativo
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <button 
                                    onClick={() => handleDelete(pro.id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded"
                                >
                                    Demitir
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                    {professionals.length === 0 && !loading && (
                        <tr>
                            <td colSpan={3} className="p-8 text-center text-gray-400">
                                Ninguém na equipe ainda.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

      </div>
    </div>
  )
}