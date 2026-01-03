import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* LOGO + NOME + SLOGAN */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center">
                <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">Kairós</span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide">sua agenda inteligente</span>
            </div>
          </div>

          {/* BOTÕES NAV (Ajustado para Mobile) */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/login" className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors block">
              Entrar
            </Link>
            <Link 
              href="/cadastro" 
              className="bg-blue-600 text-white px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm md:font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-900/20 font-bold"
            >
              Teste Grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* FRASE TOPO AJUSTADA (Nº 1) */}
          <div className="inline-flex items-center gap-2 bg-zinc-900 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-zinc-800">
            <span>🚀</span>
            <span>O sistema de agendamento Nº 1 do mercado</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Sua agenda cheia. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Sua vida tranquila.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Agendamento em 1 minuto. Seu cliente escolhe o profissional, o serviço e o horário. Simples e sem cadastro chato.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/cadastro" 
              className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Começar Agora 🚀
            </Link>
          </div>

          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold pt-4">
            Teste grátis de 3 dias • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* --- COMO FUNCIONA (Ícones Neutros) --- */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Simples como deve ser.</h2>
            <p className="text-gray-400">Tudo automático, 24 horas por dia.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* PASSO 1 - ÍCONE NEUTRO (USUÁRIO) */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:border-blue-900 transition-all">
              <span className="relative text-4xl mb-4 block">👤</span>
              <h3 className="relative text-xl font-bold mb-2 text-white">1. Escolhe o Profissional</h3>
              <p className="relative text-gray-400 text-sm">
                 Escolha o especialista de sua preferência.
              </p>
            </div>

            {/* PASSO 2 - ÍCONE NEUTRO (PRANCHETA/LISTA) */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:border-purple-900 transition-all">
              <span className="relative text-4xl mb-4 block">📋</span>
              <h3 className="relative text-xl font-bold mb-2 text-white">2. Escolhe o Serviço</h3>
              <p className="relative text-gray-400 text-sm">
                Lista de serviços personalizada para aquele profissional escolhido.
              </p>
            </div>

            {/* PASSO 3 - ÍCONE NEUTRO (CALENDÁRIO) */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:border-green-900 transition-all">
              <span className="relative text-4xl mb-4 block">📅</span>
              <h3 className="relative text-xl font-bold mb-2 text-white">3. Data e Hora</h3>
              <p className="relative text-gray-400 text-sm">
                Visualização clara dos horários livres reais, sem conflitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PREÇOS --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Planos que crescem com você</h2>
            <p className="text-gray-400">Comece pequeno, termine gigante.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* SOLO */}
            <div className="border border-zinc-800 bg-zinc-900 rounded-3xl p-8 hover:border-zinc-700 transition-colors">
              <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">Solo</h3>
              <div className="text-4xl font-black mb-4 text-white">R$ 49,90<span className="text-lg text-gray-500 font-medium">/mês</span></div>
              <p className="text-sm text-gray-400 mb-8 border-b border-zinc-800 pb-8">
                Ideal para autônomos que querem organização.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex gap-2">✅ 1 Profissional</li>
                <li className="flex gap-2">✅ Agendamentos Ilimitados</li>
                <li className="flex gap-2">✅ Link Personalizado</li>
              </ul>
              <Link href="/cadastro" className="block w-full py-3 rounded-xl border border-white text-white font-bold text-center hover:bg-white hover:text-black transition-all">
                Testar Grátis
              </Link>
            </div>

            {/* PRO */}
            <div className="border border-blue-600 bg-zinc-900 rounded-3xl p-8 relative shadow-2xl shadow-blue-900/20 transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-widest">
                Recomendado
              </div>
              <h3 className="font-bold text-blue-400 uppercase tracking-widest text-sm mb-2">Pró</h3>
              <div className="text-4xl font-black mb-4 text-white">R$ 119,90<span className="text-lg text-gray-500 font-medium">/mês</span></div>
              <p className="text-sm text-gray-400 mb-8 border-b border-zinc-800 pb-8">
                Para negócios com equipe em crescimento.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-white">
                <li className="flex gap-2">🚀 Até 5 Profissionais</li>
                <li className="flex gap-2">✅ agenda separada por profissional</li>
                <li className="flex gap-2">✅ Dashboard Financeiro</li>
                <li className="flex gap-2">✅ Tudo do plano Solo</li>
              </ul>
              <Link href="/cadastro" className="block w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 transition-all">
                Testar Grátis Agora
              </Link>
            </div>

            {/* ILIMITADO */}
            <div className="border border-zinc-800 bg-zinc-900 rounded-3xl p-8 hover:border-zinc-700 transition-colors">
              <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-2">Ilimitado</h3>
              <div className="text-4xl font-black mb-4 text-white">R$ 229,90<span className="text-lg text-gray-500 font-medium">/mês</span></div>
              <p className="text-sm text-gray-400 mb-8 border-b border-zinc-800 pb-8">
                Para grandes redes e franquias. Sem limites.
              </p>
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
          <p className="text-center text-xs text-gray-500 mt-8">
            * Valores referentes ao plano mensal. Descontos progressivos para planos semestrais e anuais disponíveis no painel.
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 relative">
                 <img src="/logo.png" alt="Logo Kairós" className="object-contain w-full h-full grayscale" />
            </div>
            <span className="font-bold text-gray-400">Kairós</span>
          </div>
          <div className="text-sm text-gray-600">
            © 2025 Kairós. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}