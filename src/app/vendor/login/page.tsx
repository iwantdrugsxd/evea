// src/app/(vendor)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Eye,
  EyeOff,
  Check,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Award,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Button from '@/components/ui/button'

const benefits = [
  {
    icon: Shield,
    title: 'Secure & Protected',
    description: 'Enterprise-grade security with end-to-end encryption'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance for seamless user experience'
  },
  {
    icon: TrendingUp,
    title: 'Growth Analytics',
    description: 'Advanced insights to scale your business effectively'
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Comprehensive tools to manage client relationships'
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Maintain high standards with our quality control system'
  },
  {
    icon: Star,
    title: 'Analytics & Insights',
    description: 'Data-driven decisions with detailed performance metrics'
  }
]

export default function VendorLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push('/vendor/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.8)",
                        "0 0 40px rgba(59, 130, 246, 1)",
                        "0 0 60px rgba(59, 130, 246, 0.8)",
                        "0 0 20px rgba(59, 130, 246, 0.8)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2"
                  >
                    Welcome Back
                  </motion.div>
                  <p className="text-white/60">Sign in to your vendor dashboard</p>
                </div>

                {/* Login Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50 pr-12"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-white/60">Remember me</span>
                      </label>
                      <Link href="/vendor/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Sign In</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-white/60">
                      Don't have an account?{' '}
                      <Link href="/vendor/register" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col justify-center"
            >
              <div className="max-w-lg">
                <div className="text-center mb-8">
                  <motion.h2
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(147, 51, 234, 0.8)",
                        "0 0 40px rgba(147, 51, 234, 1)",
                        "0 0 60px rgba(147, 51, 234, 0.8)",
                        "0 0 20px rgba(147, 51, 234, 0.8)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4"
                  >
                    Why Choose Evea Vendor Platform?
                  </motion.h2>
                  <p className="text-white/60">Join thousands of successful vendors who trust our platform</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                          <p className="text-sm text-white/60">{benefit.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="mt-8 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-sm text-white/60">Active Vendors</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">50K+</div>
                      <div className="text-sm text-white/60">Events Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">4.9★</div>
                      <div className="text-sm text-white/60">Average Rating</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}