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
  { name: "Felipe R.", location: "Morumbi", img: "https://i.pravatar.cc/150?u=41", text: "O Kairós organizou minha vida. O pessoal agenda sozinho pelo link e eu foco no atendimento." },
  { name: "Lya M.", location: "São Gonçalo", img: "https://i.pravatar.cc/150?u=42", text: "Meus clientes adoraram. Não precisa de app nem login, é o sistema mais rápido que já testei." },
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
                                1. Serviços e Agendas <br /> Individuais
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed font-medium">
                                Cada profissional tem sua própria agenda com serviços, preços e tempos de execução diferentes. Organize seu time com liberdade total e zero conflitos.
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

        {/* --- SEÇÃO DE PILARES SEO (ESTRATÉGIA NACIONAL) --- */}
        <section className="py-24 px-6 relative z-20">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* NICHO 1: BARBEARIAS */}
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-blue-500/10 text-blue-400 p-2.5 rounded-md border border-blue-500/20 shrink-0 flex items-center justify-center">
                                💈
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Sistema de Gestão para Barbearias</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">Autoridade máxima em agendamento para barbeiros</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA BARBEARIAS com link personalizado, logo e capa exclusivos.</h3>
                                <p className="mt-2 text-left text-gray-400">Eleve o nível profissional da sua marca com uma vitrine digital de alto padrão que centraliza todos os seus atendimentos em um único lugar. O diferencial estratégico do Kairós é permitir que sua identidade visual seja a protagonista, gerando confiança imediata no momento da reserva. Enquanto outros sistemas oferecem páginas genéricas e frias, nós entregamos uma experiência imersiva que valoriza cada detalhe do seu negócio. Garanta que seu link de agendamento seja a ferramenta de conversão mais potente da sua barbearia hoje.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA BARBEARIAS com agendas individuais para cada profissional da equipe.</h3>
                                <p className="mt-2 text-left text-gray-400">Gerencie seu time de barbeiros com calendários independentes que eliminam qualquer risco de sobreposição de horários ou confusão na recepção. Cada colaborador possui sua própria grade de horários, permitindo uma organização fluida que respeita o tempo de execução de cada serviço específico. Essa autonomia profissional aumenta a produtividade da equipe e garante que o fluxo de clientes na barbearia seja constante e organizado. Domine a gestão operacional do seu negócio com uma tecnologia que entende a dinâmica real de uma barbearia de sucesso.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA BARBEARIAS com personalização máxima de serviços, valores e tempos.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha controle total sobre o seu cardápio de serviços, ajustando preços e durações de acordo com a especialidade de cada barbeiro da sua unidade. A flexibilidade do Kairós permite que você configure combos, barboterapia ou cortes técnicos com precisão absoluta para o seu público-alvo. Essa personalização detalhada reflete a realidade do seu faturamento e evita buracos ociosos na sua agenda durante o expediente. Profissionalize sua precificação e ofereça uma jornada de escolha clara e direta para todos os seus clientes fidelizados.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA BARBEARIAS sem necessidade de cadastro, login ou download para o cliente.</h3>
                                <p className="mt-2 text-left text-gray-400">Remova todas as barreiras tecnológicas que impedem o seu cliente de agendar um horário rápido no sábado de manhã. Sabemos que ninguém deseja baixar aplicativos pesados ou preencher formulários extensos apenas para marcar um corte de cabelo ou barba. Com o Kairós, o agendamento é feito diretamente pelo navegador em poucos segundos, garantindo a maior taxa de conversão do mercado nacional. Simplifique a vida do seu cliente e veja sua agenda lotar com a facilidade que só o nosso sistema proporciona.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA BARBEARIAS com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-gray-400">Proporcione a agilidade que o homem moderno exige através de uma interface desenhada para ser concluída com apenas três toques na tela. A velocidade de agendamento do Kairós é um diferencial competitivo que coloca sua barbearia à frente de qualquer concorrente que ainda usa métodos manuais. Menos tempo perdido no processo de marcação significa mais clientes satisfeitos e uma recepção muito mais livre para focar no atendimento. Transforme a tecnologia em sua maior aliada para manter a rotina da sua barbearia sempre produtiva e eficiente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA BARBEARIAS com agenda inteligente que evita conflitos de horários.</h3>
                                <p className="mt-2 text-left text-gray-400">Elimine definitivamente o erro humano de agendar dois clientes no mesmo horário para o mesmo barbeiro através da nossa trava automática. Nosso algoritmo processa a disponibilidade em tempo real, garantindo que cada reserva seja única e segura para a operação do seu negócio. Isso evita situações constrangedoras de atrasos na bancada e preserva a reputação profissional da sua barbearia perante o público mais exigente. Tenha a paz mental de saber que sua organização digital é impecável e blindada contra falhas operacionais básicas.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA BARBEARIAS com fotos reais de cada barbeiro no momento do agendamento.</h3>
                                <p className="mt-2 text-left text-gray-400">Humanize sua marca digital permitindo que o cliente escolha o profissional através da visualização da foto real de cada barbeiro. Esse detalhe visual gera uma conexão imediata e transmite uma autoridade que ícones genéricos jamais conseguiriam alcançar no meio digital. O Kairós valoriza o marketing pessoal da sua equipe, tornando o processo de escolha muito mais intuitivo e profissional para o cliente final. Fortaleça a imagem da sua barbearia como um local que valoriza as pessoas e a excelência no atendimento técnico.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA BARBEARIAS com dashboard simples e intuitivo para o uso dos funcionários.</h3>
                                <p className="mt-2 text-left text-gray-400">Entregue uma ferramenta de trabalho que seus barbeiros vão amar utilizar todos os dias, sem a necessidade de treinamentos complexos. Nosso painel de controle foi desenhado para ser operado com facilidade por qualquer pessoa, focando no que realmente importa: a visualização da agenda. A usabilidade prática do Kairós reduz a resistência da equipe à tecnologia e garante que todos os dados de atendimento sejam registrados corretamente. Simplifique a gestão operacional da sua barbearia e foque 100% na qualidade do corte e na experiência do cliente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA BARBEARIAS com atalho de acesso rápido na tela inicial do celular do dono.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha o controle total da sua barbearia na palma da mão, acessando métricas e agendas com apenas um toque rápido como se fosse um app. Nossa tecnologia Web App permite que você monitore o movimento da sua loja de onde estiver, garantindo uma gestão em tempo real e sem burocracia. Economize tempo precioso e elimine a necessidade de buscar links em conversas antigas de WhatsApp para saber como está o seu faturamento. Esteja sempre um passo à frente com a mobilidade e a rapidez que o empreendedorismo moderno exige de você.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA BARBEARIAS com gestão completa de serviços realizados e histórico detalhado.</h3>
                                <p className="mt-2 text-left text-gray-400">Entenda o comportamento de consumo dos seus clientes e descubra quais são os barbeiros mais produtivos da sua equipe através de dados reais. O histórico detalhado do Kairós permite que você planeje ações de fidelização e promoções baseadas em fatos, e não em simples "achismos" de mercado. Ter o controle sobre quem são seus melhores clientes é o segredo para manter uma barbearia lucrativa e em constante crescimento sustentável. Transforme informações em poder estratégico e lidere o mercado de barbearias com uma visão de dados profissional e segura.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA BARBEARIAS com confirmação de agendamento via WhatsApp em apenas um clique.</h3>
                                <p className="mt-2 text-left text-gray-400">Reduza drasticamente o número de faltas e o terrível "no-show" enviando lembretes profissionais de forma rápida para o celular do cliente. Nossa funcionalidade de confirmação via WhatsApp simplifica a comunicação da barbearia, economizando horas que seriam perdidas digitando mensagens manuais. Com apenas um clique, o cliente recebe todos os dados do agendamento, o que aumenta a taxa de presença em até 40% no dia a dia. Proteja seu faturamento diário e mantenha sua cadeira sempre ocupada com um fluxo de clientes confirmado e altamente profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA BARBEARIAS focado em experiência Mobile-First para clientes exigentes.</h3>
                                <p className="mt-2 text-left text-gray-400">Ofereça a melhor experiência de agendamento mobile do mercado nacional, garantindo que seu sistema carregue instantaneamente em qualquer smartphone. O Kairós foi projetado para rodar com perfeição mesmo em conexões de internet mais lentas, assegurando que o cliente não desista do agendamento por lentidão. Em um mercado onde a maioria das reservas é feita via celular, ter uma interface otimizada para dispositivos móveis é uma obrigação de todo barbeiro profissional. Coloque sua barbearia no topo da tecnologia e fidelize o público que valoriza rapidez, modernidade e facilidade absoluta.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA BARBEARIAS para eliminar definitivamente o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left text-gray-400">Recupere sua paz mental e acabe com as interrupções constantes para responder perguntas sobre "quais horários você tem livre?". Centralizar seu agendamento no link do Kairós permite que você foque 100% no corte de cabelo, enquanto o cliente escolhe o horário sozinho. Essa automação libera seu tempo e o da sua equipe para o que realmente traz lucro: o atendimento presencial de alta qualidade na barbearia. Deixe que a tecnologia gerencie a burocracia do agendamento 24 horas por dia, 7 dias por semana, sem que você precise tocar no celular.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA BARBEARIAS com filtro de relatórios de até 3 meses para controle financeiro.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha uma visão clara da saúde financeira da sua barbearia com relatórios de performance que mostram o crescimento real do seu negócio. Analisar a produtividade do trimestre permite que você tome decisões seguras sobre contratações, reformas ou novos investimentos em produtos. O Kairós simplifica a gestão do dinheiro, removendo a necessidade de planilhas de Excel confusas ou cadernos de anotações que podem ser perdidos. Mantenha seu fluxo de caixa sob controle total e gerencie sua barbearia como uma empresa de elite, focada em resultados reais e escaláveis.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA BARBEARIAS para modernizar e profissionalizar o seu negócio de elite.</h3>
                                <p className="mt-2 text-left text-gray-400">Posicione sua barbearia como a maior autoridade tecnológica da sua região e conquiste os clientes que buscam exclusividade e organização. O uso de um sistema de gestão de ponta como o Kairós eleva instantaneamente o valor percebido do seu serviço, permitindo até reajustes de preços com base na experiência oferecida. Saia do amadorismo das agendas de papel e entre definitivamente na era da automação inteligente que os grandes players do mercado nacional já utilizam. Seja a referência que seus concorrentes tentam copiar e veja sua barbearia prosperar com a força da nossa gestão especializada.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-blue-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar minha barbearia agora
                            </Link>
                        </div>
                    </div>
                </details>

                {/* NICHO 2: SALÕES DE BELEZA */}
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-pink-900/20 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-pink-500/10 text-pink-400 p-2.5 rounded-md border border-pink-500/20 shrink-0 flex items-center justify-center">
                                💅
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Sistema de Gestão para Salões de Beleza</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">A solução definitiva para centros de estética e beleza</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com link personalizado, logo e capa.</h3>
                                <p className="mt-2 text-left text-gray-400">Destaque seu salão no mercado com uma presença digital sofisticada que reflete a qualidade dos seus serviços estéticos. O Kairós permite que você crie um link de agendamento exclusivo, totalmente personalizado com sua marca, cores e identidade visual única. Enquanto sistemas genéricos desvalorizam sua imagem, nossa plataforma eleva o status do seu negócio perante clientes que buscam sofisticação e profissionalismo. Garanta uma primeira impressão impecável e converta mais interessados em agendamentos confirmados hoje mesmo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com agendas individuais para cada profissional.</h3>
                                <p className="mt-2 text-left text-gray-400">Organize sua equipe de cabeleireiros, manicures e esteticistas com calendários independentes e sincronizados em tempo real. O Kairós oferece a flexibilidade necessária para gerenciar múltiplos profissionais simultaneamente, evitando conflitos de horários e garantindo uma recepção sempre organizada. Cada membro da equipe tem total clareza sobre sua grade diária, o que otimiza o fluxo de atendimento e aumenta a produtividade geral do salão. Domine a gestão do seu time com uma ferramenta intuitiva que simplifica o dia a dia da beleza.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com personalização de serviços, valores e tempos.</h3>
                                <p className="mt-2 text-left text-gray-400">Adapte seu cardápio de serviços com precisão absoluta, definindo preços diferenciados e tempos de execução específicos para cada tipo de procedimento. Seja para colorimetria, cortes complexos ou tratamentos faciais, o Kairós permite que você configure cada detalhe conforme a necessidade do seu salão. Essa organização detalhada garante que sua margem de lucro seja respeitada e que sua agenda não sofra com atrasos operacionais indesejados. Tenha o controle total sobre a oferta de serviços da sua marca de forma simples e profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA sem necessidade de cadastro ou download.</h3>
                                <p className="mt-2 text-left text-gray-400">Remova as barreiras que impedem suas clientes de agendar um serviço de forma rápida e espontânea pelo celular. O diferencial do Kairós é permitir o agendamento direto pelo navegador, eliminando a fadiga de baixar novos aplicativos ou criar contas com senhas complexas. Essa facilidade de acesso garante uma taxa de conversão muito superior, pois respeita a pressa e a conveniência que o público feminino moderno exige. Proporcione a jornada de agendamento mais fluida do mercado e mantenha sua cadeira de atendimento sempre ocupada.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-gray-400">Ofereça a agilidade de um agendamento inteligente que pode ser concluído em menos de 60 segundos com total facilidade. Nossa interface foi projetada para ser intuitiva, permitindo que a cliente escolha o serviço, o profissional e o horário em poucos cliques certeiros. A velocidade de resposta do sistema Kairós reduz a desistência e posiciona seu salão como uma empresa moderna e focada na excelência tecnológica. Ganhe tempo na sua recepção e deixe que o sistema automatize o processo de marcação 24 horas por dia para você.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com agenda que evita conflitos de horários.</h3>
                                <p className="mt-2 text-left text-gray-400">Acabe com o estresse de marcar duas clientes para o mesmo profissional no mesmo horário através da nossa trava de segurança automática. O Kairós monitora a disponibilidade em milissegundos, garantindo que cada agendamento seja exclusivo e livre de erros humanos comuns em agendas de papel. Essa precisão operacional preserva a imagem do seu salão e garante que a experiência da cliente seja impecável do início ao fim do atendimento. Tenha a segurança de uma gestão digital robusta que protege a organização do seu negócio de beleza.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com fotos reais de cada profissional.</h3>
                                <p className="mt-2 text-left text-gray-400">Humanize seu atendimento digital permitindo que suas clientes escolham o profissional de preferência através da visualização de fotos reais na tela. Esse recurso aumenta a confiança e estabelece uma conexão visual importante antes mesmo da cliente chegar ao salão para o procedimento. O Kairós valoriza o marketing pessoal da sua equipe, destacando os talentos do seu time de forma moderna e atraente no meio digital. Transforme seu link de agendamento em uma ferramenta de autoridade visual que conquista as clientes mais exigentes do mercado.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com dashboard simples para os funcionários.</h3>
                                <p className="mt-2 text-left text-gray-400">Entregue para sua equipe uma ferramenta de gestão fácil de usar, que não exige conhecimentos técnicos avançados para ser operada diariamente. Nosso painel intuitivo permite que cada colaborador acompanhe seus atendimentos do dia com clareza, facilitando a organização dos materiais e do tempo entre serviços. A usabilidade simplificada do Kairós garante que o sistema seja adotado por todos sem resistência, mantendo os dados do salão sempre atualizados. Foque no talento da sua equipe e deixe que nossa tecnologia cuide da organização operacional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2 text-left text-gray-400">Monitore o faturamento e a ocupação da agenda do seu salão em tempo real, direto da tela inicial do seu celular, com a facilidade de um app. O Kairós oferece a mobilidade que o empreendedor de beleza precisa para gerenciar o negócio de qualquer lugar, a qualquer hora do dia. Tenha acesso instantâneo às métricas de desempenho do seu time sem precisar estar fisicamente presente no salão ou abrir computadores lentos. Simplifique sua vida administrativa e tenha o controle total da sua marca na palma da mão com nossa tecnologia Web App veloz.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com histórico detalhado de serviços realizados.</h3>
                                <p className="mt-2 text-left text-gray-400">Entenda profundamente as preferências das suas clientes através de um histórico de atendimentos detalhado e fácil de consultar no painel. Saber quais procedimentos cada cliente realiza com frequência permite que você ofereça pacotes personalizados e ações de marketing muito mais assertivas. O Kairós organiza os dados do seu salão de forma inteligente, transformando informações soltas em estratégias reais de crescimento e fidelização de público. Lidere seu mercado com base em dados concretos e leve seu faturamento para o próximo nível com nossa gestão profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com confirmação via WhatsApp em apenas um clique.</h3>
                                <p className="mt-2 text-left text-gray-400">Reduza drasticamente o prejuízo causado por faltas de última hora enviando lembretes profissionais de agendamento diretamente para o WhatsApp das clientes. Essa funcionalidade exclusiva do Kairós economiza horas de trabalho manual da recepção e garante que sua agenda esteja sempre confirmada e lucrativa. Com apenas um clique, a cliente recebe os dados da reserva, o que gera um compromisso maior com o horário marcado e profissionaliza sua comunicação. Proteja o faturamento do seu salão contra o esquecimento das clientes e mantenha o fluxo de caixa estável.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com foco em experiência Mobile-First.</h3>
                                <p className="mt-2 text-left text-gray-400">Garanta que sua marca ofereça a melhor experiência digital em qualquer dispositivo, com um sistema que carrega instantaneamente no celular das suas clientes. O Kairós foi desenhado prioritariamente para o uso móvel, assegurando que o processo de agendamento seja suave e visualmente atraente em todas as telas. Em um setor onde a conveniência é fundamental, ter uma plataforma que não trava e é fácil de navegar é um diferencial que fideliza clientes exigentes. Destaque seu salão como referência em inovação e proporcione a melhor jornada tecnológica de beleza do mercado.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left text-gray-400">Recupere o tempo precioso da sua equipe e acabe com a burocracia de responder centenas de mensagens sobre disponibilidade de agenda todos os dias. Centralizar suas reservas no Kairós permite que suas clientes vejam os horários livres e agendem sozinhas, sem a necessidade de intervenção manual constante. Isso libera seu tempo para focar na gestão estratégica do salão e no atendimento de excelência que suas clientes merecem receber presencialmente. Deixe que nossa automação inteligente trabalhe para você e transforme seu WhatsApp em um canal de vendas focado, e não burocrático.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA com relatórios financeiros de controle total.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha uma visão clara e objetiva sobre a saúde financeira do seu salão através de relatórios automáticos de performance e faturamento mensal. O Kairós simplifica a gestão do seu lucro, permitindo identificar quais serviços e profissionais trazem o maior retorno para o caixa do negócio. Abandone o uso de planilhas complexas ou anotações manuais que podem gerar erros de cálculo e comprometer seu planejamento financeiro anual. Mantenha seu salão sob controle total com informações precisas e seguras, facilitando a tomada de decisões para novos investimentos e expansões.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-pink-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA SALÕES DE BELEZA para modernizar seu negócio de beleza nacional.</h3>
                                <p className="mt-2 text-left text-gray-400">Eleve seu salão ao patamar das grandes redes de estética através de uma gestão automatizada, eficiente e extremamente profissional. O uso do Kairós demonstra para o mercado que sua marca valoriza a inovação e o tempo da cliente, aumentando significativamente sua autoridade competitiva no setor. Saia definitivamente do modelo de gestão tradicional e obsoleto e entre para a elite digital que domina o mercado de beleza nacional com tecnologia de ponta. Seja a primeira escolha das clientes que buscam modernidade, organização e um atendimento tecnológico de primeiro mundo.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-pink-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-pink-700 transition-all shadow-[0_0_30px_rgba(219,39,119,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar meu salão agora
                            </Link>
                        </div>
                    </div>
                </details>

                {/* NICHO 3: CLÍNICAS DE ESTÉTICA */}
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-cyan-900/20 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-md border border-cyan-500/20 shrink-0 flex items-center justify-center">
                                🏥
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Sistema de Gestão para Clínicas de Estética</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">Gestão de alta performance para saúde e bem-estar</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com link personalizado e branding de autoridade.</h3>
                                <p className="mt-2 text-left text-gray-400">Transmita a confiança e a seriedade que uma clínica de estética de alto padrão exige através de uma interface de agendamento sofisticada e personalizada. O Kairós permite que sua logo, cores e identidade visual dominem o ambiente digital, reforçando sua autoridade técnica antes mesmo da primeira consulta. Enquanto sistemas amadores passam uma imagem de desorganização, nossa plataforma eleva o status do seu negócio para o nível das grandes franquias de saúde e bem-estar. Posicione-se como referência no mercado nacional com um link de agendamento profissional e exclusivo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com agendas individuais para biomédicos e esteticistas.</h3>
                                <p className="mt-2 text-left text-gray-400">Gerencie sua equipe multidisciplinar com calendários específicos que respeitam as especialidades e os horários de cada profissional da saúde ou estética. No Kairós, a organização da grade é feita de forma inteligente, permitindo que cada especialista tenha controle total sobre seus atendimentos sem gerar conflitos na recepção central. Isso otimiza o uso das salas de procedimento e garante que o fluxo de pacientes na clínica seja contínuo, profissional e livre de erros operacionais. Domine a gestão de escala do seu time com uma tecnologia robusta desenhada para a área da saúde.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com personalização máxima de procedimentos e tempos.</h3>
                                <p className="mt-2 text-left text-gray-400">Configure seus protocolos estéticos com precisão total, definindo tempos de aplicação e valores específicos para cada tipo de tratamento facial ou corporal. Seja para aplicações de toxina botulínica, bioestimuladores ou limpezas de pele, o Kairós oferece a flexibilidade necessária para gerenciar a complexidade da sua agenda com facilidade. Essa personalização detalhada evita atrasos entre um paciente e outro, garantindo que o tempo clínico seja aproveitado de forma máxima e lucrativa. Tenha o controle total sobre a duração de cada procedimento técnico de forma automatizada e segura.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA sem necessidade de cadastro chato para o paciente.</h3>
                                <p className="mt-2 text-left text-gray-400">Elimine a fricção tecnológica e permita que seus pacientes agendem consultas e procedimentos de forma instantânea, sem a necessidade de logins ou downloads de aplicativos. Sabemos que o público de estética valoriza a rapidez e a discrição, por isso o Kairós oferece um caminho simplificado direto pelo navegador do celular. Essa facilidade extrema de acesso aumenta a taxa de agendamentos espontâneos, garantindo que sua clínica esteja sempre com os horários preenchidos. Proporcione a jornada de marcação mais veloz e elegante do mercado de estética nacional para seus clientes fidelizados.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-gray-400">Ofereça para seus pacientes a conveniência de agendar um procedimento estético complexo em menos de 60 segundos com total segurança. A interface do Kairós foi otimizada para ser intuitiva e direta, removendo etapas desnecessárias que apenas cansam o usuário e causam desistências no processo. Velocidade é sinônimo de modernidade, e sua clínica precisa refletir esse valor em todos os pontos de contato com o público digital. Automatize seu atendimento 24 horas por dia e deixe que o sistema trabalhe na captação de novos pacientes enquanto você foca na entrega dos melhores resultados estéticos.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com agenda inteligente que evita conflitos de salas.</h3>
                                <p className="mt-2 text-left text-gray-400">Garanta a segurança operacional da sua clínica através de uma agenda que sincroniza horários e evita a marcação dupla de profissionais no mesmo intervalo de tempo. O Kairós atua como um assistente digital infalível, processando a disponibilidade real de cada especialista em milissegundos para evitar erros que prejudicam a imagem do negócio. Essa precisão é fundamental em ambientes clínicos onde o rigor com horários é um pilar da qualidade do atendimento e da satisfação do paciente exigente. Tenha a tranquilidade de uma gestão digital que blinda sua operação contra falhas humanas de agendamento manual.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com fotos reais dos especialistas no agendamento.</h3>
                                <p className="mt-2 text-left text-gray-400">Gere confiança imediata permitindo que o paciente visualize a foto real do profissional que realizará o procedimento estético no ato da reserva. No mercado de estética, a conexão entre paciente e especialista é fundamental para a segurança e fidelização, e o Kairós facilita esse vínculo desde o primeiro clique. Esse recurso de humanização digital destaca sua clínica da concorrência, que muitas vezes utiliza interfaces frias e impessoais para realizar marcações. Fortaleça o marketing pessoal do seu time de especialistas e conquiste autoridade visual imediata com nossa plataforma de agendamento moderna.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com dashboard intuitivo para gestão administrativa.</h3>
                                <p className="mt-2 text-left text-gray-400">Entregue para sua equipe administrativa uma ferramenta de gestão simples e eficiente, que agiliza o controle diário de pacientes sem exigir treinamentos técnicos complexos. O painel do Kairós foca na clareza das informações, permitindo que a recepção tenha uma visão panorâmica de todos os atendimentos, salas e profissionais em poucos segundos. Essa usabilidade superior reduz o estresse operacional e permite que seu time foque no acolhimento e na hospitalidade dos pacientes dentro da clínica. Simplifique sua rotina e deixe que nossa tecnologia cuide da organização pesada dos dados da sua marca estática.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha o controle estratégico da sua clínica de estética na palma da mão, acessando dados de faturamento e produtividade em tempo real de qualquer lugar. O Kairós funciona como um Web App de alta velocidade, permitindo que você monitore o desempenho da sua unidade com apenas um toque na tela do seu smartphone. Essa mobilidade é essencial para o gestor moderno que precisa tomar decisões rápidas sem estar fisicamente presente na recepção da clínica o tempo todo. Garanta a agilidade que sua gestão exige com uma tecnologia que acompanha o ritmo do seu crescimento profissional no setor de beleza.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com histórico completo de cada serviço realizado.</h3>
                                <p className="mt-2 text-left text-gray-400">Entenda a jornada de tratamento de cada paciente através de um histórico detalhado que registra todos os procedimentos realizados na sua clínica ao longo do tempo. Esses dados são fundamentais para planejar retornos, oferecer novos protocolos e aumentar o LTV (Life Time Value) de cada cliente fidelizado na sua base. O Kairós transforma dados brutos em inteligência de negócio, facilitando a criação de campanhas de marketing direcionadas para quem já confia na sua marca estática. Lidere sua clínica com base em informações sólidas e veja seu faturamento crescer através da gestão de dados profissional e segura.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com confirmação via WhatsApp em um clique.</h3>
                                <p className="mt-2 text-left text-gray-400">Proteja seu lucro e maximize a ocupação das salas enviando lembretes profissionais de confirmação diretamente para o WhatsApp do paciente com máxima facilidade. Esta funcionalidade do Kairós é vital para clínicas de estética, onde o "no-show" em procedimentos de alto valor pode comprometer seriamente o faturamento do dia. Com apenas um clique, o sistema formata a mensagem e envia para o contato, gerando um compromisso maior por parte do paciente e reduzindo as faltas em até 40%. Profissionalize sua comunicação e garanta que sua agenda de elite esteja sempre confirmada e lucrativa.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA focado em experiência Mobile-First de alta performance.</h3>
                                <p className="mt-2 text-left text-gray-400">Garanta que sua clínica ofereça a melhor experiência de agendamento mobile do setor de estética, com um sistema que carrega instantaneamente em qualquer dispositivo móvel. O Kairós foi desenhado para ser visualmente atraente e tecnicamente impecável no celular do paciente, local onde ocorre a grande maioria das marcações de serviços estéticos atualmente. Proporcionar uma navegação fluida e sem erros é um diferencial que eleva a percepção de valor da sua marca e fideliza o público mais jovem e conectado. Coloque sua clínica na vanguarda tecnológica com uma plataforma desenhada para o futuro da saúde digital.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left text-gray-400">Libere seu tempo clínico automatizando as marcações e acabe com o gargalo de atendimento manual que trava a produtividade da sua equipe administrativa todos os dias. Centralizar o agendamento no link inteligente do Kairós permite que o paciente verifique a disponibilidade e agende sozinho, sem a necessidade de trocas intermináveis de áudios e textos no WhatsApp. Isso garante uma recepção mais silenciosa, focada no acolhimento presencial e na venda de novos protocolos estéticos de alto ticket. Recupere sua produtividade e deixe que nossa tecnologia gerencie suas reservas com perfeição 24 horas por dia.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA com relatórios financeiros de controle total.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha uma visão transparente da rentabilidade da sua clínica através de relatórios automáticos que demonstram o desempenho financeiro de cada procedimento oferecido. O Kairós facilita a análise do seu fluxo de caixa, permitindo identificar quais tratamentos trazem maior margem e quais profissionais estão performando melhor na unidade. Abandone o controle manual e as planilhas complexas que podem ocultar falhas na gestão do dinheiro do seu negócio de estética. Mantenha seu planejamento financeiro sob controle absoluto e tome decisões de investimento baseadas em números precisos, seguros e fáceis de interpretar.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-cyan-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA CLÍNICAS DE ESTÉTICA para modernizar e profissionalizar o seu negócio de elite.</h3>
                                <p className="mt-2 text-left text-gray-400">Posicione sua clínica de estética como a maior referência em tecnologia e organização do setor nacional e conquiste a fidelidade do público que não abre mão de qualidade. Utilizar um sistema de agendamento de elite como o Kairós é um sinal claro de que sua marca valoriza a inovação e a experiência do paciente em todos os níveis. Saia definitivamente do modelo de gestão tradicional e obsoleto e insira sua empresa na era da automação digital inteligente e altamente lucrativa. Seja a primeira escolha de quem busca resultados estéticos superiores aliados a uma jornada de atendimento moderna e impecável.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-cyan-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-cyan-700 transition-all shadow-[0_0_30px_rgba(8,145,178,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar minha clínica agora
                            </Link>
                        </div>
                    </div>
                </details>

                {/* NICHO 4: STUDIOS DE TATTOO */}
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-purple-900/20 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-purple-500/10 text-purple-400 p-2.5 rounded-md border border-purple-500/20 shrink-0 flex items-center justify-center">
                                🐉
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Sistema de Gestão para Studios de Tattoo</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">Organização e liberdade para artistas e tatuadores</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com link personalizado e branding artístico.</h3>
                                <p className="mt-2 text-left text-gray-400">Fortaleça a identidade visual do seu estúdio com um link de agendamento que respira arte e profissionalismo em cada detalhe. O Kairós permite que você personalize sua página de marcação com logo e capa exclusivos, criando uma vitrine digital que valoriza o seu estilo autoral antes mesmo da primeira agulhada. Em um mercado onde a imagem é tudo, ter um sistema de gestão para studios de tattoo organizado e esteticamente impecável separa os amadores dos artistas de elite. Garanta que a primeira interação do seu cliente seja tão impactante quanto o seu trabalho artístico final.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com agendas individuais para cada tatuador.</h3>
                                <p className="mt-2 text-left text-gray-400">Gerencie múltiplos artistas no mesmo estúdio com agendas independentes que respeitam o ritmo de trabalho e a disponibilidade de cada tatuador. Nossa plataforma permite que cada membro da equipe controle sua própria grade, eliminando confusões de horários e garantindo uma recepção muito mais tranquila. Essa autonomia é fundamental em studios de tattoo modernos, onde a organização individual reflete na produtividade coletiva do espaço. Tenha o controle total sobre quem está tatuando e quando, mantendo a harmonia operacional do seu estúdio de forma 100% digital e segura.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com personalização de sessões, valores e tempos.</h3>
                                <p className="mt-2 text-left text-gray-400">Configure seus serviços de forma detalhada, definindo tempos de sessão específicos para flash tattoos, projetos autorais ou coberturas complexas. O Kairós oferece a flexibilidade necessária para ajustar valores e durações de acordo com a técnica de cada artista, garantindo que a precificação seja justa e estratégica. Essa organização detalhada evita furos na agenda e permite que o tatuador gerencie melhor seu tempo de criação e aplicação. Profissionalize sua gestão de tempo e valorize sua hora de trabalho com um sistema que entende as particularidades da rotina de um tatuador profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO sem necessidade de cadastro ou download para o cliente.</h3>
                                <p className="mt-2 text-left text-gray-400">Facilite a jornada do seu cliente eliminando a burocracia de downloads de aplicativos ou criações de contas com senhas irritantes. Sabemos que o público de tattoo valoriza a agilidade e a simplicidade, por isso o Kairós permite que o agendamento seja feito em segundos diretamente pelo navegador do celular. Remover essas barreiras tecnológicas garante que seu cliente não desista no meio do caminho e finalize a reserva da sessão de forma rápida e intuitiva. Proporcione a experiência de marcação mais fluida do mercado nacional e veja sua agenda de tatuagens lotar com muito mais facilidade.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-gray-400">Ofereça a velocidade que a rotina moderna exige, permitindo que seu cliente reserve uma sessão de tattoo em menos de 60 segundos com total praticidade. A interface do Kairós foi desenhada para ser objetiva, focando na escolha do artista e do horário sem distrações desnecessárias que atrasam o processo. Agilidade no agendamento é sinônimo de profissionalismo e respeito ao tempo do cliente, características fundamentais para estúdios que buscam se destacar. Automatize suas reservas e deixe que a tecnologia trabalhe na captação de novos projetos enquanto você se dedica exclusivamente à sua arte.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com agenda inteligente que evita conflitos de horários.</h3>
                                <p className="mt-2 text-left text-gray-400">Elimine definitivamente o risco de marcar dois clientes no mesmo horário para o mesmo tatuador através da nossa trava de segurança automática e inteligente. O sistema Kairós sincroniza a disponibilidade em milissegundos, garantindo que cada sessão reservada seja única e respeite o intervalo necessário entre cada atendimento. Evitar conflitos de agenda é vital para manter a credibilidade do estúdio e garantir que o artista trabalhe com a calma necessária para entregar um resultado impecável. Tenha a segurança de uma gestão digital robusta que protege o fluxo de trabalho dos seus tatuadores de forma profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com fotos reais de cada tatuador no agendamento.</h3>
                                <p className="mt-2 text-left text-gray-400">Humanize seu estúdio permitindo que o cliente identifique visualmente o tatuador de sua preferência através de fotos reais no momento do agendamento. Em um mercado movido pela conexão artística, visualizar o rosto do profissional gera uma camada extra de confiança e autoridade imediata. Esse recurso de branding pessoal ajuda a destacar o estilo de cada artista do estúdio, facilitando a escolha do cliente de acordo com a técnica desejada. Transforme seu link de agendamento em uma ferramenta poderosa de marketing visual que valoriza o time de talentos do seu studio de tattoo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com dashboard intuitivo para os artistas.</h3>
                                <p className="mt-2 text-left text-gray-400">Entregue para sua equipe uma ferramenta de gestão simples, que não exige conhecimentos técnicos e facilita a visualização dos horários do dia em poucos segundos. O painel do Kairós foi projetado para ser usado no ritmo acelerado de um estúdio, permitindo que o tatuador consulte sua agenda entre uma sessão e outra com total facilidade. Reduzir a complexidade administrativa permite que os artistas foquem no que realmente importa: a criação dos desenhos e a execução das tatuagens. Simplifique a operação do seu negócio e garanta que sua equipe esteja sempre organizada e produtiva.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha o controle total do seu estúdio de tattoo na palma da mão, acessando dados de produtividade e agenda em tempo real através de um atalho no seu celular. O Kairós funciona como um Web App veloz, permitindo que você monitore o movimento do estúdio de qualquer lugar, sem precisar abrir computadores ou buscar links perdidos. Essa mobilidade é essencial para o dono do estúdio que precisa gerenciar escalas e conferir o faturamento diário com agilidade e discrição. Garanta a modernidade que sua gestão exige com uma tecnologia que acompanha o ritmo do seu crescimento profissional no setor.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com histórico detalhado de cada serviço realizado.</h3>
                                <p className="mt-2 text-left text-gray-400">Entenda o perfil dos seus clientes e acompanhe a evolução de cada projeto através de um histórico de atendimentos fácil de consultar no painel administrativo. Saber quem são seus clientes mais fiéis permite criar ações de fidelização e oferecer novos projetos de forma muito mais assertiva e lucrativa. O Kairós organiza os dados do estúdio de forma inteligente, transformando informações soltas em estratégias reais de crescimento e reconhecimento de marca no mercado de tattoo. Lidere seu estúdio com base em informações sólidas e veja sua autoridade artística crescer através de uma gestão de dados profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com confirmação via WhatsApp em apenas um clique.</h3>
                                <p className="mt-2 text-left text-gray-400">Reduza as faltas e proteja o tempo dos seus artistas enviando lembretes profissionais de confirmação de sessão diretamente para o WhatsApp do cliente com máxima agilidade. Esta funcionalidade do Kairós é vital para studios de tattoo, onde sessões longas desmarcadas em cima da hora representam um grande prejuízo financeiro para o profissional. Com apenas um clique, o sistema formata o lembrete e envia para o contato, garantindo um compromisso maior por parte do cliente e reduzindo o "no-show" de forma drástica. Profissionalize sua comunicação e garanta que sua agenda artística esteja sempre confirmada.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO focado em experiência Mobile-First.</h3>
                                <p className="mt-2 text-left text-gray-400">Garanta que seu estúdio ofereça a melhor experiência de agendamento mobile do mercado, com um sistema que carrega instantaneamente e funciona com perfeição em qualquer smartphone. O Kairós foi desenhado para ser visualmente atraente e tecnicamente impecável no celular do cliente, local onde ocorre a grande maioria das descobertas de novos artistas e estúdios via Instagram. Proporcionar uma jornada de marcação fluida e sem erros técnicos é um diferencial que eleva a percepção de valor do seu trabalho artístico. Coloque seu estúdio na vanguarda da tecnologia com uma plataforma desenhada para o futuro da arte digital.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left text-gray-400">Recupere horas valiosas do seu dia e acabe com o ciclo interminável de responder orçamentos e disponibilidades de agenda pelo WhatsApp manualmente. Centralizar as marcações no link inteligente do Kairós permite que o cliente veja seus horários livres e agende sozinho, sem que você precise parar o que está fazendo para responder. Isso garante mais tempo para o que você realmente ama: desenhar e tatuar, sem as interrupções constantes que travam sua produtividade criativa. Deixe que nossa automação inteligente gerencie sua agenda 24 horas por dia, garantindo que seu estúdio nunca pare de vender sessões.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO com relatórios financeiros de controle total.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha uma visão transparente do faturamento do estúdio e da performance de cada tatuador através de relatórios financeiros automáticos e fáceis de interpretar. O Kairós simplifica o controle das entradas, permitindo identificar os períodos de maior demanda e planejar novos investimentos em equipamentos ou reformas com segurança. Abandone o uso de anotações manuais que podem ser perdidas e tenha o controle total do lucro do estúdio em poucos cliques. Mantenha sua gestão financeira organizada e segura, facilitando a tomada de decisões estratégicas para a expansão da sua marca no mercado de tatuagem nacional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA STUDIOS DE TATTOO para modernizar e profissionalizar o seu negócio artístico.</h3>
                                <p className="mt-2 text-left text-gray-400">Posicione seu studio de tattoo como uma referência de organização e modernidade, conquistando a confiança dos clientes que buscam exclusividade e segurança em primeiro lugar. Utilizar um sistema de gestão de elite como o Kairós demonstra que você valoriza a experiência do cliente tanto quanto a qualidade do seu traço. Saia do amadorismo das agendas de papel e entre definitivamente na era da automação digital que os estúdios mais premiados do Brasil já utilizam. Seja o líder incontestável do mercado de tatuagem na sua região e veja sua autoridade artística ser acompanhada por uma gestão profissional impecável.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-purple-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-purple-700 transition-all shadow-[0_0_30px_rgba(147,51,234,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar meu estúdio agora
                            </Link>
                        </div>
                    </div>
                </details>

                {/* NICHO 5: RESTAURANTES */}
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-orange-900/20 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-orange-500/10 text-orange-400 p-2.5 rounded-md border border-orange-500/20 shrink-0 flex items-center justify-center">
                                🍽️
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Sistema de Gestão para Restaurantes</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">Controle total de reservas de mesas e fluxo de clientes</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA RESTAURANTES com link personalizado, logo e capa.</h3>
                                <p className="mt-2 text-left text-gray-400">Profissionalize a recepção digital do seu restaurante com um link de reserva exclusivo que carrega a identidade visual completa da sua marca. O Kairós permite que você apresente seu ambiente e gastronomia de forma profissional, gerando desejo e confiança no cliente antes mesmo dele chegar à mesa. Ter um sistema de gestão para restaurantes organizado visualmente é o primeiro passo para se destacar em um mercado altamente competitivo e visual. Garanta que a jornada de reserva do seu cliente seja tão impecável quanto o prato principal da sua casa.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA RESTAURANTES com agendas individuais para turnos e setores.</h3>
                                <p className="mt-2 text-left text-gray-400">Organize a disponibilidade de mesas do seu restaurante por turnos de almoço, jantar ou eventos especiais com calendários independentes e automatizados. Nosso sistema permite gerenciar a capacidade de atendimento do salão de forma inteligente, evitando lotações excessivas ou ociosidade em horários estratégicos. Essa organização de grade é fundamental para manter a eficiência da cozinha e a qualidade do serviço prestado pelos garçons no dia a dia. Tenha o controle total sobre o fluxo de reservas da sua casa, garantindo uma operação fluida e profissional em todos os períodos.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA RESTAURANTES com personalização de serviços, valores e tempos.</h3>
                                <p className="mt-2 text-left text-gray-400">Defina tempos médios de permanência nas mesas e configure valores de reserva ou pacotes especiais para datas comemorativas com total flexibilidade. O Kairós permite que você adapte o sistema para diferentes tipos de experiências gastronômicas, desde um almoço rápido executivo até jantares de celebração prolongados. Essa precisão no controle do tempo garante um giro de mesas muito mais eficiente e lucrativo para o seu negócio de alimentação. Profissionalize sua gestão de reservas e otimize cada m² do seu salão com uma tecnologia que entende a dinâmica real da gastronomia nacional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA RESTAURANTES sem necessidade de cadastro ou download para o cliente.</h3>
                                <p className="mt-2 text-left text-gray-400">Elimine a barreira do "baixar app" e permita que seus clientes reservem uma mesa instantaneamente pelo navegador do celular enquanto escolhem o restaurante. O público de gastronomia valoriza a conveniência, e o Kairós entrega o caminho mais curto entre a fome do cliente e a reserva confirmada na sua casa. Remover a burocracia de cadastros extensos garante que sua taxa de conversão seja altíssima, evitando que o interessado desista e procure o concorrente mais próximo. Ofereça a jornada de reserva mais rápida do mercado e veja seu salão sempre cheio com praticidade absoluta.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA RESTAURANTES com reserva finalizada em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-gray-400">Proporcione a agilidade que o cliente moderno exige através de um sistema de reservas que pode ser concluído em menos de 60 segundos com total facilidade. A interface do Kairós foi otimizada para que a escolha da data, horário e número de pessoas seja feita de forma intuitiva e sem cliques desnecessários. Velocidade no agendamento digital é um sinal de modernidade que eleva o status do seu restaurante perante um público cada vez mais conectado e exigente. Automatize suas reservas 24 horas por dia e deixe que nossa tecnologia capte novos clientes enquanto sua equipe foca na hospitalidade.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA RESTAURANTES com agenda inteligente que evita conflitos de reservas.</h3>
                                <p className="mt-2 text-left text-gray-400">Acabe definitivamente com o erro humano de agendar duas famílias para a mesma mesa no mesmo horário através da nossa trava automática inteligente. O sistema Kairós processa a disponibilidade do salão em tempo real, garantindo que cada reserva seja única e respeite a capacidade máxima de atendimento da sua equipe. Evitar o "overbooking" é vital para manter a reputação da casa e garantir que o cliente não passe por constrangimentos ao chegar no estabelecimento. Tenha a segurança de uma gestão digital robusta que protege a organização do seu restaurante de forma profissional e escalável.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA RESTAURANTES com fotos reais da equipe e ambiente no agendamento.</h3>
                                <p className="mt-2 text-left text-gray-400">Humanize sua marca digital permitindo que o cliente sinta a atmosfera do seu restaurante através de fotos reais da equipe e do salão no momento da reserva. Esse recurso visual ajuda a criar uma conexão emocional e aumenta o desejo de consumo do cliente antes mesmo dele entrar pela sua porta. O Kairós valoriza o marketing do seu negócio, transformando o link de reserva em uma ferramenta poderosa de persuasão e autoridade gastronômica. Destaque os diferenciais do seu ambiente e conquiste os clientes mais exigentes através de uma interface de agendamento moderna, transparente e visualmente atraente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA RESTAURANTES com dashboard intuitivo para hostess e gerentes.</h3>
                                <p className="mt-2 text-left text-gray-400">Entregue para sua equipe de recepção uma ferramenta de controle simples e eficiente, que agiliza o check-in dos clientes sem gerar filas ou confusão na entrada. O painel do Kairós foca na clareza das informações, permitindo que o gerente tenha uma visão panorâmica de todas as mesas reservadas e turnos em poucos segundos. Essa usabilidade superior reduz o estresse operacional em horários de pico e permite que seu time foque no acolhimento e na excelência do serviço de mesa. Simplifique a rotina da sua casa e deixe que nossa tecnologia organize os dados do seu restaurante com precisão.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA RESTAURANTES com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha o controle estratégico do seu restaurante na palma da mão, monitorando o fluxo de reservas e a ocupação do salão em tempo real de qualquer lugar. O Kairós funciona como um Web App de alta performance, permitindo que você tome decisões rápidas sobre escalas e compras sem precisar estar fisicamente presente no estabelecimento. Essa mobilidade é essencial para o restaurateur moderno que gerencia múltiplas tarefas e precisa de dados ágeis para garantir a lucratividade do negócio. Garanta a agilidade que sua gestão exige com uma tecnologia que acompanha o ritmo do seu crescimento no setor de alimentação.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA RESTAURANTES com histórico detalhado de cada reserva realizada.</h3>
                                <p className="mt-2 text-left text-gray-400">Entenda as preferências dos seus clientes e identifique seus frequentadores mais assíduos através de um histórico de reservas fácil de consultar no painel administrativo. Saber quem são seus clientes VIPs permite criar ações de fidelização, oferecer cortesias estratégicas e personalizar o atendimento para aumentar o ticket médio da casa. O Kairós transforma dados de reserva em inteligência de mercado, facilitando a criação de campanhas de marketing direcionadas e muito mais lucrativas. Lidere seu restaurante com base em informações sólidas e veja sua base de clientes crescer através de uma gestão de dados profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA RESTAURANTES com confirmação via WhatsApp em apenas um clique.</h3>
                                <p className="mt-2 text-left text-gray-400">Reduza drasticamente o prejuízo causado por mesas vazias enviando lembretes profissionais de confirmação diretamente para o WhatsApp do cliente com máxima agilidade. Esta funcionalidade do Kairós é vital para restaurantes, onde o "no-show" em horários nobres de jantar representa uma perda direta de faturamento que não pode ser recuperada. Com apenas um clique, o sistema formata o lembrete e envia para o contato, gerando um compromisso maior por parte do cliente e garantindo que sua agenda de mesas esteja sempre confirmada e lucrativa. Proteja o fluxo de caixa da sua casa com comunicação profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA RESTAURANTES focado em experiência Mobile-First de alta velocidade.</h3>
                                <p className="mt-2 text-left text-gray-400">Garanta que sua marca ofereça a melhor experiência de reserva mobile do setor gastronômico, com um sistema que carrega instantaneamente no smartphone do seu cliente. O Kairós foi desenhado para ser visualmente atraente e tecnicamente impecável no celular, local onde ocorre a grande maioria das buscas por "onde comer agora". Proporcionar uma navegação fluida e sem erros técnicos é um diferencial que eleva a percepção de valor do seu restaurante e fideliza o público que busca modernidade. Coloque seu estabelecimento na vanguarda tecnológica com uma plataforma desenhada para o futuro da reserva digital.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA RESTAURANTES para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left text-gray-400">Recupere a produtividade da sua equipe e acabe com o ciclo interminável de responder disponibilidades de mesas pelo WhatsApp manualmente durante o horário de pico. Centralizar as reservas no link inteligente do Kairós permite que o cliente veja seus horários livres e reserve sozinho, sem que sua hostess precise parar o atendimento presencial. Isso garante uma recepção mais organizada, focada no acolhimento de quem acaba de chegar, sem as interrupções constantes do telefone ou mensagens de texto. Deixe que nossa automação gerencie sua agenda de mesas 24 horas por dia, garantindo que sua casa nunca pare de vender.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA RESTAURANTES com relatórios financeiros de controle total.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha uma visão clara do faturamento gerado pelas reservas e da performance de cada turno através de relatórios financeiros automáticos e fáceis de interpretar. O Kairós simplifica o controle das metas de venda, permitindo identificar os dias de maior demanda e planejar promoções para os períodos de menor movimento com segurança. Abandone o uso de anotações manuais que podem gerar furos no caixa e tenha o controle total do lucro da sua operação gastronômica em poucos cliques. Mantenha sua gestão financeira organizada e segura, facilitando a tomada de decisões estratégicas para a expansão da sua marca.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-orange-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA RESTAURANTES para modernizar seu negócio gastronômico nacional.</h3>
                                <p className="mt-2 text-left text-gray-400">Posicione seu restaurante como uma referência de organização e modernidade, conquistando a confiança dos clientes que buscam exclusividade e agilidade no atendimento. Utilizar um sistema de reserva de elite como o Kairós demonstra que sua marca valoriza a experiência do cliente tanto quanto a qualidade do prato servido na mesa. Saia do modelo de gestão tradicional e obsoleto e entre definitivamente na era da automação digital que os restaurantes mais premiados do país já utilizam com sucesso. Seja o líder incontestável do mercado gastronômico na sua região e veja sua autoridade ser acompanhada por uma gestão profissional impecável.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-orange-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-orange-700 transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar meu restaurante agora
                            </Link>
                        </div>
                    </div>
                </details>

                {/* NICHO 6: ESTÚDIOS DE FOTOGRAFIA */}
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-indigo-900/20 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-indigo-500/10 text-indigo-400 p-2.5 rounded-md border border-indigo-500/20 shrink-0 flex items-center justify-center">
                                📸
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Sistema de Gestão para Estúdios de Fotografia</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">Agendamento de ensaios e sessões de forma profissional</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com link personalizado, logo e capa.</h3>
                                <p className="mt-2 text-left text-gray-400">Eleve a percepção de valor do seu trabalho artístico com uma interface de agendamento que funciona como uma extensão do seu portfólio profissional. O Kairós permite que você personalize seu link de reserva com sua marca e imagens de impacto, transmitindo autoridade imediata para clientes que buscam ensaios de alto nível. Ter um sistema de gestão para estúdios de fotografia organizado visualmente é fundamental para se destacar em um mercado movido pela estética e pelo profissionalismo. Garanta que a primeira interação digital do seu cliente seja tão impecável quanto a edição final das suas fotos.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com agendas individuais para cada fotógrafo da equipe.</h3>
                                <p className="mt-2 text-left text-gray-400">Gerencie sua equipe de fotógrafos e assistentes com calendários independentes que evitam o conflito de datas e garantem a organização total de múltiplos ensaios simultâneos. No Kairós, cada profissional possui sua própria grade de disponibilidade, permitindo uma gestão de escala fluida e extremamente eficiente para estúdios que atendem diversos nichos ao mesmo tempo. Essa autonomia técnica aumenta a produtividade do time e assegura que nenhum ensaio seja marcado fora dos critérios operacionais da sua marca. Domine a gestão operacional do seu estúdio com uma tecnologia que entende a dinâmica real do mercado fotográfico nacional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com personalização de sessões, valores e tempos.</h3>
                                <p className="mt-2 text-left text-gray-400">Adapte sua oferta de serviços com precisão absoluta, definindo tempos de duração e valores específicos para ensaios externos, sessões em estúdio, fotos corporativas ou eventos. O Kairós oferece a flexibilidade necessária para gerenciar a complexidade de diferentes pacotes fotográficos, garantindo que o tempo de deslocamento e edição seja respeitado na sua grade. Essa organização detalhada evita furos na agenda e permite que você maximize seu faturamento mensal com uma precificação estratégica e automatizada. Tenha o controle total sobre a duração de cada tipo de sessão artística de forma simples, profissional e segura.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA sem necessidade de cadastro ou download para o cliente.</h3>
                                <p className="mt-2 text-left text-gray-400">Remova os obstáculos tecnológicos que impedem o seu cliente de reservar um ensaio de forma rápida e espontânea diretamente pelo celular. O diferencial do Kairós é permitir o agendamento sem a obrigatoriedade de baixar novos aplicativos ou criar contas complexas com senhas que o cliente acaba esquecendo. Essa facilidade extrema de acesso garante uma taxa de conversão muito superior, respeitando a conveniência e a pressa que o público moderno exige no meio digital. Proporcione a jornada de marcação mais fluida do mercado de fotografia e mantenha sua agenda de sessões sempre ocupada com praticidade absoluta.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-gray-400">Ofereça a agilidade de um agendamento inteligente que pode ser concluído em menos de 60 segundos com total facilidade para o seu público. Nossa interface foi projetada para ser intuitiva, permitindo que o cliente escolha o tipo de ensaio, o fotógrafo e o horário em poucos cliques certeiros e visuais. Velocidade no agendamento digital é um sinal de modernidade que eleva o status do seu estúdio perante um público que busca eficiência e profissionalismo. Automatize seu atendimento 24 horas por dia e deixe que o sistema trabalhe na captação de novos ensaios enquanto você foca na direção criativa das suas sessões.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com agenda inteligente que evita conflitos de datas.</h3>
                                <p className="mt-2 text-left text-gray-400">Acabe com o pesadelo de marcar dois ensaios externos no mesmo horário através da nossa trava de segurança automática que monitora sua disponibilidade em tempo real. O sistema Kairós atua como um assistente digital infalível, processando cada reserva em milissegundos para garantir que sua grade de horários seja impecável e livre de erros humanos. Evitar o choque de datas é vital para manter a credibilidade do fotógrafo e garantir que cada cliente receba a atenção e o tempo necessário para um resultado de excelência. Tenha a segurança de uma gestão digital robusta que protege a organização do seu estúdio de forma profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com fotos reais da equipe no momento da reserva.</h3>
                                <p className="mt-2 text-left text-gray-400">Humanize sua marca digital permitindo que o cliente escolha o fotógrafo de sua preferência através da visualização de fotos reais na interface de agendamento. Esse recurso aumenta a confiança e estabelece uma conexão visual fundamental no mercado de fotografia, onde a afinidade com o profissional é um critério decisivo de compra. O Kairós valoriza o marketing pessoal da sua equipe, destacando os talentos do seu estúdio de forma moderna e atraente no ambiente digital. Transforme seu link de agendamento em uma ferramenta de autoridade visual que conquista as famílias e empresas mais exigentes do mercado nacional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com dashboard intuitivo para os fotógrafos.</h3>
                                <p className="mt-2 text-left text-gray-400">Entregue para sua equipe uma ferramenta de gestão simples, que facilita a visualização dos ensaios do dia em poucos segundos e sem complicações técnicas. O painel do Kairós foi projetado para o fotógrafo que vive na correria, permitindo conferir locais, horários e tipos de sessões com total clareza no celular entre um ensaio e outro. A usabilidade simplificada garante que o sistema seja adotado por todos do estúdio sem resistência, mantendo os dados de atendimento sempre organizados e acessíveis. Foque no seu olhar fotográfico e deixe que nossa tecnologia cuide da organização pesada da sua agenda profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha o controle estratégico do seu negócio de fotografia na palma da mão, acessando calendários e métricas de faturamento em tempo real de qualquer lugar do mundo. O Kairós oferece a mobilidade que o fotógrafo moderno precisa para gerenciar sua empresa enquanto está em locações externas ou viajando para eventos. Tenha acesso instantâneo aos dados de novos agendamentos sem precisar abrir e-mails lentos ou computadores pesados no meio do dia de trabalho. Simplifique sua vida administrativa e tenha o controle total da sua marca fotográfica com nossa tecnologia Web App veloz e intuitiva.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com histórico detalhado de cada sessão realizada.</h3>
                                <p className="mt-2 text-left text-gray-400">Entenda as necessidades dos seus clientes e acompanhe a evolução de cada família ou empresa através de um histórico de atendimentos fácil de consultar e gerenciar. Saber quais ensaios cada cliente já realizou permite oferecer novos pacotes de acompanhamento, álbuns e sessões sazonais de forma muito mais estratégica e lucrativa para o estúdio. O Kairós transforma dados de reserva em inteligência de negócio, facilitando a criação de campanhas de marketing direcionadas para quem já confia na sua arte. Lidere seu estúdio com base em informações sólidas e veja sua autoridade fotográfica crescer através de uma gestão de dados profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com confirmação via WhatsApp em apenas um clique.</h3>
                                <p className="mt-2 text-left text-gray-400">Reduza drasticamente o prejuízo causado por faltas em locações ou estúdios enviando lembretes profissionais de confirmação diretamente para o WhatsApp do cliente com agilidade total. Esta funcionalidade do Kairós é vital para fotógrafos, onde uma data de ensaio perdida representa um tempo de trabalho que não volta e um faturamento que deixa de entrar no caixa. Com apenas um clique, o sistema formata o lembrete e envia para o contato, gerando um compromisso real por parte do cliente e reduzindo o "no-show" de forma impressionante. Profissionalize sua comunicação e garanta que sua agenda artística esteja sempre confirmada.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA focado em experiência Mobile-First.</h3>
                                <p className="mt-2 text-left text-gray-400">Garanta que seu estúdio ofereça a melhor experiência de reserva mobile do setor, com um sistema que carrega instantaneamente e funciona com perfeição no smartphone do cliente. O Kairós foi desenhado para ser visualmente atraente e tecnicamente impecável no celular, local onde ocorre a grande maioria das buscas por fotógrafos através do Instagram e redes sociais. Proporcionar uma jornada de agendamento fluida e sem erros técnicos é um diferencial que eleva a percepção de valor do seu trabalho artístico final. Coloque seu estúdio na vanguarda tecnológica com uma plataforma desenhada para o futuro da fotografia digital nacional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left text-gray-400">Recupere o tempo precioso da sua edição e acabe com o ciclo interminável de responder disponibilidades de datas e orçamentos básicos pelo WhatsApp manualmente o dia todo. Centralizar suas marcações no link inteligente do Kairós permite que o cliente veja seus horários livres e agende sozinho, sem que você precise parar o tratamento de fotos para responder mensagens burocráticas. Isso garante mais tempo para o que você realmente ama: capturar momentos e criar imagens inesquecíveis, sem as interrupções constantes que travam sua produtividade criativa. Deixe que nossa automação gerencie sua agenda 24 horas por dia.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA com relatórios financeiros de controle total.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha uma visão transparente do faturamento do seu estúdio e da lucratividade de cada tipo de ensaio através de relatórios financeiros automáticos e fáceis de interpretar. O Kairós simplifica o controle das entradas, permitindo identificar os meses de maior demanda e planejar novos investimentos em equipamentos ou marketing com total segurança. Abandone o uso de planilhas complexas que podem ocultar falhas na gestão do dinheiro da sua empresa fotográfica e tenha o controle total do lucro em poucos cliques. Mantenha sua gestão financeira organizada e segura, facilitando a tomada de decisões estratégicas para a expansão da sua marca.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA ESTÚDIOS DE FOTOGRAFIA para modernizar seu negócio artístico nacional.</h3>
                                <p className="mt-2 text-left text-gray-400">Posicione seu estúdio de fotografia como uma referência de organização e modernidade, conquistando a confiança dos clientes que buscam exclusividade e segurança em primeiro lugar. Utilizar um sistema de gestão de elite como o Kairós demonstra que sua marca valoriza a experiência do cliente tanto quanto a qualidade da sua lente e edição. Saia do amadorismo das agendas de papel e entre definitivamente na era da automação digital que os estúdios mais prestigiados do país já utilizam com sucesso absoluto. Seja o líder incontestável do mercado fotográfico na sua região e veja sua autoridade ser acompanhada por uma gestão profissional impecável.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-indigo-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-indigo-700 transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar meu estúdio agora
                            </Link>
                        </div>
                    </div>
                </details>

                {/* NICHO 7: SERVIÇOS EM GERAL */}
                <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-emerald-900/20 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <span className="flex items-center gap-4 md:gap-6">
                            <span className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-md border border-emerald-500/20 shrink-0 flex items-center justify-center">
                                💼
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight block">Sistema de Gestão para Serviços em Geral</span>
                                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic block">A solução universal para qualquer prestador de serviço</span>
                            </span>
                        </span>
                        <span className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</span>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">
                            
                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 1. SISTEMA DE GESTÃO PARA SERVIÇOS com link personalizado, logo e capa profissionais.</h3>
                                <p className="mt-2 text-left text-gray-400">Profissionalize sua presença digital com uma interface de agendamento que centraliza toda a sua demanda em um único link exclusivo e personalizado. O Kairós permite que você apresente sua marca com autoridade, utilizando sua logo e capa para criar uma vitrine de serviços impecável no ambiente online. Ter um sistema de gestão para serviços organizado é o primeiro passo para sair do amadorismo e conquistar clientes de alto valor que buscam eficiência e confiança. Garanta que seu link de agendamento seja a ferramenta de conversão mais potente do seu negócio digital hoje mesmo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 2. SISTEMA DE GESTÃO PARA SERVIÇOS com agendas individuais para cada prestador de serviço.</h3>
                                <p className="mt-2 text-left text-gray-400">Gerencie sua equipe ou sua própria grade de horários com calendários independentes que eliminam qualquer risco de sobreposição de compromissos ou falhas de comunicação. Nossa plataforma oferece a flexibilidade necessária para múltiplos profissionais atuarem simultaneamente, garantindo uma organização fluida e extremamente profissional na sua recepção digital. Essa autonomia de gestão aumenta a produtividade geral e assegura que cada atendimento seja realizado dentro do prazo estabelecido. Domine a organização operacional do seu negócio com uma tecnologia robusta desenhada para qualquer nicho de atuação.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 3. SISTEMA DE GESTÃO PARA SERVIÇOS com personalização máxima de valores, tempos e categorias.</h3>
                                <p className="mt-2 text-left text-gray-400">Adapte sua oferta de atendimento com precisão absoluta, definindo preços diferenciados e durações específicas para cada tipo de consultoria, aula ou sessão prestada. O Kairós permite que você configure seu cardápio de serviços de forma detalhada, garantindo que sua agenda reflita exatamente a realidade da sua operação financeira. Essa organização técnica evita lacunas ociosas e permite que você maximize seu faturamento mensal com uma gestão de tempo estratégica e automatizada. Tenha o controle total sobre a duração de cada serviço técnico de forma simples, profissional e segura.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 4. SISTEMA DE GESTÃO PARA SERVIÇOS sem necessidade de cadastro, login ou download chato.</h3>
                                <p className="mt-2 text-left text-gray-400">Remova as barreiras tecnológicas que impedem o seu cliente de contratar seu serviço de forma rápida e espontânea diretamente pelo navegador do celular. O diferencial do Kairós é permitir o agendamento instantâneo sem a obrigatoriedade de baixar novos aplicativos ou preencher formulários de cadastro extensos que geram desistência. Essa facilidade extrema de acesso garante uma taxa de conversão muito superior, respeitando a conveniência e a pressa que o público moderno exige no meio digital atual. Proporcione a jornada de marcação mais fluida do mercado nacional e mantenha sua agenda sempre preenchida com praticidade.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 5. SISTEMA DE GESTÃO PARA SERVIÇOS com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2 text-left text-gray-400">Ofereça a agilidade que o mercado de serviços exige, permitindo que seu cliente agende um horário em menos de 60 segundos com total facilidade e segurança. Nossa interface foi projetada para ser intuitiva e direta, removendo etapas burocráticas que apenas cansam o usuário e atrasam o processo de fechamento de novos negócios. Velocidade no agendamento digital é um sinal de modernidade e respeito ao tempo do cliente, características fundamentais para profissionais que buscam se destacar. Automatize seu atendimento 24 horas por dia e deixe que o sistema trabalhe na captação de novas vendas enquanto você foca na execução.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 6. SISTEMA DE GESTÃO PARA SERVIÇOS com agenda inteligente que evita conflitos de horários.</h3>
                                <p className="mt-2 text-left text-gray-400">Acabe definitivamente com o erro humano de agendar dois compromissos no mesmo horário através da nossa tecnologia de trava automática inteligente que monitora sua grade em tempo real. O sistema Kairós atua como um assistente digital infalível, processando cada agendamento em milissegundos para garantir que sua disponibilidade seja respeitada com precisão absoluta. Evitar conflitos de agenda é vital para manter a credibilidade profissional e garantir que cada cliente receba a atenção necessária para um serviço de excelência. Tenha a segurança de uma gestão digital robusta que protege a organização do seu tempo de forma profissional.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 7. SISTEMA DE GESTÃO PARA SERVIÇOS com fotos reais de cada profissional no agendamento.</h3>
                                <p className="mt-2 text-left text-gray-400">Humanize sua marca digital permitindo que o cliente identifique visualmente o profissional de sua preferência através de fotos reais na interface de agendamento do sistema. Em um mercado de serviços onde a confiança pessoal é um critério decisivo, visualizar o rosto de quem prestará o atendimento gera uma conexão imediata e autoridade instantânea. Esse recurso destaca seu negócio da concorrência impessoal, facilitando a escolha do cliente e humanizando a jornada de compra digital de forma moderna. Transforme seu link de agendamento em uma ferramenta de marketing poderosa que valoriza seu time de talentos.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 8. SISTEMA DE GESTÃO PARA SERVIÇOS com dashboard intuitivo para gestão administrativa.</h3>
                                <p className="mt-2 text-left text-gray-400">Entregue para sua equipe uma ferramenta de gestão simples, que facilita a visualização dos atendimentos do dia em poucos segundos e sem necessidade de conhecimentos técnicos. O painel do Kairós foi projetado para ser intuitivo, permitindo conferir status, horários e tipos de serviços com total clareza no celular ou desktop. A usabilidade simplificada garante que o sistema seja adotado rapidamente sem resistência operacional, mantendo os dados de agendamento sempre organizados e acessíveis para o gestor. Simplifique a operação do seu negócio e garanta que sua equipe esteja sempre organizada, produtiva e focada em resultados.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 9. SISTEMA DE GESTÃO PARA SERVIÇOS com atalho de acesso rápido no celular do dono.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha o controle total da sua prestação de serviços na palma da mão, acessando calendários e métricas de desempenho em tempo real através de um atalho exclusivo no seu celular. O Kairós funciona como um Web App de alta velocidade, permitindo que você monitore o movimento da sua empresa de qualquer lugar do mundo, sem precisar abrir computadores lentos. Essa mobilidade é essencial para o prestador de serviço moderno que gerencia múltiplas tarefas e precisa de dados ágeis para garantir a lucratividade do seu tempo. Garanta a modernidade que sua gestão exige com uma tecnologia que acompanha seu ritmo de crescimento.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 10. SISTEMA DE GESTÃO PARA SERVIÇOS com histórico detalhado de cada serviço realizado.</h3>
                                <p className="mt-2 text-left text-gray-400">Entenda profundamente o perfil dos seus clientes e acompanhe a evolução de cada contrato através de um histórico de atendimentos fácil de consultar e gerenciar no painel administrativo. Saber quais serviços cada cliente consome com frequência permite oferecer pacotes personalizados e ações de pós-venda muito mais assertivas e lucrativas para sua marca. O Kairós transforma dados soltos em inteligência estratégica, facilitando a criação de campanhas de marketing direcionadas para quem já confia na sua prestação de serviço. Lidere seu mercado com base em informações sólidas e veja sua autoridade profissional crescer continuamente.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 11. SISTEMA DE GESTÃO PARA SERVIÇOS com confirmação via WhatsApp em apenas um clique.</h3>
                                <p className="mt-2 text-left text-gray-400">Reduza drasticamente o prejuízo causado por faltas enviando lembretes profissionais de confirmação diretamente para o WhatsApp do cliente com máxima agilidade e eficiência. Esta funcionalidade do Kairós é vital para prestadores de serviço, onde um horário vago representa uma hora de trabalho perdida que nunca mais poderá ser recuperada financeiramente. Com apenas um clique, o sistema formata a mensagem e envia para o contato, gerando um compromisso real por parte do cliente e reduzindo o "no-show" de forma impressionante. Profissionalize sua comunicação e garanta que sua agenda de atendimentos esteja sempre confirmada.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 12. SISTEMA DE GESTÃO PARA SERVIÇOS focado em experiência Mobile-First de alta velocidade.</h3>
                                <p className="mt-2 text-left text-gray-400">Garanta que sua marca ofereça a melhor experiência de agendamento mobile do mercado nacional, com um sistema que carrega instantaneamente em qualquer dispositivo móvel do cliente. O Kairós foi desenhado para ser visualmente atraente e tecnicamente impecável no smartphone, local onde ocorre a grande maioria das buscas por profissionais liberais atualmente. Proporcionar uma navegação fluida e sem erros técnicos é um diferencial que eleva a percepção de valor do seu trabalho e fideliza o público que busca modernidade e praticidade. Coloque sua empresa na vanguarda tecnológica com uma plataforma desenhada para o futuro digital.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 13. SISTEMA DE GESTÃO PARA SERVIÇOS para eliminar o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2 text-left text-gray-400">Recupere horas valiosas do seu dia automatizando a marcação de horários e acabe com o ciclo interminável de responder disponibilidades de agenda pelo WhatsApp manualmente. Centralizar as marcações no link inteligente do Kairós permite que o cliente veja seus horários livres e agende sozinho, sem que você precise parar sua execução técnica para responder mensagens burocráticas. Isso garante mais tempo para o que realmente traz lucro para o seu negócio: a entrega do serviço de excelência, sem as interrupções constantes que travam sua produtividade diária. Deixe que nossa automação gerencie sua agenda 24 horas por dia.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 14. SISTEMA DE GESTÃO PARA SERVIÇOS com relatórios financeiros de controle total.</h3>
                                <p className="mt-2 text-left text-gray-400">Tenha uma visão transparente do faturamento da sua empresa e da lucratividade de cada serviço oferecido através de relatórios financeiros automáticos e fáceis de interpretar. O Kairós simplifica o controle das entradas, permitindo identificar os períodos de maior demanda e planejar novos investimentos ou metas de crescimento com total segurança e precisão. Abandone o uso de planilhas complexas ou anotações manuais que podem ocultar falhas na gestão do dinheiro do seu negócio e tenha o controle total do lucro em poucos cliques. Mantenha sua gestão financeira organizada e segura, facilitando a tomada de decisões profissionais.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><span className="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> 15. SISTEMA DE GESTÃO PARA SERVIÇOS para modernizar e profissionalizar o seu negócio nacional.</h3>
                                <p className="mt-2 text-left text-gray-400">Posicione sua prestação de serviço como uma referência de organização e modernidade, conquistando a confiança dos clientes que buscam exclusividade e segurança em primeiro lugar no atendimento. Utilizar um sistema de gestão de elite como o Kairós demonstra que sua marca valoriza a inovação e o tempo do cliente tanto quanto a qualidade da entrega técnica realizada. Saia definitivamente do modelo de gestão tradicional e obsoleto e entre para a era da automação digital que os profissionais de maior sucesso do país já utilizam com resultados exponenciais. Seja o líder incontestável do seu nicho de atuação e veja sua autoridade ser acompanhada por uma gestão profissional.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-emerald-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-emerald-700 transition-all shadow-[0_0_30px_rgba(5,150,105,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                Quero modernizar meu negócio agora
                            </Link>
                        </div>
                    </div>
                </details>
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