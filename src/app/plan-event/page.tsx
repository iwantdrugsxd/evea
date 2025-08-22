'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/3d/AnimatedBackground'
import QuickProfiling from '@/components/event-planning/QuickProfiling'
import SmartRequirements from '@/components/event-planning/SmartRequirements'
import PackageGeneration from '@/components/event-planning/PackageGeneration'
import VendorAllocation from '@/components/event-planning/VendorAllocation'
import ProfessionalQuote from '@/components/event-planning/ProfessionalQuote'
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

const STAGES = [
  { id: 'quick-profiling', name: 'Quick Profiling', description: 'Tell us about your event' },
  { id: 'smart-requirements', name: 'Smart Requirements', description: 'Choose your services' },
  { id: 'package-generation', name: 'Package Generation', description: 'Review your options' },
  { id: 'vendor-allocation', name: 'Vendor Allocation', description: 'Match with vendors' },
  { id: 'professional-quote', name: 'Professional Quote', description: 'Get your quote' }
]

const EventPlanningPage = () => {
  const [currentStage, setCurrentStage] = useState(0)
  const [eventData, setEventData] = useState<any>(null)
  const [requirementsData, setRequirementsData] = useState<any>(null)
  const [packageData, setPackageData] = useState<any>(null)
  const [allocationData, setAllocationData] = useState<any>(null)
  const [showLanding, setShowLanding] = useState(true)

  const handleStageComplete = (stageData: any) => {
    switch (currentStage) {
      case 0:
        setEventData(stageData)
        break
      case 1:
        setRequirementsData(stageData)
        break
      case 2:
        setPackageData(stageData)
        break
      case 3:
        setAllocationData(stageData)
        break
      case 4:
        // Final stage - quote generated
        console.log('Quote generated:', stageData)
        break
    }
    
    if (currentStage < STAGES.length - 1) {
      setCurrentStage(currentStage + 1)
    }
  }

  const handleStartPlanning = () => {
    setShowLanding(false)
    setCurrentStage(0)
  }

  const renderCurrentStage = () => {
    const stageComponents = {
      'quick-profiling': QuickProfiling,
      'smart-requirements': SmartRequirements,
      'package-generation': PackageGeneration,
      'vendor-allocation': VendorAllocation,
      'professional-quote': ProfessionalQuote
    }

    const CurrentComponent = stageComponents[STAGES[currentStage]?.id as keyof typeof stageComponents]
    
    if (!CurrentComponent) return null

    return (
      <motion.div
        key={STAGES[currentStage]?.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full"
      >
        <CurrentComponent 
          eventData={eventData}
          requirementsData={requirementsData}
          packageData={packageData}
          allocationData={allocationData}
          onComplete={handleStageComplete}
        />
      </motion.div>
    )
  }

  if (showLanding) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <AnimatedBackground />
        <FloatingNavbar />
        
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Plan Your Perfect Event
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                From concept to celebration, we'll help you create an unforgettable experience in just 6 simple steps
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              >
                {STAGES.map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 mx-auto">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{stage.name}</h3>
                    <p className="text-gray-400 text-sm">{stage.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                onClick={handleStartPlanning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-5 w-5" />
                <span>Start Planning Now</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {renderCurrentStage()}
      </AnimatePresence>
    </div>
  )
}

export default EventPlanningPage
