'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AuctionTimer } from '@/components/AuctionTimer'
import { SupplierRankingTable } from '@/components/SupplierRankingTable'
import { BidInput } from '@/components/BidInput'

export default function SupplierAuctionPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const [auction, setAuction] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const fetchAuction = async () => {
    try {
      const res = await fetch(`/api/auction/summary?id=${id}&supplier=${session?.user?.email}`)
      const data = await res.json()
      setAuction(data)
    } catch (err) {
      console.error('Error fetching auction data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!session?.user?.email) return
    fetchAuction()
    const interval = setInterval(fetchAuction, 5000)
    return () => clearInterval(interval)
  }, [session, id])

  const handleBid = async (decrementValue: number) => {
    setSubmitting(true)
    try {
      await fetch('/api/auction/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auctionId: id,
          supplierEmail: session?.user?.email,
          decrementValue,
        }),
      })
      await fetchAuction()
    } catch (err) {
      console.error('Error placing bid:', err)
      alert('Failed to place bid.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading auction...
      </div>
    )

  if (!auction)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Auction not found or not accessible.
      </div>
    )

  const supplierBid = auction.bids?.find(
    (b: any) => b.supplierEmail === session?.user?.email
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/70 via-indigo-900/40 to-blue-900/60 backdrop-blur-xl text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Auction Header */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
          <CardContent className="p-6">
            <h1 className="text-4xl font-bold mb-2">{auction.title}</h1>
            <p className="text-gray-300 mb-4">{auction.description}</p>
            <AuctionTimer endsAt={auction.endsAt} />
          </CardContent>
        </Card>

        {/* Bid Section */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
          <CardContent className="p-6 space-y-5">
            <h2 className="text-2xl font-semibold mb-4">Your Current Bid</h2>

            <div className="text-3xl font-bold mb-3 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              ₹ {supplierBid?.currentBid?.toLocaleString() ?? 'Not Yet Bid'}
            </div>

            <p className="text-sm text-gray-300 text-center">
              Minimum Bid Decrement Allowed: ₹{auction.minDecrement}
            </p>

            <BidInput
              minDecrement={auction.minDecrement}
              onSubmit={handleBid}
              disabled={submitting || auction.status === 'CLOSED'}
            />
          </CardContent>
        </Card>

        {/* Ranking Section */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Current Rank</h2>
            <SupplierRankingTable bids={auction.bids || []} supplierEmail={session?.user?.email!} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

