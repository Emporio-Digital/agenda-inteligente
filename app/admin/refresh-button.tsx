'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function RefreshButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      title="Atualizar Agenda"
      className="bg-white text-blue-600 hover:text-blue-700 border border-slate-200 hover:border-blue-500/50 p-2.5 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center group disabled:opacity-50"
    >
      <svg
        className={`w-4 h-4 transition-transform duration-500 text-blue-600 ${isPending ? 'animate-spin' : 'group-hover:rotate-180'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  )
}