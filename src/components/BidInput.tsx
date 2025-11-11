'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface BidInputProps {
  minDecrement: number
  onSubmit: (decrementValue: number) => void
  disabled?: boolean
}

export function BidInput({ minDecrement, onSubmit, disabled = false }: BidInputProps) {
  const [value, setValue] = useState<number | ''>('')
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? Number(e.target.value) : ''
    setValue(val)
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (value === '' || isNaN(Number(value))) {
      setError('Please enter a valid number.')
      return
    }
    if (Number(value) < minDecrement) {
      setError(`Minimum decrement is ₹${minDecrement}.`)
      return
    }

    onSubmit(Number(value))
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <div className="flex items-center gap-3 w-full justify-center">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={`Enter decrement ≥ ₹${minDecrement}`}
          className="w-48 px-4 py-2 rounded-xl text-center bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <Button
          type="submit"
          disabled={disabled}
          className={`bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-2xl shadow-lg ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          Submit Bid
        </Button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  )
}

