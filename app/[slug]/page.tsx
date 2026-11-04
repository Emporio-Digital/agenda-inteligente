import { prisma } from "../lib/prisma"
import BookingSystem from "./agendamento"
import { Metadata } from "next"
export const dynamic = 'force-dynamic'

// --- GERAR METADATA DINÂMICA (NOME NA ABA) ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  // Busca leve apenas para pegar o nome e logo para SEO
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { name: true, logoUrl: true }
  })

  if (!tenant) {
    return {
      title: "Kairós - Sua Agenda Inteligente",
    }
  }

  return {
    title: tenant.name, // Aparece: "Barbearia do Zé | Kairós" (devido ao template no layout)
    description: `Agende seu horário com ${tenant.name}. Gerenciado por Kairós - Sua Agenda Inteligente.`,
    openGraph: {
      title: tenant.name,
      description: `Agendamento online - ${tenant.name}`,
      images: tenant.logoUrl ? [tenant.logoUrl] : []
    }
  }
}

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
  },
  // NOVO TEMA ADICIONADO: RESTAURANTES
  RESTAURANT: {
    bg: "bg-stone-950", // Dark Warm (Elegante para gastronomia)
    text: "text-stone-100",
    rounded: "rounded-2xl",
  }
}

// --- IMAGENS LOCAIS (CARREGAMENTO INSTANTÂNEO) ---
const SPLASH_IMAGES: any = {
  BEAUTY: "/temas/beauty.jpg",
  CLINIC: "/temas/clinic.jpg",
  BARBER: "/temas/barber.jpg",
  TATTOO: "/temas/tattoo.png",
  PHOTOGRAPHY: "/temas/photography.png",
  PROFESSIONAL: "/temas/professional.png",
  RESTAURANT: "/temas/restaurant.jpg"
}

export default async function TenantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug: slug },
    include: {
      services: true,
      professionals: {
        orderBy: [
          { position: 'asc' },
          { name: 'asc' }
        ]
      }
    }
  })

  if (!tenant) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 font-bold">Estabelecimento não encontrado.</div>

  // Limpeza de Segurança (Decimal -> Number)
  const servicosLimpos = tenant.services.map(service => ({
    ...service,
    price: Number(service.price)
  }))
  // FORÇAR ORDENAÇÃO POR POSIÇÃO (NUCLEAR OPTION)
  const profissionaisOrdenados = [...tenant.professionals].sort((a, b) => {
    const posA = (a as any).position ?? 0;
    const posB = (b as any).position ?? 0;
    return posA - posB;
  });

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
          professionals={profissionaisOrdenados}
          themeConfig={currentTheme}
          themeVariant={themeVariant}
          splashUrl={splashUrl}
      />
    </div>
  )
}