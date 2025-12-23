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
    theme: 'BARBER',
    plan: 'SOLO' // Plano padrão selecionado
  })

  // 1. Opções de Negócio
  const themes = [
    { id: 'BARBER', label: 'Barbearia', icon: '💈' },
    { id: 'BEAUTY', label: 'Salão', icon: '💅' },
    { id: 'TATTOO', label: 'Tattoo', icon: '🐉' },
    { id: 'CLINIC', label: 'Clínica', icon: '⚕️' },
  ]

  // 2. Opções de Planos (Regras do Dossiê)
  const plans = [
    { 
      id: 'SOLO', 
      label: 'Plano Solo', 
      limit: '1 Profissional', 
      price: 'Ideal para autônomos' 
    },
    { 
      id: 'PRO', 
      label: 'Plano Pró', 
      limit: 'Até 5 Profissionais', 
      price: 'Para pequenas equipes',
      popular: true 
    },
    { 
      id: 'UNLIMITED', 
      label: 'Ilimitado', 
      limit: 'Equipe Infinita', 
      price: 'Para grandes redes' 
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const selectTheme = (themeId: string) => {
    setFormData({ ...formData, theme: themeId })
  }

  const selectPlan = (planId: string) => {
    setFormData({ ...formData, plan: planId })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.ok) {
        // Redireciona para login avisando que deu certo
        router.push('/login?registered=true')
      } else {
        const data = await res.json()
        setError(data.error || 'Erro ao cadastrar')
        setLoading(false)
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🚀</div>
          <h1 className="text-2xl font-bold text-gray-900">Comece seu Teste Grátis</h1>
          <p className="text-gray-500 text-sm">3 dias de acesso total. Cancele quando quiser.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SEÇÃO 1: DADOS BÁSICOS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-2">1. Seu Negócio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Negócio</label>
                <input name="barbershopName" type="text" required placeholder="Ex: Studio Elite" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" onChange={handleChange} />
                </div>
                <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Seu Nome</label>
                <input name="name" type="text" required placeholder="Ex: Ana Souza" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" onChange={handleChange} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Qual seu ramo?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {themes.map((t) => (
                    <div 
                    key={t.id} 
                    onClick={() => selectTheme(t.id)}
                    className={`cursor-pointer border rounded-xl p-3 text-center transition-all hover:shadow-md
                        ${formData.theme === t.id ? 'border-black bg-black text-white shadow-lg scale-105' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'}
                    `}
                    >
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="font-bold text-xs">{t.label}</div>
                    </div>
                ))}
                </div>
            </div>
          </div>

          {/* SEÇÃO 2: PLANO */}
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-2">2. Escolha seu Plano Futuro</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {plans.map((p) => (
                    <div 
                        key={p.id}
                        onClick={() => selectPlan(p.id)}
                        className={`cursor-pointer border-2 rounded-xl p-4 relative transition-all hover:shadow-md
                            ${formData.plan === p.id 
                                ? 'border-blue-600 bg-blue-50/50 shadow-blue-100 ring-1 ring-blue-600' 
                                : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
                            }
                        `}
                    >
                        {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Mais Escolhido</span>}
                        <h4 className={`font-black text-lg ${formData.plan === p.id ? 'text-blue-900' : 'text-gray-700'}`}>{p.label}</h4>
                        <p className="text-sm font-bold mt-1 text-gray-900">{p.limit}</p>
                        <p className="text-xs mt-2 opacity-75">{p.price}</p>
                    </div>
                ))}
             </div>
          </div>

          {/* SEÇÃO 3: ACESSO */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-2">3. Dados de Acesso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email de Login</label>
                <input name="email" type="email" required placeholder="admin@seunegocio.com" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" onChange={handleChange} />
                </div>
                <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
                <input name="password" type="password" required placeholder="Mínimo 6 caracteres" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" onChange={handleChange} />
                </div>
            </div>
          </div>

          {/* MENSAGEM DE ERRO */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl text-center font-bold border border-red-100 animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {/* BOTÃO */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all disabled:opacity-50 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            {loading ? 'Criando sua conta...' : 'Iniciar Teste Grátis de 3 Dias 🚀'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Já tem conta? <Link href="/login" className="font-bold text-black hover:underline">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}