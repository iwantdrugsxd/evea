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
  TrendingUp,
  Award,
  Shield,
} from 'lucide-react'

type SidebarProps = {
  newOrdersCount?: number
  unreadMessagesCount?: number
  className?: string
}

export default function VendorSidebar({
  newOrdersCount = 0,
  unreadMessagesCount = 0,
  className = '',
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const mainNav = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/vendor/dashboard',
      description: 'Overview & Analytics'
    },
    { 
      icon: CreditCard, 
      label: 'Service Cards', 
      href: '/vendor/cards',
      description: 'Manage Your Services'
    },
    { 
      icon: ShoppingBag, 
      label: 'Orders', 
      href: '/vendor/orders', 
      badge: newOrdersCount,
      description: 'Track & Manage Orders'
    },
    { 
      icon: CalendarIcon, 
      label: 'Calendar', 
      href: '/vendor/calendar',
      description: 'Event Scheduling'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      href: '/vendor/analytics',
      description: 'Performance Insights'
    },
    { 
      icon: Star, 
      label: 'Reviews', 
      href: '/vendor/reviews',
      description: 'Customer Feedback'
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      href: '/vendor/messages', 
      badge: unreadMessagesCount,
      description: 'Customer Communications'
    },
    { 
      icon: DollarSign, 
      label: 'Earnings', 
      href: '/vendor/earnings',
      description: 'Revenue & Payouts'
    },
    { 
      icon: Package, 
      label: 'Inventory', 
      href: '/vendor/inventory',
      description: 'Stock Management'
    },
    { 
      icon: RefreshCw, 
      label: 'Refunds', 
      href: '/vendor/refunds',
      description: 'Return & Refund Requests'
    },
  ]

  const bottomNav = [
    { 
      icon: User, 
      label: 'Profile', 
      href: '/vendor/profile',
      description: 'Business Profile'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/vendor/settings',
      description: 'Account Settings'
    },
  ]

  const isActive = (href: string) => pathname?.startsWith(href)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    router.push('/vendor/login')
  }

  const NavItem = ({ 
    icon: Icon, 
    label, 
    href, 
    badge, 
    description 
  }: { 
    icon: any; 
    label: string; 
    href: string; 
    badge?: number;
    description?: string;
  }) => (
    <Link 
      href={href} 
      className={`group relative flex items-start space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive(href) 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
          : 'text-gray-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
        isActive(href) 
          ? 'bg-white/20 text-white' 
          : 'bg-white/10 text-gray-400 group-hover:bg-blue-500/20 group-hover:text-blue-400'
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-semibold transition-colors ${
            isActive(href) ? 'text-white' : 'text-gray-300 group-hover:text-white'
          }`}>
            {label}
          </p>
          {badge ? (
            <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isActive(href) 
                ? 'bg-white/20 text-white' 
                : 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30'
            }`}>
              {badge}
            </span>
          ) : null}
        </div>
        {description && (
          <p className={`text-xs mt-1 transition-colors ${
            isActive(href) ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-400'
          }`}>
            {description}
          </p>
        )}
      </div>
    </Link>
  )

  return (
    <aside className={`w-full lg:w-80 bg-black/50 backdrop-blur-xl border-r border-white/10 mt-4 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto ${className}`}>
      <div className="h-full flex flex-col p-6">
        {/* Brand Header */}
        <div className="mb-8">
          <Link href="/vendor/dashboard" className="flex items-center group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg mr-3 shadow-lg">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Evea Vendor
              </p>
              <p className="text-sm text-gray-400">Professional Business Suite</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mb-6 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-300">Quick Stats</span>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-lg font-bold text-white">{newOrdersCount}</p>
              <p className="text-xs text-gray-400">New Orders</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{unreadMessagesCount}</p>
              <p className="text-xs text-gray-400">Messages</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-2 flex-1">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main Menu
            </h3>
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavItem 
                  key={item.href} 
                  icon={item.icon} 
                  label={item.label} 
                  href={item.href} 
                  badge={item.badge}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Account
            </h3>
            <div className="space-y-1">
              {bottomNav.map((item) => (
                <NavItem 
                  key={item.href} 
                  icon={item.icon} 
                  label={item.label} 
                  href={item.href}
                  description={item.description}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
          >
            <div className="flex-shrink-0 p-2 rounded-lg bg-white/10 text-gray-400 group-hover:bg-red-500/20 group-hover:text-red-400 transition-all duration-200">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Shield className="h-3 w-3" />
            <span>Secure & Protected</span>
          </div>
        </div>
      </div>
    </aside>
  )
}


