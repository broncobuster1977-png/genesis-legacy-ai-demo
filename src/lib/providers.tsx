/* LEGACY AI PROVIDERS CONFIGURATION */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}