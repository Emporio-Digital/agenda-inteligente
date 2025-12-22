"use client"

import { useState } from "react"

interface BookingProps {
  tenantId: string
  services: any[]
  professionals: any[]
  primaryColor: string
}

export default function BookingSystem({ tenantId, services, professionals, primaryColor }: BookingProps) {
  const [step, setStep] = useState(1)
  
  // MUDANÇA: Agora é um ARRAY de serviços selecionados
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  
  const [selectedPro, setSelectedPro] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [busyTimeSlots, setBusyTimeSlots] = useState<string[]>([])
  
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const timeSlots = ["09:00", "09:45", "10:30", "11:15", "14:00", "14:45", "15:30", "16:15", "17:00", "18:00"]

  // --- CÁLCULOS ---
  const totalPrice = selectedServices.reduce((acc, s) => acc + Number(s.price), 0)
  const totalDuration = selectedServices.reduce((acc, s) => acc + s.durationMin, 0)

  // --- FUNÇÕES ---

  // Lógica de Multi-Seleção (Toggle)
  function toggleService(service: any) {
    const exists = selectedServices.find(s => s.id === service.id)
    if (exists) {
        setSelectedServices(prev => prev.filter(s => s.id !== service.id))
    } else {
        setSelectedServices(prev => [...prev, service])
    }
  }

  function handleProfessionalSelect(pro: any) {
    setSelectedPro(pro)
    setStep(3)
  }

  async function handleDateSelect(date: string) {
    setSelectedDate(date)
    setBusyTimeSlots([]) 
    // Nota: A lógica de disponibilidade completa (calculando os 45min no buraco da agenda) 
    // requer uma API mais robusta. No MVP, checamos se o horário de INÍCIO está livre.
    try {
      const res = await fetch(`/api/disponibilidade?professionalId=${selectedPro.id}&date=${date}`)
      const data = await res.json()
      if (data.busySlots) setBusyTimeSlots(data.busySlots)
    } catch (error) { console.error(error) }
    setStep(4)
  }

  async function handleFinish() {
    setLoading(true)
    const dataFinal = new Date(`${selectedDate}T${selectedTime}:00`)

    try {
        const response = await fetch('/api/agendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tenantId,
                serviceIds: selectedServices.map(s => s.id), // Envia LISTA de IDs
                professionalId: selectedPro.id,
                date: dataFinal.toISOString(),
                customerName,
                customerPhone
            })
        })

        if (response.ok) setStep(6)
        else alert("Erro ao agendar.")
    } catch (error) {
        alert("Erro de conexão.")
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-zinc-900 font-sans">
      
      {/* HEADER */}
      {step < 6 && (
        <div className="mb-6 flex justify-between items-center text-xs text-gray-400 uppercase tracking-wide">
            <span className={step >= 1 ? "text-black font-bold" : ""}>Serviços</span> &gt;
            <span className={step >= 2 ? "text-black font-bold" : ""}>Pro</span> &gt;
            <span className={step >= 3 ? "text-black font-bold" : ""}>Data</span>
        </div>
      )}

      {/* 1. SELEÇÃO DE SERVIÇOS (MULTI) */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Selecione os serviços</h2>
          <p className="text-sm text-gray-500 mb-4">Você pode selecionar mais de um.</p>
          
          {services.map((service) => {
            const isSelected = selectedServices.find(s => s.id === service.id)
            return (
                <div key={service.id} onClick={() => toggleService(service)} 
                    className={`border p-4 rounded-lg flex justify-between cursor-pointer transition-all 
                    ${isSelected ? 'bg-gray-900 text-white border-black' : 'hover:bg-gray-50 border-gray-200'}
                    `}>
                    <div>
                        <h3 className="font-bold">{service.name}</h3>
                        <p className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>{service.durationMin} min</p>
                    </div>
                    <div className="font-bold">R$ {Number(service.price).toFixed(2)}</div>
                </div>
            )
          })}

          {/* BARRA DE RESUMO */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <div className="flex justify-between items-center mb-4 font-medium">
                <span>Total estimado:</span>
                <span>{totalDuration} min • R$ {totalPrice.toFixed(2)}</span>
            </div>
            <button 
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-lg text-white font-bold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: selectedServices.length > 0 ? primaryColor : '#ccc' }}
            >
                Continuar
            </button>
          </div>
        </div>
      )}

      {/* 2. PROFISSIONAL */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Quem vai te atender?</h2>
          <div className="grid grid-cols-2 gap-4">
            {professionals.map((pro) => (
              <div key={pro.id} onClick={() => handleProfessionalSelect(pro)} className="border border-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-50 text-center transition-all">
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-2xl overflow-hidden border-2 border-transparent hover:border-gray-300">
                  {pro.photoUrl ? <img src={pro.photoUrl} alt={pro.name} className="w-full h-full object-cover"/> : "✂️"}
                </div>
                <h3 className="font-bold text-sm text-black">{pro.name}</h3>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-gray-400 mt-4 underline w-full">Voltar</button>
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
            onChange={(e) => handleDateSelect(e.target.value)}
          />
          <button onClick={() => setStep(2)} className="text-sm text-gray-400 mt-4 underline w-full">Voltar</button>
        </div>
      )}

      {/* 4. HORÁRIO */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Horário de Início</h2>
          <p className="text-xs text-gray-500 mb-4">Duração total: {totalDuration} min</p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {timeSlots.map((time) => {
               const isBusy = busyTimeSlots.includes(time)
               return (
                 <button key={time} disabled={isBusy} onClick={() => { setSelectedTime(time); setStep(5); }}
                   className={`py-2 rounded-md border text-sm font-semibold transition-colors
                     ${isBusy ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through' : 'hover:bg-black hover:text-white border-gray-200 text-black'}
                   `}
                   style={!isBusy ? { borderColor: primaryColor } : {}}
                 >
                   {time}
                 </button>
               )
            })}
          </div>
          <button onClick={() => setStep(3)} className="text-sm text-gray-400 mt-6 underline w-full">Trocar Data</button>
        </div>
      )}

      {/* 5. FINALIZAR */}
      {step === 5 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300 text-center">
          <h2 className="text-xl font-bold mb-6 text-black">Confirmar</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left text-sm space-y-2 text-black border border-gray-100">
            <p><strong className="text-gray-600">Serviços:</strong> {selectedServices.map(s => s.name).join(' + ')}</p>
            <p><strong className="text-gray-600">Total:</strong> R$ {totalPrice.toFixed(2)} ({totalDuration} min)</p>
            <p><strong className="text-gray-600">Pro:</strong> {selectedPro?.name}</p>
            <p><strong className="text-gray-600">Data:</strong> {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}</p>
          </div>

          <div className="space-y-3">
            <input type="text" placeholder="Seu Nome" className="w-full p-3 border rounded-lg text-black bg-white" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <input type="tel" placeholder="WhatsApp" className="w-full p-3 border rounded-lg text-black bg-white" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
          </div>

          <button onClick={handleFinish} disabled={!customerName || !customerPhone || loading} className="w-full mt-6 py-4 rounded-lg text-white font-bold text-lg shadow-md disabled:opacity-50" style={{ backgroundColor: primaryColor }}>
            {loading ? "Agendando..." : "Confirmar"}
          </button>
          <button onClick={() => setStep(4)} className="text-sm text-gray-400 mt-4 underline">Voltar</button>
        </div>
      )}

      {/* 6. SUCESSO */}
      {step === 6 && (
        <div className="text-center animate-in zoom-in duration-500 py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 text-black">Tudo Certo!</h2>
            <p className="text-gray-600">Te esperamos lá.</p>
        </div>
      )}
    </div>
  )
}