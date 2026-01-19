import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO OTIMIZADO) ---
export const metadata: Metadata = {
  title: "Kairós | Sistema de Agendamento Online e Gestão",
  description: "Organize sua agenda automaticamente. Sistema ideal para Barbearias, Salões, Restaurantes, Clínicas e Fotógrafos. Teste grátis.",
  keywords: ["agendamento online", "sistema para barbearia", "agenda salão de beleza", "software de gestão", "kairós", "agendamento whatsapp"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Kairós - Sua Agenda Inteligente",
    description: "Pare de perder tempo no WhatsApp. Deixe seu cliente agendar sozinho.",
    images: ["/logo.png"],
  },
}

// --- SCHEMA MARKUP ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kairós",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "Teste Grátis de 3 dias sem cartão"
  }
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

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      
      {/* --- ESTILOS GLOBAIS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* AJUSTE VELOCIDADE TEXTO: 10s (Muito rápido) */
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        /* AJUSTE VELOCIDADE IMAGENS: 60s (Fluido) */
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
      `}} />

      {/* --- INJEÇÃO DO SCHEMA SEO --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- BACKGROUND FIXO --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] opacity-60">
            <img src="/logo-fundo.png" alt="" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[3px]"></div> 
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/5 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center">
                <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">Kairós</span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide">sua agenda inteligente</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/login" className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors block">
              Entrar
            </Link>
            <Link href="/cadastro" className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm md:font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 font-bold border border-blue-500/20">
              Teste Grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10">

        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-12 px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10 shadow-inner">
              <span>🚀</span>
              <span>O sistema de agendamento Nº 1 do mercado</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white drop-shadow-2xl">
              Sua agenda cheia. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
                Sua vida tranquila.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Agendamento em 1 minuto. Seu cliente escolhe o profissional, o serviço e o horário. Simples e sem cadastro chato.
            </p>

            {/* CARD DE VIDRO */}
            <div className="max-w-3xl mx-auto mt-6 p-[1px] rounded-2xl bg-gradient-to-r from-transparent via-blue-500/20 to-transparent">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center shadow-2xl">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      O <strong>Kairós</strong> é a solução definitiva de <strong>agendamento online</strong>. 
                      Automatize sua agenda, elimine o "vaivém" de mensagens no WhatsApp e tenha um 
                      link profissional personalizado para o seu negócio.
                  </p>
              </div>
            </div>

            {/* MARQUEE (TEXTO - VELOCIDADE 10s) */}
            <div className="w-full overflow-hidden py-8 border-y border-white/5 bg-black/20 backdrop-blur-sm mt-8 hover-pause">
              <div className="flex w-[200%] animate-scroll">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-8 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">💈 Barbearia</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">💅 Salão de Beleza</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">🍽️ Restaurantes</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">🏥 Clínica / Saúde</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">🐉 Tattoo Studio</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">📸 Fotografia</div>
                    <div className="flex items-center gap-2 text-gray-300 font-bold text-lg px-6 py-2">💼 Serviços</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/cadastro" className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Começar Agora 🚀
              </Link>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Teste grátis de 3 dias • Cancele quando quiser</p>
          </div>
        </section>

        {/* --- COMO FUNCIONA --- */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Simples como deve ser.</h2>
              <p className="text-gray-400">Tudo automático, 24 horas por dia.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                <span className="relative text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">👤</span>
                <h3 className="relative text-xl font-bold mb-2 text-white">1. Escolhe o Profissional</h3>
                <p className="relative text-gray-400 text-sm">Escolha o especialista de sua preferência.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                <span className="relative text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">📋</span>
                <h3 className="relative text-xl font-bold mb-2 text-white">2. Escolhe o Serviço</h3>
                <p className="relative text-gray-400 text-sm">Lista de serviços personalizada para aquele profissional escolhido.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                <span className="relative text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">📅</span>
                <h3 className="relative text-xl font-bold mb-2 text-white">3. Data e Hora</h3>
                <p className="relative text-gray-400 text-sm">Visualização clara dos horários livres reais, sem conflitos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CARROSSEL DE MOCKUPS (CORRIGIDO PARA MOBILE) --- */}
        <section className="py-24 bg-gradient-to-b from-black/20 to-zinc-900/40 border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-white">Seu sistema, sua cara.</h2>
                    <p className="text-gray-400">Personalize para o seu nicho.</p>
                </div>

                <div className="w-full overflow-hidden hover-pause">
                    <div className="flex w-max animate-scroll-slow gap-6 px-4">
                        {[...themes, ...themes].map((theme, index) => (
                            // AJUSTE CRÍTICO: Removi w-full e usei dimensões fixas com flex-shrink-0
                            // Mobile: largura 200px. PC: largura 300px.
                            <div key={index} className="flex-shrink-0 flex flex-col items-center group w-[200px] md:w-[300px]">
                                {/* MOLDURA: Aspect Ratio 9/19 (Vertical) para não cortar */}
                                <div className="relative bg-zinc-900 rounded-[2rem] md:rounded-[2.5rem] border-[4px] md:border-[8px] border-zinc-800 overflow-hidden shadow-2xl w-full aspect-[9/19] transition-transform duration-300 group-hover:scale-[1.02]">
                                     <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative">
                                        <img src={theme.img} alt={theme.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all" />
                                     </div>
                                </div>
                                <p className="text-center mt-6 font-bold text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm md:text-base">{theme.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* --- PREÇOS --- */}
        <section className="py-24 px-6 relative bg-black/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Planos que crescem com você</h2>
              <p className="text-gray-400">Comece pequeno, termine gigante.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* SOLO */}
              <div className="border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl p-8 hover:border-white/20 transition-all hover:-translate-y-1">
                <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">Solo</h3>
                <div className="text-4xl font-black mb-4 text-white">R$ 49,90<span className="text-lg text-gray-500 font-medium">/mês</span></div>
                <p className="text-sm text-gray-400 mb-8 border-b border-white/10 pb-8">Ideal para autônomos que querem organização.</p>
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  <li className="flex gap-2">✅ 1 Profissional</li>
                  <li className="flex gap-2">✅ Agendamentos Ilimitados</li>
                </ul>
                <Link href="/cadastro" className="block w-full py-3 rounded-xl border border-white text-white font-bold text-center hover:bg-white hover:text-black transition-all">
                  Testar Grátis
                </Link>
              </div>

              {/* PRO */}
              <div className="border border-blue-600 bg-black/60 backdrop-blur-xl rounded-3xl p-8 relative shadow-2xl shadow-blue-900/20 transform md:-translate-y-4 hover:shadow-blue-600/30 transition-all">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-widest">Recomendado</div>
                <h3 className="font-bold text-blue-400 uppercase tracking-widest text-sm mb-2">Pró</h3>
                <div className="text-4xl font-black mb-4 text-white">R$ 119,90<span className="text-lg text-gray-500 font-medium">/mês</span></div>
                <p className="text-sm text-gray-400 mb-8 border-b border-zinc-700 pb-8">Para negócios com equipe em crescimento.</p>
                <ul className="space-y-3 mb-8 text-sm text-white">
                  <li className="flex gap-2">🚀 Até 5 Profissionais</li>
                  <li className="flex gap-2">✅ agenda separada por profissional</li>
                  <li className="flex gap-2">✅ Dashboard Financeiro</li>
                  <li className="flex gap-2">✅ Tudo do plano Solo</li>
                </ul>
                <Link href="/cadastro" className="block w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 transition-all hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
                  Testar Grátis Agora
                </Link>
              </div>

              {/* ILIMITADO */}
              <div className="border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl p-8 hover:border-white/20 transition-all hover:-translate-y-1">
                <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">Ilimitado</h3>
                <div className="text-4xl font-black mb-4 text-white">R$ 229,90<span className="text-lg text-gray-500 font-medium">/mês</span></div>
                <p className="text-sm text-gray-400 mb-8 border-b border-white/10 pb-8">Para grandes redes e franquias. Sem limites.</p>
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  <li className="flex gap-2">🔥 Profissionais Ilimitados</li>
                  <li className="flex gap-2">✅ Tudo do plano Pró</li>
                  <li className="flex gap-2">✅ Suporte Prioritário</li>
                  <li className="flex gap-2">✅ Gestão Completa</li>
                </ul>
                <Link href="/cadastro" className="block w-full py-3 rounded-xl border border-white text-white font-bold text-center hover:bg-white hover:text-black transition-all">
                  Testar Grátis
                </Link>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-8">* Valores referentes ao plano mensal.</p>
          </div>
        </section>

        {/* --- DICAS --- */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Onde divulgar seu link?</h2>
              <p className="text-gray-400">Três lugares estratégicos para encher sua agenda sem esforço.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 text-center hover:border-pink-500 transition-all group hover:-translate-y-2">
                <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">🔗</div>
                <h3 className="text-xl font-bold text-white mb-2">Link na Bio (Instagram)</h3>
                <p className="text-sm text-gray-400">Coloque seu link Kairós na Bio do Instagram ou TikTok. Seu cliente entra no perfil e agenda sozinho.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 text-center hover:border-green-500 transition-all group hover:-translate-y-2">
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">💬</div>
                <h3 className="text-xl font-bold text-white mb-2">Resposta Automática</h3>
                <p className="text-sm text-gray-400">No WhatsApp Business, crie uma saudação automática: "Olá! Para agendar, clique aqui: [Seu Link]".</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 text-center hover:border-blue-500 transition-all group hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">📍</div>
                <h3 className="text-xl font-bold text-white mb-2">Botão do Google</h3>
                <p className="text-sm text-gray-400">Tem ficha no Google Maps? Adicione seu link no botão "Agendar". Apareça para quem busca na sua região.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">Dúvidas Frequentes</h2>
            <div className="space-y-4">
                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">
                        Para qual tipo de negócio o sistema serve?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2">
                        O Kairós é versátil e atende diversos nichos. É perfeito para: Barbearias, Salões de Beleza, Restaurantes, Clínicas, Tattoo, Studio de Fotografia e Profissionais Liberais.
                    </div>
                </details>

                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">
                        Consigo usar no celular?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2">
                        Sim! O Kairós é 100% online e responsivo. Funciona perfeitamente no navegador do seu celular (Android ou iPhone), tablet ou computador.
                    </div>
                </details>

                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">
                        Preciso cadastrar cartão para testar?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2">
                        Não! O teste de 3 dias é totalmente livre. Você só escolhe um plano se gostar do sistema.
                    </div>
                </details>
            </div>
        </section>

        {/* --- VÍDEO TUTORIAL (PWA) --- */}
        <section className="py-24 bg-gradient-to-t from-black to-zinc-950/20 border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="inline-block bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-500/20 mb-6">
                    Dica Bônus
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tenha o Kairós como App no seu celular</h2>
                <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                    Não precisa baixar nada na loja de aplicativos. Veja como adicionar o ícone na sua tela inicial em menos de 10 segundos.
                </p>

                {/* Container do Vídeo (VERTICAL 9:16) */}
                <div className="relative rounded-[2.5rem] overflow-hidden border-[8px] border-zinc-800 shadow-2xl bg-black aspect-[9/19] max-w-[320px] mx-auto group">
                    <video 
                      src="/video-tutorial.mp4" 
                      controls 
                      className="w-full h-full object-cover" 
                      playsInline
                    >
                      Seu navegador não suporta o player de vídeo.
                    </video>
                </div>
            </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-black/60 backdrop-blur-xl py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-6 h-6 relative">
                  <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full grayscale" />
              </div>
              <span className="font-bold text-gray-400">Kairós</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 Kairós - Sistema de Agendamento Online.
            </div>
          </div>
        </footer>

      </main>

      {/* --- BOTÃO WHATSAPP --- */}
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