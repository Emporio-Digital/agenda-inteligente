'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

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
        {/* Efeito de Brilho atrás do Card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-10">
            {/* Logo com Glow */}
            <div className="w-20 h-20 mx-auto mb-6 relative">
               <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
               <img src="/logo.png" alt="Logo" className="relative object-contain w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">
              Kairós <span className="text-blue-500">.</span>
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">Sua Agenda Inteligente</p>
          </div>

          {registered && (
            <div className="mb-6 p-4 bg-emerald-500/10 text-emerald-400 text-xs rounded-xl text-center font-black border border-emerald-500/20 animate-pulse uppercase tracking-widest">
              ✅ Conta criada! Faça login abaixo.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">Email de Acesso</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">Sua Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 text-red-400 text-[10px] font-bold rounded-xl text-center border border-red-500/20 uppercase tracking-widest">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full relative overflow-hidden group/btn bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 active:scale-[0.98]"
            >
              <span className="relative z-10">{loading ? 'Validando Acesso...' : 'Entrar no Sistema'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-slate-800/50">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Novo por aqui?{' '}
              <Link href="/cadastro" className="text-blue-400 hover:text-white transition-colors underline underline-offset-4">
                Teste Grátis
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-950 p-6 font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      {/* Background Complexo de Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Overlay Subtil */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
      </div>
      
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-500 font-black text-xs uppercase tracking-[0.3em]">Kairós</p>
        </div>
      }>
        <LoginForm />
      </Suspense>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}