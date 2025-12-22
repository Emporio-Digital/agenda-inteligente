import { prisma } from "@/app/lib/prisma"
import { headers } from "next/headers"
import { jwtVerify } from 'jose'

// Componente para salvar (Client Side dentro do Server Component)
import SettingsForm from "./form"

async function getTenant() {
  const headerList = await headers()
  const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0]
  
  if (!token) return null

  const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
  const { payload } = await jwtVerify(token, secret)
  
  // Busca os dados da empresa
  return await prisma.tenant.findUnique({
    where: { id: payload.tenantId as string }
  })
}

export default async function SettingsPage() {
  const tenant = await getTenant()

  if (!tenant) return <div>Acesso negado</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações da Empresa ⚙️</h1>
            <p className="text-gray-500 mb-8">Personalize a aparência da sua página de agendamento.</p>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <SettingsForm tenant={tenant} />
            </div>
        </div>
    </div>
  )
}