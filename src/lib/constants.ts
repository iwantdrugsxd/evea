export const APP_CONFIG = {
    name: 'Evea',
    tagline: 'Event Management',
    description: 'Professional Event Management Platform',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    author: 'Evea Team',
    version: '1.0.0',
    
    // Business Configuration
    platformFeePercentage: 5,
    currency: 'INR',
    defaultTimezone: 'Asia/Kolkata',
    
    // UI Configuration
    theme: {
      primary: '#ef4444',
      secondary: '#64748b',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    
    // Animation Configuration
    animations: {
      duration: {
        fast: 0.2,
        normal: 0.3,
        slow: 0.5,
      },
      easing: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }
    },
    
    // Pagination
    pagination: {
      defaultLimit: 12,
      maxLimit: 100,
    },
    
    // File Upload
    upload: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
      allowedDocumentTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    },
    
    // Search Configuration
    search: {
      debounceMs: 300,
      minQueryLength: 2,
      maxResults: 50,
    }
  }
  
  export const ROUTES = {
    // Public Routes
    HOME: '/',
    ABOUT: '/about',
    SERVICES: '/services',
    FEATURES: '/features',
    CONTACT: '/contact',
    MARKETPLACE: '/marketplace',
    
    // Auth Routes
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    
    // Customer Routes
    CUSTOMER_DASHBOARD: '/customer/dashboard',
    CUSTOMER_ORDERS: '/customer/orders',
    CUSTOMER_FAVORITES: '/customer/favorites',
    CUSTOMER_PROFILE: '/customer/profile',
    
    // Vendor Routes
    VENDOR_REGISTER: '/vendor/register',
    VENDOR_LOGIN: '/vendor/login',
    VENDOR_DASHBOARD: '/vendor/dashboard',
    VENDOR_CARDS: '/vendor/cards',
    VENDOR_ORDERS: '/vendor/orders',
    VENDOR_ANALYTICS: '/vendor/analytics',
    
    // Admin Routes
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_VENDORS: '/admin/vendors',
    ADMIN_USERS: '/admin/users',
    ADMIN_ORDERS: '/admin/orders',
    
    // API Routes
    API: {
      AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
      },
      VENDORS: '/api/vendors',
      VENDOR_CARDS: '/api/vendor-cards',
      ORDERS: '/api/orders',
      REVIEWS: '/api/reviews',
      CATEGORIES: '/api/categories',
    }
  } as const
  
  export const EVENT_TYPES = [
    { value: 'wedding', label: 'Wedding', icon: 'Heart' },
    { value: 'corporate', label: 'Corporate Event', icon: 'Building2' },
    { value: 'birthday', label: 'Birthday Party', icon: 'Cake' },
    { value: 'anniversary', label: 'Anniversary', icon: 'Gift' },
    { value: 'festival', label: 'Festival', icon: 'Sparkles' },
    { value: 'graduation', label: 'Graduation', icon: 'GraduationCap' },
    { value: 'baby_shower', label: 'Baby Shower', icon: 'Baby' },
    { value: 'retirement', label: 'Retirement Party', icon: 'Award' },
    { value: 'conference', label: 'Conference', icon: 'Presentation' },
    { value: 'workshop', label: 'Workshop', icon: 'Users' },
    { value: 'product_launch', label: 'Product Launch', icon: 'Rocket' },
    { value: 'charity', label: 'Charity Event', icon: 'HandHeart' },
  ] as const
  
  export const VENDOR_CATEGORIES = [
    { value: 'catering', label: 'Catering', icon: 'Utensils' },
    { value: 'photography', label: 'Photography', icon: 'Camera' },
    { value: 'decoration', label: 'Decoration', icon: 'Palette' },
    { value: 'music', label: 'Music & DJ', icon: 'Music' },
    { value: 'venue', label: 'Venue', icon: 'Building' },
    { value: 'transport', label: 'Transportation', icon: 'Car' },
    { value: 'entertainment', label: 'Entertainment', icon: 'Theater' },
    { value: 'makeup', label: 'Makeup & Beauty', icon: 'Sparkles' },
    { value: 'flowers', label: 'Flowers', icon: 'Flower' },
    { value: 'invitations', label: 'Invitations', icon: 'Mail' },
  ] as const
  
  export const PRICE_RANGES = [
    { value: '0-25000', label: 'Under ₹25,000', min: 0, max: 25000 },
    { value: '25000-50000', label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
    { value: '100000-250000', label: '₹1,00,000 - ₹2,50,000', min: 100000, max: 250000 },
    { value: '250000-500000', label: '₹2,50,000 - ₹5,00,000', min: 250000, max: 500000 },
    { value: '500000+', label: 'Above ₹5,00,000', min: 500000, max: Infinity },
  ] as const
  
  export const GUEST_COUNT_OPTIONS = [
    { value: '1-25', label: '1-25 guests' },
    { value: '26-50', label: '26-50 guests' },
    { value: '51-100', label: '51-100 guests' },
    { value: '101-250', label: '101-250 guests' },
    { value: '251-500', label: '251-500 guests' },
    { value: '500+', label: '500+ guests' },
  ] as const