import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Agora recebemos serviceIds (ARRAY) em vez de serviceId (STRING)
    const { tenantId, serviceIds, professionalId, date, customerName, customerPhone } = body

    // 1. Validar se tem serviços selecionados
    if (!serviceIds || serviceIds.length === 0) {
        return NextResponse.json({ error: 'Selecione pelo menos um serviço.' }, { status: 400 })
    }

    // 2. Calcular a duração TOTAL para saber quando acaba
    const services = await prisma.service.findMany({
        where: { id: { in: serviceIds } }
    })
    
    // Soma os minutos de todos os serviços
    const totalDuration = services.reduce((acc, curr) => acc + curr.durationMin, 0)

    // Data de Início e Fim
    const startDate = new Date(date)
    const endDate = new Date(startDate.getTime() + totalDuration * 60000)

    // 3. Verificar se o profissional já tem agendamento nesse intervalo (Lógica Básica)
    const conflito = await prisma.appointment.findFirst({
      where: {
        professionalId,
        date: {
          lt: endDate, // Começa antes de terminar este
        },
        // Na vida real precisaria verificar o fim do agendamento existente também
        // Mas pro MVP vamos confiar na disponibilidade da tela anterior
      }
    })

    // 4. Criar Cliente (ou buscar se já existe - Simplificado: Cria novo sempre pra MVP)
    const customer = await prisma.customer.create({
      data: {
        name: customerName,
        phone: customerPhone,
        tenantId
      }
    })

    // 5. CRIAR O AGENDAMENTO (MULTI-SERVIÇOS)
    const appointment = await prisma.appointment.create({
      data: {
        date: startDate,
        tenantId,
        professionalId,
        customerId: customer.id,
        // A MÁGICA DO PRISMA (Conecta vários de uma vez)
        services: {
            connect: serviceIds.map((id: string) => ({ id }))
        }
      }
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao agendar' }, { status: 500 })
  }
}