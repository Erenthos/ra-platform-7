'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SupplierDashboard() {
  const { data: session } = useSession()
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    if (!session?.user?.email) return
    fetch(`/api/auction/summary?supplier=${session.user.email}`)
      .then(res => res.json())
      .then(data => setAuctions(data))
      .catch(err => console.error('Error loading auctions', err))
  }, [session])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/60 via-blue-900/40 to-slate-900/60 backdrop-blur-xl text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Supplier Dashboard
        </h1>

        <div className="flex justify-between mb-8">
          <div>
            <p className="text-lg">Welcome, {session?.user?.name}</p>
            <p className="text-sm text-gray-300">{session?.user?.email}</p>
          </div>
        </div>

        {auctions.length === 0 ? (
          <p className="text-center text-gray-400">
            No auctions assigned to you yet.
          </p>
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
                    <Link href={`/supplier/auction/${auction.id}`}>
                      <Button
                        className={`${
                          auction.status === 'LIVE'
                            ? 'bg-blue-600 hover:bg-blue-500'
                            : 'bg-gray-500 cursor-not-allowed'
                        } text-white px-4 py-2 rounded-2xl`}
                        disabled={auction.status !== 'LIVE'}
                      >
                        Enter Auction
                      </Button>
                    </Link>
                    {auction.status === 'CLOSED' && (
                      <Button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-2xl">
                        View Result
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

