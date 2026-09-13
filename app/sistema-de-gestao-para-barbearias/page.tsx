import Link from "next/link"
import { Metadata } from "next"
import BrandTitle from "@/app/admin/brand-title"

// --- METADATA (SEO HUB - AUTORIDADE NACIONAL - 100% PRESERVADO) ---
export const metadata: Metadata = {
  title: "Áreas de Atendimento | Sistema de Gestão Kairós",
  description: "Encontre o Kairós na sua região. O melhor sistema de gestão e agendamento online presente em São Paulo, ABC, Interior e Minas Gerais. Escolha sua localidade.",
  keywords: ["sistema de gestão regional", "agendamento online por cidade", "kairós unidades", "sistema para barbearia sp", "gestão de clínicas abc"],
  openGraph: { siteName: "Kairós" },
  alternates: {
    canonical: "https://egkairos.com.br/sistema-de-gestao-para-barbearias"
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

// --- DADOS DOS TEMAS ---
const themes = [
  { name: "Barbearia", img: "/temas/tema-barbearia.jpg", label: "Tema Barbearia" },
  { name: "Salão", img: "/temas/tema-salao.jpg", label: "Tema Salão de Beleza" },
  { name: "Restaurante", img: "/temas/tema-restaurante.jpg", label: "Tema Restaurante" },
  { name: "Clínica", img: "/temas/tema-clinica.jpg", label: "Tema Clínica" },
  { name: "Tattoo", img: "/temas/tema-tattoo.jpg", label: "Tema Studio Tattoo" },
  { name: "Fotografia", img: "/temas/tema-fotografia.jpg", label: "Tema Fotografia" },
  { name: "Serviços", img: "/temas/tema-servicos.jpg", label: "Tema Serviços" },
]

// --- COMPONENTE DE DEPOIMENTOS ---
const GoogleReviewCard = ({ name, text, img, location }: any) => (
  <div className="bg-white p-5 rounded-2xl shadow-xl flex flex-col gap-3 border border-gray-100 transition-all hover:scale-[1.02]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={img} alt={name} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
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
  { name: "Felipe R.", location: "Morumbi", img: "https://i.pravatar.cc/150?u=41", text: "O Kairós organizou minha vida. O pessoal agenda sozinho pelo link e eu foco no atendimento." },
  { name: "Lya M.", location: "São Gonçalo", img: "https://i.pravatar.cc/150?u=42", text: "Meus clientes adoraram. Não precisa de app nem login, é o sistema mais rápido que já testei." },
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
  ]},
  { group: "Rio de Janeiro", items: [
    { name: "Rio de Janeiro - Geral", slug: "rio-de-janeiro" },
  ]}
]

export default function GestaoHubPage() {
return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">

        {/* --- ESTILOS GLOBAIS --- */}
        <style dangerouslySetInnerHTML={{
            __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        .animate-scroll-slow {
          animation: scroll 60s linear infinite;
        }
        .hover-pause:hover .animate-scroll,
        .hover-pause:hover .animate-scroll-slow {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] summary ~ * { animation: fadeInDown 0.5s ease-out forwards; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        .brand-scanner {
          font-family: 'Orbitron', sans-serif;
          position: relative;
          color: #0f172a;
          white-space: nowrap;
        }
        .brand-scanner::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(to right, #090d16 20%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px #1d4ed8;
          border-right: 2.5px solid #2563eb;
          overflow: hidden;
          animation: fillScannerLoop 5s linear infinite;
        }
        @keyframes fillScannerLoop {
          0%, 5% { width: 0; border-right-color: #2563eb; }
          40% { width: 100%; border-right-color: #2563eb; }
          45%, 75% { width: 100%; border-right-color: transparent; }
          80% { width: 100%; border-right-color: #2563eb; }
          95%, 100% { width: 0; border-right-color: #2563eb; }
        }
      `}} />

        {/* --- BACKGROUND FIXO --- */}
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-slate-50 transform-gpu will-change-transform">
          {/* Glow suave azulado atrás da logo */}
          <div className="absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none"></div>

          {/* Logo nítida */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] opacity-35 transition-all">
              <img src="/logo-fundo.png" alt="" className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(37,99,235,0.15)]" />
          </div>
          
          <div className="absolute inset-0 bg-slate-50/30 backdrop-blur-[1px]"></div> 
        </div>

        {/* WRAPPER FIXO DO HEADER + MENU DESLIZANTE */}
        <div className="fixed top-0 left-0 w-full z-50">
          {/* GATILHO DO MENU INVISÍVEL */}
          <input type="checkbox" id="toggle-lp-menu" className="peer sr-only" />

          {/* BARRA FIXA SUPERIOR */}
          <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-2.5 md:py-3 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* LADO ESQUERDO: DOCK CYBER-GLASS + BRANDTITLE */}
              <div className="flex items-center gap-4 min-w-0">
                <Link href="/sistema-de-gestao-para-barbearias" className="relative w-14 h-14 md:w-15 md:h-15 rounded-2xl p-[3px] bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_24px_-6px_rgba(15,23,42,0.2),0_0_14px_rgba(0,240,255,0.25),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center shrink-0">
                  <div className="absolute inset-[2.5px] rounded-[13px] border border-cyan-400/50 shadow-[0_0_8px_#00f0ff,inset_0_0_6px_#00f0ff] pointer-events-none" />
                  <div className="relative z-10 w-full h-full rounded-[11px] overflow-hidden bg-slate-950 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center border border-slate-900">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
                  </div>
                </Link>
                
                <BrandTitle tenantName="SUA AGENDA INTELIGENTE" />
              </div>

              {/* LADO DIREITO DESKTOP */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <Link 
                  href="/" 
                  className="bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-500/50 hover:bg-slate-50 px-5 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 whitespace-nowrap"
                >
                  Início
                </Link>

                <Link 
                  href="/cadastro" 
                  className="relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 whitespace-nowrap flex items-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Teste Grátis
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </div>

              {/* LADO DIREITO MOBILE: BOTÃO HAMBURGUER */}
              <label 
                htmlFor="toggle-lp-menu" 
                className="md:hidden cursor-pointer relative p-[2px] rounded-2xl overflow-hidden group flex items-center justify-center transition-all active:scale-95 shadow-sm"
              >
                <div className="relative z-10 p-2.5 rounded-[calc(1rem-2px)] w-full h-full flex items-center justify-center transition-all bg-white border border-slate-200 group-hover:bg-slate-50 group-hover:border-blue-500/50 shadow-sm">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
              </label>

            </div>
          </header>

          {/* GAVETA DESLIZANTE MOBILE */}
          <div className="md:hidden w-full bg-slate-50/98 backdrop-blur-xl border-b border-slate-200 overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] opacity-0 peer-checked:opacity-100 shadow-xl">
            <div className="min-h-0">
              <div className="px-6 py-6 flex flex-col gap-3">
                <Link 
                  href="/" 
                  className="w-full text-center bg-white border border-slate-200 text-slate-800 hover:text-blue-600 hover:border-blue-500/50 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
                >
                  Início
                </Link>

                <Link 
                  href="/cadastro" 
                  className="w-full text-center relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Teste Grátis Agora
                    <span>→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      <main className="relative z-10">

        {/* --- HERO HUB --- */}
        <section className="pt-32 md:pt-40 pb-12 px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-200/80 shadow-sm">
              <span>🚀</span>
              <span>O sistema de agendamento Nº 1 do mercado</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 drop-shadow-sm">
              Sistema de Gestão <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient">
                Para Barbearias.
              </span>
            </h1>

            <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
              O Kairós automatiza agendas de negócios premium em cada canto do país com tecnologia de elite e agendamento instantâneo.
            </p>

            {/* MARQUEE */}
            <div className="w-full overflow-hidden py-4 border-y border-slate-200/80 bg-slate-100/60 backdrop-blur-sm mt-8 hover-pause">
              <div className="flex w-[200%] animate-scroll">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 md:gap-8 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base bg-white px-5 py-2 rounded-full border border-slate-200/80 shadow-sm">💈 Barbearia</div>
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base bg-white px-5 py-2 rounded-full border border-slate-200/80 shadow-sm">💅 Salão de Beleza</div>
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base bg-white px-5 py-2 rounded-full border border-slate-200/80 shadow-sm">🍽️ Restaurantes</div>
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base bg-white px-5 py-2 rounded-full border border-slate-200/80 shadow-sm">🏥 Clínica / Saúde</div>
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base bg-white px-5 py-2 rounded-full border border-slate-200/80 shadow-sm">🐉 Tattoo Studio</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- NOVA SESSÃO: MOCKUP PREMIUM --- */}
        <section className="py-24 relative overflow-hidden bg-slate-100/70 border-y border-slate-200/80">
          {/* Efeitos de fundo suaves */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* TEXTO À ESQUERDA */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">🚀 GESTÃO INTELIGENTE</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight italic uppercase tracking-tighter">
                  Seu negócio na <br />
                  <span className="text-blue-600">palma da mão.</span>
                </h2>
                
                <p className="text-slate-600 text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  Centralize agendamentos, equipe e faturamento em uma única plataforma. Simples, rápida e acessível de qualquer lugar.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white border border-slate-200/80 shadow-sm p-4 rounded-2xl">
                    <span className="block text-2xl mb-1">⚡</span>
                    <span className="block text-xs font-black text-slate-900 uppercase tracking-widest">GESTÃO COMPLETA</span>
                  </div>
                  <div className="bg-white border border-slate-200/80 shadow-sm p-4 rounded-2xl">
                    <span className="block text-2xl mb-1">📱</span>
                    <span className="block text-xs font-black text-slate-900 uppercase tracking-widest">USE COMO UM APP</span>
                  </div>
                </div>
              </div>

              {/* MOCKUP À DIREITA */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-blue-500/15 blur-[80px] rounded-full scale-75 pointer-events-none"></div>
                
                <div className="relative group">
                  <img 
                    src="/mao-celular.png" 
                    alt="Smartphone Kairós" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-w-[500px] mx-auto drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)] transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {/* Cards Flutuantes Acrílico Real */}
                  <div className="absolute -top-4 -right-4 md:right-0 bg-white/75 backdrop-blur-2xl border border-white/90 p-4 rounded-2xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_16px_32px_-8px_rgba(15,23,42,0.15)] animate-bounce [animation-duration:3s]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter leading-none">Novo Agendamento</p>
                        <p className="text-sm font-bold text-slate-900">Corte + Barba</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 -left-4 md:left-0 bg-white/75 backdrop-blur-2xl border border-white/90 p-4 rounded-2xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_16px_32px_-8px_rgba(15,23,42,0.15)] animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-600 text-xs">★</div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter leading-none">Avaliação 5.0</p>
                        <p className="text-sm font-bold text-slate-900">Cliente Satisfeito</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- COMO FUNCIONA (AJUSTADO PARA PADRÃO SEO) --- */}
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
                        Simples como deve ser
                    </h2>
                    <p className="text-slate-600 text-sm md:text-lg font-medium tracking-wide">
                        Tudo automático, 24 horas por dia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* CARD 1 - EQUIPE E AGENDAS */}
                    <div className="group relative bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] flex flex-col gap-6 border border-white/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_12px_28px_-8px_rgba(15,23,42,0.08)] hover:shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_20px_35px_-8px_rgba(37,99,235,0.18)] hover:border-blue-300/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none"></div>
                        <div className="w-14 h-14 bg-blue-50/90 text-blue-600 rounded-2xl flex items-center justify-center text-3xl border border-blue-100/80 group-hover:scale-110 transition-transform relative z-10 shadow-sm">
                            👤
                        </div>
                        <div className="space-y-3 relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                                1. Serviços e Agendas <br /> Individuais
                            </h3>
                            <p className="text-slate-600 text-base leading-relaxed font-normal">
                                Cada profissional tem sua própria agenda com serviços, preços e tempos de execução diferentes. Organize seu time com liberdade total e zero conflitos.
                            </p>
                        </div>
                    </div>

                    {/* CARD 2 - AGENDAMENTO RÁPIDO */}
                    <div className="group relative bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] flex flex-col gap-6 border border-white/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_12px_28px_-8px_rgba(15,23,42,0.08)] hover:shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_20px_35px_-8px_rgba(37,99,235,0.18)] hover:border-blue-300/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none"></div>
                        <div className="w-14 h-14 bg-blue-50/90 text-blue-600 rounded-2xl flex items-center justify-center text-3xl border border-blue-100/80 group-hover:scale-110 transition-transform relative z-10 shadow-sm">
                            ⚡
                        </div>
                        <div className="space-y-3 relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                                2. Agendamento em <br /> Menos de 1 Minuto
                            </h3>
                            <p className="text-slate-600 text-base leading-relaxed font-normal">
                                Seu cliente agenda sem precisar baixar aplicativos ou criar contas chatas. O caminho mais rápido entre o desejo do cliente e a sua cadeira de atendimento.
                            </p>
                        </div>
                    </div>

                    {/* CARD 3 - BRANDING E WHATSAPP */}
                    <div className="group relative bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] flex flex-col gap-6 border border-white/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_12px_28px_-8px_rgba(15,23,42,0.08)] hover:shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_20px_35px_-8px_rgba(37,99,235,0.18)] hover:border-blue-300/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none"></div>
                        <div className="w-14 h-14 bg-blue-50/90 text-blue-600 rounded-2xl flex items-center justify-center text-3xl border border-blue-100/80 group-hover:scale-110 transition-transform relative z-10 shadow-sm">
                            🎨
                        </div>
                        <div className="space-y-3 relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                                3. Sua Marca e WhatsApp <br /> Num Clique
                            </h3>
                            <p className="text-slate-600 text-base leading-relaxed font-normal">
                                Link exclusivo com sua logo, capa e URL própria. Reduza faltas enviando confirmações profissionais pelo WhatsApp com apenas um toque rápido e simples.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- CARROSSEL DE MOCKUPS --- */}
        <section className="py-24 bg-slate-100/60 border-y border-slate-200/80 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-slate-900">Seu sistema, sua cara.</h2>
                    <p className="text-slate-600">Personalize para o seu nicho.</p>
                </div>

                <div className="w-full overflow-hidden hover-pause">
                    <div className="flex w-max animate-scroll-slow gap-6 px-4">
                        {[...themes, ...themes].map((theme, index) => (
                            <div key={index} className="flex-shrink-0 flex flex-col items-center group w-[200px] md:w-[300px]">
                                <div className="relative bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] border-[4px] md:border-[8px] border-slate-900 overflow-hidden shadow-[0_20px_40px_-15px_rgba(15,23,42,0.25)] w-full aspect-[9/19] transition-transform duration-300 group-hover:scale-[1.02]">
                                     <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                                        <img 
                                          src={theme.img} 
                                          alt={theme.label} 
                                          loading="lazy"
                                          decoding="async"
                                          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all" 
                                        />
                                     </div>
                                </div>
                                <p className="text-center mt-6 font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-sm text-sm md:text-base">{theme.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* --- TESTEMUNHOS --- */}
        <section className="py-24 px-6 bg-slate-100/60 border-y border-slate-200/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div className="space-y-2 text-left">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-tight">
                  Quem já usa e <span className="text-blue-600">aprova:</span>
                </h2>
                <p className="text-slate-600 text-sm md:text-base font-medium tracking-wide">
                  Junte-se a centenas de negócios que automatizaram a agenda.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200/80 text-amber-500 font-black shadow-sm">
                4.9 ★★★★★
              </div>
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
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">Dúvidas Frequentes</h2>
            <div className="space-y-4">
                <details className="group bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                    <summary className="flex justify-between items-center p-5 font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                      Para qual tipo de negócio o sistema serve? 
                      <span className="transform group-open:rotate-180 transition-transform text-slate-400">▼</span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-slate-600 border-t border-slate-100 pt-3 text-left leading-relaxed">
                      O Kairós atende: Barbearias, Salões de Beleza, Restaurantes, Clínicas, Tattoo e Profissionais Liberais.
                    </div>
                </details>
                <details className="group bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                    <summary className="flex justify-between items-center p-5 font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                      O sistema funciona em qualquer cidade? 
                      <span className="transform group-open:rotate-180 transition-transform text-slate-400">▼</span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-slate-600 border-t border-slate-100 pt-3 text-left leading-relaxed">
                      Sim! O Kairós é 100% online e pode ser utilizado em qualquer lugar do Brasil com acesso à internet.
                    </div>
                </details>
                <details className="group bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                    <summary className="flex justify-between items-center p-5 font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                      Preciso cadastrar cartão para o teste grátis? 
                      <span className="transform group-open:rotate-180 transition-transform text-slate-400">▼</span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-slate-600 border-t border-slate-100 pt-3 text-left leading-relaxed">
                      Não! O teste de 7 dias é livre. Você só escolhe um plano se o sistema realmente fizer sentido para o seu negócio.
                    </div>
                </details>
            </div>
        </section>

        {/* --- HUB DE LOCALIZAÇÕES (PADRÃO VISUAL ATUALIZADO) --- */}
        <section className="py-12 px-6 relative z-20">
            <div className="max-w-6xl mx-auto space-y-6">
                <details className="group border-b border-slate-200/80 cursor-pointer transition-all">
                    <summary className="flex items-center py-4 md:py-5 outline-none select-none hover:opacity-80 transition-opacity cursor-pointer">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-200/60 shrink-0 flex items-center justify-center text-2xl shadow-sm">
                                📍
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 leading-tight block group-hover:text-blue-600 transition-colors">Nossas Áreas de Atendimento</span>
                                <span className="text-xs md:text-sm text-slate-500 uppercase tracking-widest mt-1 italic block font-medium">Clique para selecionar seu bairro ou cidade</span>
                            </span>
                        </span>
                    </summary>

                    <div className="py-8 md:py-12 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 relative z-10 max-w-5xl">
                            {locations.map((group, idx) => (
                                <div key={idx} className="space-y-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_20px_-6px_rgba(15,23,42,0.06)]">
                                    <h3 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs pb-3 border-b border-slate-200/80 text-left flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                        {group.group}
                                    </h3>
                                    <ul className="space-y-2.5">
                                        {group.items.map((loc, locIdx) => (
                                            <li key={locIdx} className="text-left">
                                                <Link 
                                                    href={`/sistema-de-gestao-para-barbearias/${loc.slug}`} 
                                                    className="text-slate-600 hover:text-blue-600 hover:translate-x-1.5 flex items-center gap-2 transition-all group/link py-1"
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
                    </div>
                </details>

                {/* --- SEÇÃO DE PILARES SEO (COLADO) --- */}
                <details className="group border-b border-slate-200/80 cursor-pointer transition-all">
                    <summary className="flex items-center py-4 md:py-5 outline-none select-none hover:opacity-80 transition-opacity cursor-pointer">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-200/60 shrink-0 flex items-center justify-center text-2xl shadow-sm">
                                💈
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 leading-tight block group-hover:text-blue-600 transition-colors">Tese de Autoridade: Kairós Barber Shop</span>
                                <span className="text-xs md:text-sm text-slate-500 uppercase tracking-widest mt-1 italic block font-medium">Clique para ver os 15 pilares de gestão para barbearias</span>
                            </span>
                        </span>
                    </summary>

                    <div className="py-8 md:py-12 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-slate-600 text-sm md:text-base leading-relaxed">

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA BARBEARIAS com link personalizado para agendamento de degradê e barba.</h3>
                                <p className="mt-2 text-left text-slate-600">O Kairós transforma a presença digital da sua barbearia ao oferecer um link de agendamento que é a cara do seu negócio. Personalize com sua logo e fotos dos seus melhores cortes para criar um ambiente de elite onde o cliente se sente na poltrona antes mesmo de sair de casa. Ter um sistema de gestão para barbearias que prioriza o seu branding ajuda a elevar o preço do seu serviço e a atrair um público que valoriza a estética e a exclusividade. Domine o mercado local com uma interface que vende o seu talento 24 horas por dia.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA BARBEARIAS com agendas independentes para cada barbeiro da sua equipe.</h3>
                                <p className="mt-2 text-left text-slate-600">Organize sua barbearia com maestria ao oferecer calendários individuais para cada profissional, desde o mestre barbeiro até os iniciantes. O Kairós permite que cada cadeira funcione como uma unidade de negócio independente, com serviços e horários sincronizados para evitar qualquer confusão no salão. Essa separação clara de agendas aumenta a produtividade da equipe e garante que o fluxo de clientes seja constante e sem gargalos na recepção. Profissionalize a gestão do seu time com uma ferramenta desenhada para o ritmo intenso de uma barbearia de sucesso.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA BARBEARIAS com personalização de combos, barboterapia e cortes técnicos.</h3>
                                <p className="mt-2 text-left text-slate-600">Configure seu cardápio de serviços com total liberdade, definindo preços e tempos de execução precisos para cada especialidade da casa. Seja para um corte clássico na tesoura, um degradê moderno ou um ritual de barboterapia com toalha quente, o Kairós adapta a agenda à realidade técnica do seu trabalho. Ter um sistema de gestão para barbearias flexível permite que você maximize o faturamento ao oferecer combos que incentivam o cliente a consumir mais serviços em uma única visita. Tome o controle absoluto da sua lucratividade com uma gestão de serviços estratégica.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA BARBEARIAS sem burocracia de login ou cadastro para agendar o corte.</h3>
                                <p className="mt-2 text-left text-slate-600">Remova todas as barreiras que fazem o homem moderno desistir de marcar um horário: o Kairós não pede senhas, logins ou downloads de aplicativos. O agendamento é feito de forma direta e intuitiva pelo navegador do celular, respeitando a pressa de quem precisa garantir o visual da semana em poucos cliques. Esse diferencial tecnológico garante que sua barbearia tenha a maior taxa de conversão do mercado, transformando seguidores do Instagram em clientes na cadeira em tempo recorde. Simplifique o acesso ao seu talento e veja sua agenda lotar sem esforço.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA BARBEARIAS com reserva de horário concluída em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-slate-600">Proporcione a experiência de agendamento mais veloz do setor, permitindo que o cliente reserve o corte de cabelo ou a barba em menos de 60 segundos. A interface do Kairós foi otimizada para o comportamento masculino, focando na escolha rápida do profissional e da data disponível sem enrolação. Velocidade é um pilar fundamental para barbearias de alto movimento que não podem perder tempo com processos lentos ou manuais. Automatize sua recepção com uma tecnologia que acompanha a velocidade do seu negócio e entrega conveniência real para o seu público fidelizado.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA BARBEARIAS com agenda inteligente que elimina o erro de horários duplicados.</h3>
                                <p className="mt-2 text-left text-slate-600">Acabe definitivamente com o estresse de dois clientes chegarem ao mesmo tempo para o mesmo barbeiro através da nossa trava de segurança automática. O Kairós monitora a ocupação de cada cadeira em milissegundos, garantindo uma organização impecável que preserva a sua autoridade profissional perante o cliente. Evitar conflitos de agenda é essencial para manter o ambiente da barbearia tranquilo e focado na excelência do atendimento técnico. Tenha a paz mental de uma gestão digital que blinda sua operação contra falhas humanas comuns em agendas de papel ou mensagens soltas.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA BARBEARIAS com fotos dos barbeiros para escolha do profissional preferido.</h3>
                                <p className="mt-2 text-left text-slate-600">Dê rosto ao seu time e permita que o cliente escolha o barbeiro de confiança através de fotos reais integradas ao sistema de agendamento. No mundo das barbearias, a conexão entre cliente e barbeiro é sagrada, e o Kairós facilita esse vínculo desde o primeiro contato digital. Mostrar a equipe valoriza o marketing pessoal dos seus profissionais e ajuda a vender a experiência completa que sua barbearia oferece. Transforme seu link de agendamento em uma ferramenta de branding poderosa que destaca a especialidade e o estilo de cada talento da sua casa.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA BARBEARIAS com painel intuitivo para acompanhamento dos barbeiros.</h3>
                                <p className="mt-2 text-left text-slate-600">Entregue para sua equipe uma ferramenta de trabalho que não exige treinamento e que facilita a visualização dos próximos cortes em poucos segundos. O dashboard do Kairós foi desenhado para ser consultado entre um degradê e outro, garantindo que o barbeiro esteja sempre preparado para o próximo cliente. A facilidade de uso do sistema reduz a resistência da equipe à tecnologia e mantém os dados da barbearia sempre organizados e atualizados. Simplifique a rotina operacional do seu negócio e deixe que seus profissionais foquem no que realmente importa: a perfeição na navalha.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA BARBEARIAS com atalho de acesso rápido no smartphone do dono.</h3>
                                <p className="mt-2 text-left text-slate-600">Monitore o movimento da sua barbearia de onde estiver, com a agilidade de um aplicativo e sem precisar estar presente fisicamente o tempo todo. O Kairós funciona como um Web App de alta performance, permitindo que você confira a ocupação das cadeiras e o faturamento do dia com apenas um toque na tela do celular. Essa mobilidade é um diferencial para o gestor que precisa tomar decisões rápidas sobre escalas e estoque sem perder tempo com processos burocráticos. Tenha o controle estratégico da sua barbearia na palma da mão com nossa tecnologia de acesso instantâneo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA BARBEARIAS com gestão completa de faturamento e comissões da equipe.</h3>
                                <p className="mt-2 text-left text-slate-600">Entenda com precisão quais barbeiros são os motores do seu faturamento e quais serviços são os mais procurados pelos clientes da sua região. O Kairós oferece um histórico detalhado que facilita o cálculo de comissões e a análise da produtividade de cada profissional da equipe. Abandone as planilhas complexas e os cadernos de anotações que podem gerar erros de cálculo e descontentamento no time. Gerencie sua barbearia com base em dados reais e tome decisões seguras para o crescimento do seu negócio através de uma gestão financeira profissional e transparente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA BARBEARIAS com lembrete via WhatsApp para reduzir faltas e no-show.</h3>
                                <p className="mt-2 text-left text-slate-600">Proteja o seu lucro diário e garanta que suas cadeiras nunca fiquem vazias enviando confirmações profissionais direto para o WhatsApp do cliente. Esta funcionalidade do Kairós é a arma definitiva contra o esquecimento de clientes, reduzindo as faltas em até 40% no dia a dia da barbearia. Com um clique rápido, o sistema envia todos os dados do agendamento, gerando um compromisso real e profissionalizando a sua comunicação. Mantenha o fluxo de caixa estável e a produtividade máxima da sua equipe com um processo de confirmação de horários que realmente funciona e converte.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA BARBEARIAS focado em experiência mobile-first para o público masculino.</h3>
                                <p className="mt-2 text-left text-slate-600">Ofereça a melhor jornada de agendamento mobile do setor de barbearias nacional, com um sistema que carrega instantaneamente e funciona com perfeição em qualquer celular. O Kairós foi desenhado para ser visualmente limpo e tecnicamente impecável no smartphone, local onde ocorre a imensa maioria das buscas por serviços de barba e cabelo atualmente. Proporcionar uma experiência de uso fluida e sem erros é um diferencial que eleva a percepção de valor do seu serviço e fideliza clientes exigentes. Coloque sua barbearia no topo da tecnologia com uma plataforma pensada para o futuro da beleza masculina.</p>
                            </div>

                            <div>
    <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA BARBEARIAS para eliminar definitivamente o vaivém de mensagens no WhatsApp.</h3>
    <p className="mt-2 text-left text-slate-600">Recupere horas valiosas do seu dia e acabe com as interrupções constantes para responder "você tem horário livre para hoje?". Ao centralizar suas reservas no Kairós, você permite que o cliente veja sua disponibilidade em tempo real e agende sozinho, sem que você precise parar o corte para digitar mensagens. Isso garante um ambiente de trabalho muito mais focado e produtivo para você e para os outros barbeiros do estúdio. Deixe que nossa automação gerencie sua agenda 24 horas por dia, garantindo que sua barbearia nunca pare de vender horários, mesmo enquanto você dorme.</p>
</div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA BARBEARIAS com controle financeiro simplificado e relatórios de metas.</h3>
                                <p className="mt-2 text-left text-slate-600">Tenha uma visão transparente do crescimento do seu negócio através de relatórios automáticos que demonstram o desempenho financeiro da sua barbearia mês a mês. O Kairós facilita a análise do seu lucro líquido, permitindo identificar oportunidades de investimento em novos produtos ou reformas na loja com total segurança. Abandone o amadorismo da falta de dados e tenha o controle total do seu fluxo de caixa em poucos cliques. Mantenha sua gestão financeira organizada e segura, facilitando a tomada de decisões estratégicas para que sua barbearia se torne uma referência de sucesso no mercado.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA BARBEARIAS para modernizar e liderar o mercado de barbearias de elite.</h3>
                                <p className="mt-2 text-left text-slate-600">Posicione sua barbearia como a maior referência em tecnologia e organização da sua região e conquiste a confiança dos clientes que buscam exclusividade e agilidade. Utilizar um sistema de gestão de elite como o Kairós é um sinal claro de que sua marca valoriza a inovação e o tempo do cliente em todos os níveis do atendimento. Saia definitivamente do modelo de gestão tradicional e obsoleto e insira sua empresa na era da automação digital inteligente e altamente lucrativa. Seja o líder incontestável do mercado de barbearias e veja sua autoridade ser acompanhada por uma gestão profissional impecável.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/25 text-center text-sm md:text-base leading-snug">
                                Quero modernizar minha barbearia agora
                            </Link>
                        </div>
                    </div>
                </details>
            </div>
        </section>

        {/* --- FOOTER (ATUALIZADO) --- */}
        <footer className="bg-white/80 backdrop-blur-xl pt-10 pb-6 border-t border-slate-200/80 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* CABEÇALHO DO RODAPÉ - LOGOS */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-8 pb-6 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo Kairós" className="w-10 h-10 object-contain" />
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase leading-none">Kairós</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Sua agenda inteligente</span>
                    </div>
                </div>
                <div className="hidden md:block w-[1px] h-6 bg-slate-200 mx-4"></div>
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1">Uma solução do grupo</span>
                    <Link href="https://egemporiodigital.com.br" target="_blank" className="text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors">
                        EG EMPÓRIO DIGITAL
                    </Link>
                </div>
            </div>

            {/* GRID DE CONTEÚDO (ESTILO TRINKS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                
                {/* COLUNA 1 - INSTITUCIONAL */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Institucional</h4>
                    <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
                        <li><Link href="https://egemporiodigital.com.br/sobre" target="_blank" className="hover:text-blue-600 transition-colors">Sobre a EG Empório Digital</Link></li>
                        <li><Link href="https://egemporiodigital.com.br/servicos" target="_blank" className="hover:text-blue-600 transition-colors">Nossos Serviços</Link></li>
                        <li><Link href="https://egemporiodigital.com.br/saas" target="_blank" className="hover:text-blue-600 transition-colors">Outras Automações</Link></li>
                        <li><Link href="#" className="hover:text-blue-600 transition-colors">Política de Privacidade</Link></li>
                    </ul>
                </div>

                {/* COLUNA 2 - HUB DE SOLUÇÕES */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Conheça</h4>
                    <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
                        <li><Link href="/sistema-de-gestao-para-barbearias" className="hover:text-blue-600 transition-colors text-slate-900 font-bold tracking-tight">💈 Gestão de Barbearias</Link></li>
                        <li><span className="opacity-40 text-slate-400 italic">💅 Gestão de Salões (Em breve)</span></li>
                        <li><span className="opacity-40 text-slate-400 italic">🏥 Gestão de Clínicas (Em breve)</span></li>
                        <li><span className="opacity-40 text-slate-400 italic">🐉 Gestão de Studios (Em breve)</span></li>
                    </ul>
                </div>

                {/* COLUNA 3 - COMERCIAL E REDES */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Comercial</h4>
                    <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium mb-2">
                        <li><Link href="/cadastro" className="hover:text-blue-700 transition-colors font-bold text-blue-600">Teste Grátis</Link></li>
                        <li><Link href="#planos" className="hover:text-blue-600 transition-colors">Planos e Preços</Link></li>
                    </ul>
                    
                    <h4 className="text-blue-600 font-black uppercase text-[10px] tracking-widest">Siga-nos</h4>
                    <div className="flex justify-center md:justify-start">
                        <Link href="https://instagram.com/eg.emporio.digital" target="_blank" className="w-8 h-8 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group shadow-sm">
                            <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* COLUNA 4 - APP / STATUS */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Tecnologia</h4>
                    <div className="bg-white/80 border border-slate-200/80 p-3 rounded-xl shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Sistema</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-slate-900">Kairós</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RODAPÉ FINAL - COPYRIGHT */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    © EG EMPÓRIO DIGITAL
                </p>
            </div>

          </div>
        </footer>

        </main>

        {/* --- BOTÃO WHATSAPP (IDÊNTICO À HOME) --- */}
      <a 
        href="https://wa.me/5511916053292" 
        target="_blank" 
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl shadow-green-900/30 z-50 transition-all hover:-translate-y-1 flex items-center gap-2 border border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z"/>
        </svg>
        <span className="font-bold text-sm hidden md:block">Suporte</span>
      </a>
    </div>
)
}