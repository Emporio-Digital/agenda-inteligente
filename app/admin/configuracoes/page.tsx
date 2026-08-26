import { prisma } from "@/app/lib/prisma"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import SettingsForm from "./form"
import SubscriptionPlans from "./subscription-plans"
import Link from "next/link"
import { redirect } from "next/navigation"

async function getTenant() {
  const headerList = await headers()
  const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
  if (!token) return null
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
  const { payload } = await jwtVerify(token, secret)
  return await prisma.tenant.findUnique({
    where: { id: payload.tenantId as string }
  })
}

export default async function SettingsPage() {
  const tenant = await getTenant()

  if (!tenant) redirect('/login')

  const isTrial = !tenant.subscriptionStatus || tenant.subscriptionStatus === 'TRIAL' || tenant.subscriptionStatus === 'PENDING'
  const statusColor = isTrial ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' : 'bg-green-900/30 text-green-400 border-green-800'
  const statusLabel = isTrial ? 'Período de Testes (Trial)' : 'Assinatura Ativa'

  // LÓGICA DE LED PULSANTE DO STATUS (MANUTENÇÃO DE LOGICA INTACTA)
  const statusDotColor = isTrial ? 'bg-yellow-500 shadow-[0_0_8px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10 font-sans relative overflow-x-hidden">
        
        {/* GLOW DE FUNDO CINEMATOGRÁFICO (UPGRADE DE PROFUNDIDADE) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
            
            {/* VOLTAR COM DESIGN PREMIUM */}
            <div className="mb-8">
                <Link href="/admin" className="text-xs font-extrabold text-slate-300 hover:text-white flex items-center gap-2 transition-all bg-slate-900/90 hover:bg-slate-800 w-fit px-4 py-2.5 rounded-xl border border-slate-800/80 shadow-md">
                    ← Voltar ao Painel
                </Link>
            </div>

            {/* HEADER COM DESIGN FACELIFT & LED PULSANTE */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 pb-6 border-b border-slate-900/80">
                <div className="flex items-center gap-4">
                    <div className="text-3xl md:text-4xl drop-shadow-[0_0_12px_rgba(59,130,246,0.2)]">⚙️</div>
                    <div className="leading-tight">
                        <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                          Configurações
                        </h1>
                        <p className="text-slate-400 text-xs md:text-sm mt-1">Gerencie sua assinatura e dados da empresa.</p>
                    </div>
                </div>
                
                {/* STATUS BADGE COM MICRO LED REAL-TIME */}
                <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border shadow-md ${statusColor} w-fit h-fit flex items-center gap-2`}>
                    <span className={`w-2 h-2 rounded-full ${statusDotColor} animate-pulse`}></span>
                    {statusLabel}
                </div>
            </div>

            {/* CARD DE ASSINATURA UPGRADE PREMIUM */}
            <div className="bg-slate-900/90 rounded-[2.2rem] shadow-xl border border-slate-800/80 overflow-hidden mb-8 relative">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <div className="p-6 border-b border-slate-850 bg-slate-900/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-center text-sm shadow-inner">💳</div>
                    <div>
                        <h2 className="text-base md:text-lg font-black text-white">Sua Assinatura</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Escolha o plano ideal para o seu negócio.</p>
                    </div>
                </div>
                <div className="p-4 md:p-6 bg-slate-950/25">
                    <SubscriptionPlans currentPlan={tenant.planTier} status={tenant.subscriptionStatus} />
                </div>
            </div>
            
            {/* CARD DE DADOS DA EMPRESA UPGRADE PREMIUM */}
            <div className="bg-slate-900/90 rounded-[2.2rem] shadow-xl border border-slate-800/80 overflow-hidden mb-8 relative">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <div className="p-6 border-b border-slate-850 bg-slate-900/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-center text-sm shadow-inner">🏢</div>
                    <div>
                        <h2 className="text-base md:text-lg font-black text-white">Dados da Empresa</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Mantenha as informações de atendimento do seu negócio atualizadas.</p>
                    </div>
                </div>
                <div className="bg-slate-950/25">
                    <SettingsForm tenant={tenant} />
                </div>
            </div>

            {/* CARD SUPORTE WHATSAPP - MANTIDO IDENTICO (SEU PREFERIDO) */}
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="bg-emerald-500/10 p-3.5 rounded-2xl text-emerald-400 border border-emerald-500/20 shrink-0 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z"/>
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-extrabold text-emerald-400 text-sm md:text-base">Precisa de Ajuda?</h3>
                        <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">Fale diretamente com nosso suporte técnico no WhatsApp para tirar dúvidas.</p>
                    </div>
                </div>
                <a 
                    href="https://wa.me/5511916053292" 
                    target="_blank"
                    className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-emerald-550 hover:from-emerald-550 hover:to-emerald-500 text-white px-5 py-3 rounded-2xl font-black transition-all shadow-md shadow-emerald-950/20 text-xs uppercase tracking-widest text-center whitespace-nowrap active:scale-[0.98]"
                >
                    Suporte Técnico 💬
                </a>
            </div>
        </div>
    </div>
  )
}