'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Aurora animated background layers */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 opacity-25 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-10 md:p-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.1)] text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent mb-4">
          English Reverse Auction Platform
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Empowering buyers and suppliers with real-time, transparent, and
          competitive bidding — where the <span className="font-semibold text-blue-300">lowest bid wins.</span>
        </p>

        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/auth/signup">
            <Button className="bg-blue-600/80 hover:bg-blue-500/90 px-6 py-3 rounded-2xl shadow-lg backdrop-blur-xl border border-white/20">
              ✨ Create Account
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl shadow-lg backdrop-blur-xl border border-white/20">
              🔐 Sign In
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-gray-400 text-sm"
        >
          Designed with ❤️ for transparent procurement.
        </motion.div>
      </motion.div>

      {/* Soft glow footer aura */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl" />
    </div>
  )
}

