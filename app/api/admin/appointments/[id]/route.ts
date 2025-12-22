import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Next.js 15 params correction
) {
  try {
    // 1. Segurança: Verificar quem está tentando apagar
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    const { id } = await params

    // 2. Apagar (ou cancelar) SOMENTE se pertencer ao Tenant do usuário
    const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: { tenant: true }
    })

    if (!appointment || appointment.tenantId !== payload.tenantId) {
        return NextResponse.json({ error: 'Proibido' }, { status: 403 })
    }

    // Deleta de verdade (ou poderia mudar status para CANCELED)
    await prisma.appointment.delete({
        where: { id }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao apagar' }, { status: 500 })
  }
}