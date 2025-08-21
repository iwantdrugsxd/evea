'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore, eventPlanningUtils } from '@/stores/event-planning-store'
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  Clock,
  FileText,
  Shield,
  Gift,
  TrendingUp
} from 'lucide-react'

interface PackageReviewProps {
  onComplete: (stepId: string) => void
}

const PackageReview = ({ onComplete }: PackageReviewProps) => {
  const { eventData, package: eventPackage } = useEventPlanningStore()
  const [showDetails, setShowDetails] = useState(false)

  const handleContinue = () => {
    onComplete('package-review')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const savingsPercentage = eventPackage.estimatedSavings > 0 
    ? Math.round((eventPackage.estimatedSavings / (eventPackage.subtotal + eventPackage.estimatedSavings)) * 100)
    : 0

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 backdrop-blur-lg px-6 py-3 rounded-full border border-blue-500/30 shadow-lg mb-6">
          <Sparkles className="h-5 w-5 text-blue-400" />
          <span className="text-blue-300 font-semibold">Step 5 of 6</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4">
          Review Your Perfect Package
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything looks great! Here's your complete {eventData.eventType?.name.toLowerCase()} package with all the details.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-elegant p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Event Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                  <div>
                    <p className="text-sm text-gray-500">Event Date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(eventData.eventDetails.date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                  <div>
                    <p className="text-sm text-gray-500">Time & Duration</p>
                    <p className="font-semibold text-gray-900">
                      {eventData.eventDetails.time} ({eventData.eventDetails.duration} hours)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">
                      {eventData.eventDetails.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                  <div>
                    <p className="text-sm text-gray-500">Guest Count</p>
                    <p className="font-semibold text-gray-900">
                      {eventData.eventDetails.guestCount} guests
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {eventData.eventDetails.specialRequirements && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-start space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                  <div>
                    <p className="text-sm text-gray-500">Special Requirements</p>
                    <p className="text-gray-900">
                      {eventData.eventDetails.specialRequirements}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Package Items */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-elegant p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Package Items</h2>
            
            <div className="space-y-6">
              {eventPackage.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-xl">
                        {item.serviceCategory.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.vendorCard.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {item.vendor.business_name}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{item.vendorCard.average_rating}</span>
                            <span>({item.vendorCard.total_reviews} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{item.vendor.city}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {eventPlanningUtils.formatPrice(item.totalPrice)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.quantity} × {eventPlanningUtils.formatPrice(item.price)}
                      </div>
                    </div>
                  </div>
                  
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Inclusions:</p>
                          <ul className="space-y-1 text-gray-600">
                            {item.vendorCard.inclusions?.map((inclusion, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{inclusion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Cancellation Policy:</p>
                          <p className="text-gray-600">
                            {item.vendorCard.cancellation_policy || 'Standard cancellation policy applies'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-6 text-blue-600 hover:text-blue-700 font-medium"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </motion.div>

        {/* Pricing Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-elegant p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing Summary</h2>
            
            {/* Savings Badge */}
            {savingsPercentage > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Gift className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-900">
                      You Save {savingsPercentage}%
                    </p>
                    <p className="text-sm text-green-700">
                      {eventPlanningUtils.formatPrice(eventPackage.estimatedSavings)} on package deal
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee (10%):</span>
                <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.platformFee)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (18% GST):</span>
                <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.taxAmount)}</span>
              </div>
              
              {eventPackage.estimatedSavings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Package Savings:</span>
                  <span className="font-medium">-{eventPlanningUtils.formatPrice(eventPackage.estimatedSavings)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>{eventPlanningUtils.formatPrice(eventPackage.totalAmount)}</span>
                </div>
              </div>
            </div>
            
            {/* Payment Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900">Secure Payment</p>
                  <p className="text-xs text-blue-700">
                    Your payment is protected and only released after event completion
                  </p>
                </div>
              </div>
            </div>
            
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 w-full group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Proceed to Payment</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            
            {/* Additional Info */}
            <div className="mt-6 space-y-3 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>All vendors are verified and insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>24/7 customer support included</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Free cancellation up to 7 days before</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200"
      >
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Book Your Perfect {eventData.eventType?.name}?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Your package is complete with {eventPackage.items.length} premium vendors. 
            Secure your booking now and get ready for an amazing event!
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PackageReview
