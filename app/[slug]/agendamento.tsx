"use client"

import { useState, useEffect } from "react"

interface BookingProps {
  tenant: any
  services: any[]
  professionals: any[]
  themeConfig: any
  themeVariant: string
  splashUrl: string
}

// --- O DICIONÁRIO INTELIGENTE ---
const TEXT_LABELS: any = {
  BARBER: { 
    pro: "Profissional", 
    service: "Serviço", 
    emoji: "💈", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
    ),
    action: "Cortar com", 
    welcome: "Estilo & Tradição" 
  },
  BEAUTY: { 
    pro: "Especialista", 
    service: "Procedimento", 
    emoji: "💅", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 13.5L19 19"/><path d="M21 21L15.5 15.5"/><path d="M9 4a5 5 0 1 0 5 5v5H9V4Z"/><path d="M12 9h.01"/><path d="M4.5 16.5c-1 1-2.5 1-2.5 1s.5-1.5 1-2.5 1-2.5 2.5-1 2.5-1S7.5 15.5 4.5 16.5Z"/></svg>
    ),
    action: "Agendar com", 
    welcome: "Realce sua beleza" 
  },
  TATTOO: { 
    pro: "Tatuador(a)", 
    service: "Sessão", 
    emoji: "🐉", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 15 2 2"/><path d="m14 13 2 2"/><path d="m2 2 20 20"/><path d="m9 7 2 2"/><path d="m7 9 2 2"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
    ),
    action: "Riscar com", 
    welcome: "Arte na pele" 
  },
  CLINIC: { 
    pro: "Doutor(a)", 
    service: "Exame/Consulta", 
    emoji: "⚕️", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 0 0 5 2h14a.3.3 0 0 0 .2.3l-2 2a.3.3 0 0 0-.2.3v11.8a.3.3 0 0 0 .2.3l2 2a.3.3 0 0 0-.2.3H5a.3.3 0 0 0-.2-.3l2-2a.3.3 0 0 0 .2-.3V4.6a.3.3 0 0 0-.2-.3l-2-2Z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
    ),
    action: "Consulta com", 
    welcome: "Sua saúde em dia" 
  },
  PHOTOGRAPHY: { 
    pro: "Fotógrafo(a)", 
    service: "Ensaio", 
    emoji: "📸", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
    ),
    action: "Fotografar com", 
    welcome: "Eternize momentos" 
  },
  PROFESSIONAL: { 
    pro: "Consultor(a)", 
    service: "Serviço", 
    emoji: "💼", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    ),
    action: "Reunião com", 
    welcome: "Soluções Profissionais" 
  },
  // NOVO TEMA: RESTAURANTES (Com ajuste gramatical "article: a")
  RESTAURANT: { 
    pro: "Unidade", 
    service: "Reserva", 
    emoji: "🍽️", 
    article: "a", // Define que deve usar "a" em vez de "o"
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
    ),
    action: "Reservar", 
    welcome: "Sabor Inesquecível" 
  }
}

export default function BookingSystem({ tenant, services, professionals, themeConfig, themeVariant, splashUrl }: BookingProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeSplash, setFadeSplash] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [selectedPro, setSelectedPro] = useState<any>(null)
  const [availableServices, setAvailableServices] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [daySlots, setDaySlots] = useState<{ time: string, available: boolean }[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const primaryColor = tenant.primaryColor || "#0f172a" 

  const labels = TEXT_LABELS[themeVariant] || TEXT_LABELS.BARBER
  // Ajuste gramatical seguro: se tiver article definido usa ele, senão usa 'o'
  const article = labels.article || 'o'

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeSplash(true), 2500)
    const timer2 = setTimeout(() => setShowSplash(false), 3000)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [])

  const totalPrice = selectedServices.reduce((acc, s) => acc + Number(s.price), 0)
  const totalDuration = selectedServices.reduce((acc, s) => acc + s.durationMin, 0)

  function handleProSelect(pro: any) {
    setSelectedPro(pro)
    const proServices = services.filter(s => s.professionalId === pro.id || !s.professionalId)
    setAvailableServices(proServices)
    setSelectedServices([])
    setStep(2)
  }

  useEffect(() => {
    if (step === 4 && selectedPro && selectedDate) fetchSlots()
  }, [step, selectedPro, selectedDate])

  async function fetchSlots() {
    setLoadingSlots(true)
    setDaySlots([]) 
    try {
        const url = `/api/agendar/disponibilidade?professionalId=${selectedPro.id}&date=${selectedDate}&duration=${totalDuration}`
        const res = await fetch(url)
        if (res.ok) {
            const data = await res.json()
            if (Array.isArray(data)) setDaySlots(data)
        }
    } catch (error) { console.error(error) } 
    finally { setLoadingSlots(false) }
  }

  function toggleService(service: any) {
    const exists = selectedServices.find(s => s.id === service.id)
    if (exists) setSelectedServices(prev => prev.filter(s => s.id !== service.id))
    else setSelectedServices(prev => [...prev, service])
  }

  function formatDateDisplay(dateString: string) {
    if (!dateString) return ""
    const [ano, mes, dia] = dateString.split('-')
    return `${dia}/${mes}/${ano}`
  }

  async function handleFinish() {
    setLoading(true)
    const dataFinal = new Date(`${selectedDate}T${selectedTime}:00`)
    try {
        const response = await fetch('/api/agendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tenantId: tenant.id,
                serviceIds: selectedServices.map(s => s.id),
                professionalId: selectedPro.id,
                date: dataFinal.toISOString(),
                customerName,
                customerPhone
            })
        })
        if (response.ok) setStep(6)
        else {
            const erro = await response.json()
            alert(erro.error || "Erro.")
            fetchSlots()
            setStep(4)
        }
    } catch (error) { alert("Erro de conexão.") } 
    finally { setLoading(false) }
  }

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${fadeSplash ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 z-0">
             <img src={splashUrl} className="w-full h-full object-cover opacity-80" alt="Tema" />
             <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white p-6 animate-in zoom-in duration-1000 flex flex-col items-center">
            {tenant.logoUrl ? (
                <img src={tenant.logoUrl} className="w-28 h-28 rounded-full mb-6 shadow-2xl border-4 border-white/20 object-cover" />
            ) : (
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full mb-6 flex items-center justify-center text-3xl font-bold border border-white/20">
                    {tenant.name.charAt(0)}
                </div>
            )}
            <h1 className="text-3xl font-black tracking-tight drop-shadow-xl mb-2">{tenant.name}</h1>
            <p className="text-sm font-bold text-white/90 uppercase tracking-widest bg-white/10 px-4 py-1 rounded-full backdrop-blur-md border border-white/10">
                {labels.welcome}
            </p>
            <div className="mt-10">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div>
       {/* HERO */}
       <div className="relative w-full h-64 overflow-hidden shadow-2xl">
         {tenant.coverUrl ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tenant.coverUrl})` }}>
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
         ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black"></div>
         )}
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 text-white">
             <div className={`w-24 h-24 ${themeConfig.rounded} overflow-hidden border-4 border-white/90 shadow-2xl bg-white mb-4`}>
                {tenant.logoUrl ? (
                    <img src={tenant.logoUrl} className="w-full h-full object-cover"/>
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-black font-bold text-3xl">
                        {tenant.name.charAt(0)}
                    </div>
                )}
             </div>
             <h1 className="text-2xl md:text-3xl font-black leading-tight drop-shadow-lg max-w-lg">{tenant.name}</h1>
             <p className="text-xs md:text-sm opacity-90 mt-2 font-bold bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                 {labels.emoji} Agendamento Online
             </p>
         </div>
       </div>

       <div className="max-w-md mx-auto -mt-8 relative z-20 px-4 pb-20">
          <div className={`bg-white shadow-2xl ${themeConfig.rounded} overflow-hidden min-h-[400px]`}>
             
             {step < 6 && (
                <div className="w-full bg-gray-100 h-1.5 mt-0">
                    <div 
                        className="h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                        style={{ width: `${(step / 5) * 100}%`, backgroundColor: primaryColor }}
                    ></div>
                </div>
             )}

             <div className="p-6 text-gray-800">
                {/* 1. PROFISSIONAIS */}
                {step === 1 && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <h2 className="text-lg font-bold mb-6 flex items-center justify-center gap-2 text-center text-slate-800">
                           <span className="text-primary opacity-80">{labels.icon}</span> 
                           <span>Escolha {article} {labels.pro}</span>
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {professionals.map((pro) => (
                                <div key={pro.id} onClick={() => handleProSelect(pro)} 
                                     className={`group border border-gray-100 p-5 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all text-center relative overflow-hidden active:scale-95 shadow-sm hover:shadow-md hover:border-blue-200`}
                                >
                                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-100 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                                        {pro.photoUrl ? (
                                            <img src={pro.photoUrl} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-black">{pro.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. SERVIÇOS */}
                {step === 2 && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <button onClick={() => setStep(1)} className="text-xs font-bold uppercase text-gray-400 hover:text-black transition-colors">← Voltar</button>
                            <div className="flex-1 text-right">
                                <span className="text-xs text-gray-400">{labels.pro}:</span>
                                <span className="text-sm font-bold block text-gray-900">{selectedPro?.name}</span>
                            </div>
                        </div>
                        
                        <h2 className="text-lg font-bold mb-4 text-center text-slate-800 flex items-center justify-center gap-2">
                             <span className="text-primary opacity-80 w-5 h-5">{labels.icon}</span>
                             <span>Selecione {article} {labels.service}</span>
                        </h2>
                        <div className="space-y-3 mb-24">
                            {availableServices.map((service) => {
                                const isSelected = selectedServices.find(s => s.id === service.id)
                                return (
                                    <div key={service.id} onClick={() => toggleService(service)} 
                                         className={`relative p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center group
                                         ${isSelected 
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
                                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                         }`}
                                    >
                                        <div>
                                            <h3 className="font-bold text-sm">{service.name}</h3>
                                            <p className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>{service.durationMin} min</p>
                                        </div>
                                        <div className="font-bold">R$ {Number(service.price).toFixed(2)}</div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto z-30">
                            <div className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-gray-200 flex justify-between items-center ring-1 ring-black/5">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Estimativa</p>
                                    <p className="text-xl font-black text-slate-900">R$ {totalPrice.toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => setStep(3)}
                                    disabled={selectedServices.length === 0}
                                    className="px-6 py-3 rounded-xl text-white font-bold shadow-lg disabled:opacity-50 transition-transform active:scale-95"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Continuar →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. DATA */}
                {step === 3 && (
                     <div className="animate-in slide-in-from-right-4 duration-500">
                        <button onClick={() => setStep(2)} className="text-xs font-bold uppercase text-gray-400 hover:text-black mb-4">← Voltar</button>
                        <h2 className="text-lg font-bold mb-4 text-center text-slate-800">Melhor dia para você?</h2>
                        <input 
                            type="date" 
                            className="w-full p-5 border-2 rounded-xl text-xl font-bold text-center text-slate-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 mb-6 transition-all border-gray-200"
                            min={new Date().toISOString().split('T')[0]} 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                         <button 
                            disabled={!selectedDate}
                            onClick={() => setStep(4)}
                            className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl disabled:opacity-50 transition-all hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: selectedDate ? primaryColor : '#ccc' }}
                        >
                            Ver Horários
                        </button>
                     </div>
                )}

                {/* 4. HORÁRIOS */}
                {step === 4 && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <button onClick={() => setStep(3)} className="text-xs font-bold uppercase text-gray-400 hover:text-black mb-4">← Alterar Dia</button>
                        <h2 className="text-lg font-bold mb-1 text-slate-800">Horários Livres</h2>
                        <p className="text-xs text-gray-500 mb-6">Agenda de <strong>{formatDateDisplay(selectedDate)}</strong></p>

                        {loadingSlots ? (
                            <div className="grid grid-cols-4 gap-3 animate-pulse">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="h-12 bg-gray-100 rounded-xl"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-3 max-h-80 overflow-y-auto pb-4 custom-scrollbar">
                                {daySlots.length === 0 ? (
                                    <div className="col-span-4 text-center py-10 bg-gray-50 rounded-xl text-gray-400 text-sm">
                                        Sem horários disponíveis 😕
                                    </div>
                                ) : (
                                    daySlots.map((slot) => (
                                        <button 
                                            key={slot.time} 
                                            disabled={!slot.available} 
                                            onClick={() => { setSelectedTime(slot.time); setStep(5); }}
                                            className={`
                                                py-3 rounded-xl text-sm font-bold transition-all border
                                                ${!slot.available
                                                    ? 'bg-gray-50 text-gray-300 border-transparent cursor-not-allowed opacity-60' 
                                                    : 'bg-white hover:bg-slate-900 hover:text-white border-gray-200 text-slate-800 shadow-sm active:scale-95 hover:shadow-md'
                                                }
                                            `}
                                        >
                                            {slot.time}
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* 5. CONFIRMAÇÃO */}
                {step === 5 && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">Quase lá! 🚀</h2>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl mb-6 border border-gray-100 relative overflow-hidden shadow-inner">
                            <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: primaryColor }}></div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">{labels.service}s:</span>
                                    <span className="font-bold text-right w-1/2 text-slate-900">{selectedServices.map(s => s.name).join(', ')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">{labels.pro}:</span>
                                    <span className="font-bold bg-white px-2 py-1 rounded border border-gray-200 text-slate-900">{selectedPro?.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Quando:</span>
                                    <span className="font-bold text-slate-900">{formatDateDisplay(selectedDate)} às {selectedTime}</span>
                                </div>
                                <div className="pt-4 flex justify-between text-base items-center">
                                    <span className="font-bold text-slate-900">Total:</span>
                                    <span className="font-black text-lg text-green-600 bg-green-50 px-3 py-1 rounded-lg">R$ {totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <span className="absolute left-4 top-4 text-gray-400 group-focus-within:text-slate-900 transition-colors">👤</span>
                                <input 
                                    type="text" placeholder="Seu Nome Completo" 
                                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:border-transparent outline-none transition-all font-medium text-slate-900" 
                                    style={{ '--tw-ring-color': primaryColor } as any}
                                    value={customerName} onChange={(e) => setCustomerName(e.target.value)} 
                                />
                            </div>
                            <div className="relative group">
                                <span className="absolute left-4 top-4 text-gray-400 group-focus-within:text-slate-900 transition-colors">📱</span>
                                <input 
                                    type="tel" placeholder="(DDD) WhatsApp" 
                                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:border-transparent outline-none transition-all font-medium text-slate-900" 
                                    style={{ '--tw-ring-color': primaryColor } as any}
                                    value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} 
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleFinish} 
                            disabled={!customerName || !customerPhone || loading} 
                            className="w-full mt-8 py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-gray-200 disabled:opacity-50 hover:opacity-90 transition-all active:scale-95" 
                            style={{ backgroundColor: primaryColor }}
                        >
                            {loading ? "Confirmando..." : "Confirmar Agendamento"}
                        </button>
                    </div>
                )}

                {/* 6. SUCESSO - CORREÇÃO TEXTO EG */}
                {step === 6 && (
                    <div className="text-center animate-in zoom-in duration-500 py-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-green-200 shadow-xl border-4 border-white">
                            <span className="text-4xl">✅</span>
                        </div>
                        <h2 className="text-3xl font-black mb-1 text-slate-900 tracking-tight">Agendado!</h2>
                        <p className="text-slate-500 mb-8 text-sm font-medium">Tudo certo, {customerName.split(' ')[0]}.</p>

                        <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-200 text-left relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center bg-slate-100 py-1 rounded">Resumo do Pedido</p>
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">{labels.service}:</span>
                                    <span className="font-bold text-slate-900 text-right max-w-[60%] leading-tight">{selectedServices.map(s => s.name).join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">{labels.pro}:</span>
                                    <span className="font-bold text-slate-900">{selectedPro?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Data e Hora:</span>
                                    <span className="font-bold text-slate-900 bg-white px-2 rounded border border-slate-100">{formatDateDisplay(selectedDate)} às {selectedTime}</span>
                                </div>
                                <div className="border-t border-slate-200 my-2"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-900 font-bold">Valor Total:</span>
                                    <span className="font-black text-green-600 text-lg">R$ {totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* CORREÇÃO AQUI: EG EMPÓRIO DIGITAL */}
                        <div className="bg-zinc-900 text-white p-5 rounded-2xl shadow-2xl relative overflow-hidden group border border-zinc-700">
                             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">EG Empório Digital</p>
                             <h3 className="text-lg font-bold mb-4">Gostou da experiência?</h3>
                             <a href="/" className="inline-block bg-white text-black text-xs font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-white/10">
                                 Testar Grátis Agora
                             </a>
                        </div>
                        
                        <button onClick={() => window.location.reload()} className="mt-8 text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-wide">
                            Fazer outro agendamento
                        </button>
                    </div>
                )}
             </div>
          </div>
       </div>
    </div>
  )
}