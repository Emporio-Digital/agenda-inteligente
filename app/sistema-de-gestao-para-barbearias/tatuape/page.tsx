import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO CIRÚRGICO PARA TATUAPÉ) ---
export const metadata: Metadata = {
title: "Sistema de Gestão para Barbearias no Tatuapé | Kairós Agendamentos",
description: "O mais robusto sistema de gestão e agendamento no Tatuapé e Anália Franco. Automação de agenda via WhatsApp, controle financeiro e gestão de equipe. Teste grátis!",
keywords: ["sistema de gestão para barbearias", "agendamento online tatuapé", "software para barbearia tatuapé", "agenda barbearia anália franco", "gestão de barbearias zona leste", "Kairós agendamentos"],
openGraph: { siteName: "Kairós" },
  alternates: {
    canonical: "https://kairos.egemporiodigital.com.br/sistema-de-gestao-para-barbearias/tatuape"
},
icons: { icon: "/logo.png", apple: "/logo.png" },
}

const themes = [
{ name: "Barbearia", img: "https://i.ibb.co/wf70mrq/IMG-9293.jpg", label: "Tema Barbearia" },
{ name: "Salão", img: "https://i.ibb.co/JR4P893D/IMG-9294.jpg", label: "Tema Salão de Beleza" },
{ name: "Restaurante", img: "https://i.ibb.co/wFBtgbwL/IMG-9298.jpg", label: "Tema Restaurante" },
{ name: "Clínica", img: "https://i.ibb.co/pr6s04cB/IMG-2228.jpg", label: "Tema Clínica" },
{ name: "Tattoo", img: "https://i.ibb.co/7Jh8hN6s/IMG-2247.jpg", label: "Tema Studio Tattoo" },
]

const GoogleReviewCard = ({ name, text, img, location }: any) => (
<div className="bg-white p-5 rounded-2xl shadow-xl flex flex-col gap-3 border border-gray-100 transition-all hover:scale-[1.02]">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
            <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-sm leading-none">{name}</span>
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mt-1">Tatuapé • {location}</span>
            </div>
        </div>
        <span className="text-blue-500 font-black text-lg opacity-20">G</span>
    </div>
    <div className="flex text-yellow-400 text-xs">{"★".repeat(5)}</div>
    <p className="text-gray-600 text-[11px] leading-relaxed">"{text}"</p>
    <div className="pt-2 border-t border-gray-50 flex justify-between items-center">
        <span className="text-[9px] text-gray-400 font-medium tracking-tight">Postado há 1 mês</span>
        <span className="text-blue-500 text-[9px] font-extrabold uppercase">Ver no Maps</span>
    </div>
</div>
)

export default function TatuapePage() {
return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden bg-black">

        <style dangerouslySetInnerHTML={{
            __html: `
    @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-scroll-slow { animation: scroll 60s linear infinite; }
    .hover-pause:hover .animate-scroll-slow { animation-play-state: paused; }
    details > summary { list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
    details[open] summary ~ * { animation: fadeInDown 0.5s ease-out forwards; }
    @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    `}} />

        {/* --- BACKGROUND PADRÃO MESTRE --- */}
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-black">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] opacity-60">
                <img src="/logo-fundo.png" alt="" className="w-full h-auto object-contain brightness-125 drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]" />
            </div>
            <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[3px]"></div>
        </div>

        {/* --- NAVBAR --- */}
        <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/5 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                <Link href="/sistema-de-gestao-para-barbearias" className="flex items-center gap-2 md:gap-3 group">
                    <div className="w-14 h-14 md:w-16 md:h-16 relative flex items-center justify-center">
                        <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">Kairós</span>
                        <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide">sua agenda inteligente</span>
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-8">
                    <Link href="/" className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-all uppercase tracking-widest whitespace-nowrap shadow-lg">
                        Inicio
                    </Link>
                    <Link href="/cadastro" className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm font-bold rounded-full border border-blue-500/20 whitespace-nowrap">
                        Teste Grátis
                    </Link>
                </div>
            </div>
        </nav>

        <main className="relative z-10">

            {/* --- HERO SECTION --- */}
            <section className="pt-40 pb-12 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase border border-white/10 shadow-inner">
                        📍 O SISTEMA DE AGENDAMENTO Nº 1 DE TATUAPÉ
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
                        Sistema de gestão para barbearias em <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">Tatuapé.</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                        Na região que mais cresce na Zona Leste, cada segundo no WhatsApp é um cliente perdido. Automatize sua barbearia com tecnologia de elite.
                    </p>
                    <Link href="/cadastro" className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all">
                        Modernizar minha Barbearia no Tatuapé 🚀
                    </Link>
                </div>
            </section>

            {/* --- A REGRA DOS 30% (O GANCHO MANUAL LOCAL) --- */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-wide italic">O Tatuapé não aceita amadorismo operacional.</h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                        <p>
                            Para quem está na <strong className="text-blue-400">Rua Itapura</strong> ou perto da <strong className="text-blue-400">Praça Silvio Romero</strong>, sabe que a concorrência no Tatuapé é pesada. Se o seu cliente demora para ser atendido no WhatsApp enquanto procura um horário, ele agenda na barbearia da próxima esquina no <strong className="text-blue-400">Jardim Anália Franco</strong>.
                        </p>
                        <p>
                            Atendendo não só o coração do bairro, mas também os barbeiros da <strong className="text-purple-400">Vila Carrão, Vila Formosa e Belenzinho</strong>, o Kairós entende que o mercado de barbearias na Zona Leste exige agilidade. Na velocidade da <strong className="text-purple-400">Radial Leste</strong>, sua barbearia precisa oferecer um link de agendamento automático que funcione em 3 cliques ou você estará deixando dinheiro na mesa.
                        </p>
                    </div>
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
            <section className="py-16 overflow-hidden">
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

            {/* --- OS 15 PILARES (O CONTEÚDO ARTESANAL) --- */}
            <section className="py-24 px-6 relative z-20">
                <div className="max-w-6xl mx-auto">
                    <details className="group bg-[#080b11]/80 backdrop-blur-xl border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer">
                        <summary className="flex items-center justify-between p-6 md:p-8 outline-none hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="bg-blue-500/10 text-blue-400 p-2.5 rounded-md border border-blue-500/20 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight">Dossiê de Dominação: Kairós no Tatuapé</h2>
                                    <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic">Clique para ver os 15 pilares de gestão local</p>
                                </div>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</div>
                        </summary>

                        <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                            <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 1. SISTEMA DE GESTÃO PARA BARBEARIAS com link personalizado, logo e capa no Tatuapé.</h3>
                                    <p className="mt-2">Crie uma presença digital de impacto para sua barbearia no Jardim Anália Franco com um link que reflete sua marca. O benefício é a autoridade imediata que você transmite ao cliente da Zona Leste que busca exclusividade e bom gosto. O Kairós permite customização total da vitrine de agendamento, fugindo do visual "padrão" de sistemas burocráticos e travados. Domine a região com um sistema que é a cara do seu negócio premium no Tatuapé.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 2. SISTEMA DE GESTÃO PARA BARBEARIAS com agendas individuais para cada profissional da equipe.</h3>
                                    <p className="mt-2">Organize seu time de barbeiros na Rua Tuiuti com painéis de horários independentes e totalmente sincronizados. Isso economiza pelo menos 30 minutos de gestão diária que você gastaria consultando disponibilidades individuais manualmente. Enquanto a concorrência se atrapalha com agendas de papel, o Kairós separa cada profissional de forma clara e visual. Garanta que sua operação no Tatuapé rode sem conflitos de horários e com produtividade máxima.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 3. SISTEMA DE GESTÃO PARA BARBEARIAS com personalização máxima de serviços, valores e tempos.</h3>
                                    <p className="mt-2">Adapte seus preços e tempos de execução para o público da Praça Silvio Romero com flexibilidade total no sistema. Você tem o controle prático de definir margens de lucro diferentes para barba, cabelo ou serviços de estética masculina. Diferente de plataformas rígidas, o Kairós deixa você alterar valores e durações em segundos conforme a demanda do bairro. Posicione sua barbearia no Tatuapé como uma empresa moderna que sabe cobrar pelo valor que entrega.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 4. SISTEMA DE GESTÃO PARA BARBEARIAS sem necessidade de cadastro, login ou download para o cliente.</h3>
                                    <p className="mt-2">O segredo para converter agendamentos na Rua Itapura é remover toda e qualquer barreira técnica para o seu cliente. Ninguém no Tatuapé quer baixar aplicativos pesados ou preencher formulários infinitos só para marcar um corte de cabelo. Com o Kairós, o processo é direto: clicou, escolheu, agendou, sem burocracia alguma de logins ou senhas. Aumente sua taxa de conversão local facilitando a vida de quem realmente paga as suas contas.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 5. SISTEMA DE GESTÃO PARA BARBEARIAS com agendamento finalizado em menos de 1 minuto.</h3>
                                    <p className="mt-2">Ofereça ao seu cliente do Anália Franco a conveniência de agendar enquanto ele caminha pelo Shopping ou espera no trânsito. A velocidade do sistema libera sua recepção para focar no atendimento presencial de alta qualidade que o bairro exige. Enquanto outros barbeiros perdem tempo digitando no WhatsApp, seu cliente resolve tudo de forma autônoma e instantânea. Mostre que sua barbearia no Tatuapé valoriza o tempo de quem frequenta o seu espaço.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 6. SISTEMA DE GESTÃO PARA BARBEARIAS com agenda inteligente que evita conflitos de horários.</h3>
                                    <p className="mt-2">Acabe com os erros de agendamento duplo na sua unidade da Rua Serra de Japi com nosso algoritmo de trava instantânea. O benefício prático é a eliminação total do estresse causado por dois clientes marcados no mesmo minuto para o mesmo profissional. O Kairós funciona com precisão cirúrgica, atualizando a disponibilidade em tempo real para todos os usuários do sistema. Mantenha a organização da sua barbearia paulistana impecável e evite qualquer tipo de reclamação por atraso.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 7. SISTEMA DE GESTÃO PARA BARBEARIAS com fotos reais de cada barbeiro no momento do agendamento.</h3>
                                    <p className="mt-2">Dê um rosto ao serviço da sua barbearia na Vila Gomes Cardim e gere conexão imediata com o seu público local. Permitir que o cliente escolha o barbeiro pela foto aumenta a confiança e a pessoalidade do atendimento digital. O Kairós destaca a estética do seu time, valorizando o profissionalismo de cada colaborador perante o cliente do Tatuapé. Diferencie-se das barbearias amadoras criando um catálogo visual moderno e humano para o seu agendamento.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 8. SISTEMA DE GESTÃO PARA BARBEARIAS com dashboard simples e intuitivo para o uso dos funcionários.</h3>
                                    <p className="mt-2">Garanta que sua equipe no Tatuapé utilize a tecnologia a favor do trabalho, com um painel que não requer treinamento. O benefício é uma rotina mais fluida, onde o barbeiro sabe exatamente qual é o próximo cliente sem precisar perguntar na recepção. O Kairós foi desenhado para ser "limpo", removendo distrações e focando apenas no que é essencial para o fluxo da loja. Profissionalize sua operação na Zona Leste com uma ferramenta que seus funcionários vão amar usar.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 9. SISTEMA DE GESTÃO PARA BARBEARIAS com atalho de acesso rápido na tela inicial do celular do dono.</h3>
                                    <p className="mt-2">Monitore o faturamento e a agenda da sua barbearia no Tatuapé enquanto se desloca pela Radial Leste com total facilidade. Economize tempo acessando o sistema como se fosse um aplicativo nativo, mas com a leveza e rapidez da tecnologia PWA. O Kairós coloca o controle da sua empresa a um toque de distância, permitindo ajustes rápidos de onde você estiver. Esteja sempre presente na gestão do seu negócio, mesmo quando não estiver fisicamente na barbearia.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 10. SISTEMA DE GESTÃO PARA BARBEARIAS com gestão completa de serviços realizados e histórico detalhado.</h3>
                                    <p className="mt-2">Entenda o comportamento dos seus clientes no Tatuapé e saiba quais serviços geram mais lucro no final do mês. O benefício é ter dados concretos para criar promoções ou ajustar o mix de serviços da sua barbearia com inteligência. Diferente de anotações manuais que se perdem, o Kairós armazena cada atendimento para consultas estratégicas futuras. Baseie o crescimento da sua barbearia na Zona Leste em números reais e pare de tomar decisões no escuro.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 11. SISTEMA DE GESTÃO PARA BARBEARIAS com confirmação de agendamento via WhatsApp em apenas um clique.</h3>
                                    <p className="mt-2">Reduza drasticamente o No-Show na sua barbearia da Vila Regente Feijó enviando lembretes automáticos para os clientes. Essa função recupera faturamentos que seriam perdidos por esquecimento, mantendo sua cadeira sempre ocupada e produtiva. O Kairós facilita o envio: com um clique a mensagem está pronta para ser disparada para o WhatsApp do cliente paulistano. Profissionalize a comunicação da sua barbearia no Tatuapé e veja a inadimplência de horários despencar.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 12. SISTEMA DE GESTÃO PARA BARBEARIAS focado em experiência Mobile-First para clientes do Tatuapé.</h3>
                                    <p className="mt-2">Ofereça uma interface de agendamento que voa no celular do seu cliente, mesmo se ele estiver usando o Wi-Fi do Metrô Tatuapé. O benefício é uma navegação fluida que não trava, garantindo que o cliente complete a reserva do horário sem frustrações. Enquanto sistemas antigos são lentos no mobile, o Kairós foi construído para priorizar o smartphone do seu público local. Ganhe a preferência do Tatuapé oferecendo a melhor e mais rápida experiência tecnológica da região.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 13. SISTEMA DE GESTÃO PARA BARBEARIAS para eliminar definitivamente o vaivém de mensagens no WhatsApp.</h3>
                                    <p className="mt-2">Pare de ser escravo do celular na sua barbearia da Rua Emílio Mallet e deixe o sistema trabalhar por você 24 horas por dia. Automatizar a agenda permite que você foque 100% no corte e no atendimento de quem já está dentro da sua loja. O Kairós resolve a burocracia de responder horários disponíveis, enviando o link e deixando o cliente escolher sozinho. Recupere sua paz mental no Tatuapé e aumente sua produtividade eliminando conversas improdutivas.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 14. SISTEMA DE GESTÃO PARA BARBEARIAS com filtro de relatórios de até 3 meses para controle financeiro.</h3>
                                    <p className="mt-2">Tenha uma visão panorâmica da saúde financeira da sua barbearia no Belenzinho ou Tatuapé com filtros de datas precisos. Controle entradas, saídas e comissões de forma organizada, sem a necessidade de planilhas complexas de Excel. O diferencial do Kairós é entregar relatórios que qualquer dono de barbearia consegue ler e entender em segundos. Mantenha suas contas em dia no Tatuapé e planeje seus próximos investimentos com total segurança financeira.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 15. SISTEMA DE GESTÃO PARA BARBEARIAS para modernizar e profissionalizar o seu negócio no Tatuapé.</h3>
                                    <p className="mt-2">Eleve o patamar da sua barbearia na Zona Leste e seja reconhecido como o estabelecimento mais moderno e organizado do bairro. O ganho de autoridade é imediato: o cliente percebe que você investe em tecnologia para oferecer o melhor atendimento possível. O Kairós enterra o amadorismo das agendas de papel e coloca sua barbearia na elite digital de São Paulo. Domine o Tatuapé com uma gestão de excelência que atrai os clientes mais exigentes da capital.</p>
                                </div>

                            </div>
                            <div className="mt-14 flex justify-center md:justify-start">
                                <Link href="/cadastro" className="bg-blue-600 text-white px-6 py-4 rounded-2xl md:rounded-full font-bold hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] text-center text-sm md:text-base leading-snug max-w-full">
                                    Quero mais clientes na minha barbearia agora
                                </Link>
                            </div>
                        </div>
                    </details>
                </div>
            </section>

            {/* --- DEPOIMENTOS --- */}
            <section className="py-24 px-6 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-tight">Barbeiros que dominam o Tatuapé:</h2>
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-yellow-400 font-black">4.9 ★★★★★</div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <GoogleReviewCard name="Felipe G." location="Anália Franco" img="https://i.pravatar.cc/150?u=11" text="Instalei na barbearia aqui no Anália e o agendamento voou. O cliente do Tatuapé não tem paciência pra esperar no Whats." />
                        <GoogleReviewCard name="Bruna S." location="Rua Itapura" img="https://i.pravatar.cc/150?u=12" text="O Kairós é cirúrgico. Minha agenda na Itapura tá sempre cheia e confirmada com o link." />
                        <GoogleReviewCard name="Amanda R." location="Silvio Romero" img="https://i.pravatar.cc/150?u=13" text="Agilidade nota 10. O pessoal que frequenta a Silvio Romero quer resolver tudo rápido no celular." />
                        <GoogleReviewCard name="Thiago M." location="Vila Carrão" img="https://i.pravatar.cc/150?u=14" text="Melhor sistema que já usei na Zona Leste. Financeiro e agenda num lugar só, recomendo." />
                    </div>
                </div>
            </section>

            {/* --- VÍDEO TUTORIAL (Link Corrigido e Fixado) --- */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase italic">Sua barbearia no Tatuapé na tela do celular</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Acompanhe sua agenda inteligente em tempo real. Instale na tela inicial em menos de 10 segundos.</p>
                    <div className="relative rounded-[2.5rem] overflow-hidden border-[8px] border-zinc-800 shadow-2xl bg-black aspect-[9/19] max-w-[320px] mx-auto group">
                        <iframe src="https://www.youtube.com/embed/qPyu76KGlmw" title="Tutorial Kairós" className="w-full h-full" allowFullScreen></iframe>
                    </div>
                </div>
            </section>

            {/* --- FOOTER (ATUALIZADO) --- */}
        <footer className="bg-zinc-950/80 backdrop-blur-xl pt-16 pb-8 border-t border-white/5 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* CABEÇALHO DO RODAPÉ - LOGOS */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-12 pb-12 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo Kairós" className="w-12 h-12 object-contain" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Kairós</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Sua agenda inteligente</span>
                    </div>
                </div>
                <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-4"></div>
                <div className="flex flex-col items-center md:items-start opacity-70">
                    <span className="text-[10px] text-gray-300 uppercase font-bold tracking-widest mb-1">Uma solução do grupo</span>
                    <Link href="https://egemporiodigital.com.br" target="_blank" className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                        EG EMPÓRIO DIGITAL
                    </Link>
                </div>
            </div>

            {/* GRID DE CONTEÚDO (ESTILO TRINKS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
                
                {/* COLUNA 1 - INSTITUCIONAL */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest">Institucional</h4>
                    <ul className="flex flex-col gap-3 text-sm text-gray-400 font-medium">
                        <li><Link href="https://egemporiodigital.com.br/sobre" target="_blank" className="hover:text-white transition-colors">Sobre a EG Empório Digital</Link></li>
                        <li><Link href="https://egemporiodigital.com.br/servicos" target="_blank" className="hover:text-white transition-colors">Nossos Serviços</Link></li>
                        <li><Link href="https://egemporiodigital.com.br/saas" target="_blank" className="hover:text-white transition-colors">Outras Automações</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                    </ul>
                </div>

                {/* COLUNA 2 - HUB DE SOLUÇÕES */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest">Conheça</h4>
                    <ul className="flex flex-col gap-3 text-sm text-gray-400 font-medium">
                        <li><Link href="/sistema-de-gestao-para-barbearias" className="hover:text-white transition-colors text-white font-bold tracking-tight">💈 Gestão de Barbearias</Link></li>
                    </ul>
                </div>

                {/* COLUNA 3 - COMERCIAL E REDES */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest">Comercial</h4>
                    <ul className="flex flex-col gap-3 text-sm text-gray-400 font-medium mb-4">
                        <li><Link href="/cadastro" className="hover:text-white transition-colors font-bold text-blue-400">Teste Grátis</Link></li>
                        <li><Link href="#planos" className="hover:text-white transition-colors">Planos e Preços</Link></li>
                    </ul>
                    
                    <h4 className="text-blue-500 font-black uppercase text-[10px] tracking-widest mb-2">Siga-nos</h4>
                    <div className="flex justify-center md:justify-start gap-4">
                        <Link href="https://instagram.com/eg.emporio.digital" target="_blank" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all group">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* COLUNA 4 - APP / STATUS */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest">Tecnologia</h4>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl mt-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Sistema</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-white">Kairós</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RODAPÉ FINAL - COPYRIGHT */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                    © EG EMPÓRIO DIGITAL
                </p>
            </div>

          </div>
        </footer>

        </main>

        {/* --- WHATSAPP FLOAT --- */}
        <a href="https://wa.me/5511916053292" target="_blank" className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z" /></svg>
        </a>
    </div>
)
}