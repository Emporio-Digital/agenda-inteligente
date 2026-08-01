'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Controle de visibilidade da senha
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    barbershopName: '',
    name: '',
    phone: '', 
    email: '',
    password: '',
    theme: 'BARBER',
    plan: 'SOLO'
  })

  // 1. Opções de Negócio
  const themes = [
    { id: 'BARBER', label: 'Barbearia', icon: '💈' },
    { id: 'BEAUTY', label: 'Salão', icon: '💅' },
    { id: 'TATTOO', label: 'Tattoo', icon: '🐉' },
    { id: 'CLINIC', label: 'Clínica', icon: '⚕️' },
    { id: 'PHOTOGRAPHY', label: 'Fotografia', icon: '📸' },
    { id: 'PROFESSIONAL', label: 'Escritório', icon: '💼' },
    { id: 'RESTAURANT', label: 'Restaurante', icon: '🍽️' },
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

    if (!formData.name || !formData.barbershopName || !formData.phone || !formData.email || !formData.password) {
        setError('Por favor, preencha todos os campos obrigatórios.')
        setLoading(false)
        return
    }

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
    <div className="min-h-[100dvh] flex items-start justify-center bg-slate-950 p-6 font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Complexo de Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
      </div>

      <div className="max-w-3xl w-full relative group z-10 mb-10">
        {/* Efeito de Brilho atrás do Card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12">
          
          <div className="text-center mb-12">
            {/* Logo com Glow (Igual ao Login) */}
            <div className="w-20 h-20 mx-auto mb-6 relative">
               <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
               <img src="/logo.png" alt="Logo" className="relative object-contain w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">
              Criar Conta <span className="text-blue-500">Kairós</span>
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">Teste grátis por 7 dias</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* SEÇÃO 1: DADOS DO NEGÓCIO */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-800"></span>
                <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">01. O Negócio</h3>
                <span className="h-px flex-1 bg-slate-800"></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">Nome do Estabelecimento</label>
                  <input 
                    name="barbershopName" 
                    type="text" 
                    required 
                    placeholder="Ex: Studio Elite" 
                    className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900" 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">Seu Nome Completo</label>
                  <input 
                    name="name" 
                    type="text" 
                    required 
                    placeholder="Ex: Ana Souza" 
                    className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900" 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">WhatsApp de Contato</label>
                <input 
                  name="phone" 
                  type="tel" 
                  required 
                  placeholder="(00) 00000-0000" 
                  className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900 font-mono" 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">Ramo de Atuação</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {themes.map((t) => (
                    <div 
                      key={t.id} 
                      onClick={() => selectTheme(t.id)}
                      className={`cursor-pointer border rounded-xl p-4 text-center transition-all duration-300
                        ${formData.theme === t.id 
                            ? 'border-blue-500 bg-blue-600/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                            : 'border-slate-800 bg-slate-900/30 text-slate-500 hover:border-slate-700 hover:bg-slate-900'
                        }
                      `}
                    >
                      <div className="text-xl mb-2">{t.icon}</div>
                      <div className="font-black text-[9px] uppercase tracking-tighter">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SEÇÃO 2: PLANO */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-800"></span>
                <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">02. Escolha o Plano</h3>
                <span className="h-px flex-1 bg-slate-800"></span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((p) => (
                    <div 
                        key={p.id}
                        onClick={() => selectPlan(p.id)}
                        className={`cursor-pointer border-2 rounded-2xl p-5 relative transition-all duration-300 hover:scale-[1.02]
                            ${formData.plan === p.id 
                                ? 'border-blue-600 bg-blue-600/10 shadow-xl shadow-blue-900/10' 
                                : 'border-slate-800 bg-slate-900/20 text-slate-400 hover:border-slate-700'
                            }
                        `}
                    >
                        {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-[0.1em] shadow-lg">Popular</span>}
                        <h4 className={`font-black text-xs uppercase tracking-widest ${formData.plan === p.id ? 'text-white' : 'text-slate-300'}`}>{p.label}</h4>
                        <p className={`text-[10px] font-bold mt-1 ${formData.plan === p.id ? 'text-blue-400' : 'text-slate-500'}`}>{p.limit}</p>
                    </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO 3: ACESSO */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-800"></span>
                <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">03. Dados de Acesso</h3>
                <span className="h-px flex-1 bg-slate-800"></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">Email de Administrador</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="admin@exemplo.com" 
                    className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900" 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-1">Sua Senha</label>
                  <div className="relative">
                    <input 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      required 
                      placeholder="Mínimo 6 caracteres" 
                      className="w-full p-4 pr-12 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all hover:bg-slate-900" 
                      onChange={handleChange} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 text-red-400 text-[10px] font-black rounded-xl text-center border border-red-500/20 uppercase tracking-widest">
                ⚠️ {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full relative overflow-hidden group/btn bg-blue-600 text-white py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 active:scale-[0.98] hover:-translate-y-0.5"
            >
              <span className="relative z-10">{loading ? 'Configurando seu ambiente...' : 'Lançar Meu Sistema Agora 🚀'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-slate-800/50">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Já possui uma licença?{' '}
              <Link href="/login" className="text-blue-400 hover:text-white transition-colors underline underline-offset-4">
                Fazer Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}