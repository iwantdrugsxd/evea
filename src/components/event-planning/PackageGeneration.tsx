'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, X, ArrowRight, Sparkles, Star, Users, Calendar, MapPin } from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import AnimatedBackground from '@/components/3d/AnimatedBackground'
import { FloatingObject, Balloon, Confetti, SpotlightBeam, AbstractShape } from '@/components/animations/FloatingObjects'

interface PackageGenerationProps {
  eventData: any
  requirementsData: any
  onComplete: (data: any) => void
}

const PACKAGES = [
  {
    id: 'essential',
    name: 'ESSENTIAL PACKAGE',
    price: 35000,
    color: 'from-green-500 to-emerald-500',
    features: [
      { text: 'Basic Mandap', included: true },
      { text: 'Simple Decoration', included: true },
      { text: 'Standard Sound', included: true },
      { text: 'Basic Lighting', included: true },
      { text: 'Snacks for 100', included: true },
      { text: 'No venue', included: false }
    ],
    description: 'Perfect for intimate gatherings'
  },
  {
    id: 'popular',
    name: 'POPULAR CHOICE',
    price: 52000,
    color: 'from-blue-500 to-purple-500',
    popular: true,
    features: [
      { text: 'Decorated Mandap', included: true },
      { text: 'Theme Decoration', included: true },
      { text: 'Professional Sound', included: true },
      { text: 'Effect Lighting', included: true },
      { text: 'Dinner for 100', included: true },
      { text: '4-hour venue', included: true }
    ],
    description: 'Most chosen by our customers'
  },
  {
    id: 'premium',
    name: 'PREMIUM EXPERIENCE',
    price: 78000,
    color: 'from-purple-500 to-pink-500',
    features: [
      { text: 'Grand Mandap', included: true },
      { text: 'Premium Decoration', included: true },
      { text: 'Concert Sound', included: true },
      { text: 'Architectural Lighting', included: true },
      { text: 'Full Catering', included: true },
      { text: 'Full-day venue', included: true }
    ],
    description: 'Luxury experience for special occasions'
  }
]

export default function PackageGeneration({ eventData, requirementsData, onComplete }: PackageGenerationProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showCustomize, setShowCustomize] = useState(false)

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const handleCustomize = () => {
    setShowCustomize(true)
  }

  const handleContinue = () => {
    if (selectedPackage) {
      onComplete({
        selectedPackage,
        packageData: PACKAGES.find(p => p.id === selectedPackage)
      })
    }
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 pt-20">
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
            Your Event Package Options
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            We've created three perfect packages for your {eventData.eventType} event with {eventData.guestCount} guests
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
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-white/50">Step 3 of 6 - Package Generation</p>
        </motion.div>

        {/* Event Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-6 mb-12"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Event Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-white/60 text-sm">Guests</p>
                <p className="text-white font-medium">{eventData.guestCount}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-white/60 text-sm">Services</p>
                <p className="text-white font-medium">{requirementsData.totalServices}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-white/5 backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                selectedPackage === pkg.id
                  ? 'border-blue-500 bg-gradient-to-r from-blue-500/10 to-purple-500/10 shadow-lg'
                  : 'border-white/20 hover:border-blue-400'
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Header */}
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                  ₹{pkg.price.toLocaleString('en-IN')}
                </div>
                <p className="text-white/60 text-sm mb-4">estimated</p>
                <p className="text-white/70 text-sm">{pkg.description}</p>
              </div>

              {/* Features List */}
              <div className="px-8 pb-8">
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-white' : 'text-white/50'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection Indicator */}
              {selectedPackage === pkg.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleContinue}
            disabled={!selectedPackage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>Select Package</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>

          <motion.button
            onClick={handleCustomize}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
          >
            <span>Customize</span>
          </motion.button>
        </motion.div>

        {/* Customization Modal */}
        {showCustomize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowCustomize(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Let's Perfect Your Requirements</h3>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Decoration Needs Detailing?</h4>
                  <p className="text-white/70 mb-4">Our designer will call within 2 hours</p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                    Schedule Call
                  </button>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Specific Catering Menu?</h4>
                  <p className="text-white/70 mb-4">Our chef consultant will discuss options</p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
                    Schedule Call
                  </button>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Want to See Samples?</h4>
                  <p className="text-white/70 mb-4">Receive photos/videos instantly</p>
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors">
                    WhatsApp Connect
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowCustomize(false)}
                  className="bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Continue with Current Selection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
