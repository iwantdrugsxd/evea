import type { ReactNode } from 'react'
import VendorSidebar from '@/components/vendor/layout/VendorSidebar'

export default function VendorCardsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 w-full px-0">
      <div className="lg:col-span-4">
        <VendorSidebar />
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  )
}


