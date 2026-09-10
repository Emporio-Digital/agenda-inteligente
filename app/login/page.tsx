'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import BrandTitle from "@/app/admin/brand-title" // ajuste se sua pasta admin tiver outro caminho

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const registered = searchParams.get('registered')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      router.push('/admin') 
    } else {
      const data = await res.json()
      setError(data.error || 'Erro ao entrar')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full relative group">
      {/* Glow Suave de Profundidade */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 rounded-[2.8rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700"></div>

      {/* Card Acrílico Cyber-Glass (Harmonizado com o Sistema) */}
      <div className="relative bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2.5rem] shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_20px_45px_-10px_rgba(15,23,42,0.12)] p-8 md:p-10">
        
        {/* Cabeçalho Limpo do Card (Logo já está no topo) */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight italic uppercase">
            Bem-vindo <span className="text-blue-600">de volta</span>
          </h1>
          <p className="text-slate-500 text-xs font-medium mt-1">Gerencie seus agendamentos e faturamento</p>
        </div>

        {registered && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 text-xs rounded-2xl text-center font-bold border border-emerald-200/80 shadow-sm animate-pulse uppercase tracking-wider">
            ✅ Conta criada com sucesso! Faça login abaixo.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email de Acesso</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium shadow-sm"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sua Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-2xl text-center border border-rose-200/80 uppercase tracking-wider shadow-sm">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full relative overflow-hidden group/btn bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.45)] disabled:opacity-50 active:scale-[0.98] border border-blue-500/40"
          >
            <span className="relative z-10">{loading ? 'Validando Acesso...' : 'Entrar no Sistema →'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-200/80">
          <p className="text-xs font-semibold text-slate-500">
            Ainda não tem conta?{' '}
            <Link href="/cadastro" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4">
              Teste Grátis 7 dias
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      
      {/* BACKGROUND FIXO PADRONIZADO COM A LP */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-slate-50">
        <div className="absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] opacity-30 transition-all">
          <img src="/logo-fundo.png" alt="" className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(37,99,235,0.15)]" />
        </div>
        <div className="absolute inset-0 bg-slate-50/40 backdrop-blur-[1px]"></div>
      </div>

      {/* WRAPPER FIXO DO HEADER + MENU DESLIZANTE */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* GATILHO DO MENU INVISÍVEL */}
        <input type="checkbox" id="toggle-login-menu" className="peer sr-only" />

        {/* BARRA FIXA SUPERIOR */}
        <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-2.5 md:py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* LADO ESQUERDO: DOCK CYBER-GLASS + BRANDTITLE ANIMADO */}
            <div className="flex items-center gap-4 min-w-0">
              {/* DOCK CYBER-GLASS */}
              <div className="relative w-14 h-14 md:w-15 md:h-15 rounded-2xl p-[3px] bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_24px_-6px_rgba(15,23,42,0.2),0_0_14px_rgba(0,240,255,0.25),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center shrink-0">
                <div className="absolute inset-[2.5px] rounded-[13px] border border-cyan-400/50 shadow-[0_0_8px_#00f0ff,inset_0_0_6px_#00f0ff] pointer-events-none" />
                <div className="relative z-10 w-full h-full rounded-[11px] overflow-hidden bg-slate-950 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center border border-slate-900">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
              
              {/* TÍTULO ATIVO SCANNER */}
              <BrandTitle tenantName="SUA AGENDA INTELIGENTE" />
            </div>

            {/* LADO DIREITO DESKTOP (SUBSTITUÍDO ENTRAR POR INÍCIO) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link 
                href="/" 
                className="bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-500/50 hover:bg-slate-50 px-5 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                Início
              </Link>

              <Link 
                href="/cadastro" 
                className="relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 whitespace-nowrap flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Teste Grátis
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* LADO DIREITO MOBILE: BOTÃO HAMBURGUER */}
            <label 
              htmlFor="toggle-login-menu" 
              className="md:hidden cursor-pointer relative p-[2px] rounded-2xl overflow-hidden group flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <div className="relative z-10 p-2.5 rounded-[calc(1rem-2px)] w-full h-full flex items-center justify-center transition-all bg-white border border-slate-200 group-hover:bg-slate-50 group-hover:border-blue-500/50 shadow-sm">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
            </label>

          </div>
        </header>

        {/* GAVETA DESLIZANTE NO MOBILE (INÍCIO + TESTE GRÁTIS) */}
        <div className="md:hidden w-full bg-slate-50/98 backdrop-blur-xl border-b border-slate-200 overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] opacity-0 peer-checked:opacity-100 shadow-xl">
          <div className="min-h-0">
            <div className="px-6 py-6 flex flex-col gap-3">
              <Link 
                href="/" 
                className="w-full text-center bg-white border border-slate-200 text-slate-800 hover:text-blue-600 hover:border-blue-500/50 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
              >
                Início
              </Link>

              <Link 
                href="/cadastro" 
                className="w-full text-center relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Teste Grátis Agora
                  <span>→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA CENTRAL DO FORMULÁRIO */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pt-28 pb-12 md:pt-32">
        <Suspense fallback={
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Kairós</p>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>

      {/* RODAPÉ DISCRETO */}
      <footer className="relative z-10 py-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
        © Kairós • EG Empório Digital
      </footer>

    </div>
  )
}