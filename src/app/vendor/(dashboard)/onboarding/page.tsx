'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, CheckCircle, Mail } from 'lucide-react'

export default function VendorOnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Handle error messages from URL params
    if (error) {
      switch (error) {
        case 'missing_token':
          setErrorMessage('Verification token is missing. Please check your email and click the verification link.')
          break
        case 'invalid_token':
          setErrorMessage('Invalid verification token. Please request a new verification email.')
          break
        case 'verification_failed':
          setErrorMessage('Email verification failed. Please try again or contact support.')
          break
        default:
          setErrorMessage(decodeURIComponent(error))
          break
      }
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Vendor Registration
          </h2>
          <p className="mt-2 text-gray-600">
            Join Evea and start growing your event business
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800">{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Check email message */}
          {!error && (
            <div className="text-center">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to your email address. 
                Click the link to continue with your vendor registration.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/vendor/register')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Back to Registration
                </button>
                
                <button
                  onClick={() => router.push('/contact')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
                >
                  Need Help?
                </button>
              </div>
            </div>
          )}

          {/* Error recovery options */}
          {error && (
            <div className="space-y-4">
              <button
                onClick={() => router.push('/vendor/register')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Start New Registration
              </button>
              
              <button
                onClick={() => router.push('/contact')}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
              >
                Contact Support
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
