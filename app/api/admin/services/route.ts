import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

// GET: Listar serviços da barbearia logada
export async function GET(request: Request) {
  try {
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    const services = await prisma.service.findMany({
      where: { tenantId: payload.tenantId as string }
    })

    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar' }, { status: 500 })
  }
}

// POST: Criar novo serviço VINCULADO AO TENANT
export async function POST(request: Request) {
  try {
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    const body = await request.json()
    const { name, price, durationMin } = body

    const service = await prisma.service.create({
      data: {
        name,
        price: parseFloat(price), // Garante que é número
        durationMin: parseInt(durationMin), // Garante que é inteiro
        tenantId: payload.tenantId as string // <--- O PULO DO GATO (Correção do erro)
      }
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 500 })
  }
}