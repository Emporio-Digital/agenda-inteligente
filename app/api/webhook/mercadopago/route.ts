import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { prisma } from "@/app/lib/prisma";

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
  try {
    // 1. Recebe a notificação (Query Params ou Body)
    const url = new URL(request.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("id") || url.searchParams.get("data.id");

    // 2. Se não for pagamento, ignora (mas responde 200 para não travar o MP)
    if (topic !== "payment" || !id) {
      return NextResponse.json({ status: "ignored" }, { status: 200 });
    }

    // 3. Busca os detalhes do pagamento no Mercado Pago
    const payment = new Payment(client);
    const paymentData = await payment.get({ id });

    // 4. Lógica de Aprovação (Seguindo o Dossiê: Pagamento Aprovado -> Acesso Liberado)
    if (paymentData.status === "approved") {
      
      const tenantId = paymentData.external_reference; // Aqui está o nosso segredo!
      
      // Validação de segurança
      if (!tenantId) {
        console.error("ERRO CRÍTICO: Pagamento sem tenantId (external_reference)");
        return NextResponse.json({ error: "Missing external_reference" }, { status: 400 });
      }

      // Identifica qual plano foi comprado pelo título ou ID do item
      // Ex: "SOLO_monthly", "PRO_annual"
      const itemString = paymentData.additional_info?.items?.[0]?.id || "";
      const planTier = itemString.split("_")[0] || "SOLO"; // Pega 'SOLO', 'PRO' ou 'ILIMITADO'

      console.log(`💰 PAGAMENTO APROVADO! Tenant: ${tenantId} | Plano: ${planTier}`);

      // 5. ATUALIZA O BANCO DE DADOS (TRIAL -> ACTIVE)
      await prisma.tenant.update({
        where: { id: tenantId },
        data: {
          subscriptionStatus: "ACTIVE", // Acesso Liberado!
          planTier: planTier,           // Atualiza o plano (caso tenha feito upgrade)
        },
      });
    }

    // 6. Responde 200 OK para o Mercado Pago parar de mandar notificações
    return NextResponse.json({ status: "success" }, { status: 200 });

  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    // Mesmo com erro interno, respondemos 200 ou 500 dependendo da estratégia. 
    // Aqui 500 para o MP tentar de novo depois.
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}