import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'SUPPLIER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { auctionId, amount, decrement } = await req.json()

    if (!auctionId || !amount) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const auction = await prisma.auction.findUnique({ where: { id: auctionId } })
    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 })
    }

    const bid = await prisma.bid.upsert({
      where: {
        auctionId_supplierEmail: {
          auctionId,
          supplierEmail: session.user.email,
        },
      },
      update: { amount, decrement },
      create: {
        auctionId,
        supplierEmail: session.user.email,
        amount,
        decrement,
      },
    })

    return NextResponse.json({ success: true, bid })
  } catch (error) {
    console.error('Bid Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
