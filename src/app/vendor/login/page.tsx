'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

export default function VendorLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/vendor/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    setLoginStatus('idle')

    try {
      const response = await fetch('/api/auth/vendor-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setLoginStatus('success')
        setMessage('Login successful! Redirecting...')
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push(redirect)
        }, 1000)
      } else {
        setLoginStatus('error')
        setMessage(data.error || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginStatus('error')
      setMessage('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <Link 
              href="/vendor"
              className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vendor Page
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                Vendor Login
              </h1>
              <p className="text-gray-600">
                Access your vendor dashboard and manage your business
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      type="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      placeholder="Enter your email"
                      required
                    />

                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        value={formData.password}
                        onChange={(value) => handleInputChange('password', value)}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {loginStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-green-800">{message}</span>
                        </div>
                      </div>
                    )}

                    {loginStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-red-800">{message}</span>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center space-y-4">
                    <p className="text-gray-600">
                      Don't have a vendor account?{' '}
                      <Link
                        href="/vendor/register"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Register here
                      </Link>
                    </p>
                    
                    <p className="text-gray-600">
                      <Link
                        href="/auth/forgot-password"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Forgot your password?
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}