'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin,
  User,
  ShoppingBag,
  LogIn,
  LogOut,
  Search,
  Bell,
  Settings,
  Heart,
  MessageSquare
} from 'lucide-react'
import { useScroll } from '@/hooks/use-scroll'
import { navigationData, contactInfo } from '@/data/content'
import Button from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { isScrolled } = useScroll(20)
  const { user, isAuthenticated, logout, loading } = useAuth()
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const handleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    router.push('/')
  }

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user?.email || 'User'
  }

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">E</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Evea
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationData.main.map((item) => (
                <div key={item.name} className="relative">
                  {'dropdown' in item ? (
                    <div>
                      <button
                        onClick={() => handleDropdown(item.name)}
                        className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="font-medium">{dropdownItem.name}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Authentication-based content */}
              {loading ? (
                // Loading state
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
              ) : isAuthenticated && user ? (
                // Authenticated user menu
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Cart */}
                  <Link href="/cart" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <ShoppingBag className="h-5 w-5 text-gray-600" />
                  </Link>

                  <div className="w-px h-6 bg-gray-300"></div>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {getUserInitials()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {getUserDisplayName()}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                        showUserMenu ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* User Dropdown Menu */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                        >
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                              {getUserDisplayName()}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full capitalize">
                              {user.role}
                            </span>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            {user.role === 'customer' && (
                              <>
                                <Link
                                  href="/customer/dashboard"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <User className="h-4 w-4 mr-3" />
                                  Dashboard
                                </Link>
                                <Link
                                  href="/customer/orders"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <ShoppingBag className="h-4 w-4 mr-3" />
                                  My Orders
                                </Link>
                                <Link
                                  href="/customer/favorites"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <Heart className="h-4 w-4 mr-3" />
                                  Favorites
                                </Link>
                                <Link
                                  href="/customer/messages"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <MessageSquare className="h-4 w-4 mr-3" />
                                  Messages
                                </Link>
                              </>
                            )}

                            {user.role === 'vendor' && (
                              <>
                                <Link
                                  href="/vendor/dashboard"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <User className="h-4 w-4 mr-3" />
                                  Vendor Dashboard
                                </Link>
                                <Link
                                  href="/vendor/orders"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <ShoppingBag className="h-4 w-4 mr-3" />
                                  Orders
                                </Link>
                                <Link
                                  href="/vendor/cards"
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <Settings className="h-4 w-4 mr-3" />
                                  Manage Services
                                </Link>
                              </>
                            )}

                            {user.role === 'admin' && (
                              <Link
                                href="/admin/dashboard"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                onClick={() => setShowUserMenu(false)}
                              >
                                <Settings className="h-4 w-4 mr-3" />
                                Admin Dashboard
                              </Link>
                            )}

                            <Link
                              href="/customer/profile"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <Settings className="h-4 w-4 mr-3" />
                              Profile Settings
                            </Link>
                          </div>

                          {/* Logout */}
                          <div className="border-t border-gray-100 pt-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <LogOut className="h-4 w-4 mr-3" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                // Non-authenticated user buttons
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  
                  <Link href="/register">
                    <Button variant="primary" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
              >
                <div className="py-6 space-y-4">
                  {/* Navigation Items */}
                  {navigationData.main.map((item) => (
                    <div key={item.name}>
                      {'dropdown' in item ? (
                        <div>
                          <button
                            onClick={() => handleDropdown(item.name)}
                            className="flex items-center justify-between w-full px-4 py-3 text-gray-900 font-medium hover:text-red-600 transition-colors"
                          >
                            <span>{item.name}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gray-50 px-4 py-2 space-y-2"
                              >
                                {item.dropdown.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                                    onClick={() => {
                                      setActiveDropdown(null)
                                      setIsMenuOpen(false)
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
                          className="block px-4 py-3 text-gray-900 font-medium hover:text-red-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Mobile Authentication */}
                  <div className="border-t border-gray-200 pt-4">
                    {loading ? (
                      <div className="flex justify-center py-4">
                        <div className="w-6 h-6 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                      </div>
                    ) : isAuthenticated && user ? (
                      // Authenticated user mobile menu
                      <div className="px-4 space-y-3">
                        {/* User Info */}
                        <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {getUserInitials()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {getUserDisplayName()}
                            </p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full capitalize">
                              {user.role}
                            </span>
                          </div>
                        </div>

                        {/* User Menu Items */}
                        {user.role === 'customer' && (
                          <>
                            <Link
                              href="/customer/dashboard"
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <User className="h-5 w-5" />
                              <span>Dashboard</span>
                            </Link>
                            <Link
                              href="/customer/orders"
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <ShoppingBag className="h-5 w-5" />
                              <span>My Orders</span>
                            </Link>
                            <Link
                              href="/customer/favorites"
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Heart className="h-5 w-5" />
                              <span>Favorites</span>
                            </Link>
                            <Link
                              href="/customer/messages"
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <MessageSquare className="h-5 w-5" />
                              <span>Messages</span>
                            </Link>
                          </>
                        )}

                        {user.role === 'vendor' && (
                          <>
                            <Link
                              href="/vendor/dashboard"
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <User className="h-5 w-5" />
                              <span>Vendor Dashboard</span>
                            </Link>
                            <Link
                              href="/vendor/orders"
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <ShoppingBag className="h-5 w-5" />
                              <span>Orders</span>
                            </Link>
                            <Link
                              href="/vendor/cards"
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Settings className="h-5 w-5" />
                              <span>Manage Services</span>
                            </Link>
                          </>
                        )}

                        {user.role === 'admin' && (
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Settings className="h-5 w-5" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        <Link
                          href="/customer/profile"
                          className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings className="h-5 w-5" />
                          <span>Profile Settings</span>
                        </Link>

                        {/* Mobile Logout Button */}
                        <button
                          onClick={() => {
                            handleLogout()
                            setIsMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 w-full py-3 text-gray-700 hover:text-red-600 transition-colors border-t border-gray-200 mt-3 pt-6"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    ) : (
                      // Non-authenticated mobile menu
                      <div className="px-4 space-y-3">
                        <Link href="/login" className="block w-full">
                          <Button variant="ghost" size="lg" className="w-full justify-center">
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                          </Button>
                        </Link>
                        <Link href="/register" className="block w-full">
                          <Button variant="primary" size="lg" className="w-full justify-center">
                            <User className="h-4 w-4 mr-2" />
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Click outside to close dropdowns */}
      {(activeDropdown || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setActiveDropdown(null)
            setShowUserMenu(false)
          }}
        />
      )}
    </>
  )
}

export default Header