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

  // ESTADOS PARA NOTIFICAÇÃO E MODAL (DESIGN RESTAURADO)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null)

  useEffect(() => { loadData() }, [])

  // Timer para sumir a notificação
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  async function loadData() {
    setLoading(true)
    try {
      // Dispara os 3 pedidos ao mesmo tempo (ganho de velocidade real)
      const [resServices, resPros, resTenant] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/professionals'),
        fetch('/api/admin/tenant').catch(() => null) // Não trava se o tenant der erro
      ])

      const [dataServices, dataPros] = await Promise.all([
        resServices.json(),
        resPros.json()
      ])

      if (resServices.ok) setServices(dataServices)
      if (resPros.ok) {
        setProfessionals(dataPros)
        if (dataPros.length > 0 && !selectedProId) setSelectedProId(dataPros[0].id)
      }
      
      if (resTenant && resTenant.ok) {
        const dataTenant = await resTenant.json()
        if (dataTenant.theme) setTheme(dataTenant.theme)
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    if (professionals.length === 0) {
        setNotification({ message: "Cadastre um profissional antes.", type: 'error' })
        return
    }
    setSaving(true)
    try {
        const res = await fetch('/api/admin/services', {
            method: 'POST',
            body: JSON.stringify({ name, price, duration, professionalId: selectedProId || null })
        })

        if (res.ok) {
            await loadData()
            setName("")
            setPrice("")
            setDuration("30")
            setNotification({ message: "Serviço adicionado!", type: 'success' })
        } else {
            setNotification({ message: "Erro ao salvar", type: 'error' })
        }
    } catch (error) { setNotification({ message: "Erro de conexão", type: 'error' }) } 
    finally { setSaving(false) }
  }

  async function handleDelete() {
    if (!showConfirmDelete) return
    const id = showConfirmDelete
    try {
        const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' })
        if (res.ok) {
            setServices(prev => prev.filter(s => s.id !== id))
            setNotification({ message: "Serviço excluído", type: 'success' })
        } else {
            setNotification({ message: "Erro ao excluir", type: 'error' })
        }
    } catch (error) {
        setNotification({ message: "Erro de conexão", type: 'error' })
    } finally {
        setShowConfirmDelete(null)
    }
  }

  const ThemeIcon = getServiceIcon(theme)

  return (
    <div className="min-h-[100dvh] bg-slate-50 p-6 md:p-12 font-sans overflow-x-hidden relative text-slate-800">
      
      {/* NOTIFICAÇÃO TOAST */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] animate-in slide-in-from-top-4">
          <div className={`px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${
            notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            <span className="text-xs font-bold uppercase tracking-widest">{notification.message}</span>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-xs w-full shadow-2xl text-center">
            <h3 className="text-slate-900 font-bold mb-2">Apagar serviço?</h3>
            <p className="text-slate-500 text-xs mb-8">Essa ação não pode ser desfeita.</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleDelete} className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl hover:bg-rose-700 transition-colors uppercase text-[10px] tracking-widest shadow-sm">Confirmar Exclusão</button>
              <button onClick={() => setShowConfirmDelete(null)} className="w-full text-slate-500 hover:text-slate-800 font-bold py-3 uppercase text-[10px] tracking-widest transition-colors">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        
        {/* CABEÇALHO COM BOTÃO ACIMA E TÍTULO EM LINHA RETA */}
        <div className="flex flex-col items-start gap-4 mb-8">
            <Link 
              href="/admin" 
              className="group h-[40px] px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Voltar</span>
            </Link>
            
            <div>
                 <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
                    <ThemeIcon className="w-7 h-7 md:w-8 md:h-8 text-blue-600 shrink-0" />
                    <span className="whitespace-nowrap">Catálogo de Serviços</span>
                 </h1>
                 <p className="text-slate-500 text-xs md:text-sm mt-1">Defina os preços, durações e profissionais.</p>
            </div>
        </div>

        {/* CONTAINER DO FORMULÁRIO BRANCO COM PROFUNDIDADE */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] border border-slate-100/80 mb-10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            
            <h2 className="text-base md:text-lg font-black mb-6 text-slate-900 flex items-center gap-2.5">
                <span className="bg-blue-600 shadow-sm w-1.5 h-6 rounded-full"></span>
                Novo Serviço
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome do Serviço</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Ex: Serviço Premium" 
                        className="w-full p-3.5 border border-slate-200 focus:border-blue-500 rounded-2xl mt-1.5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Preço (R$)</label>
                        <input 
                          type="number" 
                          value={price} 
                          onChange={e => setPrice(e.target.value)} 
                          placeholder="0.00" 
                          className="w-full p-3.5 border border-slate-200 focus:border-blue-500 rounded-2xl mt-1.5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200" 
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Minutos</label>
                        <input 
                          type="number" 
                          value={duration} 
                          onChange={e => setDuration(e.target.value)} 
                          step="5" 
                          className="w-full p-3.5 border border-slate-200 focus:border-blue-500 rounded-2xl mt-1.5 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200" 
                        />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Realizado por:</label>
                    <select 
                        value={selectedProId} 
                        onChange={e => setSelectedProId(e.target.value)}
                        className="w-full p-3.5 border border-slate-200 focus:border-blue-500 bg-slate-50 rounded-2xl mt-1.5 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none cursor-pointer transition-all duration-200"
                    >
                        <option value="">Todos os Especialistas</option>
                        {professionals.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button 
              onClick={handleCreate} 
              disabled={!name || !price || saving} 
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black rounded-2xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.99] text-sm uppercase tracking-widest disabled:opacity-40 disabled:pointer-events-none"
            >
                {saving ? "Salvando..." : "Adicionar Serviço"}
            </button>
        </div>

        {/* LISTA DE SERVIÇOS BRANCOS COM EFEITO DE PROFUNDIDADE */}
        <div className="space-y-4 pb-20">
            {services.map(s => (
                <div 
                  key={s.id} 
                  className="bg-white p-4 md:p-5 rounded-3xl border border-slate-100/80 hover:border-blue-300/80 flex justify-between items-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden group"
                >
                    <div className="flex items-center gap-4 min-w-0">
                        {/* ÍCONE DO SERVIÇO */}
                        <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 shadow-sm">
                            <ThemeIcon className="w-5.5 h-5.5" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-extrabold text-base md:text-lg text-slate-900 leading-tight truncate">
                              {s.name}
                            </h3>
                            <div className="flex flex-row items-center gap-2.5 text-xs text-slate-500 mt-1.5">
                                <span className="flex items-center gap-1 font-medium">
                                  ⏱ {s.durationMin} min
                                </span>
                                <span className="text-slate-200">|</span>
                                <span className="text-emerald-700 font-black bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg text-[11px] tracking-tight shadow-sm">
                                  R$ {Number(s.price).toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* INFO DO PROFISSIONAL E EXCLUSÃO */}
                    <div className="flex items-center gap-4 shrink-0 pl-2">
                        <div className="text-right hidden sm:block">
                             <p className="text-[8px] md:text-[9px] uppercase font-black text-slate-400 tracking-wider">Profissional</p>
                             <p className="text-xs font-bold text-slate-700 max-w-[100px] truncate">
                               {s.professional?.name ? s.professional.name.split(' ')[0] : 'Todos'}
                             </p>
                        </div>
                        <button 
                          onClick={() => setShowConfirmDelete(s.id)} 
                          className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 flex items-center justify-center transition-all shrink-0 shadow-sm"
                        >
                          🗑️
                        </button>
                    </div>
                </div>
            ))}
            
            {services.length === 0 && !loading && (
              <div className="text-center text-slate-400 py-12 bg-white rounded-[2rem] border border-slate-200 font-bold uppercase tracking-widest text-xs shadow-sm">
                Nenhum serviço cadastrado ainda.
              </div>
            )}
        </div>

      </div>
    </div>
  )
}