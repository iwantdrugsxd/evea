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
  MessageSquare,
  Store
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
                  <div className="group">
                    <button
                      className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors py-2"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                          onMouseEnter={() => setActiveDropdown(item.name)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.dropdown?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <span className="font-medium">{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Vendor Button & Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Vendor Button - Always visible */}
            <Link href="/vendor">
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <Store className="h-4 w-4" />
                <span>Become a Vendor</span>
              </Button>
            </Link>

            {/* Search Icon */}
            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Authentication Section */}
            {!loading && (
              <>
                {!isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <Link href="/login">
                      <Button variant="ghost" className="text-gray-700 hover:text-red-600">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <User className="h-4 w-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </button>

                    {/* Cart */}
                    <Link href="/marketplace/cart" className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        2
                      </span>
                    </Link>

                    {/* User Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {getUserInitials()}
                          </span>
                        </div>
                        <div className="hidden xl:block text-left">
                          <p className="text-sm font-medium text-gray-900">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {user?.role}
                          </p>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </button>

                      <AnimatePresence>
                        {showUserMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                          >
                            {user?.role === 'customer' && (
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

                            {user?.role === 'vendor' && (
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

                            {user?.role === 'admin' && (
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
                              <User className="h-4 w-4 mr-3" />
                              Profile
                            </Link>

                            <hr className="my-2 border-gray-200" />
                            
                            <button
                              onClick={() => {
                                handleLogout()
                                setShowUserMenu(false)
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <LogOut className="h-4 w-4 mr-3" />
                              Logout
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-6 space-y-4">
                {/* Mobile Navigation Links */}
                {navigationData.main.map((item) => (
                  <div key={item.name}>
                    {'dropdown' in item ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full text-left px-4 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
                          onClick={() => handleDropdown(item.name)}
                        >
                          <span>{item.name}</span>
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="bg-gray-50 border-l-4 border-red-600 ml-4"
                            >
                              {item.dropdown?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className="block px-6 py-3 text-sm text-gray-600 hover:text-red-600 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
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
                        className="block px-4 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Vendor Button */}
                <div className="px-4 pt-4 border-t border-gray-200">
                  <Link href="/vendor" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Store className="h-4 w-4" />
                      <span>Become a Vendor</span>
                    </Button>
                  </Link>
                </div>

                {/* Mobile Authentication */}
                <div className="px-4 pt-4 border-t border-gray-200">
                  {!loading && (
                    <>
                      {!isAuthenticated ? (
                        <div className="space-y-3">
                          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
                              <LogIn className="h-4 w-4 mr-2" />
                              Login
                            </Button>
                          </Link>
                          <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                              <User className="h-4 w-4 mr-2" />
                              Sign Up
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {/* User Info */}
                          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {getUserInitials()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {getUserDisplayName()}
                              </p>
                              <p className="text-sm text-gray-500 capitalize">
                                {user?.role}
                              </p>
                            </div>
                          </div>

                          {/* Role-specific Menu Items */}
                          {user?.role === 'customer' && (
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

                          {user?.role === 'vendor' && (
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

                          {user?.role === 'admin' && (
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
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                          </Link>

                          <hr className="my-2 border-gray-200" />
                          
                          <button
                            onClick={() => {
                              handleLogout()
                              setIsMenuOpen(false)
                            }}
                            className="flex items-center space-x-3 w-full py-3 text-gray-700 hover:text-red-600 transition-colors"
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header