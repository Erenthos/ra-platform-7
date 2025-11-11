'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function BuyerDashboard() {
  const { data: session } = useSession()
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    fetch('/api/auction/summary')
      .then(res => res.json())
      .then(data => setAuctions(data))
      .catch(err => console.error('Failed to load auctions', err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-indigo-900/60 backdrop-blur-xl text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Buyer Dashboard
        </h1>

        <div className="flex justify-between mb-8">
          <div>
            <p className="text-lg">Welcome, {session?.user?.name}</p>
            <p className="text-sm text-gray-300">{session?.user?.email}</p>
          </div>
          <Link href="/buyer/create-auction">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-lg">
              Create Auction
            </Button>
          </Link>
        </div>

        {auctions.length === 0 ? (
          <p className="text-center text-gray-400">No auctions created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auctions.map((auction: any) => (
              <Card
                key={auction.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl"
              >
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {auction.title}
                  </h2>
                  <p className="text-gray-300 mb-2">{auction.description}</p>
                  <p className="text-sm mb-2">
                    <strong>Status:</strong>{' '}
                    {auction.status === 'LIVE' ? (
                      <span className="text-green-400">Live</span>
                    ) : (
                      <span className="text-red-400">Closed</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Ends at: {new Date(auction.endsAt).toLocaleString()}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link href={`/buyer/auction/${auction.id}`}>
                      <Button className="bg-indigo-600 hover:bg-indigo-500">
                        View Auction
                      </Button>
                    </Link>
                    {auction.status === 'LIVE' && (
                      <Button
                        onClick={() =>
                          fetch('/api/auction/extend', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: auction.id }),
                          })
                        }
                        className="bg-yellow-600 hover:bg-yellow-500"
                      >
                        Extend Duration
                      </Button>
                    )}
                    {auction.status === 'CLOSED' && (
                      <Button
                        onClick={() =>
                          fetch('/api/auction/summary?id=' + auction.id)
                        }
                        className="bg-green-600 hover:bg-green-500"
                      >
                        Download Summary
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

