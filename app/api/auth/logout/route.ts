import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Deleta o cookie definindo data de expiração no passado
  response.cookies.set({
    name: 'auth_token',
    value: '',
    expires: new Date(0),
    path: '/',
  })

  return response
}