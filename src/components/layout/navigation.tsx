'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  name: string
  href: string
  dropdown?: NavigationItem[]
}

interface NavigationProps {
  items: NavigationItem[]
  className?: string
  mobile?: boolean
  onItemClick?: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  className,
  mobile = false,
  onItemClick
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const handleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const navItemClasses = mobile 
    ? 'block px-4 py-3 text-gray-900 font-medium hover:text-primary-600 transition-colors'
    : 'nav-link px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium'

  return (
    <nav className={cn('', className)}>
      {items.map((item) => (
        <div key={item.name} className="relative">
          {item.dropdown ? (
            <div className="relative">
              <button
                onClick={() => handleDropdown(item.name)}
                className={cn(
                  navItemClasses,
                  'flex items-center space-x-1',
                  isActive(item.href) && 'text-primary-600 active'
                )}
              >
                <span>{item.name}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === item.name ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: mobile ? 0 : 10, height: mobile ? 0 : 'auto', scale: mobile ? 1 : 0.95 }}
                    animate={{ opacity: 1, y: 0, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, y: mobile ? 0 : 10, height: mobile ? 0 : 'auto', scale: mobile ? 1 : 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      mobile 
                        ? 'bg-gray-50 ml-4 mr-4 rounded-lg overflow-hidden'
                        : 'absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-elegant-large border border-gray-100 py-2 z-50'
                    )}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className={cn(
                          mobile
                            ? 'block px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium'
                            : 'block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium',
                          isActive(dropdownItem.href) && 'text-primary-600 bg-primary-50'
                        )}
                        onClick={() => {
                          setActiveDropdown(null)
                          onItemClick?.()
                        }}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href={item.href}
              className={cn(
                navItemClasses,
                isActive(item.href) && 'text-primary-600 active'
              )}
              onClick={onItemClick}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
      
      {/* Click outside handler for desktop */}
      {!mobile && activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </nav>
  )
}

export default Navigation