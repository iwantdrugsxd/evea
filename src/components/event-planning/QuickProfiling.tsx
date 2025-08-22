'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, DollarSign, ArrowRight, Sparkles } from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import AnimatedBackground from '@/components/3d/AnimatedBackground'
import { FloatingObject, Balloon, Confetti, SpotlightBeam, AbstractShape } from '@/components/animations/FloatingObjects'

interface QuickProfilingProps {
  onComplete: (data: any) => void
}

const EVENT_TYPES = [
  { id: 'navratri', name: 'Navratri', icon: '🕉️' },
  { id: 'diwali', name: 'Diwali', icon: '🪔' },
  { id: 'pooja', name: 'Pooja', icon: '🙏' },
  { id: 'other', name: 'Other', icon: '🎉' }
]

const BUDGET_RANGES = [
  { id: '10k-25k', label: '₹10k-25k', min: 10000, max: 25000 },
  { id: '25k-50k', label: '₹25k-50k', min: 25000, max: 50000 },
  { id: '50k-1L', label: '₹50k-1L', min: 50000, max: 100000 },
  { id: '1L+', label: '₹1L+', min: 100000, max: 1000000 },
  { id: 'not-sure', label: 'Not Sure', min: 0, max: 0 }
]

export default function QuickProfiling({ onComplete }: QuickProfilingProps) {
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: 50,
    eventDate: '',
    location: '',
    budgetRange: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.eventType && formData.eventDate && formData.location && formData.budgetRange) {
      onComplete(formData)
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 pt-20">
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
            Let's Plan Your Perfect Event
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Tell us about your event and we'll create the perfect package for you in just 30 seconds
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
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-white/50">Step 1 of 6 - Quick Profiling</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <label className="block text-lg font-semibold text-white mb-4">
              Festival/Event Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {EVENT_TYPES.map((eventType) => (
                <motion.button
                  key={eventType.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, eventType: eventType.id }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                    formData.eventType === eventType.id
                      ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg'
                      : 'border-white/20 hover:border-blue-400 bg-white/5 backdrop-blur-xl'
                  }`}
                >
                  <div className="text-3xl mb-2">{eventType.icon}</div>
                  <div className="font-semibold text-white">{eventType.name}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Guest Count */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <label className="block text-lg font-semibold text-white mb-4">
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
          </motion.div>

          {/* Event Date */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <label className="block text-lg font-semibold text-white">
              Event Date
            </label>
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
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <label className="block text-lg font-semibold text-white">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter your event location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-white/50"
                required
              />
            </div>
          </motion.div>

          {/* Budget Range */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <label className="block text-lg font-semibold text-white mb-4">
              Budget Range
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {BUDGET_RANGES.map((budget) => (
                <motion.button
                  key={budget.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budgetRange: budget.id }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                    formData.budgetRange === budget.id
                      ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg'
                      : 'border-white/20 hover:border-blue-400 bg-white/5 backdrop-blur-xl'
                  }`}
                >
                  <div className="font-semibold text-white">{budget.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center pt-8"
          >
            <motion.button
              type="submit"
              disabled={!formData.eventType || !formData.eventDate || !formData.location || !formData.budgetRange}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Continue</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
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
      </div>
    </div>
  )
}
