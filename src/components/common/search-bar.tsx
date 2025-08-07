'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Filter, MapPin, Calendar, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  onFilter?: (filters: any) => void
  showFilters?: boolean
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search vendors, services, or locations...",
  onSearch,
  onFilter,
  showFilters = true,
  className
}) => {
  const [query, setQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    eventDate: '',
    guestCount: '',
    budget: ''
  })

  const handleSearch = () => {
    onSearch?.(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearQuery = () => {
    setQuery('')
    onSearch?.('')
  }

  const applyFilters = () => {
    onFilter?.(filters)
    setIsFilterOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      eventDate: '',
      guestCount: '',
      budget: ''
    })
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-gray-400 z-10" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-20 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0 text-lg shadow-elegant transition-all duration-200"
          />
          
          {/* Clear Button */}
          {query && (
            <button
              onClick={clearQuery}
              className="absolute right-16 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
          
          {/* Search Button */}
          <Button
            onClick={handleSearch}
            variant="primary"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            Search
          </Button>
        </div>

        {/* Quick Filter Button */}
        {showFilters && (
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="absolute -bottom-2 left-4 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2"
          >
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white border border-gray-200 rounded-xl shadow-elegant overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-primary-600" />
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0"
                  >
                    <option value="">Any Location</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="pune">Pune</option>
                    <option value="hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={filters.eventDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, eventDate: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    Guest Count
                  </label>
                  <select
                    value={filters.guestCount}
                    onChange={(e) => setFilters(prev => ({ ...prev, guestCount: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0"
                  >
                    <option value="">Any Size</option>
                    <option value="1-25">1-25 guests</option>
                    <option value="26-50">26-50 guests</option>
                    <option value="51-100">51-100 guests</option>
                    <option value="101-250">101-250 guests</option>
                    <option value="251-500">251-500 guests</option>
                    <option value="500+">500+ guests</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Budget Range</label>
                  <select
                    value={filters.budget}
                    onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0"
                  >
                    <option value="">Any Budget</option>
                    <option value="under-25k">Under ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                    <option value="100k-250k">₹1,00,000 - ₹2,50,000</option>
                    <option value="250k+">Above ₹2,50,000</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear all filters
                </button>
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar