'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore } from '@/stores/event-planning-store'
import { ServiceCategory } from '@/types/event-planning'
import { enhancedServiceCategories } from '@/data/enhanced-services'
import { 
  CheckCircle, 
  ChevronDown, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Star,
  Info
} from 'lucide-react'

interface ServiceSelectionProps {
  onComplete: (stepId: string) => void
}

const ServiceSelection = ({ onComplete }: ServiceSelectionProps) => {
  const { eventData, setSelectedServices } = useEventPlanningStore()
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>(
    eventData.selectedServices || []
  )
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Enhanced service categories with more options
  const serviceCategories: ServiceCategory[] = enhancedServiceCategories

  const filteredCategories = serviceCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories?.some(sub => 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleCategoryToggle = (category: ServiceCategory) => {
    const isSelected = selectedCategories.some(c => c.id === category.id)
    
    if (isSelected) {
      setSelectedCategories(prev => prev.filter(c => c.id !== category.id))
    } else {
      setSelectedCategories(prev => [...prev, category])
    }
  }

  const handleSubcategoryToggle = (category: ServiceCategory, subcategory: ServiceCategory) => {
    const isSelected = selectedCategories.some(c => c.id === subcategory.id)
    
    if (isSelected) {
      setSelectedCategories(prev => prev.filter(c => c.id !== subcategory.id))
    } else {
      setSelectedCategories(prev => [...prev, subcategory])
    }
  }

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleContinue = () => {
    setSelectedServices(selectedCategories)
    onComplete('service-selection')
  }

  const isCategorySelected = (category: ServiceCategory) => {
    return selectedCategories.some(c => c.id === category.id)
  }

  const isSubcategorySelected = (subcategory: ServiceCategory) => {
    return selectedCategories.some(c => c.id === subcategory.id)
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
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 px-6 py-3 rounded-full border border-primary-200 shadow-red-soft mb-6">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <span className="text-primary-700 font-semibold">Step 3 of 6</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4">
          What services do you need?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the services you want for your {eventData.eventType?.name.toLowerCase()}. 
          We'll match you with the best vendors for each category.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="input-base w-full pl-10"
          />
          <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </motion.div>

      {/* Service Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="bg-white rounded-2xl border border-gray-200 shadow-elegant overflow-hidden"
          >
            {/* Category Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleCategoryToggle(category)}
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${isCategorySelected(category)
                        ? 'bg-primary-500 border-primary-500 text-white'
                        : 'border-gray-300 hover:border-primary-400'
                      }
                    `}
                  >
                    {isCategorySelected(category) && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleExpanded(category.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Subcategories */}
            {expandedCategories.includes(category.id) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100"
              >
                <div className="p-6 space-y-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Available Services:
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.subcategories?.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <button
                          onClick={() => handleSubcategoryToggle(category, subcategory)}
                          className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                            ${isSubcategorySelected(subcategory)
                              ? 'bg-primary-500 border-primary-500 text-white'
                              : 'border-gray-300 hover:border-primary-400'
                            }
                          `}
                        >
                          {isSubcategorySelected(subcategory) && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{subcategory.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {subcategory.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {subcategory.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Selected Services Summary */}
      {selectedCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedCategories.length} Service{selectedCategories.length !== 1 ? 's' : ''} Selected
                </h3>
                <p className="text-gray-600">
                  {selectedCategories.map(c => c.name).join(', ')}
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
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <Info className="h-4 w-4" />
          <span>Need help choosing? Our experts can guide you through the selection process.</span>
        </div>
      </motion.div>
    </div>
  )
}

export default ServiceSelection
