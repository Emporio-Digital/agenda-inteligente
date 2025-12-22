import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Recebendo o 'theme' do frontend
    const { barbershopName, name, email, password, theme } = body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Este email já está em uso.' }, { status: 400 })
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000)
    const slug = barbershopName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') + '-' + randomCode
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await prisma.$transaction(async (tx) => {
      // Cria a Barbearia com o TEMA ESCOLHIDO
      const newTenant = await tx.tenant.create({
        data: {
          name: barbershopName,
          slug: slug,
          planTier: 'FREE_TRIAL',
          themeVariant: theme || 'BARBER', // Salva o tema (ou Barber se falhar)
          primaryColor: '#000000', // Default, o usuário muda depois nas configs
        }
      })

      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'ADMIN',
          tenantId: newTenant.id
        }
      })
      return { newTenant }
    })

    return NextResponse.json({ success: true, slug: result.newTenant.slug })

  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json({ error: 'Erro ao criar conta.' }, { status: 500 })
  }
}