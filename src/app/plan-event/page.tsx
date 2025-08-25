'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import QuickProfiling from '@/components/event-planning/QuickProfiling'
import SmartRequirements from '@/components/event-planning/SmartRequirements'
import PackageGeneration from '@/components/event-planning/PackageGeneration'
import PackageReview from '@/components/event-planning/PackageReview'

const STAGES = [
  'quick-profiling',
  'smart-requirements', 
  'package-generation',
  'package-review'
]

export default function PlanEventPage() {
  const [currentStage, setCurrentStage] = useState(0)
  const [eventData, setEventData] = useState<any>(null)
  const [requirementsData, setRequirementsData] = useState<any>(null)
  const [packageData, setPackageData] = useState<any>(null)

  const handleStageComplete = (stageData: any) => {
    if (currentStage === 0) {
      // QuickProfiling completed
      setEventData(stageData)
      setCurrentStage(1)
    } else if (currentStage === 1) {
      // SmartRequirements completed
      setRequirementsData(stageData)
      setCurrentStage(2)
    } else if (currentStage === 2) {
      // PackageGeneration completed
      if (stageData.action === 'customize') {
        // Go back to service selection
        setCurrentStage(1)
      } else {
        setPackageData(stageData)
        setCurrentStage(3)
      }
    } else if (currentStage === 3) {
      // PackageReview completed
      console.log('Event planning completed:', stageData)
      // Handle completion - redirect or show success
    }
  }

  const handleEditStage = (stageIndex: number) => {
    setCurrentStage(stageIndex)
  }

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 0:
        return <QuickProfiling onComplete={handleStageComplete} />
      case 1:
        return <SmartRequirements eventData={eventData} onComplete={handleStageComplete} />
      case 2:
        return <PackageGeneration eventData={eventData} requirementsData={requirementsData} onComplete={handleStageComplete} />
      case 3:
        return (
          <PackageReview 
            eventData={eventData} 
            requirementsData={requirementsData}
            packageData={packageData}
            onComplete={handleStageComplete}
            onEdit={() => handleEditStage(2)}
          />
        )
      default:
        return <QuickProfiling onComplete={handleStageComplete} />
    }
  }

  return renderCurrentStage()
}
