/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Prevents ESLint blocking Render builds
  },
  typescript: {
    ignoreBuildErrors: true, // Allows Render to build even if TS strict issues appear
  },
  images: {
    domains: ['localhost', 'images.unsplash.com', 'cdn.pixabay.com'], // if you add logos/images later
  },
  output: 'standalone', // Important for Render serverless build
}

module.exports = nextConfig

