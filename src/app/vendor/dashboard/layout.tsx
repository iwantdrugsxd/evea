import type { ReactNode } from 'react'
import VendorSidebar from '@/components/vendor/layout/VendorSidebar'

export default function VendorDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full px-0">
      <div className="lg:col-span-3">
        <VendorSidebar />
      </div>
      <div className="lg:col-span-9 pr-4 md:pr-6 lg:pr-8">
        {children}
      </div>
    </div>
  )
}


