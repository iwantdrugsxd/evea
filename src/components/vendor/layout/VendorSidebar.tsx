'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Calendar as CalendarIcon,
  BarChart3,
  Star,
  MessageSquare,
  DollarSign,
  Package,
  RefreshCw,
  User,
  Settings,
  LogOut,
} from 'lucide-react'

type SidebarProps = {
  newOrdersCount?: number
  unreadMessagesCount?: number
  className?: string
}

export default function VendorSidebar({
  newOrdersCount = 3,
  unreadMessagesCount = 2,
  className = '',
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const mainNav = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/vendor/dashboard' },
    { icon: CreditCard, label: 'Service Cards', href: '/vendor/cards' },
    { icon: ShoppingBag, label: 'Orders', href: '/vendor/orders', badge: newOrdersCount },
    { icon: CalendarIcon, label: 'Calendar', href: '/vendor/calendar' },
    { icon: BarChart3, label: 'Analytics', href: '/vendor/analytics' },
    { icon: Star, label: 'Reviews', href: '/vendor/reviews' },
    { icon: MessageSquare, label: 'Messages', href: '/vendor/messages', badge: unreadMessagesCount },
    { icon: DollarSign, label: 'Earnings', href: '/vendor/earnings' },
    { icon: Package, label: 'Inventory', href: '/vendor/inventory' },
    { icon: RefreshCw, label: 'Refunds', href: '/vendor/refunds' },
  ]

  const bottomNav = [
    { icon: User, label: 'Profile', href: '/vendor/profile' },
    { icon: Settings, label: 'Settings', href: '/vendor/settings' },
  ]

  const isActive = (href: string) => pathname?.startsWith(href)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    router.push('/vendor/login')
  }

  const NavItem = ({ icon: Icon, label, href, badge }: { icon: any; label: string; href: string; badge?: number }) => (
    <Link href={href} className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
      isActive(href) ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
    }`}>
      <span className="flex items-center">
        <Icon className={`h-4 w-4 mr-3 ${isActive(href) ? 'text-red-600' : 'text-gray-400'}`} />
        <span className="text-sm font-medium">{label}</span>
      </span>
      {badge ? (
        <span className="ml-2 inline-flex items-center justify-center px-2 min-w-[1.5rem] h-6 rounded-full text-xs font-semibold bg-red-600 text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  )

  return (
    <aside className={`w-full lg:w-72 bg-white border-r border-gray-200 mt-4 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto ${className}`}>
      <div className="h-full flex flex-col p-2">
        {/* Brand */}
        <div className="mb-4">
          <Link href="/vendor/dashboard" className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold mr-2">E</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Evea Vendor</p>
              <p className="text-xs text-gray-500">Business Suite</p>
            </div>
          </Link>
        </div>

        {/* Main Nav */}
        <nav className="space-y-1.5 flex-1">
          {mainNav.map((item) => (
            <NavItem key={item.href} icon={item.icon} label={item.label} href={item.href} badge={item.badge} />
          ))}
        </nav>

        {/* Bottom Nav */}
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-1.5">
          {bottomNav.map((item) => (
            <NavItem key={item.href} icon={item.icon} label={item.label} href={item.href} />
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3 text-gray-400" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}


