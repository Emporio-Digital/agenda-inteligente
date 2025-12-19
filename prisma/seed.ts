import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Criar a Barbearia (Tenant)
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Barbearia do Zé',
      slug: 'barbearia-ze', // Esse será o link: agende.app/barbearia-ze
      primaryColor: '#eab308', // Um amarelo ouro
      themeVariant: 'BARBER',
      planTier: 'STUDIO', // Plano intermediário
    },
  })

  // 2. Criar um Profissional (O Barbeiro João)
  const professional = await prisma.professional.create({
    data: {
      name: 'João Barbeiro',
      tenantId: tenant.id,
      isActive: true,
      workHours: {
        mon: ['09:00', '18:00'],
        tue: ['09:00', '18:00'],
        wed: ['09:00', '18:00'],
        thu: ['09:00', '18:00'],
        fri: ['09:00', '19:00'],
        sat: ['09:00', '14:00'],
      },
    },
  })

  // 3. Criar um Serviço (Corte)
  await prisma.service.create({
    data: {
      name: 'Corte Degradê',
      price: 35.00,
      durationMin: 45,
      tenantId: tenant.id,
    },
  })
  
  // 4. Criar outro Serviço (Barba)
  await prisma.service.create({
    data: {
      name: 'Barba Completa',
      price: 25.00,
      durationMin: 30,
      tenantId: tenant.id,
    },
  })

  console.log('✅ Barbearia criada com sucesso!')
  console.log(`🏠 Nome: ${tenant.name}`)
  console.log(`🔗 Link simulado: agende.app/${tenant.slug}`)
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