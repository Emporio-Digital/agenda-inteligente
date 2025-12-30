import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { format } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const professionalId = searchParams.get('professionalId')
    const dateParam = searchParams.get('date') // YYYY-MM-DD
    const durationParam = searchParams.get('duration') // Minutos

    if (!professionalId || !dateParam) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    const duration = durationParam ? parseInt(durationParam) : 30
    const timeZone = 'America/Sao_Paulo'

    // 1. Busca Configuração do Profissional
    const professional = await prisma.professional.findUnique({
        where: { id: professionalId }
    })

    if (!professional) return NextResponse.json({ error: 'Profissional não encontrado' }, { status: 404 })

    // --- NOVO: FILTRO DE DIAS DE TRABALHO ---
    // Verifica se o dia da semana da data escolhida está na lista de dias permitidos
    const dateObj = new Date(dateParam + "T12:00:00") // Força meio dia para não ter erro de fuso na checagem do dia
    const dayOfWeek = dateObj.getDay().toString() // 0=Dom, 1=Seg...
    
    // Se workDays existir, verifica. Se não existir (legado), assume que trabalha todo dia.
    if (professional.workDays && !professional.workDays.split(',').includes(dayOfWeek)) {
        // Se hoje não é dia de trabalho, retorna lista vazia (sem horários)
        return NextResponse.json([])
    }
    // ----------------------------------------

    const workStartMin = timeToMinutes(professional.workStart || "09:00")
    const workEndMin = timeToMinutes(professional.workEnd || "18:00")
    
    let lunchStartMin = -1
    let lunchEndMin = -1
    if (professional.lunchStart && professional.lunchEnd) {
        lunchStartMin = timeToMinutes(professional.lunchStart)
        lunchEndMin = timeToMinutes(professional.lunchEnd)
    }

    // 2. Busca Agendamentos (QUERY CORRIGIDA COM FUSO BRASIL) 🇧🇷
    // Criamos o início e fim do dia NO FUSO BRASIL e convertemos para UTC para buscar no banco
    const startOfDayBR = new Date(`${dateParam}T00:00:00`)
    const endOfDayBR = new Date(`${dateParam}T23:59:59`)
    
    const startUtc = fromZonedTime(startOfDayBR, timeZone)
    const endUtc = fromZonedTime(endOfDayBR, timeZone)

    const appointments = await prisma.appointment.findMany({
      where: {
        professionalId: professionalId,
        date: { gte: startUtc, lte: endUtc },
        status: { not: 'CANCELED' }
      },
      include: { services: true }
    })

    // 3. GERA OS SLOTS
    const slots = []
    
    for (let currentMin = workStartMin; currentMin < workEndMin; currentMin += 15) {
        const timeString = minutesToTime(currentMin)
        
        // Fim deste atendimento
        const serviceEndMin = currentMin + duration

        let isAvailable = true

        // A. Passou do expediente?
        if (serviceEndMin > workEndMin) {
            isAvailable = false
        }

        // B. Colisão com Almoço
        if (isAvailable && lunchStartMin !== -1) {
            // Se o serviço começa ANTES do almoço terminar E termina DEPOIS do almoço começar
            // Ex: Almoço 12:00. Slot 11:45 (30min) -> Termina 12:15. Bateu? Sim. Bloqueia.
            // Ex: Almoço 12:00. Slot 11:45 (15min) -> Termina 12:00. Bateu? Não. Libera.
            if (currentMin < lunchEndMin && serviceEndMin > lunchStartMin) {
                isAvailable = false
            }
        }

        // C. Colisão com Agendamentos
        if (isAvailable) {
            const hasConflict = appointments.some(appt => {
                // Converte a data do banco (UTC) para o horário REAL do Brasil
                const zonedDate = toZonedTime(appt.date, timeZone)
                const horaString = format(zonedDate, 'HH:mm')
                
                const apptStart = timeToMinutes(horaString)
                const apptDuration = appt.services.reduce((acc, s) => acc + s.durationMin, 0)
                const apptEnd = apptStart + apptDuration

                // Lógica de Sobreposição:
                // Bloqueia se o meu horário proposto encavalar com o agendamento
                return (currentMin < apptEnd && serviceEndMin > apptStart)
            })
            
            if (hasConflict) isAvailable = false
        }

        slots.push({
            time: timeString,
            available: isAvailable
        })
    }

    return NextResponse.json(slots)

  } catch (error) {
    console.error("Erro disp:", error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// Helpers
function timeToMinutes(timeStr: string) {
    const [h, m] = timeStr.split(':').map(Number)
    return h * 60 + m
}

function minutesToTime(minutes: number) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}