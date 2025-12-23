import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

// Evita Cache
export const dynamic = 'force-dynamic'

// --- REGRAS DO SAAS ---
const PLAN_LIMITS: any = {
  "FREE_TRIAL": 3,
  "SOLO": 1,
  "PRO": 5,
  "UNLIMITED": 999
}

// 1. LISTAR PROFISSIONAIS
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    let tenantId = searchParams.get('tenantId')

    // Se não veio na URL, tenta pegar do Token (Admin)
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
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
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

// 2. CRIAR PROFISSIONAL (COM TRAVA DE PLANO)
export async function POST(request: Request) {
  try {
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    
    if (!token) return NextResponse.json({ error: 'Acesso negado' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    const tenantId = payload.tenantId as string 

    const body = await request.json()
    const { name } = body 

    if (!name) return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 })

    // Verificar Limites
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { _count: { select: { professionals: true } } }
    })

    if (!tenant) return NextResponse.json({ error: 'Barbearia não encontrada' }, { status: 404 })

    const currentPlan = tenant.planTier || "SOLO"
    const currentCount = tenant._count.professionals
    const limit = PLAN_LIMITS[currentPlan] || 1

    if (currentCount >= limit) {
      return NextResponse.json({ 
        error: `Seu plano ${currentPlan} atingiu o limite de ${limit} profissionais.` 
      }, { status: 403 })
    }

    const newProfessional = await prisma.professional.create({
      data: {
        name,
        tenantId, 
        isActive: true,
        workStart: '09:00',
        workEnd: '18:00',
        lunchStart: '12:00',
        lunchEnd: '13:00',
        workDays: '1,2,3,4,5,6' 
      }
    })

    return NextResponse.json(newProfessional)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao criar profissional' }, { status: 500 })
  }
}

// 3. ATUALIZAR HORÁRIOS (PUT) - NOVO!
export async function PUT(request: Request) {
  try {
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    const body = await request.json()
    const { id, name, workStart, workEnd, lunchStart, lunchEnd } = body

    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    // Verifica segurança (se o profissional é do dono mesmo)
    const existing = await prisma.professional.findUnique({ where: { id }})
    if (!existing || existing.tenantId !== payload.tenantId) {
        return NextResponse.json({ error: 'Proibido' }, { status: 403 })
    }

    const updated = await prisma.professional.update({
        where: { id },
        data: {
            name,
            workStart,
            workEnd,
            lunchStart,
            lunchEnd
        }
    })

    return NextResponse.json(updated)

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 })
  }
}

// 4. DELETAR PROFISSIONAL
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

    const professional = await prisma.professional.findUnique({
        where: { id }
    })

    if (!professional || professional.tenantId !== payload.tenantId) {
        return NextResponse.json({ error: 'Proibido' }, { status: 403 })
    }

    await prisma.appointment.deleteMany({ where: { professionalId: id } })
    await prisma.professional.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
  }
}