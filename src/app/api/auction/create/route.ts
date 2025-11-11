import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, duration, minDecrement, suppliers } = await req.json()

    if (!title || !description || !duration || !minDecrement || !suppliers?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Calculate auction end time
    const endsAt = new Date()
    endsAt.setMinutes(endsAt.getMinutes() + duration)

    // Create auction
    const auction = await prisma.auction.create({
      data: {
        title,
        description,
        duration,
        minDecrement,
        status: 'LIVE',
        endsAt,
        buyerEmail: session.user.email,
        suppliers: {
          create: suppliers.map((email: string) => ({
            supplierEmail: email,
          })),
        },
      },
      include: { suppliers: true },
    })

    return NextResponse.json(auction, { status: 201 })
  } catch (error: any) {
    console.error('Auction Create Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

