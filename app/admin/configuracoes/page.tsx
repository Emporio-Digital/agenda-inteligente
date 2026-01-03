import { prisma } from "@/app/lib/prisma"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import SettingsForm from "./form"
import SubscriptionPlans from "./subscription-plans"
import Link from "next/link"

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

  if (!tenant) return <div className="p-10 text-center">Carregando...</div>

  // Define status visual
  const isTrial = !tenant.subscriptionStatus || tenant.subscriptionStatus === 'TRIAL' || tenant.subscriptionStatus === 'PENDING'
  const statusColor = isTrial ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
  const statusLabel = isTrial ? 'Período de Testes (Trial)' : 'Assinatura Ativa'

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto">
            
            {/* BOTÃO VOLTAR */}
            <div className="mb-6">
                <Link href="/admin" className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-2 transition-colors">
                    ← Voltar ao Painel
                </Link>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="text-4xl">⚙️</div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
                        <p className="text-gray-500">Gerencie sua assinatura e dados da empresa.</p>
                    </div>
                </div>
                {/* BADGE DE STATUS */}
                <div className={`px-4 py-2 rounded-full text-sm font-bold ${statusColor}`}>
                    {statusLabel}
                </div>
            </div>

            {/* AREA DE ASSINATURA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">Sua Assinatura</h2>
                    <p className="text-sm text-gray-500">Escolha o plano ideal para o seu negócio.</p>
                </div>
                <div className="p-6">
                    <SubscriptionPlans currentPlan={tenant.planTier} status={tenant.subscriptionStatus} />
                </div>
            </div>
            
            {/* FORMULÁRIO DE DADOS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">Dados da Empresa</h2>
                </div>
                <SettingsForm tenant={tenant} />
            </div>

            {/* CARD DE SUPORTE (WHATSAPP) */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-green-900">Precisa de Ajuda?</h3>
                        <p className="text-sm text-green-700">Fale diretamente com nosso suporte técnico no WhatsApp.</p>
                    </div>
                </div>
                <a 
                    href="https://wa.me/5511916053292" 
                    target="_blank"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-sm whitespace-nowrap"
                >
                    Chamar no WhatsApp 💬
                </a>
            </div>

        </div>
    </div>
  )
}