'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'glass'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-4 py-2 font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400',
          variant === 'default' &&
            'bg-blue-600/80 hover:bg-blue-500/90 text-white shadow-lg',
          variant === 'outline' &&
            'border border-white/30 text-white hover:bg-white/10',
          variant === 'glass' &&
            'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20',
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
