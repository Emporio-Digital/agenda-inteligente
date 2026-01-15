import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

export const dynamic = 'force-dynamic'

// GET: Listar serviços (agora mostra de quem é)
export async function GET(request: Request) {
  try {
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    const tenantId = payload.tenantId as string

    const services = await prisma.service.findMany({
      where: { tenantId },
      include: { professional: true }, // Traz o dono do serviço
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar' }, { status: 500 })
  }
}

// POST: Criar Serviço (Vinculado a um Profissional)
export async function POST(request: Request) {
  try {
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    const tenantId = payload.tenantId as string

    const body = await request.json()
    const { name, price, duration, professionalId } = body 

    // ALTERAÇÃO AQUI: Removida a exigência de '!professionalId' para aceitar salvar como "Todos"
    if (!name || !price || !duration) {
        return NextResponse.json({ error: 'Todos os campos principais são obrigatórios.' }, { status: 400 })
    }

    const newService = await prisma.service.create({
      data: {
        name,
        price: Number(price),
        durationMin: Number(duration),
        tenantId,
        professionalId // Se vier null, o Prisma salva como null (sem vinculo)
      }
    })

    return NextResponse.json(newService)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao criar' }, { status: 500 })
  }
}

// DELETE: Apagar Serviço
export async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')
  
      const headerList = await headers()
      const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
      if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
      const { payload } = await jwtVerify(token, secret)
  
      if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })
  
      await prisma.service.delete({ where: { id } })
  
      return NextResponse.json({ success: true })
    } catch (error) {
      return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
    }
  }