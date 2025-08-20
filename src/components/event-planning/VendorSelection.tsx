'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEventPlanningStore, eventPlanningUtils } from '@/stores/event-planning-store'
import { VendorCard, Vendor, Review, VendorRecommendation, PackageItem } from '@/types/event-planning'
import { 
  Star, 
  MapPin, 
  Users, 
  DollarSign, 
  ArrowRight,
  Sparkles,
  Heart,
  MessageCircle,
  Eye,
  Filter,
  Search,
  CheckCircle,
  X,
  ChevronDown
} from 'lucide-react'

interface VendorSelectionProps {
  onComplete: (stepId: string) => void
}

const VendorSelection = ({ onComplete }: VendorSelectionProps) => {
  const { eventData, package: eventPackage, addToPackage, setRecommendations, removeFromPackage } = useEventPlanningStore()
  const [selectedVendors, setSelectedVendors] = useState<VendorCard[]>([])
  const [vendorsByCategory, setVendorsByCategory] = useState<any>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: { min: 0, max: 100000 },
    location: '',
    availability: 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [draggedItem, setDraggedItem] = useState<any>(null)

  // Loading state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchVendorRecommendations()
  }, [eventData])

  const fetchVendorRecommendations = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        eventType: eventData.eventType?.name || '',
        eventDate: eventData.eventDetails?.date || '',
        guestCount: eventData.eventDetails?.guestCount?.toString() || '',
        budget: eventData.eventDetails?.budget?.toString() || '',
        location: eventData.eventDetails?.location || '',
        services: eventData.selectedServices?.map(s => s.slug).join(',') || ''
      })

      console.log('Fetching event planning recommendations with params:', params.toString())
      const response = await fetch(`/api/event-planning/recommendations?${params}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Vendor recommendations received:', data)
        setVendorsByCategory(data.vendorsByCategory || {})
        
        // Flatten all vendors for the store (for backward compatibility)
        const allVendors = Object.values(data.vendorsByCategory || {}).flatMap((category: any) => category.vendors || [])
        setRecommendations(allVendors)
        
        // Set first category as selected by default
        const categoryKeys = Object.keys(data.vendorsByCategory || {})
        if (categoryKeys.length > 0 && !selectedCategory) {
          setSelectedCategory(categoryKeys[0])
        }
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        setVendorsByCategory({})
        setRecommendations([])
      }
    } catch (error) {
      console.error('Error fetching vendor recommendations:', error)
      setVendorsByCategory({})
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }

  const handleVendorSelect = (recommendation: any) => {
    if (!recommendation || !recommendation.vendor) {
      console.error('Invalid recommendation data')
      return
    }
    
    // Check if we already have a vendor for this category
    const categoryId = (recommendation as any).category?.id || recommendation.category_id || 'unknown'
    const categorySlug = (recommendation as any).category?.slug || recommendation.category_id || 'unknown'
    
    const existingVendor = eventPackage.items.find(item => item.serviceCategory.id === categoryId)
    if (existingVendor) {
      // Remove existing vendor from this category
      removeFromPackage(existingVendor.id)
    }
    
    const packageItem: PackageItem = {
      id: `item_${Date.now()}`,
      serviceCategory: {
        id: categoryId,
        name: getCategoryName(categorySlug),
        slug: categorySlug,
        description: '',
        icon: getCategoryIcon(categorySlug),
        is_active: true,
        sort_order: 1
      },
      vendorCard: recommendation,
      vendor: recommendation.vendor,
      price: recommendation.base_price || 0,
      quantity: 1,
      totalPrice: recommendation.base_price || 0,
      customizations: {}
    }

    addToPackage(packageItem)
    setSelectedVendors(prev => [...prev.filter(v => ((v as any).category?.id || v.category_id) !== categoryId), recommendation])
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetZone: string) => {
    e.preventDefault()
    if (draggedItem && targetZone === 'package') {
      // Find the vendor in any category
      let foundVendor = null
      Object.values(vendorsByCategory).forEach((category: any) => {
        const vendor = category.vendors.find((v: any) => v.id === draggedItem.id)
        if (vendor) foundVendor = vendor
      })
      
      if (foundVendor) {
        handleVendorSelect(foundVendor)
      }
    }
    setDraggedItem(null)
  }

  const getCategoryName = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      'venue-location': 'Venue & Location',
      'catering-food': 'Catering & Food',
      'photography-videography': 'Photography & Videography',
      'decoration-styling': 'Decoration & Styling',
      'entertainment': 'Entertainment'
    }
    return categoryMap[categoryId] || categoryId
  }

  const getCategoryIcon = (categoryId: string) => {
    const iconMap: { [key: string]: string } = {
      'venue-location': '🏛️',
      'catering-food': '🍽️',
      'photography-videography': '📸',
      'decoration-styling': '🎨',
      'entertainment': '🎭'
    }
    return iconMap[categoryId] || '📋'
  }

  const filteredVendorsByCategory = Object.keys(vendorsByCategory).reduce((filtered, categorySlug) => {
    const category = vendorsByCategory[categorySlug]
    const filteredVendors = category.vendors.filter((rec: any) => {
      // Add null checks to prevent errors
      if (!rec || !rec.vendor) {
        return false
      }
      
      const matchesSearch = rec.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rec.vendor.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRating = (rec.average_rating || 0) >= filters.rating
      const matchesPrice = (rec.base_price || 0) >= filters.priceRange.min && 
                          (rec.base_price || 0) <= filters.priceRange.max
      const matchesLocation = !filters.location || 
                             (rec.service_area && Array.isArray(rec.service_area) && 
                              rec.service_area.some((area: string) => 
                                area.toLowerCase().includes(filters.location.toLowerCase())
                              ))
      
      return matchesSearch && matchesRating && matchesPrice && matchesLocation
    })

    if (filteredVendors.length > 0) {
      filtered[categorySlug] = {
        ...category,
        vendors: filteredVendors,
        total: filteredVendors.length
      }
    }

    return filtered
  }, {} as any)

  const handleContinue = () => {
    onComplete('vendor-selection')
  }

  const totalVendors = Object.values(filteredVendorsByCategory).reduce((total: number, category: any) => {
    return total + category.vendors.length
  }, 0)

  const selectedCategoryData = selectedCategory ? filteredVendorsByCategory[selectedCategory] : null

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 px-6 py-3 rounded-full border border-primary-200 shadow-red-soft mb-6">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <span className="text-primary-700 font-semibold">Step 4 of 6</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4">
          Choose Your Vendors
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select one vendor per service category. Drag and drop to build your perfect package.
        </p>
      </motion.div>

      {/* Category Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <div className="bg-white rounded-2xl shadow-elegant p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Service Category</h2>
          <div className="flex flex-wrap gap-3">
            {Object.keys(filteredVendorsByCategory).map((categorySlug) => {
              const category = filteredVendorsByCategory[categorySlug]
              const isSelected = selectedCategory === categorySlug
              const hasVendor = eventPackage.items.some(item => item.serviceCategory.slug === categorySlug)
              
              return (
                <button
                  key={categorySlug}
                  onClick={() => setSelectedCategory(categorySlug)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : hasVendor
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{getCategoryIcon(categorySlug)}</span>
                  <div className="text-left">
                    <div className="font-medium">{category.category?.name || getCategoryName(categorySlug)}</div>
                    <div className="text-sm opacity-75">
                      {hasVendor ? 'Vendor Selected' : `${category.total} vendors`}
                    </div>
                  </div>
                  {hasVendor && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vendors..."
                className="input-base w-full lg:w-80 pl-10"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline btn-sm flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            {selectedCategoryData ? `${selectedCategoryData.total} vendors in ${selectedCategoryData.category?.name}` : `${totalVendors} total vendors`}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white rounded-xl p-6 border border-gray-200 shadow-elegant"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  className="input-base w-full"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: { ...prev.priceRange, min: Number(e.target.value) }
                    }))}
                    placeholder="Min"
                    className="input-base w-full"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                    }))}
                    placeholder="Max"
                    className="input-base w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location..."
                  className="input-base w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Vendor Recommendations for Selected Category */}
        <div className="xl:col-span-2">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Finding the best vendors for your event...</p>
            </div>
          ) : !selectedCategory ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a category</h3>
              <p className="text-gray-600">
                Choose a service category above to view vendor recommendations.
              </p>
            </div>
          ) : !selectedCategoryData || selectedCategoryData.vendors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search criteria to find more vendors.
              </p>
              <button
                onClick={fetchVendorRecommendations}
                className="btn-outline"
              >
                Refresh Results
              </button>
            </div>
          ) : (
            <div>
              {/* Category Header */}
              <div className="bg-white rounded-2xl shadow-elegant p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-xl">
                      {getCategoryIcon(selectedCategory)}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedCategoryData.category?.name || getCategoryName(selectedCategory)}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {selectedCategoryData.total} vendors available
                        {selectedCategoryData.totalAvailable && selectedCategoryData.totalAvailable > selectedCategoryData.total && (
                          <span className="text-gray-500 ml-1">
                            (of {selectedCategoryData.totalAvailable} total)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedCategoryData.total < 10 ? (
                      <span className="text-orange-600">
                        All {selectedCategoryData.total} available vendors
                      </span>
                    ) : (
                      `Top ${selectedCategoryData.total} recommendations`
                    )}
                  </div>
                </div>
              </div>

              {/* Vendors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategoryData.vendors.map((recommendation: any, index: number) => {
                  const isSelected = eventPackage.items.some(item => 
                    item.vendorCard.id === recommendation.id
                  )
                  
                  return (
                    <motion.div
                      key={recommendation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, recommendation)}
                      onDragOver={handleDragOver}
                      className={`bg-white rounded-2xl border-2 transition-all duration-300 cursor-grab active:cursor-grabbing group ${
                        isSelected 
                          ? 'border-green-500 shadow-elegant' 
                          : 'border-gray-200 shadow-elegant hover:shadow-elegant-hover hover:border-gray-300'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-2xl">
                              {getCategoryIcon(recommendation.category_id)}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {recommendation.title || 'Untitled Service'}
                                </h3>
                                {isSelected && (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                )}
                                {recommendation.featured && (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Featured
                                  </span>
                                )}
                              </div>
                              
                              <p className="text-gray-600 mb-3 line-clamp-2">
                                {recommendation.description || 'No description available'}
                              </p>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{recommendation.vendor.business_name || 'Unknown Vendor'}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>Up to {recommendation.max_capacity || 'N/A'} guests</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="font-semibold text-gray-900">
                                {recommendation.average_rating || 0}
                              </span>
                              <span className="text-gray-500">
                                ({recommendation.total_reviews || 0})
                              </span>
                            </div>
                            
                            <div className="text-lg font-bold text-gray-900">
                              {eventPlanningUtils.formatPrice(recommendation.base_price || 0)}
                            </div>
                            
                            <div className="text-sm text-green-600 font-medium">
                              {recommendation.matchPercentage}% match
                            </div>
                          </div>
                        </div>
                        
                        {/* Match Reasons */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {recommendation.reasons?.slice(0, 3).map((reason: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleVendorSelect(recommendation)}
                            className={`btn-sm w-full ${
                              isSelected ? 'btn-outline bg-green-50 text-green-700 border-green-300' : 'btn-primary'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select Vendor'}
                          </button>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Heart className="h-4 w-4 text-gray-400" />
                            </button>
                            <Link href={`/vendor/${recommendation.vendor.id}`}>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye className="h-4 w-4 text-gray-400" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Package Sidebar */}
        <div className="xl:col-span-1">
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'package')}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-6 sticky top-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Package</h2>
            
            {eventPackage.items.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No vendors selected yet</p>
                <p className="text-sm text-gray-400">
                  Drag vendors here or click "Select Vendor"
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {eventPackage.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{item.serviceCategory.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {item.vendorCard.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {item.vendor.business_name}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeFromPackage(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">
                          {item.vendorCard.average_rating}
                        </span>
                      </div>
                      
                      <span className="font-semibold text-gray-900 text-sm">
                        {eventPlanningUtils.formatPrice(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Platform Fee:</span>
                    <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.platformFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span>Total:</span>
                    <span>{eventPlanningUtils.formatPrice(eventPackage.totalAmount)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleContinue}
                  disabled={eventPackage.items.length === 0}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Continue to Review</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorSelection
