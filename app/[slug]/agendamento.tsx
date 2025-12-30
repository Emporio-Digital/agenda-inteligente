"use client"

import { useState, useEffect } from "react"

interface BookingProps {
  tenantId: string
  services: any[]
  professionals: any[]
  primaryColor: string
}

export default function BookingSystem({ tenantId, services, professionals, primaryColor }: BookingProps) {
  // Passos INVERTIDOS: 1=Pro, 2=Serviço, 3=Data, 4=Hora...
  const [step, setStep] = useState(1)
  
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [selectedPro, setSelectedPro] = useState<any>(null)
  
  // Lista de serviços FILTRADA pelo profissional escolhido
  const [availableServices, setAvailableServices] = useState<any[]>([])

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [daySlots, setDaySlots] = useState<{ time: string, available: boolean }[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const totalPrice = selectedServices.reduce((acc, s) => acc + Number(s.price), 0)
  const totalDuration = selectedServices.reduce((acc, s) => acc + s.durationMin, 0)

  // Quando escolhe o profissional, filtra os serviços dele
  function handleProSelect(pro: any) {
    setSelectedPro(pro)
    // Filtra: Mostra serviços que são DELE ou serviços antigos sem dono (retrocompatibilidade)
    const proServices = services.filter(s => s.professionalId === pro.id || !s.professionalId)
    setAvailableServices(proServices)
    setSelectedServices([]) // Limpa seleção anterior para evitar erro
    setStep(2) // Vai para serviços
  }

  // Busca horários (Etapa 4)
  useEffect(() => {
    if (step === 4 && selectedPro && selectedDate) {
        fetchSlots()
    }
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
    if (exists) {
        setSelectedServices(prev => prev.filter(s => s.id !== service.id))
    } else {
        setSelectedServices(prev => [...prev, service])
    }
  }

  // Apenas salva a data, não avança o passo automaticamente
  function handleDateChange(date: string) {
    setSelectedDate(date)
  }
  
  // Função explícita para avançar
  function confirmDate() {
    if(selectedDate) setStep(4)
  }

  // Helper para formatar data visualmente SEM erro de fuso (String pura)
  function formatDateDisplay(dateString: string) {
    if (!dateString) return ""
    const [ano, mes, dia] = dateString.split('-')
    return `${dia}/${mes}/${ano}`
  }

  async function handleFinish() {
    setLoading(true)
    // Cria a data combinada forçando o horário escolhido
    const dataFinal = new Date(`${selectedDate}T${selectedTime}:00`)

    try {
        const response = await fetch('/api/agendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tenantId,
                serviceIds: selectedServices.map(s => s.id),
                professionalId: selectedPro.id,
                date: dataFinal.toISOString(),
                customerName,
                customerPhone
            })
        })

        if (response.ok) {
            setStep(6)
        } else {
            const erro = await response.json()
            alert(erro.error || "Erro.")
            fetchSlots()
            setStep(4)
        }
    } catch (error) { alert("Erro de conexão.") } 
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-zinc-900 font-sans">
      
      {/* HEADER */}
      {step < 6 && (
        <div className="mb-6 flex justify-between items-center text-xs text-gray-400 uppercase tracking-wide">
            <button disabled={step < 2} onClick={() => setStep(1)} className={step >= 1 ? "text-black font-bold" : ""}>Pro</button> &gt;
            <button disabled={step < 3} onClick={() => setStep(2)} className={step >= 2 ? "text-black font-bold" : ""}>Serviços</button> &gt;
            <button disabled={step < 4} onClick={() => setStep(3)} className={step >= 3 ? "text-black font-bold" : ""}>Data</button>
        </div>
      )}

      {/* 1. PROFISSIONAL */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Quem vai te atender?</h2>
          <div className="grid grid-cols-2 gap-4">
            {professionals.map((pro) => (
              <div key={pro.id} onClick={() => handleProSelect(pro)} className="border border-gray-200 p-4 rounded-xl cursor-pointer hover:bg-gray-50 text-center transition-all hover:border-black group">
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center text-2xl overflow-hidden border-2 border-transparent group-hover:border-gray-300">
                  {pro.photoUrl ? <img src={pro.photoUrl} alt={pro.name} className="w-full h-full object-cover"/> : "💈"}
                </div>
                <h3 className="font-bold text-sm text-black">{pro.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SERVIÇOS */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">O que vamos fazer com {selectedPro?.name}?</h2>
          
          <div className="space-y-3">
            {availableServices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Este profissional ainda não tem serviços cadastrados.</p>
            ) : availableServices.map((service) => {
                const isSelected = selectedServices.find(s => s.id === service.id)
                return (
                    <div key={service.id} onClick={() => toggleService(service)} 
                        className={`border p-4 rounded-xl flex justify-between items-center cursor-pointer transition-all 
                        ${isSelected ? 'bg-zinc-900 text-white border-black shadow-md' : 'hover:bg-gray-50 border-gray-200'}
                        `}>
                        <div>
                            <h3 className="font-bold text-sm">{service.name}</h3>
                            <p className={`text-xs ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>{service.durationMin} min</p>
                        </div>
                        <div className="font-bold text-sm">R$ {Number(service.price).toFixed(2)}</div>
                    </div>
                )
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <div className="flex justify-between items-center mb-4 font-medium">
                <span className="text-sm text-gray-500">Resumo:</span>
                <span className="text-lg font-bold">{totalDuration} min • R$ {totalPrice.toFixed(2)}</span>
            </div>
            <button 
                disabled={selectedServices.length === 0}
                onClick={() => setStep(3)}
                className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg disabled:opacity-50 transition-all"
                style={{ backgroundColor: selectedServices.length > 0 ? primaryColor : '#ccc' }}
            >
                Continuar
            </button>
            <button onClick={() => setStep(1)} className="text-sm text-gray-400 mt-4 underline w-full text-center">Trocar Profissional</button>
          </div>
        </div>
      )}

      {/* 3. DATA */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Escolha a data</h2>
          <input 
            type="date" 
            className="w-full p-4 border-2 rounded-xl text-lg font-bold text-center text-black bg-white focus:outline-none focus:ring-2"
            style={{ borderColor: primaryColor }}
            min={new Date().toISOString().split('T')[0]} 
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
          <button 
              disabled={!selectedDate}
              onClick={confirmDate}
              className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg disabled:opacity-50 transition-all mt-4"
              style={{ backgroundColor: selectedDate ? primaryColor : '#ccc' }}
          >
              Ver Horários
          </button>
          <button onClick={() => setStep(2)} className="text-sm text-gray-400 mt-4 underline w-full text-center">Voltar</button>
        </div>
      )}

      {/* 4. HORÁRIO */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Horário de Início</h2>
          <p className="text-xs text-gray-500 mb-4">Duração total: <span className="font-bold">{totalDuration} min</span></p>
          
          {loadingSlots ? (
            <div className="text-center py-10 text-gray-400 animate-pulse">Verificando agenda...</div>
          ) : (
            <div className="grid grid-cols-4 gap-2 mt-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {daySlots.length === 0 ? (
                    <div className="col-span-4 text-center py-4 text-gray-400 text-sm">Nenhum horário disponível.</div>
                ) : (
                    daySlots.map((slot) => (
                        <button 
                        key={slot.time} 
                        disabled={!slot.available} 
                        onClick={() => { setSelectedTime(slot.time); setStep(5); }}
                        className={`
                            py-2 rounded-lg border text-sm font-semibold transition-all relative
                            ${!slot.available
                                ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed opacity-60' 
                                : 'bg-white hover:bg-black hover:text-white border-gray-200 text-black shadow-sm cursor-pointer'
                            }
                        `}
                        style={slot.available ? { borderColor: primaryColor } : {}}
                        >
                        {slot.time}
                        </button>
                    ))
                )}
            </div>
          )}
          
          <button onClick={() => setStep(3)} className="text-sm text-gray-400 mt-6 underline w-full text-center">Trocar Data</button>
        </div>
      )}

      {/* 5. CONFIRMAR - CORRIGIDO O BUG VISUAL DA DATA */}
      {step === 5 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-6 text-black text-center">Confirmar Agendamento</h2>
          
          <div className="bg-gray-50 p-5 rounded-xl mb-6 text-sm space-y-3 text-black border border-gray-100 shadow-inner">
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Serviços:</span>
                <span className="font-bold text-right max-w-[60%]">{selectedServices.map(s => s.name).join(', ')}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Profissional:</span>
                <span className="font-bold">{selectedPro?.name}</span>
            </div>
            
            {/* CORREÇÃO AQUI: Usa a função formatDateDisplay para não ter erro de fuso */}
            <div className="flex justify-between">
                <span className="text-gray-500">Data e Hora:</span>
                <span className="font-bold">{formatDateDisplay(selectedDate)} às {selectedTime}</span>
            </div>
            
            <div className="flex justify-between pt-2 text-base">
                <span className="text-gray-900 font-bold">Total:</span>
                <span className="text-green-600 font-black">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Seu Nome</label>
                <input 
                  type="text" placeholder="Ex: João Silva" 
                  className="w-full p-4 border rounded-xl text-black bg-white focus:ring-2 focus:border-transparent outline-none" 
                  style={{ borderColor: primaryColor }} 
                  value={customerName} onChange={(e) => setCustomerName(e.target.value)} 
                />
            </div>
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Seu WhatsApp</label>
                <input 
                  type="tel" placeholder="(00) 00000-0000" 
                  className="w-full p-4 border rounded-xl text-black bg-white focus:ring-2 focus:border-transparent outline-none" 
                  style={{ borderColor: primaryColor }}
                  value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} 
                />
            </div>
          </div>

          <button onClick={handleFinish} disabled={!customerName || !customerPhone || loading} className="w-full mt-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg disabled:opacity-50 hover:opacity-90 transition-opacity" style={{ backgroundColor: primaryColor }}>
            {loading ? "Processando..." : "Confirmar Agendamento"}
          </button>
          <button onClick={() => setStep(4)} className="text-sm text-gray-400 mt-4 underline w-full text-center">Voltar</button>
        </div>
      )}

      {/* 6. SUCESSO (Com Marketing) */}
      {step === 6 && (
        <div className="text-center animate-in zoom-in duration-500 py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-black">Agendado com Sucesso!</h2>
            <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                Prontinho, <strong>{customerName}</strong>. Já separamos seu horário com o <strong>{selectedPro?.name}</strong>.
            </p>

            <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 border border-zinc-800">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500 opacity-20 blur-2xl transition-opacity group-hover:opacity-40"></div>
                <a href="/" target="_blank" className="relative z-10 flex flex-col items-center gap-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Curtiu a praticidade?</p>
                    <div className="text-center">
                        <span className="block text-xl font-black text-white">Tenha uma Agenda Assim 🚀</span>
                        <span className="text-xs text-zinc-400 mt-1 block">Simples, rápida e inteligente para o seu negócio.</span>
                    </div>
                    <div className="mt-3 rounded-lg bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-black shadow-md transition-transform group-hover:scale-105">
                        Criar Minha Agenda Grátis
                    </div>
                </a>
            </div>

            <button onClick={() => window.location.reload()} className="mt-8 text-sm text-gray-400 hover:text-gray-600 underline">
                Fazer novo agendamento
            </button>
        </div>
      )}
    </div>
  )
}