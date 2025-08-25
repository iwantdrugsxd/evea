import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/lib/suppress-warnings'

const inter = Inter({ subsets: ['latin'] })
const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display'
})

export const metadata: Metadata = {
  title: 'EVEA - Event Vendor Ecosystem Application',
  description: 'Discover and book amazing event services from verified vendors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />
      </head>
      <body suppressHydrationWarning className={`${inter.className} ${playfairDisplay.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}