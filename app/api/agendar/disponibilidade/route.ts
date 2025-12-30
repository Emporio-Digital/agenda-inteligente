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

    // --- 1.5 VERIFICA DIAS DE TRABALHO (Seguro contra Fuso) ---
    // Cria data meio-dia local para checar o dia da semana sem erro de voltar pro dia anterior
    const [ano, mes, dia] = dateParam.split('-').map(Number)
    const checkDate = new Date(ano, mes - 1, dia, 12, 0, 0) 
    const dayOfWeek = checkDate.getDay().toString() // 0=Dom, 1=Seg...
    
    // Se existir configuração de dias e o dia atual NÃO estiver nela, retorna vazio
    if (professional.workDays) {
        const allowedDays = professional.workDays.split(',')
        if (!allowedDays.includes(dayOfWeek)) {
            return NextResponse.json([])
        }
    }
    // ---------------------------------------------------------

    const workStartMin = timeToMinutes(professional.workStart || "09:00")
    const workEndMin = timeToMinutes(professional.workEnd || "18:00")
    
    let lunchStartMin = -1
    let lunchEndMin = -1
    if (professional.lunchStart && professional.lunchEnd) {
        lunchStartMin = timeToMinutes(professional.lunchStart)
        lunchEndMin = timeToMinutes(professional.lunchEnd)
    }

    // 2. Busca Agendamentos (FUSO BRASIL CORRETO)
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

    // 3. GERA OS SLOTS (15 EM 15 MINUTOS)
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
            if (currentMin < lunchEndMin && serviceEndMin > lunchStartMin) {
                isAvailable = false
            }
        }

        // C. Colisão com Agendamentos
        if (isAvailable) {
            const hasConflict = appointments.some(appt => {
                const zonedDate = toZonedTime(appt.date, timeZone)
                const horaString = format(zonedDate, 'HH:mm')
                
                const apptStart = timeToMinutes(horaString)
                const apptDuration = appt.services.reduce((acc, s) => acc + s.durationMin, 0)
                const apptEnd = apptStart + apptDuration

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