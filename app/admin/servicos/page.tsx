'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Estados do Formulário
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newDuration, setNewDuration] = useState('30')

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    try {
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    
    // Validação
    if (!newName || !newPrice || !newDuration) return alert("Preencha todos os campos!")

    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newName,
        price: newPrice,
        durationMin: newDuration
      })
    })

    if (res.ok) {
        setIsAdding(false)
        setNewName('')
        setNewPrice('')
        setNewDuration('30')
        fetchServices() // Atualiza a lista
    } else {
        alert('Erro ao salvar serviço')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto">
            
            {/* BOTÃO VOLTAR */}
            <div className="mb-6">
                <Link href="/admin" className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-2 transition-colors">
                    ← Voltar ao Painel
                </Link>
            </div>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
                    <p className="text-gray-500">Gerencie seu menu de preços.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
                >
                    {isAdding ? 'Cancelar' : '+ Novo Serviço'}
                </button>
            </div>

            {/* FORMULÁRIO DE ADIÇÃO */}
            {isAdding && (
                <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8 animate-in slide-in-from-top-4">
                    <h3 className="font-bold text-lg mb-4">Adicionar Serviço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Nome</label>
                            <input autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ex: Corte Navalhado" className="w-full p-3 border rounded-xl" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Preço (R$)</label>
                            <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="0.00" className="w-full p-3 border rounded-xl" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Duração (min)</label>
                            {/* AQUI ESTÁ A CORREÇÃO: type="number" e step="5" */}
                            <input 
                                type="number" 
                                step="5"
                                min="5"
                                value={newDuration} 
                                onChange={e => setNewDuration(e.target.value)} 
                                className="w-full p-3 border rounded-xl" 
                            />
                            <p className="text-[10px] text-gray-400 mt-1">Múltiplos de 5 min</p>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700">
                        Salvar Serviço
                    </button>
                </form>
            )}

            {/* LISTAGEM */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Carregando serviços...</div>
                ) : services.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">Nenhum serviço cadastrado ainda.</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {services.map(service => (
                            <div key={service.id} className="p-5 flex justify-between items-center hover:bg-gray-50">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{service.name}</h4>
                                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        ⏱ {service.durationMin} min
                                    </span>
                                </div>
                                <div className="font-bold text-green-600 text-xl">
                                    R$ {Number(service.price).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}