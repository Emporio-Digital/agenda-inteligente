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

            {/* AREA DE ASSINATURA (NOVA) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">Sua Assinatura</h2>
                    <p className="text-sm text-gray-500">Escolha o plano ideal para o seu negócio.</p>
                </div>
                <div className="p-6">
                    <SubscriptionPlans currentPlan={tenant.planTier} status={tenant.subscriptionStatus} />
                </div>
            </div>
            
            {/* FORMULÁRIO EXISTENTE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">Dados da Empresa</h2>
                </div>
                <SettingsForm tenant={tenant} />
            </div>
        </div>
    </div>
  )
}