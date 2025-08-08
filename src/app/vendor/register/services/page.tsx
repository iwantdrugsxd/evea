'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Settings, 
  DollarSign, 
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Loader2
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

interface ServiceFormData {
  categoryId: string
  serviceType: string
  description: string
  address: string
  city: string
  state: string
  postalCode: string
  latitude: number
  longitude: number
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
  additionalServices: string[]
  advancePaymentPercentage: number
  cancellationPolicy: string
}

export default function VendorServicesSetupPage() {
  const [vendorId, setVendorId] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState<ServiceFormData>({
    categoryId: '',
    serviceType: 'per_event',
    description: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: 0,
    longitude: 0,
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
    additionalServices: [],
    advancePaymentPercentage: 50,
    cancellationPolicy: ''
  })

  useEffect(() => {
    const vendorIdParam = searchParams.get('vendorId')
    if (vendorIdParam) {
      setVendorId(vendorIdParam)
    }
    fetchCategories()
  }, [searchParams])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories/active')
      const data = await response.json()
      if (response.ok) {
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleInputChange = (field: keyof ServiceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAdditionalServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, service]
        : prev.additionalServices.filter(s => s !== service)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!vendorId) {
      setSubmitStatus('error')
      setMessage('Vendor ID not found. Please start registration again.')
      return
    }

    if (!formData.categoryId || !formData.description || !formData.address) {
      setSubmitStatus('error')
      setMessage('Please fill in all required fields.')
      return
    }

    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/vendor/services-location', {
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
        setSubmitStatus('success')
        setMessage('Services setup completed successfully! Your registration is now complete.')
      } else {
        setSubmitStatus('error')
        setMessage(data.error || 'Failed to save services. Please try again.')
      }
    } catch (error) {
      console.error('Services setup error:', error)
      setSubmitStatus('error')
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinish = () => {
    router.push('/vendor/registration-complete')
  }

  const serviceTypes = [
    { value: 'per_hour', label: 'Per Hour' },
    { value: 'per_day', label: 'Per Day' },
    { value: 'per_event', label: 'Per Event' },
    { value: 'custom_quote', label: 'Custom Quote' }
  ]

  const additionalServicesOptions = [
    'Setup & Decoration',
    'Equipment Rental',
    'Staff Services',
    'Transportation',
    'Catering',
    'Photography',
    'Entertainment',
    'Security',
    'Cleaning Services',
    'Custom Design'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                Set Up Your Services
              </h1>
              <p className="text-gray-600">
                Configure your services, pricing, and business details
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-center">Service Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Service Category */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Settings className="h-5 w-5 mr-2" />
                        Service Category
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Category *
                          </label>
                          <select
                            value={formData.categoryId}
                            onChange={(e) => handleInputChange('categoryId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Type *
                          </label>
                          <select
                            value={formData.serviceType}
                            onChange={(e) => handleInputChange('serviceType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                          >
                            {serviceTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Service Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Service Description</h3>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your services in detail..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Service Location
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="text"
                          label="Address"
                          value={formData.address}
                          onChange={(value) => handleInputChange('address', value)}
                          placeholder="Enter your service address"
                          required
                        />
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
                          label="Postal Code"
                          value={formData.postalCode}
                          onChange={(value) => handleInputChange('postalCode', value)}
                          placeholder="Postal Code"
                          required
                        />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Pricing Structure
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Wedding Events (₹)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="number"
                              label="Min Price"
                              value={formData.weddingPriceMin}
                              onChange={(value) => handleInputChange('weddingPriceMin', parseFloat(value) || 0)}
                              placeholder="Min"
                            />
                            <Input
                              type="number"
                              label="Max Price"
                              value={formData.weddingPriceMax}
                              onChange={(value) => handleInputChange('weddingPriceMax', parseFloat(value) || 0)}
                              placeholder="Max"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Corporate Events (₹)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="number"
                              label="Min Price"
                              value={formData.corporatePriceMin}
                              onChange={(value) => handleInputChange('corporatePriceMin', parseFloat(value) || 0)}
                              placeholder="Min"
                            />
                            <Input
                              type="number"
                              label="Max Price"
                              value={formData.corporatePriceMax}
                              onChange={(value) => handleInputChange('corporatePriceMax', parseFloat(value) || 0)}
                              placeholder="Max"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Birthday Events (₹)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="number"
                              label="Min Price"
                              value={formData.birthdayPriceMin}
                              onChange={(value) => handleInputChange('birthdayPriceMin', parseFloat(value) || 0)}
                              placeholder="Min"
                            />
                            <Input
                              type="number"
                              label="Max Price"
                              value={formData.birthdayPriceMax}
                              onChange={(value) => handleInputChange('birthdayPriceMax', parseFloat(value) || 0)}
                              placeholder="Max"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Festival Events (₹)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="number"
                              label="Min Price"
                              value={formData.festivalPriceMin}
                              onChange={(value) => handleInputChange('festivalPriceMin', parseFloat(value) || 0)}
                              placeholder="Min"
                            />
                            <Input
                              type="number"
                              label="Max Price"
                              value={formData.festivalPriceMax}
                              onChange={(value) => handleInputChange('festivalPriceMax', parseFloat(value) || 0)}
                              placeholder="Max"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Package Pricing */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Package Pricing</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Basic Package</h4>
                          <Input
                            type="number"
                            label="Price (₹)"
                            value={formData.basicPackagePrice}
                            onChange={(value) => handleInputChange('basicPackagePrice', parseFloat(value) || 0)}
                            placeholder="Price"
                          />
                          <textarea
                            value={formData.basicPackageDetails}
                            onChange={(e) => handleInputChange('basicPackageDetails', e.target.value)}
                            placeholder="Package details..."
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            rows={3}
                          />
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Standard Package</h4>
                          <Input
                            type="number"
                            label="Price (₹)"
                            value={formData.standardPackagePrice}
                            onChange={(value) => handleInputChange('standardPackagePrice', parseFloat(value) || 0)}
                            placeholder="Price"
                          />
                          <textarea
                            value={formData.standardPackageDetails}
                            onChange={(e) => handleInputChange('standardPackageDetails', e.target.value)}
                            placeholder="Package details..."
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            rows={3}
                          />
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Premium Package</h4>
                          <Input
                            type="number"
                            label="Price (₹)"
                            value={formData.premiumPackagePrice}
                            onChange={(value) => handleInputChange('premiumPackagePrice', parseFloat(value) || 0)}
                            placeholder="Price"
                          />
                          <textarea
                            value={formData.premiumPackageDetails}
                            onChange={(e) => handleInputChange('premiumPackageDetails', e.target.value)}
                            placeholder="Package details..."
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {additionalServicesOptions.map((service) => (
                          <label key={service} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.additionalServices.includes(service)}
                              onChange={(e) => handleAdditionalServiceChange(service, e.target.checked)}
                              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Business Policies */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Business Policies</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Advance Payment Percentage
                          </label>
                          <Input
                            type="number"
                            label="Percentage (%)"
                            value={formData.advancePaymentPercentage}
                            onChange={(value) => handleInputChange('advancePaymentPercentage', parseFloat(value) || 0)}
                            placeholder="50"
                            help="Percentage of total amount required as advance payment"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cancellation Policy
                          </label>
                          <textarea
                            value={formData.cancellationPolicy}
                            onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                            placeholder="Describe your cancellation policy..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            rows={3}
                            required
                          />
                        </div>
                      </div>
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
                        <span className="text-red-800">{message}</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push('/vendor/register/documents')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>

                      {submitStatus === 'success' ? (
                        <Button
                          type="button"
                          variant="primary"
                          onClick={handleFinish}
                        >
                          Complete Registration
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isLoading}
                          loading={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Services'
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
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
