import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const professionalId = searchParams.get('professionalId')
  const date = searchParams.get('date') // Formato YYYY-MM-DD

  if (!professionalId || !date) {
    return NextResponse.json({ error: 'Faltam dados' }, { status: 400 })
  }

  // Define o começo e o fim do dia para a busca
  const startDate = new Date(`${date}T00:00:00`)
  const endDate = new Date(`${date}T23:59:59`)

  // Busca no banco os agendamentos desse dia/profissional
  const appointments = await prisma.appointment.findMany({
    where: {
      professionalId: professionalId,
      date: {
        gte: startDate,
        lte: endDate
      },
      status: {
        not: 'CANCELED' // Ignora os cancelados, pois o horário liberou
      }
    },
    select: {
      date: true
    }
  })

  // Transforma as datas em horários simples (Ex: "09:45")
  const busySlots = appointments.map(appt => {
    // Ajuste para garantir o fuso horário correto (pegando a hora UTC/String direta)
    return new Date(appt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  })

  return NextResponse.json({ busySlots })
}