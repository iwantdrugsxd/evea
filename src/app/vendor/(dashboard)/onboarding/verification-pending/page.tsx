'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Clock, Mail, Phone, ExternalLink } from 'lucide-react'

export default function VerificationPendingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorId = searchParams.get('vendorId')
  const step = searchParams.get('step')

  const [vendorData, setVendorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!vendorId) {
      router.push('/vendor/onboarding')
      return
    }

    loadVendorData()
  }, [vendorId])

  const loadVendorData = async () => {
    try {
      const response = await fetch(`/api/vendors/${vendorId}`)
      if (response.ok) {
        const data = await response.json()
        setVendorData(data)
      }
    } catch (error) {
      console.error('Failed to load vendor data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Registration Complete!</h1>
                <p className="text-gray-600">Your application is under review</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">Step 4 of 4</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Email Verified</span>
            <span>Business Details</span>
            <span>Services</span>
            <span>Review & Submit</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-lg font-semibold text-green-800">Registration Submitted Successfully!</h2>
          </div>
          <p className="text-green-700 mb-4">
            Thank you for completing your vendor registration. Your application is now under review by our team.
          </p>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Our team will review your business details and documents (24-48 hours)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>You'll receive an email with your login credentials upon approval</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Once approved, you can start receiving bookings and growing your business</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Summary */}
        {vendorData && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Business Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Business Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Business Name:</span> {vendorData.business_name}</p>
                  <p><span className="font-medium">Address:</span> {vendorData.address}</p>
                  <p><span className="font-medium">City:</span> {vendorData.city}, {vendorData.state}</p>
                  <p><span className="font-medium">Registration Step:</span> {vendorData.registration_step}/4</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Email:</span> {vendorData.user?.email}</p>
                  <p><span className="font-medium">Phone:</span> {vendorData.user?.phone}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      vendorData.verification_status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {vendorData.verification_status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-600">support@evea.com</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Phone Support</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/vendor')}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Visit Vendor Portal</span>
          </button>
          
          <button
            onClick={() => router.push('/contact')}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Support</span>
          </button>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">Important Notes</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Keep your email address active - you'll receive login credentials there</li>
            <li>• You can contact support if you need to update any information</li>
            <li>• Once approved, you'll be able to create service listings and receive bookings</li>
            <li>• Our team may contact you for additional verification if needed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
