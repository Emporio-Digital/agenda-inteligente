import { NextResponse } from 'next/server'
// CORREÇÃO: Mudei de '@/lib/prisma' para '@/app/lib/prisma'
import { prisma } from '@/app/lib/prisma' 
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Email não encontrado' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'segredo-padrao-mvp')
    const token = await new SignJWT({ userId: user.id, tenantId: user.tenantId, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    const response = NextResponse.json({ success: true })
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 
    })

    return response

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}