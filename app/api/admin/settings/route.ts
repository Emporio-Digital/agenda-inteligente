import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

export async function PUT(request: Request) {
  try {
    // Auth Check
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)

    const body = await request.json()

    // Atualiza o Tenant do usuário logado
    const updated = await prisma.tenant.update({
        where: { id: payload.tenantId as string },
        data: {
            name: body.name,
            primaryColor: body.primaryColor,
            themeVariant: body.themeVariant,
            logoUrl: body.logoUrl,
            coverUrl: body.coverUrl
        }
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
  }
}