'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
      router.push('/admin') // Redireciona pro painel
    } else {
      const data = await res.json()
      setError(data.error || 'Erro ao entrar')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎩</div>
          <h1 className="text-2xl font-bold text-gray-900">Acesso Restrito</h1>
          <p className="text-gray-500 text-sm">Entre para gerenciar sua barbearia</p>
        </div>

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

        <div className="mt-6 text-center text-xs text-gray-400">
          Protegido por Agenda Inteligente SaaS ©
        </div>
      </div>
    </div>
  )
}