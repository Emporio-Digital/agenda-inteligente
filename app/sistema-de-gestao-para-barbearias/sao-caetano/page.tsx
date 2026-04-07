import Link from "next/link"
import { Metadata } from "next"

// --- METADATA (SEO CIRÚRGICO PARA SÃO CAETANO DO SUL) ---
export const metadata: Metadata = {
title: "Sistema de Gestão para Barbearias em São Caetano do Sul | Kairós Agendamentos",
description: "O mais robusto sistema de gestão e agendamento em São Caetano do Sul. Automação de agenda via WhatsApp, controle financeiro e gestão de equipe. Teste grátis!",
keywords: ["sistema de gestão para barbearias", "agendamento online são caetano", "software para barbearia abc", "agenda barbearia santa paula", "gestão de barbearias avenida goiás", "Kairós agendamentos"],
alternates: {
    canonical: "https://kairos.egemporiodigital.com.br/sistema-de-gestao-para-barbearias/sao-caetano-do-sul"
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
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mt-1">São Caetano • {location}</span>
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

export default function SaoCaetanoPage() {
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
                        📍 O SISTEMA DE AGENDAMENTO Nº 1 DE SÃO CAETANO
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
                        Sistema de gestão para barbearias em <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">São Caetano.</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                        Domine a gestão da sua barbearia na cidade com o maior IDH do Brasil. Tecnologia de ponta para um público que exige exclusividade.
                    </p>
                    <Link href="/cadastro" className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all">
                        Modernizar minha Barbearia em São Caetano do Sul 🚀
                    </Link>
                </div>
            </section>

            {/* --- A REGRA DOS 30% (O GANCHO MANUAL LOCAL) --- */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-wide italic">São Caetano do Sul exige um padrão de elite.</h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                        <p>
                            Para quem comanda uma barbearia premium na <strong className="text-blue-400">Avenida Goiás</strong> ou nas imediações da <strong className="text-blue-400">Avenida Kennedy</strong>, sabe que o cliente do ABC é extremamente criterioso. Se o agendamento na sua unidade do <strong className="text-blue-400">Bairro Santa Paula</strong> for burocrático ou lento, o cliente não pensará duas vezes antes de buscar outra opção no Espaço Cerâmica.
                        </p>
                        <p>
                            Atendendo não só o centro, mas também os barbeiros dos bairros <strong className="text-purple-400">Barcelona, Santa Maria e Olímpico</strong>, o Kairós foi projetado para elevar o nível da sua gestão. O mercado de barbearias em São Caetano do Sul é um dos mais competitivos do estado e a automação não é mais um luxo, é sobrevivência. Profissionalize seu faturamento e sua agenda com o sistema que entende a sofisticação de São Caetano.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SEÇÃO DE DIFERENCIAIS (DESIGN GLASSMORPHISM IDENTICO AO EXEMPLO) --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                {/* Elemento de fundo para dar o efeito de transparência (Blur que aparece atrás dos cards) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            Simples como deve ser.
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
                                    Cada barbeiro tem sua própria agenda com serviços, preços e tempos de execução específicos. Organize seu time com liberdade total e zero conflitos.
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
                                    Seu cliente agenda sem precisar baixar aplicativos ou criar contas chatas. O caminho mais rápido entre o desejo do cliente e a sua cadeira.
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
                                    Link exclusivo com sua logo, capa e URL própria. Reduza faltas enviando confirmações pelo WhatsApp com apenas um toque rápido.
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
                                    <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-white leading-tight">Dossiê de Dominação: Kairós em São Caetano</h2>
                                    <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1 italic">Clique para ver os 15 pilares de gestão local</p>
                                </div>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-gray-700 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-500 bg-black/50 text-gray-400">▼</div>
                        </summary>

                        <div className="px-6 md:px-12 py-10 bg-[#030407] border-t border-white/5 relative">
                            <div className="grid grid-cols-1 gap-12 max-w-4xl relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 1. SISTEMA DE GESTÃO PARA BARBEARIAS com link personalizado, logo e capa em São Caetano do Sul.</h3>
                                    <p className="mt-2">Tenha uma vitrine digital de altíssimo nível para sua barbearia no bairro Santa Paula com um link que transmite luxo e organização. O benefício prático é a construção de uma marca forte em São Caetano do Sul, atraindo o público que valoriza detalhes visuais. Enquanto outros sistemas oferecem páginas genéricas, o Kairós permite que você estampe sua logo e cores com total destaque digital. Eleve o padrão da sua barbearia no ABC e seja reconhecido como a referência de sofisticação da região.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 2. SISTEMA DE GESTÃO PARA BARBEARIAS com agendas individuais para cada profissional da equipe.</h3>
                                    <p className="mt-2">Gerencie seu time de especialistas na Avenida Goiás com calendários exclusivos que eliminam qualquer erro de comunicação entre barbeiros. O ganho de tempo é real: você economiza 30 minutos diários de recepção que seriam gastos conferindo disponibilidades por telefone ou WhatsApp. Diferente de agendas manuais ou planilhas confusas, o Kairós separa as agendas com clareza absoluta e sincronização imediata. Mantenha a operação da sua barbearia em São Caetano do Sul rodando com a precisão que um negócio de elite exige.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 3. SISTEMA DE GESTÃO PARA BARBEARIAS com personalização máxima de serviços, valores e tempos.</h3>
                                    <p className="mt-2">Ajuste seu menu de serviços para o público da Avenida Kennedy, definindo preços e durações precisas para cada procedimento realizado. O controle total da sua margem de lucro garante que sua barbearia em São Caetano do Sul cresça com saúde financeira e previsibilidade de caixa. O diferencial do Kairós é permitir alterações instantâneas sem a necessidade de suporte técnico lento ou processos burocráticos internos. Domine o mercado de São Caetano oferecendo serviços customizados que atendem exatamente ao desejo do seu cliente local.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 4. SISTEMA DE GESTÃO PARA BARBEARIAS sem necessidade de cadastro, login ou download para o cliente.</h3>
                                    <p className="mt-2">O segredo para converter o cliente de São Caetano do Sul é oferecer velocidade máxima no agendamento sem barreiras técnicas irritantes. Sabemos que o público do ABC não quer perder tempo baixando apps ou criando contas novas só para marcar um horário de barba. Com o Kairós, o cliente acessa seu link, escolhe o horário e finaliza tudo em segundos, sem burocracia alguma de formulários. Essa facilidade garante uma taxa de conversão imbatível para sua barbearia, deixando a concorrência para trás na preferência do cliente.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 5. SISTEMA DE GESTÃO PARA BARBEARIAS com agendamento finalizado em menos de 1 minuto.</h3>
                                    <p className="mt-2">Proporcione ao cliente do bairro Barcelona a experiência de agendar um corte enquanto ele espera o elevador ou está em uma reunião. A agilidade do Kairós libera sua recepção para focar no acolhimento físico do cliente, automatizando 100% da parte operacional da agenda. Enquanto outros barbeiros de São Caetano perdem tempo digitando no WhatsApp, seu cliente resolve a vida em 3 cliques rápidos. Mostre que sua barbearia valoriza o tempo do público de São Caetano do Sul com a tecnologia mais veloz disponível.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 6. SISTEMA DE GESTÃO PARA BARBEARIAS com agenda inteligente que evita conflitos de horários.</h3>
                                    <p className="mt-2">Elimine definitivamente o risco de agendamentos duplos na sua unidade da Rua Visconde de Inhaúma com nossa tecnologia de trava automática. O benefício é a paz mental de saber que seu barbeiro nunca terá dois clientes marcados para o mesmo minuto de trabalho intenso. O Kairós sincroniza as informações no ato do agendamento, bloqueando o horário instantaneamente para qualquer outro usuário do sistema. Mantenha a reputação da sua barbearia em São Caetano do Sul impecável e livre de reclamações por falhas operacionais.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 7. SISTEMA DE GESTÃO PARA BARBEARIAS com fotos reais de cada barbeiro no momento do agendamento.</h3>
                                    <p className="mt-2">Humanize sua presença digital na Vila Gerty permitindo que o cliente selecione o profissional visualizando sua foto real de perfil. Isso gera uma conexão imediata e aumenta a taxa de fidelidade, pois o cliente já sabe exatamente quem o atenderá antes de entrar na loja. O Kairós valoriza o visual do seu time de São Caetano do Sul, transmitindo muito mais profissionalismo que sistemas que usam apenas nomes. Transforme seu link de agendamento em uma vitrine de talentos que atrai e retém o público do ABC Paulista.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 8. SISTEMA DE GESTÃO PARA BARBEARIAS com dashboard simples e intuitivo para o uso dos funcionários.</h3>
                                    <p className="mt-2">Facilite a rotina operacional da sua equipe no Bairro Olímpico com um painel de controle que dispensa treinamentos longos ou complexos. Seus barbeiros visualizam a próxima tarefa do dia em segundos, otimizando o fluxo de atendimento e a limpeza das cadeiras. O Kairós foca na usabilidade prática para o dia a dia pesado, removendo botões inúteis que apenas confundem softwares tradicionais de mercado. Garanta que sua barbearia em São Caetano do Sul tenha uma operação fluida onde todos os colaboradores amam usar o sistema.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 9. SISTEMA DE GESTÃO PARA BARBEARIAS com atalho de acesso rápido na tela inicial do celular do dono.</h3>
                                    <p className="mt-2">Tenha o controle total da sua barbearia em São Caetano na palma da mão, acessando a agenda inteligente com apenas um toque rápido. Economize tempo precioso abrindo o sistema instantaneamente sem precisar digitar endereços ou buscar em abas perdidas do seu navegador. O Kairós opera com tecnologia PWA, sendo muito mais leve e rápido que aplicativos nativos que travam ou ocupam muita memória. Esteja sempre à frente na gestão do seu negócio no ABC, monitorando cada movimento da sua loja de onde você estiver.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 10. SISTEMA DE GESTÃO PARA BARBEARIAS com gestão completa de serviços realizados e histórico detalhado.</h3>
                                    <p className="mt-2">Entenda exatamente o que o público de São Caetano do Sul mais consome na sua barbearia e quem são seus clientes vips de maior retorno. O benefício prático é poder planejar promoções cirúrgicas e investimentos em estoque baseados em dados reais de faturamento. Diferente de cadernos ou planilhas, o Kairós organiza cada atendimento realizado em um banco de dados seguro e fácil de consultar. Baseie o crescimento da sua barbearia no ABC em informações sólidas e estratégicas, eliminando de vez os achismos na gestão.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 11. SISTEMA DE GESTÃO PARA BARBEARIAS com confirmação de agendamento via WhatsApp em apenas um clique.</h3>
                                    <p className="mt-2">Reduza as faltas na sua barbearia do Bairro Mauá enviando lembretes profissionais de agendamento de forma semi-automática e veloz. Essa funcionalidade diminui o No-Show em até 40%, garantindo que seu faturamento diário em São Caetano não seja prejudicado por esquecimentos. O Kairós simplifica tudo: basta clicar no ícone do horário e a mensagem já sai pronta para o WhatsApp do seu cliente paulistano. Profissionalize sua comunicação no ABC e mantenha sua agenda sempre cheia e lucrativa com eficiência máxima.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 12. SISTEMA DE GESTÃO PARA BARBEARIAS focado em experiência Mobile-First para clientes de São Caetano.</h3>
                                    <p className="mt-2">Oferecemos a melhor interface de agendamento mobile do mercado para que seu cliente de São Caetano do Sul tenha prazer em agendar. O benefício é uma navegação fluida e rápida que funciona perfeitamente em qualquer smartphone, mesmo em conexões de internet móvel instáveis. Enquanto sistemas antigos são pesados e difíceis de usar no celular, o Kairós foi desenhado primeiro para a tela pequena. Ganhe a preferência do público exigente de São Caetano oferecendo a jornada tecnológica mais moderna da região.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 13. SISTEMA DE GESTÃO PARA BARBEARIAS para eliminar definitivamente o vaivém de mensagens no WhatsApp.</h3>
                                    <p className="mt-2">Pare de perder 3 horas do seu dia respondendo "tem horário para hoje?" na sua barbearia em São Caetano do Sul e automatize sua agenda. Deixar o sistema trabalhar para você permite que sua equipe foque 100% no corte de cabelo e no atendimento premium ao cliente. O Kairós é o antídoto contra a burocracia de áudios e textos intermináveis que travam a produtividade da sua recepção em horários de pico. Recupere sua paz mental e sua produtividade no ABC deixando a tecnologia cuidar das suas reservas.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 14. SISTEMA DE GESTÃO PARA BARBEARIAS com filtro de relatórios de até 3 meses para controle financeiro.</h3>
                                    <p className="mt-2">Tenha uma visão clara e transparente do fluxo de caixa da sua barbearia em São Caetano com relatórios financeiros precisos. Controle o faturamento bruto e analise o crescimento do seu negócio mês a mês sem precisar de planilhas de Excel complexas ou confusas. O diferencial do Kairós é traduzir números em informações estratégicas simples para que o dono tome decisões de investimento seguras. Mantenha as finanças da sua barbearia no ABC sob controle total com relatórios intuitivos e profissionais.</p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white uppercase flex items-center gap-2"><div className="w-1 h-5 bg-blue-500 rounded-full"></div> 15. SISTEMA DE GESTÃO PARA BARBEARIAS para modernizar e profissionalizar o seu negócio em São Caetano do Sul.</h3>
                                    <p className="mt-2">Eleve sua barbearia ao patamar das maiores redes do Brasil e seja reconhecido como o estabelecimento mais moderno de São Caetano. O ganho de autoridade local é imediato quando os clientes percebem que você utiliza tecnologia de ponta para gerenciar o agendamento deles. O Kairós remove definitivamente o amadorismo das anotações em papel e coloca sua barbearia na era da automação digital completa. Seja o líder de mercado no seu bairro em São Caetano do Sul e conquiste os clientes de maior ticket médio da cidade.</p>
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
                        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-tight">Barbeiros que dominam São Caetano:</h2>
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-yellow-400 font-black">4.9 ★★★★★</div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <GoogleReviewCard name="Arthur M." location="Santa Paula" img="https://i.pravatar.cc/150?u=41" text="Minha barbearia no Santa Paula subiu de nível. O sistema é muito rápido e o público de São Caetano adorou não precisar baixar app." />
                        <GoogleReviewCard name="Gabriela S." location="Avenida Goiás" img="https://i.pravatar.cc/150?u=42" text="Na Goiás a correria é grande. O Kairós automatizou minha agenda e o financeiro é o mais simples que já usei. Recomendo demais!" />
                        <GoogleReviewCard name="Felipe R." location="Barcelona" img="https://i.pravatar.cc/150?u=43" text="O melhor sistema para o ABC. Os relatórios de comissão me ajudaram muito a organizar a equipe aqui no Barcelona." />
                        <GoogleReviewCard name="Marcia T." location="Santa Maria" img="https://i.pravatar.cc/150?u=44" text="Reduzi as faltas em 50% só com a confirmação via WhatsApp. O cliente de São Caetano valoriza esse profissionalismo." />
                    </div>
                </div>
            </section>

            {/* --- VÍDEO TUTORIAL --- */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase italic">Sua barbearia em São Caetano na tela do celular</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Acompanhe sua agenda inteligente em tempo real. Instale na tela inicial em menos de 10 segundos.</p>
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
                        <span className="font-bold text-gray-400 uppercase tracking-widest">Kairós São Caetano</span>
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