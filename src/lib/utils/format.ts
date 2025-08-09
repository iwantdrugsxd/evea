export const VENDOR_ROUTES = {
    DASHBOARD: '/vendor/dashboard',
    CARDS: '/vendor/cards',
    ORDERS: '/vendor/orders',
    CALENDAR: '/vendor/calendar',
    ANALYTICS: '/vendor/analytics',
    REVIEWS: '/vendor/reviews',
    MESSAGES: '/vendor/messages',
    EARNINGS: '/vendor/earnings',
    INVENTORY: '/vendor/inventory',
    REFUNDS: '/vendor/refunds',
    PROFILE: '/vendor/profile',
    SETTINGS: '/vendor/settings'
  }
  
  export const ORDER_STATUSES = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded'
  }
  
  export const PAYMENT_STATUSES = {
    PENDING: 'pending',
    ADVANCE_PAID: 'advance_paid',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded'
  }
  
  export const SERVICE_CATEGORIES = [
    { value: 'photography', label: 'Photography & Videography' },
    { value: 'catering', label: 'Catering Services' },
    { value: 'decoration', label: 'Decoration & Design' },
    { value: 'music', label: 'Music & Entertainment' },
    { value: 'venue', label: 'Venue & Locations' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'planning', label: 'Event Planning' },
    { value: 'beauty', label: 'Beauty & Wellness' }
  ]
  
  export const PRICE_TYPES = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'per_hour', label: 'Per Hour' },
    { value: 'per_day', label: 'Per Day' },
    { value: 'per_person', label: 'Per Person' },
    { value: 'custom', label: 'Custom Pricing' }
  ]