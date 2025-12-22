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
    password: '',
    theme: 'BARBER' // Padrão
  })

  // Opções de Negócio
  const themes = [
    { id: 'BARBER', label: 'Barbearia', icon: '💈', desc: 'Estilo clássico e masculino' },
    { id: 'BEAUTY', label: 'Salão de Beleza', icon: '💅', desc: 'Elegante e sofisticado' },
    { id: 'TATTOO', label: 'Estúdio Tattoo', icon: '🐉', desc: 'Dark e moderno' },
    { id: 'CLINIC', label: 'Clínica / Saúde', icon: '⚕️', desc: 'Limpo e minimalista' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const selectTheme = (themeId: string) => {
    setFormData({ ...formData, theme: themeId })
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
      router.push('/login?registered=true')
    } else {
      const data = await res.json()
      setError(data.error || 'Erro ao cadastrar')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🚀</div>
          <h1 className="text-2xl font-bold text-gray-900">Crie sua Agenda</h1>
          <p className="text-gray-500 text-sm">Configure seu negócio em segundos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Negócio</label>
              <input name="barbershopName" type="text" required placeholder="Ex: Studio Elite" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Seu Nome</label>
              <input name="name" type="text" required placeholder="Ex: Ana Souza" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none" onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Qual seu ramo de atuação?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {themes.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => selectTheme(t.id)}
                  className={`cursor-pointer border rounded-xl p-3 text-center transition-all hover:scale-105
                    ${formData.theme === t.id ? 'border-black bg-black text-white shadow-lg' : 'border-gray-200 hover:border-gray-400 bg-white text-gray-600'}
                  `}
                >
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="font-bold text-sm">{t.label}</div>
                  <div className={`text-[10px] mt-1 ${formData.theme === t.id ? 'text-gray-300' : 'text-gray-400'}`}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email de Login</label>
              <input name="email" type="email" required placeholder="admin@seunegocio.com" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
              <input name="password" type="password" required placeholder="Senha forte" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none" onChange={handleChange} />
            </div>
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
            {loading ? 'Configurando ambiente...' : 'Criar Minha Agenda'}
          </button>
        </form>

        <div className="mt-6 text-center pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Já tem conta? <Link href="/login" className="font-bold text-black hover:underline">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}