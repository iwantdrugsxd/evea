import type { ReactNode } from 'react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

export default function VendorAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      <div className="vendor-auth-content">
        <div className="w-full">
          {children}
        </div>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}
