import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// 1. OTIMIZAÇÃO DE VELOCIDADE:
// Isso força a API a não guardar cache, garantindo que a lista esteja sempre atualizada
// e evitando aquela sensação de "lento" ou dados antigos voltando.
export const dynamic = 'force-dynamic'

// LISTAR SERVIÇOS
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tenantId = searchParams.get('tenantId')

  if (!tenantId) {
    return NextResponse.json({ error: 'Tenant ID obrigatório' }, { status: 400 })
  }

  const services = await prisma.service.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' }
  })

  return NextResponse.json(services)
}

// CRIAR NOVO SERVIÇO
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, durationMin, description, tenantId } = body

    const newService = await prisma.service.create({
      data: {
        name,
        price: Number(price),
        durationMin: Number(durationMin),
        description,
        tenantId
      }
    })

    return NextResponse.json(newService)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 500 })
  }
}

// DELETAR SERVIÇO (AGORA COM FORÇA TOTAL)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    // PASSO 1: Apaga os agendamentos desse serviço primeiro (Limpeza)
    // Isso evita o erro de "Foreign Key Constraint" que estava travando você.
    await prisma.appointment.deleteMany({
      where: { serviceId: id }
    })

    // PASSO 2: Agora que está limpo, apaga o serviço
    await prisma.service.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar:", error)
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
  }
}