import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'

// Mesma função auxiliar para manter padrão
function generateSlug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
}

export async function PUT(request: Request) {
  try {
    // Auth Check
    const headerList = await headers()
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const { payload } = await jwtVerify(token, secret)
    const tenantId = payload.tenantId as string

    const body = await request.json()

    // LÓGICA DE ATUALIZAÇÃO DO SLUG
    let slugData = {} // Objeto vazio por padrão
    
    // Se o usuário mudou o nome, precisamos recalcular o slug
    if (body.name) {
       // 1. Gera o novo slug base
       let newSlug = generateSlug(body.name)

       // 2. Verifica se esse slug já existe (e não é o meu próprio)
       const existingTenant = await prisma.tenant.findUnique({
          where: { slug: newSlug }
       })

       // Se já existe e pertence a OUTRA pessoa, adicionamos sufixo
       if (existingTenant && existingTenant.id !== tenantId) {
          newSlug = `${newSlug}-${Math.floor(100 + Math.random() * 900)}`
       }

       // Adiciona ao objeto de atualização
       slugData = { slug: newSlug }
    }

    // Atualiza o Tenant
    const updated = await prisma.tenant.update({
        where: { id: tenantId },
        data: {
            name: body.name,
            primaryColor: body.primaryColor,
            themeVariant: body.themeVariant,
            logoUrl: body.logoUrl,
            coverUrl: body.coverUrl,
            ...slugData // Espalha o slug novo (se houver mudança)
        }
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
  }
}