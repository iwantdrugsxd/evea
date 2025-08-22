'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore } from '@/stores/event-planning-store'
import { EVENT_CATEGORIES } from '@/data/enhanced-services'
import { SERVICE_PACKAGES } from '@/types/event-planning'
import { CheckCircle, Info, ArrowRight, ArrowLeft } from 'lucide-react'

interface ServiceRequirementsProps {
  onComplete: () => void
}

export default function ServiceRequirements({ onComplete }: ServiceRequirementsProps) {
  const { eventData, setSelectedServices: setStoreSelectedServices } = useEventPlanningStore()
  const [selectedServices, setSelectedServices] = useState<{[key: string]: string}>({
    'mandaps': 'standard',
    'decoration': 'standard',
    'catering': 'standard',
    'sound-system': 'standard',
    'lightings': 'standard'
  })
  const [addOns, setAddOns] = useState<string[]>([])

  const handleServiceToggle = (serviceId: string, packageType: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === packageType ? 'none' : packageType
    }))
  }

  const handleAddOnToggle = (addOn: string) => {
    setAddOns(prev => 
      prev.includes(addOn) 
        ? prev.filter(item => item !== addOn)
        : [...prev, addOn]
    )
  }

  const handleSubmit = () => {
    const services = Object.entries(selectedServices)
      .filter(([_, packageType]) => packageType !== 'none')
      .map(([serviceId, packageType]) => {
        const category = EVENT_CATEGORIES.find(cat => cat.id === serviceId)
        return {
          id: serviceId,
          name: category?.name || serviceId,
          slug: category?.slug || serviceId,
          description: category?.description || '',
          icon: category?.icon || '🎉',
          color: category?.color || 'from-gray-500 to-gray-600',
          packageType
        }
      })

    setStoreSelectedServices(services)
    onComplete()
  }

  const calculateTotal = () => {
    let total = 0
    Object.entries(selectedServices).forEach(([serviceId, packageType]) => {
      if (packageType !== 'none') {
        const basePrice = eventData.eventDetails.budget * 0.1 // 10% of budget per service
        switch (packageType) {
          case 'basic':
            total += basePrice * 0.7
            break
          case 'standard':
            total += basePrice
            break
          case 'premium':
            total += basePrice * 1.5
            break
        }
      }
    })
    return total
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
        >
          What Services Would You Like?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Choose from our curated service packages tailored to your event
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-center text-sm text-gray-500">Step 2 of 4</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Services */}
        <div className="lg:col-span-2 space-y-6">
          {EVENT_CATEGORIES.filter(cat => 
            ['mandaps', 'decoration', 'catering', 'sound-system', 'lightings'].includes(cat.id)
          ).map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700"
                  title="Learn more about this service"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {Object.entries(SERVICE_PACKAGES).map(([packageKey, packageInfo]) => (
                  <button
                    key={packageKey}
                    type="button"
                    onClick={() => handleServiceToggle(category.id, packageKey)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                      selectedServices[category.id] === packageKey
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                      selectedServices[category.id] === packageKey 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                    }`}></div>
                    <div className="font-semibold text-gray-800 mb-1">{packageInfo.name}</div>
                    <div className="text-xs text-gray-600">{packageInfo.description}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Bundled Add-Ons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bundled Add-Ons</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'photo-booth', name: 'Photo Booth', icon: '📸', price: '₹5,000' },
                { id: 'live-music', name: 'Live Music', icon: '🎵', price: '₹8,000' },
                { id: 'dance-floor', name: 'Dance Floor', icon: '💃', price: '₹3,000' },
                { id: 'chairs-tables', name: 'Chairs & Tables', icon: '🪑', price: '₹2,000' },
                { id: 'tents', name: 'Tents/Shamianas', icon: '⛺', price: '₹6,000' },
                { id: 'parking', name: 'Parking Arrangement', icon: '🚗', price: '₹1,500' }
              ].map((addOn) => (
                <button
                  key={addOn.id}
                  type="button"
                  onClick={() => handleAddOnToggle(addOn.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                    addOns.includes(addOn.id)
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">{addOn.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm">{addOn.name}</div>
                  <div className="text-xs text-gray-600">{addOn.price}</div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Summary Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Summary</h3>
            
            <div className="space-y-3 mb-6">
              {Object.entries(selectedServices).map(([serviceId, packageType]) => {
                if (packageType === 'none') return null
                const category = EVENT_CATEGORIES.find(cat => cat.id === serviceId)
                const packageInfo = SERVICE_PACKAGES[packageType as keyof typeof SERVICE_PACKAGES]
                return (
                  <div key={serviceId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{category?.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{packageInfo.name}</span>
                  </div>
                )
              })}
              
              {addOns.map(addOnId => {
                const addOn = [
                  { id: 'photo-booth', name: 'Photo Booth' },
                  { id: 'live-music', name: 'Live Music' },
                  { id: 'dance-floor', name: 'Dance Floor' },
                  { id: 'chairs-tables', name: 'Chairs & Tables' },
                  { id: 'tents', name: 'Tents/Shamianas' },
                  { id: 'parking', name: 'Parking Arrangement' }
                ].find(a => a.id === addOnId)
                return (
                  <div key={addOnId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{addOn?.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-800">Estimated Total</span>
                <span className="text-2xl font-bold text-blue-600">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500">Actual price within ±10%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Show Package Options</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
