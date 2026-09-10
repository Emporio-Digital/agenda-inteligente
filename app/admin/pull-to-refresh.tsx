'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function PullToRefresh() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const startY = useRef(0)
  const isPulling = useRef(false)
  const pullDistanceRef = useRef(0)
  const THRESHOLD = 75 // Trava de segurança: precisa puxar pelo menos 75px

  useEffect(() => {
    if (!isPending && isRefreshing) {
      setIsRefreshing(false)
      setPullDistance(0)
      pullDistanceRef.current = 0
    }
  }, [isPending, isRefreshing])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Só ativa se o scroll estiver no topo absoluto
      if (window.scrollY <= 0) {
        startY.current = e.touches[0].clientY
        isPulling.current = true
      } else {
        isPulling.current = false
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || isRefreshing) return
      if (window.scrollY > 0) {
        isPulling.current = false
        setPullDistance(0)
        pullDistanceRef.current = 0
        return
      }

      const currentY = e.touches[0].clientY
      const diff = currentY - startY.current

      if (diff > 0) {
        // Puxando pra baixo: ativa resistência de mola
        const distance = Math.min(diff * 0.42, 105)
        pullDistanceRef.current = distance
        setPullDistance(distance)
        if (e.cancelable && diff > 15) {
          e.preventDefault()
        }
      } else {
        // Arrastando pra cima pra ver a agenda: solta imediatamente pro navegador rolar normal
        isPulling.current = false
        pullDistanceRef.current = 0
        setPullDistance(0)
      }
    }

    const handleTouchEnd = () => {
      if (!isPulling.current || isRefreshing) return
      isPulling.current = false

      // Usa a ref para não depender de re-render durante o toque
      if (pullDistanceRef.current >= THRESHOLD) {
        setIsRefreshing(true)
        setPullDistance(THRESHOLD)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(15) // Leve feedback tátil do celular
        }
        startTransition(() => {
          router.refresh()
        })
      } else {
        pullDistanceRef.current = 0
        setPullDistance(0)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isRefreshing, router])

  if (pullDistance === 0 && !isRefreshing) return null

  const progress = Math.min(pullDistance / THRESHOLD, 1)
  const circumference = 2 * Math.PI * 10
  const strokeDashoffset = circumference - progress * circumference

  return (
    <div
      className="fixed inset-x-0 z-50 pointer-events-none flex justify-center md:hidden"
      style={{
        top: '68px',
        transform: `translateY(${pullDistance > 0 ? pullDistance * 0.6 : 0}px)`,
        transition: isPulling.current ? 'none' : 'transform 0.25s ease-out, opacity 0.2s ease-out',
        opacity: pullDistance > 10 || isRefreshing ? 1 : 0,
      }}
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-full p-2.5 flex items-center justify-center">
        {isRefreshing ? (
          <svg className="w-5 h-5 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              {/* TRILHO DE FUNDO CINZA */}
              <circle cx="12" cy="12" r="10" stroke="#f1f5f9" strokeWidth="2.5" />
              
              {/* ANEL AZUL DE CARREGAMENTO */}
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="-rotate-90 origin-center"
              />

              {/* SETA VETORIAL MILIMETRICAMENTE CENTRALIZADA */}
              <path
                d="M12 7.5v9m-3-3l3 3 3-3"
                stroke="#2563eb"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 origin-center ${progress >= 1 ? 'rotate-180' : ''}`}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}