import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'BUYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, duration, minDecrement, suppliers } = await req.json()

    if (!title || !duration || !minDecrement) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const auction = await prisma.auction.create({
      data: {
        title,
        description,
        duration,
        minDecrement,
        buyerEmail: session.user.email,
        endsAt: new Date(Date.now() + duration * 60000),
        suppliers: {
          create: suppliers?.map((email: string) => ({
            supplierEmail: email,
          })),
        },
      },
    })

    return NextResponse.json({ success: true, auction })
  } catch (error) {
    console.error('Auction Create Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
