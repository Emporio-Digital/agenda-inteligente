import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { barbershopName, name, email, password } = body

    // 1. Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Este email já está em uso.' }, { status: 400 })
    }

    // 2. Gerar o "Slug" (Link da barbearia) automaticamente
    // Ex: "Barbearia do Zé" vira "barbearia-do-ze-1234" (pra ser único)
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    const slug = barbershopName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-') + '-' + randomCode

    // 3. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. Criar TUDO junto (Tenant + User)
    // O prisma faz isso numa transação segura
    const result = await prisma.$transaction(async (tx) => {
      // Cria a Barbearia
      const newTenant = await tx.tenant.create({
        data: {
          name: barbershopName,
          slug: slug,
          planTier: 'FREE_TRIAL', // Começa grátis pra testar
        }
      })

      // Cria o Dono
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'ADMIN',
          tenantId: newTenant.id
        }
      })

      return { newTenant, newUser }
    })

    return NextResponse.json({ success: true, slug: result.newTenant.slug })

  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json({ error: 'Erro ao criar conta.' }, { status: 500 })
  }
}