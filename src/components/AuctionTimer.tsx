'use client'

import { useEffect, useState } from 'react'

interface AuctionTimerProps {
  endsAt: string
}

export function AuctionTimer({ endsAt }: AuctionTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endsAt).getTime()
      const now = new Date().getTime()
      const difference = end - now

      if (difference <= 0) {
        setTimeLeft('Auction Closed')
        return
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}h : ${minutes
          .toString()
          .padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`
      )
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [endsAt])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-sm text-gray-400 mb-1">Time Remaining</div>
      <div
        className={`px-6 py-3 rounded-2xl text-2xl font-bold text-white transition-all duration-500 ${
          timeLeft === 'Auction Closed'
            ? 'bg-gradient-to-r from-red-500 to-red-700 shadow-lg shadow-red-500/30'
            : 'bg-gradient-to-r from-green-500 to-blue-600 shadow-lg shadow-blue-400/30 animate-pulse'
        }`}
      >
        {timeLeft}
      </div>
    </div>
  )
}

