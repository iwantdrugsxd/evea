'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore } from '@/stores/event-planning-store'
import { CheckCircle, Phone, Mail, MessageCircle, Download, Share2, ArrowRight, Calendar, MapPin, Users } from 'lucide-react'

interface QuoteConfirmationProps {
  onComplete: () => void
}

export default function QuoteConfirmation({ onComplete }: QuoteConfirmationProps) {
  const { eventData } = useEventPlanningStore()
  const [quoteData] = useState({
    reference: 'EVE2025-0471',
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    coordinator: 'Rajesh Kumar',
    phone: '+91-9876543210',
    estimatedTotal: 52000,
    callScheduled: 'Tomorrow 11:00 AM'
  })

  const progressSteps = [
    { id: 1, title: 'Quote emailed to you', completed: true, icon: Mail },
    { id: 2, title: `Call scheduled: ${quoteData.callScheduled}`, completed: true, icon: Phone },
    { id: 3, title: 'WhatsApp group created for instant updates', completed: true, icon: MessageCircle }
  ]

  const handleDownloadPDF = () => {
    // Implement PDF download
    console.log('Downloading PDF...')
  }

  const handleShareQuote = () => {
    // Implement share functionality
    console.log('Sharing quote...')
  }

  const handleApproveAndPay = () => {
    // Implement payment flow
    console.log('Proceeding to payment...')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
        >
          Your Event Is Taking Shape!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          We've prepared your personalized quote and next steps
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>
        <p className="text-center text-sm text-gray-500">Step 4 of 4</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quote Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Quote Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Quote Details</h3>
              <div className="text-sm text-gray-500">#{quoteData.reference}</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Valid Until:</span>
                <span className="font-medium">{quoteData.validUntil}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Coordinator:</span>
                <span className="font-medium">{quoteData.coordinator}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium">{quoteData.phone}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-800">Estimated Total:</span>
                  <span className="text-2xl font-bold text-blue-600">₹{quoteData.estimatedTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Summary</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">{eventData.eventDetails.date} at {eventData.eventDetails.time}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">{eventData.eventDetails.location}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">{eventData.eventDetails.guestCount} guests</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress & Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Progress Steps */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>
            
            <div className="space-y-4">
              {progressSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`p-2 rounded-full ${
                    step.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <step.icon className={`h-4 w-4 ${
                      step.completed ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <span className={`text-sm ${
                    step.completed ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {step.completed && (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleApproveAndPay}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Approve & Pay 30% Deposit</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={handleShareQuote}
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Quote</span>
              </button>
            </div>
            
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
            >
              Modify Package
            </button>
          </div>

          {/* Referral */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-4 text-center">
            <p className="text-sm text-gray-700 mb-2">Know someone planning an event?</p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Refer a Friend & Get ₹1,000 Off
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
