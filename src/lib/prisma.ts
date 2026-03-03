/* LEGACY AI PRISMA CLIENT CONFIGURATION */
/* Atlas Technical Director - February 28, 2026 */

import { PrismaClient } from '@prisma/client'

// Prevent multiple instances in development
declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Helper function to safely disconnect
export async function disconnectPrisma() {
  await prisma.$disconnect()
}