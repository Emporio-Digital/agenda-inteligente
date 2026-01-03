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
    <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          {/* Logo no lugar do Emoji */}
          <div className="w-12 h-12 mx-auto mb-4 relative flex items-center justify-center">
             <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Bem-vindo de volta</h1>
          <p className="text-gray-400 text-sm mt-2">Entre para gerenciar seu negócio</p>
        </div>

        {registered && (
          <div className="mb-6 p-3 bg-green-500/10 text-green-400 text-sm rounded-xl text-center font-bold border border-green-500/20">
            ✅ Conta criada com sucesso! Faça login.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-xl text-center border border-red-500/20">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 mt-2"
          >
            {loading ? 'Entrando...' : 'Acessar Painel'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-zinc-800">
          <p className="text-sm text-gray-500">
            Ainda não tem conta?{' '}
            <Link href="/cadastro" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Criar Grátis
            </Link>
          </p>
        </div>
      </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      {/* Background Glow Effect (Igual Landing Page) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-0"></div>
      
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}