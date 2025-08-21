'use client'

import { motion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { EventPlanningStep } from '@/types/event-planning'

interface ProgressStepperProps {
  steps: EventPlanningStep[]
  currentStep: number
  onStepClick: (step: number) => void
}

const ProgressStepper = ({ steps, currentStep, onStepClick }: ProgressStepperProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2 z-0" />
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 -translate-y-1/2 z-0"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Step Indicators */}
        {steps.map((step, index) => {
          const isCompleted = step.isCompleted
          const isCurrent = index === currentStep
          const isClickable = isCompleted || index === 0

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Step Circle */}
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`
                  relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${isCompleted 
                    ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30' 
                    : isCurrent 
                    ? 'bg-white border-blue-500 text-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'
                  }
                  ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
                
                {/* Pulse animation for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-300"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>

              {/* Step Label */}
              <div className="mt-3 text-center max-w-32">
                <motion.p
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                >
                  {step.title}
                </motion.p>
                
                <motion.p
                  className="text-xs text-gray-500 mt-1 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  {step.description}
                </motion.p>
              </div>

              {/* Status Indicator */}
              {isCompleted && (
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <Check className="h-2.5 w-2.5 text-white" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-8 lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-white">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="text-lg font-semibold text-white">
            {steps[currentStep]?.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {steps[currentStep]?.description}
          </p>
        </div>
      </div>

      {/* Step Navigation for Mobile */}
      <div className="mt-6 lg:hidden flex justify-between">
        <button
          onClick={() => onStepClick(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-gray-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={() => onStepClick(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProgressStepper
