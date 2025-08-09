'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Building2 } from 'lucide-react'

interface BusinessDetailsForm {
  business_type: string
  years_in_business: string
  business_address: string
  website: string
  description: string
  service_coverage_areas: string
  secondary_contact_name?: string
  secondary_contact_phone?: string
  secondary_contact_role?: string
  instagram_handle?: string
  facebook_page?: string
}

const businessTypes = [
  'Event Planning & Management',
  'Catering Services',
  'Photography & Videography',
  'Decoration & Floral',
  'Entertainment & Music',
  'Venue & Location',
  'Transportation',
  'Beauty & Makeup',
  'Audio Visual & Technical',
  'Security Services',
  'Other'
]

export default function BusinessDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorId = searchParams.get('vendorId')
  const step = searchParams.get('step')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<BusinessDetailsForm>({
    business_type: '',
    years_in_business: '',
    business_address: '',
    website: '',
    description: '',
    service_coverage_areas: '',
    secondary_contact_name: '',
    secondary_contact_phone: '',
    secondary_contact_role: '',
    instagram_handle: '',
    facebook_page: ''
  })

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
        setFormData(prev => ({
          ...prev,
          business_type: data.business_type || prev.business_type,
          years_in_business: data.years_in_business || prev.years_in_business,
          business_address: data.address || prev.business_address,
          website: data.business_website || data.website || prev.website,
          description: data.description || prev.description,
          service_coverage_areas: Array.isArray(data.service_coverage_areas)
            ? data.service_coverage_areas.join(', ')
            : (prev.service_coverage_areas || ''),
          secondary_contact_name: data.secondary_contact_name || prev.secondary_contact_name,
          secondary_contact_phone: data.secondary_contact_phone || prev.secondary_contact_phone,
          secondary_contact_role: data.secondary_contact_role || prev.secondary_contact_role,
          instagram_handle: data.instagram_handle || prev.instagram_handle,
          facebook_page: data.facebook_page || prev.facebook_page
        }))
      }
    } catch (error) {
      console.error('Failed to load vendor data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/vendor/onboarding/stage2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId,
          business_type: formData.business_type,
          years_in_business: formData.years_in_business,
          business_address: formData.business_address,
          service_coverage_areas: formData.service_coverage_areas
            ? formData.service_coverage_areas.split(',').map(s => s.trim()).filter(Boolean)
            : [],
          secondary_contact: {
            name: formData.secondary_contact_name,
            phone: formData.secondary_contact_phone,
            role: formData.secondary_contact_role
          },
          social_media_profiles: {
            instagram: formData.instagram_handle,
            facebook: formData.facebook_page
          },
          website: formData.website,
          description: formData.description
        })
      })

      const data = await response.json()
      if (response.ok && data.success) {
        router.push(`/vendor/onboarding/documents?vendorId=${vendorId}&step=3`)
      } else {
        setError(data.error || 'Failed to save business details')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Business Details & Location</h1>
                <p className="text-gray-600">Complete your business information</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">Step 2 of 4</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Email Verified</span>
            <span>Business Details</span>
            <span>Services</span>
            <span>Finish</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '50%' }} />
          </div>
        </div>

        {/* Success message if just verified */}
        {step === '2' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">Email verified successfully! Please complete your business details below.</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Business Details Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                <select
                  value={formData.business_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, business_type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business *</label>
                <select
                  value={formData.years_in_business}
                  onChange={(e) => setFormData(prev => ({ ...prev, years_in_business: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select experience</option>
                  <option>Less than 1 year</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                <input
                  type="text"
                  value={formData.business_address}
                  onChange={(e) => setFormData(prev => ({ ...prev, business_address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Street, City, State, Postal Code"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Coverage Areas</label>
                <input
                  type="text"
                  value={formData.service_coverage_areas}
                  onChange={(e) => setFormData(prev => ({ ...prev, service_coverage_areas: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., City Center, North Zone, Nearby Districts"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://your-website.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your business and services..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/vendor/onboarding')}
              className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={loading || !formData.business_type || !formData.years_in_business || !formData.business_address || !formData.description}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <span>{loading ? 'Saving...' : 'Continue to Services'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
