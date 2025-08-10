'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Save, Eye, EyeOff } from 'lucide-react'
import { ServiceCardFormData, ServiceCardValidationErrors } from '@/types/card'
import BasicInformationStep from './form-steps/BasicInformationStep'
import PricingPackagesStep from './form-steps/PricingPackagesStep'
import ServiceSpecificationsStep from './form-steps/ServiceSpecificationsStep'
import MediaPortfolioStep from './form-steps/MediaPortfolioStep'
import AdditionalSettingsStep from './form-steps/AdditionalSettingsStep'
import FormPreview from './form-steps/FormPreview'

const STEPS = [
  { id: 1, title: 'Basic Information', component: BasicInformationStep },
  { id: 2, title: 'Pricing & Packages', component: PricingPackagesStep },
  { id: 3, title: 'Service Specifications', component: ServiceSpecificationsStep },
  { id: 4, title: 'Media & Portfolio', component: MediaPortfolioStep },
  { id: 5, title: 'Additional Settings', component: AdditionalSettingsStep },
  { id: 6, title: 'Preview & Submit', component: FormPreview }
]

const initialFormData: ServiceCardFormData = {
  // Step 1: Basic Information
  title: '',
  description: '',
  categoryId: '',
  subcategoryId: '',
  tags: [],
  seoKeywords: [],
  
  // Step 2: Pricing & Packages
  priceType: 'fixed',
  basePrice: 0,
  priceRange: { min: 0, max: 0 },
  packageTiers: [],
  addOnServices: [],
  promotionalOffers: [],
  
  // Step 3: Service Specifications
  serviceArea: [],
  capacity: { min: 1, max: 100 },
  duration: 1,
  advanceBookingDays: 1,
  equipmentProvided: [],
  inclusions: [],
  exclusions: [],
  
  // Step 4: Media & Portfolio
  serviceImages: [],
  portfolioImages: [],
  videos: [],
  
  // Step 5: Additional Settings
  isCustomizable: false,
  customizationOptions: [],
  responseTime: 24,
  specialRequirements: ''
}

export default function ServiceCardForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ServiceCardFormData>(initialFormData)
  const [errors, setErrors] = useState<ServiceCardValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const updateFormData = useCallback((updates: Partial<ServiceCardFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    // Clear errors for updated fields
    const newErrors = { ...errors }
    Object.keys(updates).forEach(key => {
      delete newErrors[key]
    })
    setErrors(newErrors)
  }, [errors])

  const validateStep = (step: number): boolean => {
    const newErrors: ServiceCardValidationErrors = {}

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Service title is required'
        if (!formData.description.trim()) newErrors.description = 'Service description is required'
        if (!formData.categoryId) newErrors.categoryId = 'Category is required'
        break
      
      case 2:
        if (formData.basePrice <= 0) newErrors.basePrice = 'Base price must be greater than 0'
        if (formData.priceType === 'package' && formData.packageTiers.length === 0) {
          newErrors.packageTiers = 'At least one package tier is required'
        }
        break
      
      case 3:
        if (formData.serviceArea.length === 0) newErrors.serviceArea = 'Service area is required'
        if (formData.capacity.min <= 0) newErrors.capacity = 'Minimum capacity must be greater than 0'
        if (formData.capacity.max < formData.capacity.min) newErrors.capacity = 'Maximum capacity must be greater than minimum'
        break
      
      case 4:
        if (formData.serviceImages.length === 0) newErrors.serviceImages = 'At least one service image is required'
        break
      
      case 5:
        if (formData.responseTime <= 0) newErrors.responseTime = 'Response time must be greater than 0'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= STEPS.length) {
      setCurrentStep(step)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData()
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value)
        } else if (typeof value === 'object') {
          formDataToSend.append(key, JSON.stringify(value))
        } else {
          formDataToSend.append(key, String(value))
        }
      })

      // Add vendor ID (you'll need to get this from auth context)
      formDataToSend.append('vendorId', 'temp-vendor-id')

      const response = await fetch('/api/vendor-cards', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        const result = await response.json()
        // Handle success - redirect to cards page or show success message
        console.log('Service card created:', result)
      } else {
        throw new Error('Failed to create service card')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setErrors({ submit: 'Failed to create service card. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold mb-2">Create Service Card</h1>
        <p className="text-purple-100">Build your service offering step by step</p>
      </div>

      {/* Progress Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => goToStep(step.id)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step.id === currentStep
                    ? 'border-purple-600 bg-purple-600 text-white'
                    : step.id < currentStep
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {step.id < currentStep ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.id
                )}
              </button>
              {index < STEPS.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-sm text-gray-600">
            Step {currentStep} of {STEPS.length}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-3">
            {currentStep < STEPS.length ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Service Card
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {errors.submit && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}
      </div>
    </div>
  )
}
