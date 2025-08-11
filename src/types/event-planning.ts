// Event Planning Types and Interfaces

export interface EventType {
  id: string
  name: string
  description: string
  icon: string
  estimatedBudget: {
    min: number
    max: number
  }
  typicalDuration: number
  guestCount: {
    min: number
    max: number
  }
  popularServices: string[]
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  parent_id?: string
  is_active: boolean
  sort_order: number
  subcategories?: ServiceCategory[]
}

export interface VendorCard {
  id: string
  vendor_id: string
  title: string
  description: string
  category_id: string
  subcategory_id?: string
  base_price: number
  starting_price?: number
  price_type: 'fixed' | 'per_hour' | 'per_day' | 'per_person' | 'custom'
  service_area: string[]
  max_capacity?: number
  min_booking_time?: number
  max_booking_time?: number
  advance_booking_days?: number
  cancellation_policy?: string
  inclusions?: string[]
  exclusions?: string[]
  equipment_provided?: string[]
  images?: string[]
  videos?: string[]
  is_active: boolean
  featured?: boolean
  average_rating?: number
  total_reviews?: number
  portfolio_images?: any
  simplified_price_type?: string
  created_at?: string
  updated_at?: string
}

export interface Vendor {
  id: string
  user_id: string
  business_name: string
  address: string
  city: string
  state: string
  postal_code: string
  description?: string
  verification_status: 'pending' | 'verified' | 'rejected' | 'suspended'
  gst_number?: string
  pan_number?: string
  aadhar_number?: string
  business_type?: string
  years_in_business?: string
  primary_contact_name?: string
  business_email?: string
  mobile_number?: string
  average_rating?: number
  total_reviews?: number
  service_area_radius?: number
  max_events_per_month?: number
  monthly_revenue_target?: number
  created_at?: string
  updated_at?: string
}

export interface Review {
  id: string
  order_id: string
  customer_id: string
  vendor_id: string
  rating: number
  title?: string
  comment?: string
  images?: string[]
  is_verified?: boolean
  helpful_count?: number
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  full_name?: string
  phone?: string
  role: 'customer' | 'vendor' | 'admin'
  is_active?: boolean
  email_verified?: boolean
  phone_verified?: boolean
  profile_completion_percentage?: number
  created_at?: string
  updated_at?: string
}

export interface EventPlanningData {
  eventType: EventType
  eventDetails: {
    date: string
    time: string
    duration: number
    location: string
    address: string
    guestCount: number
    budget: number
    specialRequirements?: string
  }
  selectedServices: ServiceCategory[]
  selectedVendors: VendorCard[]
  packageTotal: number
  recommendations: VendorCard[]
}

export interface EventPlanningStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
  component: string
}

export interface VendorRecommendation {
  vendorCard: VendorCard
  vendor: Vendor
  reviews: Review[]
  score: number
  reasons: string[]
  matchPercentage: number
}

export interface PackageItem {
  id: string
  serviceCategory: ServiceCategory
  vendorCard: VendorCard
  vendor: Vendor
  price: number
  quantity: number
  totalPrice: number
  customizations?: any
}

export interface EventPackage {
  id: string
  items: PackageItem[]
  subtotal: number
  platformFee: number
  taxAmount: number
  totalAmount: number
  savings: number
  estimatedSavings: number
}

export interface RecommendationFilters {
  budget: {
    min: number
    max: number
  }
  rating: number
  location: string
  availability: string
  features: string[]
}

export interface DragDropItem {
  id: string
  type: 'vendor' | 'service'
  data: VendorCard | ServiceCategory
  source: 'recommendations' | 'package'
}

// Event Planning State
export interface EventPlanningState {
  currentStep: number
  steps: EventPlanningStep[]
  eventData: EventPlanningData
  package: EventPackage
  recommendations: VendorRecommendation[]
  filters: RecommendationFilters
  loading: boolean
  error: string | null
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form Types
export interface EventDetailsForm {
  eventType: string
  date: string
  time: string
  duration: number
  location: string
  address: string
  guestCount: number
  budget: number
  specialRequirements?: string
}

export interface ServiceSelectionForm {
  selectedCategories: string[]
  selectedSubcategories: string[]
  priorityServices: string[]
}

// Utility Types
export type PriceRange = {
  min: number
  max: number
  currency: string
}

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable' | 'pending'

export type BookingStatus = 'available' | 'booked' | 'pending' | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'partially_paid' | 'failed' | 'refunded'

export type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'

// Event Planning Constants
export const EVENT_PLANNING_STEPS = [
  {
    id: 'event-type',
    title: 'Choose Event Type',
    description: 'Select the type of event you want to plan',
    component: 'EventTypeSelection'
  },
  {
    id: 'event-details',
    title: 'Event Details',
    description: 'Provide event details like date, time, location, and budget',
    component: 'EventDetailsForm'
  },
  {
    id: 'service-selection',
    title: 'Select Services',
    description: 'Choose the services you need for your event',
    component: 'ServiceSelection'
  },
  {
    id: 'vendor-selection',
    title: 'Choose Vendors',
    description: 'Select vendors for each service category',
    component: 'VendorSelection'
  },
  {
    id: 'package-review',
    title: 'Review Package',
    description: 'Review your complete event package',
    component: 'PackageReview'
  },
  {
    id: 'booking',
    title: 'Book & Pay',
    description: 'Complete your booking and payment',
    component: 'BookingConfirmation'
  }
]

export const EVENT_TYPES: EventType[] = [
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'Your special day with all the perfect details',
    icon: '💒',
    estimatedBudget: { min: 50000, max: 500000 },
    typicalDuration: 8,
    guestCount: { min: 50, max: 500 },
    popularServices: ['venue-location', 'catering-food', 'photography-videography', 'decoration-styling', 'entertainment']
  },
  {
    id: 'birthday-party',
    name: 'Birthday Party',
    description: 'Celebrate your special day in style',
    icon: '🎂',
    estimatedBudget: { min: 5000, max: 50000 },
    typicalDuration: 4,
    guestCount: { min: 10, max: 100 },
    popularServices: ['venue-location', 'catering-food', 'decoration-styling', 'entertainment']
  },
  {
    id: 'corporate-event',
    name: 'Corporate Event',
    description: 'Professional events for your business',
    icon: '🏢',
    estimatedBudget: { min: 10000, max: 100000 },
    typicalDuration: 6,
    guestCount: { min: 20, max: 200 },
    popularServices: ['venue-location', 'catering-food', 'technology-av', 'decoration-styling']
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    description: 'Celebrate your love and commitment',
    icon: '💕',
    estimatedBudget: { min: 15000, max: 100000 },
    typicalDuration: 6,
    guestCount: { min: 30, max: 150 },
    popularServices: ['venue-location', 'catering-food', 'photography-videography', 'decoration-styling']
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    description: 'Welcome the little one with joy',
    icon: '👶',
    estimatedBudget: { min: 8000, max: 40000 },
    typicalDuration: 4,
    guestCount: { min: 20, max: 80 },
    popularServices: ['venue-location', 'catering-food', 'decoration-styling', 'photography-videography']
  },
  {
    id: 'engagement',
    name: 'Engagement',
    description: 'The beginning of forever',
    icon: '💍',
    estimatedBudget: { min: 20000, max: 150000 },
    typicalDuration: 5,
    guestCount: { min: 50, max: 200 },
    popularServices: ['venue-location', 'catering-food', 'photography-videography', 'decoration-styling']
  },
  {
    id: 'graduation-party',
    name: 'Graduation Party',
    description: 'Celebrate academic achievements',
    icon: '🎓',
    estimatedBudget: { min: 10000, max: 60000 },
    typicalDuration: 5,
    guestCount: { min: 30, max: 120 },
    popularServices: ['venue-location', 'catering-food', 'decoration-styling', 'entertainment']
  },
  {
    id: 'house-warming',
    name: 'House Warming',
    description: 'Warm your new home with love',
    icon: '🏠',
    estimatedBudget: { min: 5000, max: 30000 },
    typicalDuration: 4,
    guestCount: { min: 20, max: 80 },
    popularServices: ['catering-food', 'decoration-styling', 'entertainment']
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Launch your product with impact',
    icon: '🚀',
    estimatedBudget: { min: 25000, max: 200000 },
    typicalDuration: 6,
    guestCount: { min: 50, max: 300 },
    popularServices: ['venue-location', 'technology-av', 'catering-food', 'photography-videography']
  },
  {
    id: 'conference',
    name: 'Conference',
    description: 'Professional conferences and seminars',
    icon: '🎤',
    estimatedBudget: { min: 30000, max: 300000 },
    typicalDuration: 8,
    guestCount: { min: 100, max: 500 },
    popularServices: ['venue-location', 'technology-av', 'catering-food', 'transportation']
  }
]

// Recommendation scoring weights
export const RECOMMENDATION_WEIGHTS = {
  rating: 0.3,
  priceMatch: 0.25,
  location: 0.2,
  availability: 0.15,
  reviews: 0.1
}

// Budget allocation percentages by service category
export const BUDGET_ALLOCATION = {
  'venue-location': 0.35,
  'catering-food': 0.25,
  'photography-videography': 0.15,
  'decoration-styling': 0.10,
  'entertainment': 0.08,
  'transportation': 0.05,
  'beauty-wellness': 0.02
}

// Default filters
export const DEFAULT_FILTERS: RecommendationFilters = {
  budget: { min: 0, max: 100000 },
  rating: 4,
  location: '',
  availability: 'available',
  features: []
}
