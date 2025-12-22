"use client"

import { useState } from "react"

interface BookingProps {
  tenantId: string
  services: any[]
  professionals: any[]
  primaryColor: string
}

export default function BookingSystem({ tenantId, services, professionals, primaryColor }: BookingProps) {
  // Passos: 1=Serviço, 2=Pro, 3=DATA, 4=HORA, 5=FIM, 6=SUCESSO
  const [step, setStep] = useState(1)
  
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedPro, setSelectedPro] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<string>("") // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  
  const [busyTimeSlots, setBusyTimeSlots] = useState<string[]>([])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [loading, setLoading] = useState(false)

  // Horários fixos (Isso pode vir do banco no futuro)
  const timeSlots = ["09:00", "09:45", "10:30", "11:15", "14:00", "14:45", "15:30", "16:15", "17:00", "18:00"]

  // --- FUNÇÕES ---
  function handleServiceSelect(service: any) {
    setSelectedService(service)
    setStep(2)
  }

  function handleProfessionalSelect(pro: any) {
    setSelectedPro(pro)
    setStep(3)
  }

  async function handleDateSelect(date: string) {
    setSelectedDate(date)
    setBusyTimeSlots([]) 
    try {
      const res = await fetch(`/api/disponibilidade?professionalId=${selectedPro.id}&date=${date}`)
      const data = await res.json()
      if (data.busySlots) setBusyTimeSlots(data.busySlots)
    } catch (error) {
      console.error(error)
    }
    setStep(4)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
    setStep(5)
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
                serviceId: selectedService.id,
                professionalId: selectedPro.id,
                date: dataFinal.toISOString(),
                customerName,
                customerPhone
            })
        })

        if (response.ok) {
            setStep(6)
        } else {
            alert("Erro ao agendar. Tente novamente.")
        }
    } catch (error) {
        alert("Erro de conexão.")
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-zinc-900 font-sans">
      
      {/* HEADER DE PROGRESSO */}
      {step < 6 && (
        <div className="mb-6 flex justify-between items-center text-xs text-gray-400 uppercase tracking-wide">
            <span className={step >= 1 ? "text-black font-bold" : ""}>Serviço</span> &gt;
            <span className={step >= 2 ? "text-black font-bold" : ""}>Pro</span> &gt;
            <span className={step >= 3 ? "text-black font-bold" : ""}>Data</span> &gt;
            <span className={step >= 4 ? "text-black font-bold" : ""}>Hora</span>
        </div>
      )}

      {/* 1. SERVIÇO */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-xl font-bold mb-4 text-black">O que vamos fazer hoje?</h2>
          {services.map((service) => (
            <div key={service.id} onClick={() => handleServiceSelect(service)} className="border p-4 rounded-lg flex justify-between cursor-pointer hover:bg-gray-50 transition-all border-gray-200 group">
              <div>
                <h3 className="font-bold text-black group-hover:text-gray-700">{service.name}</h3>
                <p className="text-xs text-gray-500">{service.durationMin} min</p>
              </div>
              <div className="font-bold" style={{ color: primaryColor }}>R$ {Number(service.price).toFixed(2)}</div>
            </div>
          ))}
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
          <button onClick={() => setStep(1)} className="text-sm text-gray-400 mt-4 underline w-full hover:text-gray-600">Voltar</button>
        </div>
      )}

      {/* 3. DATA (CALENDÁRIO) */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Qual o melhor dia?</h2>
          <p className="text-sm text-gray-500">Selecione a data no calendário abaixo:</p>
          
          <input 
            type="date" 
            className="w-full p-4 border-2 rounded-xl text-lg font-bold text-center text-black bg-white focus:outline-none focus:ring-2"
            style={{ borderColor: primaryColor }}
            min={new Date().toISOString().split('T')[0]} 
            onChange={(e) => handleDateSelect(e.target.value)}
          />

          <button onClick={() => setStep(2)} className="text-sm text-gray-400 mt-4 underline w-full hover:text-gray-600">Voltar</button>
        </div>
      )}

      {/* 4. HORÁRIO */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <h2 className="text-xl font-bold mb-2 text-black">Horários para {new Date(selectedDate).toLocaleDateString('pt-BR')}</h2>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {timeSlots.map((time) => {
               const isBusy = busyTimeSlots.includes(time)
               return (
                 <button key={time} disabled={isBusy} onClick={() => handleTimeSelect(time)}
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
          <button onClick={() => setStep(3)} className="text-sm text-gray-400 mt-6 underline w-full hover:text-gray-600">Trocar Data</button>
        </div>
      )}

      {/* 5. CADASTRO FINAL */}
      {step === 5 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300 text-center">
          <h2 className="text-xl font-bold mb-6 text-black">Finalizar Agendamento</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left text-sm space-y-2 text-black border border-gray-100 shadow-inner">
            <p><strong className="text-gray-600">Dia:</strong> {new Date(selectedDate).toLocaleDateString('pt-BR')}</p>
            <p><strong className="text-gray-600">Hora:</strong> {selectedTime}</p>
            <p><strong className="text-gray-600">Profissional:</strong> {selectedPro?.name}</p>
            <p><strong className="text-gray-600">Serviço:</strong> {selectedService?.name}</p>
            <p><strong className="text-gray-600">Valor:</strong> R$ {Number(selectedService?.price).toFixed(2)}</p>
          </div>

          <div className="space-y-3">
            <input 
                type="text" 
                placeholder="Seu Nome Completo" 
                className="w-full p-3 border rounded-lg text-black bg-white border-gray-300 focus:border-black outline-none transition-colors" 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)} 
            />
            <input 
                type="tel" 
                placeholder="Seu WhatsApp (com DDD)" 
                className="w-full p-3 border rounded-lg text-black bg-white border-gray-300 focus:border-black outline-none transition-colors" 
                value={customerPhone} 
                onChange={(e) => setCustomerPhone(e.target.value)} 
            />
          </div>

          <button onClick={handleFinish} disabled={!customerName || !customerPhone || loading} className="w-full mt-6 py-4 rounded-lg text-white font-bold text-lg shadow-md disabled:opacity-50 hover:opacity-90 transition-opacity" style={{ backgroundColor: primaryColor }}>
            {loading ? "Agendando..." : "Confirmar Agendamento"}
          </button>
          <button onClick={() => setStep(4)} className="text-sm text-gray-400 mt-4 underline hover:text-gray-600">Voltar</button>
        </div>
      )}

      {/* 6. SUCESSO */}
      {step === 6 && (
        <div className="text-center animate-in zoom-in duration-500 py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 text-black">Agendamento Confirmado!</h2>
            <p className="text-gray-600">Dia {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}</p>
            <p className="text-sm text-gray-400 mt-2">Te esperamos lá!</p>
            
            <div className="bg-zinc-900 text-white p-6 rounded-xl mt-8 shadow-xl">
                <p className="font-semibold text-lg mb-2">Gostou da experiência?</p>
                <p className="text-xs text-zinc-400 mb-4">Tenha um sistema igual para o seu negócio.</p>
                <a href="#" className="block w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">Criar Minha Agenda Grátis</a>
            </div>
        </div>
      )}
    </div>
  )
}