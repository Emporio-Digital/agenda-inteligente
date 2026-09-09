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
    
    // Novo estado para controlar a visualização do upgrade
    const [showUpgrade, setShowUpgrade] = useState(false);

    const isTrial = !status || status === 'TRIAL' || status === 'PENDING';

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

    // LÓGICA DE EXIBIÇÃO: Se já pagou e não clicou em upgrade, mostra o painel reduzido
    if (!isTrial && !showUpgrade) {
        return (
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Assinatura Ativa</p>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">Plano {currentPlan}</h3>
                    <p className="text-slate-500 text-sm">Obrigado por ser nosso parceiro.</p>
                </div>
                
                <div className="w-full md:w-auto bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center shadow-sm">
                    <h4 className="text-slate-900 font-bold mb-2">Deseja mais recursos?</h4>
                    <p className="text-xs text-slate-500 mb-4 max-w-[200px] mx-auto">
                        Você pode alterar seu plano a qualquer momento para desbloquear novas funcionalidades.
                    </p>
                    <button 
                        onClick={() => setShowUpgrade(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all w-full shadow-sm active:scale-95"
                    >
                        Fazer Upgrade 🚀
                    </button>
                </div>
            </div>
        )
    }

    // Se for Trial OU se clicou em Upgrade, mostra os planos originais
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

                {/* PLANO PRO (Texto Atualizado) */}
                <div className={`border rounded-xl p-6 relative ${currentPlan === 'PRO' ? 'border-blue-500 bg-blue-50' : 'border-blue-100 bg-white ring-2 ring-blue-500 ring-offset-2'}`}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        Mais Escolhido
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-blue-600 text-sm uppercase">Pró</h3>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">até 5 pessoas</span>
                    </div>
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
    Pagamento processado de forma 100% segura pela Stripe.
</p>
        </div>
    )
}