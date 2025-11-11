import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names safely.
 * Example:
 * const buttonClass = cn('bg-blue-500', isActive && 'opacity-100')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a Date or ISO string into a short human-readable string.
 * Example: formatDate('2025-11-11T10:00:00Z') => "Nov 11, 2025, 10:00 AM"
 */
export function formatDate(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

/**
 * Generates a random ID (used for auctions, session keys, etc.)
 * Example: randomId() => "AUC-3F7KX9"
 */
export function randomId(prefix = 'AUC') {
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${rand}`
}

