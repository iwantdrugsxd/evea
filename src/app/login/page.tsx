'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const { login, clearError } = useAuth()

  const handleEmailChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      email: value
    }))
    if (error) clearError()
  }

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      password: value
    }))
    if (error) clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const success = await login(formData.email, formData.password, 'customer')
      if (success) {
        // Check for redirect parameter
        const urlParams = new URLSearchParams(window.location.search)
        const redirect = urlParams.get('redirect')
        
        // Add a small delay to ensure authentication state is updated
        setTimeout(() => {
          router.push(redirect || '/marketplace')
        }, 100)
      } else {
        setError('Invalid credentials')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Check if Google OAuth is available
      if (typeof window !== 'undefined' && (window as any).google) {
        const google = (window as any).google
        
        console.log('🔍 Google SDK found, initializing...')
        console.log('🔑 Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
        
        // Initialize Google Sign-In
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true
        })
        
        console.log('✅ Google Sign-In initialized')
        
        // Show Google Sign-In prompt
        google.accounts.id.prompt((notification: any) => {
          console.log('🔔 Google notification:', notification)
          
          if (notification.isNotDisplayed()) {
            const reason = notification.getNotDisplayedReason()
            console.log('❌ Google Sign-In not displayed:', reason)
            setError(`Google Sign-In not available: ${reason}`)
          } else if (notification.isSkippedMoment()) {
            const reason = notification.getSkippedReason()
            console.log('⏭️ Google Sign-In skipped:', reason)
            setError(`Google Sign-In was skipped: ${reason}`)
          } else if (notification.isDismissedMoment()) {
            const reason = notification.getDismissedReason()
            console.log('❌ Google Sign-In dismissed:', reason)
            setError(`Google Sign-In was dismissed: ${reason}`)
          }
        })
      } else {
        console.error('❌ Google SDK not found')
        setError('Google Sign-In not available. Please use email/password login.')
      }
    } catch (error) {
      console.error('💥 Google login error:', error)
      setError('Google login failed. Please try email/password login instead.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleCallback = async (response: any) => {
    try {
      console.log('🔍 Google callback received:', response)
      
      if (!response.credential) {
        console.error('❌ No credential in Google response')
        setError('Google authentication failed: No credential received')
        return
      }
      
      const result = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: response.credential,
          user: {
            email: response.email,
            firstName: response.given_name,
            lastName: response.family_name,
            picture: response.picture
          }
        }),
      })

      const data = await result.json()
      console.log('📥 Google auth response:', data)

      if (data.success) {
        console.log('✅ Google authentication successful')
        // Check for redirect parameter
        const urlParams = new URLSearchParams(window.location.search)
        const redirect = urlParams.get('redirect')
        
        // Add a small delay to ensure authentication state is updated
        setTimeout(() => {
          router.push(redirect || '/marketplace')
        }, 100)
      } else {
        console.error('❌ Google authentication failed:', data.error)
        setError(data.error || 'Google authentication failed')
      }
    } catch (error) {
      console.error('💥 Google callback error:', error)
      setError('Google authentication failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 lg:pt-24 pb-8">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Welcome Back
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Sign in to your account to continue
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign-In */}
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 text-lg font-semibold rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <Link 
                    href="/forgot-password"
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                      href="/register"
                      className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
