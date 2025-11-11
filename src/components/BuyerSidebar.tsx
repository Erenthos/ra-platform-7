'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  User,
  Settings,
} from 'lucide-react'

export default function BuyerSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/buyer/dashboard', icon: LayoutDashboard },
    { name: 'Create Auction', href: '/buyer/create-auction', icon: PlusCircle },
    { name: 'Auction Summary', href: '/buyer/summary', icon: BarChart3 },
    { name: 'Profile', href: '/buyer/profile', icon: User },
    { name: 'Settings', href: '/buyer/settings', icon: Settings },
  ]

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hidden md:flex fixed left-0 top-0 h-screen w-60 bg-white/10 backdrop-blur-2xl border-r border-white/20 flex-col justify-between z-40 shadow-xl"
    >
      {/* Logo Section */}
      <div className="p-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 bg-clip-text text-transparent mb-6">
          Buyer Panel
        </h2>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-600/60 to-teal-500/60 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 text-center border-t border-white/10 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Reverse Auction</p>
      </div>
    </motion.aside>
  )
}
