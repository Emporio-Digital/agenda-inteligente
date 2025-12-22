'use client'

import { useState } from 'react'

export default function SettingsForm({ tenant }: { tenant: any }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: tenant.name,
    primaryColor: tenant.primaryColor || '#000000',
    themeVariant: tenant.themeVariant || 'BARBER',
    logoUrl: tenant.logoUrl || '',
    coverUrl: tenant.coverUrl || '',
  })

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
        alert('Configurações salvas com sucesso!')
    } else {
        alert('Erro ao salvar.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* Identidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nome da Empresa</label>
                <input name="name" value={data.name} onChange={handleChange} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cor Principal (Hex)</label>
                <div className="flex gap-2">
                    <input type="color" name="primaryColor" value={data.primaryColor} onChange={handleChange} className="h-12 w-12 rounded cursor-pointer" />
                    <input type="text" name="primaryColor" value={data.primaryColor} onChange={handleChange} className="flex-1 p-3 border rounded-xl uppercase" />
                </div>
            </div>
        </div>

        {/* Tema */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tema / Ramo de Atuação</label>
            <select name="themeVariant" value={data.themeVariant} onChange={handleChange} className="w-full p-3 border rounded-xl bg-white">
                <option value="BARBER">💈 Barbearia (Clássico)</option>
                <option value="BEAUTY">💅 Salão de Beleza (Clean)</option>
                <option value="TATTOO">🐉 Estúdio Tattoo (Dark)</option>
                <option value="CLINIC">⚕️ Clínica / Saúde (Minimalista)</option>
            </select>
        </div>

        {/* Imagens (URLs por enquanto) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">URL do Logo</label>
                <input name="logoUrl" value={data.logoUrl} onChange={handleChange} placeholder="https://..." className="w-full p-3 border rounded-xl" />
                <p className="text-xs text-gray-400 mt-1">Cole o link da sua imagem aqui.</p>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">URL da Capa</label>
                <input name="coverUrl" value={data.coverUrl} onChange={handleChange} placeholder="https://..." className="w-full p-3 border rounded-xl" />
            </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center gap-4">
            {data.logoUrl && <img src={data.logoUrl} alt="Logo" className="w-16 h-16 rounded-full object-cover shadow-sm" />}
            <div>
                <h3 className="font-bold" style={{ color: data.primaryColor }}>{data.name}</h3>
                <span className="text-xs text-gray-500">Prévia visual do título</span>
            </div>
        </div>

        <button disabled={loading} type="submit" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50">
            {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
    </form>
  )
}