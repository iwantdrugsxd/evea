'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Settings } from 'lucide-react'

interface ServiceData {
  // New fields per request
  selectedCategories: string[]
  itemsByCategory: Record<string, string[]>
  customService?: string
  serviceDescription: string

  // Optional legacy/pricing fields (kept to not break backend)
  categoryId: string
  subcategory: string
  secondaryServices: string[]
  serviceType: string
  weddingPriceMin: number
  weddingPriceMax: number
  corporatePriceMin: number
  corporatePriceMax: number
  birthdayPriceMin: number
  birthdayPriceMax: number
  festivalPriceMin: number
  festivalPriceMax: number
  basicPackagePrice: number
  basicPackageDetails: string
  standardPackagePrice: number
  standardPackageDetails: string
  premiumPackagePrice: number
  premiumPackageDetails: string
  additionalServices: string
  advancePaymentPercentage: number
  cancellationPolicy: string
}

interface Category { id: string; name: string }

const categoryOptions = [
  'Catering & Food Services',
  'Photography & Videography',
  'Decoration & Styling',
  'Entertainment & Music',
  'Venue & Space Rental',
  'Transportation Services',
  'Floral Arrangements',
  'Audio/Visual Equipment',
  'Furniture & Props',
  'Lighting Solutions',
  'Security Services',
  'Wedding Planning & Coordination',
  'Makeup & Beauty Services',
  'DJ & Sound Systems',
  'Photo Booth Services',
  'Custom Services'
]

const itemSuggestions: Record<string, string[]> = {
  'Catering & Food Services': [
    'Multi-cuisine catering',
    'Live cooking stations',
    'Beverages & bar service',
    'Desserts & cake services',
    'Specialized dietary options (vegan, gluten-free)'
  ],
  'Photography & Videography': [
    'Wedding shoots', 'Cinematic videos', 'Drone coverage', 'Same-day edits'
  ],
  'Decoration & Styling': [ 'Stage decor', 'Table styling', 'Theme setups' ],
  'Entertainment & Music': [ 'Live bands', 'Solo singers', 'Dance troupes' ],
  'Venue & Space Rental': [ 'Banquet halls', 'Outdoor lawns', 'Studios' ],
  'Transportation Services': [ 'VIP cars', 'Shuttle buses', 'Logistics' ],
  'Floral Arrangements': [ 'Bouquets', 'Centerpieces', 'Garlands' ],
  'Audio/Visual Equipment': [ 'PA systems', 'LED walls', 'Projectors' ],
  'Furniture & Props': [ 'Lounge seating', 'Backdrops', 'Props rental' ],
  'Lighting Solutions': [ 'Ambient lighting', 'Spotlights', 'Fairy lights' ],
  'Security Services': [ 'Bouncers', 'Crowd control', 'Surveillance' ],
  'Wedding Planning & Coordination': [ 'Full planning', 'Day-of coordination' ],
  'Makeup & Beauty Services': [ 'Bridal makeup', 'Hair styling', 'Grooming' ],
  'DJ & Sound Systems': [ 'Club DJ', 'MC services', 'Sound engineering' ],
  'Photo Booth Services': [ '360 booth', 'Print-outs', 'Custom props' ]
}

export default function ServicesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorId = searchParams.get('vendorId')
  const step = searchParams.get('step')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState<ServiceData>({
    selectedCategories: [],
    itemsByCategory: {},
    customService: '',
    serviceDescription: '',
    categoryId: '',
    subcategory: '',
    secondaryServices: [],
    serviceType: '',
    weddingPriceMin: 0,
    weddingPriceMax: 0,
    corporatePriceMin: 0,
    corporatePriceMax: 0,
    birthdayPriceMin: 0,
    birthdayPriceMax: 0,
    festivalPriceMin: 0,
    festivalPriceMax: 0,
    basicPackagePrice: 0,
    basicPackageDetails: '',
    standardPackagePrice: 0,
    standardPackageDetails: '',
    premiumPackagePrice: 0,
    premiumPackageDetails: '',
    additionalServices: '',
    advancePaymentPercentage: 50,
    cancellationPolicy: ''
  })

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          const list = Array.isArray(data) ? data : data.categories
          if (Array.isArray(list)) {
            setCategories(list.map((c: any) => ({ id: c.id, name: c.name })))
          }
        }
      } catch (e) {
        // ignore
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (!vendorId) {
      router.push('/vendor/onboarding')
      return
    }

    // Load existing service data if returning to this step
    loadServiceData()
  }, [vendorId])

  const loadServiceData = async () => {
    try {
      const response = await fetch(`/api/vendor/services?vendorId=${vendorId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.categoryId) {
          setFormData({
            categoryId: data.categoryId || '',
            subcategory: data.subcategory || '',
            secondaryServices: data.secondaryServices || [],
            serviceType: data.serviceType || '',
            weddingPriceMin: data.weddingPriceMin || 0,
            weddingPriceMax: data.weddingPriceMax || 0,
            corporatePriceMin: data.corporatePriceMin || 0,
            corporatePriceMax: data.corporatePriceMax || 0,
            birthdayPriceMin: data.birthdayPriceMin || 0,
            birthdayPriceMax: data.birthdayPriceMax || 0,
            festivalPriceMin: data.festivalPriceMin || 0,
            festivalPriceMax: data.festivalPriceMax || 0,
            basicPackagePrice: data.basicPackagePrice || 0,
            basicPackageDetails: data.basicPackageDetails || '',
            standardPackagePrice: data.standardPackagePrice || 0,
            standardPackageDetails: data.standardPackageDetails || '',
            premiumPackagePrice: data.premiumPackagePrice || 0,
            premiumPackageDetails: data.premiumPackageDetails || '',
            additionalServices: data.additionalServices || '',
            advancePaymentPercentage: data.advancePaymentPercentage || 50,
            cancellationPolicy: data.cancellationPolicy || ''
          })
        }
      }
    } catch (error) {
      console.error('Failed to load service data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/vendor/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendorId,
          ...formData
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess('Services saved successfully! Your registration is now pending admin approval.')
        setTimeout(() => {
          router.push(`/vendor/onboarding/verification-pending?vendorId=${vendorId}&step=4`)
        }, 2000)
      } else {
        setError(data.error || 'Failed to save services')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ServiceData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleCategory = (name: string) => {
    setFormData(prev => {
      const selected = prev.selectedCategories.includes(name)
        ? prev.selectedCategories.filter(c => c !== name)
        : [...prev.selectedCategories, name]
      // Initialize items bucket when selected
      const itemsByCategory = { ...prev.itemsByCategory }
      if (!itemsByCategory[name]) itemsByCategory[name] = []
      return { ...prev, selectedCategories: selected, itemsByCategory }
    })
  }

  const toggleItem = (category: string, item: string) => {
    setFormData(prev => {
      const bucket = prev.itemsByCategory[category] || []
      const next = bucket.includes(item) ? bucket.filter(i => i !== item) : [...bucket, item]
      return { ...prev, itemsByCategory: { ...prev.itemsByCategory, [category]: next } }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Service Portfolio & Pricing</h1>
                <p className="text-gray-600">Select categories, set pricing, and add details</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">Step 4 of 5</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Email Verified</span>
            <span>Business Details</span>
            <span>Documents</span>
            <span>Services</span>
            <span>Finish</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">{success}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Services Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Categories (multi-select) */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryOptions.map(cat => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
            {formData.selectedCategories.includes('Custom Services') && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe your custom services</label>
                <input
                  type="text"
                  value={formData.customService || ''}
                  onChange={(e)=>handleInputChange('customService', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Theme-based dessert art, eco-friendly decor"
                />
              </div>
            )}
          </div>

          {/* Dynamic Items/Services based on selected categories */}
          {formData.selectedCategories.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specific Items / Services</h2>
              {formData.selectedCategories.map(cat => (
                <div key={cat} className="mb-6">
                  <p className="font-medium text-gray-900 mb-2">{cat}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(itemSuggestions[cat] || []).map(item => (
                      <label key={item} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={(formData.itemsByCategory[cat] || []).includes(item)}
                          onChange={() => toggleItem(cat, item)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rich Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Service Description</h2>
            <p className="text-sm text-gray-500 mb-3">Describe your services in detail (minimum 50 words). Tell potential customers what makes your services special.</p>
            <textarea
              value={formData.serviceDescription}
              onChange={(e)=>handleInputChange('serviceDescription', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell potential customers what makes your services special, your experience, team strength, turnaround time, and any guarantees or add-ons you provide..."
              required
            />
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wedding Events (Min - Max)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={formData.weddingPriceMin}
                    onChange={(e) => handleInputChange('weddingPriceMin', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Min"
                    min="0"
                  />
                  <input
                    type="number"
                    value={formData.weddingPriceMax}
                    onChange={(e) => handleInputChange('weddingPriceMax', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Corporate Events (Min - Max)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={formData.corporatePriceMin}
                    onChange={(e) => handleInputChange('corporatePriceMin', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Min"
                    min="0"
                  />
                  <input
                    type="number"
                    value={formData.corporatePriceMax}
                    onChange={(e) => handleInputChange('corporatePriceMax', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birthday Parties (Min - Max)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={formData.birthdayPriceMin}
                    onChange={(e) => handleInputChange('birthdayPriceMin', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Min"
                    min="0"
                  />
                  <input
                    type="number"
                    value={formData.birthdayPriceMax}
                    onChange={(e) => handleInputChange('birthdayPriceMax', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Festivals (Min - Max)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={formData.festivalPriceMin}
                    onChange={(e) => handleInputChange('festivalPriceMin', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Min"
                    min="0"
                  />
                  <input
                    type="number"
                    value={formData.festivalPriceMax}
                    onChange={(e) => handleInputChange('festivalPriceMax', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Package Pricing */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Package Pricing</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Basic Package Price
                  </label>
                  <input
                    type="number"
                    value={formData.basicPackagePrice}
                    onChange={(e) => handleInputChange('basicPackagePrice', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard Package Price
                  </label>
                  <input
                    type="number"
                    value={formData.standardPackagePrice}
                    onChange={(e) => handleInputChange('standardPackagePrice', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Package Price
                  </label>
                  <input
                    type="number"
                    value={formData.premiumPackagePrice}
                    onChange={(e) => handleInputChange('premiumPackagePrice', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advance Payment Percentage
                  </label>
                  <input
                    type="number"
                    value={formData.advancePaymentPercentage}
                    onChange={(e) => handleInputChange('advancePaymentPercentage', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Basic Package Details
                </label>
                <textarea
                  value={formData.basicPackageDetails}
                  onChange={(e) => handleInputChange('basicPackageDetails', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what's included in the basic package..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Package Details
                </label>
                <textarea
                  value={formData.standardPackageDetails}
                  onChange={(e) => handleInputChange('standardPackageDetails', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what's included in the standard package..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Premium Package Details
                </label>
                <textarea
                  value={formData.premiumPackageDetails}
                  onChange={(e) => handleInputChange('premiumPackageDetails', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what's included in the premium package..."
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Services
                </label>
                <textarea
                  value={formData.additionalServices}
                  onChange={(e) => handleInputChange('additionalServices', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List any additional services you offer..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Policy
                </label>
                <textarea
                  value={formData.cancellationPolicy}
                  onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your cancellation policy..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push(`/vendor/onboarding/business-details?vendorId=${vendorId}&step=2`)}
              className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={loading || formData.selectedCategories.length === 0 || formData.serviceDescription.trim().length < 50}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <span>{loading ? 'Saving...' : 'Submit for Review'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
