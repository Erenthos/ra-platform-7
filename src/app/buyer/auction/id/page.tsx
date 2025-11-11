'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AuctionTimer } from '@/components/AuctionTimer'
import { BuyerRankingTable } from '@/components/BuyerRankingTable'

export default function BuyerAuctionPage() {
  const { id } = useParams()
  const [auction, setAuction] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Fetch auction details + live bids
  const fetchAuction = async () => {
    try {
      const res = await fetch(`/api/auction/summary?id=${id}`)
      const data = await res.json()
      setAuction(data)
    } catch (err) {
      console.error('Error fetching auction:', err)
    } finally {
      setLoading(false)
    }
  }

  // Poll every 5 seconds for live updates
  useEffect(() => {
    fetchAuction()
    const interval = setInterval(fetchAuction, 5000)
    return () => clearInterval(interval)
  }, [id])

  const extendAuction = async () => {
    setUpdating(true)
    try {
      await fetch('/api/auction/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      await fetchAuction()
    } catch (err) {
      console.error('Failed to extend auction', err)
    } finally {
      setUpdating(false)
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading auction...
      </div>
    )

  if (!auction)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Auction not found.
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/70 via-blue-900/40 to-indigo-900/60 backdrop-blur-xl text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Auction Info Card */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
          <CardContent className="p-6">
            <h1 className="text-4xl font-bold mb-2">{auction.title}</h1>
            <p className="text-gray-300 mb-4">{auction.description}</p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <AuctionTimer endsAt={auction.endsAt} />
              <Button
                onClick={extendAuction}
                disabled={updating}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-2xl"
              >
                {updating ? 'Extending...' : 'Extend Duration'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ranking Table */}
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Live Supplier Ranking</h2>
            <BuyerRankingTable bids={auction.bids || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

