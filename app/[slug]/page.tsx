import { prisma } from "../lib/prisma"
import BookingSystem from "./agendamento"

const THEMES: any = {
  BARBER: {
    bg: "bg-zinc-950",           
    text: "text-zinc-100",
    rounded: "rounded-none",     
  },
  BEAUTY: {
    bg: "bg-rose-50",            
    text: "text-rose-950",
    rounded: "rounded-3xl",      
  },
  TATTOO: {
    bg: "bg-slate-950",
    text: "text-slate-200",
    rounded: "rounded-sm",
  },
  CLINIC: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    rounded: "rounded-xl",
  },
  PHOTOGRAPHY: {
    bg: "bg-neutral-900",
    text: "text-neutral-100",
    rounded: "rounded-lg",
  },
  PROFESSIONAL: {
    bg: "bg-gray-50",
    text: "text-gray-800",
    rounded: "rounded-md",
  }
}

// --- IMAGENS ATUALIZADAS (Com os links novos) ---
const SPLASH_IMAGES: any = {
  BEAUTY: "https://i.ibb.co/hRXVnd7Z/9cd0d93b-e561-47bc-8cf2-b23fd8bcd58a.jpg",
  CLINIC: "https://i.ibb.co/fV5QcdFf/969c80ee-8648-4043-b9de-349001073a05.jpg",
  BARBER: "https://i.ibb.co/FbVJNmq6/d5d6204b-6ad5-4507-8fc1-43df0bc6e453.jpg",
  TATTOO: "https://i.ibb.co/bjbSC92V/Chat-GPT-Image-4-de-jan-de-2026-00-00-36.png",
  PHOTOGRAPHY: "https://i.ibb.co/KcrP0mYM/Chat-GPT-Image-4-de-jan-de-2026-01-48-16.png",
  PROFESSIONAL: "https://i.ibb.co/dhZg8cy/Chat-GPT-Image-4-de-jan-de-2026-01-38-28.png"
}

export default async function TenantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug: slug },
    include: {
      services: true,
      professionals: true
    }
  })

  if (!tenant) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 font-bold">Estabelecimento não encontrado.</div>

  // Limpeza de Segurança
  const servicosLimpos = tenant.services.map(service => ({
    ...service,
    price: Number(service.price)
  }))

  const tenantLimpo = {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    logoUrl: tenant.logoUrl,
    coverUrl: tenant.coverUrl,
    primaryColor: tenant.primaryColor,
    themeVariant: tenant.themeVariant,
    phone: (tenant as any).phone || "",     // Mantendo a correção de segurança
    address: (tenant as any).address || ""  // Mantendo a correção de segurança
  }

  const themeVariant = tenant.themeVariant || 'BARBER'
  const currentTheme = THEMES[themeVariant] || THEMES.BARBER
  const splashUrl = SPLASH_IMAGES[themeVariant] || SPLASH_IMAGES.BARBER

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-sans selection:bg-blue-500 selection:text-white`}>
      <BookingSystem 
          tenant={tenantLimpo}
          services={servicosLimpos} 
          professionals={tenant.professionals}
          themeConfig={currentTheme}
          themeVariant={themeVariant}
          splashUrl={splashUrl}
      />
    </div>
  )
}