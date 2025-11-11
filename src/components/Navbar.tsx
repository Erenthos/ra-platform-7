'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { data: session } = useSession()

  const role = session?.user?.role
  const isLoggedIn = !!session

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-2xl bg-white/10 border-b border-white/20 shadow-md"
    >
      {/* Brand Logo / Title */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500 animate-pulse" />
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-300 via-teal-200 to-purple-300 bg-clip-text text-transparent">
          Reverse Auction
        </h1>
      </Link>

      {/* Right Side Navigation */}
      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <>
            <Link href="/auth/signin">
              <Button className="bg-blue-600/70 hover:bg-blue-500/80 px-4 py-2 rounded-2xl text-white shadow-lg backdrop-blur-md border border-white/20">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-2xl text-white shadow-lg backdrop-blur-md border border-white/20">
                Sign Up
              </Button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            {role === 'BUYER' && (
              <Link href="/buyer/dashboard">
                <Button className="bg-blue-600/70 hover:bg-blue-500/80 px-4 py-2 rounded-2xl text-white shadow-lg">
                  Buyer Dashboard
                </Button>
              </Link>
            )}
            {role === 'SUPPLIER' && (
              <Link href="/supplier/dashboard">
                <Button className="bg-teal-600/70 hover:bg-teal-500/80 px-4 py-2 rounded-2xl text-white shadow-lg">
                  Supplier Dashboard
                </Button>
              </Link>
            )}
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-600/70 hover:bg-red-500/80 px-4 py-2 rounded-2xl text-white shadow-lg"
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </motion.nav>
  )
}

