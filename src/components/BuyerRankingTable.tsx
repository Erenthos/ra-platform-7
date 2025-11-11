'use client'

interface BuyerRankingTableProps {
  bids: Array<{
    supplierName: string
    supplierEmail: string
    rank: number
    lastBidTime?: string
  }>
}

export function BuyerRankingTable({ bids }: BuyerRankingTableProps) {
  if (!bids || bids.length === 0) {
    return (
      <div className="text-center text-gray-400 py-6">
        No supplier bids yet.
      </div>
    )
  }

  const sortedBids = [...bids].sort((a, b) => a.rank - b.rank)

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/20 backdrop-blur-lg">
      <table className="min-w-full text-sm text-left text-white">
        <thead className="bg-white/10 border-b border-white/20">
          <tr>
            <th className="px-4 py-3 font-semibold">Rank</th>
            <th className="px-4 py-3 font-semibold">Supplier Name</th>
            <th className="px-4 py-3 font-semibold">Supplier Email</th>
            <th className="px-4 py-3 font-semibold">Last Bid Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedBids.map((bid, index) => (
            <tr
              key={index}
              className={`transition-colors ${
                bid.rank === 1
                  ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <td className="px-4 py-3 font-bold text-lg text-center">
                {bid.rank}
              </td>
              <td className="px-4 py-3">{bid.supplierName}</td>
              <td className="px-4 py-3 text-gray-300">{bid.supplierEmail}</td>
              <td className="px-4 py-3 text-gray-400">
                {bid.lastBidTime
                  ? new Date(bid.lastBidTime).toLocaleTimeString()
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

