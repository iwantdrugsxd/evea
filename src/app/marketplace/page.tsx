'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
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
  Zap,
  Phone,
  Mail,
  MessageSquare,
  Share2,
  Bookmark,
  TrendingUp,
  Shield,
  CheckCircle,
  Clock3,
  Map,
  Filter as FilterIcon
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'

interface VendorCard {
  id: string
  title: string
  description: string
  base_price: number
  price_range_min?: number
  price_range_max?: number
  average_rating: number
  total_reviews: number
  total_orders: number
  max_capacity?: number
  featured: boolean
  images: string[]
  videos: string[]
  inclusions: string[]
  exclusions: string[]
  service_area: string[]
  response_time_hours: number
  vendor: {
    id: string
    business_name: string
    business_logo_url?: string
    city: string
    state: string
    verification_status: string
    verification_tier: number
    portfolio_quality_score: number
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
  description: string
  vendor_count: number
  subcategories?: string[]
  image?: string
  image_url?: string
  bgColor?: string
  color?: string
  textColor?: string
  average_price?: number
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
  sortBy: string
  viewMode: 'grid' | 'list' | 'map'
}

type ViewMode = 'grid' | 'list' | 'map'
type SortBy = 'relevance' | 'rating' | 'price_low' | 'price_high' | 'name' | 'distance' | 'popularity' | 'newest'

export default function MarketplacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  
  // Hero section state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  
  // Hero backgrounds and content
  const heroContent = [
    {
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop&crop=center',
      title: 'Find Perfect Vendors for Your',
      subtitle: 'Special Events',
      description: 'Discover verified vendors across all categories. From photography to catering, find everything you need to make your event unforgettable.'
    },
    {
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=1080&fit=crop&crop=center',
      title: 'Create Unforgettable',
      subtitle: 'Event Experiences',
      description: 'Transform your vision into reality with our curated selection of professional event vendors and services.'
    },
    {
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&crop=center',
      title: 'From Dream to',
      subtitle: 'Celebration',
      description: 'Every detail matters. Find the perfect vendors to bring your special moments to life with style and elegance.'
    },
    {
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop&crop=center',
      title: 'Excellence in Every',
      subtitle: 'Service Category',
      description: 'Quality assured vendors across photography, catering, decoration, entertainment, and more for your perfect event.'
    },
    {
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center',
      title: 'Professional Event',
      subtitle: 'Solutions',
      description: 'Connect with experienced professionals who understand your needs and deliver exceptional results.'
    }
  ]
  
  // State management
  const [vendors, setVendors] = useState<VendorCard[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortBy>('relevance')
  const [showCategorySelection, setShowCategorySelection] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [cart, setCart] = useState<any[]>([])
  const [location, setLocation] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Rotate hero content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroContent.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroContent.length])

  const [filters, setFilters] = useState<FilterState>({
    eventType: [],
    rating: 0,
    priceRange: { min: 0, max: 100000 },
    location: '',
    capacity: 0,
    featured: false,
    verified: false,
    availability: [],
    services: [],
    sortBy: 'relevance',
    viewMode: 'grid'
  })

  // Event types for filtering
  const eventTypes = [
    { id: 'wedding', name: 'Wedding', icon: '💒', color: 'bg-pink-100 text-pink-800' },
    { id: 'birthday', name: 'Birthday', icon: '🎂', color: 'bg-blue-100 text-blue-800' },
    { id: 'corporate', name: 'Corporate', icon: '🏢', color: 'bg-gray-100 text-gray-800' },
    { id: 'conference', name: 'Conference', icon: '🎤', color: 'bg-purple-100 text-purple-800' },
    { id: 'party', name: 'Party', icon: '🎉', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'anniversary', name: 'Anniversary', icon: '💝', color: 'bg-red-100 text-red-800' },
    { id: 'graduation', name: 'Graduation', icon: '🎓', color: 'bg-green-100 text-green-800' },
    { id: 'baby-shower', name: 'Baby Shower', icon: '👶', color: 'bg-indigo-100 text-indigo-800' }
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

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true)
    try {
      console.log('Fetching categories...')
      const response = await fetch('/api/categories')
      console.log('Categories response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Categories data:', data)
        // Handle the new API response structure
        setCategories(data.categories || [])
      } else {
        console.error('Failed to fetch categories:', response.status)
        // Fallback to default categories if API fails
        setCategories([
          {
            id: 'wedding-services',
            name: 'Wedding Services',
            slug: 'wedding-services',
            icon: '💒',
            description: 'Complete wedding planning and services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
            color: 'from-pink-500 to-rose-500',
            textColor: 'text-pink-700'
          },
          {
            id: 'photography-video',
            name: 'Photography & Video',
            slug: 'photography-video',
            icon: '📸',
            description: 'Professional photography and videography services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
            color: 'from-blue-500 to-indigo-500',
            textColor: 'text-blue-700'
          },
          {
            id: 'catering-food',
            name: 'Catering & Food',
            slug: 'catering-food',
            icon: '🍽️',
            description: 'Food and beverage services for all events',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
            color: 'from-orange-500 to-amber-500',
            textColor: 'text-orange-700'
          },
          {
            id: 'decoration-styling',
            name: 'Decoration & Styling',
            slug: 'decoration-styling',
            icon: '🎨',
            description: 'Event decoration and styling services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
            color: 'from-purple-500 to-violet-500',
            textColor: 'text-purple-700'
          },
          {
            id: 'music-entertainment',
            name: 'Music & Entertainment',
            slug: 'music-entertainment',
            icon: '🎵',
            description: 'Live music and entertainment services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
            color: 'from-green-500 to-emerald-500',
            textColor: 'text-green-700'
          },
          {
            id: 'venues-locations',
            name: 'Venues & Locations',
            slug: 'venues-locations',
            icon: '🏛️',
            description: 'Event venues and locations',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
            color: 'from-gray-500 to-slate-500',
            textColor: 'text-gray-700'
          },
          {
            id: 'transportation',
            name: 'Transportation',
            slug: 'transportation',
            icon: '🚗',
            description: 'Vehicle and transportation services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
            color: 'from-red-500 to-pink-500',
            textColor: 'text-red-700'
          },
          {
            id: 'corporate-events',
            name: 'Corporate Events',
            slug: 'corporate-events',
            icon: '🏢',
            description: 'Corporate event planning and services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
            color: 'from-teal-500 to-cyan-500',
            textColor: 'text-teal-700'
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Fallback to default categories if API fails
      setCategories([
        {
          id: 'wedding-services',
          name: 'Wedding Services',
          slug: 'wedding-services',
          icon: '💒',
          description: 'Complete wedding planning and services',
          vendor_count: 0,
          bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
          color: 'from-pink-500 to-rose-500',
          textColor: 'text-pink-700'
        },
                  {
            id: 'photography-video',
            name: 'Photography & Video',
            slug: 'photography-video',
            icon: '📸',
            description: 'Professional photography and videography services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
            color: 'from-blue-500 to-indigo-500',
            textColor: 'text-blue-700'
          },
          {
            id: 'catering-food',
            name: 'Catering & Food',
            slug: 'catering-food',
            icon: '🍽️',
            description: 'Food and beverage services for all events',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
            color: 'from-orange-500 to-amber-500',
            textColor: 'text-orange-700'
          },
          {
            id: 'decoration-styling',
            name: 'Decoration & Styling',
            slug: 'decoration-styling',
            icon: '🎨',
            description: 'Event decoration and styling services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
            color: 'from-purple-500 to-violet-500',
            textColor: 'text-purple-700'
          },
          {
            id: 'music-entertainment',
            name: 'Music & Entertainment',
            slug: 'music-entertainment',
            icon: '🎵',
            description: 'Live music and entertainment services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
            color: 'from-green-500 to-emerald-500',
            textColor: 'text-green-700'
          },
          {
            id: 'venues-locations',
            name: 'Venues & Locations',
            slug: 'venues-locations',
            icon: '🏛️',
            description: 'Event venues and locations',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
            color: 'from-gray-500 to-slate-500',
            textColor: 'text-gray-700'
          },
          {
            id: 'transportation',
            name: 'Transportation',
            slug: 'transportation',
            icon: '🚗',
            description: 'Vehicle and transportation services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
            color: 'from-red-500 to-pink-500',
            textColor: 'text-red-700'
          },
          {
            id: 'corporate-events',
            name: 'Corporate Events',
            slug: 'corporate-events',
            icon: '🏢',
            description: 'Corporate event planning and services',
            vendor_count: 0,
            bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
            color: 'from-teal-500 to-cyan-500',
            textColor: 'text-teal-700'
          }
      ])
    } finally {
      setCategoriesLoading(false)
    }
  }, [])

  // Fetch vendors from API
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
      if (filters.sortBy) params.append('sortBy', filters.sortBy)

      const response = await fetch(`/api/vendors?${params}`)
      if (response.ok) {
        const data = await response.json()
        // Handle the new API response structure
        setVendors(data.vendors || [])
      } else {
        console.error('Failed to fetch vendors:', response.status)
        setVendors([])
      }
    } catch (error) {
      console.error('Error fetching vendors:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchTerm, filters])

  // Load data on mount and when filters change
  useEffect(() => {
    fetchCategories()
    fetchVendors()
  }, [fetchCategories, fetchVendors])

  // Handle category selection
  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    setShowCategorySelection(false)
    setDisplayCount(12)
    router.push(`/marketplace?category=${categorySlug}`)
  }

  // Handle back to categories
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
      services: [],
      sortBy: 'relevance',
      viewMode: 'grid'
    })
    router.push('/marketplace')
  }

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)])
    }
  }

  // Handle load more
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setDisplayCount(12)
  }

  // Toggle array filters
  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev[key]) && (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }))
    setDisplayCount(12)
  }

  // Clear all filters
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
      services: [],
      sortBy: 'relevance',
      viewMode: 'grid'
    })
    setDisplayCount(12)
  }

  // Toggle favorite
  const toggleFavorite = (vendorId: string) => {
    setFavorites(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    )
  }

  // Add to cart
  const addToCart = (vendor: VendorCard) => {
    setCart(prev => [...prev, { ...vendor, quantity: 1 }])
  }

  // Utility functions
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

  const formatPriceRange = (min: number, max: number) => {
    return `${formatPrice(min)} - ${formatPrice(max)}`
  }

  // Sort vendors
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
      case 'popularity':
        return [...vendors].sort((a, b) => b.total_orders - a.total_orders)
      case 'newest':
        return [...vendors].sort((a, b) => new Date(b.vendor.id).getTime() - new Date(a.vendor.id).getTime())
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

  // Category selection view
  if (showCategorySelection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-20 pb-16">
          {/* Hero Section */}
          <section className="relative h-screen overflow-hidden">
            {/* Rotating Background Images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroContent[currentHeroIndex].image}
                  alt="Event background"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
              </motion.div>
            </AnimatePresence>
            
            <div className="container-custom relative z-10 h-full flex items-center">
              <div className="text-center max-w-5xl mx-auto text-white">
                <motion.div
                  key={currentHeroIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge variant="gray" className="mb-8 px-6 py-3 text-base bg-white/20 backdrop-blur-sm border-white/30">
                    <Sparkles className="h-5 w-5 mr-2" />
                    India's Premier Event Marketplace
                  </Badge>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight font-serif">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`title-${currentHeroIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                      >
                        {heroContent[currentHeroIndex].title}
                      </motion.span>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`subtitle-${currentHeroIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 block"
                      >
                        {heroContent[currentHeroIndex].subtitle}
                      </motion.span>
                    </AnimatePresence>
                  </h1>
                  
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`description-${currentHeroIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90"
                    >
                      {heroContent[currentHeroIndex].description}
                    </motion.p>
                  </AnimatePresence>

                  {/* Enhanced Search Bar */}
                  <div className="max-w-3xl mx-auto mb-16">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant border border-white/30 p-2">
                        <div className="flex items-center">
                          <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search for vendors, services, or locations..."
                              value={searchTerm}
                              onChange={(e) => handleSearch(e.target.value)}
                              className="w-full pl-14 pr-4 py-4 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent"
                            />
                          </div>
                          <Button className="px-8 py-4 text-lg font-semibold rounded-xl mr-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                            Search
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick search suggestions */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      {['Wedding Photography', 'Catering Services', 'Event Venues', 'Music & Entertainment'].map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                          onClick={() => handleSearch(suggestion)}
                          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white hover:bg-white/30 hover:shadow-md transition-all duration-300 border border-white/30"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Explore by Category
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Browse through our comprehensive collection of event services and find the perfect vendors for your needs.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoriesLoading ? (
                  // Loading skeleton for categories
                  Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-elegant animate-pulse">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    </div>
                  ))
                ) : (
                  Array.isArray(categories) && categories.map((category, index) => (
                    <motion.div
                      key={category.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group cursor-pointer"
                      onClick={() => handleCategorySelect(category.slug)}
                    >
                      <div className={`${category.bgColor} rounded-2xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300 border border-white/50 backdrop-blur-sm relative overflow-hidden group cursor-pointer`}>
                        {/* Background Image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={category.image || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop&crop=center'}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <h3 className="font-bold text-gray-900 mb-2 text-lg">{category.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                        </div>
                        
                        {/* Hover effect border */}
                        <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current group-hover:${category.textColor} transition-colors duration-300 pointer-events-none`}></div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-300 rounded-full"></div>
                <div className="absolute top-32 right-20 w-16 h-16 border-2 border-red-300 rounded-full"></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-blue-300 rounded-full"></div>
                <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-green-300 rounded-full"></div>
              </div>
            </div>
            
            <div className="container-custom relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Popular Event Types
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Quick access to the most requested event services
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {eventTypes.map((eventType, index) => (
                  <motion.div
                    key={eventType.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className={`${eventType.color} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm relative overflow-hidden`}>
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative z-10">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {eventType.icon}
                        </div>
                        <h3 className="font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                          {eventType.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }

  // Vendor listing view
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={handleBackToCategories}
                className="flex items-center hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Categories
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">
                {categories.find(c => c.slug === selectedCategory)?.name || 'All Vendors'}
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter Header */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="container-custom py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vendors, services, or locations..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter Controls */}
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest</option>
                </select>

                {/* Filter Button */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <FilterIcon className="h-4 w-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="primary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {filters.eventType.map(type => (
                  <Badge key={type} variant="gray" className="text-sm">
                    {eventTypes.find(t => t.id === type)?.name}
                    <button
                      onClick={() => toggleArrayFilter('eventType', type)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {filters.rating > 0 && (
                  <Badge variant="gray" className="text-sm">
                    {filters.rating}+ stars
                    <button
                      onClick={() => handleFilterChange('rating', 0)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.featured && (
                  <Badge variant="gray" className="text-sm">
                    Featured only
                    <button
                      onClick={() => handleFilterChange('featured', false)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="container-custom py-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {categories.find(c => c.slug === selectedCategory)?.name || 'All Vendors'}
              </h1>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${vendors.length} vendors found`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && displayedVendors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vendors found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Vendor Grid */}
          {!loading && displayedVendors.length > 0 && (
            <>
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {displayedVendors.map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Vendor Image with Gradient Overlay */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-56'}`}>
                      {vendor.images && vendor.images.length > 0 ? (
                        <Image
                          src={vendor.images[0]}
                          alt={vendor.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                          <div className="text-white text-6xl opacity-80">
                            {vendor.category?.icon || '🎉'}
                          </div>
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {vendor.featured && (
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            Featured
                          </div>
                        )}
                        {vendor.vendor.verification_status === 'verified' && (
                          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => toggleFavorite(vendor.id)}
                          className={`p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl ${
                            favorites.includes(vendor.id) ? 'text-red-500 scale-110' : 'text-gray-600 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${favorites.includes(vendor.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 text-gray-600 hover:text-blue-500 shadow-lg hover:shadow-xl">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {vendor.price_range_min && vendor.price_range_max
                            ? formatPriceRange(vendor.price_range_min, vendor.price_range_max)
                            : formatPrice(vendor.base_price)
                          }
                        </div>
                        <div className="text-xs text-gray-600">Starting price</div>
                      </div>
                    </div>

                    {/* Vendor Content */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Vendor Info */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {vendor.vendor.business_logo_url ? (
                            <Image
                              src={vendor.vendor.business_logo_url}
                              alt={vendor.vendor.business_name}
                              width={40}
                              height={40}
                              className="rounded-full border-2 border-gray-100"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {vendor.vendor.business_name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 line-clamp-1 text-lg group-hover:text-blue-600 transition-colors">
                              {vendor.title}
                            </h3>
                            <p className="text-sm text-gray-600 font-medium">
                              by {vendor.vendor.business_name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Rating and Reviews */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {renderStars(vendor.average_rating)}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            ({vendor.total_reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-full border border-blue-100">
                          <Clock className="h-3 w-3 mr-1 text-blue-500" />
                          {vendor.response_time_hours}h response
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {vendor.description}
                      </p>

                      {/* Location and Capacity */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-full border border-blue-100">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                          {vendor.vendor.city}, {vendor.vendor.state}
                        </div>
                        {vendor.max_capacity && (
                          <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-full border border-green-100">
                            <Users className="h-4 w-4 mr-2 text-green-500" />
                            Up to {vendor.max_capacity}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <Button 
                          variant="primary" 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          onClick={() => addToCart(vendor)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Get Quote
                        </Button>
                        <Button 
                          variant="outline"
                          className="p-3 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-500 rounded-xl transition-all duration-200"
                          onClick={() => router.push(`/vendor/${vendor.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    className="px-8 py-3"
                  >
                    Load More Vendors
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

