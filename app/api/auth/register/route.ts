import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'

// Função auxiliar para limpar o nome (Slugify)
function generateSlug(text: string) {
  return text
    .normalize("NFD") // Separa acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/[\s_-]+/g, '-') // Troca espaços por traço
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Adicionei 'phone' na desestruturação
    const { barbershopName, name, email, password, theme, plan, phone } = body

    // 1. Verifica se email já existe
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Este email já está em uso.' }, { status: 400 })
    }

    // 2. Gera Slug Inteligente
    let slug = generateSlug(barbershopName)
    
    // Verifica se esse slug já existe no banco
    const slugCount = await prisma.tenant.count({ where: { slug: slug } })
    
    // Se já existe (ex: ja tem uma 'barbearia-do-ze'), adiciona um numero aleatorio no fim
    if (slugCount > 0) {
      slug = `${slug}-${Math.floor(100 + Math.random() * 900)}`
    }
    
    // 3. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await prisma.$transaction(async (tx) => {
      // 4. Cria a Barbearia (Tenant)
      const newTenant = await tx.tenant.create({
        data: {
          name: barbershopName,
          slug: slug,
          planTier: plan || 'SOLO', 
          subscriptionStatus: 'TRIAL', 
          themeVariant: theme || 'BARBER', 
          primaryColor: '#000000',
          phone: phone || '', // Salva o WhatsApp aqui
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