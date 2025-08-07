// src/types/index.ts

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  phone?: string
  role: 'customer' | 'vendor' | 'admin'
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Vendor {
  id: string
  userId: string
  businessName: string
  businessType: string
  description: string
  address: string
  city: string
  state: string
  postalCode: string
  website?: string
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'suspended'
  rating: number
  totalReviews: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  parentId?: string
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface VendorCard {
  id: string
  vendorId: string
  vendor?: Vendor
  title: string
  description: string
  categoryId: string
  category?: Category
  basePrice: number
  priceType: 'fixed' | 'per_hour' | 'per_day' | 'per_person' | 'custom'
  serviceArea: string[]
  maxCapacity?: number
  minBookingTime: number
  maxBookingTime: number
  advanceBookingDays: number
  cancellationPolicy: string
  inclusions: string[]
  exclusions: string[]
  equipmentProvided: string[]
  images: string[]
  videos: string[]
  isActive: boolean
  featured: boolean
  averageRating: number
  totalReviews: number
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customer?: User
  vendorId: string
  vendor?: Vendor
  eventDate: string
  eventTime?: string
  eventDuration?: number
  eventLocation: string
  guestCount?: number
  specialRequirements?: string
  subtotal: number
  platformFee: number
  taxAmount: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'partially_paid' | 'failed' | 'refunded'
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  vendorCardId: string
  vendorCard?: VendorCard
  quantity: number
  unitPrice: number
  totalPrice: number
  customizations?: Record<string, any>
  createdAt: string
}

export interface Review {
  id: string
  orderId: string
  customerId: string
  customer?: User
  vendorId: string
  vendor?: Vendor
  rating: number
  title?: string
  comment?: string
  images: string[]
  isVerified: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  sender?: User
  receiverId: string
  receiver?: User
  orderId?: string
  messageType: 'text' | 'image' | 'document' | 'system'
  content: string
  attachments: string[]
  isRead: boolean
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: 'order_created' | 'order_confirmed' | 'payment_received' | 'review_received' | 'message_received' | 'system_announcement'
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface CardProps {
  variant?: 'default' | 'elegant' | 'interactive'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'gray'
  children: React.ReactNode
  className?: string
}

export interface InputProps {
  label?: string
  error?: string
  help?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'tel' | 'url'
  required?: boolean
  disabled?: boolean
  className?: string
}

// Animation Types
export interface AnimationProps {
  delay?: number
  duration?: number
  distance?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Filter and Search Types
export interface SearchFilters {
  category?: string
  location?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  availability?: string
  sortBy?: 'price' | 'rating' | 'reviews' | 'newest'
  sortOrder?: 'asc' | 'desc'
}

export interface LocationData {
  city: string
  state: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// Event Planning Types
export interface EventPlanning {
  eventType: string
  eventDate: string
  guestCount: number
  budget: {
    min: number
    max: number
  }
  location: LocationData
  requirements: string[]
  selectedServices: string[]
  timeline: EventTimelineItem[]
}

export interface EventTimelineItem {
  id: string
  title: string
  description: string
  date: string
  time?: string
  duration?: number
  status: 'pending' | 'confirmed' | 'completed'
  vendorId?: string
  vendor?: Vendor
}

// Dashboard Types
export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  averageRating: number
  completedEvents: number
  pendingOrders: number
  monthlyGrowth: number
}

export interface AnalyticsData {
  period: string
  revenue: number[]
  orders: number[]
  customers: number[]
  labels: string[]
  topCategories: Array<{
    name: string
    value: number
    percentage: number
  }>
  topVendors: Array<{
    id: string
    name: string
    revenue: number
    orders: number
  }>
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  eventType?: string
  eventDate?: string
  budget?: string
}

export interface VendorRegistrationForm {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  
  // Business Information
  businessName: string
  businessType: string
  registrationNumber?: string
  taxId?: string
  description: string
  website?: string
  
  // Location
  address: string
  city: string
  state: string
  postalCode: string
  serviceAreas: string[]
  
  // Services
  categories: string[]
  services: string[]
  priceRange: {
    min: number
    max: number
  }
  
  // Documents
  documents: {
    businessLicense?: File
    taxCertificate?: File
    insuranceCertificate?: File
    identityProof?: File
  }
  
  // Agreement
  termsAccepted: boolean
  marketingConsent: boolean
}