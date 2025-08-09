'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight, Check, Utensils, Camera, Palette, Music, Home as HomeIcon, Car, Flower, Speaker, Armchair, Lightbulb, Shield, Heart, Sparkles, Headphones, Image as ImageIcon, ArrowLeft } from 'lucide-react'

type IconType = typeof Utensils

interface ServiceCategory {
  id: string
  name: string
  slug: string
  icon: IconType
  color: string
  description: string
}

interface Subcategory {
  id: string
  name: string
  description: string
  popular?: boolean
  priceRange?: string
}

const serviceCategories: ServiceCategory[] = [
  { id: '1', name: 'Catering & Food Services', slug: 'catering-food', icon: Utensils, color: '#F59E0B', description: 'Professional catering and food services' },
  { id: '2', name: 'Photography & Videography', slug: 'photography-videography', icon: Camera, color: '#EF4444', description: 'Capture special moments professionally' },
  { id: '3', name: 'Decoration & Styling', slug: 'decoration-styling', icon: Palette, color: '#8B5CF6', description: 'Transform venues with beautiful decorations' },
  { id: '4', name: 'Entertainment & Music', slug: 'entertainment-music', icon: Music, color: '#10B981', description: 'Live entertainment and musical performances' },
  { id: '5', name: 'Venue & Space Rental', slug: 'venue-rental', icon: HomeIcon, color: '#3B82F6', description: 'Beautiful venues and event spaces' },
  { id: '6', name: 'Transportation Services', slug: 'transportation', icon: Car, color: '#6B7280', description: 'Reliable transportation solutions' },
  { id: '7', name: 'Floral Arrangements', slug: 'floral', icon: Flower, color: '#EC4899', description: 'Stunning floral designs' },
  { id: '8', name: 'Audio/Visual Equipment', slug: 'av-equipment', icon: Speaker, color: '#F97316', description: 'Professional AV equipment rental' },
  { id: '9', name: 'Furniture & Props', slug: 'furniture-props', icon: Armchair, color: '#84CC16', description: 'Stylish furniture and props' },
  { id: '10', name: 'Lighting Solutions', slug: 'lighting', icon: Lightbulb, color: '#FBBF24', description: 'Professional lighting setup' },
  { id: '11', name: 'Security Services', slug: 'security', icon: Shield, color: '#1F2937', description: 'Professional event security' },
  { id: '12', name: 'Wedding Planning', slug: 'wedding-planning', icon: Heart, color: '#F472B6', description: 'Complete wedding coordination' },
  { id: '13', name: 'Makeup & Beauty', slug: 'makeup-beauty', icon: Sparkles, color: '#A855F7', description: 'Professional beauty services' },
  { id: '14', name: 'DJ & Sound Systems', slug: 'dj-sound', icon: Headphones, color: '#06B6D4', description: 'Professional DJ and sound services' },
  { id: '15', name: 'Photo Booth Services', slug: 'photo-booth', icon: ImageIcon, color: '#14B8A6', description: 'Fun photo booth rentals' }
]

const subcategoriesData: Record<string, Subcategory[]> = {
  'catering-food': [
    { id: '1', name: 'Multi-cuisine Catering', description: 'Diverse menu options', popular: true, priceRange: '$15-$50 per person' },
    { id: '2', name: 'Live Cooking Stations', description: 'Interactive cooking with live chefs', popular: true, priceRange: '$500-$2000 per station' },
    { id: '3', name: 'Beverages & Bar Service', description: 'Professional bartending service', priceRange: '$100-$300 per hour' },
    { id: '4', name: 'Dessert & Cake Services', description: 'Custom cakes and desserts', priceRange: '$200-$1000' },
    { id: '5', name: 'Specialized Dietary Options', description: 'Vegan, gluten-free accommodations', priceRange: '$18-$60 per person' }
  ],
  'photography-videography': [
    { id: '6', name: 'Wedding Photography', description: 'Complete wedding day coverage', popular: true, priceRange: '$1000-$5000' },
    { id: '7', name: 'Event Videography', description: 'Professional video coverage', popular: true, priceRange: '$800-$3000' },
    { id: '8', name: 'Drone Photography', description: 'Aerial photography and videography', priceRange: '$200-$500 per hour' },
    { id: '9', name: 'Photo Editing & Albums', description: 'Professional editing and albums', priceRange: '$300-$800' }
  ],
  'decoration-styling': [
    { id: '10', name: 'Theme-based Decoration', description: 'Custom themed decorations', popular: true, priceRange: '$500-$3000' },
    { id: '11', name: 'Floral Arrangements', description: 'Beautiful flower arrangements', popular: true, priceRange: '$200-$1500' },
    { id: '12', name: 'Backdrop & Stage Setup', description: 'Professional stage arrangements', priceRange: '$300-$2000' }
  ]
}

export default function ServicesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorId = searchParams.get('vendorId')

  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, Record<string, Subcategory | undefined>>>({})
  const [serviceDescription, setServiceDescription] = useState('')
  const [specializations, setSpecializations] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!vendorId) router.push('/vendor/onboarding')
  }, [vendorId, router])

  const handleCategoryToggle = (category: ServiceCategory) => {
    setSelectedCategories(prev => {
      const isSelected = prev.find(c => c.id === category.id)
      if (isSelected) {
        const newSelected = prev.filter(c => c.id !== category.id)
        setSelectedSubcategories(prevSub => {
          const next = { ...prevSub }
          delete next[category.slug]
          return next
        })
        return newSelected
      }
      return [...prev, category]
    })
  }

  const handleSubcategoryToggle = (categorySlug: string, subcategory: Subcategory) => {
    setSelectedSubcategories(prev => ({
      ...prev,
      [categorySlug]: {
        ...prev[categorySlug],
        [subcategory.id]: prev[categorySlug]?.[subcategory.id] ? undefined : subcategory
      }
    }))
  }

  const getSelectedSubcategoriesCount = useMemo(() => {
    return Object.values(selectedSubcategories).reduce((total, catSubs) => total + Object.values(catSubs).filter(Boolean).length, 0)
  }, [selectedSubcategories])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (selectedCategories.length === 0) newErrors.categories = 'Please select at least one service category'
    if (serviceDescription.trim().length < 50) newErrors.description = 'Service description must be at least 50 characters'
    const hasSubcategories = selectedCategories.some(cat => selectedSubcategories[cat.slug] && Object.values(selectedSubcategories[cat.slug]).some(Boolean))
    if (!hasSubcategories) newErrors.subcategories = 'Please select specific services for your chosen categories'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!vendorId) return
    if (!validateForm()) return
    setIsSubmitting(true)

    const selectedCategoryNames = selectedCategories.map(c => c.name)
    const itemsByCategory: Record<string, string[]> = {}
    for (const cat of selectedCategories) {
      const map = selectedSubcategories[cat.slug] || {}
      itemsByCategory[cat.name] = Object.values(map).filter(Boolean).map(s => (s as Subcategory).name)
    }

    const payload = {
      vendorId,
      selectedCategories: selectedCategoryNames,
      itemsByCategory,
      serviceDescription,
      additionalServices: specializations
    }

    try {
      const res = await fetch('/api/vendor/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push(`/vendor/onboarding/success?vendorId=${vendorId}`)
      } else {
        setErrors({ submit: data.error || 'Failed to save services' })
      }
    } catch (e) {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Setup Your Services</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Step 4 of 5</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What services and products do you offer?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Select the categories that best describe your business. You can choose multiple categories and specific services within each.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              Service Categories
              {selectedCategories.length > 0 && (
                <span className="ml-2 bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{selectedCategories.length} selected</span>
              )}
            </h3>
            {errors.categories && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{errors.categories}</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceCategories.map(category => {
                const IconComponent = category.icon
                const isSelected = selectedCategories.find(c => c.id === category.id)
                return (
                  <div key={category.id} onClick={() => handleCategoryToggle(category)} className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {selectedCategories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                Specific Services
                {getSelectedSubcategoriesCount > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{getSelectedSubcategoriesCount} selected</span>
                )}
              </h3>
              {errors.subcategories && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{errors.subcategories}</div>
              )}
              <div className="space-y-6">
                {selectedCategories.map(category => {
                  const subcategories = subcategoriesData[category.slug] || []
                  return (
                    <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: category.color }} />
                        {category.name}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subcategories.map(sub => {
                          const isSelected = !!selectedSubcategories[category.slug]?.[sub.id]
                          return (
                            <div key={sub.id} onClick={() => handleSubcategoryToggle(category.slug, sub)} className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${isSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-sm text-gray-900">{sub.name}</span>
                                    {sub.popular && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Popular</span>}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">{sub.description}</p>
                                  {sub.priceRange && <p className="text-xs text-blue-600 mt-1 font-medium">{sub.priceRange}</p>}
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-blue-500 mt-1" />}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-2">Service Description</label>
            <p className="text-sm text-gray-600 mb-4">Describe your services in detail. What makes your services special? (Minimum 50 characters)</p>
            {errors.description && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{errors.description}</div>}
            <textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} placeholder="Tell potential customers what makes your services special. Include your experience, unique offerings, quality standards, and what clients can expect when working with you..." className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32 resize-none" rows={6} />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${serviceDescription.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>{serviceDescription.length}/50 minimum characters</span>
              {serviceDescription.length >= 50 && <Check className="w-4 h-4 text-green-500" />}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-2">Specializations (Optional)</label>
            <p className="text-sm text-gray-600 mb-4">List any special skills, certifications, or unique offerings. Separate with commas.</p>
            <input type="text" value={specializations} onChange={(e) => setSpecializations(e.target.value)} placeholder="e.g., Organic catering, Destination weddings, Corporate events, Live entertainment" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {errors.submit && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{errors.submit}</div>}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button onClick={() => router.push(`/vendor/onboarding/documents?vendorId=${vendorId}&step=3`)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm font-medium flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Documents
            </button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


