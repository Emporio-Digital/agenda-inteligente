import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

// GET: Listar serviços
export async function GET(request: Request) {
  try {
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    
    if (!token) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    const services = await prisma.service.findMany({
      where: { tenantId: payload.tenantId as string },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error("Erro GET serviços:", error)
    return NextResponse.json({ error: 'Erro ao buscar serviços' }, { status: 500 })
  }
}

// POST: Criar serviço
export async function POST(request: Request) {
  try {
    // 1. Autenticação
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    
    if (!token) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    // 2. Dados do Formulário
    const body = await request.json()
    const { name, price, durationMin } = body

    // Validação simples
    if (!name || !price || !durationMin) {
        return NextResponse.json({ error: 'Preencha todos os campos obrigatórios' }, { status: 400 })
    }

    // 3. Criação no Banco
    const service = await prisma.service.create({
      data: {
        name,
        // Garante a conversão correta para o banco
        price: Number(price), 
        durationMin: Number(durationMin), 
        tenantId: payload.tenantId as string
      }
    })

    return NextResponse.json(service)

  } catch (error) {
    console.error("Erro POST serviço:", error)
    return NextResponse.json({ error: 'Erro interno ao salvar serviço.' }, { status: 500 })
  }
}