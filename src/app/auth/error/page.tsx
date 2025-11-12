'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const messages: Record<string, string> = {
    CredentialsSignin: 'Invalid email or password.',
    AccessDenied: 'Access denied.',
    Configuration: 'Configuration error. Please contact admin.',
    default: 'An unknown error occurred. Please try again.',
  }

  const message = messages[error ?? 'default']

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-purple-700 to-indigo-900 text-white">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-2">Authentication Error</h1>
        <p className="mb-4">{message}</p>
        <Link
          href="/auth/signin"
          className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition"
        >
          Go Back to Sign In
        </Link>
      </div>
    </div>
  )
}
