import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO DE ALTA DENSIDADE PARA MINAS GERAIS) ---
export const metadata: Metadata = {
  title: "Sistema de Gestão e Agendamento em Minas Gerais | Kairós",
  description: "O melhor sistema de gestão e agendamento online para negócios em Minas Gerais. Automatize sua agenda via WhatsApp e controle seu financeiro em BH e região. Teste grátis!",
  keywords:["sistema de gestão minas gerais", "agendamento online belo horizonte", "software para barbearia bh", "agenda salão de beleza savassi", "gestão de clínicas lourdes bh", "automação comercial MG"],
  alternates: {
    canonical: "https://kairos.egemporiodigital.com.br/sistema-de-gestao/minas-gerais"
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

// --- SCHEMA MARKUP GEO-NICHADO (OFERTA ESTADUAL MG) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kairós - Sistema de Gestão Minas Gerais",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "Teste Grátis de 3 dias sem cartão para negócios em Minas Gerais",
    "eligibleRegion": {
      "@type": "Place",
      "name": "Minas Gerais, BR"
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

export default function MinasGeraisPage() {
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
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide uppercase">Minas Gerais Edition</span>
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
              <span>A Revolução da Gestão em Minas Gerais</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white drop-shadow-2xl">
              Eficiência Mineira Elevada ao <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
                Próximo Nível.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              De BH para todo o estado. Automatize sua agenda, elimine as falhas de comunicação e ofereça uma experiência de reserva digital moderna para seus clientes mineiros.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/cadastro" className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Começar Teste Grátis em MG 🚀
              </Link>
            </div>
          </div>
        </section>

        {/* --- OS 30% EXCLUSIVO LOCAL (HOOK MINAS) --- */}
        <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto bg-[#080b11] border border-blue-900/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">O mercado mineiro valoriza a confiança e a inovação.</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                    <p>
                        Se o seu negócio está na efervescência da <strong>Savassi</strong>, na sofisticação do bairro <strong>Lourdes</strong> ou atendendo a região da <strong>Pampulha</strong>, você sabe que o cliente mineiro exige um atendimento impecável. 
                    </p>
                    <p>
                        Negócios em Belo Horizonte e nas grandes cidades de Minas perdem faturamento mensal porque o processo de agendamento via WhatsApp ainda é lento e burocrático. O cliente moderno não quer mais o "vaivém" de mensagens; ele quer conveniência e rapidez. O <strong>Kairós</strong> foi adaptado para a realidade de MG, oferecendo um <strong>sistema de gestão</strong> robusto que funciona como uma recepção digital 24h, garantindo que sua marca transmita autoridade e que sua agenda esteja sempre preenchida.
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

        {/* --- O SEO ACCORDION TITÂNIO (12 PILARES DENSOS MG) --- */}
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
                                    Tese de Autoridade: Sistema de Gestão em Minas Gerais
                                </h2>
                                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1">
                                    Performance e Automação para Negócios Mineiros
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
                            Em Minas Gerais, a hospitalidade no atendimento precisa estar unida à precisão da gestão moderna. O <strong>Kairós</strong> entrega 12 pilares tecnológicos que garantem que o seu negócio opere com eficiência máxima, eliminando gargalos e profissionalizando cada etapa da jornada do seu cliente mineiro.
                        </p>

                        <div className="flex flex-col gap-10 max-w-4xl relative z-10">
                            
                            {/* PILAR 1: BARBEARIAS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">1. Sistema de Gestão para Barbearias em Minas Gerais</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para as barbearias premium localizadas em BH ou no interior de MG, a organização é o que define o lucro. Nosso <strong>sistema de gestão para barbearias</strong> permite que o cliente mineiro agende cortes e barbas em segundos via link. Você controla as comissões dos barbeiros automaticamente, gerencia o estoque de pomadas e loções e monitora o faturamento diário em tempo real, garantindo uma recepção livre de filas e um caixa sempre em dia.
                                </p>
                            </div>

                            {/* PILAR 2: SALÕES DE BELEZA */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">2. Sistema de Gestão para Salões de Beleza e Estética</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Gerenciar um salão de beleza na <strong>Savassi</strong> ou no <strong>Lourdes</strong> exige precisão com horários de químicas e manicures. O <strong>sistema de gestão para salão de beleza</strong> do Kairós organiza agendas individuais para cada profissional, enviando lembretes automáticos via WhatsApp para as clientes. Isso reduz drasticamente as faltas (No-Show) e profissionaliza o fluxo de caixa, permitindo que você foque no atendimento enquanto a tecnologia cuida da recepção.
                                </p>
                            </div>

                            {/* PILAR 3: CLÍNICAS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">3. Sistema de Gestão para Clínicas e Consultórios</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para os consultórios médicos e odontológicos de Minas Gerais, a pontualidade transmite confiança. Com nosso <strong>sistema de gestão para clínicas</strong>, o paciente realiza o agendamento de consultas de forma autônoma e silenciosa. O software centraliza o histórico de marcações, profissionaliza o atendimento da recepção e garante que sua agenda esteja sempre otimizada, refletindo o alto padrão de cuidado aos seus pacientes.
                                </p>
                            </div>

                            {/* PILAR 4: RESTAURANTES */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">4. Sistema de Gestão para Restaurantes (Reservas)</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Domine a logística de reservas nos polos gastronômicos mineiros. Nosso <strong>sistema de gestão para restaurantes</strong> permite que seus clientes reservem mesas online de forma rápida. Isso evita filas desordenadas na porta, organiza o salão para horários de pico e permite que sua equipe esteja preparada para a demanda real. Melhore a experiência do seu cliente e tenha controle total sobre a ocupação do seu estabelecimento em Minas Gerais.
                                </p>
                            </div>

                            {/* PILAR 5: TATTOO */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">5. Sistema de Gestão para Studios de Tattoo e Piercing</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Sessões de tatuagem longas exigem um controle de pauta cirúrgico. Com o <strong>sistema de gestão para tatuadores</strong>, seu estúdio em BH ou no interior pode organizar blocos de horários para artes complexas e agendamentos rápidos para orçamentos. O cliente envia referências direto no ato da reserva, você organiza sua agenda de forma visual e mantém a gestão financeira totalmente transparente, separando custos de material do lucro real.
                                </p>
                            </div>

                            {/* PILAR 6: FOTOGRAFIA */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">6. Sistema de Gestão para Estúdios de Fotografia</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Organize ensaios externos na <strong>Pampulha</strong> ou sessões em estúdio com total previsibilidade. O <strong>sistema de gestão para fotógrafos</strong> centraliza a escolha de pacotes fotográficos e a reserva de horários. Isso elimina o conflito de agendas e permite que você envie lembretes automáticos sobre locação e vestimentas. Tenha um fluxo de trabalho profissional onde cada clique é planejado e seu faturamento é monitorado automaticamente.
                                </p>
                            </div>

                            {/* PILAR 7: SERVIÇOS GERAIS */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">7. Sistema de Gestão para Autônomos e Serviços Gerais</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Seja para pet shops, serviços de estética automotiva ou escolas de idiomas em Minas. Se o seu modelo de negócio vende horas de serviço, nosso <strong>sistema de gestão para serviços</strong> é a ferramenta certa. Ele organiza sua semana, centraliza pagamentos e gera um link profissional que substitui a necessidade de sites complexos, garantindo que você tenha um fluxo constante de clientes agendados sem esforço manual.
                                </p>
                            </div>

                            {/* PILAR 8: FEATURE - AGENDAMENTO 24H */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">8. Sistema de Gestão com Agendamento 24 Horas Inteligente</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    O público mineiro valoriza a conveniência. Com este <strong>sistema de gestão</strong>, o cliente agenda às 23h voltando do trabalho ou no conforto de casa, visualiza sua disponibilidade real e confirma o horário para o dia seguinte instantaneamente. Pare de perder dinheiro nos momentos de descanso; deixe sua recepção digital trabalhar e faturar por você 24 horas por dia, 7 dias por semana, com total segurança.
                                </p>
                            </div>

                            {/* PILAR 9: FEATURE - FIM DO VAIVÉM */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">9. Sistema de Gestão para Fim do "Vaivém" no WhatsApp</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Elimine de vez o ciclo improdutivo de "qual horário fica melhor?" pelo WhatsApp em MG. O <strong>sistema de gestão</strong> Kairós oferece um painel visual e intuitivo onde o cliente escolhe o serviço e o horário em segundos. Isso economiza até 4 horas semanais de digitação e atendimento repetitivo, permitindo que você ou sua recepção foquem na qualidade técnica e no atendimento presencial VIP aos seus clientes.
                                </p>
                            </div>

                            {/* PILAR 10: FEATURE - FINANCEIRO */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">10. Sistema de Gestão Multi-Profissional com Financeiro</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Para negócios com vários colaboradores em Minas Gerais, o controle financeiro é o alicerce do crescimento. Nosso <strong>sistema de gestão</strong> gerencia as agendas de toda a equipe, emite relatórios de comissões automáticos e mantém seu fluxo de caixa transparente. Tenha acesso a dados sobre ticket médio e performance profissional em tempo real, permitindo decisões estratégicas baseadas em números reais para o seu negócio.
                                </p>
                            </div>

                            {/* PILAR 11: FEATURE - PWA E CELULAR */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">11. Sistema de Gestão Mobile-First (Direto no Celular)</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Sua gestão precisa ser tão móvel quanto a rotina mineira. Nossa arquitetura opera 100% em nuvem e é otimizada para smartphones. Gerencie seu <strong>sistema de gestão</strong> pelo celular enquanto se desloca entre um atendimento e outro. Interface intuitiva, carregamento ultra-rápido e controle total na palma da mão, sem a necessidade de um computador fixo atrapalhando a recepção do seu estabelecimento.
                                </p>
                            </div>

                            {/* PILAR 12: FEATURE - WHITE LABEL E SETUP */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">12. Sistema de Gestão White-label com Teste Grátis</h3>
                                </div>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    Sua autoridade local em Minas Gerais é reforçada por uma tecnologia que carrega sua própria marca. O <strong>sistema de gestão</strong> Kairós permite customização básica para que a página de agendamento seja uma extensão do seu negócio. Experimente nossa plataforma por 3 dias completos de forma gratuita, sem necessidade de cartão de crédito, e veja na prática como a automação vai transformar seu lucro e sua organização.
                                </p>
                            </div>

                        </div>
                        
                        <div className="mt-14 flex justify-center md:justify-start relative z-10">
                            <Link href="/cadastro" className="bg-blue-600 text-white px-8 py-4 rounded-full text-base md:text-lg font-bold hover:bg-blue-700 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
                                Iniciar Teste Gratuito em Minas Gerais
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
              <h2 className="text-3xl font-bold mb-4 text-white">Domine Minas Gerais Digitalmente</h2>
              <p className="text-gray-400">Transforme acessos em faturamento real na sua região.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-pink-500 transition-all group hover:-translate-y-2">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram MG</h3>
                <p className="text-sm text-gray-400">O público mineiro é conectado. Tenha seu link Kairós sempre na bio para converter seguidores em agendamentos reais.</p>
              </div>

              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-green-500 transition-all group hover:-translate-y-2">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp Business</h3>
                <p className="text-sm text-gray-400">Configure sua saudação: "Olá! Para agendar agora em nossa unidade MG, clique aqui: [Link da Agenda]".</p>
              </div>

              <div className="bg-[#080b11] border border-blue-900/30 p-8 rounded-2xl text-center hover:border-blue-500 transition-all group hover:-translate-y-2">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-white mb-2">Google Maps</h3>
                <p className="text-sm text-gray-400">Apareça no topo das buscas do Google Maps em sua cidade mineira com um botão de agendamento direto pelo seu link.</p>
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
                    Acompanhe sua agenda em tempo real, de qualquer lugar. Instale o Kairós na tela inicial em menos de 10 segundos, sem pesar a memória.
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
              © 2025 Kairós - Sistema de Gestão Minas Gerais.
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