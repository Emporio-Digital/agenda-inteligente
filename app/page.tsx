import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">A</div>
            <span className="font-bold text-xl tracking-tight">Agenda Inteligente</span>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="text-sm font-medium text-slate-400 hover:text-white transition-colors py-2">
              Entrar
            </Link>
            <Link href="/admin" className="hidden md:block bg-white text-slate-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
              Teste Grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (A Vitrine) --- */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Efeito de fundo (Glow) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
            🚀 O Sistema nº 1 para o Seu Negócio
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Sua agenda lotada no <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Piloto Automático.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pare de perder tempo respondendo WhatsApp. Deixe seus clientes agendarem sozinhos, 24 horas por dia, com confirmação automática.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link 
              href="/admin" 
              className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Começar Teste Grátis
            </Link>
            <Link 
              href="/barbearia-ze" 
              className="w-full md:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg border border-slate-700 transition-all"
            >
              Ver Exemplo Real
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            ✅ Sem cartão de crédito • ✅ Setup em 2 minutos • ✅ 3 Dias Grátis
          </p>
        </div>
      </section>

      {/* --- MOCKUP / DEMO --- */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-2 md:p-4 shadow-2xl">
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative aspect-video flex items-center justify-center group">
                {/* Simulação de Interface */}
                <div className="text-center">
                    <p className="text-slate-500 mb-4 font-mono text-sm">A interface que seu cliente vê:</p>
                    <div className="inline-flex gap-4">
                        <div className="w-16 h-24 bg-slate-800 rounded-lg animate-pulse"></div>
                        <div className="w-16 h-24 bg-slate-800 rounded-lg animate-pulse delay-75"></div>
                        <div className="w-16 h-24 bg-blue-900/50 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold">
                            9:00
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- FEATURES (Bento Grid) --- */}
      <section className="py-20 px-6 bg-slate-950 relative">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo o que você precisa</h2>
                <p className="text-slate-400">Desenvolvido pensando na correria do dia a dia.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-2xl mb-4">⚡</div>
                    <h3 className="text-xl font-bold mb-2">Agendamento em 3 Cliques</h3>
                    <p className="text-slate-400">Seu cliente escolhe o serviço, o profissional e o horário. Simples e sem cadastro chato.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-2xl mb-4">💬</div>
                    <h3 className="text-xl font-bold mb-2">WhatsApp Automático</h3>
                    <p className="text-slate-400">Gere links automáticos de confirmação para reduzir faltas e manter o cliente engajado.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-green-500/50 transition-colors">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-2xl mb-4">💰</div>
                    <h3 className="text-xl font-bold mb-2">Painel de Gestão</h3>
                    <p className="text-slate-400">Saiba exatamente quanto vai faturar no dia e organize a agenda da sua equipe.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Pronto para modernizar seu negócio?</h2>
            <p className="text-slate-400 mb-8 text-lg">Junte-se a centenas de profissionais que já automatizaram suas agendas.</p>
            <Link 
              href="/admin" 
              className="inline-block px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-xl"
            >
              Começar Agora
            </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 border-t border-slate-800 text-center text-slate-600 text-sm">
        <p>&copy; 2025 Agenda Inteligente. Feito com ❤️ para empreendedores.</p>
      </footer>

    </div>
  )
}