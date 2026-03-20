// app/api/admin/appointments/[id]/done/route.ts
import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Validar o Token e pegar o tenantId
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "segredo-padrao-mvp")
    const { payload } = await jwtVerify(token, secret)
    const tenantId = payload.tenantId as string

    const { id } = await params

    // Atualizar agendamento garantindo que pertence ao Tenant logado (Segurança Máxima)
    const updatedAppointment = await prisma.appointment.updateMany({
      where: {
        id: id,
        tenantId: tenantId, // Regra inquebrável: Só altera se for do dono
      },
      data: {
        status: "DONE",
      },
    })

    if (updatedAppointment.count === 0) {
      return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("ERRO_AO_CONCLUIR_AGENDAMENTO:", error)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}