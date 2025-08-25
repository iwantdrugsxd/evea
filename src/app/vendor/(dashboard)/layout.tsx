'use client'

import type { ReactNode } from 'react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import VendorSidebar from '@/components/vendor/layout/VendorSidebar'
import { Toaster } from 'react-hot-toast'
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext'

function VendorLayoutContent({ children }: { children: ReactNode }) {
  const { isCollapsed, isDesktop } = useSidebar()
  
  const getContentMargin = () => {
    if (!isDesktop) return 'ml-0'
    return isCollapsed ? 'lg:ml-20' : 'lg:ml-70'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      <VendorSidebar />
      {/* Main content area - positioned to start from right side of sidebar */}
      <div className={`pt-24 pb-6 transition-all duration-300 ${getContentMargin()}`}>
        <div className="w-full h-full">
          <div className="w-full h-full">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <VendorLayoutContent>{children}</VendorLayoutContent>
    </SidebarProvider>
  )
}