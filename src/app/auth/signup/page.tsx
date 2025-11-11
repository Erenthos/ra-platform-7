'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'BUYER',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signup failed')

      setSuccess(true)
      setTimeout(() => router.push('/auth/signin'), 1500)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/60 via-blue-900/40 to-slate-900/60 flex justify-center items-center p-6">
      <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl w-full max-w-md rounded-3xl p-6">
        <CardContent>
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="BUYER" className="text-black">
                  Buyer
                </option>
                <option value="SUPPLIER" className="text-black">
                  Supplier
                </option>
              </select>
            </div>

            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
            {success && <p className="text-green-400 text-center text-sm">Account created successfully!</p>}

            <div className="text-center pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 rounded-2xl shadow-lg transition-all"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>

            <p className="text-gray-300 text-center text-sm mt-4">
              Already have an account?{' '}
              <a
                href="/auth/signin"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign In
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

