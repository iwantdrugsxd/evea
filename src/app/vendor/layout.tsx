import type { ReactNode } from 'react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import Footer from '@/components/layout/Footer'
import VendorSidebar from '@/components/vendor/layout/VendorSidebar'
import { Toaster } from 'react-hot-toast'

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      <div className="pt-24 pb-6"> {/* Added proper spacing from navbar */}
        <div className="w-full px-0">{children}</div>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}