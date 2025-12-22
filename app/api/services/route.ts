import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// ESSA LINHA CORRIGE O ERRO DOS DADOS QUE VOLTAM (Desativa o Cache)
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

// DELETAR SERVIÇO
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    await prisma.service.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
  }
}