'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

export default function VendorRegistrationPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus('error')
      setMessage('Passwords do not match')
      return
    }

    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setMessage(data.message)
      } else {
        setSubmitStatus('error')
        setMessage(data.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setSubmitStatus('error')
      setMessage('An error occurred during registration. Please try again.')
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
          <div className="max-w-xl mx-auto">
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
                Start Your Vendor Journey
              </h1>
              <p className="text-gray-600">
                Create your vendor account and start growing your business with Evea
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-center">Vendor Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      type="text"
                      label="Business Name"
                      value={formData.businessName}
                      onChange={(value) => handleInputChange('businessName', value)}
                      placeholder="Enter your business name"
                      required
                    />

                    <Input
                      type="text"
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(value) => handleInputChange('fullName', value)}
                      placeholder="Enter your full name"
                      required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="email"
                        label="Email Address"
                        value={formData.email}
                        onChange={(value) => handleInputChange('email', value)}
                        placeholder="Enter your email"
                        required
                      />

                      <Input
                        type="tel"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(value) => handleInputChange('phone', value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <Input
                      type="text"
                      label="Address"
                      value={formData.address}
                      onChange={(value) => handleInputChange('address', value)}
                      placeholder="Enter your business address"
                      required
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <Input
                        type="text"
                        label="City"
                        value={formData.city}
                        onChange={(value) => handleInputChange('city', value)}
                        placeholder="City"
                        required
                      />

                      <Input
                        type="text"
                        label="State"
                        value={formData.state}
                        onChange={(value) => handleInputChange('state', value)}
                        placeholder="State"
                        required
                      />

                      <Input
                        type="text"
                        label="PIN Code"
                        value={formData.postalCode}
                        onChange={(value) => handleInputChange('postalCode', value)}
                        placeholder="PIN Code"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        value={formData.password}
                        onChange={(value) => handleInputChange('password', value)}
                        placeholder="Create a password"
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

                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(value) => handleInputChange('confirmPassword', value)}
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                          Privacy Policy
                        </Link>
                      </span>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-green-800">{message}</span>
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
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
                          Creating Account...
                        </>
                      ) : (
                        'Create Vendor Account'
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Already have a vendor account?{' '}
                      <Link
                        href="/vendor/login"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Sign in
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