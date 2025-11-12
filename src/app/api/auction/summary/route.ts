import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import ExcelJS from 'exceljs'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const auctionId = searchParams.get('id')
    const supplierEmail = searchParams.get('supplier')

    // If auctionId is provided → detailed auction summary
    if (auctionId) {
      const auction = await prisma.auction.findUnique({
        where: { id: auctionId },
        include: {
          bids: {
            orderBy: { amount: 'asc' },
          },
          suppliers: true,
        },
      })

      if (!auction) {
        return NextResponse.json({ error: 'Auction not found' }, { status: 404 })
      }

      // Return detailed auction data (for buyer or supplier)
      return NextResponse.json(auction, { status: 200 })
    }

    // Supplier’s view → all auctions they are invited to
    if (supplierEmail) {
      const auctions = await prisma.auction.findMany({
        where: {
          suppliers: {
            some: { supplierEmail },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(auctions, { status: 200 })
    }

    // Buyer’s view → all auctions they created
    const auctions = await prisma.auction.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(auctions, { status: 200 })
  } catch (error: any) {
    console.error('Auction Summary Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json()

    const auction = await prisma.auction.findUnique({
      where: { id },
      include: {
        bids: {
          orderBy: { amount: 'asc' },
        },
      },
    })

    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 })
    }

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Auction Summary')

    // Header
    sheet.addRow(['AUCTION SUMMARY REPORT'])
    sheet.addRow([])
    sheet.addRow(['Auction Title', auction.title])
    sheet.addRow(['Description', auction.description])
    sheet.addRow(['Buyer', auction.buyerEmail])
    sheet.addRow(['Ends At', auction.endsAt.toLocaleString()])
    sheet.addRow([])

    // Table header
    sheet.addRow(['Supplier Email', 'Rank', 'Last Bid Amount (₹)', 'Last Bid Time'])

    // Table rows
    auction.bids.forEach(bid => {
      sheet.addRow([
        bid.supplierEmail,
        bid.rank ?? '-',
        bid.amount,
        new Date(bid.createdAt).toLocaleString(),
      ])
    })

    // Styling
    sheet.getRow(1).font = { bold: true, size: 16 }
    sheet.columns.forEach(col => (col.width = 25))

    const buffer = await workbook.xlsx.writeBuffer()
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename=Auction_Summary_${auction.title}.xlsx`,
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    })
  } catch (error: any) {
    console.error('Auction Summary Excel Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

