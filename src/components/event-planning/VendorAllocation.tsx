'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, MapPin, Star, Users, ArrowRight, Sparkles, Phone, MessageCircle } from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import AnimatedBackground from '@/components/3d/AnimatedBackground'
import { FloatingObject, Balloon, Confetti, SpotlightBeam, AbstractShape } from '@/components/animations/FloatingObjects'

interface VendorAllocationProps {
  eventData: any
  requirementsData: any
  packageData: any
  onComplete: (data: any) => void
}

const MOCK_VENDORS = [
  {
    id: '1',
    name: 'Perfect Events Mumbai',
    rating: 4.8,
    reviews: 156,
    location: 'Mumbai, Maharashtra',
    specialties: ['Decoration', 'Catering', 'Sound'],
    availability: 'Available',
    responseTime: '2 hours',
    image: '/images/vendor.png'
  },
  {
    id: '2',
    name: 'Elite Event Solutions',
    rating: 4.9,
    reviews: 89,
    location: 'Mumbai, Maharashtra',
    specialties: ['Venue', 'Lighting', 'Photography'],
    availability: 'Available',
    responseTime: '1 hour',
    image: '/images/vendor.png'
  },
  {
    id: '3',
    name: 'Royal Celebrations',
    rating: 4.7,
    reviews: 234,
    location: 'Mumbai, Maharashtra',
    specialties: ['Mandap', 'Decoration', 'Catering'],
    availability: 'Available',
    responseTime: '3 hours',
    image: '/images/vendor.png'
  }
]

export default function VendorAllocation({ eventData, requirementsData, packageData, onComplete }: VendorAllocationProps) {
  const [allocationStep, setAllocationStep] = useState(1)
  const [allocatedVendors, setAllocatedVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate vendor allocation process
    const timer = setTimeout(() => {
      setAllocatedVendors(MOCK_VENDORS)
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading && allocatedVendors.length > 0) {
      const timer = setTimeout(() => {
        onComplete({
          allocatedVendors,
          allocationComplete: true
        })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [loading, allocatedVendors, onComplete])

  const allocationSteps = [
    { id: 1, title: 'Matching Available Vendors', description: 'Finding vendors for your selected date' },
    { id: 2, title: 'Checking Service Area Coverage', description: 'Verifying location coverage' },
    { id: 3, title: 'Calculating Package Discounts', description: 'Applying best pricing' },
    { id: 4, title: 'Assigning Primary + Backup Vendors', description: 'Ensuring reliability' },
    { id: 5, title: 'Generating Detailed Quote', description: 'Creating your final quote' }
  ]

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
            Vendor Allocation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            We're automatically matching the best vendors for your {eventData.eventType} event
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
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-white/50">Step 5 of 6 - Vendor Allocation</p>
        </motion.div>

        {loading ? (
          /* Loading State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-12 mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-white mb-4">Allocating Vendors...</h3>
              <p className="text-white/70 mb-8">Please wait while we find the perfect vendors for your event</p>
              
              {/* Allocation Steps */}
              <div className="space-y-4">
                {allocationSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                      allocationStep >= step.id 
                        ? 'bg-green-500/20 border border-green-500/30' 
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      allocationStep >= step.id 
                        ? 'bg-green-500' 
                        : 'bg-white/20'
                    }`}>
                      {allocationStep > step.id ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <span className="text-white font-semibold">{step.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{step.title}</h4>
                      <p className="text-white/60 text-sm">{step.description}</p>
                    </div>
                    {allocationStep === step.id && (
                      <Clock className="h-5 w-5 text-blue-400 animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Results State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 mb-8">
              <div className="text-center mb-8">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Vendors Successfully Allocated!</h3>
                <p className="text-white/70">We've found the perfect vendors for your event</p>
              </div>

              {/* Allocated Vendors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allocatedVendors.map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white/5 rounded-2xl border border-white/10 p-6"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {vendor.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{vendor.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white/70 text-sm">{vendor.rating}</span>
                          <span className="text-white/50 text-sm">({vendor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span className="text-white/70 text-sm">{vendor.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span className="text-white/70 text-sm">Response: {vendor.responseTime}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-400" />
                        <span className="text-white/70 text-sm">{vendor.availability}</span>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <p className="text-white/60 text-sm mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {vendor.specialties.map((specialty: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="text-lg font-semibold text-white mb-4">Your Event Coordinator</h4>
                <div className="bg-white/5 rounded-2xl p-6">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Next Steps</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white/70 text-sm">Quote sent to your email</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span className="text-white/70 text-sm">Call scheduled for tomorrow 11 AM</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <MessageCircle className="h-5 w-5 text-purple-400" />
                    <span className="text-white/70 text-sm">WhatsApp group created for coordination</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
