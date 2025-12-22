import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

// Evita Cache
export const dynamic = 'force-dynamic'

// --- REGRAS DO SAAS ---
const PLAN_LIMITS: any = {
  "FREE_TRIAL": 3, // Dei uma colher de chá no Trial
  "SOLO": 1,
  "PRO": 5,
  "UNLIMITED": 999
}

// 1. LISTAR PROFISSIONAIS (Híbrido: Funciona Publico e Admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    let tenantId = searchParams.get('tenantId')

    // Se não veio na URL (Modo Admin), tenta pegar do Token
    if (!tenantId) {
      const headerList = await headers()
      const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
      
      if (token) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
        const { payload } = await jwtVerify(token, secret)
        tenantId = payload.tenantId as string
      }
    }

    if (!tenantId) {
      return NextResponse.json({ error: 'ID da Barbearia não identificado' }, { status: 400 })
    }

    const professionals = await prisma.professional.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(professionals)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar' }, { status: 500 })
  }
}

// 2. CRIAR PROFISSIONAL (Correção do Erro "Tenant não encontrado")
export async function POST(request: Request) {
  try {
    // A. Autenticação (Quem está criando?)
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    
    if (!token) return NextResponse.json({ error: 'Acesso negado' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    const tenantId = payload.tenantId as string // <--- AQUI ESTÁ A CORREÇÃO

    // B. Dados do Form
    const body = await request.json()
    const { name } = body 

    if (!name) return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 })

    // C. Verificar Limites do Plano
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        _count: {
          select: { professionals: true }
        }
      }
    })

    if (!tenant) return NextResponse.json({ error: 'Barbearia não encontrada' }, { status: 404 })

    const currentPlan = tenant.planTier || "FREE_TRIAL"
    const currentCount = tenant._count.professionals
    const limit = PLAN_LIMITS[currentPlan] || 1

    if (currentCount >= limit) {
      return NextResponse.json({ 
        error: `Seu plano ${currentPlan} atingiu o limite de ${limit} profissionais.` 
      }, { status: 403 })
    }

    // D. Criar com Segurança
    const newProfessional = await prisma.professional.create({
      data: {
        name,
        tenantId, // ID vindo do token, seguro.
        isActive: true,
        // Horários Padrão (O dono edita depois)
        workStart: '09:00',
        workEnd: '18:00',
        workDays: '1,2,3,4,5,6' 
      }
    })

    return NextResponse.json(newProfessional)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao criar profissional' }, { status: 500 })
  }
}

// 3. DELETAR PROFISSIONAL (Seguro)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Autenticação
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    // Verifica se o profissional pertence ao tenant do usuário logado antes de apagar
    const professional = await prisma.professional.findUnique({
        where: { id }
    })

    if (!professional || professional.tenantId !== payload.tenantId) {
        return NextResponse.json({ error: 'Proibido' }, { status: 403 })
    }

    // Limpa agendamentos
    await prisma.appointment.deleteMany({
      where: { professionalId: id }
    })

    // Deleta Pro
    await prisma.professional.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
  }
}