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
    phone: tenant.phone || '', // NOVO CAMPO WHATSAPP
  })

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
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
        window.location.reload()
    } else {
        alert('Erro ao salvar.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-10">
        
        {/* Bloco 1: Identidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                    Identidade Básica
                </h3>
                
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome do Negócio</label>
                    <input name="name" value={data.name} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium" />
                </div>
                
                {/* NOVO CAMPO: WHATSAPP DO ESTABELECIMENTO */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">WhatsApp (Contato)</label>
                    <input name="phone" value={data.phone} onChange={handleChange} placeholder="(00) 00000-0000" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cor Principal</label>
                    <div className="flex items-center gap-3">
                        <input type="color" name="primaryColor" value={data.primaryColor} onChange={handleChange} className="h-10 w-10 rounded-lg cursor-pointer border border-slate-200 shadow-sm" />
                        <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{data.primaryColor}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                 <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                    Ramo de Atuação (Tema)
                </h3>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Selecione o Modelo</label>
                    <select name="themeVariant" value={data.themeVariant} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-900 outline-none cursor-pointer hover:bg-slate-50">
                        <option value="BARBER">💈 Barbearia (Dark & Bold)</option>
                        <option value="BEAUTY">💅 Salão de Beleza (Clean & Pink)</option>
                        <option value="TATTOO">🐉 Tattoo Studio (Ink & Grunge)</option>
                        <option value="CLINIC">⚕️ Clínica / Saúde (White & Blue)</option>
                        <option value="PHOTOGRAPHY">📸 Fotografia (Minimal Dark)</option>
                        <option value="PROFESSIONAL">💼 Serviços / Escritório (Corporate)</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-2">Isso adapta automaticamente os textos (ex: "Barbeiro" vira "Fotógrafo") e o visual.</p>
                </div>
            </div>
        </div>

        <hr className="border-slate-100" />

        {/* Bloco 2: Imagens */}
        <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
                <span className="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-xs">3</span>
                Visual
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors bg-slate-50/50">
                    <div className="relative mb-4 group">
                        {data.logoUrl ? (
                            <img src={data.logoUrl} className="w-24 h-24 rounded-full object-cover shadow-lg" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-3xl text-slate-400">📷</div>
                        )}
                    </div>
                    <label className="cursor-pointer bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50">
                        Alterar Logo
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logoUrl')} className="hidden" />
                    </label>
                </div>

                <div className="border-2 border-dashed border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors bg-slate-50/50">
                     <div className="relative mb-4 w-full h-24 bg-slate-200 rounded-lg overflow-hidden group">
                        {data.coverUrl ? (
                            <img src={data.coverUrl} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Sem Capa</div>
                        )}
                    </div>
                    <label className="cursor-pointer bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50">
                        Alterar Capa
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'coverUrl')} className="hidden" />
                    </label>
                </div>
            </div>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white px-6 py-5 rounded-xl font-bold hover:bg-blue-900 disabled:opacity-50 text-lg shadow-xl shadow-blue-900/10 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            {loading ? 'Salvando...' : 'Salvar Alterações ✨'}
        </button>
    </form>
  )
}