import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO HUB - AUTORIDADE NACIONAL) ---
export const metadata: Metadata = {
  title: "Áreas de Atendimento | Sistema de Gestão Kairós",
  description: "Encontre o Kairós na sua região. O melhor sistema de gestão e agendamento online presente em São Paulo, ABC, Interior e Minas Gerais. Escolha sua localidade.",
  keywords:["sistema de gestão regional", "agendamento online por cidade", "kairós unidades", "sistema para barbearia sp", "gestão de clínicas abc"],
  alternates: {
    canonical: "https://kairos.egemporiodigital.com.br/sistema-de-gestao"
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

// --- SCHEMA MARKUP (SOFTWARE HUB) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kairós - Hub de Gestão Regional",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "Plataforma de gestão disponível em múltiplas regiões do Brasil"
  }
}

// --- LISTA DE LOCAIS PARA O HUB ---
const locations = [
  { group: "São Paulo (Capital)", items: [
    { name: "São Paulo - Geral", slug: "sao-paulo" },
    { name: "Tatuapé", slug: "tatuape" },
    { name: "Carrão", slug: "carrao" },
    { name: "Vila Formosa", slug: "vila-formosa" },
    { name: "Vila Prudente", slug: "vila-prudente" },
    { name: "Itaquera", slug: "itaquera" }, // ADICIONADO
  ]},
  { group: "Grande São Paulo", items: [
    { name: "Guarulhos", slug: "guarulhos" }, // ADICIONADO
    { name: "Arujá", slug: "aruja" }, // ADICIONADO
    { name: "Ferraz de Vasconcelos", slug: "ferraz-de-vasconcelos" }, // ADICIONADO
  ]},
  { group: "Grande ABC", items: [
    { name: "São Bernardo do Campo", slug: "sao-bernardo" },
    { name: "Santo André", slug: "santo-andre" },
    { name: "São Caetano do Sul", slug: "sao-caetano" },
  ]},
  { group: "Litoral Paulista", items: [
    { name: "Santos", slug: "santos" }, // ADICIONADO
  ]},
  { group: "Interior de SP", items: [
    { name: "Campinas", slug: "campinas" },
  ]},
  { group: "Rio de Janeiro", items: [
    { name: "Rio de Janeiro - Geral", slug: "rio-de-janeiro" }, // ADICIONADO
  ]},
  { group: "Minas Gerais", items: [
    { name: "Minas Gerais - Geral", slug: "minas-gerais" },
  ]}
]

export default function GestaoHubPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden bg-[#050505]">
      
      {/* --- ESTILOS GLOBAIS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-slow { animation: scroll 60s linear infinite; }
        
        /* Estilo do Acordeon (Hub de Locais) */
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] summary ~ * { animation: fadeInDown 0.5s ease-out forwards; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- BACKGROUND FIXO --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] opacity-20">
            <img src="/logo-fundo.png" alt="Logo Kairós Fundo" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[5px]"></div> 
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img src="/logo.png" alt="Logo Kairós" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">Kairós</span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide uppercase">Hub Nacional</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
              <Link href="/cadastro" className="bg-blue-600 text-white px-5 py-2.5 text-sm font-bold rounded-full hover:bg-blue-500 transition-all border border-blue-400/20 shadow-lg shadow-blue-900/20">
                  Teste Grátis
              </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">

        {/* --- HERO HUB --- */}
        <section className="pt-40 pb-12 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10 shadow-inner">
              <span>🌐</span>
              <span>Expansão Inteligente Kairós</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
              Sistemas de Gestão em <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
                Todo o Brasil.
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Descubra como o Kairós está automatizando agendas e faturamentos de negócios premium em cada canto do país com tecnologia de elite.
            </p>
          </div>
        </section>

        {/* --- SEÇÃO 1: TESE DE AUTORIDADE --- */}
        <section className="py-24 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Um Ecossistema de Gestão para o Crescimento Real.</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Diferente de agendas comuns que servem apenas para marcar horários, o <strong>Kairós</strong> foi desenvolvido como um <strong>sistema de gestão</strong> completo. Atuamos na redução do No-Show, na automação do marketing via WhatsApp e no controle rigoroso das finanças do seu estabelecimento.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Agendamento Online 24h sem interrupções.",
                            "Gestão Multi-Profissional.",
                            "White-label: Sua marca em primeiro lugar.",
                            "Mobile-First: Gerencie tudo do seu celular."
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <span className="text-blue-500 text-lg">✔</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-3xl shadow-2xl relative">
                    <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-xl">
                        Alta Performance
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 italic">"O segredo da escala é a automação."</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        O Kairós elimina a necessidade de um recepcionista focado apenas em responder WhatsApp, reduzindo custos operacionais e permitindo que você foque no faturamento e na qualidade técnica do serviço. Nossa tecnologia é o motor silencioso por trás de negócios que dobram de tamanho em 12 meses.
                    </p>
                    <Link href="/cadastro" className="text-blue-400 font-bold hover:text-white transition-colors underline underline-offset-4">
                        Comece seu teste de 3 dias agora →
                    </Link>
                </div>
            </div>
          </div>
        </section>

        {/* --- SEÇÃO 2: O CARD HUB --- */}
        <section className="py-24 px-6 relative z-20 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                
                <details className="group bg-[#080b11] border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-300">
                    
                    <summary className="flex items-center justify-between p-6 md:p-10 outline-none hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg border border-blue-500/20 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wide text-white leading-tight">
                                    Nossas Áreas de Atendimento
                                </h2>
                                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1">
                                    Clique aqui para selecionar seu bairro ou cidade
                                </p>
                            </div>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </summary>

                    <div className="px-6 md:px-12 py-12 bg-[#030407] border-t border-white/5 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-900/5 blur-[100px] pointer-events-none"></div>

                        {/* GRID DE CATEGORIAS DE LOCAIS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            {locations.map((group, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs pb-2 border-b border-white/10">
                                        {group.group}
                                    </h3>
                                    <ul className="space-y-3">
                                        {group.items.map((loc, locIdx) => (
                                            <li key={locIdx}>
                                                <Link 
                                                    href={`/sistema-de-gestao/${loc.slug}`}
                                                    className="text-gray-400 hover:text-white hover:translate-x-2 flex items-center gap-2 transition-all group/link"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                                                    <span className="text-sm md:text-base font-medium">{loc.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 pt-10 border-t border-white/5 text-center md:text-left">
                            <p className="text-gray-500 text-xs md:text-sm italic max-w-2xl">
                                * Estamos em constante expansão artesanal. Se o seu bairro ou cidade ainda não aparece na lista, nosso sistema funciona em todo o Brasil. Comece seu teste agora e valide a tecnologia.
                            </p>
                        </div>
                    </div>
                </details>

            </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-black/80 backdrop-blur-xl py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
                <img src="/logo.png" alt="Logo Kairós" className="w-6 h-6 object-contain grayscale" />
                <span className="font-bold text-gray-400">Kairós</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 Kairós - Sistema de Gestão Regional. Todos os direitos reservados.
            </div>
          </div>
        </footer>

      </main>

      {/* --- BOTÃO WHATSAPP --- */}
      <a 
        href="https://wa.me/5511916053292" 
        target="_blank" 
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl shadow-green-900/30 z-50 transition-all hover:-translate-y-1 border border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z"/>
        </svg>
      </a>

    </div>
  )
}