"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Scissors, 
  Stethoscope, 
  Dumbbell, 
  Car, 
  Camera, 
  Briefcase, 
  PenTool, 
  Utensils, 
  Sparkles, 
  Layers 
} from "lucide-react"

const getServiceIcon = (theme: string) => {
  const map: Record<string, any> = {
    barber: Scissors,       
    barbershop: Scissors,   
    clinic: Stethoscope,    
    doctor: Stethoscope,
    gym: Dumbbell,          
    auto: Car,              
    photo: Camera,          
    consulting: Briefcase,  
    office: Briefcase,
    tatoo: PenTool,         
    tattoo: PenTool,
    food: Utensils,         
    beauty: Sparkles,       
  };
  return map[theme?.toLowerCase()] || Layers;
}

export default function GerenciarServicos() {
  const [services, setServices] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([]) 
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState("") 

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("30")
  const [selectedProId, setSelectedProId] = useState("")

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    const resServices = await fetch('/api/admin/services')
    const dataServices = await resServices.json()
    if (resServices.ok) setServices(dataServices)

    const resPros = await fetch('/api/professionals')
    const dataPros = await resPros.json()
    if (resPros.ok) {
        setProfessionals(dataPros)
        if (dataPros.length > 0) setSelectedProId(dataPros[0].id)
    }

    try {
        const resTenant = await fetch('/api/admin/tenant') 
        if (resTenant.ok) {
            const dataTenant = await resTenant.json()
            if (dataTenant.theme) setTheme(dataTenant.theme)
        }
    } catch (error) { console.log("Usando ícone padrão") }
    setLoading(false)
  }

  async function handleCreate() {
    if (!selectedProId) {
        alert("Cadastre um profissional antes.")
        return
    }
    setSaving(true)
    try {
        const res = await fetch('/api/admin/services', {
            method: 'POST',
            body: JSON.stringify({ name, price, duration, professionalId: selectedProId })
        })

        if (res.ok) {
            await loadData()
            setName("")
            setPrice("")
            setDuration("30")
        } else {
            alert("Erro ao salvar")
        }
    } catch (error) { alert("Erro de conexão") } 
    finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm("Apagar serviço?")) return
    await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' })
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const ThemeIcon = getServiceIcon(theme)

  return (
    // CORREÇÃO: min-h-[100dvh] para evitar borda branca
    <div className="min-h-[100dvh] bg-slate-950 p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
            <Link href="/admin" className="text-slate-400 hover:text-white font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 transition-colors">← Voltar</Link>
            <div>
                 <h1 className="text-3xl font-black text-white flex items-center gap-3">
                    <ThemeIcon className="w-8 h-8 text-blue-600" />
                    Catálogo de Serviços
                 </h1>
                 <p className="text-slate-500">Defina os preços e durações.</p>
            </div>
        </div>

        <div className="bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 mb-10">
            <h2 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <span className="bg-blue-600 w-2 h-6 rounded-full"></span>
                Novo Serviço
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome do Serviço</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Ex: Serviço Premium" 
                        className="w-full p-3 md:p-4 border border-slate-700 rounded-xl mt-1 bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Preço (R$)</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" className="w-full p-3 md:p-4 border border-slate-700 rounded-xl mt-1 bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Minutos</label>
                        <input type="number" value={duration} onChange={e => setDuration(e.target.value)} step="5" className="w-full p-3 md:p-4 border border-slate-700 rounded-xl mt-1 bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="text-xs font-bold text-blue-400 uppercase tracking-wider ml-1">Realizado por:</label>
                    <select 
                        value={selectedProId} 
                        onChange={e => setSelectedProId(e.target.value)}
                        className="w-full p-3 md:p-4 border border-slate-700 bg-slate-800 rounded-xl mt-1 font-bold text-white focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                    >
                        {professionals.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* CORREÇÃO: Botão "Adicionar +" */}
            <button onClick={handleCreate} disabled={!name || !price || saving} className="w-full py-3 md:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 text-sm md:text-lg">
                {saving ? "Salvando..." : "Adicionar +"}
            </button>
        </div>

        <div className="space-y-4 pb-20">
            {services.map(s => (
                <div key={s.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex justify-between items-center shadow-sm hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                            <ThemeIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white">{s.name}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm text-slate-400 mt-1">
                                <span className="flex items-center gap-1">⏱ {s.durationMin} min</span>
                                <span className="text-green-400 font-bold bg-green-900/20 px-2 rounded w-fit">R$ {Number(s.price).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {/* CORREÇÃO: Mostrando nome do Profissional no mobile também */}
                        <div className="text-right">
                             <p className="text-[8px] md:text-[10px] uppercase font-bold text-slate-500">Profissional</p>
                             <p className="text-xs md:text-sm font-bold text-slate-300 max-w-[80px] md:max-w-none truncate">{s.professional?.name || 'Todos'}</p>
                        </div>
                        <button onClick={() => handleDelete(s.id)} className="w-10 h-10 rounded-lg bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all shrink-0">🗑️</button>
                    </div>
                </div>
            ))}
            {services.length === 0 && !loading && <div className="text-center text-slate-500 py-10 bg-slate-900 rounded-2xl border border-slate-800">Nenhum serviço cadastrado ainda.</div>}
        </div>

      </div>
    </div>
  )
}