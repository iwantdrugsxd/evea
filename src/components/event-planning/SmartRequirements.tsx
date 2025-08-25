'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles, Building2, Palette, Utensils, Music, Lightbulb, Car, Tent, Camera, Users, Star } from 'lucide-react'

interface SmartRequirementsProps {
  eventData: any
  onComplete: (data: any) => void
}

// Event-based service recommendations
const EVENT_SERVICES = {
  'navratri-ganpati': [
    { id: 'mandap', name: 'Mandap/Stage Setup', icon: Building2, description: 'Traditional ceremonial setup', essential: true },
    { id: 'sound', name: 'Sound System', icon: Music, description: 'Professional audio equipment', essential: true },
    { id: 'lighting', name: 'Lighting (Ambient/Effect)', icon: Lightbulb, description: 'Festive lighting effects', essential: true },
    { id: 'decoration', name: 'Decoration (Traditional/Theme)', icon: Palette, description: 'Traditional theme decoration', essential: true },
    { id: 'catering', name: 'Catering (Prasad & Snacks)', icon: Utensils, description: 'Traditional food service', essential: true },
    { id: 'photography', name: 'Photography (Digital Gallery)', icon: Camera, description: 'Event coverage & gallery', essential: false },
    { id: 'entertainment', name: 'Entertainment (Dhol Players)', icon: Users, description: 'Traditional performers', essential: false },
    { id: 'coordination', name: 'Event Coordination & Cleanup', icon: Star, description: 'Full event management', essential: true }
  ],
  'diwali': [
    { id: 'venue-decor', name: 'Venue Decor (Rangoli & Lights)', icon: Palette, description: 'Festive decoration setup', essential: true },
    { id: 'fireworks', name: 'Fireworks & Sparklers', icon: Sparkles, description: 'Safe fireworks coordination', essential: false },
    { id: 'sound', name: 'Sound & Music System', icon: Music, description: 'Festive music setup', essential: true },
    { id: 'lighting', name: 'Lighting (Festoon & LED)', icon: Lightbulb, description: 'Festive lighting display', essential: true },
    { id: 'catering', name: 'Catering (Sweets & Savories)', icon: Utensils, description: 'Traditional sweets service', essential: true },
    { id: 'photography', name: 'Photography', icon: Camera, description: 'Event documentation', essential: false },
    { id: 'pandal', name: 'Pandal/Stage Setup', icon: Building2, description: 'Outdoor structure setup', essential: true },
    { id: 'management', name: 'On-site Management & Cleanup', icon: Star, description: 'Complete event management', essential: true }
  ],
  'poojas': [
    { id: 'mandap', name: 'Puja Mandap/Altar Setup', icon: Building2, description: 'Sacred ceremonial setup', essential: true },
    { id: 'decoration', name: 'Traditional Decoration', icon: Palette, description: 'Sacred flower decoration', essential: true },
    { id: 'sound', name: 'Sound System (Puja Hymns)', icon: Music, description: 'Sacred music setup', essential: true },
    { id: 'lighting', name: 'Lighting (Soft / Festive)', icon: Lightbulb, description: 'Sacred lighting', essential: true },
    { id: 'prasad', name: 'Prasad Preparation & Serving', icon: Utensils, description: 'Sacred food service', essential: true },
    { id: 'photography', name: 'Photography (Ceremony)', icon: Camera, description: 'Ceremony documentation', essential: false },
    { id: 'priest', name: 'Priest Coordination', icon: Users, description: 'Religious ceremony support', essential: true },
    { id: 'cleanup', name: 'Cleanup & Ritual Disposal', icon: Star, description: 'Sacred cleanup service', essential: true }
  ],
  'birthday': [
    { id: 'decoration', name: 'Theme Decoration', icon: Palette, description: 'Party theme setup', essential: true },
    { id: 'sound', name: 'Sound & Music (DJ)', icon: Music, description: 'Party music system', essential: true },
    { id: 'lighting', name: 'Lighting (Party Effects)', icon: Lightbulb, description: 'Party lighting effects', essential: true },
    { id: 'catering', name: 'Catering (Snacks & Cake)', icon: Utensils, description: 'Party food service', essential: true },
    { id: 'photography', name: 'Photography (Candid)', icon: Camera, description: 'Party photo coverage', essential: false },
    { id: 'entertainment', name: 'Entertainment (Magician)', icon: Users, description: 'Party entertainment', essential: false },
    { id: 'photobooth', name: 'Photo Booth / Activities', icon: Star, description: 'Interactive activities', essential: false },
    { id: 'management', name: 'Party Management & Cleanup', icon: Star, description: 'Complete party management', essential: true }
  ],
  'cultural': [
    { id: 'stage', name: 'Stage & Backdrop Design', icon: Building2, description: 'Professional stage setup', essential: true },
    { id: 'sound', name: 'Professional Sound System', icon: Music, description: 'High-quality audio', essential: true },
    { id: 'lighting', name: 'Intelligent/Effect Lighting', icon: Lightbulb, description: 'Professional lighting', essential: true },
    { id: 'decoration', name: 'Themed Decoration', icon: Palette, description: 'Cultural theme setup', essential: true },
    { id: 'catering', name: 'Catering (Tea & Snacks)', icon: Utensils, description: 'Cultural food service', essential: true },
    { id: 'photography', name: 'Photography/Videography', icon: Camera, description: 'Professional coverage', essential: false },
    { id: 'performers', name: 'Performers Coordination', icon: Users, description: 'Artist management', essential: true },
    { id: 'production', name: 'Event Production & Cleanup', icon: Star, description: 'Complete production', essential: true }
  ]
}

export default function SmartRequirements({ eventData, onComplete }: SmartRequirementsProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [recommendedServices, setRecommendedServices] = useState<any[]>([])

  useEffect(() => {
    if (eventData?.eventTypeKey) {
      const services = EVENT_SERVICES[eventData.eventTypeKey as keyof typeof EVENT_SERVICES] || []
      
      // Auto-select essential services
      const essentialServiceIds = services
        .filter(service => service.essential)
        .map(service => service.id)
      
      setSelectedServices(essentialServiceIds)
      setRecommendedServices(services)
    }
  }, [eventData])

  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(prev => prev.filter(id => id !== serviceId))
    } else {
      setSelectedServices(prev => [...prev, serviceId])
    }
  }

  const handleSubmit = () => {
    const selectedServicesList = selectedServices.map(serviceId => {
      const service = recommendedServices.find(s => s.id === serviceId)
      return {
        id: serviceId,
        name: service?.name || '',
        description: service?.description || '',
        essential: service?.essential || false
      }
    })

    onComplete({
      selectedServices: selectedServicesList,
      totalServices: selectedServices.length,
      eventType: eventData?.eventType,
      eventData: eventData
    })
  }

  if (!eventData?.eventTypeKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please select an event type first</h2>
          <p className="text-gray-400">Go back to the previous step to choose your event type.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
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
            Select Your Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Choose the services you need for your {eventData.eventType} event. 
            We'll create perfect packages based on your selection.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {recommendedServices.map((service, index) => {
            const ServiceIcon = service.icon
            const isSelected = selectedServices.includes(service.id)
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg'
                    : 'border-white/20 hover:border-blue-400 bg-white/5 backdrop-blur-xl'
                } ${service.essential ? 'ring-2 ring-green-500/50' : ''}`}
                onClick={() => handleServiceToggle(service.id)}
              >
                {/* Essential Badge */}
                {service.essential && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Essential
                    </span>
                  </div>
                )}

                {/* Checkbox */}
                <div className="absolute top-4 right-4">
                  {isSelected ? (
                    <CheckCircle className="h-6 w-6 text-blue-400 fill-current" />
                  ) : (
                    <div className="h-6 w-6 border-2 border-white/30 rounded-full"></div>
                  )}
                </div>

                {/* Service Icon */}
                <div className="text-center mb-4 mt-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-white/10'
                  }`}>
                    <ServiceIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-lg">{service.name}</h3>
                  <p className="text-white/60 text-sm">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Selected Services Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedServices.map((serviceId) => {
              const service = recommendedServices.find(s => s.id === serviceId)
              if (!service) return null
              
              const ServiceIcon = service.icon
              
              return (
                <div key={serviceId} className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl">
                  <ServiceIcon className="h-5 w-5 text-white" />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{service.name}</p>
                    <p className="text-white/60 text-xs">{service.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-white/70">
                Total Services: <span className="text-blue-400 font-semibold">{selectedServices.length}</span>
              </p>
              <p className="text-white/70">
                Essential Services: <span className="text-green-400 font-semibold">
                  {selectedServices.filter(id => 
                    recommendedServices.find(s => s.id === id)?.essential
                  ).length}
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={handleSubmit}
            disabled={selectedServices.length === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>Generate Packages</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
