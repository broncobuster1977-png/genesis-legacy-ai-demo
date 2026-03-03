import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/lib/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genesis Legacy AI - The Beginning of a Legacy',
  description: 'The gentle presence that appears when families need guidance. A companion that walks with your family through every season of life, carrying wisdom from generation to generation.',
  keywords: ['family AI', 'generational wisdom', 'AI companion', 'family guidance', 'legacy planning', 'generational intelligence'],
  authors: [{ name: 'Genesis Legacy AI' }],
  
  // Open Graph metadata
  openGraph: {
    title: 'Genesis Legacy AI - The Beginning of a Legacy',
    description: 'The gentle presence that appears when families need guidance across generations.',
    type: 'website',
    locale: 'en_US',
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Genesis Legacy AI - The Beginning of a Legacy',
    description: 'The gentle presence that appears when families need guidance across generations.',
  },
  
  // Additional metadata
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}