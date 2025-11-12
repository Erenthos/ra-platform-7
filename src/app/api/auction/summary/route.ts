import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'BUYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const auctions = await prisma.auction.findMany({
      where: { buyerEmail: session.user.email },
      include: {
        bids: true,
        suppliers: true,
      },
    })

    return NextResponse.json({ auctions })
  } catch (error) {
    console.error('Auction Summary Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
