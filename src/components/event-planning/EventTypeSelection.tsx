'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore } from '@/stores/event-planning-store'
import { EVENT_TYPES, EventType } from '@/types/event-planning'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react'

interface EventTypeSelectionProps {
  onComplete: (stepId: string) => void
}

const EventTypeSelection = ({ onComplete }: EventTypeSelectionProps) => {
  const { eventData, setEventType } = useEventPlanningStore()
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(
    eventData.eventType || null
  )
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const handleEventTypeSelect = (eventType: EventType) => {
    setSelectedEventType(eventType)
    setEventType(eventType)
  }

  const handleContinue = () => {
    if (selectedEventType) {
      onComplete('event-type')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 backdrop-blur-lg px-6 py-3 rounded-full border border-blue-500/30 shadow-lg mb-6">
          <Sparkles className="h-5 w-5 text-blue-400" />
          <span className="text-blue-300 font-semibold">Step 1 of 6</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4">
          What type of event are you planning?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose your event type to get personalized recommendations and pricing estimates
        </p>
      </motion.div>

      {/* Event Type Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
      >
        {EVENT_TYPES.map((eventType) => {
          const isSelected = selectedEventType?.id === eventType.id
          const isHovered = hoveredEvent === eventType.id

          return (
            <motion.div
              key={eventType.id}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredEvent(eventType.id)}
              onHoverEnd={() => setHoveredEvent(null)}
              onClick={() => handleEventTypeSelect(eventType)}
              className={`
                relative cursor-pointer group
                ${isSelected 
                  ? 'ring-2 ring-blue-500 ring-offset-2' 
                  : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2'
                }
              `}
            >
              <div className={`
                bg-white rounded-2xl p-6 border-2 transition-all duration-300 h-full
                ${isSelected 
                  ? 'border-blue-500 shadow-lg shadow-blue-200' 
                  : 'border-gray-200 hover:border-blue-300 shadow-elegant hover:shadow-elegant-hover'
                }
              `}>
                {/* Event Icon */}
                <div className="text-center mb-4">
                  <div className={`
                    w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-3
                    ${isSelected 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-600'
                    }
                    transition-all duration-300
                  `}>
                    {eventType.icon}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {eventType.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {eventType.description}
                  </p>
                </div>

                {/* Event Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>Budget</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      ₹{eventType.estimatedBudget.min.toLocaleString()} - ₹{eventType.estimatedBudget.max.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Guests</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {eventType.guestCount.min} - {eventType.guestCount.max}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Duration</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {eventType.typicalDuration} hours
                    </span>
                  </div>
                </div>

                {/* Popular Services */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Popular Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {eventType.popularServices.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                    {eventType.popularServices.length > 3 && (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{eventType.popularServices.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Selected Event Summary */}
      {selectedEventType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-8 border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-2xl text-white">
                {selectedEventType.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedEventType.name} Selected
                </h3>
                <p className="text-gray-600">
                  Estimated budget: ₹{selectedEventType.estimatedBudget.min.toLocaleString()} - ₹{selectedEventType.estimatedBudget.max.toLocaleString()}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleContinue}
              className="btn-primary btn-lg group"
            >
              <span className="flex items-center space-x-2">
                <span>Continue</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center text-gray-500"
      >
        <p className="text-sm">
          Don't see your event type? <button className="text-blue-600 hover:text-blue-700 font-medium underline">Contact us</button> for custom planning
        </p>
      </motion.div>
    </div>
  )
}

export default EventTypeSelection
