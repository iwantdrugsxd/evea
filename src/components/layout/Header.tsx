'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  Search,
  Bell
} from 'lucide-react'
import { useScroll } from '@/hooks/use-scroll'
import { navigationData, contactInfo } from '@/data/content'
import Button from '@/components/ui/button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { isScrolled } = useScroll(20)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const handleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className="bg-primary-600 text-white py-3 text-sm hidden lg:block">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="font-medium">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="font-medium">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{contactInfo.address}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/vendor-onboarding" 
                className="hover:text-primary-200 transition-colors font-medium"
              >
                Become a Vendor
              </Link>
              <span className="text-primary-300">|</span>
              <Link 
                href="/support" 
                className="hover:text-primary-200 transition-colors font-medium"
              >
                24/7 Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'header-blur shadow-elegant border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-red rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span className="text-primary-600 font-bold text-2xl font-heading">E</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-gray-900">Evea</h1>
                <p className="text-xs text-gray-500 -mt-1">Event Management</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationData.main.map((item) => (
                <div key={item.name} className="relative">
                  {'dropdown' in item ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdown(item.name)}
                        className="nav-link flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-elegant-large border border-gray-100 py-2 z-50"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium"
                                onClick={() => setActiveDropdown(null)}
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
                      className="nav-link px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"></span>
              </button>
              
              <div className="w-px h-6 bg-gray-300"></div>
              
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              
              <Link href="/auth/register">
                <Button variant="primary" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </Link>
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
                  {navigationData.main.map((item) => (
                    <div key={item.name}>
                      {'dropdown' in item ? (
                        <div>
                          <button
                            onClick={() => handleDropdown(item.name)}
                            className="flex items-center justify-between w-full px-4 py-3 text-gray-900 font-medium hover:text-primary-600 transition-colors"
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
                                className="bg-gray-50 ml-4 mr-4 rounded-lg overflow-hidden"
                              >
                                {item.dropdown.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                                    onClick={() => {
                                      setIsMenuOpen(false)
                                      setActiveDropdown(null)
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
                          className="block px-4 py-3 text-gray-900 font-medium hover:text-primary-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile Actions */}
                  <div className="px-4 pt-6 border-t border-gray-200 space-y-3">
                    <Link href="/auth/login" className="block w-full">
                      <Button variant="ghost" size="lg" className="w-full justify-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="block w-full">
                      <Button variant="primary" size="lg" className="w-full justify-center">
                        <User className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  )
}

export default Header