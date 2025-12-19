import { prisma } from "../lib/prisma"
import BookingSystem from "./agendamento"

// --- MOTOR DE TEMAS ---
// Aqui definimos como cada nicho se comporta visualmente
const THEMES: any = {
  BARBER: {
    bg: "bg-zinc-950",           // Fundo super escuro
    text: "text-zinc-100",       // Texto claro
    card: "bg-zinc-900 border-zinc-800", // Cartões escuros
    rounded: "rounded-none",     // Cantos quadrados (visual robusto/macho)
    button: "uppercase tracking-widest font-black", // Botões agressivos
    iconStyle: "grayscale"       // Ícones preto e branco
  },
  BEAUTY: {
    bg: "bg-rose-50",            // Fundo rosinha claro
    text: "text-rose-950",       // Texto escuro elegante
    card: "bg-white border-rose-100", // Cartões brancos clean
    rounded: "rounded-3xl",      // Cantos bem redondos (suave)
    button: "capitalize font-medium tracking-wide", // Botões delicados
    iconStyle: ""                // Ícones coloridos
  }
}

export default async function BarbeariaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug: slug },
    include: {
      services: true,
      professionals: true
    }
  })

  if (!tenant) return <h1>Barbearia não encontrada 😕</h1>

  // Limpeza do Decimal para Number
  const servicosLimpos = tenant.services.map(service => ({
    ...service,
    price: Number(service.price)
  }))

  // Seleciona o tema atual (Se não tiver definido, usa BARBER como padrão)
  const currentTheme = THEMES[tenant.themeVariant] || THEMES.BARBER

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} pb-20`}>
      
      {/* --- ÁREA DA CAPA (HERO SECTION) --- */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        {tenant.coverUrl ? (
           <div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: `url(${tenant.coverUrl})` }}
           >
             {/* Degradê para o texto aparecer em cima da foto */}
             {/* O split pega a cor base do tema (ex: zinc ou rose) para fazer o degradê combinar */}
             <div className={`absolute inset-0 bg-gradient-to-t from-${currentTheme.bg.split('-')[1]}-950/90 to-transparent`}></div>
           </div>
        ) : (
           <div className="absolute inset-0 bg-gray-300"></div>
        )}

        {/* Logo e Nome sobre a capa */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-center">
            {tenant.logoUrl ? (
                <img 
                  src={tenant.logoUrl} 
                  className={`w-24 h-24 mx-auto mb-4 border-4 border-white shadow-xl object-cover ${currentTheme.rounded}`} 
                />
            ) : (
                <div className={`w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-white text-black font-bold text-3xl border-4 border-white shadow-xl ${currentTheme.rounded}`}>
                    {tenant.name.charAt(0)}
                </div>
            )}
            
            {/* TÍTULO COM SOMBRA FORTE PARA LEITURA */}
            <h1 className="text-3xl md:text-5xl font-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                {tenant.name}
            </h1>
            
            <p className="opacity-90 text-sm md:text-base mt-2 font-light drop-shadow-md">Agendamento Oficial</p>
        </div>
      </div>

      {/* --- CONTEÚDO --- */}
      <div className="max-w-md mx-auto px-4 -mt-6 relative z-10">
        
        {/* Passamos o estilo do tema para o BookingSystem também */}
        <div className={`${currentTheme.card} p-1 shadow-2xl ${currentTheme.rounded}`}>
            <BookingSystem 
                tenantId={tenant.id}
                services={servicosLimpos} 
                professionals={tenant.professionals}
                primaryColor={tenant.primaryColor}
            />
        </div>

        <div className="text-center mt-8 opacity-50 text-xs">
            <p>Powered by Agenda Inteligente © 2025</p>
        </div>
      </div>

    </div>
  )
}