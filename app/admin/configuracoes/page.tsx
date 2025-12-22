import { prisma } from "@/app/lib/prisma"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'
import SettingsForm from "./form"
import Link from "next/link" // Import do Link

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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto">
            
            {/* BOTÃO VOLTAR */}
            <div className="mb-6">
                <Link href="/admin" className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-2 transition-colors">
                    ← Voltar ao Painel
                </Link>
            </div>

            <div className="flex items-center gap-3 mb-8">
                <div className="text-4xl">⚙️</div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-gray-500">Personalize a identidade do seu negócio.</p>
                </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <SettingsForm tenant={tenant} />
            </div>
        </div>
    </div>
  )
}