import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// Evita Cache (Dados sempre frescos)
export const dynamic = 'force-dynamic'

// --- REGRAS DO SAAS (Limites por Plano) ---
const PLAN_LIMITS: any = {
  "SOLO": 1,
  "PRO": 5,
  "UNLIMITED": 999
}

// LISTAR PROFISSIONAIS
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tenantId = searchParams.get('tenantId')

  if (!tenantId) {
    return NextResponse.json({ error: 'Tenant ID obrigatório' }, { status: 400 })
  }

  const professionals = await prisma.professional.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' }
  })

  return NextResponse.json(professionals)
}

// CRIAR PROFISSIONAL (COM A LÓGICA DE COBRANÇA)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, tenantId } = body // Foto é opcional, tiramos pra simplificar MVP

    // 1. BUSCAR DADOS DO PLANO ATUAL
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        _count: {
          select: { professionals: true }
        }
      }
    })

    if (!tenant) return NextResponse.json({ error: 'Tenant não encontrado' }, { status: 404 })

    // 2. VERIFICAR LIMITES DO PLANO
    const currentPlan = tenant.planTier || "SOLO" // Se não tiver plano, assume SOLO
    const currentCount = tenant._count.professionals
    const limit = PLAN_LIMITS[currentPlan] || 1

    // O BARRAMENTO (Aqui a gente força o Upgrade)
    if (currentCount >= limit) {
      return NextResponse.json({ 
        error: `Seu plano ${currentPlan} permite apenas ${limit} profissionais. Faça Upgrade!` 
      }, { status: 403 })
    }

    // 3. SE PASSOU, CRIA
    const newProfessional = await prisma.professional.create({
      data: {
        name,
        tenantId,
        isActive: true
      }
    })

    return NextResponse.json(newProfessional)

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar profissional' }, { status: 500 })
  }
}

// DELETAR PROFISSIONAL (COM CASCATA PARA NÃO QUEBRAR O BANCO)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    // 1. Limpa agendamentos desse profissional
    await prisma.appointment.deleteMany({
      where: { professionalId: id }
    })

    // 2. Deleta o profissional
    await prisma.professional.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
  }
}