import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Agora recebemos também o 'plan' vindo do formulário
    const { barbershopName, name, email, password, theme, plan } = body

    // 1. Verifica se email já existe
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Este email já está em uso.' }, { status: 400 })
    }

    // 2. Gera Slug único (ex: barbearia-do-ze-1234)
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    const slug = barbershopName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') + '-' + randomCode
    
    // 3. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await prisma.$transaction(async (tx) => {
      // 4. Cria a Barbearia (Tenant)
      const newTenant = await tx.tenant.create({
        data: {
          name: barbershopName,
          slug: slug,
          // Salva o plano escolhido (SOLO, PRO, UNLIMITED)
          planTier: plan || 'SOLO', 
          // Marca como Período de Testes
          subscriptionStatus: 'TRIAL', 
          themeVariant: theme || 'BARBER', 
          primaryColor: '#000000', 
        }
      })

      // 5. Cria o Usuário Dono (Admin)
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