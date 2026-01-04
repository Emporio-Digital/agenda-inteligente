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
    phone: '', // NOVO CAMPO
    email: '',
    password: '',
    theme: 'BARBER',
    plan: 'SOLO'
  })

  // 1. Opções de Negócio (Atualizadas com Novos Temas)
  const themes = [
    { id: 'BARBER', label: 'Barbearia', icon: '💈' },
    { id: 'BEAUTY', label: 'Salão', icon: '💅' },
    { id: 'TATTOO', label: 'Tattoo', icon: '🐉' },
    { id: 'CLINIC', label: 'Clínica', icon: '⚕️' },
    { id: 'PHOTOGRAPHY', label: 'Fotografia', icon: '📸' },
    { id: 'PROFESSIONAL', label: 'Escritório', icon: '💼' },
  ]

  // 2. Opções de Planos
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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-3xl w-full bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-800">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-blue-900/20">🚀</div>
          <h1 className="text-3xl font-black text-white tracking-tight">Crie sua Conta Grátis</h1>
          <p className="text-slate-400 text-sm mt-2">Teste todas as funcionalidades por 3 dias. Sem compromisso.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SEÇÃO 1: DADOS BÁSICOS */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="bg-blue-900/30 w-5 h-5 rounded flex items-center justify-center text-[10px]">1</span> 
                Sobre o Negócio
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Nome do Estabelecimento</label>
                    <input name="barbershopName" type="text" required placeholder="Ex: Studio Elite" className="w-full p-4 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-slate-600 font-bold" onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Seu Nome</label>
                    <input name="name" type="text" required placeholder="Ex: Ana Souza" className="w-full p-4 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-slate-600" onChange={handleChange} />
                </div>
            </div>

            {/* CAMPO WHATSAPP ADICIONADO */}
            <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">WhatsApp (Contato)</label>
                <input name="phone" type="tel" required placeholder="(00) 00000-0000" className="w-full p-4 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-slate-600" onChange={handleChange} />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-400 mb-3 uppercase">Qual seu ramo de atuação?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themes.map((t) => (
                    <div 
                    key={t.id} 
                    onClick={() => selectTheme(t.id)}
                    className={`cursor-pointer border rounded-xl p-4 text-center transition-all hover:scale-105
                        ${formData.theme === t.id 
                            ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                            : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500 hover:bg-slate-750'
                        }
                    `}
                    >
                    <div className="text-2xl mb-2">{t.icon}</div>
                    <div className="font-bold text-xs uppercase tracking-wide">{t.label}</div>
                    </div>
                ))}
                </div>
            </div>
          </div>

          {/* SEÇÃO 2: PLANO */}
          <div className="space-y-5">
             <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="bg-blue-900/30 w-5 h-5 rounded flex items-center justify-center text-[10px]">2</span>
                Escolha sua Meta
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((p) => (
                    <div 
                        key={p.id}
                        onClick={() => selectPlan(p.id)}
                        className={`cursor-pointer border-2 rounded-2xl p-5 relative transition-all hover:scale-[1.02]
                            ${formData.plan === p.id 
                                ? 'border-blue-500 bg-blue-900/20 shadow-xl shadow-blue-900/10' 
                                : 'border-slate-800 bg-slate-800/50 text-slate-500 hover:border-slate-600'
                            }
                        `}
                    >
                        {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide shadow-lg">Recomendado</span>}
                        <h4 className={`font-black text-lg ${formData.plan === p.id ? 'text-white' : 'text-slate-400'}`}>{p.label}</h4>
                        <p className={`text-sm font-bold mt-1 ${formData.plan === p.id ? 'text-blue-400' : 'text-slate-500'}`}>{p.limit}</p>
                        <p className="text-xs mt-3 opacity-60">{p.price}</p>
                    </div>
                ))}
             </div>
          </div>

          {/* SEÇÃO 3: ACESSO */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                <span className="bg-blue-900/30 w-5 h-5 rounded flex items-center justify-center text-[10px]">3</span>
                Dados de Login
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Email</label>
                    <input name="email" type="email" required placeholder="admin@seunegocio.com" className="w-full p-4 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-slate-600" onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Senha</label>
                    <input name="password" type="password" required placeholder="Mínimo 6 caracteres" className="w-full p-4 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-slate-600" onChange={handleChange} />
                </div>
            </div>
          </div>

          {/* MENSAGEM DE ERRO */}
          {error && (
            <div className="p-4 bg-red-900/20 text-red-400 text-sm rounded-xl text-center font-bold border border-red-900 animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {/* BOTÃO */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-xl font-black text-lg hover:bg-blue-500 transition-all disabled:opacity-50 shadow-xl shadow-blue-900/20 hover:shadow-blue-600/30 hover:-translate-y-1"
          >
            {loading ? 'Criando ambiente...' : 'Lançar Meu Sistema 🚀'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-800">
          <p className="text-sm text-slate-500">
            Já tem uma conta? <Link href="/login" className="font-bold text-white hover:text-blue-400 transition-colors">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}