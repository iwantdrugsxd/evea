'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore } from '@/stores/event-planning-store'
import { EVENT_TYPES, BUDGET_RANGES } from '@/types/event-planning'
import { Calendar, MapPin, Users, DollarSign, ArrowRight } from 'lucide-react'

interface EventProfilingProps {
  onComplete: () => void
}

export default function EventProfiling({ onComplete }: EventProfilingProps) {
  const { eventData, setEventDetails } = useEventPlanningStore()
  const [formData, setFormData] = useState({
    eventType: eventData.eventType?.id || '',
    guestCount: eventData.eventDetails.guestCount || 50,
    date: eventData.eventDetails.date || '',
    time: eventData.eventDetails.time || '',
    location: eventData.eventDetails.location || '',
    budget: eventData.eventDetails.budget || 50000
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedEventType = EVENT_TYPES.find(et => et.id === formData.eventType)
    if (!selectedEventType) return

    setEventDetails({
      date: formData.date,
      time: formData.time,
      location: formData.location,
      address: formData.location,
      duration: 4,
      guestCount: formData.guestCount,
      budget: formData.budget,
      specialRequirements: ''
    })

    onComplete()
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
          Let's Plan Your Perfect Event
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Tell us about your event and we'll create the perfect package for you
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-center text-sm text-gray-400">Step 1 of 4</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Type */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <label className="block text-lg font-semibold text-white mb-4">
            Festival/Event Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EVENT_TYPES.map((eventType) => (
              <button
                key={eventType.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, eventType: eventType.id }))}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                  formData.eventType === eventType.id
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{eventType.icon}</div>
                <div className="font-semibold text-gray-900">{eventType.name}</div>
                <div className="text-sm text-gray-700 mt-1">{eventType.description}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Guest Count */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <label className="block text-lg font-semibold text-white mb-4">
            Number of Guests: {formData.guestCount}
          </label>
          <div className="relative">
            <input
              type="range"
              min="5"
              max="300"
              value={formData.guestCount}
              onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>5</span>
              <span>300</span>
            </div>
          </div>
        </motion.div>

        {/* Date & Time */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-white">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-white">
              Time
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <label className="block text-lg font-semibold text-gray-800">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter your event location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </motion.div>

        {/* Budget Range */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Budget Range
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {BUDGET_RANGES.map((budget) => (
              <button
                key={budget.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, budget: budget.max || 50000 }))}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                  formData.budget === (budget.max || 50000)
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="font-semibold text-gray-800">{budget.label}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-8"
        >
          <button
            type="submit"
            disabled={!formData.eventType || !formData.date || !formData.time || !formData.location}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </form>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  )
}
