// ✅ NextAuth v5 compatible route handler
// This connects your /api/auth/* routes to the NextAuth handlers
// defined inside src/lib/auth.ts

export { handlers as GET, handlers as POST } from '@/lib/auth'
