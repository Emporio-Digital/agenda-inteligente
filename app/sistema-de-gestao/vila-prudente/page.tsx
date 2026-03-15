import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO DE ALTA DENSIDADE PARA VILA PRUDENTE) ---
export const metadata: Metadata = {
  title: "Sistema de Gestão e Agendamento na Vila Prudente | Kairós",
  description: "O melhor sistema de gestão e agendamento online para negócios na Vila Prudente. Automatize sua agenda via WhatsApp, controle seu financeiro e reduza faltas. Teste grátis!",
  keywords:["sistema de gestão vila prudente", "agendamento online vila prudente", "sistema para barbearia vila prudente", "agenda salão de beleza vila prudente", "software de gestão zona leste", "sistema de agendamento metrô vila prudente"],
  alternates: {
    canonical: "https://kairos.egemporiodigital.com.br/sistema-de-gestao/vila-prudente"
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

// --- SCHEMA MARKUP GEO-NICHADO (OFERTA LOCAL) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kairós - Sistema de Gestão Vila Prudente",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "Teste Grátis de 3 dias sem cartão para negócios na Vila Prudente",
    "eligibleRegion": {
      "@type": "Place",
      "name": "Vila Prudente, São Paulo, SP"
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

export default function VilaPrudentePage() {
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
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide">sua agenda inteligente</span>
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

        {/* --- HERO SECTION (FOCADO NA VILA PRUDENTE) --- */}
        <section className="pt-40 pb-12 px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10 shadow-inner">
              <span>📍</span>
              <span>Liderança em Automação na Vila Prudente</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white drop-shadow-2xl">
              Gestão de Elite para o seu negócio na <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
                Vila Prudente.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Na Zona Leste, a tradição encontra a tecnologia. Deixe seu cliente agendar sozinho via link e transforme seu WhatsApp em uma ferramenta de lucro real na VP.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/cadastro" className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Começar Teste Grátis na Vila Prudente 🚀
              </Link>
            </div>
          </div>
        </section>

        {/* --- OS 30% EXCLUSIVO LOCAL (VILA PRUDENTE) --- */}
        <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto bg-[#080b11] border border-blue-900/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">A aceleração da Vila Prudente exige resposta imediata.</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                    <p>
                        Seja uma barbearia moderna próxima à <strong>Estação Vila Prudente</strong> do Metrô, um salão de estética na <strong>Avenida Paes de Barros</strong>, ou uma clínica especializada ao redor do <strong>Parque Ecológico Vila Prudente</strong>, o comportamento do morador da VP mudou.
                    </p>
                    <p>
                        Negócios na Zona Leste perdem faturamento todos os dias porque o cliente, muitas vezes vindo do trabalho via Linha Verde ou Linha Prata, quer agendar o serviço no trajeto. Se você demora para responder no WhatsApp, ele já fechou com o concorrente. O <strong>Kairós</strong> elimina esse gargalo, oferecendo um <strong>sistema de gestão</strong> completo que trabalha 24h por dia para garantir que sua agenda esteja sempre cheia.
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

        {/* --- O SEO ACCORDION TITÂNIO (12 PILARES DENSOS) --- */}
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
                                    Tese de Autoridade: Sistema de Gestão na Vila Prudente
                                </h2>
                                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1">
                                    Clique para ler sobre nossa tecnologia exclusiva para cada nicho na VP
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
                            Na Vila Prudente, onde o comércio local cresce a passos largos, a digitalização deixou de ser diferencial para se tornar sobrevivência. O <strong>Kairós</strong> foi estruturado sobre 12 pilares fundamentais de tecnologia, garantindo que o seu negócio opere com a eficiência das grandes redes, mantendo o DNA da Zona Leste.
                        </p>

                        <div className="flex flex-col gap-10 max-w-4xl relative z-10">
                            
                            {/* PILAR 1: BARBEARIAS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">1. Sistema de Gestão para Barbearias na Vila Prudente</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para as barbearias próximas à <strong>Avenida Vila Ema</strong> ou no burburinho comercial da Vila Prudente, a agilidade no atendimento é o que define o lucro. Nosso <strong>sistema de gestão para barbearias</strong> permite que o cliente agende o corte de cabelo ou a barba no trajeto do metrô. Você controla as comissões da equipe automaticamente, gerencia o estoque de produtos e analisa o ticket médio de cada serviço, eliminando de vez as filas de espera e o tempo ocioso da sua equipe.
                                </p>
                            </div>

                            {/* PILAR 2: SALÕES DE BELEZA */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">2. Sistema de Gestão para Salões de Beleza e Estética</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Gerenciar um salão na <strong>Paes de Barros</strong> exige precisão absoluta. O <strong>sistema de gestão para salão de beleza</strong> do Kairós oferece agendas individuais para manicures e cabeleireiras, calculando o tempo exato de procedimentos químicos para evitar o choque de horários. Além disso, o software envia lembretes automáticos via WhatsApp para as clientes da região, reduzindo as faltas em até 40% e profissionalizando a recepção do seu negócio.
                                </p>
                            </div>

                            {/* PILAR 3: CLÍNICAS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">3. Sistema de Gestão para Clínicas e Consultórios</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para os consultórios odontológicos e clínicas de estética da Vila Prudente, a organização é o pilar da confiança. Com nosso <strong>sistema de gestão para clínicas</strong>, o paciente agenda consultas de forma autônoma. O software profissionaliza o histórico de agendamentos, envia notificações de confirmação e permite que sua equipe foque no atendimento humanizado, enquanto a tecnologia cuida da burocracia das marcações e da gestão de horários.
                                </p>
                            </div>

                            {/* PILAR 4: RESTAURANTES */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">4. Sistema de Gestão para Restaurantes (Reservas)</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Lotar a casa nas datas especiais é o objetivo de todo restaurante no polo gastronômico da Vila Prudente. O <strong>sistema de gestão para restaurantes</strong> permite que o cliente reserve mesas online, garantindo que você tenha previsibilidade de público. Organize aniversários e jantares sem precisar de uma pessoa dedicada apenas ao telefone, otimizando o fluxo de caixa e a preparação da cozinha para os horários de pico.
                                </p>
                            </div>

                            {/* PILAR 5: TATTOO */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">5. Sistema de Gestão para Studios de Tattoo e Piercing</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Sessões de tatuagem duram horas e exigem planejamento. Com o <strong>sistema de gestão para tatuadores</strong>, seu estúdio na Zona Leste pode bloquear horários de preparação e assepsia entre os clientes. O software organiza sua agenda de forma visual, permite que o cliente envie referências da arte no ato do agendamento e profissionaliza a gestão financeira do seu estúdio, separando o que é lucro do que é custo fixo de material.
                                </p>
                            </div>

                            {/* PILAR 6: FOTOGRAFIA */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">6. Sistema de Gestão para Estúdios de Fotografia</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Aproveite locais como o <strong>Parque Ecológico Vila Prudente</strong> para ensaios externos organizados. Nosso <strong>sistema de gestão para fotógrafos</strong> centraliza a escolha de pacotes fotográficos e a reserva de horários. Isso elimina conflitos de agenda e permite que você envie lembretes automáticos sobre locação e vestimentas, garantindo que o seu fluxo de cliques e edição seja produtivo e livre de desorganização administrativa.
                                </p>
                            </div>

                            {/* PILAR 7: SERVIÇOS GERAIS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">7. Sistema de Gestão para Autônomos e Serviços Gerais</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Seja para pet shops, escolas de idiomas ou serviços de manutenção residencial na Vila Prudente. Se o seu modelo de negócio vende tempo, nosso <strong>sistema de gestão para serviços</strong> é a ferramenta definitiva. Ele organiza sua pauta semanal, centraliza pagamentos e gera um link profissional que substitui a necessidade de um site complexo, simplificando a jornada do seu cliente e aumentando sua autoridade no bairro.
                                </p>
                            </div>

                            {/* PILAR 8: FEATURE - AGENDAMENTO 24H */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">8. Sistema de Gestão com Agendamento 24 Horas Inteligente</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    O morador da Vila Prudente não para após as 18h. Com este <strong>sistema de gestão</strong>, o seu negócio nunca fecha. O cliente pode agendar às 23h, no conforto de casa ou voltando da faculdade, visualizar sua disponibilidade real e confirmar o horário para o dia seguinte instantaneamente. Pare de perder dinheiro nos momentos em que você está descansando: deixe sua recepção digital faturar por você 24 horas por dia.
                                </p>
                            </div>

                            {/* PILAR 9: FEATURE - FIM DO VAIVÉM */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">9. Sistema de Gestão para Fim do "Vaivém" no WhatsApp</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Corte de uma vez por todas o vício de enviar "print da agenda" pelo WhatsApp. O <strong>sistema de gestão</strong> Kairós oferece um painel visual onde o cliente escolhe o serviço e o horário em segundos. Isso economiza horas semanais de digitação improdutiva, permitindo que você foque na excelência técnica do seu trabalho na Vila Prudente e na atenção aos clientes que já estão no seu estabelecimento.
                                </p>
                            </div>

                            {/* PILAR 10: FEATURE - FINANCEIRO */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">10. Sistema de Gestão Multi-Profissional com Financeiro</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para negócios com vários colaboradores na VP, o controle financeiro é vital. Nosso <strong>sistema de gestão</strong> gerencia as agendas de toda a equipe em um só lugar, emite relatórios de comissões por serviço realizado e mantém o seu fluxo de caixa transparente. Saiba exatamente qual profissional traz mais lucro e qual o ticket médio do seu negócio, permitindo decisões baseadas em dados reais para o seu crescimento.
                                </p>
                            </div>

                            {/* PILAR 11: FEATURE - PWA E CELULAR */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">11. Sistema de Gestão Mobile-First (Direto no Celular)</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Sua gestão precisa ser tão móvel quanto você. Nossa arquitetura opera em nuvem e é otimizada para smartphones. Gerencie seu <strong>sistema de gestão</strong> inteiramente pelo celular enquanto se desloca pela Linha Verde ou entre um atendimento e outro. A interface é fluida, intuitiva e pensada para quem não pode perder tempo na frente de um computador fixo no balcão da recepção.
                                </p>
                            </div>

                            {/* PILAR 12: FEATURE - WHITE LABEL E SETUP */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">12. Sistema de Gestão White-label com Teste Grátis</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Sua autoridade local é reforçada por uma tecnologia que leva sua marca. O <strong>sistema de gestão</strong> Kairós permite customização básica para que a página de agendamento seja uma extensão do seu negócio na Vila Prudente. Experimente nossa plataforma por 3 dias completos de forma gratuita, sem necessidade de cartão de crédito, e veja na prática como a automação vai elevar o patamar do seu faturamento regional.
                                </p>
                            </div>

                        </div>
                        
                        <div className="mt-14 flex justify-center md:justify-start relative z-10">
                            <Link href="/cadastro" className="bg-blue-600 text-white px-8 py-4 rounded-full text-base md:text-lg font-bold hover:bg-blue-700 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
                                Iniciar Teste Gratuito na Vila Prudente
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
              <h2 className="text-3xl font-bold mb-4 text-white">Domine a Vila Prudente Digitalmente</h2>
              <p className="text-gray-400">Maximize sua visibilidade na região com o link correto.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-pink-500 transition-all group">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram (Bio)</h3>
                <p className="text-sm text-gray-400">Tenha seu link Kairós sempre disponível na bio e nos stories para converter seguidores da VP em clientes.</p>
              </div>

              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-green-500 transition-all group">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp Business</h3>
                <p className="text-sm text-gray-400">Configure sua saudação: "Olá! Para agendar na nossa unidade Vila Prudente, clique aqui: [Link]".</p>
              </div>

              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-blue-500 transition-all group">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-white mb-2">Google Maps</h3>
                <p className="text-sm text-gray-400">Apareça no topo das buscas do Google Maps Vila Prudente com um botão de agendamento direto pelo link.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- VÍDEO TUTORIAL (PWA) --- */}
        <section className="py-24 bg-gradient-to-t from-black to-[#050505] border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="inline-block bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-500/20 mb-6">
                    Tecnologia de Ponta
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tenha o Kairós como App no celular</h2>
                <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                    Acompanhe sua agenda da Vila Prudente em tempo real. Instale na tela inicial em menos de 10 segundos, sem pesar a memória.
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
              © 2025 Kairós - Sistema de Gestão Vila Prudente.
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