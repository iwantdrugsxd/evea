import type { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import VendorSidebar from '@/components/vendor/layout/VendorSidebar'
import { Toaster } from 'react-hot-toast'

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      <main className="pt-20 lg:pt-24 pb-6">
        <div className="w-full px-0">{children}</div>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}