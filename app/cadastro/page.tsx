'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    barbershopName: '',
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      // Sucesso! Manda pro login
      router.push('/login?registered=true')
    } else {
      const data = await res.json()
      setError(data.error || 'Erro ao cadastrar')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🚀</div>
          <h1 className="text-2xl font-bold text-gray-900">Comece Grátis</h1>
          <p className="text-gray-500 text-sm">Crie sua agenda inteligente em segundos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Negócio</label>
            <input 
              name="barbershopName"
              type="text" 
              required
              placeholder="Ex: Barbearia do Silva"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Seu Nome</label>
            <input 
              name="name"
              type="text" 
              required
              placeholder="Ex: João Silva"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email de Login</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="admin@seunegocio.com"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
            <input 
              name="password"
              type="password" 
              required
              placeholder="Crie uma senha forte"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? 'Criando sua conta...' : 'Criar Conta Grátis'}
          </button>
        </form>

        <div className="mt-6 text-center pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-bold text-black hover:underline">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}