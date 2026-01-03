'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago';
// Removido o import { redirect } para evitar o erro de falso-positivo
import { prisma } from "@/app/lib/prisma";
import { headers } from "next/headers";
import { jwtVerify } from 'jose';

// PREÇOS OFICIAIS
const PRICES = {
    SOLO: {
        monthly: 49.90,
        semestral: 234.00,
        annual: 449.90
    },
    PRO: {
        monthly: 119.90,
        semestral: 534.00,
        annual: 1024.90
    },
    ILIMITADO: {
        monthly: 229.90,
        semestral: 1074.00,
        annual: 2066.90
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

    // 2. Configura Mercado Pago
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
    const preference = new Preference(client);

    // 3. Define Preço
    const unitPrice = PRICES[plan][cycle];
    const title = `Plano ${plan} - Ciclo ${cycle === 'monthly' ? 'Mensal' : cycle === 'semestral' ? 'Semestral' : 'Anual'}`;

    // 4. Cria a Preferência
    const result = await preference.create({
        body: {
            items: [
                {
                    id: `${plan}_${cycle}`,
                    title: title,
                    quantity: 1,
                    unit_price: unitPrice,
                    currency_id: 'BRL'
                }
            ],
            external_reference: tenantId, 
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/configuracoes?success=true`,
                failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/configuracoes?error=true`,
                pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/configuracoes?pending=true`,
            },
            auto_return: 'approved',
        }
    });

    // 5. Retorna a URL para o Frontend navegar (sem jogar erro)
    if (result.init_point) {
        return { url: result.init_point };
    } else {
        throw new Error("Falha ao criar checkout");
    }
}