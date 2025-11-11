'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SigninPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      // Get session to determine role
      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json()

      const role = session?.user?.role
      if (role === 'BUYER') router.push('/buyer/dashboard')
      else if (role === 'SUPPLIER') router.push('/supplier/dashboard')
      else router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-indigo-900/60 flex justify-center items-center p-6">
      <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl w-full max-w-md rounded-3xl p-6">
        <CardContent>
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {error && <p className="text-red-400 text-center text-sm">{error}</p>}

            <div className="text-center pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 rounded-2xl shadow-lg transition-all"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>

            <p className="text-gray-300 text-center text-sm mt-4">
              Don’t have an account?{' '}
              <a
                href="/auth/signup"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

