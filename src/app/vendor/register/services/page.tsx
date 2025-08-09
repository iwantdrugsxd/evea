'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Users,
  DollarSign,
  Package,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Star
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

interface ServiceData {
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

export default function VendorServicesSetupPage() {
  const [vendorId, setVendorId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState<ServiceData>({
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

  const handleInputChange = (field: keyof ServiceData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSecondaryServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      secondaryServices: prev.secondaryServices.includes(service)
        ? prev.secondaryServices.filter(s => s !== service)
        : [...prev.secondaryServices, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!vendorId) {
      setSubmitStatus('error')
      setMessage('Vendor ID not found. Please start registration again.')
      return
    }

    if (!formData.categoryId || !formData.serviceType) {
      setSubmitStatus('error')
      setMessage('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

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
        setSubmitStatus('success')
        setMessage('Services setup completed successfully! You will receive an email with login credentials once your account is approved.')
      } else {
        setSubmitStatus('error')
        setMessage(data.error || 'Failed to save services. Please try again.')
      }
    } catch (error) {
      console.error('Services setup error:', error)
      setSubmitStatus('error')
      setMessage('An error occurred during setup. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const secondaryServiceOptions = [
    'Photography', 'Videography', 'Catering', 'Decoration', 'Music', 'Transportation',
    'Makeup & Styling', 'Wedding Planning', 'Event Management', 'DJ Services',
    'Live Band', 'Dance Performances', 'Fireworks', 'Lighting', 'Sound System'
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
                Configure your service offerings and pricing to start receiving bookings
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-center">Service Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Primary Service Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Service Category *
                      </label>
                      <select
                        value={formData.categoryId}
                        onChange={(e) => handleInputChange('categoryId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

                    {/* Service Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      >
                        <option value="">Select service type</option>
                        <option value="full_service">Full Service Package</option>
                        <option value="partial_service">Partial Service</option>
                        <option value="consultation">Consultation Only</option>
                        <option value="equipment_rental">Equipment Rental</option>
                      </select>
                    </div>

                    {/* Subcategory */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcategory
                      </label>
                      <Input
                        type="text"
                        value={formData.subcategory}
                        onChange={(e) => handleInputChange('subcategory', e.target.value)}
                        placeholder="e.g., Wedding Photography, Corporate Events"
                      />
                    </div>

                    {/* Secondary Services */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Services Offered
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {secondaryServiceOptions.map((service) => (
                          <label key={service} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.secondaryServices.includes(service)}
                              onChange={() => handleSecondaryServiceToggle(service)}
                              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Wedding Pricing */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">Wedding Events</label>
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Min Price"
                              value={formData.weddingPriceMin}
                              onChange={(e) => handleInputChange('weddingPriceMin', Number(e.target.value))}
                            />
                            <Input
                              type="number"
                              placeholder="Max Price"
                              value={formData.weddingPriceMax}
                              onChange={(e) => handleInputChange('weddingPriceMax', Number(e.target.value))}
                            />
                          </div>
                        </div>

                        {/* Corporate Pricing */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">Corporate Events</label>
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Min Price"
                              value={formData.corporatePriceMin}
                              onChange={(e) => handleInputChange('corporatePriceMin', Number(e.target.value))}
                            />
                            <Input
                              type="number"
                              placeholder="Max Price"
                              value={formData.corporatePriceMax}
                              onChange={(e) => handleInputChange('corporatePriceMax', Number(e.target.value))}
                            />
                          </div>
                        </div>

                        {/* Birthday Pricing */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">Birthday Parties</label>
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Min Price"
                              value={formData.birthdayPriceMin}
                              onChange={(e) => handleInputChange('birthdayPriceMin', Number(e.target.value))}
                            />
                            <Input
                              type="number"
                              placeholder="Max Price"
                              value={formData.birthdayPriceMax}
                              onChange={(e) => handleInputChange('birthdayPriceMax', Number(e.target.value))}
                            />
                          </div>
                        </div>

                        {/* Festival Pricing */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">Festivals & Celebrations</label>
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Min Price"
                              value={formData.festivalPriceMin}
                              onChange={(e) => handleInputChange('festivalPriceMin', Number(e.target.value))}
                            />
                            <Input
                              type="number"
                              placeholder="Max Price"
                              value={formData.festivalPriceMax}
                              onChange={(e) => handleInputChange('festivalPriceMax', Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Package Pricing */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Pricing</h3>
                      
                      <div className="space-y-4">
                        {/* Basic Package */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Basic Package</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              type="number"
                              placeholder="Price"
                              value={formData.basicPackagePrice}
                              onChange={(e) => handleInputChange('basicPackagePrice', Number(e.target.value))}
                            />
                            <textarea
                              placeholder="Package details"
                              value={formData.basicPackageDetails}
                              onChange={(e) => handleInputChange('basicPackageDetails', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              rows={3}
                            />
                          </div>
                        </div>

                        {/* Standard Package */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Standard Package</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              type="number"
                              placeholder="Price"
                              value={formData.standardPackagePrice}
                              onChange={(e) => handleInputChange('standardPackagePrice', Number(e.target.value))}
                            />
                            <textarea
                              placeholder="Package details"
                              value={formData.standardPackageDetails}
                              onChange={(e) => handleInputChange('standardPackageDetails', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              rows={3}
                            />
                          </div>
                        </div>

                        {/* Premium Package */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Premium Package</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              type="number"
                              placeholder="Price"
                              value={formData.premiumPackagePrice}
                              onChange={(e) => handleInputChange('premiumPackagePrice', Number(e.target.value))}
                            />
                            <textarea
                              placeholder="Package details"
                              value={formData.premiumPackageDetails}
                              onChange={(e) => handleInputChange('premiumPackageDetails', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Services
                          </label>
                          <textarea
                            placeholder="Describe any additional services you offer"
                            value={formData.additionalServices}
                            onChange={(e) => handleInputChange('additionalServices', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            rows={3}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Advance Payment Percentage
                          </label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.advancePaymentPercentage}
                            onChange={(e) => handleInputChange('advancePaymentPercentage', Number(e.target.value))}
                            placeholder="50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cancellation Policy
                          </label>
                          <textarea
                            placeholder="Describe your cancellation policy"
                            value={formData.cancellationPolicy}
                            onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            rows={3}
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
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-red-800">{message}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push(`/vendor/register/documents?vendorId=${vendorId}`)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit for Approval'
                        )}
                      </Button>
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
