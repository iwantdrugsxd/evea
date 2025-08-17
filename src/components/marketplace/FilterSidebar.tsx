'use client'

import { useState } from 'react'
import { Star, Minus, Plus } from 'lucide-react'

interface FilterState {
  eventType: string[]
  rating: number
  priceRange: { min: number; max: number }
  location: string
  capacity: number
  featured: boolean
  verified: boolean
  availability: string[]
  services: string[]
}

interface FilterSidebarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: any) => void
  onToggleArrayFilter: (key: keyof FilterState, value: string) => void
  onClearFilters: () => void
  eventTypes: any[]
  availabilityOptions: any[]
  serviceOptions: any[]
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onToggleArrayFilter,
  onClearFilters,
  eventTypes,
  availabilityOptions,
  serviceOptions
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['rating', 'price']))

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return value.min > 0 || value.max < 100000
    if (typeof value === 'boolean') return value
    return value > 0 && value !== ''
  }).length

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Rating Filter */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h4 className="font-medium text-gray-900">Rating</h4>
            {expandedSections.has('rating') ? (
              <Minus className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('rating') && (
            <div className="space-y-3">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => onFilterChange('rating', rating)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700">& up</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h4 className="font-medium text-gray-900">Price Range</h4>
            {expandedSections.has('price') ? (
              <Minus className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('price') && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Min</label>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => onFilterChange('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Max</label>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => onFilterChange('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="100000"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Event Type Filter */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('eventType')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h4 className="font-medium text-gray-900">Event Type</h4>
            {expandedSections.has('eventType') ? (
              <Minus className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('eventType') && (
            <div className="space-y-3">
              {eventTypes.map((eventType) => (
                <label key={eventType.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.eventType.includes(eventType.id)}
                    onChange={() => onToggleArrayFilter('eventType', eventType.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{eventType.icon} {eventType.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Availability Filter */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('availability')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h4 className="font-medium text-gray-900">Availability</h4>
            {expandedSections.has('availability') ? (
              <Minus className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('availability') && (
            <div className="space-y-3">
              {availabilityOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(option.id)}
                    onChange={() => onToggleArrayFilter('availability', option.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{option.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Services Filter */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('services')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h4 className="font-medium text-gray-900">Services</h4>
            {expandedSections.has('services') ? (
              <Minus className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('services') && (
            <div className="space-y-3">
              {serviceOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.services.includes(option.id)}
                    onChange={() => onToggleArrayFilter('services', option.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{option.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => onFilterChange('featured', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Featured Vendors</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(e) => onFilterChange('verified', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Verified Only</span>
          </label>
        </div>
      </div>
    </div>
  )
}



