import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // 1. Validação de Segurança nativa (sem bibliotecas externas)
    if (webhookSecret && signature) {
      const parts = signature.split(",").reduce((acc: Record<string, string>, item) => {
        const [k, v] = item.split("=");
        acc[k] = v;
        return acc;
      }, {});

      const timestamp = parts["t"];
      const expectedSig = parts["v1"];
      const signedPayload = `${timestamp}.${rawBody}`;

      const computedSig = crypto
        .createHmac("sha256", webhookSecret)
        .update(signedPayload)
        .digest("hex");

      if (computedSig !== expectedSig) {
        console.error("ERRO DE SEGURANÇA: Assinatura Stripe inválida");
        return NextResponse.json({ error: "Assinatura inválida" }, { status: 400 });
      }
    }

    // 2. Lê os dados enviados pela Stripe
    const event = JSON.parse(rawBody);

    // 3. Pagamento Aprovado -> Acesso Liberado no Prisma!
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
      const tenantId = session.client_reference_id || session.metadata?.tenantId;
      const planTier = session.metadata?.planTier || "SOLO";

      if (!tenantId) {
        console.error("ERRO CRÍTICO: Pagamento Stripe sem tenantId");
        return NextResponse.json({ error: "Missing tenantId" }, { status: 400 });
      }

      console.log(`💰 PAGAMENTO APROVADO STRIPE! Tenant: ${tenantId} | Plano: ${planTier}`);

      // 4. ATUALIZA O BANCO DE DADOS (Igualzinho ao Mercado Pago)
      await prisma.tenant.update({
        where: { id: tenantId },
        data: {
          subscriptionStatus: "ACTIVE",
          planTier: planTier,
        },
      });
    }

    // 5. Responde 200 para a Stripe saber que recebemos
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("WEBHOOK STRIPE ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}