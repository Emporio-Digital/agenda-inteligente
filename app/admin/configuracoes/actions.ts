'use server'

import { prisma } from "@/app/lib/prisma";
import { headers } from "next/headers";
import { jwtVerify } from 'jose';

// PREÇOS OFICIAIS STRIPE (IDs dos Produtos)
const STRIPE_PRICES = {
    SOLO: {
        monthly: 'price_1UDbpdLll8vH03WC4FJKWzwp',
        semestral: 'price_1UDbsgLll8vH03WCvPhoFsg2',
        annual: 'price_1UDctHLll8vH03WCpfRpMBLL'
    },
    PRO: {
        monthly: 'price_1UDcxNLll8vH03WC54M2ALwL',
        semestral: 'price_1UDcy7Lll8vH03WC1v2d1frX',
        annual: 'price_1UDcyWLll8vH03WCSTQWsa3Z'
    },
    ILIMITADO: {
        monthly: 'price_1UDczeLll8vH03WCKXn4pY76',
        semestral: 'price_1UDd05Lll8vH03WCH7dUkebV',
        annual: 'price_1UDd0KLll8vH03WCPBnNMX5T'
    }
}

export async function createCheckoutSession(plan: 'SOLO' | 'PRO' | 'ILIMITADO', cycle: 'monthly' | 'semestral' | 'annual') {
    
    // 1. Segurança: Pega o Tenant Logado
    const headerList = await headers();
    const token = headerList.get('cookie')?.split('auth_token=')[1]?.split(';')[0];
    if (!token) throw new Error("Não autenticado");
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp');
    const { payload } = await jwtVerify(token, secret);
    const tenantId = payload.tenantId as string;

    // 2. Define o Preço da Stripe
    const priceId = STRIPE_PRICES[plan][cycle];
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    // 3. Monta os parâmetros para a API da Stripe (fetch nativo, sem biblioteca)
    const params = new URLSearchParams();
    params.append('mode', 'subscription');
    params.append('line_items[0][price]', priceId);
    params.append('line_items[0][quantity]', '1');
    params.append('client_reference_id', tenantId);
    params.append('metadata[tenantId]', tenantId);
    params.append('metadata[planTier]', plan);
    params.append('metadata[cycle]', cycle);
    params.append('success_url', `${baseUrl}/admin/configuracoes?success=true`);
    params.append('cancel_url', `${baseUrl}/admin/configuracoes?canceled=true`);

    // 4. Cria a Sessão de Checkout na Stripe
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    const session = await response.json();

    // 5. Retorna a URL para o Frontend navegar
    if (session.url) {
        return { url: session.url };
    } else {
        console.error("Erro Stripe:", session.error);
        throw new Error(session.error?.message || "Falha ao criar checkout");
    }
}