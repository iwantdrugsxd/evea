'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, ArrowRight, Sparkles, Building2, Palette, Utensils, Music, Lightbulb, Camera, Star } from 'lucide-react'

interface QuickProfilingProps {
  onComplete: (data: any) => void
}

// Knowledge base events with their key services
const EVENT_KNOWLEDGE_BASE = {
  'navratri-ganpati': {
    name: 'Navratri / Ganpati',
    icon: '🕉️',
    description: 'Traditional festival celebrations with cultural performances',
    keyServices: [
      { id: 'mandap', name: 'Mandap/Stage Setup', icon: Building2, description: 'Traditional ceremonial setup' },
      { id: 'sound', name: 'Sound System', icon: Music, description: 'Professional audio equipment' },
      { id: 'lighting', name: 'Lighting (Ambient/Effect)', icon: Lightbulb, description: 'Festive lighting effects' },
      { id: 'decoration', name: 'Decoration (Traditional/Theme)', icon: Palette, description: 'Traditional theme decoration' },
      { id: 'catering', name: 'Catering (Prasad & Snacks)', icon: Utensils, description: 'Traditional food service' },
      { id: 'photography', name: 'Photography (Digital Gallery)', icon: Camera, description: 'Event coverage & gallery' },
      { id: 'entertainment', name: 'Entertainment (Dhol Players)', icon: Star, description: 'Traditional performers' },
      { id: 'coordination', name: 'Event Coordination & Cleanup', icon: Star, description: 'Full event management' }
    ]
  },
  'diwali': {
    name: 'Diwali',
    icon: '🪔',
    description: 'Festival of lights with fireworks and celebrations',
    keyServices: [
      { id: 'venue-decor', name: 'Venue Decor (Rangoli & Lights)', icon: Palette, description: 'Festive decoration setup' },
      { id: 'fireworks', name: 'Fireworks & Sparklers', icon: Sparkles, description: 'Safe fireworks coordination' },
      { id: 'sound', name: 'Sound & Music System', icon: Music, description: 'Festive music setup' },
      { id: 'lighting', name: 'Lighting (Festoon & LED)', icon: Lightbulb, description: 'Festive lighting display' },
      { id: 'catering', name: 'Catering (Sweets & Savories)', icon: Utensils, description: 'Traditional sweets service' },
      { id: 'photography', name: 'Photography', icon: Camera, description: 'Event documentation' },
      { id: 'pandal', name: 'Pandal/Stage Setup', icon: Building2, description: 'Outdoor structure setup' },
      { id: 'management', name: 'On-site Management & Cleanup', icon: Star, description: 'Complete event management' }
    ]
  },
  'poojas': {
    name: 'Poojas (Religious Ceremonies)',
    icon: '🙏',
    description: 'Sacred religious ceremonies and rituals',
    keyServices: [
      { id: 'mandap', name: 'Puja Mandap/Altar Setup', icon: Building2, description: 'Sacred ceremonial setup' },
      { id: 'decoration', name: 'Traditional Decoration', icon: Palette, description: 'Sacred flower decoration' },
      { id: 'sound', name: 'Sound System (Puja Hymns)', icon: Music, description: 'Sacred music setup' },
      { id: 'lighting', name: 'Lighting (Soft / Festive)', icon: Lightbulb, description: 'Sacred lighting' },
      { id: 'prasad', name: 'Prasad Preparation & Serving', icon: Utensils, description: 'Sacred food service' },
      { id: 'photography', name: 'Photography (Ceremony)', icon: Camera, description: 'Ceremony documentation' },
      { id: 'priest', name: 'Priest Coordination', icon: Star, description: 'Religious ceremony support' },
      { id: 'cleanup', name: 'Cleanup & Ritual Disposal', icon: Star, description: 'Sacred cleanup service' }
    ]
  },
  'birthday': {
    name: 'Birthday Parties',
    icon: '🎂',
    description: 'Fun and exciting birthday celebrations',
    keyServices: [
      { id: 'decoration', name: 'Theme Decoration', icon: Palette, description: 'Party theme setup' },
      { id: 'sound', name: 'Sound & Music (DJ)', icon: Music, description: 'Party music system' },
      { id: 'lighting', name: 'Lighting (Party Effects)', icon: Lightbulb, description: 'Party lighting effects' },
      { id: 'catering', name: 'Catering (Snacks & Cake)', icon: Utensils, description: 'Party food service' },
      { id: 'photography', name: 'Photography (Candid)', icon: Camera, description: 'Party photo coverage' },
      { id: 'entertainment', name: 'Entertainment (Magician)', icon: Star, description: 'Party entertainment' },
      { id: 'photobooth', name: 'Photo Booth / Activities', icon: Star, description: 'Interactive activities' },
      { id: 'management', name: 'Party Management & Cleanup', icon: Star, description: 'Complete party management' }
    ]
  },
  'cultural': {
    name: 'Cultural Functions',
    icon: '🎭',
    description: 'Professional cultural performances and events',
    keyServices: [
      { id: 'stage', name: 'Stage & Backdrop Design', icon: Building2, description: 'Professional stage setup' },
      { id: 'sound', name: 'Professional Sound System', icon: Music, description: 'High-quality audio' },
      { id: 'lighting', name: 'Intelligent/Effect Lighting', icon: Lightbulb, description: 'Professional lighting' },
      { id: 'decoration', name: 'Themed Decoration', icon: Palette, description: 'Cultural theme setup' },
      { id: 'catering', name: 'Catering (Tea & Snacks)', icon: Utensils, description: 'Cultural food service' },
      { id: 'photography', name: 'Photography/Videography', icon: Camera, description: 'Professional coverage' },
      { id: 'performers', name: 'Performers Coordination', icon: Star, description: 'Artist management' },
      { id: 'production', name: 'Event Production & Cleanup', icon: Star, description: 'Complete production' }
    ]
  }
}

const BUDGET_RANGES = [
  { id: '10k-25k', label: '₹10k-25k', min: 10000, max: 25000 },
  { id: '25k-50k', label: '₹25k-50k', min: 25000, max: 50000 },
  { id: '50k-1L', label: '₹50k-1L', min: 50000, max: 100000 },
  { id: '1L+', label: '₹1L+', min: 100000, max: 1000000 },
  { id: 'not-sure', label: 'Not Sure', min: 0, max: 0 }
]

export default function QuickProfiling({ onComplete }: QuickProfilingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: 50,
    eventDate: '',
    location: '',
    budgetRange: ''
  })

  const handleEventTypeSelect = (eventType: string) => {
    setFormData(prev => ({ ...prev, eventType }))
    setCurrentStep(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.eventType && formData.eventDate && formData.location && formData.budgetRange) {
      const selectedEvent = EVENT_KNOWLEDGE_BASE[formData.eventType as keyof typeof EVENT_KNOWLEDGE_BASE]
      onComplete({
        ...formData,
        eventType: selectedEvent.name,
        eventTypeKey: formData.eventType,
        keyServices: selectedEvent.keyServices
      })
    }
  }

  const selectedEvent = formData.eventType ? EVENT_KNOWLEDGE_BASE[formData.eventType as keyof typeof EVENT_KNOWLEDGE_BASE] : null

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
            {currentStep === 1 ? 'Choose Your Event Type' : 'Event Details'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {currentStep === 1 
              ? 'Select your event type and we\'ll recommend the perfect services'
              : `Tell us about your ${selectedEvent?.name} event`
            }
          </motion.p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <div className={`w-4 h-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-white/20'} rounded-full`}></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-white/50">Step {currentStep} of 3 - Event Planning</p>
        </motion.div>

        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Object.entries(EVENT_KNOWLEDGE_BASE).map(([key, event]) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => handleEventTypeSelect(key)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-2xl border-2 border-white/20 hover:border-blue-400 bg-white/5 backdrop-blur-xl transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-4">{event.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                
                {/* Key Services Preview */}
                <div className="text-left">
                  <p className="text-blue-400 text-sm font-medium mb-2">Key Services:</p>
                  <div className="grid grid-cols-2 gap-1">
                    {event.keyServices.slice(0, 4).map((service, index) => (
                      <div key={index} className="flex items-center space-x-1 text-xs text-gray-400">
                        <service.icon className="h-3 w-3" />
                        <span className="truncate">{service.name.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {currentStep === 2 && selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guest Count */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-white">
                    Expected Guests: <span className="text-blue-400">{formData.guestCount}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="300"
                      value={formData.guestCount}
                      onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
                      className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-white/50 mt-2">
                      <span>5</span>
                      <span>300</span>
                    </div>
                  </div>
                </div>

                {/* Event Date */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-white">Event Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                      className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-white">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter event location"
                      className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-white/50"
                      required
                    />
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-white">Budget Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGET_RANGES.map((budget) => (
                      <button
                        key={budget.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, budgetRange: budget.id }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                          formData.budgetRange === budget.id
                            ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                            : 'border-white/20 hover:border-blue-400 bg-white/5'
                        }`}
                      >
                        <div className="font-semibold text-white">{budget.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Back to Event Types
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={!formData.eventDate || !formData.location || !formData.budgetRange}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Continue to Service Selection</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  )
}
