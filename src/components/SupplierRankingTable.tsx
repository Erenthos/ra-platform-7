'use client'

interface SupplierRankingTableProps {
  bids: Array<{
    supplierName: string
    supplierEmail: string
    rank: number
    lastBidTime?: string
  }>
  supplierEmail: string
}

export function SupplierRankingTable({
  bids,
  supplierEmail,
}: SupplierRankingTableProps) {
  if (!bids || bids.length === 0) {
    return (
      <div className="text-center text-gray-400 py-6">
        No bids yet placed in this auction.
      </div>
    )
  }

  const supplierBid = bids.find(b => b.supplierEmail === supplierEmail)

  if (!supplierBid) {
    return (
      <div className="text-center text-gray-400 py-6">
        You haven’t placed any bids yet.
      </div>
    )
  }

  const rankColors = {
    1: 'from-green-400 to-blue-500',
    2: 'from-yellow-400 to-orange-500',
    3: 'from-pink-400 to-red-500',
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p className="text-gray-300 text-sm mb-2">Your Current Rank</p>

      <div
        className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${
          rankColors[supplierBid.rank as keyof typeof rankColors] ||
          'from-gray-300 to-gray-500'
        } animate-pulse`}
      >
        #{supplierBid.rank}
      </div>

      <p className="text-gray-400 text-sm mt-2">
        Last Bid Time:{' '}
        {supplierBid.lastBidTime
          ? new Date(supplierBid.lastBidTime).toLocaleTimeString()
          : '—'}
      </p>

      {supplierBid.rank === 1 && (
        <p className="mt-3 text-green-400 font-semibold">
          🏆 You are currently the lowest bidder!
        </p>
      )}
    </div>
  )
}

