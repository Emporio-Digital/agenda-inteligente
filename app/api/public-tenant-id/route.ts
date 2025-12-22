import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 })

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true } // Só retorna o ID, seguro.
  })

  if (!tenant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(tenant)
}