import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // Se der erro no import, tente '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 1. Busca usuário no banco
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Email não encontrado' }, { status: 401 })
    }

    // 2. Confere a senha
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    // 3. Gera o Token (O Crachá)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const token = await new SignJWT({ userId: user.id, tenantId: user.tenantId, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    // 4. Salva no Cookie e retorna sucesso
    const response = NextResponse.json({ success: true })
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true, // Segurança: JavaScript não lê esse cookie
      path: '/',
      maxAge: 60 * 60 * 24 // 1 dia
    })

    return response

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}