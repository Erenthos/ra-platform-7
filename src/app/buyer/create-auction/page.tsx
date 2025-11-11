'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CreateAuction() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    minDecrement: '',
    suppliers: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auction/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          duration: Number(formData.duration),
          minDecrement: Number(formData.minDecrement),
          suppliers: formData.suppliers.split(',').map(s => s.trim()),
        }),
      })

      if (!res.ok) throw new Error('Failed to create auction')
      router.push('/buyer/dashboard')
    } catch (err) {
      console.error(err)
      alert('Error creating auction.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/70 via-blue-900/40 to-indigo-900/60 backdrop-blur-xl text-white flex justify-center items-center p-8">
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl w-full max-w-2xl p-6">
        <CardContent>
          <h1 className="text-3xl font-bold text-center mb-6">Create New Auction</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Auction Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
                placeholder="e.g., Solar Cables Procurement"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
                placeholder="Brief about the auction..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none"
                  placeholder="e.g., 30"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Min Bid Decrement (₹)</label>
                <input
                  type="number"
                  name="minDecrement"
                  value={formData.minDecrement}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none"
                  placeholder="e.g., 100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Supplier Emails</label>
              <textarea
                name="suppliers"
                value={formData.suppliers}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
                placeholder="supplier1@example.com, supplier2@example.com"
              ></textarea>
            </div>

            <div className="text-center mt-6">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-2xl shadow-lg"
              >
                {loading ? 'Creating...' : 'Create Auction'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

