import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/components/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'English Reverse Auction Platform',
  description:
    'A modern Aurora-styled Reverse Auction system where the lowest bid wins.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative min-h-screen text-white bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-x-hidden`}
      >
        {/* Aurora background layers */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 opacity-25 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Global Navbar & Auth Context */}
        <NextAuthProvider>
          <Navbar />

          <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-28 pb-10 fade-in">
            {children}
          </main>
        </NextAuthProvider>

        {/* Soft footer glow */}
        <div className="fixed bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent blur-2xl" />
      </body>
    </html>
  )
}
