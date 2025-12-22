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

  // Lógica para transformar arquivo em Base64 (Texto para salvar no banco)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
      // Limite de tamanho simples (2MB) para não travar o banco
      if (file.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setData(prev => ({ ...prev, [field]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
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
        window.location.reload() // Recarrega para aplicar mudanças
    } else {
        alert('Erro ao salvar.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
        
        {/* Identidade Visual */}
        <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Identidade Visual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Negócio</label>
                    <input name="name" value={data.name} onChange={handleChange} className="w-full p-3 border rounded-xl bg-gray-50" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cor da Página</label>
                    <div className="flex items-center gap-3">
                        <input 
                            type="color" 
                            name="primaryColor" 
                            value={data.primaryColor} 
                            onChange={handleChange} 
                            className="h-12 w-12 rounded-lg cursor-pointer border border-gray-200" 
                        />
                        <span className="text-sm text-gray-500 uppercase">{data.primaryColor}</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Tema */}
        <section>
            <label className="block text-sm font-bold text-gray-700 mb-2">Ramo de Atuação (Tema)</label>
            <select name="themeVariant" value={data.themeVariant} onChange={handleChange} className="w-full p-3 border rounded-xl bg-white">
                <option value="BARBER">💈 Barbearia</option>
                <option value="BEAUTY">💅 Salão de Beleza</option>
                <option value="TATTOO">🐉 Estúdio de Tattoo</option>
                <option value="CLINIC">⚕️ Clínica / Saúde</option>
            </select>
        </section>

        {/* Imagens (Upload) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LOGO */}
            <div className="border border-gray-200 p-4 rounded-xl">
                <label className="block text-sm font-bold text-gray-700 mb-2">Seu Logo</label>
                <div className="flex items-center gap-4 mb-3">
                    {data.logoUrl ? (
                        <img src={data.logoUrl} alt="Logo" className="w-16 h-16 rounded-full object-cover border" />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">📷</div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'logoUrl')} 
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
            </div>

            {/* CAPA */}
            <div className="border border-gray-200 p-4 rounded-xl">
                <label className="block text-sm font-bold text-gray-700 mb-2">Imagem de Capa</label>
                <div className="flex flex-col gap-3">
                    {data.coverUrl ? (
                        <img src={data.coverUrl} alt="Capa" className="w-full h-32 object-cover rounded-lg border" />
                    ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Sem capa</div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'coverUrl')} 
                        className="text-sm text-gray-500"
                    />
                </div>
            </div>

        </section>

        <button disabled={loading} type="submit" className="w-full bg-black text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 text-lg shadow-lg">
            {loading ? 'Salvando...' : 'Salvar Tudo'}
        </button>
    </form>
  )
}