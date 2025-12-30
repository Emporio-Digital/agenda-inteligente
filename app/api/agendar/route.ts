import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { addMinutes, areIntervalsOverlapping, startOfDay, endOfDay } from 'date-fns'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tenantId, serviceIds, professionalId, date, customerName, customerPhone } = body

    // 1. Validar se tem serviços selecionados
    if (!serviceIds || serviceIds.length === 0) {
        return NextResponse.json({ error: 'Selecione pelo menos um serviço.' }, { status: 400 })
    }

    // 2. Calcular a duração TOTAL do NOVO agendamento
    const services = await prisma.service.findMany({
        where: { id: { in: serviceIds } }
    })
    
    const totalDuration = services.reduce((acc, curr) => acc + curr.durationMin, 0)

    // Data de Início e Fim do NOVO agendamento
    const startDate = new Date(date)
    const endDate = addMinutes(startDate, totalDuration)

    // 3. Verificar CONFLITO REAL (MANTIDA A SUA LÓGICA ORIGINAL)
    // Buscamos todos os agendamentos do profissional naquele DIA para checar na memória
    const dayStart = startOfDay(startDate)
    const dayEnd = endOfDay(startDate)

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        professionalId,
        date: {
          gte: dayStart,
          lte: dayEnd
        }
      },
      include: {
        services: true // Importante para calcular a duração dos agendamentos existentes
      }
    })

    const hasConflict = existingAppointments.some(appt => {
      // Duração do agendamento existente
      const existingDuration = appt.services.reduce((acc, s) => acc + s.durationMin, 0)
      const apptStart = new Date(appt.date)
      const apptEnd = addMinutes(apptStart, existingDuration)

      // Verifica se os intervalos se cruzam
      return areIntervalsOverlapping(
        { start: startDate, end: endDate },
        { start: apptStart, end: apptEnd }
      )
    })

    if (hasConflict) {
        return NextResponse.json(
            { error: 'Horário indisponível! Já existe um agendamento neste intervalo.' }, 
            { status: 409 }
        )
    }

    // 4. Criar ou Atualizar Cliente (CORREÇÃO AQUI)
    // Verifica se já existe pelo telefone no mesmo tenant
    let customer = await prisma.customer.findFirst({
        where: { 
            phone: customerPhone,
            tenantId: tenantId
        }
    })

    if (customer) {
        // SE JÁ EXISTE: Atualiza o nome para o mais recente digitado pelo cliente
        customer = await prisma.customer.update({
            where: { id: customer.id },
            data: { name: customerName }
        })
    } else {
        // SE NÃO EXISTE: Cria novo
        customer = await prisma.customer.create({
            data: {
                name: customerName,
                phone: customerPhone,
                tenantId
            }
        })
    }

    // 5. CRIAR O AGENDAMENTO
    const appointment = await prisma.appointment.create({
      data: {
        date: startDate,
        tenantId,
        professionalId,
        customerId: customer.id,
        services: {
            connect: serviceIds.map((id: string) => ({ id }))
        }
      }
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Erro no agendamento:", error)
    return NextResponse.json({ error: 'Erro ao agendar' }, { status: 500 })
  }
}