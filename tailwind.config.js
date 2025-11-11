/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          blue: '#60a5fa',
          teal: '#2dd4bf',
          purple: '#a78bfa',
          pink: '#ec4899',
          indigo: '#6366f1',
        },
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255,255,255,0.15)',
        'glow-strong': '0 0 40px rgba(99,102,241,0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 5s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      transitionProperty: {
        'bg-blur': 'background, backdrop-filter',
      },
    },
  },
  plugins: [],
}

