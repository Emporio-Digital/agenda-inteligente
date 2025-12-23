import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Correção para Next.js 15
) {
  try {
    // 1. Autenticação e Segurança (Quem é você?)
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    const tenantId = payload.tenantId as string

    // 2. Pega o ID da URL
    const { id } = await params

    // 3. Busca o agendamento para verificar se pertence ao dono logado
    const appointment = await prisma.appointment.findUnique({
        where: { id }
    })

    if (!appointment) {
        return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 })
    }

    // TRAVA DE SEGURANÇA: Só apaga se o tenantId do agendamento for igual ao do dono logado
    if (appointment.tenantId !== tenantId) {
        return NextResponse.json({ error: 'Proibido: Esse agendamento não é seu.' }, { status: 403 })
    }

    // 4. Deletar de Fato
    // Ao deletar, o horário fica livre automaticamente para a lógica de disponibilidade
    await prisma.appointment.delete({
        where: { id }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Erro ao cancelar:", error)
    return NextResponse.json({ error: 'Erro interno ao cancelar' }, { status: 500 })
  }
}