'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore } from '@/stores/event-planning-store'
import { eventPlanningUtils } from '@/stores/event-planning-store'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  FileText,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface EventDetailsFormProps {
  onComplete: (stepId: string) => void
}

const EventDetailsForm = ({ onComplete }: EventDetailsFormProps) => {
  const { eventData, setEventDetails } = useEventPlanningStore()
  const [formData, setFormData] = useState(eventData.eventDetails)
  const [errors, setErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const validationErrors = eventPlanningUtils.validateEventDetails(formData)
    setErrors(validationErrors)
    setIsValid(validationErrors.length === 0)
  }, [formData])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (isValid) {
      setEventDetails(formData)
      onComplete('event-details')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 backdrop-blur-lg px-6 py-3 rounded-full border border-blue-500/30 shadow-lg mb-6">
          <Sparkles className="h-5 w-5 text-blue-400" />
          <span className="text-blue-300 font-semibold">Step 2 of 6</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4">
          Tell us about your event
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Provide the details so we can match you with the perfect vendors
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8"
      >
        {/* Date and Time */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-elegant">
          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
            <h2 className="text-2xl font-semibold text-gray-900">Date & Time</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-base w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="input-base w-full"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours) *</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="12"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-gray-900 min-w-[3rem]">
                {formData.duration}h
              </span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-elegant">
          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
            <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City/Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="input-base w-full"
                placeholder="e.g., Mumbai, Delhi, Bangalore"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="input-base w-full resize-none"
                placeholder="Enter the complete address of your event venue"
              />
            </div>
          </div>
        </div>

        {/* Guest Count */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-elegant">
          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
            <h2 className="text-2xl font-semibold text-gray-900">Guest Count</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests *</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={formData.guestCount}
                onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-gray-900 min-w-[4rem]">
                {formData.guestCount}
              </span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-elegant">
          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
            <h2 className="text-2xl font-semibold text-gray-900">Budget</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget (₹) *</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-gray-900 min-w-[8rem]">
                {formatCurrency(formData.budget)}
              </span>
            </div>
          </div>
        </div>

        {/* Special Requirements */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-elegant">
          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
            <h2 className="text-2xl font-semibold text-gray-900">Special Requirements</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements (Optional)</label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              rows={4}
              className="input-base w-full resize-none"
              placeholder="Any special requirements, dietary restrictions, accessibility needs..."
            />
          </div>
        </div>

        {/* Error Display */}
        {errors.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Please fix the following issues:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                {isValid ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <Calendar className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {isValid ? 'All Details Complete!' : 'Complete Your Event Details'}
                </h3>
                <p className="text-gray-600">
                  {formData.date && formData.time && (
                    <>
                      {new Date(formData.date).toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {formData.time}
                    </>
                  )}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center space-x-2">
                <span>Continue</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EventDetailsForm
