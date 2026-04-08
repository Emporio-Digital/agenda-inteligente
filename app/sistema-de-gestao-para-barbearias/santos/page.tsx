import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO CIRÚRGICO PARA SANTOS) ---
export const metadata: Metadata = {
title: "Sistema de Gestão para Barbearias em Santos | Kairós Agendamentos",
description: "O mais robusto sistema de gestão e agendamento em Santos. Automação de agenda via WhatsApp, controle financeiro e gestão de equipe. Teste grátis!",
keywords: ["sistema de gestão para barbearias", "agendamento online santos", "software para barbearia gonzaga", "agenda barbearia boqueirão", "gestão de barbearias avenida ana costa", "Kairós agendamentos"],
alternates: {
canonical: "https://kairos.egemporiodigital.com.br/sistema-de-gestao-para-barbearias/santos"
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
            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mt-1">Santos • {location}</span>
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

export default function SantosPage() {
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

    {/* --- BACKGROUND --- */}
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
                    📍 O SISTEMA DE AGENDAMENTO Nº 1 DE SANTOS
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
                    Sistema de gestão para barbearias em <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">Santos.</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                    Na maior cidade do litoral paulista, tempo é ouro. Automatize seu agendamento e controle sua barbearia com tecnologia de ponta.
                </p>
                <Link href="/cadastro" className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all">
                    Modernizar minha Barbearia em Santos 🚀
                </Link>
            </div>
        </section>

        {/* --- A REGRA DOS 30% (O GANCHO MANUAL LOCAL) --- */}
        <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-wide italic">Santos exige agilidade: Do Gonzaga à Ponta da Praia.</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                    <p>
                        Para quem comanda uma barbearia na movimentada <strong className="text-blue-400">Avenida Ana Costa</strong> ou está estrategicamente posicionado no <strong className="text-blue-400">Gonzaga</strong>, sabe que o público santista é ágil e não gosta de burocracia. Se o seu cliente precisa esperar você visualizar o WhatsApp entre um corte e outro perto da <strong className="text-blue-400">Praça Independência</strong>, ele certamente já procurou outra opção no bairro vizinho.
                    </p>
                    <p>
                        Atendendo desde os barbeiros do <strong className="text-purple-400">Boqueirão e Embaré</strong> até os novos centros de estética da <strong className="text-purple-400">Ponta da Praia</strong>, o Kairós foi adaptado para a dinâmica da Baixada. O mercado de barbearias em Santos cresceu exponencialmente e a exigência por um agendamento rápido, que funcione até para quem está no 4G da orla, é o que define o sucesso do seu faturamento mensal.
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
                                <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight">Dossiê de Dominação: Kairós em Santos</h2>
                                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic">Clique para ver os 15 pilares de gestão local</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</div>
                    </summary>

                    <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                        <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 1. SISTEMA DE GESTÃO PARA BARBEARIAS com link personalizado, logo e capa em Santos.</h3>
                                <p className="mt-2">Transforme seu link de agendamento em uma vitrine premium para os clientes do Gonzaga ou Boqueirão com personalização total da sua marca. Essa funcionalidade economiza horas de atendimento manual, pois o cliente já visualiza sua estrutura e preços de forma profissional logo no primeiro contato. Enquanto sistemas genéricos são frios, o Kairós valoriza a identidade visual da sua barbearia santista para gerar desejo imediato. Garanta que sua presença digital em Santos seja tão impecável quanto o seu melhor corte de cabelo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 2. SISTEMA DE GESTÃO PARA BARBEARIAS com agendas individuais para cada profissional da equipe.</h3>
                                <p className="mt-2">Gerencie sua equipe na Avenida Ana Costa com total controle através de agendas separadas que evitam qualquer confusão de horários entre seus barbeiros. O benefício prático é a economia de 20 minutos por dia na organização interna, permitindo que cada profissional foque exclusivamente na cadeira. Ao contrário de planilhas confusas, o Kairós oferece clareza absoluta sobre quem está disponível em cada turno na sua barbearia santista. Otimize o fluxo de trabalho do seu time e mantenha a organização de alto nível que a Baixada Santista exige.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 3. SISTEMA DE GESTÃO PARA BARBEARIAS com personalização máxima de serviços, valores e tempos.</h3>
                                <p className="mt-2">Adapte seu catálogo de serviços para o público exigente da Ponta da Praia, definindo durações e preços específicos para cada tipo de procedimento realizado. O controle total da agenda permite que você gerencie sua margem de lucro com precisão, evitando buracos ociosos durante o expediente em Santos. O Kairós se diferencia pela facilidade de editar esses valores em segundos, sem depender de suportes demorados ou burocracia técnica. Tenha a flexibilidade necessária para rodar promoções ou ajustar preços na sua barbearia em Santos com inteligência.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 4. SISTEMA DE GESTÃO PARA BARBEARIAS sem necessidade de cadastro, login ou download para o cliente.</h3>
                                <p className="mt-2">O maior diferencial competitivo para o público de Santos é a eliminação total de barreiras para o agendamento rápido no smartphone. Sabemos que o santista quer resolver a vida enquanto caminha pela orla ou está no café, sem precisar baixar aplicativos pesados ou lembrar de senhas. Com o Kairós, o processo de reserva é concluído sem nenhum tipo de formulário cansativo ou login obrigatório, aumentando sua conversão de novos clientes. Facilite a entrada de faturamento na sua barbearia eliminando a burocracia digital que afasta os consumidores em Santos.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 5. SISTEMA DE GESTÃO PARA BARBEARIAS com agendamento finalizado em menos de 1 minuto.</h3>
                                <p className="mt-2">Proporcione ao seu cliente do bairro Embaré a experiência de marcar um horário com a mesma velocidade de um clique no WhatsApp. Essa agilidade absurda libera sua recepção de ligações constantes e permite um foco total na experiência do cliente presencial em Santos. Enquanto a concorrência se perde em áudios e textos intermináveis, sua barbearia entrega a solução em poucos segundos de navegação intuitiva. Posicione-se como a barbearia mais tecnológica e rápida de Santos, respeitando o tempo de quem frequenta seu espaço.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 6. SISTEMA DE GESTÃO PARA BARBEARIAS com agenda inteligente que evita conflitos de horários.</h3>
                                <p className="mt-2">Elimine definitivamente o risco de agendamentos duplicados na sua unidade da Vila Belmiro com nosso sistema de trava instantânea por milissegundo. O benefício é a paz mental de saber que nenhum barbeiro terá dois clientes marcados para o mesmo horário de pico em Santos. Ao contrário de agendas físicas que falham ou rasuram, o Kairós é cirúrgico na gestão de disponibilidade, garantindo fluidez total na sua operação diária. Mantenha a reputação da sua barbearia impecável em Santos, evitando atrasos causados por erros de marcação manual.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 7. SISTEMA DE GESTÃO PARA BARBEARIAS com fotos reais de cada barbeiro no momento do agendamento.</h3>
                                <p className="mt-2">Humanize a escolha do serviço na sua barbearia em Santos permitindo que o cliente selecione o profissional através de fotos reais de alta qualidade. Essa conexão visual gera confiança imediata e valoriza a marca pessoal de cada colaborador da sua equipe santista antes mesmo do atendimento. O Kairós entende que o setor de estética é visual, por isso priorizamos uma interface bonita e profissional para destacar seus barbeiros talentosos. Fidelize o público de Santos oferecendo uma experiência de escolha moderna e personalizada no seu link de agendamento.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 8. SISTEMA DE GESTÃO PARA BARBEARIAS com dashboard simples e intuitivo para o uso dos funcionários.</h3>
                                <p className="mt-2">Facilite a rotina operacional na sua barbearia no Canal 4 com um painel de controle desenhado para quem não tem tempo a perder com softwares complexos. Seus profissionais em Santos visualizam a próxima tarefa com um simples olhar no celular, otimizando o tempo entre um cliente e outro na cadeira. O Kairós remove todas as distrações visuais desnecessárias que costumam confundir sistemas antigos de gestão. Garanta que sua equipe santista trabalhe com prazer e eficiência usando uma tecnologia que realmente simplifica o dia a dia.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 9. SISTEMA DE GESTÃO PARA BARBEARIAS com atalho de acesso rápido na tela inicial do celular do dono.</h3>
                                <p className="mt-2">Tenha o controle total da sua barbearia no bairro Aparecida na palma da mão, acessando a gestão financeira e a agenda com um único toque. Economize tempo precioso abrindo o sistema instantaneamente sem precisar navegar por menus complexos ou digitar endereços de sites. O Kairós utiliza tecnologia de ponta para funcionar de forma leve e rápida, agindo como um aplicativo nativo sem ocupar espaço no seu smartphone. Monitore o crescimento do seu negócio em Santos de onde você estiver, com a agilidade que um empresário moderno precisa.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 10. SISTEMA DE GESTÃO PARA BARBEARIAS com gestão completa de serviços realizados e histórico detalhado.</h3>
                                <p className="mt-2">Saiba exatamente quais são os serviços mais lucrativos da sua barbearia em Santos e conheça o perfil de consumo dos seus clientes fiéis da Baixada. O benefício prático é poder planejar estratégias de marketing baseadas em dados reais de frequência e ticket médio do seu estabelecimento santista. Diferente de sistemas que escondem as métricas, o Kairós entrega relatórios transparentes para que você tome decisões seguras sobre expansão e investimentos. Domine o mercado de barbearias em Santos utilizando a inteligência de dados a favor do seu faturamento mensal.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 11. SISTEMA DE GESTÃO PARA BARBEARIAS com confirmação de agendamento via WhatsApp em apenas um clique.</h3>
                                <p className="mt-2">Reduza drasticamente o No-Show na sua barbearia no bairro Marapé enviando confirmações profissionais que lembram o cliente do compromisso marcado. Essa funcionalidade recupera até 35% do faturamento que seria perdido por esquecimentos ou faltas não avisadas na sua agenda em Santos. O Kairós automatiza a mensagem, permitindo que você dispare o lembrete profissional para o WhatsApp do cliente em apenas um segundo. Mantenha sua cadeira sempre ocupada e sua agenda confirmada com a comunicação mais eficiente do litoral paulista.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 12. SISTEMA DE GESTÃO PARA BARBEARIAS focado em experiência Mobile-First para clientes de Santos.</h3>
                                <p className="mt-2">Ofereça uma plataforma de agendamento que carrega instantaneamente no celular do seu cliente, mesmo com sinal de internet instável perto da praia. O benefício é uma navegação fluida que garante que o cliente finalize a reserva sem travamentos ou frustrações técnicas em Santos. Enquanto sistemas antigos são pesados e lentos no mobile, o Kairós foi projetado para priorizar o uso em smartphones com máxima velocidade. Conquiste a preferência do público santista oferecendo a melhor e mais moderna interface de agendamento digital da região.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 13. SISTEMA DE GESTÃO PARA BARBEARIAS para eliminar definitivamente o vaivém de mensagens no WhatsApp.</h3>
                                <p className="mt-2">Pare de perder horas respondendo disponibilidades de horários na sua barbearia em Santos e deixe que o link inteligente trabalhe sozinho por você. Automatizar esse processo permite que você recupere sua produtividade e foque 100% no atendimento de excelência para quem já está na barbearia. O Kairós é o antídoto contra a desorganização de áudios e textos infinitos que travam o crescimento do seu negócio santista no dia a dia. Liberte sua equipe da escravidão do celular e profissionalize o fluxo de reservas da sua barbearia em Santos agora mesmo.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 14. SISTEMA DE GESTÃO PARA BARBEARIAS com filtro de relatórios de até 3 meses para controle financeiro.</h3>
                                <p className="mt-2">Tenha uma visão clara e organizada da saúde financeira da sua barbearia em Santos com filtros que mostram o desempenho real do seu faturamento. Controle suas entradas e saídas sem a necessidade de planilhas complexas ou anotações manuais que se perdem ao longo do tempo no litoral. O diferencial do Kairós é traduzir números em gráficos simples para que o dono da barbearia santista entenda exatamente onde está lucrando mais. Planeje o futuro da sua empresa em Santos com base em relatórios financeiros seguros e fáceis de interpretar.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 15. SISTEMA DE GESTÃO PARA BARBEARIAS para modernizar e profissionalizar o seu negócio em Santos.</h3>
                                <p className="mt-2">Eleve o status da sua barbearia em Santos ao nível das maiores referências do mercado nacional com a implementação do sistema Kairós. O ganho de autoridade local é imediato, pois o cliente santista percebe o investimento em tecnologia e organização que você dedicou ao seu espaço. O Kairós enterra definitivamente o amadorismo e coloca sua barbearia na elite digital de Santos, atraindo um público qualificado e fiel. Seja o líder do seu bairro em Santos e modernize sua gestão com a ferramenta mais robusta e eficiente do agendamento online.</p>
                            </div>

                        </div>
                        <div className="mt-14 flex justify-center md:justify-start">
                            <Link href="/cadastro" className="bg-white text-black px-6 py-4 rounded-full font-bold hover:bg-white/90 transition-all shadow-2xl text-center text-sm md:text-base leading-snug max-w-full">
                                Modernizar minha Barbearia em Santos 🚀
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
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-tight">Barbeiros que dominam Santos:</h2>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-yellow-400 font-black">4.9 ★★★★★</div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <GoogleReviewCard name="Carlos H." location="Gonzaga" img="https://i.pravatar.cc/150?u=61" text="O sistema é top demais. No Gonzaga o pessoal é apressado e o link do Kairós resolve o agendamento em segundos." />
                    <GoogleReviewCard name="Marcos V." location="Boqueirão" img="https://i.pravatar.cc/150?u=62" text="Depois que coloquei o sistema aqui no Boqueirão, parei de perder tempo no Whats. Os clientes adoraram a facilidade." />
                    <GoogleReviewCard name="Ricardo P." location="Ponta da Praia" img="https://i.pravatar.cc/150?u=63" text="O financeiro do Kairós é muito simples. Consigo ver tudo o que minha barbearia rendeu no mês aqui na Ponta da Praia." />
                    <GoogleReviewCard name="Sérgio L." location="Embaré" img="https://i.pravatar.cc/150?u=64" text="A confirmação por WhatsApp reduziu muito as faltas aqui na loja do Embaré. Recomendo para todo barbeiro de Santos." />
                </div>
            </div>
        </section>

        {/* --- VÍDEO TUTORIAL --- */}
        <section className="py-24 border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase italic">Sua barbearia em Santos na tela do celular</h2>
                <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Acompanhe sua agenda inteligente em tempo real de qualquer lugar de Santos. Instale em menos de 10 segundos.</p>
                <div className="relative rounded-[2.5rem] overflow-hidden border-[8px] border-zinc-800 shadow-2xl bg-black aspect-[9/19] max-w-[320px] mx-auto group">
                    <iframe src="https://www.youtube.com/embed/qPyu76KGlmw" title="Tutorial Kairós" className="w-full h-full" allowFullScreen></iframe>
                </div>
            </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-black/80 backdrop-blur-xl py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 opacity-50">
                    <img src="/logo.png" alt="Logo Kairós" className="w-6 h-6 object-contain grayscale" />
                    <span className="font-bold text-gray-400 uppercase tracking-widest">Kairós Santos</span>
                </div>
                <div className="flex gap-4">
                    <Link href="/sistema-de-gestao-para-barbearias" className="text-gray-400 font-bold hover:underline">Home do Nicho</Link>
                    <Link href="/" className="text-gray-400 font-bold hover:underline">Página Principal</Link>
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