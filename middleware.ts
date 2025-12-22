import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  // Pega o token do cookie
  const token = request.cookies.get('auth_token')?.value

  // Se não tem token, manda pro login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Verifica se o token é válido (assinatura digital)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    await jwtVerify(token, secret)
    
    // Se passou, libera o acesso
    return NextResponse.next()
  } catch (error) {
    // Se token inválido/expirado, manda pro login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Configura para rodar APENAS nas rotas de admin
export const config = {
  matcher: '/admin/:path*',
}