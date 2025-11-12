import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { auctionId, supplierEmail, decrementValue } = await req.json()

    if (!auctionId || !supplierEmail || !decrementValue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch auction and supplier info
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        suppliers: true,
        bids: true,
      },
    })

    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 })
    }

    if (auction.status !== 'LIVE') {
      return NextResponse.json({ error: 'Auction is closed' }, { status: 400 })
    }

    // Check if supplier is invited
    const invited = auction.suppliers.find(
      (s: any) => s.supplierEmail === supplierEmail
    )
    if (!invited) {
      return NextResponse.json({ error: 'You are not invited to this auction' }, { status: 403 })
    }

    // Get supplier's last bid
    const lastBid = auction.bids
      .filter((b: any) => b.supplierEmail === supplierEmail)
      .sort((a: any, b: any) => b.createdAt - a.createdAt)[0]

    const previousBidAmount = lastBid ? lastBid.amount : invited.initialBid ?? 1000000 // default large start value

    const newBidAmount = previousBidAmount - decrementValue

    // Validate minimum decrement rule
    if (decrementValue < auction.minDecrement) {
      return NextResponse.json({ error: `Minimum decrement is ₹${auction.minDecrement}` }, { status: 400 })
    }

    // Create new bid
    const newBid = await prisma.bid.create({
      data: {
        auctionId,
        supplierEmail,
        amount: newBidAmount,
        decrement: decrementValue,
      },
    })

    // Recalculate rankings
    const allBids = await prisma.bid.findMany({
      where: { auctionId },
      orderBy: { amount: 'asc' },
    })

    // Rank logic (lowest amount = rank 1)
    let rank = 1
    for (const b of allBids) {
      await prisma.bid.update({
        where: { id: b.id },
        data: { rank },
      })
      rank++
    }

    return NextResponse.json({ success: true, newBid }, { status: 200 })
  } catch (error: any) {
    console.error('Bid Submit Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

