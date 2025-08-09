import type { ReactNode } from 'react'
import VendorSidebar from '@/components/vendor/layout/VendorSidebar'

export default function VendorCalendarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full px-0">
      <div className="lg:col-span-4">
        <VendorSidebar />
      </div>
      <div className="lg:col-span-8 pr-4 md:pr-6 lg:pr-8">{children}</div>
    </div>
  )
}


