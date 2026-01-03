'use client'

import { useState } from 'react'
import { createCheckoutSession } from './actions'

interface SubscriptionPlansProps {
    currentPlan: string;
    status: string | null;
}

export default function SubscriptionPlans({ currentPlan, status }: SubscriptionPlansProps) {
    const [cycle, setCycle] = useState<'monthly' | 'semestral' | 'annual'>('monthly');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (plan: 'SOLO' | 'PRO' | 'ILIMITADO') => {
        setLoading(true);
        try {
            // Chama a Server Action e espera a URL
            const response = await createCheckoutSession(plan, cycle);
            
            if (response && response.url) {
                // Redireciona o navegador de forma limpa
                window.location.href = response.url;
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao iniciar pagamento. Tente novamente.");
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            
            {/* Seletor de Ciclo */}
            <div className="flex justify-center">
                <div className="bg-gray-100 p-1 rounded-full flex gap-1">
                    <button 
                        onClick={() => setCycle('monthly')}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${cycle === 'monthly' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
                    >
                        Mensal
                    </button>
                    <button 
                        onClick={() => setCycle('semestral')}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${cycle === 'semestral' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
                    >
                        Semestral <span className="text-[10px] text-green-600 ml-1">-22%</span>
                    </button>
                    <button 
                        onClick={() => setCycle('annual')}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${cycle === 'annual' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
                    >
                        Anual <span className="text-[10px] text-green-600 ml-1">-25%</span>
                    </button>
                </div>
            </div>

            {/* Grid de Planos */}
            <div className="grid md:grid-cols-3 gap-4">
                
                {/* PLANO SOLO */}
                <div className={`border rounded-xl p-6 relative ${currentPlan === 'SOLO' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <h3 className="font-bold text-gray-500 text-sm uppercase">Solo</h3>
                    <div className="mt-2 mb-4">
                        <span className="text-3xl font-black text-gray-900">
                            {cycle === 'monthly' && 'R$ 49,90'}
                            {cycle === 'semestral' && 'R$ 234'}
                            {cycle === 'annual' && 'R$ 449'}
                        </span>
                        {cycle === 'monthly' && <span className="text-xs text-gray-500">/mês</span>}
                    </div>
                    <button 
                        onClick={() => handleSubscribe('SOLO')}
                        disabled={loading}
                        className="w-full py-2 rounded-lg border-2 border-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50"
                    >
                        {loading ? 'Processando...' : 'Escolher Solo'}
                    </button>
                </div>

                {/* PLANO PRO */}
                <div className={`border rounded-xl p-6 relative ${currentPlan === 'PRO' ? 'border-blue-500 bg-blue-50' : 'border-blue-100 bg-white ring-2 ring-blue-500 ring-offset-2'}`}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        Mais Escolhido
                    </div>
                    <h3 className="font-bold text-blue-600 text-sm uppercase">Pró</h3>
                    <div className="mt-2 mb-4">
                        <span className="text-3xl font-black text-gray-900">
                            {cycle === 'monthly' && 'R$ 119,90'}
                            {cycle === 'semestral' && 'R$ 534'}
                            {cycle === 'annual' && 'R$ 1.024'}
                        </span>
                        {cycle === 'monthly' && <span className="text-xs text-gray-500">/mês</span>}
                    </div>
                    <button 
                        onClick={() => handleSubscribe('PRO')}
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Processando...' : 'Escolher Pró'}
                    </button>
                </div>

                {/* PLANO ILIMITADO */}
                <div className={`border rounded-xl p-6 relative ${currentPlan === 'ILIMITADO' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <h3 className="font-bold text-gray-500 text-sm uppercase">Ilimitado</h3>
                    <div className="mt-2 mb-4">
                        <span className="text-3xl font-black text-gray-900">
                            {cycle === 'monthly' && 'R$ 229,90'}
                            {cycle === 'semestral' && 'R$ 1.074'}
                            {cycle === 'annual' && 'R$ 2.066'}
                        </span>
                        {cycle === 'monthly' && <span className="text-xs text-gray-500">/mês</span>}
                    </div>
                    <button 
                        onClick={() => handleSubscribe('ILIMITADO')}
                        disabled={loading}
                        className="w-full py-2 rounded-lg border-2 border-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50"
                    >
                        {loading ? 'Processando...' : 'Escolher Ilimitado'}
                    </button>
                </div>

            </div>
            
            <p className="text-center text-xs text-gray-400">
                Pagamento processado de forma 100% segura pelo Mercado Pago.
            </p>
        </div>
    )
}