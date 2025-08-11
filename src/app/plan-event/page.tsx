'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEventPlanningStore, useEventPlanningSelectors } from '@/stores/event-planning-store'
import { EVENT_TYPES } from '@/types/event-planning'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventTypeSelection from '@/components/event-planning/EventTypeSelection'
import EventDetailsForm from '@/components/event-planning/EventDetailsForm'
import ServiceSelection from '@/components/event-planning/ServiceSelection'
import VendorSelection from '@/components/event-planning/VendorSelection'
import PackageReview from '@/components/event-planning/PackageReview'
import BookingConfirmation from '@/components/event-planning/BookingConfirmation'
import ProgressStepper from '@/components/event-planning/ProgressStepper'
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

const EventPlanningPage = () => {
  const {
    currentStep,
    steps,
    eventData,
    package: eventPackage,
    loading,
    error,
    setCurrentStep,
    nextStep,
    previousStep,
    completeStep,
    setLoading,
    setError
  } = useEventPlanningStore()

  const [showLanding, setShowLanding] = useState(true)

  // Auto-complete steps based on data
  useEffect(() => {
    if (eventData.eventType && !steps[0].isCompleted) {
      completeStep('event-type')
    }
    if (eventData.eventDetails.date && !steps[1].isCompleted) {
      completeStep('event-details')
    }
    if (eventData.selectedServices.length > 0 && !steps[2].isCompleted) {
      completeStep('service-selection')
    }
    if (eventData.selectedVendors.length > 0 && !steps[3].isCompleted) {
      completeStep('vendor-selection')
    }
    if (eventPackage.items.length > 0 && !steps[4].isCompleted) {
      completeStep('package-review')
    }
  }, [eventData, eventPackage, steps, completeStep])

  const handleStartPlanning = () => {
    setShowLanding(false)
    setCurrentStep(0)
  }

  const handleStepComplete = (stepId: string) => {
    completeStep(stepId)
    nextStep()
  }

  const renderCurrentStep = () => {
    const stepComponents = {
      'event-type': EventTypeSelection,
      'event-details': EventDetailsForm,
      'service-selection': ServiceSelection,
      'vendor-selection': VendorSelection,
      'package-review': PackageReview,
      'booking': BookingConfirmation
    }

    const CurrentComponent = stepComponents[steps[currentStep]?.id as keyof typeof stepComponents]
    
    if (!CurrentComponent) return null

    return (
      <motion.div
        key={steps[currentStep]?.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full"
      >
        <CurrentComponent onComplete={handleStepComplete} />
      </motion.div>
    )
  }

  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
        <Header />
        
        {/* Landing Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/20 to-white"></div>
          <div className="absolute top-20 left-10 w-24 h-24 bg-primary-100 rounded-full opacity-40 animate-float blur-sm"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-30 animate-bounce-soft"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary-200 rounded-full opacity-50 animate-pulse-glow"></div>
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 px-6 py-4 rounded-full border border-primary-200 shadow-red-soft"
              >
                <Sparkles className="h-5 w-5 text-primary-600" />
                <span className="text-primary-700 font-semibold text-lg">AI-Powered Event Planning</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading text-gray-900 leading-tight">
                  Plan Your Perfect Event
                  <span className="text-gradient block mt-2">
                    in Minutes, Not Months
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Our intelligent platform matches you with the best vendors, creates personalized packages, 
                  and ensures your event is everything you dreamed of.
                </p>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {[
                  {
                    icon: Calendar,
                    title: 'Smart Scheduling',
                    description: 'Find the perfect date and time for your event'
                  },
                  {
                    icon: MapPin,
                    title: 'Location Matching',
                    description: 'Discover venues that match your style and budget'
                  },
                  {
                    icon: Users,
                    title: 'Vendor Selection',
                    description: 'Choose from verified, top-rated service providers'
                  },
                  {
                    icon: DollarSign,
                    title: 'Budget Optimization',
                    description: 'Get the best value with our package deals'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-elegant hover:shadow-elegant-hover transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="space-y-6"
              >
                <button
                  onClick={handleStartPlanning}
                  className="btn-primary btn-lg group relative overflow-hidden"
                  suppressHydrationWarning
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Start Planning Today</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>5-Minute Setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Verified Vendors</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container-custom">
          {/* Progress Stepper */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <ProgressStepper 
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </motion.div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {renderCurrentStep()}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-between items-center mt-12 max-w-4xl mx-auto"
            >
              <button
                onClick={previousStep}
                className="btn-outline btn-lg"
                disabled={currentStep === 0}
              >
                Previous Step
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Step {currentStep + 1} of {steps.length}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {steps[currentStep]?.title}
                </p>
              </div>
              
              <button
                onClick={nextStep}
                className="btn-primary btn-lg"
                disabled={!steps[currentStep]?.isCompleted}
                suppressHydrationWarning
              >
                Next Step
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default EventPlanningPage
