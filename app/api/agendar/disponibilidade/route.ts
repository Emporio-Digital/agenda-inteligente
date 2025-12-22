import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { 
  parseISO, 
  startOfDay, 
  endOfDay, 
  addMinutes, 
  setHours, 
  setMinutes, 
  areIntervalsOverlapping 
} from 'date-fns'

// Garante que a API não faça cache na Vercel (sempre dados frescos)
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const professionalId = searchParams.get('professionalId')
    const dateParam = searchParams.get('date') // Formato YYYY-MM-DD
    const durationParam = searchParams.get('duration') // Duração total em minutos

    if (!professionalId || !dateParam) {
      return NextResponse.json({ error: 'Faltam dados obrigatórios' }, { status: 400 })
    }

    // Se não vier duração, assume 30min por segurança
    const duration = durationParam ? parseInt(durationParam) : 30
    
    // Configura o dia da busca
    const searchDate = parseISO(dateParam)
    const dayStart = startOfDay(searchDate)
    const dayEnd = endOfDay(searchDate)

    // 1. Busca todos os agendamentos do dia (incluindo serviços para calcular duração)
    const appointments = await prisma.appointment.findMany({
      where: {
        professionalId: professionalId,
        date: {
          gte: dayStart,
          lte: dayEnd
        },
        // Ignora cancelados
        status: {
            not: 'CANCELED' 
        }
      },
      include: {
        services: true // Precisamos disso para saber quando o agendamento existente TERMINA
      }
    })

    // 2. Define os Horários (Slots) Disponíveis
    // ATENÇÃO: Esses horários devem ser IGUAIS aos que estão no seu Frontend (agendamento.tsx)
    const timeSlots = [
        "09:00", "09:45", "10:30", "11:15", 
        "14:00", "14:45", "15:30", "16:15", "17:00", "18:00"
    ]
    
    const busySlots: string[] = []

    // 3. Verifica Slot por Slot se cabe o novo serviço
    for (const slot of timeSlots) {
      const [hour, minute] = slot.split(':').map(Number)
      
      // Cria o intervalo PROPOSTO pelo cliente
      // Começa no horário do slot
      const proposedStart = setMinutes(setHours(searchDate, hour), minute)
      // Termina X minutos depois (duração do serviço escolhido)
      const proposedEnd = addMinutes(proposedStart, duration)

      // Verifica se bate com algum agendamento existente
      const hasConflict = appointments.some((appt) => {
        // Calcula o intervalo do agendamento JÁ EXISTENTE
        const existingDuration = appt.services.reduce((acc, s) => acc + s.durationMin, 0)
        
        const existingStart = new Date(appt.date)
        const existingEnd = addMinutes(existingStart, existingDuration)

        // A mágica: Verifica se os intervalos se sobrepõem
        return areIntervalsOverlapping(
          { start: proposedStart, end: proposedEnd },
          { start: existingStart, end: existingEnd }
        )
      })

      // Se tiver conflito, adiciona na lista de ocupados
      if (hasConflict) {
        busySlots.push(slot)
      }
    }

    return NextResponse.json({ busySlots })

  } catch (error) {
    console.error("Erro ao verificar disponibilidade:", error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}