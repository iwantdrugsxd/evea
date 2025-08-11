'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useHydration } from '@/hooks/use-hydration'
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Users, 
  Calendar,
  ChevronDown,
  ChevronRight,
  Heart,
  Eye,
  ShoppingCart,
  Sparkles,
  Award,
  Clock,
  DollarSign,
  X,
  SlidersHorizontal
} from 'lucide-react'

interface VendorCard {
  id: string
  title: string
  description: string
  base_price: number
  average_rating: number
  total_reviews: number
  max_capacity: number
  featured: boolean
  vendor: {
    id: string
    business_name: string
    city: string
    state: string
    verification_status: string
  }
  category: {
    id: string
    name: string
    slug: string
    icon: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  vendor_count: number
}

interface FilterState {
  eventType: string[]
  rating: number
  priceRange: { min: number; max: number }
  location: string
  capacity: number
  featured: boolean
  verified: boolean
}

export default function MarketplacePage() {
  const isHydrated = useHydration()
  const [vendors, setVendors] = useState<VendorCard[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [displayCount, setDisplayCount] = useState(25)
  const [filters, setFilters] = useState<FilterState>({
    eventType: [],
    rating: 0,
    priceRange: { min: 0, max: 100000 },
    location: '',
    capacity: 0,
    featured: false,
    verified: false
  })

  const eventTypes = [
    { id: 'wedding', name: 'Wedding', icon: '💒' },
    { id: 'birthday', name: 'Birthday', icon: '🎂' },
    { id: 'corporate', name: 'Corporate', icon: '🏢' },
    { id: 'conference', name: 'Conference', icon: '🎤' },
    { id: 'party', name: 'Party', icon: '🎉' },
    { id: 'anniversary', name: 'Anniversary', icon: '💝' },
    { id: 'graduation', name: 'Graduation', icon: '🎓' },
    { id: 'baby-shower', name: 'Baby Shower', icon: '👶' }
  ]

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [])

  const fetchVendors = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.append('category', selectedCategory)
      if (searchTerm) params.append('search', searchTerm)
      if (filters.eventType.length > 0) params.append('eventType', filters.eventType.join(','))
      if (filters.rating > 0) params.append('rating', filters.rating.toString())
      if (filters.priceRange.min > 0) params.append('minPrice', filters.priceRange.min.toString())
      if (filters.priceRange.max < 100000) params.append('maxPrice', filters.priceRange.max.toString())
      if (filters.location) params.append('location', filters.location)
      if (filters.capacity > 0) params.append('capacity', filters.capacity.toString())
      if (filters.featured) params.append('featured', 'true')
      if (filters.verified) params.append('verified', 'true')

      const response = await fetch(`/api/vendors?${params}`)
      if (response.ok) {
        const data = await response.json()
        // Flatten the category-wise data for marketplace display
        const allVendors = Object.values(data.vendorsByCategory || {}).flatMap((category: any) => 
          category.vendors.map((vendor: any) => ({
            ...vendor,
            category: category.category
          }))
        )
        setVendors(allVendors)
      }
    } catch (error) {
      console.error('Error fetching vendors:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchTerm, filters])

  useEffect(() => {
    fetchCategories()
    fetchVendors()
  }, [fetchCategories, fetchVendors])

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 25)
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setDisplayCount(25) // Reset display count when filters change
  }

  const clearFilters = () => {
    setFilters({
      eventType: [],
      rating: 0,
      priceRange: { min: 0, max: 100000 },
      location: '',
      capacity: 0,
      featured: false,
      verified: false
    })
    setSelectedCategory(null)
    setSearchTerm('')
    setDisplayCount(25)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const displayedVendors = vendors.slice(0, displayCount)
  const hasMore = displayedVendors.length < vendors.length

  // Don't render until hydrated to prevent hydration mismatches
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                Evea
              </Link>
              
              {/* Search Bar */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search vendors, services, or locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  suppressHydrationWarning
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                suppressHydrationWarning
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
              
              <Link href="/plan-event">
                <button className="btn-primary flex items-center space-x-2" suppressHydrationWarning>
                  <Calendar className="h-4 w-4" />
                  <span>Create Your Event</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-elegant p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  suppressHydrationWarning
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">All Categories</span>
                    <span className="text-sm text-gray-500">{vendors.length}</span>
                  </div>
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.slug 
                        ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    suppressHydrationWarning
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.vendor_count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-elegant p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <div className="space-y-2">
                      {eventTypes.map((eventType) => (
                        <label key={eventType.id} className="flex items-center space-x-2">
                                                     <input
                             type="checkbox"
                             checked={filters.eventType.includes(eventType.id)}
                             onChange={(e) => {
                               if (e.target.checked) {
                                 handleFilterChange('eventType', [...filters.eventType, eventType.id])
                               } else {
                                 handleFilterChange('eventType', filters.eventType.filter(id => id !== eventType.id))
                               }
                             }}
                             className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                             suppressHydrationWarning
                           />
                          <span className="text-sm text-gray-700">{eventType.icon} {eventType.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                                         <select
                       value={filters.rating}
                       onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                       suppressHydrationWarning
                     >
                      <option value={0}>Any Rating</option>
                      <option value={3}>3+ Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={4.8}>4.8+ Stars</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex items-center space-x-2">
                                             <input
                         type="number"
                         value={filters.priceRange.min}
                         onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
                         placeholder="Min"
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                         suppressHydrationWarning
                       />
                       <span className="text-gray-500">-</span>
                       <input
                         type="number"
                         value={filters.priceRange.max}
                         onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
                         placeholder="Max"
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                         suppressHydrationWarning
                       />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                         <input
                       type="text"
                       value={filters.location}
                       onChange={(e) => handleFilterChange('location', e.target.value)}
                       placeholder="Enter city or state..."
                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                       suppressHydrationWarning
                     />
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Capacity</label>
                                         <input
                       type="number"
                       value={filters.capacity}
                       onChange={(e) => handleFilterChange('capacity', Number(e.target.value))}
                       placeholder="Number of guests"
                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                       suppressHydrationWarning
                     />
                  </div>

                  {/* Additional Filters */}
                  <div className="space-y-3">
                                         <label className="flex items-center space-x-2">
                       <input
                         type="checkbox"
                         checked={filters.featured}
                         onChange={(e) => handleFilterChange('featured', e.target.checked)}
                         className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                         suppressHydrationWarning
                       />
                       <span className="text-sm text-gray-700">Featured Vendors Only</span>
                     </label>
                     
                     <label className="flex items-center space-x-2">
                       <input
                         type="checkbox"
                         checked={filters.verified}
                         onChange={(e) => handleFilterChange('verified', e.target.checked)}
                         className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                         suppressHydrationWarning
                       />
                       <span className="text-sm text-gray-700">Verified Vendors Only</span>
                     </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : 'All Vendors'}
                </h1>
                <p className="text-gray-600">
                  {vendors.length} vendors found
                  {selectedCategory && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Showing {displayedVendors.length} of {vendors.length}</span>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Finding the best vendors for you...</p>
              </div>
            ) : (
              <>
                {/* Vendor Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedVendors.map((vendor, index) => (
                    <motion.div
                      key={vendor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-elegant-hover transition-all duration-300 group"
                    >
                      {/* Card Image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                          {vendor.category?.icon || '🏢'}
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex space-x-2">
                          {vendor.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                          {vendor.vendor.verification_status === 'verified' && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                        
                                                 {/* Action Buttons */}
                         <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors" suppressHydrationWarning>
                             <Heart className="h-4 w-4 text-gray-600" />
                           </button>
                           <Link href={`/vendor/${vendor.vendor.id}`}>
                             <button className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors" suppressHydrationWarning>
                               <Eye className="h-4 w-4 text-gray-600" />
                             </button>
                           </Link>
                         </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            {vendor.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {vendor.description}
                        </p>
                        
                        <div className="flex items-center space-x-1 mb-3">
                          {renderStars(vendor.average_rating)}
                          <span className="text-sm text-gray-600 ml-1">
                            {vendor.average_rating} ({vendor.total_reviews})
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{vendor.vendor.city}, {vendor.vendor.state}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>Up to {vendor.max_capacity}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatPrice(vendor.base_price)}
                          </div>
                          
                                                     <Link href={`/vendor/${vendor.vendor.id}`}>
                             <button className="btn-primary btn-sm" suppressHydrationWarning>
                               View Details
                             </button>
                           </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                                 {/* Load More Button */}
                 {hasMore && (
                   <div className="text-center mt-8">
                     <button
                       onClick={handleLoadMore}
                       className="btn-outline px-8 py-3"
                       suppressHydrationWarning
                     >
                       Show More Vendors
                     </button>
                   </div>
                 )}

                {/* No Results */}
                {vendors.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search criteria or filters to find more vendors.
                    </p>
                                         <button
                       onClick={clearFilters}
                       className="btn-outline"
                       suppressHydrationWarning
                     >
                       Clear Filters
                     </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}