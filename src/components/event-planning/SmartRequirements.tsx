'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles, Building2, Palette, Utensils, Music, Lightbulb, Chair, Tent } from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import AnimatedBackground from '@/components/3d/AnimatedBackground'
import { FloatingObject, Balloon, Confetti, SpotlightBeam, AbstractShape } from '@/components/animations/FloatingObjects'

interface SmartRequirementsProps {
  eventData: any
  onComplete: (data: any) => void
}

const SERVICES = [
  { id: 'venue', name: 'Venue', icon: Building2, description: 'Event space and facilities' },
  { id: 'mandap', name: 'Mandap/Stage', icon: Building2, description: 'Ceremonial setup' },
  { id: 'decoration', name: 'Decoration', icon: Palette, description: 'Theme and styling' },
  { id: 'catering', name: 'Catering', icon: Utensils, description: 'Food and beverages' },
  { id: 'sound', name: 'Sound System', icon: Music, description: 'Audio equipment' },
  { id: 'lighting', name: 'Lighting', icon: Lightbulb, description: 'Ambient lighting' },
  { id: 'furniture', name: 'Chairs/Tables', icon: Chair, description: 'Seating arrangements' },
  { id: 'tents', name: 'Tents/Shamianas', icon: Tent, description: 'Outdoor coverage' }
]

const PACKAGE_LEVELS = [
  { id: 'basic', name: 'Basic', color: 'from-green-500 to-emerald-500' },
  { id: 'standard', name: 'Standard', color: 'from-blue-500 to-cyan-500' },
  { id: 'premium', name: 'Premium', color: 'from-purple-500 to-pink-500' }
]

export default function SmartRequirements({ eventData, onComplete }: SmartRequirementsProps) {
  const [selectedServices, setSelectedServices] = useState<{[key: string]: string}>({
    venue: 'standard',
    mandap: 'standard',
    decoration: 'standard',
    catering: 'standard',
    sound: 'standard',
    lighting: 'standard',
    furniture: 'basic',
    tents: 'basic'
  })

  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices[serviceId]) {
      const newServices = { ...selectedServices }
      delete newServices[serviceId]
      setSelectedServices(newServices)
    } else {
      setSelectedServices(prev => ({ ...prev, [serviceId]: 'standard' }))
    }
  }

  const handlePackageChange = (serviceId: string, packageLevel: string) => {
    setSelectedServices(prev => ({ ...prev, [serviceId]: packageLevel }))
  }

  const handleSubmit = () => {
    onComplete({
      selectedServices,
      totalServices: Object.keys(selectedServices).length
    })
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
            What Do You Need?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Select the services you need for your {eventData.eventType} event. We'll customize packages based on your choices.
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
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-white/50">Step 2 of 6 - Smart Requirements</p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                selectedServices[service.id]
                  ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg'
                  : 'border-white/20 hover:border-blue-400 bg-white/5 backdrop-blur-xl'
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              {/* Checkbox */}
              <div className="absolute top-4 right-4">
                {selectedServices[service.id] ? (
                  <CheckCircle className="h-6 w-6 text-blue-400 fill-current" />
                ) : (
                  <div className="h-6 w-6 border-2 border-white/30 rounded-full"></div>
                )}
              </div>

              {/* Service Icon */}
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 ${
                  selectedServices[service.id] 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-white/10'
                }`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white text-lg">{service.name}</h3>
                <p className="text-white/60 text-sm">{service.description}</p>
              </div>

              {/* Package Selection */}
              {selectedServices[service.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                >
                  <p className="text-sm text-white/70 mb-3 text-center">Package Level:</p>
                  <div className="flex space-x-2">
                    {PACKAGE_LEVELS.map((level) => (
                      <button
                        key={level.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePackageChange(service.id, level.id)
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedServices[service.id] === level.id
                            ? `bg-gradient-to-r ${level.color} text-white`
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Selected Services Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(selectedServices).map(([serviceId, packageLevel]) => {
              const service = SERVICES.find(s => s.id === serviceId)
              const level = PACKAGE_LEVELS.find(l => l.id === packageLevel)
              return (
                <div key={serviceId} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                  <service!.icon className="h-5 w-5 text-white" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{service!.name}</p>
                    <p className="text-white/60 text-sm capitalize">{level!.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/70">
              Total Services: <span className="text-blue-400 font-semibold">{Object.keys(selectedServices).length}</span>
            </p>
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
            disabled={Object.keys(selectedServices).length === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>Show Package Options</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
