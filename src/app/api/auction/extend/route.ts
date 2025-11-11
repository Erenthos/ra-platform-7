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

    const { id, extraMinutes = 5 } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Auction ID missing' }, { status: 400 })
    }

    // Find the auction
    const auction = await prisma.auction.findUnique({
      where: { id },
    })

    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 })
    }

    // Verify buyer ownership
    if (auction.buyerEmail !== session.user.email) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    if (auction.status !== 'LIVE') {
      return NextResponse.json({ error: 'Auction is closed' }, { status: 400 })
    }

    // Extend end time
    const newEndTime = new Date(auction.endsAt)
    newEndTime.setMinutes(newEndTime.getMinutes() + extraMinutes)

    const updated = await prisma.auction.update({
      where: { id },
      data: {
        endsAt: newEndTime,
      },
    })

    return NextResponse.json({
      message: `Auction extended by ${extraMinutes} minutes`,
      newEndTime,
      updated,
    })
  } catch (error: any) {
    console.error('Auction Extend Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

