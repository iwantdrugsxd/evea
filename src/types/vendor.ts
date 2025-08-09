export interface Vendor {
    id: string
    userId: string
    businessName: string
    businessType: string
    registrationNumber: string
    address: string
    city: string
    state: string
    postalCode: string
    description: string
    verificationStatus: 'pending' | 'verified' | 'rejected' | 'suspended'
    createdAt: string
    updatedAt: string
  }
  
  export interface VendorCard {
    id: string
    vendorId: string
    title: string
    description: string
    categoryId: string
    basePrice: number
    priceType: 'fixed' | 'per_hour' | 'per_day' | 'per_person' | 'custom'
    serviceArea: string[]
    maxCapacity: number
    minBookingTime: number
    maxBookingTime: number
    advanceBookingDays: number
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
  
  export interface VendorOrder {
    id: string
    orderNumber: string
    customerId: string
    vendorId: string
    eventDate: string
    eventTime: string
    eventLocation: string
    guestCount: number
    specialRequirements: string
    subtotal: number
    platformFee: number
    totalAmount: number
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
    paymentStatus: 'pending' | 'paid' | 'partially_paid' | 'failed' | 'refunded'
    createdAt: string
    updatedAt: string
  }