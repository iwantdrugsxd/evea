'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'

import { 
  LayoutDashboard,
  ShoppingCart,
  Calendar,
  MessageCircle,
  BarChart3,
  Settings,
  User,
  Package,
  CreditCard,
  Star,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Home,
  FileText,
  Users,
  Award,
  HelpCircle
} from 'lucide-react'
import Button from '@/components/ui/button'

interface SidebarItem {
  label: string
  href: string
  icon: React.ComponentType<any>
  badge?: string
  children?: { label: string; href: string }[]
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/vendor/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Services',
    href: '/vendor/cards',
    icon: Package,
    badge: '12'
  },
  {
    label: 'Orders',
    href: '/vendor/orders',
    icon: ShoppingCart,
    badge: '8'
  },
  {
    label: 'Calendar',
    href: '/vendor/calendar',
    icon: Calendar
  },
  {
    label: 'Messages',
    href: '/vendor/messages',
    icon: MessageCircle,
    badge: '3'
  },
  {
    label: 'Analytics',
    href: '/vendor/analytics',
    icon: BarChart3
  },
  {
    label: 'Reviews',
    href: '/vendor/reviews',
    icon: Star
  },
  {
    label: 'Earnings',
    href: '/vendor/earnings',
    icon: CreditCard
  },
  {
    label: 'Profile',
    href: '/vendor/profile',
    icon: User
  },
  {
    label: 'Settings',
    href: '/vendor/settings',
    icon: Settings
  }
]

export default function VendorSidebar() {
  const { isCollapsed, setIsCollapsed, isDesktop } = useSidebar()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/vendor/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const SidebarItem = ({ item }: { item: SidebarItem }) => {
    const active = isActive(item.href)
    
    return (
      <Link href={item.href}>
        <div
          className={`relative group flex items-center px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer hover:translate-x-1 ${
            active 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400' 
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-3 w-full">
            <div className={`p-2 rounded-lg transition-colors ${
              active ? 'bg-blue-500/20' : 'bg-white/5 group-hover:bg-white/10'
            }`}>
              <item.icon className={`h-5 w-5 ${active ? 'text-blue-400' : 'text-white/70'}`} />
            </div>
            {!isCollapsed && (
              <span className="font-medium flex-1">{item.label}</span>
            )}
            {item.badge && !isCollapsed && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                {item.badge}
              </div>
            )}
          </div>
          {active && (
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"
            />
          )}
        </div>
      </Link>
    )
  }

  return (
    <>
      
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          variant="outline"
          size="sm"
          className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-black/90 backdrop-blur-xl border-r border-white/10 z-40 transition-all duration-300 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-70'
        } ${isDesktop ? 'translate-x-0' : isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: isCollapsed ? '80px' : '280px' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-white text-lg">Evea</h1>
                    <p className="text-xs text-white/50">Vendor Portal</p>
                  </div>
                </div>
              )}
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant="ghost"
                size="sm"
                className="hidden lg:flex text-white/70 hover:text-white hover:bg-white/10"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
              </Button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 opacity-100">
                  <p className="font-medium text-white text-sm">Perfect Events</p>
                  <p className="text-xs text-white/50">Premium Vendor</p>
                </div>
              )}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2"
                >
                  <Bell className="h-4 w-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-2">
              {sidebarItems.map((item, index) => (
                <div
                  key={item.href}
                  className="opacity-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SidebarItem item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                {!isCollapsed && <span>Help & Support</span>}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 mr-3" />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


