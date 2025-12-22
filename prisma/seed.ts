import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando o Seed (Plantando dados)...')

  // 1. Limpar banco (Ordem importa para não quebrar relações)
  await prisma.appointment.deleteMany()
  await prisma.service.deleteMany()
  await prisma.professional.deleteMany()
  await prisma.user.deleteMany()
  await prisma.tenant.deleteMany()

  // 2. Criar a Barbearia (Tenant)
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Barbearia do Zé',
      slug: 'barbearia-ze', // Link: seudominio.com/barbearia-ze
      primaryColor: '#eab308', // Amarelo Ouro
      themeVariant: 'BARBER',
      planTier: 'PRO', // Já começa patrão
    },
  })

  // 3. Criar o Dono/Admin (Login) - ESSENCIAL PARA A PRÓXIMA ETAPA
  const passwordHash = await bcrypt.hash('123456', 10) // Senha padrão: 123456
  
  await prisma.user.create({
    data: {
      name: 'Zé Dono',
      email: 'admin@barbeariaze.com',
      password: passwordHash,
      role: 'ADMIN',
      tenantId: tenant.id
    }
  })

  // 4. Criar um Profissional (João Barbeiro)
  // Usando os novos campos simples de horário
  await prisma.professional.create({
    data: {
      name: 'João Barbeiro',
      tenantId: tenant.id,
      isActive: true,
      workStart: '09:00',
      workEnd: '19:00',
      lunchStart: '12:00',
      lunchEnd: '13:00',
      workDays: '1,2,3,4,5,6' // Seg a Sáb
    },
  })

  // 5. Criar Serviços
  await prisma.service.create({
    data: {
      name: 'Corte Degradê',
      price: 35.00,
      durationMin: 45,
      tenantId: tenant.id,
    },
  })
  
  await prisma.service.create({
    data: {
      name: 'Barba Completa',
      price: 25.00,
      durationMin: 30,
      tenantId: tenant.id,
    },
  })

  console.log('✅ Tudo pronto! Dados criados com sucesso.')
  console.log('-------------------------------------------')
  console.log('🔒 LOGIN PARA TESTE:')
  console.log('📧 Email: admin@barbeariaze.com')
  console.log('🔑 Senha: 123456')
  console.log('-------------------------------------------')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })