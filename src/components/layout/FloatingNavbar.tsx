'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  ShoppingCart, 
  Heart, 
  Search,
  Home,
  Calendar,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import Logo from './Logo';

export default function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Floating Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg shadow-lg border-b border-white/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <Logo size="md" showText={false} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/marketplace" 
                className={`font-medium transition-colors duration-300 hover:text-blue-400 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                Marketplace
              </Link>
              <Link 
                href="/vendor" 
                className={`font-medium transition-colors duration-300 hover:text-blue-400 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                Vendors
              </Link>
              <Link 
                href="/about" 
                className={`font-medium transition-colors duration-300 hover:text-blue-400 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                About
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Favorites Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-300 relative ${
                  isScrolled 
                    ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </motion.button>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-300 relative ${
                  isScrolled 
                    ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </motion.button>

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isScrolled 
                        ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                    }`}
                  >
                    {user.profile_image ? (
                      <Image
                        src={user.profile_image}
                        alt={user.name || 'Profile'}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </motion.button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl z-50"
                      >
                        <div className="p-3 border-b border-white/10">
                          <p className="text-white font-medium text-sm">{user.name || 'User'}</p>
                          <p className="text-white/70 text-xs">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-white text-sm"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-white text-sm"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </Link>
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch('/api/auth/logout', {
                                  method: 'POST',
                                });
                                if (response.ok) {
                                  setUser(null);
                                  setIsProfileDropdownOpen(false);
                                  window.location.href = '/';
                                }
                              } catch (error) {
                                console.error('Logout error:', error);
                              }
                            }}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 text-sm w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isScrolled 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                    }`}
                  >
                    Sign In
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/20 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/marketplace"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">Marketplace</span>
              </Link>
              
              <Link
                href="/vendor"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-white">Vendors</span>
              </Link>
              
              <Link
                href="/about"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5 text-green-400" />
                <span className="font-medium text-white">About</span>
              </Link>

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="font-medium text-white">Favorites (3)</span>
                  </button>
                  <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-white">Cart (2)</span>
                  </button>
                </div>

                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                      <p className="text-xs text-white/70">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Settings</span>
                    </Link>
                    <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left">
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-600">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="block w-full text-center py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
