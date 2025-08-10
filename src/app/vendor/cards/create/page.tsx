// src/app/(vendor)/cards/create/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Upload,
  X,
  Plus,
  Minus,
  Camera,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Star,
  Calendar,
  Package,
  Eye,
  Save,
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Tag,
  FileText,
  Settings,
  Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

interface ServiceCard {
  // Basic Information
  title: string
  description: string
  category: string
  subcategory: string
  
  // Service Details
  serviceArea: string[]
  maxCapacity: number
  minBookingTime: number
  maxBookingTime: number
  advanceBookingDays: number
  
  // Inclusions & Exclusions
  inclusions: string[]
  exclusions: string[]
  equipmentProvided: string[]
  
  // Media
  images: File[]
  videos: File[]
  
  // Availability
  workingDays: string[]
  workingHours: { start: string; end: string }
  
  // SEO
  tags: string[]
  seoDescription: string
  
  // Pricing (moved to end)
  basePrice: number
  priceType: 'fixed' | 'per_hour' | 'per_day' | 'per_person' | 'custom'
}

const initialCardData: ServiceCard = {
  title: '',
  description: '',
  category: '',
  subcategory: '',
  serviceArea: [],
  maxCapacity: 0,
  minBookingTime: 1,
  maxBookingTime: 30,
  advanceBookingDays: 7,
  inclusions: [],
  exclusions: [],
  equipmentProvided: [],
  images: [],
  videos: [],
  workingDays: [],
  workingHours: { start: '09:00', end: '18:00' },
  tags: [],
  seoDescription: '',
  basePrice: 0,
  priceType: 'fixed'
}

const priceTypes = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'per_hour', label: 'Per Hour' },
  { value: 'per_day', label: 'Per Day' },
  { value: 'per_person', label: 'Per Person' },
  { value: 'custom', label: 'Custom Pricing' }
]

// Reduced to 4 steps
const steps = [
  { id: 1, title: 'Basic Info', icon: FileText },
  { id: 2, title: 'Service Details', icon: Settings },
  { id: 3, title: 'Media & Images', icon: ImageIcon },
  { id: 4, title: 'Pricing & Preview', icon: DollarSign }
]

export default function CreateCardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cardData, setCardData] = useState<ServiceCard>(initialCardData)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      } else {
        console.error('Failed to fetch categories')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setIsLoadingCategories(false)
    }
  }

  const updateCardData = (field: keyof ServiceCard, value: any) => {
    setCardData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addToArray = (field: keyof ServiceCard, value: string) => {
    if (value.trim()) {
      const currentArray = cardData[field] as string[]
      if (!currentArray.includes(value.trim())) {
        updateCardData(field, [...currentArray, value.trim()])
      }
    }
  }

  const removeFromArray = (field: keyof ServiceCard, index: number) => {
    const currentArray = cardData[field] as string[]
    updateCardData(field, currentArray.filter((_, i) => i !== index))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).filter(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error('Please select only image files')
          return false
        }
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('Image size should be less than 10MB')
          return false
        }
        return true
      })

      // Create preview URLs for new images
      const newPreviewUrls = newImages.map(file => URL.createObjectURL(file))
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls])
      
      updateCardData('images', [...cardData.images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    const newImages = cardData.images.filter((_, i) => i !== index)
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index)
    
    updateCardData('images', newImages)
    setImagePreviewUrls(newPreviewUrls)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!cardData.title.trim()) newErrors.title = 'Title is required'
        if (!cardData.description.trim()) newErrors.description = 'Description is required'
        if (!cardData.category) newErrors.category = 'Category is required'
        if (cardData.title.length > 100) newErrors.title = 'Title must be less than 100 characters'
        if (cardData.description.length < 50) newErrors.description = 'Description must be at least 50 characters'
        break
      case 2:
        if (cardData.serviceArea.length === 0) newErrors.serviceArea = 'At least one service area is required'
        if (!cardData.maxCapacity || cardData.maxCapacity <= 0) newErrors.maxCapacity = 'Maximum capacity must be greater than 0'
        if (cardData.minBookingTime > cardData.maxBookingTime) newErrors.minBookingTime = 'Min booking time cannot be greater than max booking time'
        break
      case 3:
        if (cardData.images.length === 0) newErrors.images = 'At least one image is required'
        break
      case 4:
        if (!cardData.basePrice || cardData.basePrice <= 0) newErrors.basePrice = 'Base price must be greater than 0'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsLoading(true)
    try {
      // Submit card data
      const formData = new FormData()
      Object.entries(cardData).forEach(([key, value]) => {
        if (key === 'images' || key === 'videos') {
          (value as File[]).forEach(file => formData.append(key, file))
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      })
      
      const response = await fetch('/api/vendor/cards', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const result = await response.json()
        toast.success('Service card created successfully!')
        router.push('/vendor/cards')
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to create service card')
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const saveDraft = async () => {
    setIsLoading(true)
    try {
      const draftData = { ...cardData, status: 'draft' }
      const formData = new FormData()
      Object.entries(draftData).forEach(([key, value]) => {
        if (key === 'images' || key === 'videos') {
          (value as File[]).forEach(file => formData.append(key, file))
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      })
      
      // For draft, we'll just save to localStorage for now
      localStorage.setItem('vendorCardDraft', JSON.stringify(draftData))
      toast.success('Draft saved successfully!')
    } catch (error) {
      toast.error('Failed to save draft')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                value={cardData.title}
                onChange={(e) => updateCardData('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Professional Wedding Photography"
                maxLength={100}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                <span className="text-xs text-gray-500 ml-auto">
                  {cardData.title.length}/100
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                {isLoadingCategories ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-gray-500">Loading categories...</span>
                  </div>
                ) : (
                  <select
                    value={cardData.category}
                    onChange={(e) => updateCardData('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                )}
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <input
                  type="text"
                  value={cardData.subcategory}
                  onChange={(e) => updateCardData('subcategory', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Photography, Decoration, Catering"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Description *
              </label>
              <textarea
                value={cardData.description}
                onChange={(e) => updateCardData('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your service in detail. Include what makes you unique, your experience, and what customers can expect..."
                minLength={50}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                <span className="text-xs text-gray-500 ml-auto">
                  {cardData.description.length}/500
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Description
              </label>
              <textarea
                value={cardData.seoDescription}
                onChange={(e) => updateCardData('seoDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="A brief description for search engines (150-160 characters)"
                maxLength={160}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 ml-auto">
                  {cardData.seoDescription.length}/160
                </span>
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Areas * (Type or select from suggestions)
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a service area (e.g., Mumbai, Delhi)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addToArray('serviceArea', e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addToArray('serviceArea', input.value)
                    input.value = ''
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {cardData.serviceArea.map((area, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {area}
                    <button
                      type="button"
                      onClick={() => removeFromArray('serviceArea', index)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              {errors.serviceArea && <p className="text-red-500 text-sm mt-1">{errors.serviceArea}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Capacity * (Type or use arrows)
                </label>
                <input
                  type="number"
                  value={cardData.maxCapacity}
                  onChange={(e) => updateCardData('maxCapacity', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="100"
                  min="1"
                />
                {errors.maxCapacity && <p className="text-red-500 text-sm mt-1">{errors.maxCapacity}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Booking Time (hours)
                </label>
                <input
                  type="number"
                  value={cardData.minBookingTime}
                  onChange={(e) => updateCardData('minBookingTime', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="1"
                  min="1"
                />
                {errors.minBookingTime && <p className="text-red-500 text-sm mt-1">{errors.minBookingTime}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advance Booking (days)
                </label>
                <input
                  type="number"
                  value={cardData.advanceBookingDays}
                  onChange={(e) => updateCardData('advanceBookingDays', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="7"
                  min="1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's Included (Type or select from suggestions)
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Add inclusion (e.g., Professional photographer, Edited photos)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addToArray('inclusions', e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addToArray('inclusions', input.value)
                    input.value = ''
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {cardData.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 px-4 py-2 rounded-lg">
                    <span className="text-green-800 flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      {inclusion}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('inclusions', index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's Not Included (Type or select from suggestions)
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Add exclusion (e.g., Travel costs, Additional equipment)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addToArray('exclusions', e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addToArray('exclusions', input.value)
                    input.value = ''
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {cardData.exclusions.map((exclusion, index) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 px-4 py-2 rounded-lg">
                    <span className="text-red-800 flex items-center">
                      <X className="h-4 w-4" />
                      {exclusion}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('exclusions', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Days (Select or type custom)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={cardData.workingDays.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateCardData('workingDays', [...cardData.workingDays, day])
                        } else {
                          updateCardData('workingDays', cardData.workingDays.filter(d => d !== day))
                        }
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours Start
                  </label>
                  <input
                    type="time"
                    value={cardData.workingHours.start}
                    onChange={(e) => updateCardData('workingHours', {
                      ...cardData.workingHours,
                      start: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours End
                  </label>
                  <input
                    type="time"
                    value={cardData.workingHours.end}
                    onChange={(e) => updateCardData('workingHours', {
                      ...cardData.workingHours,
                      end: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Images * (Upload or drag & drop)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 cursor-pointer transition-colors"
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload images or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                <p className="text-sm text-purple-600 mt-2">At least one image is required</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
              />
              
              {cardData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {cardData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imagePreviewUrls[index] || URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Type or select from suggestions)
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Add tag (e.g., professional, affordable, premium)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addToArray('tags', e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addToArray('tags', input.value)
                    input.value = ''
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {cardData.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeFromArray('tags', index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            {/* Pricing Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Set Your Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Starting Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={cardData.basePrice}
                    onChange={(e) => updateCardData('basePrice', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10000"
                    min="0"
                    step="100"
                  />
                  {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>}
                  <p className="text-xs text-purple-600 mt-1">This will be displayed as "Starting from ₹X"</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Pricing Type
                  </label>
                  <select
                    value={cardData.priceType}
                    onChange={(e) => updateCardData('priceType', e.target.value as any)}
                    className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {priceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Professional Card Preview */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-md mx-auto">
              <div className="relative">
                {cardData.images.length > 0 ? (
                  <img
                    src={imagePreviewUrls[0] || URL.createObjectURL(cardData.images[0])}
                    alt={cardData.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                    {categories.find(c => c.id === cardData.category)?.name || 'Category'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cardData.title || 'Service Title'}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {cardData.description || 'Service description will appear here...'}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">4.8</span>
                    <span className="text-gray-500">(124)</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">
                      Starting from ₹{cardData.basePrice.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-500">{cardData.priceType.replace('_', ' ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{cardData.serviceArea[0] || 'Service Area'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Up to {cardData.maxCapacity || 0}</span>
                  </div>
                </div>
                
                {cardData.inclusions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {cardData.inclusions.slice(0, 3).map((inclusion, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {inclusion}
                        </span>
                      ))}
                      {cardData.inclusions.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{cardData.inclusions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                  View Details & Book
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">This is how your service card will appear to customers</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-800">Review your information</p>
                    <p className="text-sm text-blue-600">
                      Make sure all details are accurate before publishing your service card.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Service Card</h1>
            <p className="text-gray-600">Add a new service to your portfolio</p>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-gray-300 text-gray-500'
              }`}>
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 hidden md:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Form Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {steps.find(step => step.id === currentStep)?.title}
        </h2>
        {renderStepContent()}
      </motion.div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
        
        <div className="flex space-x-4">
          <button 
            onClick={saveDraft}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Draft
          </button>
          
          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 flex items-center"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Publish Service
            </button>
          )}
        </div>
      </div>
    </div>
  )
}