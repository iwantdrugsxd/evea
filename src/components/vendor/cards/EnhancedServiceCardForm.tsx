'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Star, 
  Users, 
  Calendar,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Trash2,
  Zap,
  FileText,
  Tag,
  Hash,
  MapPin,
  Package,
  Upload,
  Image,
  X
} from 'lucide-react'

// Import form steps
import BasicInformationStep from './form-steps/BasicInformationStep'
import PortfolioStep from './form-steps/PortfolioStep'
import MediaUploadStep from './form-steps/MediaUploadStep'
import PreviewStep from './form-steps/PreviewStep'

interface FormData {
  // Basic Information
  title: string
  description: string
  categoryId: string
  basePrice: number
  serviceArea: string[]
  tags: string[]
  
  // Portfolio
  portfolioItems: Array<{
    title: string
    description: string
    imageUrl: string
    projectValue: number
    projectDate: string
    clientName: string
  }>
  
  // Media
  serviceImages: File[]
  portfolioImages: File[]
  
  // Service Details
  inclusions: string[]
  exclusions: string[]
  equipmentProvided: string[]
  experienceYears: number
  certifications: string[]
  insuranceCoverage: string
  emergencyContact: string
  cancellationPolicy: string
  responseTime: number
  maxCapacity: number
}

const initialFormData: FormData = {
  title: '',
  description: '',
  categoryId: '',
  basePrice: 0,
  serviceArea: [],
  tags: [],
  portfolioItems: [],
  serviceImages: [],
  portfolioImages: [],
  inclusions: [],
  exclusions: [],
  equipmentProvided: [],
  experienceYears: 0,
  certifications: [],
  insuranceCoverage: '',
  emergencyContact: '',
  cancellationPolicy: '',
  responseTime: 0,
  maxCapacity: 0
}

const steps = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Service details and pricing',
    icon: FileText,
    component: BasicInformationStep
  },
  {
    id: 2,
    title: 'Portfolio',
    description: 'Showcase your work',
    icon: Image,
    component: PortfolioStep
  },
  {
    id: 3,
    title: 'Media Upload',
    description: 'Add images and videos',
    icon: Upload,
    component: MediaUploadStep
  },
  {
    id: 4,
    title: 'Preview',
    description: 'Review and submit',
    icon: Eye,
    component: PreviewStep
  }
]

export default function EnhancedServiceCardForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }, [])

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  // Development helper function to fill sample data
  const fillWithSampleData = () => {
    const sampleData: FormData = {
      title: 'Professional Wedding Photography & Videography',
      description: 'Capture your special day with our premium wedding photography and videography services. We specialize in creating timeless memories with a blend of traditional and contemporary styles. Our experienced team ensures every moment is beautifully documented, from the pre-wedding ceremonies to the grand reception. We offer both indoor and outdoor shoots, with professional lighting and high-quality equipment.',
      categoryId: '1',
      basePrice: 25000,
      serviceArea: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['Wedding', 'Photography', 'Videography', 'Professional'],
      portfolioItems: [
        {
          title: 'Luxury Wedding at Taj Palace',
          description: 'A grand wedding celebration with 500+ guests',
          imageUrl: '',
          projectValue: 75000,
          projectDate: '2024-03-15',
          clientName: 'Priya & Raj'
        },
        {
          title: 'Beach Wedding in Goa',
          description: 'Intimate beachside ceremony with sunset views',
          imageUrl: '',
          projectValue: 45000,
          projectDate: '2024-02-20',
          clientName: 'Anjali & Vikram'
        }
      ],
      serviceImages: [],
      portfolioImages: [],
      inclusions: [
        'Full day coverage',
        'Edited photos (500+ images)',
        'Wedding video (2-3 hours)',
        'Pre-wedding shoot',
        'Online gallery',
        'USB drive with all photos'
      ],
      exclusions: [
        'Travel beyond 50km',
        'Additional editing requests',
        'Print services'
      ],
      equipmentProvided: [
        'Professional DSLR cameras',
        'Multiple lenses',
        'Professional lighting setup',
        'Drone for aerial shots',
        'Backup equipment'
      ],
      experienceYears: 8,
      certifications: [
        'Certified Professional Photographer',
        'Adobe Creative Suite Expert',
        'Drone Photography License'
      ],
      insuranceCoverage: 'Comprehensive coverage up to ₹10,00,000',
      emergencyContact: '+91 98765 43210',
      cancellationPolicy: '50% refund if cancelled 30 days before event',
      responseTime: 2,
      maxCapacity: 1000
    }
    setFormData(sampleData)
    toast.success('Sample data filled!')
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const submitData = new FormData()
      
      // Add basic form data
      submitData.append('vendorId', '55b6c2e2-4634-44b8-a208-f0fc3d79c90f') // This should come from auth
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('categoryId', formData.categoryId)
      submitData.append('basePrice', formData.basePrice.toString())
      submitData.append('serviceArea', JSON.stringify(formData.serviceArea))
      submitData.append('inclusions', JSON.stringify(formData.inclusions))
      submitData.append('exclusions', JSON.stringify(formData.exclusions))
      
      // Add files separately
      formData.serviceImages.forEach((file, index) => {
        submitData.append('serviceImages', file)
      })
      
      formData.portfolioImages.forEach((file, index) => {
        submitData.append('portfolioImages', file)
      })

      const response = await fetch('/api/vendor-cards', {
        method: 'POST',
        body: submitData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create service card')
      }

      const result = await response.json()
      toast.success('Service card created successfully!')
      router.push('/vendor/cards')
      
    } catch (error) {
      console.error('Error creating service card:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to create service card')
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Service Card
              </h1>
              <p className="text-gray-600">
                Showcase your services and attract more clients
              </p>
            </div>
            
            {/* Development helper button */}
            {process.env.NODE_ENV === 'development' && (
              <Button
                onClick={fillWithSampleData}
                variant="outline"
                className="bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100"
              >
                <Zap className="w-4 h-4 mr-2" />
                Fill Sample Data
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Progress
              </h3>
              
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id
                  const StepIcon = step.icon
                  
                  return (
                    <div
                      key={step.id}
                      className={`relative cursor-pointer transition-all duration-200 ${
                        isActive ? 'scale-105' : ''
                      }`}
                      onClick={() => goToStep(step.id)}
                    >
                      <div className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                          : isCompleted
                          ? 'bg-green-50 border border-green-200 text-green-700'
                          : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive 
                            ? 'bg-white/20' 
                            : isCompleted
                            ? 'bg-green-100'
                            : 'bg-gray-200'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            isActive ? 'text-white' : 'text-gray-900'
                          }`}>
                            {step.title}
                          </p>
                          <p className={`text-xs ${
                            isActive ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                        {isActive && (
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Progress line */}
                      {index < steps.length - 1 && (
                        <div className={`absolute left-4 top-12 w-0.5 h-8 ${
                          isCompleted ? 'bg-green-200' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {/* Progress percentage */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((currentStep / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Step Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {(() => {
                          const StepIcon = steps[currentStep - 1].icon
                          return <StepIcon className="w-5 h-5" />
                        })()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {steps[currentStep - 1].title}
                      </h2>
                      <p className="text-gray-600">
                        {steps[currentStep - 1].description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Step {currentStep} of {steps.length}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={updateFormData}
                />
              </div>

              {/* Step Navigation */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-3">
                    {currentStep === steps.length ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Create Service Card
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
