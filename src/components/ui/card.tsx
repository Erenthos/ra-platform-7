import * as React from 'react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg rounded-3xl p-4',
        className
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('p-4 text-white space-y-3', className)}
      {...props}
    />
  )
}
