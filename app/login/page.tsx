'use client'

import { useState, Suspense } from 'react' // Suspense adicionado para evitar erro no build
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
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎩</div>
          <h1 className="text-2xl font-bold text-gray-900">Acesso Restrito</h1>
          <p className="text-gray-500 text-sm">Entre para gerenciar sua barbearia</p>
        </div>

        {registered && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center font-bold border border-green-100">
            ✅ Conta criada com sucesso! Faça login.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              placeholder="admin@barbearia.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              placeholder="••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Acessar Painel'}
          </button>
        </form>

        {/* --- AQUI ESTÁ O LINK QUE FALTAVA --- */}
        <div className="mt-6 text-center pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Ainda não tem conta?{' '}
            <Link href="/cadastro" className="font-bold text-black hover:underline">
              Criar Grátis
            </Link>
          </p>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-400">
          Protegido por Agenda Inteligente SaaS ©
        </div>
      </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <Suspense fallback={<div>Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}