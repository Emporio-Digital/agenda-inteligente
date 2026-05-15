"use client"

import { useSearchParams, usePathname } from "next/navigation"
import { Suspense } from "react"

// Esse componente interno monitora a URL e aplica uma "chave" única
function TemplateContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  // Criamos uma chave que muda toda vez que o caminho ou os filtros mudam
  const urlKey = `${pathname}?${searchParams.toString()}`

  return (
    <div key={urlKey} className="animate-in fade-in duration-500">
      {children}
    </div>
  )
}

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return (
    // O Suspense aqui é obrigatório pelo Next.js ao usar filtros no lado do cliente
    <Suspense>
      <TemplateContent>{children}</TemplateContent>
    </Suspense>
  )
}