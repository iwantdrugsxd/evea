'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Share2, Edit, Phone, MessageCircle, Mail, Calendar, MapPin, Users, Star, ArrowRight, Sparkles } from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import AnimatedBackground from '@/components/3d/AnimatedBackground'
import { FloatingObject, Balloon, Confetti, SpotlightBeam, AbstractShape } from '@/components/animations/FloatingObjects'

interface ProfessionalQuoteProps {
  eventData: any
  requirementsData: any
  packageData: any
  allocationData: any
  onComplete: (data: any) => void
}

export default function ProfessionalQuote({ eventData, requirementsData, packageData, allocationData, onComplete }: ProfessionalQuoteProps) {
  const [quoteReference] = useState(`EVE2024-${Math.floor(Math.random() * 10000)}`)
  const [validUntil] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toLocaleDateString('en-IN')
  })

  const handleDownloadQuote = () => {
    // Implement PDF download functionality
    console.log('Downloading quote PDF...')
  }

  const handleShareQuote = () => {
    // Implement share functionality
    console.log('Sharing quote...')
  }

  const handleModifyPackage = () => {
    // Navigate back to package selection
    console.log('Modifying package...')
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <FloatingNavbar />
      
      {/* Floating Objects */}
      <FloatingObject className="top-20 left-10" speed={0.5} delay={0.5}>
        <Balloon color="blue" size="large" />
      </FloatingObject>
      
      <FloatingObject className="top-32 right-20" speed={0.8} delay={1} direction="right">
        <Balloon color="purple" size="medium" />
      </FloatingObject>
      
      <FloatingObject className="bottom-40 left-20" speed={0.6} delay={1.5}>
        <AbstractShape type="circle" color="blue" />
      </FloatingObject>
      
      <FloatingObject className="top-1/2 right-10" speed={0.7} delay={2}>
        <SpotlightBeam color="purple" />
      </FloatingObject>
      
      <FloatingObject className="bottom-20 right-1/3" speed={0.4} delay={2.5}>
        <Confetti color="blue" />
      </FloatingObject>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Your Event is Taking Shape!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Here's your professional quote with all the details for your perfect event
          </motion.p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-white/50">Step 6 of 6 - Professional Quote</p>
        </motion.div>

        {/* Quote Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 mb-8"
        >
          {/* Quote Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional Quote</h3>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-white/60">Quote Reference:</span>
                  <span className="text-blue-400 font-semibold">#{quoteReference}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white/60">Valid Until:</span>
                  <span className="text-green-400 font-semibold">{validUntil}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  ₹{packageData.packageData.price.toLocaleString('en-IN')}
                </div>
                <p className="text-white/60 text-sm">Total Package Price</p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Event Details</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-white/60 text-sm">Event Date</p>
                    <p className="text-white font-medium">{eventData.eventDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white font-medium">{eventData.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-white/60 text-sm">Expected Guests</p>
                    <p className="text-white font-medium">{eventData.guestCount}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white/60 text-sm">Event Type</p>
                    <p className="text-white font-medium capitalize">{eventData.eventType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Package Details</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Package Type</span>
                  <span className="text-white font-medium">{packageData.packageData.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Services Included</span>
                  <span className="text-white font-medium">{requirementsData.totalServices}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Vendors Allocated</span>
                  <span className="text-white font-medium">{allocationData.allocatedVendors.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Budget Range</span>
                  <span className="text-white font-medium">{eventData.budgetRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coordinator Information */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Your Event Coordinator</h4>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-white text-lg">Rajesh Kumar</h5>
                <p className="text-white/70">Senior Event Coordinator</p>
                <p className="text-white/60 text-sm">Direct Line: +91-9876543210</p>
              </div>
              <div className="flex space-x-3">
                <button className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-colors">
                  <Phone className="h-5 w-5 text-green-400" />
                </button>
                <button className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-colors">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                </button>
                <button className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-colors">
                  <Mail className="h-5 w-5 text-purple-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Next Steps</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-white font-medium text-sm">Quote sent to your email</p>
                  <p className="text-white/60 text-xs">Check your inbox</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <Calendar className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium text-sm">Call scheduled for tomorrow 11 AM</p>
                  <p className="text-white/60 text-xs">We'll call you</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl">
                <MessageCircle className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-white font-medium text-sm">WhatsApp group created for coordination</p>
                  <p className="text-white/60 text-xs">Join the group</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleDownloadQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download Quote PDF</span>
          </motion.button>

          <motion.button
            onClick={handleShareQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
          >
            <Share2 className="h-5 w-5" />
            <span>Share Quote</span>
          </motion.button>

          <motion.button
            onClick={handleModifyPackage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
          >
            <Edit className="h-5 w-5" />
            <span>Modify Package</span>
          </motion.button>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Need Help?</h4>
            <p className="text-white/70 mb-6">Our team is here to help you with any questions about your quote</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                <Phone className="h-5 w-5 text-green-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">Call Us</p>
                  <p className="text-white/60 text-xs">+91-7057379190</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                <Mail className="h-5 w-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">Email Us</p>
                  <p className="text-white/60 text-xs">vnair0795@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                <MessageCircle className="h-5 w-5 text-purple-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">WhatsApp</p>
                  <p className="text-white/60 text-xs">Instant support</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
