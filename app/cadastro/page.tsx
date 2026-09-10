'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BrandTitle from "@/app/admin/brand-title" // ajuste se o seu caminho for diferente

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
    <div className="min-h-[100dvh] bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      
      {/* BACKGROUND FIXO PADRONIZADO */}
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
        <input type="checkbox" id="toggle-register-menu" className="peer sr-only" />

        {/* BARRA FIXA SUPERIOR */}
        <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-2.5 md:py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* LADO ESQUERDO: DOCK CYBER-GLASS + BRANDTITLE ANIMADO */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-14 h-14 md:w-15 md:h-15 rounded-2xl p-[3px] bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_24px_-6px_rgba(15,23,42,0.2),0_0_14px_rgba(0,240,255,0.25),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center shrink-0">
                <div className="absolute inset-[2.5px] rounded-[13px] border border-cyan-400/50 shadow-[0_0_8px_#00f0ff,inset_0_0_6px_#00f0ff] pointer-events-none" />
                <div className="relative z-10 w-full h-full rounded-[11px] overflow-hidden bg-slate-950 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center border border-slate-900">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
              
              <BrandTitle tenantName="SUA AGENDA INTELIGENTE" />
            </div>

            {/* LADO DIREITO DESKTOP (INÍCIO + ENTRAR) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link 
                href="/" 
                className="bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-500/50 hover:bg-slate-50 px-5 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                Início
              </Link>

              <Link 
                href="/login" 
                className="relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 whitespace-nowrap flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Entrar
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* LADO DIREITO MOBILE: BOTÃO HAMBURGUER */}
            <label 
              htmlFor="toggle-register-menu" 
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

        {/* GAVETA DESLIZANTE NO MOBILE */}
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
                href="/login" 
                className="w-full text-center relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Já tenho conta (Entrar)
                  <span>→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DO FORMULÁRIO */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-6 pt-28 pb-16 md:pt-32">
        <div className="max-w-3xl w-full relative group">
          
          {/* Glow Suave de Profundidade */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 rounded-[2.8rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700"></div>
          
          {/* Card Acrílico Cyber-Glass */}
          <div className="relative bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2.5rem] shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_20px_45px_-10px_rgba(15,23,42,0.12)] p-8 md:p-12">
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100 mb-3 shadow-sm">
                <span>🚀</span> Comece em Menos de 1 Minuto
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic uppercase">
                Criar Conta <span className="text-blue-600">Kairós</span>
              </h1>
              <p className="text-slate-500 text-xs font-medium mt-1">Teste grátis por 7 dias • Sem burocracia</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* SEÇÃO 1: DADOS DO NEGÓCIO */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-slate-200"></span>
                  <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">01. O Negócio</h3>
                  <span className="h-px flex-1 bg-slate-200"></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome do Estabelecimento</label>
                    <input 
                      name="barbershopName" 
                      type="text" 
                      required 
                      placeholder="Ex: Studio Elite" 
                      className="w-full p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium shadow-sm" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Seu Nome Completo</label>
                    <input 
                      name="name" 
                      type="text" 
                      required 
                      placeholder="Ex: Ana Souza" 
                      className="w-full p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium shadow-sm" 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp de Contato</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    required 
                    placeholder="(00) 00000-0000" 
                    className="w-full p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium shadow-sm font-mono" 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ramo de Atuação</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {themes.map((t) => (
                      <div 
                        key={t.id} 
                        onClick={() => selectTheme(t.id)}
                        className={`cursor-pointer border-2 rounded-2xl p-4 text-center transition-all duration-200 select-none
                          ${formData.theme === t.id 
                              ? 'border-blue-600 bg-blue-50/90 text-blue-700 shadow-sm shadow-blue-500/15 scale-[1.02]' 
                              : 'border-slate-200/80 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className="text-2xl mb-1.5">{t.icon}</div>
                        <div className="font-black text-[10px] uppercase tracking-wider">{t.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2: PLANO */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-slate-200"></span>
                  <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">02. Escolha o Plano</h3>
                  <span className="h-px flex-1 bg-slate-200"></span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => selectPlan(p.id)}
                      className={`cursor-pointer border-2 rounded-2xl p-5 relative transition-all duration-200 select-none
                        ${formData.plan === p.id 
                            ? 'border-blue-600 bg-blue-50/90 shadow-md shadow-blue-500/10 scale-[1.02]' 
                            : 'border-slate-200/80 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }
                      `}
                    >
                      {p.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-sm">
                          Popular
                        </span>
                      )}
                      <h4 className={`font-black text-xs uppercase tracking-widest ${formData.plan === p.id ? 'text-slate-900' : 'text-slate-700'}`}>
                        {p.label}
                      </h4>
                      <p className={`text-[10px] font-bold mt-1 ${formData.plan === p.id ? 'text-blue-600 font-black' : 'text-slate-500'}`}>
                        {p.limit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEÇÃO 3: ACESSO */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-slate-200"></span>
                  <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">03. Dados de Acesso</h3>
                  <span className="h-px flex-1 bg-slate-200"></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email de Administrador</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="admin@exemplo.com" 
                      className="w-full p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium shadow-sm" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sua Senha</label>
                    <div className="relative">
                      <input 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        placeholder="Mínimo 6 caracteres" 
                        className="w-full p-4 pr-12 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium shadow-sm" 
                        onChange={handleChange} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
                <div className="p-4 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-2xl text-center border border-rose-200/80 uppercase tracking-wider shadow-sm">
                  ⚠️ {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative overflow-hidden group/btn bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.45)] disabled:opacity-50 active:scale-[0.98] border border-blue-500/40"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? 'Configurando seu ambiente...' : 'Lançar Meu Sistema Agora 🚀'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>
            </form>

            <div className="mt-10 text-center pt-8 border-t border-slate-200/80">
              <p className="text-xs font-semibold text-slate-500">
                Já possui uma licença?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4">
                  Fazer Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* RODAPÉ DISCRETO */}
      <footer className="relative z-10 py-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
        © Kairós • EG Empório Digital
      </footer>

    </div>
  )
}