'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useHydration } from '@/hooks/use-hydration'
import { getCategoryImage } from '@/lib/utils/vendor-images'
import FilterSidebar from '@/components/marketplace/FilterSidebar'
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
  SlidersHorizontal,
  ArrowLeft,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Check,
  Minus,
  Plus,
  FilterX,
  Settings,
  Zap
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
  subcategories?: string[]
}

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

type ViewMode = 'grid' | 'list'
type SortBy = 'relevance' | 'rating' | 'price_low' | 'price_high' | 'name' | 'distance'

export default function MarketplacePage() {
  const isHydrated = useHydration()
  const [vendors, setVendors] = useState<VendorCard[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortBy>('relevance')
  const [showCategorySelection, setShowCategorySelection] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    eventType: [],
    rating: 0,
    priceRange: { min: 0, max: 100000 },
    location: '',
    capacity: 0,
    featured: false,
    verified: false,
    availability: [],
    services: []
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

  const availabilityOptions = [
    { id: 'weekdays', name: 'Weekdays' },
    { id: 'weekends', name: 'Weekends' },
    { id: 'evenings', name: 'Evenings' },
    { id: 'mornings', name: 'Mornings' }
  ]

  const serviceOptions = [
    { id: 'full-service', name: 'Full Service' },
    { id: 'setup-only', name: 'Setup Only' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'cleanup', name: 'Cleanup' }
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

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    setShowCategorySelection(false)
    setDisplayCount(12)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setShowCategorySelection(true)
    setSearchTerm('')
    setFilters({
      eventType: [],
      rating: 0,
      priceRange: { min: 0, max: 100000 },
      location: '',
      capacity: 0,
      featured: false,
      verified: false,
      availability: [],
      services: []
    })
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setDisplayCount(12)
  }

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev[key]) && (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }))
    setDisplayCount(12)
  }

  const clearFilters = () => {
    setFilters({
      eventType: [],
      rating: 0,
      priceRange: { min: 0, max: 100000 },
      location: '',
      capacity: 0,
      featured: false,
      verified: false,
      availability: [],
      services: []
    })
    setDisplayCount(12)
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

  const sortVendors = (vendors: VendorCard[]) => {
    switch (sortBy) {
      case 'rating':
        return [...vendors].sort((a, b) => b.average_rating - a.average_rating)
      case 'price_low':
        return [...vendors].sort((a, b) => a.base_price - b.base_price)
      case 'price_high':
        return [...vendors].sort((a, b) => b.base_price - a.base_price)
      case 'name':
        return [...vendors].sort((a, b) => a.title.localeCompare(b.title))
      default:
        return vendors
    }
  }

  const displayedVendors = sortVendors(vendors).slice(0, displayCount)
  const hasMore = displayedVendors.length < vendors.length

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return value.min > 0 || value.max < 100000
    if (typeof value === 'boolean') return value
    return value > 0 && value !== ''
  }).length

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
              {/* Mobile Filter Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                suppressHydrationWarning
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
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
        {showCategorySelection ? (
          // Category Selection View
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">What are you looking for?</h1>
              <p className="text-xl text-gray-600">Choose a category to find the perfect vendors for your event</p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleCategorySelect(category.slug)}
                  className="bg-white rounded-2xl shadow-elegant p-6 cursor-pointer hover:shadow-elegant-hover transition-all duration-300 group border border-gray-100"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.vendor_count} vendors</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Vendor Listing View with Sidebar
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onToggleArrayFilter={toggleArrayFilter}
                    onClearFilters={clearFilters}
                    eventTypes={eventTypes}
                    availabilityOptions={availabilityOptions}
                    serviceOptions={serviceOptions}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onToggleArrayFilter={toggleArrayFilter}
                  onClearFilters={clearFilters}
                  eventTypes={eventTypes}
                  availabilityOptions={availabilityOptions}
                  serviceOptions={serviceOptions}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Breadcrumb and Back Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToCategories}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Categories</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span>•</span>
                    <span className="font-medium text-gray-900">
                      {categories.find(c => c.slug === selectedCategory)?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                  </h1>
                  <p className="text-gray-600">
                    {vendors.length} vendors found
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Active Filters Display */}
                  {activeFiltersCount > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FilterX className="h-4 w-4" />
                      <span>{activeFiltersCount} active filters</span>
                    </div>
                  )}

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="name">Sort by Name</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
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
                  {/* Vendor Cards */}
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {displayedVendors.map((vendor, index) => (
                      <motion.div
                        key={vendor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={`bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-elegant-hover transition-all duration-300 group ${
                          viewMode === 'list' ? 'flex' : ''
                        }`}
                      >
                        {/* Card Image */}
                        <div className={`relative overflow-hidden ${
                          viewMode === 'list' ? 'w-48 h-32' : 'h-48'
                        }`}>
                          {(() => {
                            const categoryImage = getCategoryImage(vendor.category?.slug || 'default')
                            return (
                              <img
                                src={categoryImage.url}
                                alt={categoryImage.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            )
                          })()}
                          
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
                        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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
        )}
      </div>
    </div>
  )
}

