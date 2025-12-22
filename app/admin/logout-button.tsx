'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <button 
      onClick={handleLogout}
      className="text-sm font-bold text-red-500 hover:text-red-700 border border-red-100 bg-red-50 px-4 py-2 rounded-lg transition-colors"
    >
      Sair
    </button>
  )
}