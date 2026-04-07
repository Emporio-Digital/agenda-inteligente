import Link from "next/link"

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

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      
      {/* --- ESTILOS GLOBAIS --- */}
      <style dangerouslySetInnerHTML={{__html: `
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
            <div className="w-14 h-14 md:w-16 md:h-16 relative flex items-center justify-center">
                <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">Kairós</span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide">sua agenda inteligente</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/login" className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-all uppercase tracking-widest whitespace-nowrap shadow-lg">
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

        {/* --- COMO FUNCIONA (AJUSTADO PARA PADRÃO SEO) --- */}
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Simples como deve ser
                    </h2>
                    <p className="text-gray-400 text-sm md:text-lg font-medium tracking-wide">
                        Tudo automático, 24 horas por dia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <section className="py-24 bg-gradient-to-b from-black/20 to-zinc-900/40 border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-white">Seu sistema, sua cara.</h2>
                    <p className="text-gray-400">Personalize para o seu nicho.</p>
                </div>

                <div className="w-full overflow-hidden hover-pause">
                    <div className="flex w-max animate-scroll-slow gap-6 px-4">
                        {[...themes, ...themes].map((theme, index) => (
                            <div key={index} className="flex-shrink-0 flex flex-col items-center group w-[200px] md:w-[300px]">
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
                  <li className="flex gap-2">✅ Agendamentos Ilimitados</li>
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
                  <li className="flex gap-2">✅ Suporte Prioritário</li>
                  <li className="flex gap-2">✅ Gestão Completa</li>
                  <li className="flex gap-2">✅ Agendamentos Ilimitados</li>
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

        {/* --- DOSSIÊ DE PILARES (NOVIDADE NA HOME) --- */}
        <section className="py-24 px-6 relative z-20">
            <div className="max-w-6xl mx-auto">
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-blue-500/10 text-blue-400 p-2.5 rounded-md border border-blue-500/20 shrink-0 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Tese de Autoridade: Kairós Gestão Inteligente</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">Clique para ver os 15 pilares de gestão para seu nicho</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA BARBEARIAS com link personalizado, logo e capa exclusivos.</h3>
                                <p className="mt-2 text-left">Crie uma vitrine digital de alto padrão que carrega a identidade visual completa da sua marca em um link de agendamento profissional. Esse posicionamento economiza horas de atendimento manual ao apresentar seus serviços de forma automática para o seu público local. Enquanto outros sistemas são genéricos, o Kairós destaca sua marca com elegância e exclusividade para atrair clientes de alto valor. Garanta que a primeira impressão do seu negócio seja a de uma empresa organizada, tecnológica e pronta para liderar o mercado.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com agendas individuais para cada profissional.</h3>
                                <p className="mt-2 text-left">Organize seu time de especialistas com calendários independentes que eliminam qualquer risco de confusão ou sobreposição de horários na sua recepção. O benefício prático é a economia de tempo real que seria perdido confirmando a disponibilidade de cada colaborador manualmente por telefone ou mensagem. No Kairós, cada profissional tem sua grade sincronizada em tempo real, permitindo uma gestão de equipe fluida e extremamente eficiente. Mantenha a ordem absoluta na sua operação e aumente a produtividade do seu salão com um controle de agenda moderno e intuitivo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA CLÍNICAS com personalização máxima de serviços, valores e tempos.</h3>
                                <p className="mt-2 text-left">Adapte seu cardápio de procedimentos com precisão total, definindo preços e tempos de execução exatos para cada tipo de consulta ou tratamento. O controle total da sua margem de lucro permite gerenciar o fluxo de caixa com a segurança que uma clínica profissional exige no dia a dia. O Kairós oferece flexibilidade total para reajustar valores e durações instantaneamente, sem precisar enfrentar burocracias técnicas ou chamados de suporte demorados. Domine sua estratégia comercial oferecendo uma jornada de agendamento que reflete com exatidão a realidade operacional do seu negócio.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA ESTÚDIOS DE TATTOO sem necessidade de cadastro, login ou download.</h3>
                                <p className="mt-2 text-left">O maior diferencial competitivo para o seu estúdio é a velocidade absoluta no acesso ao agendamento sem nenhuma barreira técnica chata. Sabemos que seus clientes não querem perder tempo criando contas, memorizando senhas ou baixando aplicativos pesados só para marcar uma sessão. Com o Kairós, o cliente acessa seu link, escolhe o tatuador e finaliza o processo em segundos, sem burocracia alguma pelo próprio navegador. Essa facilidade extrema garante uma taxa de conversão muito maior, assegurando que sua agenda esteja sempre preenchida com praticidade.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA ESMALTERIAS com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left">Proporcione às suas clientes a agilidade que a rotina moderna exige, permitindo que o agendamento seja concluído em menos de 60 segundos de forma intuitiva. Esse ganho de eficiência libera sua recepção para focar no atendimento presencial de qualidade, enquanto o sistema trabalha no piloto automático 24 horas. Enquanto outras plataformas pedem formulários longos, o Kairós foca em apenas três cliques certeiros para garantir a reserva do serviço desejado. Destaque seu negócio como o mais veloz e eficiente da região, conquistando a fidelidade do público que valoriza o próprio tempo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com agenda inteligente que evita conflitos.</h3>
                                <p className="mt-2 text-left">Acabe definitivamente com o erro humano de agendar dois procedimentos no mesmo horário com nossa tecnologia de trava automática inteligente. O benefício direto é a eliminação de situações constrangedoras de atrasos ou remarcações por falhas de agenda manual em papel ou planilhas. O Kairós atualiza a disponibilidade no exato milissegundo em que o agendamento é realizado, garantindo uma segurança operacional absoluta para o dono do negócio. Mantenha a reputação da sua clínica impecável e evite qualquer perda de faturamento por falhas operacionais básicas de organização.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com fotos reais da equipe no agendamento.</h3>
                                <p className="mt-2 text-left">Humanize a experiência digital do seu estúdio permitindo que o cliente escolha o profissional através da visualização de sua foto real no ato do agendamento. Isso gera uma conexão imediata de confiança e profissionalismo, transmitindo autoridade antes mesmo do cliente chegar ao local para o ensaio. O Kairós valoriza o marketing pessoal do seu time, sendo muito mais atrativo do que sistemas genéricos que usam apenas nomes ou ícones frios. Fortaleça a marca visual do seu negócio e conquiste os clientes mais exigentes através de uma interface de agendamento moderna e transparente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA BARBEARIAS com dashboard intuitivo para uso dos funcionários.</h3>
                                <p className="mt-2 text-left">Simplifique a rotina diária do seu time com um painel de controle que dispensa treinamentos longos ou manuais técnicos complexos para ser operado. Seus barbeiros visualizam a agenda do dia com clareza absoluta, otimizando o fluxo de trabalho e os intervalos entre um atendimento e outro. O Kairós foca na usabilidade prática, removendo menus desnecessários que apenas poluem e confundem o uso em softwares tradicionais de gestão de mercado. Garanta que sua operação seja fluida e que sua equipe foque 100% na técnica e no excelente atendimento ao cliente final.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2 text-left">Tenha o controle total do seu faturamento e da agenda do seu salão na palma da mão, acessando o sistema com apenas um toque rápido. Economize tempo precioso abrindo a gestão instantaneamente, sem a necessidade de buscar links em conversas de WhatsApp ou favoritos do seu navegador. O Kairós opera como um Web App extremamente leve e veloz, garantindo que você monitore o movimento do seu negócio de onde estiver em tempo real. Esteja sempre no comando da sua operação com a tecnologia que acompanha o ritmo acelerado de um empreendedor de sucesso atual.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full"></span> 10. SISTEMA DE GESTÃO PARA CLÍNICAS com histórico detalhado de cada serviço realizado.</h3>
                                <p className="mt-2 text-left">Entenda com precisão quais procedimentos são os motores do seu faturamento e quais pacientes são os mais fiéis à sua clínica de saúde ou estética. O benefício estratégico é poder planejar promoções e novos investimentos baseados em dados reais de produtividade, e não em meras suposições vagas. Enquanto softwares antigos dificultam o acesso aos dados, o Kairós entrega relatórios detalhados de cada atendimento realizado na sua unidade de forma simples. Tome decisões inteligentes para o crescimento do seu negócio utilizando informações financeiras seguras e extremamente organizadas no painel.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com confirmação de agenda via WhatsApp em um clique.</h3>
                                <p className="mt-2 text-left">Reduza drasticamente o número de faltas enviando lembretes profissionais de agendamento de forma rápida e eficiente diretamente para o WhatsApp do cliente. Essa funcionalidade diminui o No-Show em até 40%, protegendo o seu lucro diário contra esquecimentos de clientes que possuem rotinas agitadas. O Kairós simplifica o processo operacional: você clica no ícone e a mensagem de confirmação já sai formatada para o contato do seu cliente em segundos. Profissionalize sua comunicação e garanta que sua agenda de tatuagens esteja sempre confirmada e altamente lucrativa todos os dias.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA ESMALTERIAS focado em experiência Mobile-First de alta velocidade.</h3>
                                <p className="mt-2 text-left">Otimizamos cada detalhe do sistema para que sua cliente tenha uma experiência perfeita realizando o agendamento através do próprio smartphone com rapidez. O benefício é uma interface que carrega instantaneamente, mesmo em conexões de internet móvel oscilantes ou redes 4G saturadas em áreas comerciais densas. Diferente de plataformas desenhadas apenas para computadores, o Kairós foi pensado primeiro para o celular do cliente, onde a maioria das reservas ocorre. Ofereça a melhor jornada tecnológica de agendamento do seu nicho e fidelize o público que busca modernidade e facilidade total.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left">Recupere horas valiosas do seu dia automatizando a marcação de horários e acabe com as interrupções constantes para responder disponibilidade de agenda. Centralizar as reservas no link inteligente do Kairós permite que você e sua equipe foquem no que realmente traz retorno: o atendimento impecável na sala. Nosso sistema é a solução definitiva contra a burocracia de áudios e textos manuais intermináveis que travam a produtividade da sua equipe em horários de pico. Recupere sua paz mental e deixe que a tecnologia gerencie suas reservas 24 horas por dia, 7 dias por semana, sem falhas.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com relatórios financeiros de controle total.</h3>
                                <p className="mt-2 text-left">Tenha uma visão transparente do fluxo de caixa do seu estúdio com filtros financeiros que demonstram o crescimento real do seu faturamento mês a mês. Controle entradas e analise a performance de cada serviço oferecido sem a necessidade de planilhas de Excel complicadas ou anotações confusas em papel. O diferencial do Kairós é traduzir números frios em informações estratégicas simples para o dono, facilitando o planejamento de novos investimentos em equipamentos. Mantenha as finanças do seu negócio fotográfico sob controle absoluto com relatórios intuitivos, seguros e extremamente rápidos de acessar.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA SERVIÇOS EM GERAL para modernizar e profissionalizar o seu negócio.</h3>
                                <p className="mt-2 text-left">Posicione sua marca como a maior referência tecnológica do seu setor e conquiste os clientes que buscam modernidade, exclusividade e rapidez no atendimento. O ganho de autoridade local é instantâneo quando o público percebe que você utiliza um sistema de gestão de elite para organizar sua prestação de serviço. O Kairós remove definitivamente o amadorismo das anotações manuais e insere sua empresa na era da automação digital completa, eficiente e profissional. Seja o líder incontestável do mercado no seu nicho de atuação e veja sua base de clientes crescer com a força da nossa tecnologia inteligente.</p>
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

{/* --- SEÇÃO DE DEPOIMENTOS (PROVA SOCIAL) --- */}
        <section className="py-24 px-6 bg-black/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-tight">
                  Quem já usa e <span className="text-blue-500">aprova:</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide">
                  Junte-se a centenas de negócios que automatizaram a agenda.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-yellow-400 font-black shadow-xl">
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
            <h2 className="text-2xl font-bold text-center mb-8 text-white">Dúvidas Frequentes</h2>
            <div className="space-y-4">
                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">
                        Para qual tipo de negócio o sistema serve?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2 text-left">
                        O Kairós é versátil e atende diversos nichos. É perfeito para: Barbearias, Salões de Beleza, Restaurantes, Clínicas, Tattoo, Studio de Fotografia e Profissionais Liberais.
                    </div>
                </details>

                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">
                        Consigo usar no celular?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2 text-left">
                        Sim! O Kairós é 100% online e responsivo. Funciona perfeitamente no navegador do seu celular (Android ou iPhone), tablet ou computador.
                    </div>
                </details>

                <details className="group bg-white/5 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <summary className="flex justify-between items-center p-4 font-medium text-gray-300 hover:text-white transition-colors">
                        Preciso cadastrar cartão para testar?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 border-t border-white/5 pt-2 text-left">
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
                    <iframe 
                      src="https://www.youtube.com/embed/qPyu76KGlmw" 
                      title="Tutorial Kairós"
                      className="w-full h-full" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>

        {/* --- FOOTER (ATUALIZADO COM LINK DO HUB) --- */}
        <footer className="bg-black/60 backdrop-blur-xl py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-90">
              <div className="w-6 h-6 relative">
                  <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full grayscale" />
              </div>
              <span className="font-bold text-gray-200">Kairós</span>
            </div>

            {/* LINK PARA O HUB REGIONAL */}
            <Link href="/sistema-de-gestao-para-barbearias" className="text-xs font-bold text-blue-500/60 hover:text-blue-400 transition-colors flex items-center gap-2 uppercase tracking-widest">
              <span className="text-lg">📍</span>
            </Link>

            <div className="text-sm text-gray-600">
              © Kairós - Sistema de Agendamento Online.
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