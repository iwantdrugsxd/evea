'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore } from '@/stores/event-planning-store'
import { CheckCircle, X, Star, ArrowRight, ArrowLeft, Info } from 'lucide-react'

interface PackagePreviewProps {
  onComplete: () => void
}

export default function PackagePreview({ onComplete }: PackagePreviewProps) {
  const { eventData } = useEventPlanningStore()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages = [
    {
      id: 'essential',
      name: 'Essential Package',
      price: 35000,
      features: [
        { text: 'Basic Mandap', included: true },
        { text: 'Simple Decoration', included: true },
        { text: 'Standard Sound', included: true },
        { text: 'Basic Lighting', included: true },
        { text: `Snacks for ${eventData.eventDetails.guestCount} guests`, included: true },
        { text: 'Venue Not Included', included: false }
      ],
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      id: 'popular',
      name: 'Popular Choice',
      price: 52000,
      features: [
        { text: 'Decorated Mandap', included: true },
        { text: 'Theme Decoration', included: true },
        { text: 'Professional Audio', included: true },
        { text: 'Effect Lighting', included: true },
        { text: `Dinner for ${eventData.eventDetails.guestCount} guests`, included: true },
        { text: '4-Hour Venue', included: true }
      ],
      color: 'from-blue-500 to-purple-500',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Experience',
      price: 78000,
      features: [
        { text: 'Grand Designer Mandap', included: true },
        { text: 'Premium Styling', included: true },
        { text: 'Concert-Grade Setup', included: true },
        { text: 'Architectural LEDs', included: true },
        { text: 'Full Catering Menu', included: true },
        { text: 'Full-Day Venue', included: true }
      ],
      color: 'from-purple-500 to-pink-500',
      popular: false
    }
  ]

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const handleCustomize = () => {
    // This would open a modal in the next step
    onComplete()
  }

  const handleCompare = () => {
    // Show detailed comparison
    console.log('Compare packages')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
        >
          Your Event Package Options
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Choose the perfect package for your {eventData.eventType?.name} celebration
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-center text-sm text-gray-500">Step 3 of 4</p>
      </div>

      {/* Package Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-2xl border-2 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
              selectedPackage === pkg.id 
                ? 'border-blue-500 shadow-xl' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>
            )}

            {/* Package Header */}
            <div className={`bg-gradient-to-r ${pkg.color} text-white p-6 text-center`}>
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold mb-1">₹{pkg.price.toLocaleString()}</div>
              <p className="text-sm opacity-90">Starting from</p>
            </div>

            {/* Features */}
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    {feature.included ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500 line-through'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPackage === pkg.id ? 'Selected' : 'Select'}
                </button>
                
                <button
                  onClick={handleCustomize}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 transition-colors"
                >
                  Customize
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <button
          onClick={handleCompare}
          className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
        >
          <Info className="h-4 w-4" />
          <span>Compare Packages</span>
        </button>
        
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        
        <button
          onClick={onComplete}
          disabled={!selectedPackage}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Estimated price disclaimer: "Actual price within ±10%"
        </p>
      </div>
    </motion.div>
  )
}
