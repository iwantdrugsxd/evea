'use client'

import { CheckCircle, ArrowRight, Sparkles, Phone, FileText, Edit, Star, Calendar, MapPin, Users, DollarSign } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface PackageReviewProps {
  eventData: any
  requirementsData: any
  packageData: any
  onComplete: (data: any) => void
  onEdit: () => void
}

const THREE_STEP_PLAN = [
  { step: 1, title: 'Event Partner Call', description: 'Our event partner will call you to fine-tune your event details', icon: Phone, color: 'from-blue-500 to-cyan-500' },
  { step: 2, title: 'Create Quotation', description: 'We\'ll create a detailed quotation based on your requirements', icon: FileText, color: 'from-purple-500 to-pink-500' },
  { step: 3, title: 'WhatsApp Quote & Acceptance', description: 'Receive your quote on WhatsApp and confirm to proceed', icon: FaWhatsapp, color: 'from-green-500 to-emerald-500' }
]

export default function PackageReview({ eventData, requirementsData, packageData, onComplete, onEdit }: PackageReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to your backend
    const submissionData = {
      eventData,
      requirementsData,
      packageData,
      submittedAt: new Date().toISOString()
    }
    
    console.log('Package submitted:', submissionData)
    
    // Notify admin (this would be your actual implementation)
    // await notifyAdmin(submissionData)
    
    setIsSubmitting(false)
    onComplete(submissionData)
  }

  const getTotalPercentage = () => {
    if (!packageData?.selectedPackage) return 0
    
    // Calculate percentage based on package type
    const packagePercentages = {
      'essential': 10,
      'popular': 15,
      'premium': 25
    }
    
    return packagePercentages[packageData.selectedPackage.id as keyof typeof packagePercentages] || 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-6 pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Your Event Package
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base text-gray-300 max-w-2xl mx-auto"
          >
            Review your selected services and package details before proceeding
          </motion.p>
        </motion.div>

        {/* Main Package Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 mb-6"
        >
          {/* Event Details */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{eventData?.eventType} Event</h2>
              <div className="flex items-center space-x-4 text-gray-300 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{eventData?.eventDate || 'Date to be confirmed'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{eventData?.location || 'Location to be confirmed'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{eventData?.guestCount || 'Guest count to be confirmed'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all duration-300 text-sm"
            >
              <Edit className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Package Details */}
          {packageData?.selectedPackage && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Selected Package</h3>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-white">{packageData.selectedPackage.name}</h4>
                    <p className="text-gray-400 text-xs">{packageData.selectedPackage.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-bold ${packageData.selectedPackage.color}`}>
                      {getTotalPercentage()}% Premium
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Summary */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-3">Selected Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {requirementsData?.selectedServices?.map((service: any, index: number) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{service.name}</p>
                      <p className="text-gray-400 text-xs">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {service.essential && (
                      <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">Essential</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Package Summary */}
          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="text-gray-300 text-xs">Total Services</p>
                <p className="text-lg font-bold text-white">{requirementsData?.totalServices || 0}</p>
              </div>
              <div>
                <p className="text-gray-300 text-xs">Package Level</p>
                <p className="text-lg font-bold text-blue-400">{getTotalPercentage()}% Premium</p>
              </div>
              <div>
                <p className="text-gray-300 text-xs">Essential Services</p>
                <p className="text-lg font-bold text-green-400">
                  {requirementsData?.selectedServices?.filter((s: any) => s.essential).length || 0}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three Step Plan */}
        <motion.div className="mb-6">
          <h3 className="text-xl font-bold text-white text-center mb-6">Our Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_STEP_PLAN.map((step, index) => {
              const StepIcon = step.icon
              return (
                <motion.div key={step.step} className="relative">
                  <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <StepIcon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={onEdit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Package</span>
          </motion.button>

          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Submit & Get Quote</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
