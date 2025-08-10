export interface ServiceCard {
  id: string
  vendorId: string
  title: string
  description: string
  categoryId: string
  subcategoryId?: string
  tags: string[]
  seoKeywords: string[]
  
  // Pricing & Packages
  priceType: 'fixed' | 'per_hour' | 'per_day' | 'per_person' | 'package'
  basePrice: number
  priceRange?: {
    min: number
    max: number
  }
  packageTiers?: PackageTier[]
  addOnServices?: AddOnService[]
  promotionalOffers?: PromotionalOffer[]
  
  // Service Specifications
  serviceArea: string[]
  capacity: {
    min: number
    max: number
  }
  duration: number // in hours
  advanceBookingDays: number
  equipmentProvided: string[]
  inclusions: string[]
  exclusions: string[]
  
  // Media & Portfolio
  serviceImages: ServiceImage[]
  portfolioImages: ServiceImage[]
  videos: ServiceVideo[]
  
  // Additional Settings
  isCustomizable: boolean
  customizationOptions?: string[]
  responseTime: number // hours
  specialRequirements?: string
  
  // Status & Metadata
  status: 'draft' | 'pending' | 'active' | 'inactive' | 'rejected'
  isActive: boolean
  featured: boolean
  averageRating: number
  totalReviews: number
  totalViews: number
  totalBookings: number
  
  // Timestamps
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface PackageTier {
  id: string
  name: string
  description: string
  price: number
  inclusions: string[]
  isPopular?: boolean
}

export interface AddOnService {
  id: string
  name: string
  description: string
  price: number
  isRequired: boolean
}

export interface PromotionalOffer {
  id: string
  title: string
  description: string
  discountPercentage: number
  validFrom: string
  validUntil: string
  isActive: boolean
}

export interface ServiceImage {
  id: string
  url: string
  altText: string
  description?: string
  isPrimary: boolean
  order: number
}

export interface ServiceVideo {
  id: string
  url: string
  title: string
  description?: string
  thumbnailUrl?: string
  duration?: number
}

export interface ServiceCardFormData {
  // Step 1: Basic Information
  title: string
  description: string
  categoryId: string
  subcategoryId?: string
  tags: string[]
  seoKeywords: string[]
  
  // Step 2: Pricing & Packages
  priceType: 'fixed' | 'per_hour' | 'per_day' | 'per_person' | 'package'
  basePrice: number
  priceRange?: {
    min: number
    max: number
  }
  packageTiers: PackageTier[]
  addOnServices: AddOnService[]
  promotionalOffers: PromotionalOffer[]
  
  // Step 3: Service Specifications
  serviceArea: string[]
  capacity: {
    min: number
    max: number
  }
  duration: number
  advanceBookingDays: number
  equipmentProvided: string[]
  inclusions: string[]
  exclusions: string[]
  
  // Step 4: Media & Portfolio
  serviceImages: File[]
  portfolioImages: File[]
  videos: File[]
  
  // Step 5: Additional Settings
  isCustomizable: boolean
  customizationOptions: string[]
  responseTime: number
  specialRequirements: string
}

export interface ServiceCardValidationErrors {
  [key: string]: string
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
  subcategories?: Category[]
}

export interface ServiceCardStats {
  totalCards: number
  activeCards: number
  draftCards: number
  pendingCards: number
  totalViews: number
  totalBookings: number
  averageRating: number
  totalReviews: number
}
