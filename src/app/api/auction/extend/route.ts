import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'BUYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { auctionId, extendMinutes } = await req.json()
    if (!auctionId || !extendMinutes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const auction = await prisma.auction.update({
      where: { id: auctionId },
      data: {
        endsAt: {
          set: new Date(Date.now() + extendMinutes * 60000),
        },
      },
    })

    return NextResponse.json({ success: true, auction })
  } catch (error) {
    console.error('Extend Auction Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
