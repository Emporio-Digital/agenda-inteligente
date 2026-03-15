import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO DE ALTA DENSIDADE PARA ITAQUERA) ---
export const metadata: Metadata = {
  title: "Sistema de Gestão e Agendamento em Itaquera | Kairós",
  description: "O melhor sistema de gestão e agendamento online para negócios em Itaquera. Automatize sua agenda via WhatsApp, controle seu financeiro e escale seu negócio na Zona Leste. Teste grátis!",
  keywords:["sistema de gestão itaquera", "agendamento online itaquera", "software para barbearia itaquera", "agenda salão de beleza itaquera", "gestão de clínicas itaquera", "automação comercial radial leste", "sistema para pet shop itaquera", "agendamento whatsapp itaquera", "sistema para barbearia zona leste"],
  alternates: {
    canonical: "https://kairos.egemporiodigital.com.br/sistema-de-gestao/itaquera"
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

// --- SCHEMA MARKUP GEO-NICHADO (OFERTA LOCAL ITAQUERA) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kairós - Sistema de Gestão Itaquera",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "Teste Grátis de 3 dias sem cartão para negócios em Itaquera",
    "eligibleRegion": {
      "@type": "Place",
      "name": "Itaquera, São Paulo, SP"
    }
  }
}

// --- DADOS DOS TEMAS ---
const themes =[
  { name: "Barbearia", img: "https://i.ibb.co/wf70mrq/IMG-9293.jpg", label: "Tema Barbearia" },
  { name: "Salão", img: "https://i.ibb.co/JR4P893D/IMG-9294.jpg", label: "Tema Salão de Beleza" },
  { name: "Restaurante", img: "https://i.ibb.co/wFBtgbwL/IMG-9298.jpg", label: "Tema Restaurante" },
  { name: "Clínica", img: "https://i.ibb.co/pr6s04cB/IMG-2228.jpg", label: "Tema Clínica" },
  { name: "Tattoo", img: "https://i.ibb.co/7Jh8hN6s/IMG-2247.jpg", label: "Tema Studio Tattoo" },
]

export default function ItaqueraPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden bg-[#050505]">
      
      {/* --- ESTILOS GLOBAIS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll { animation: scroll 10s linear infinite; }
        .animate-scroll-slow { animation: scroll 60s linear infinite; }
        .hover-pause:hover .animate-scroll, .hover-pause:hover .animate-scroll-slow { animation-play-state: paused; }
        
        /* Estilo do Acordeon Único (Tese de Autoridade) */
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] summary ~ * { animation: fadeInDown 0.5s ease-out forwards; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* --- INJEÇÃO DO SCHEMA SEO --- */}
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
            <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center">
                <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">Kairós</span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide uppercase">Itaquera Edition</span>
            </div>
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/cadastro" className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm md:font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 font-bold border border-blue-500/20">
              Teste Grátis
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">

        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-12 px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10 shadow-inner">
              <span>📍</span>
              <span>Liderança em Gestão Digital em Itaquera</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white drop-shadow-2xl">
              Sistema de gestão em <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
                Itaquera.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Na região que é o orgulho da Zona Leste, o amadorismo não tem vez. Automatize sua recepção, controle suas finanças e escale seu negócio próximo ao estádio mais moderno do Brasil.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/cadastro" className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Começar Teste Grátis em Itaquera 🚀
              </Link>
            </div>
          </div>
        </section>

        {/* --- OS 30% EXCLUSIVO LOCAL (HOOK ITAQUERA) --- */}
        <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto bg-[#080b11] border border-blue-900/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">Em Itaquera, tempo é faturamento. Não perca nenhum cliente.</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                    <p>
                        Se o seu negócio está pulsando nas proximidades do <strong>Shopping Metrô Itaquera</strong>, na movimentada <strong>Avenida Jacu-Pêssego</strong> ou servindo a enorme demanda comercial da <strong>Radial Leste</strong>, você faz parte do motor da Zona Leste.
                    </p>
                    <p>
                        O cliente de Itaquera é dinâmico: ele quer agendar um corte, uma consulta ou um serviço enquanto está no metrô ou saindo de um jogo na <strong>Neo Química Arena</strong>. O <strong>Kairós</strong> foi criado para quem quer jogar na série A do comércio local, oferecendo um <strong>sistema de gestão</strong> robusto que elimina o vaivém do WhatsApp e profissionaliza sua recepção 24h por dia. Domine a região com tecnologia e deixe a concorrência para trás.
                    </p>
                </div>
            </div>
        </section>

        {/* --- CARROSSEL DE MOCKUPS --- */}
        <section className="py-16 overflow-hidden">
            <div className="w-full hover-pause">
                <div className="flex w-max animate-scroll-slow gap-6 px-4">
                    {[...themes, ...themes].map((theme, index) => (
                        <div key={index} className="flex-shrink-0 flex flex-col items-center group w-[180px] md:w-[280px]">
                            <div className="relative bg-zinc-900 rounded-[2rem] border-[4px] border-zinc-800 overflow-hidden shadow-2xl w-full aspect-[9/19] transition-transform duration-300 group-hover:scale-[1.02]">
                                <img src={theme.img} alt={theme.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all" />
                            </div>
                            <p className="text-center mt-4 font-bold text-gray-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-xs md:text-sm">{theme.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- O SEO ACCORDION TITÂNIO (12 PILARES DENSOS ITAQUERA) --- */}
        <section className="py-24 px-6 relative z-20">
            <div className="max-w-6xl mx-auto">
                
                <details className="group bg-[#080b11] border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-300">
                    
                    <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="bg-blue-500/10 text-blue-400 p-2.5 rounded-md border border-blue-500/20 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight">
                                    Tese de Autoridade: Sistema de Gestão em Itaquera
                                </h2>
                                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1">
                                    Tecnologia de Alta Performance para o Empreendedor da Zona Leste
                                </p>
                            </div>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-900/5 blur-[100px] pointer-events-none"></div>

                        <p className="text-gray-400 leading-relaxed mb-12 text-sm md:text-base max-w-4xl relative z-10">
                            No comércio pulsante de Itaquera, a agilidade é o que define quem cresce. O <strong>Kairós</strong> entrega 12 pilares fundamentais de tecnologia, garantindo que o seu negócio na Zona Leste opere com faturamento otimizado e controle absoluto.
                        </p>

                        <div className="flex flex-col gap-10 max-w-4xl relative z-10">
                            
                            {/* PILAR 1: BARBEARIAS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">1. Sistema de Gestão para Barbearias em Itaquera</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para as barbearias de Itaquera, próximas ao Shopping ou na Radial, a organização é o segredo do lucro. Nosso <strong>sistema de gestão para barbearias</strong> permite agendamentos via link, controle automático de comissões e gestão de estoque, garantindo que sua recepção seja rápida e profissional como o bairro exige.
                                </p>
                            </div>

                            {/* PILAR 2: SALÕES DE BELEZA */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">2. Sistema de Gestão para Salões de Beleza em Itaquera</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Gerenciar um salão em Itaquera exige controle total de horários e profissionais. O <strong>sistema de gestão para salão de beleza</strong> do Kairós organiza pautas individuais, envia lembretes via WhatsApp para reduzir faltas e profissionaliza seu fluxo de caixa, permitindo foco total na beleza das suas clientes.
                                </p>
                            </div>

                            {/* PILAR 3: CLÍNICAS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">3. Sistema de Gestão para Clínicas em Itaquera</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para os consultórios médicos e odontológicos da região, a eficiência é fundamental. Com nosso <strong>sistema de gestão para clínicas</strong>, o paciente de Itaquera agenda consultas online silenciosamente. O software centraliza o histórico e profissionaliza o atendimento da recepção, refletindo confiança e qualidade.
                                </p>
                            </div>

                            {/* PILAR 4: RESTAURANTES */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">4. Sistema de Gestão para Restaurantes (Reservas em Itaquera)</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Aproveite o movimento dos dias de jogos e eventos na Neo Química Arena. Nosso <strong>sistema de gestão para restaurantes</strong> permite reservas online, evitando filas desordenadas e organizando o salão para os horários de maior pico em Itaquera. Melhore a experiência do seu cliente e otimize sua equipe.
                                </p>
                            </div>

                            {/* PILAR 5: TATTOO */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">5. Sistema de Gestão para Studios de Tattoo em Itaquera</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Organize suas sessões de arte com precisão cirúrgica. Com o <strong>sistema de gestão para tatuadores</strong> em Itaquera, seu estúdio organiza blocos de horários, recebe referências no ato da reserva e mantém a gestão financeira totalmente transparente e automatizada.
                                </p>
                            </div>

                            {/* PILAR 6: FOTOGRAFIA */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">6. Sistema de Gestão para Estúdios de Fotografia</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Planeje ensaios externos em Itaquera ou sessões em estúdio com total controle. O <strong>sistema de gestão para fotógrafos</strong> evita conflitos de agenda e centraliza as reservas de pacotes, permitindo que você foque na criatividade enquanto o sistema cuida da pauta.
                                </p>
                            </div>

                            {/* PILAR 7: SERVIÇOS GERAIS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">7. Sistema de Gestão para Autônomos em Itaquera</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Seja para pet shops, mecânicas ou aulas particulares na Zona Leste. Se você vende horas de serviço, nosso <strong>sistema de gestão</strong> é a solução. Organize sua semana em Itaquera com um link profissional que capta clientes 24h por dia de forma automática.
                                </p>
                            </div>

                            {/* PILAR 8: FEATURE - AGENDAMENTO 24H */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">8. Sistema de Gestão com Agendamento 24 Horas: Nunca Mais Perca Clientes</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Em Itaquera, o movimento não para. Com o <strong>sistema de gestão</strong> Kairós, seu cliente agenda quando quiser, mesmo de madrugada. Você acorda com a agenda cheia e confirmada, sem precisar responder mensagens fora do horário.
                                </p>
                            </div>

                            {/* PILAR 9: FEATURE - FIM DO VAIVÉM */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">9. Sistema de Gestão para Fim do Vaivém no WhatsApp em Itaquera</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Pare de gastar horas perguntando "qual horário fica melhor?". O <strong>sistema de gestão</strong> oferece um painel visual intuitivo onde o cliente escolhe o serviço em segundos. Ganhe produtividade e tempo livre no seu dia a dia em Itaquera.
                                </p>
                            </div>

                            {/* PILAR 10: FEATURE - FINANCEIRO */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">10. Sistema de Gestão para Controle Financeiro Profissional na Zona Leste</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Saiba exatamente quanto seu negócio em Itaquera está faturando. Nosso <strong>sistema de gestão</strong> monitora entradas, comissões de colaboradores e gera relatórios precisos para você tomar decisões baseadas em dados reais.
                                </p>
                            </div>

                            {/* PILAR 11: FEATURE - PWA E CELULAR */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">11. Sistema de Gestão com Mobile-First (Direto no Celular)</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Gerencie seu negócio em Itaquera de qualquer lugar. Nosso <strong>sistema de gestão</strong> é otimizado para smartphones, rápido e leve. Controle sua agenda enquanto se desloca pela Radial Leste com total segurança.
                                </p>
                            </div>

                            {/* PILAR 12: FEATURE - WHITE LABEL E SETUP */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">12. Sistema de Gestão com Marca Própria e Teste Grátis em Itaquera</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Reforce sua autoridade local. Personalize sua página de agendamento com sua logo e cores. Experimente o <strong>sistema de gestão</strong> Kairós por 3 dias de forma gratuita e sinta a diferença na organização do seu negócio em Itaquera.
                                </p>
                            </div>

                        </div>
                        
                        <div className="mt-14 flex justify-center md:justify-start relative z-10">
                            <Link href="/cadastro" className="bg-blue-600 text-white px-8 py-4 rounded-full text-base md:text-lg font-bold hover:bg-blue-700 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
                                Iniciar Teste Gratuito em Itaquera
                            </Link>
                        </div>

                    </div>
                </details>

            </div>
        </section>

        {/* --- DICAS DE DIVULGAÇÃO --- */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Domine Itaquera Digitalmente</h2>
              <p className="text-gray-400">Transforme acessos em faturamento real na Zona Leste.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-pink-500 transition-all group hover:-translate-y-2">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram (Bio)</h3>
                <p className="text-sm text-gray-400">Itaquera tem um público fiel e ativo. Tenha seu link Kairós na bio e use o Instagram para converter seguidores em agendamentos reais.</p>
              </div>

              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-green-500 transition-all group hover:-translate-y-2">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp Business</h3>
                <p className="text-sm text-gray-400">Configure sua saudação: "Olá! Para agendar agora em Itaquera, clique no link e escolha seu horário: [Link da Agenda]".</p>
              </div>

              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-blue-500 transition-all group hover:-translate-y-2">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-white mb-2">Google Maps Itaquera</h3>
                <p className="text-sm text-gray-400">Apareça no topo das buscas do Google Maps em Itaquera com um botão de agendamento direto na sua ficha comercial.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- VÍDEO TUTORIAL (PWA) --- */}
        <section className="py-24 bg-gradient-to-t from-black to-[#050505] border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="inline-block bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-500/20 mb-6">
                    Tecnologia Mobile
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tenha o Kairós como App no celular</h2>
                <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                    Acompanhe sua agenda em tempo real, direto da tela inicial. Instale o Kairós em Itaquera em menos de 10 segundos.
                </p>

                <div className="relative rounded-[2.5rem] overflow-hidden border-[8px] border-zinc-800 shadow-2xl bg-black aspect-[9/19] max-w-[320px] mx-auto group">
                    <iframe 
                      src="https://www.youtube.com/embed/Bs-fStk-X9E" 
                      title="Tutorial Kairós App"
                      className="w-full h-full" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                </div>
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
              © 2025 Kairós - Sistema de Gestão Itaquera.
            </div>
          </div>
        </footer>

      </main>

      {/* --- BOTÃO WHATSAPP FLUTUANTE --- */}
      <a 
        href="https://wa.me/5511916053292" 
        target="_blank" 
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl shadow-green-900/30 z-50 transition-all hover:-translate-y-1 flex items-center gap-2 border border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z"/>
        </svg>
      </a>

    </div>
  )
}