import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tenantId, serviceId, professionalId, date, customerName, customerPhone } = body

    // 1. Cria ou atualiza o Cliente (pra não duplicar se ele já veio antes)
    // Aqui vamos simplificar e criar um cliente novo se o telefone não bater, 
    // ou usar o existente.
    let customer = await prisma.customer.findFirst({
        where: { 
            phone: customerPhone,
            tenantId: tenantId 
        }
    })

    if (!customer) {
        customer = await prisma.customer.create({
            data: {
                name: customerName,
                phone: customerPhone,
                tenantId: tenantId
            }
        })
    }

    // 2. Cria o Agendamento
    // OBS: O "date" vem como string ISO do frontend.
    const appointment = await prisma.appointment.create({
        data: {
            date: new Date(date), // Converte texto para Data real
            tenantId,
            serviceId,
            professionalId,
            customerId: customer.id,
            status: 'SCHEDULED'
        }
    })

    return NextResponse.json({ success: true, appointmentId: appointment.id })

  } catch (error) {
    console.error("Erro ao agendar:", error)
    return NextResponse.json({ success: false, error: "Erro ao salvar agendamento" }, { status: 500 })
  }
}