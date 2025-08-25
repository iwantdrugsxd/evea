// src/app/vendor/verify-email/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface VerificationState {
  status: 'loading' | 'success' | 'error' | 'already_verified'
  message: string
  registrationStep?: number
  vendorId?: string
}

export default function VerifyEmailPage() {
  const [verificationState, setVerificationState] = useState<VerificationState>({
    status: 'loading',
    message: 'Verifying your email...'
  })
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    // Call the verification API with the token from URL
    const verifyWithToken = async () => {
      if (!token) {
        setVerificationState({
          status: 'error',
          message: 'Verification token is missing'
        })
        return
      }

      try {
        // Use POST method to get JSON response instead of redirect
        const response = await fetch('/api/vendor/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token })
        })

        const data = await response.json()

        if (response.ok && data.success) {
          const isAlreadyVerified = data.registrationStep >= 2 && data.message.includes('already')
          
          setVerificationState({
            status: isAlreadyVerified ? 'already_verified' : 'success',
            message: data.message,
            registrationStep: data.registrationStep,
            vendorId: data.vendorId
          })

          // Auto-redirect after 3 seconds to next step
          setTimeout(() => {
            redirectToNextStep(data.registrationStep, data.vendorId)
          }, 3000)
        } else {
          setVerificationState({
            status: 'error',
            message: data.error || 'Email verification failed'
          })
        }
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationState({
          status: 'error',
          message: 'Network error occurred during verification'
        })
      }
    }

    verifyWithToken()
  }, [token])

  const redirectToNextStep = (registrationStep: number, vendorId: string) => {
    switch (registrationStep) {
      case 2:
        // After email verification, go to business details/document upload
        router.push(`/vendor/onboarding/business-details?vendorId=${vendorId}&step=2`)
        break
      case 3:
        // After business details, go to service setup
        router.push(`/vendor/onboarding/services?vendorId=${vendorId}&step=3`)
        break
      case 4:
        // After service setup, go to verification pending
        router.push(`/vendor/onboarding/verification-pending?vendorId=${vendorId}&step=4`)
        break
      default:
        // Registration complete, go to vendor dashboard
        router.push('/vendor/dashboard')
        break
    }
  }

  const handleManualRedirect = () => {
    if (verificationState.registrationStep && verificationState.vendorId) {
      redirectToNextStep(verificationState.registrationStep, verificationState.vendorId)
    } else {
      router.push('/vendor/onboarding')
    }
  }

  const renderContent = () => {
    switch (verificationState.status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Verifying Email
            </h2>
            <p className="text-gray-600 text-center">
              Please wait while we verify your email address...
            </p>
          </div>
        )

      case 'success':
        return (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 text-center mb-4">
              {verificationState.message}
            </p>
            <p className="text-sm text-gray-500 text-center mb-6">
              Redirecting you to the next step in 3 seconds...
            </p>
            <button
              onClick={handleManualRedirect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Continue to Next Step
            </button>
          </div>
        )

      case 'already_verified':
        return (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Email Already Verified
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Your email has been verified previously.
            </p>
            <p className="text-sm text-gray-500 text-center mb-6">
              Redirecting you to continue your registration in 3 seconds...
            </p>
            <button
              onClick={handleManualRedirect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Continue Registration
            </button>
          </div>
        )

      case 'error':
        return (
          <div className="flex flex-col items-center">
            <XCircle className="h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {verificationState.message}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/vendor/onboarding')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back to Registration
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {renderContent()}
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      {verificationState.registrationStep && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white p-4 shadow sm:rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Registration Progress</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="ml-2 text-sm text-gray-600">Email Verified</span>
              </div>
              
              <div className="flex-1 h-0.5 bg-gray-200">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${Math.min(((verificationState.registrationStep - 1) / 4) * 100, 100)}%` }}
                />
              </div>
              
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full ${
                  verificationState.registrationStep >= 3 ? 'bg-green-500' : 'bg-gray-300'
                } flex items-center justify-center`}>
                  {verificationState.registrationStep >= 3 ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs text-gray-600">2</span>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600">Complete Registration</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}