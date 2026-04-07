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

// --- DADOS DOS TEMAS ---
const themes = [
    { name: "Barbearia", img: "https://i.ibb.co/wf70mrq/IMG-9293.jpg", label: "Tema Barbearia" },
    { name: "Salão", img: "https://i.ibb.co/JR4P893D/IMG-9294.jpg", label: "Tema Salão de Beleza" },
    { name: "Restaurante", img: "https://i.ibb.co/wFBtgbwL/IMG-9298.jpg", label: "Tema Restaurante" },
    { name: "Clínica", img: "https://i.ibb.co/pr6s04cB/IMG-2228.jpg", label: "Tema Clínica" },
    { name: "Tattoo", img: "https://i.ibb.co/7Jh8hN6s/IMG-2247.jpg", label: "Tema Studio Tattoo" },
    { name: "Fotografia", img: "https://i.ibb.co/VYgtkMgY/IMG-2234.jpg", label: "Tema Fotografia" },
    { name: "Serviços", img: "https://i.ibb.co/1fXMcxcS/IMG-2241.jpg", label: "Tema Serviços" },
]

// --- COMPONENTE DE DEPOIMENTOS ---
const GoogleReviewCard = ({ name, text, img, location }: any) => (
    <div className="bg-white p-5 rounded-2xl shadow-xl flex flex-col gap-3 border border-gray-100 transition-all hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-sm leading-none">{name}</span>
            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mt-1">{location}</span>
          </div>
        </div>
        <span className="text-blue-500 font-black text-lg opacity-20">G</span>
      </div>
      <div className="flex text-yellow-400 text-xs">{"★".repeat(5)}</div>
      <p className="text-gray-600 text-[11px] leading-relaxed italic">"{text}"</p>
      <div className="pt-2 border-t border-gray-50 flex justify-between items-center text-[9px] font-extrabold uppercase text-blue-500">
         Ver no Maps
      </div>
    </div>
)

const testimonials = [
    { name: "Felipe R.", location: "Barbearia Elite", img: "https://i.pravatar.cc/150?u=41", text: "O Kairós organizou minha vida. O pessoal agenda sozinho pelo link e eu foco no atendimento." },
    { name: "Lya M.", location: "Studio Beauty", img: "https://i.pravatar.cc/150?u=42", text: "Meus clientes adoraram. Não precisa de app nem login, é o sistema mais rápido que já testei." },
    { name: "Alex T.", location: "Vila Carrão", img: "https://i.pravatar.cc/150?u=43", text: "O controle de equipe é o melhor. Cada barbeiro cuida da sua grade e eu acompanho o faturamento." },
    { name: "Sandra L.", location: "Jardim Têxtil", img: "https://i.pravatar.cc/150?u=44", text: "A confirmação pelo WhatsApp reduziu demais as faltas. Sistema essencial pra profissionalizar." },
]

// --- LISTA DE LOCAIS PARA O HUB (LINKS ATUALIZADOS) ---
const locations = [
  { group: "São Paulo (Capital)", items: [
    { name: "São Paulo - Geral", slug: "sao-paulo" },
    { name: "Tatuapé", slug: "tatuape" },
    { name: "Carrão", slug: "carrao" },
    { name: "Vila Formosa", slug: "vila-formosa" },
    { name: "Vila Prudente", slug: "vila-prudente" },
    { name: "Itaquera", slug: "itaquera" },
  ]},
  { group: "Grande São Paulo", items: [
    { name: "Guarulhos", slug: "guarulhos" },
    { name: "Arujá", slug: "aruja" },
    { name: "Ferraz de Vasconcelos", slug: "ferraz-de-vasconcelos" },
  ]},
  { group: "Grande ABC", items: [
    { name: "São Bernardo do Campo", slug: "sao-bernardo" },
    { name: "Santo André", slug: "santo-andre" },
    { name: "São Caetano do Sul", slug: "sao-caetano" },
  ]},
  { group: "Litoral Paulista", items: [
    { name: "Santos", slug: "santos" },
  ]},
  { group: "Interior de SP", items: [
    { name: "Campinas", slug: "campinas" },
  ]},
  { group: "Minas Gerais", items: [
    { name: "Belo Horizonte", slug: "belo-horizonte" },
  ]}
]

export default function GestaoHubPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden bg-black">
      
      {/* --- ESTILOS GLOBAIS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 10s linear infinite; }
        .animate-scroll-slow { animation: scroll 60s linear infinite; }
        .hover-pause:hover .animate-scroll, .hover-pause:hover .animate-scroll-slow { animation-play-state: paused; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] summary ~ * { animation: fadeInDown 0.5s ease-out forwards; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      {/* --- BACKGROUND FIXO --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] opacity-60">
            <img src="/logo-fundo.png" alt="" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[3px]"></div> 
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-14 h-14 md:w-16 md:h-16 relative flex items-center justify-center">
                <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="flex flex-col text-left">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">Kairós</span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide">sua agenda inteligente</span>
            </div>
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/login" className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-all uppercase tracking-widest shadow-lg">
              Entrar
            </Link>
            <Link href="/cadastro" className="bg-blue-600/90 text-white px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm font-bold rounded-full border border-blue-500/20">
              Teste Grátis
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">

        {/* --- HERO HUB --- */}
        <section className="pt-40 pb-12 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10 shadow-inner">
              <span>🚀</span>
              <span>O sistema de agendamento Nº 1 do mercado</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
              Gestão Inteligente em <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
                Todo o Brasil.
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                O Kairós automatiza agendas de negócios premium em cada canto do país com tecnologia de elite e agendamento instantâneo.
            </p>

            {/* MARQUEE */}
            <div className="w-full overflow-hidden py-8 border-y border-white/5 bg-black/20 backdrop-blur-sm mt-8 hover-pause">
              <div className="flex w-[200%] animate-scroll">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-8 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">💈 Barbearia</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">💅 Salão de Beleza</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">🍽️ Restaurantes</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">🏥 Clínica / Saúde</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">🐉 Tattoo Studio</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- COMO FUNCIONA (SIMPLES COMO DEVE SER) --- */}
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Brilho de fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* TÍTULO DA SEÇÃO */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Simples como deve ser.
                    </h2>
                    <p className="text-gray-400 text-sm md:text-lg font-medium tracking-wide">
                        Tudo automático, 24 horas por dia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {/* CARD 1 - EQUIPE E AGENDAS */}
                    <div className="group relative bg-[#111111]/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col gap-6 hover:border-blue-500/40 transition-all duration-500">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/5 group-hover:scale-110 transition-transform">
                            👤
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-white leading-tight tracking-tight">
                                1. Equipe e Agendas <br /> Individuais
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed font-medium">
                                Cada profissional tem sua própria agenda com serviços, preços e tempos de execução específicos. Organize seu time com liberdade total e zero conflitos.
                            </p>
                        </div>
                    </div>

                    {/* CARD 2 - AGENDAMENTO RÁPIDO */}
                    <div className="group relative bg-[#111111]/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col gap-6 hover:border-blue-500/40 transition-all duration-500">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/5 group-hover:scale-110 transition-transform">
                            ⚡
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-white leading-tight tracking-tight">
                                2. Agendamento em <br /> Menos de 1 Minuto
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed font-medium">
                                Seu cliente agenda sem precisar baixar aplicativos ou criar contas chatas. O caminho mais rápido entre o desejo do cliente e a sua cadeira de atendimento.
                            </p>
                        </div>
                    </div>

                    {/* CARD 3 - BRANDING E WHATSAPP */}
                    <div className="group relative bg-[#111111]/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col gap-6 hover:border-blue-500/40 transition-all duration-500">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/5 group-hover:scale-110 transition-transform">
                            🎨
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-white leading-tight tracking-tight">
                                3. Sua Marca e WhatsApp <br /> Num Clique
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed font-medium">
                                Link exclusivo com sua logo, capa e URL própria. Reduza faltas enviando confirmações profissionais pelo WhatsApp com apenas um toque rápido e simples.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- CARROSSEL DE MOCKUPS --- */}
        <section className="py-24 overflow-hidden border-y border-white/5">
            <div className="w-full hover-pause">
                <div className="flex w-max animate-scroll-slow gap-6 px-4">
                    {[...themes, ...themes].map((theme, index) => (
                        <div key={index} className="flex-shrink-0 flex flex-col items-center w-[180px] md:w-[280px]">
                            <div className="relative bg-zinc-900 rounded-[2rem] border-[4px] border-zinc-800 overflow-hidden shadow-2xl w-full aspect-[9/19]">
                                <img src={theme.img} alt={theme.label} className="w-full h-full object-cover opacity-90" />
                            </div>
                            <p className="text-center mt-4 font-bold text-gray-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-xs">{theme.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- HUB DE LOCALIZAÇÕES (CORRIGIDO) --- */}
        <section className="py-24 px-6 relative z-20">
            <div className="max-w-4xl mx-auto">
                <details className="group bg-[#080b11] border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer open:ring-2 open:ring-blue-500/30">
                    <summary className="flex items-center justify-between p-6 md:p-10 outline-none hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg border border-blue-500/20 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div className="flex flex-col text-left">
                                <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wide text-white leading-tight">Nossas Áreas de Atendimento</h2>
                                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1">Clique para selecionar seu bairro ou cidade</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</div>
                    </summary>

                    <div className="px-6 md:px-12 py-12 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            {locations.map((group, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs pb-2 border-b border-white/10 text-left">{group.group}</h3>
                                    <ul className="space-y-3">
                                        {group.items.map((loc, locIdx) => (
                                            <li key={locIdx} className="text-left">
                                                <Link href={`/sistema-de-gestao-para-barbearias/${loc.slug}`} className="text-gray-400 hover:text-white hover:translate-x-2 flex items-center gap-2 transition-all group/link">
                                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                                                    <span className="text-sm md:text-base font-medium">{loc.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </details>
            </div>
        </section>

        {/* --- DOSSIÊ DE PILARES (TESE DE AUTORIDADE NACIONAL) --- */}
        <section className="py-24 px-6 relative z-20">
            <div className="max-w-6xl mx-auto">
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-blue-500/10 text-blue-400 p-2.5 rounded-md border border-blue-500/20 shrink-0 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Dossiê de Dominação: Kairós Gestão Inteligente</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">Clique para ver os 15 pilares de gestão para o seu negócio</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed text-left">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA BARBEARIAS com link personalizado, logo e capa exclusivos.</h3>
                                <p className="mt-2">Estabeleça uma presença digital de elite com um link de agendamento que reflete a identidade visual da sua barbearia. O Kairós transforma seu link em uma extensão da sua vitrine, passando confiança imediata para o cliente premium que busca agilidade e profissionalismo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com agendas individuais para cada profissional.</h3>
                                <p className="mt-2">Organize sua equipe de especialistas com calendários independentes e sincronizados. Acabe com o caos na recepção e garanta que cada cabeleireiro ou manicure tenha controle total da sua própria grade, eliminando conflitos de horários permanentemente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA CLÍNICAS com personalização máxima de serviços, valores e tempos.</h3>
                                <p className="mt-2">Ajuste cada procedimento com precisão cirúrgica, definindo preços e durações exatas. O Kairós permite uma gestão financeira e operacional sob medida para clínicas que buscam otimizar o fluxo de pacientes e a rentabilidade por sala de atendimento.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA ESTÚDIOS DE TATTOO sem necessidade de cadastro, login ou download.</h3>
                                <p className="mt-2">Remova todas as barreiras entre o seu cliente e a sessão de tattoo. Nosso sistema permite o agendamento direto pelo navegador, sem exigir que o cliente baixe aplicativos pesados ou decore senhas, garantindo a maior taxa de conversão do mercado.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA ESMALTERIAS com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2">Ofereça conveniência máxima para suas clientes com um processo de reserva ultra-veloz. Otimize o giro das suas cadeiras e permita que a cliente escolha o serviço e a profissional favorita em poucos segundos, de forma totalmente intuitiva.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com agenda inteligente que evita conflitos.</h3>
                                <p className="mt-2">Zere os erros de marcação dupla com nossa tecnologia de trava automática. Proteja a reputação do seu negócio e garanta que seus equipamentos e salas estejam sempre otimizados, sem buracos na agenda ou clientes esperando por falha manual.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com fotos reais da equipe no agendamento.</h3>
                                <p className="mt-2">Humanize seu atendimento digital permitindo que o cliente escolha o fotógrafo pela foto real. Isso gera conexão e autoridade imediata, elevando o valor percebido do seu trabalho antes mesmo do primeiro clique no estúdio.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA BARBEARIAS com dashboard intuitivo para uso dos funcionários.</h3>
                                <p className="mt-2">Simplifique a vida do seu time com um painel administrativo que não exige treinamento. Seus barbeiros gerenciam o dia a dia com facilidade, focando no que realmente importa: a qualidade do corte e a experiência do cliente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2">Monitore o movimento do seu salão de qualquer lugar. O Kairós funciona como um app na sua tela inicial, permitindo que você acompanhe agendamentos e faturamento em tempo real com apenas um toque no smartphone.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full"></span> 10. SISTEMA DE GESTÃO PARA CLÍNICAS com histórico detalhado de cada serviço realizado.</h3>
                                <p className="mt-2">Tenha em mãos os dados estratégicos do seu negócio. Entenda quais procedimentos performam melhor e fidelize pacientes com base em um histórico de atendimento organizado e fácil de consultar no sistema.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com confirmação de agenda via WhatsApp em um clique.</h3>
                                <p className="mt-2">Reduza o No-Show enviando lembretes profissionais direto para o WhatsApp do cliente. Proteja seu tempo e garanta que sua agenda de tatuagens esteja sempre confirmada, evitando perdas financeiras por esquecimento do cliente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA ESMALTERIAS focado em experiência Mobile-First de alta velocidade.</h3>
                                <p className="mt-2">Proporcione o agendamento mais fluido do mercado pelo celular. Nossa interface é otimizada para carregar instantaneamente, garantindo que suas clientes agendem de onde estiverem, com a praticidade que o dia a dia exige.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2">Recupere horas do seu dia automatizando a marcação de horários. Deixe de ser um "atendente de WhatsApp" e torne-se um gestor estratégico, enquanto o Kairós cuida das reservas 24 horas por dia para você.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com relatórios financeiros de controle total.</h3>
                                <p className="mt-2">Visualize seu lucro real com relatórios intuitivos. Controle entradas, analise a produtividade do estúdio e tome decisões baseadas em números, abandonando as planilhas manuais e as anotações confusas.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA SERVIÇOS EM GERAL para modernizar e profissionalizar o seu negócio.</h3>
                                <p className="mt-2">Eleve o patamar da sua empresa com a tecnologia de agendamento Nº 1 do mercado. O Kairós é o motor que profissionaliza sua gestão e posiciona sua marca como referência de inovação e excelência em qualquer nicho.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-blue-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar meu negócio agora
                            </Link>
                        </div>
                    </div>
                </details>
            </div>
        </section>

        {/* --- TESTEMUNHOS --- */}
        <section className="py-24 px-6 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div className="space-y-2 text-left">
                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-tight">Quem já usa e <span className="text-blue-500">aprova:</span></h2>
                <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide">Junte-se a centenas de negócios que automatizaram a agenda.</p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-yellow-400 font-black shadow-xl">4.9 ★★★★★</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {testimonials.map((item, index) => (
                <GoogleReviewCard key={index} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">Dúvidas Frequentes</h2>
            <div className="space-y-4">
                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">Para qual tipo de negócio o sistema serve? <span className="transform group-open:rotate-180 transition-transform">▼</span></summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2 text-left">O Kairós atende: Barbearias, Salões de Beleza, Restaurantes, Clínicas, Tattoo e Profissionais Liberais.</div>
                </details>
                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">O sistema funciona em qualquer cidade? <span className="transform group-open:rotate-180 transition-transform">▼</span></summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2 text-left">Sim! O Kairós é 100% online e pode ser utilizado em qualquer lugar do Brasil com acesso à internet.</div>
                </details>
                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">Preciso cadastrar cartão para o teste grátis? <span className="transform group-open:rotate-180 transition-transform">▼</span></summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2 text-left">Não! O teste de 3 dias é livre. Você só escolhe um plano se o sistema realmente fizer sentido para o seu negócio.</div>
                </details>
            </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-black/60 backdrop-blur-xl py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-90">
              <img src="/logo.png" alt="Logo Kairós" className="w-6 h-6 object-contain grayscale" />
              <span className="font-bold text-gray-200">Kairós Hub</span>
            </div>
            <div className="text-sm text-gray-600">© Kairós - Sistema de Gestão Regional. Todos os direitos reservados.</div>
          </div>
        </footer>

      </main>

      {/* --- BOTÃO WHATSAPP --- */}
      <a href="https://wa.me/5511916053292" target="_blank" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl z-50 transition-all hover:-translate-y-1 border border-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z"/></svg>
      </a>

    </div>
  )
}