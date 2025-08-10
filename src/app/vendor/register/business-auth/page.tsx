// src/app/vendor/onboarding/business-details/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Building2 } from 'lucide-react'

interface BusinessDetailsForm {
  businessType: string
  registrationNumber: string
  taxId: string
  website: string
  description: string
  businessHours: {
    monday: { open: string; close: string; isOpen: boolean }
    tuesday: { open: string; close: string; isOpen: boolean }
    wednesday: { open: string; close: string; isOpen: boolean }
    thursday: { open: string; close: string; isOpen: boolean }
    friday: { open: string; close: string; isOpen: boolean }
    saturday: { open: string; close: string; isOpen: boolean }
    sunday: { open: string; close: string; isOpen: boolean }
  }
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
  const [documents, setDocuments] = useState<File[]>([])

  const [formData, setFormData] = useState<BusinessDetailsForm>({
    businessType: '',
    registrationNumber: '',
    taxId: '',
    website: '',
    description: '',
    businessHours: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '09:00', close: '17:00', isOpen: true },
      sunday: { open: '10:00', close: '16:00', isOpen: false }
    }
  })

  useEffect(() => {
    if (!vendorId) {
      router.push('/vendor/onboarding')
      return
    }

    // Load existing vendor data if returning to this step
    loadVendorData()
  }, [vendorId])

  const loadVendorData = async () => {
    try {
      const response = await fetch(`/api/vendors/${vendorId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.businessType) {
          setFormData({
            businessType: data.businessType || '',
            registrationNumber: data.registrationNumber || '',
            taxId: data.taxId || '',
            website: data.website || '',
            description: data.description || '',
            businessHours: data.businessHours || formData.businessHours
          })
        }
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
      // Update vendor business details
      const response = await fetch(`/api/vendors/${vendorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          registration_step: 3
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Upload documents if any
        if (documents.length > 0) {
          await uploadDocuments()
        }

        // Redirect to next step (services setup)
        router.push(`/vendor/onboarding/services?vendorId=${vendorId}&step=3`)
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

  const uploadDocuments = async () => {
    if (documents.length === 0) return

    const formData = new FormData()
    formData.append('vendorId', vendorId!)
    
    documents.forEach((doc, index) => {
      formData.append('documents', doc)
      formData.append('documentTypes', `business_document_${index}`)
    })

    const response = await fetch('/api/vendor/upload-documents', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Document upload failed')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files))
    }
  }

  const updateBusinessHours = (day: keyof typeof formData.businessHours, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }))
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
                <h1 className="text-2xl font-bold text-gray-900">Business Details</h1>
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
            <span>Review & Submit</span>
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Registration Number
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID / GST Number
                </label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tax ID or GST number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://your-website.com"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description *
              </label>
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

          {/* Business Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h2>
            
            <div className="space-y-3">
              {Object.entries(formData.businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium text-gray-700 capitalize">
                    {day}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={hours.isOpen}
                      onChange={(e) => updateBusinessHours(day as keyof typeof formData.businessHours, 'isOpen', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Open</span>
                  </div>
                  {hours.isOpen && (
                    <>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateBusinessHours(day as keyof typeof formData.businessHours, 'open', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateBusinessHours(day as keyof typeof formData.businessHours, 'close', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </>
                  )}
                  {!hours.isOpen && (
                    <span className="text-gray-400 text-sm">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Documents</h2>
            <p className="text-gray-600 mb-4">Upload relevant business documents (optional at this step)</p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drop files here or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  id="documents"
                />
                <label
                  htmlFor="documents"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Choose Files
                </label>
              </div>
              
              {documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
                  <ul className="space-y-1">
                    {documents.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
              disabled={loading || !formData.businessType || !formData.description}
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