'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  Mail, 
  ArrowRight,
  Loader2
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function VendorEmailVerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [vendorId, setVendorId] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error')
      setMessage('Invalid verification link. Please check your email and try again.')
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch('/api/vendor/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setVerificationStatus('success')
        setMessage('Email verified successfully! You can now proceed to upload your documents.')
        setVendorId(data.vendorId)
      } else {
        setVerificationStatus('error')
        setMessage(data.error || 'Email verification failed. Please try again.')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setVerificationStatus('error')
      setMessage('An error occurred during verification. Please try again.')
    }
  }

  const handleContinue = () => {
    if (vendorId) {
      router.push(`/vendor/register/documents?vendorId=${vendorId}`)
    } else {
      router.push('/vendor/register')
    }
  }

  const handleResendEmail = () => {
    router.push('/vendor/register')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                Email Verification
              </h1>
              <p className="text-gray-600">
                Verifying your email address...
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-center">Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {verificationStatus === 'loading' && (
                    <div className="text-center py-8">
                      <Loader2 className="h-12 w-12 text-red-600 animate-spin mx-auto mb-4" />
                      <p className="text-gray-600">Verifying your email address...</p>
                    </div>
                  )}

                  {verificationStatus === 'success' && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Email Verified Successfully!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {message}
                      </p>
                      <div className="space-y-3">
                        <Button
                          onClick={handleContinue}
                          variant="primary"
                          size="lg"
                          className="w-full"
                        >
                          Continue to Document Upload
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {verificationStatus === 'error' && (
                    <div className="text-center py-8">
                      <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Verification Failed
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {message}
                      </p>
                      <div className="space-y-3">
                        <Button
                          onClick={handleResendEmail}
                          variant="primary"
                          size="lg"
                          className="w-full"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Register Again
                        </Button>
                        <Button
                          onClick={() => router.push('/vendor')}
                          variant="ghost"
                          size="lg"
                          className="w-full"
                        >
                          Back to Vendor Page
                        </Button>
                      </div>
                    </div>
                  )}
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
