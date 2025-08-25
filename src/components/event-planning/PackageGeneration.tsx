'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles, X, Star, Calendar, MapPin, Users } from 'lucide-react'

interface PackageGenerationProps {
  eventData: any
  requirementsData: any
  onComplete: (data: any) => void
}

const PACKAGE_TYPES = [
  {
    id: 'essential',
    name: 'ESSENTIAL PACKAGE',
    color: 'text-green-400',
    description: 'Perfect for intimate gatherings',
    multiplier: 1.0,
    features: {
      mandap: 'Basic Mandap',
      decoration: 'Simple Decoration',
      sound: 'Standard Sound',
      lighting: 'Basic Lighting',
      catering: 'Snacks for 100',
      venue: null
    }
  },
  {
    id: 'popular',
    name: 'POPULAR CHOICE',
    color: 'text-white',
    description: 'Most chosen by our customers',
    multiplier: 1.5,
    isPopular: true,
    features: {
      mandap: 'Decorated Mandap',
      decoration: 'Theme Decoration',
      sound: 'Professional Sound',
      lighting: 'Effect Lighting',
      catering: 'Dinner for 100',
      venue: '4-hour venue'
    }
  },
  {
    id: 'premium',
    name: 'PREMIUM EXPERIENCE',
    color: 'text-purple-400',
    description: 'Luxury experience for special occasions',
    multiplier: 2.2,
    features: {
      mandap: 'Grand Mandap',
      decoration: 'Premium Decoration',
      sound: 'Concert Sound',
      lighting: 'Architectural Lighting',
      catering: 'Full Catering',
      venue: 'Full-day venue'
    }
  }
]

export default function PackageGeneration({ eventData, requirementsData, onComplete }: PackageGenerationProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const handleContinue = () => {
    if (selectedPackage) {
      const packageData = PACKAGE_TYPES.find(p => p.id === selectedPackage)
      onComplete({
        selectedPackage: packageData,
        eventData,
        requirementsData
      })
    }
  }

  const handleCustomize = () => {
    // Go back to service selection
    onComplete({
      action: 'customize',
      eventData,
      requirementsData
    })
  }

  // Calculate base price based on number of services and guest count
  const basePrice = requirementsData?.totalServices * 5000 + (eventData?.guestCount || 50) * 200
  const popularPackage = PACKAGE_TYPES.find(p => p.id === 'popular')

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Choose Your Package
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We've created perfect packages based on your {eventData?.eventType} event requirements
          </motion.p>
        </motion.div>

        {/* Event Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                <span className="text-white">{eventData?.eventDate || '2025-10-26'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-white">{eventData?.location || 'mumbai'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-white">{eventData?.guestCount || '50'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-blue-400" />
                <span className="text-white">{requirementsData?.totalServices || '8'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Package Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {PACKAGE_TYPES.map((pkg, index) => {
            const price = Math.round(basePrice * pkg.multiplier)
            const isSelected = selectedPackage === pkg.id
            
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg'
                    : pkg.isPopular
                    ? 'border-blue-400 bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                    : 'border-white/20 hover:border-blue-400 bg-white/5 backdrop-blur-xl'
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${pkg.color}`}>{pkg.name}</h3>
                  <div className={`text-2xl font-bold mb-1 ${pkg.color}`}>₹{price.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm mb-2">estimated</div>
                  <p className="text-gray-300 text-sm">{pkg.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {Object.entries(pkg.features).map(([key, feature]) => {
                    if (!feature) return null
                    return (
                      <div key={key} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-white text-sm">{feature}</span>
                      </div>
                    )
                  })}
                  
                  {/* Excluded features for essential package */}
                  {pkg.id === 'essential' && (
                    <div className="flex items-center space-x-3">
                      <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">No venue</span>
                    </div>
                  )}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-6 w-6 text-blue-400 fill-current" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleCustomize}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Customize</span>
          </motion.button>

          <motion.button
            onClick={handleContinue}
            disabled={!selectedPackage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>Select Package →</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
