'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative w-full text-center py-6 mt-auto backdrop-blur-2xl bg-white/10 border-t border-white/20"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} English Reverse Auction Platform
        </p>
        <p className="text-xs text-gray-400">
          Crafted with <span className="text-pink-400">❤</span> using Next.js, Prisma & Aurora Design
        </p>
      </div>

      {/* Aurora underline glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400 rounded-full blur-sm opacity-60" />
    </motion.footer>
  )
}

