import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {
  EventPlanningState,
  EventPlanningData,
  EventType,
  ServiceCategory,
  VendorCard,
  Vendor,
  Review,
  VendorRecommendation,
  PackageItem,
  EventPackage,
  RecommendationFilters,
  EVENT_TYPES,
  EVENT_PLANNING_STEPS,
  DEFAULT_FILTERS,
  BUDGET_ALLOCATION
} from '@/types/event-planning'

interface EventPlanningActions {
  // Step management
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
  completeStep: (stepId: string) => void
  
  // Event data management
  setEventType: (eventType: EventType) => void
  setEventDetails: (details: EventPlanningData['eventDetails']) => void
  setSelectedServices: (services: ServiceCategory[]) => void
  setSelectedVendors: (vendors: VendorCard[]) => void
  updateEventData: (data: Partial<EventPlanningData>) => void
  
  // Package management
  addToPackage: (item: PackageItem) => void
  removeFromPackage: (itemId: string) => void
  updatePackageItem: (itemId: string, updates: Partial<PackageItem>) => void
  clearPackage: () => void
  calculatePackage: () => void
  
  // Recommendations
  setRecommendations: (recommendations: VendorRecommendation[]) => void
  addRecommendation: (recommendation: VendorRecommendation) => void
  removeRecommendation: (recommendationId: string) => void
  updateRecommendations: (updates: Partial<VendorRecommendation>[]) => void
  
  // Filters
  setFilters: (filters: Partial<RecommendationFilters>) => void
  resetFilters: () => void
  
  // Loading and error states
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Reset and clear
  resetEventPlanning: () => void
  clearEventData: () => void
}

const initialState: EventPlanningState = {
  currentStep: 0,
  steps: EVENT_PLANNING_STEPS.map((step, index) => ({
    ...step,
    isCompleted: false,
    isActive: index === 0
  })),
  eventData: {
    eventType: EVENT_TYPES[0],
    eventDetails: {
      date: '',
      time: '',
      duration: 4,
      location: '',
      address: '',
      guestCount: 50,
      budget: 50000,
      specialRequirements: ''
    },
    selectedServices: [],
    selectedVendors: [],
    packageTotal: 0,
    recommendations: []
  },
  package: {
    id: '',
    items: [],
    subtotal: 0,
    platformFee: 0,
    taxAmount: 0,
    totalAmount: 0,
    savings: 0,
    estimatedSavings: 0
  },
  recommendations: [],
  filters: DEFAULT_FILTERS,
  loading: false,
  error: null
}

export const useEventPlanningStore = create<EventPlanningState & EventPlanningActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Step management
        setCurrentStep: (step: number) => {
          set((state) => ({
            currentStep: step,
            steps: state.steps.map((s, index) => ({
              ...s,
              isActive: index === step
            }))
          }))
        },

        nextStep: () => {
          const { currentStep, steps } = get()
          if (currentStep < steps.length - 1) {
            get().setCurrentStep(currentStep + 1)
          }
        },

        previousStep: () => {
          const { currentStep } = get()
          if (currentStep > 0) {
            get().setCurrentStep(currentStep - 1)
          }
        },

        goToStep: (step: number) => {
          const { steps } = get()
          if (step >= 0 && step < steps.length) {
            get().setCurrentStep(step)
          }
        },

        completeStep: (stepId: string) => {
          set((state) => ({
            steps: state.steps.map((step) =>
              step.id === stepId ? { ...step, isCompleted: true } : step
            )
          }))
        },

        // Event data management
        setEventType: (eventType: EventType) => {
          set((state) => ({
            eventData: {
              ...state.eventData,
              eventType,
              eventDetails: {
                ...state.eventData.eventDetails,
                budget: eventType.estimatedBudget.min,
                guestCount: eventType.guestCount.min,
                duration: eventType.typicalDuration
              }
            }
          }))
        },

        setEventDetails: (details) => {
          set((state) => ({
            eventData: {
              ...state.eventData,
              eventDetails: { ...state.eventData.eventDetails, ...details }
            }
          }))
        },

        setSelectedServices: (services) => {
          set((state) => ({
            eventData: {
              ...state.eventData,
              selectedServices: services
            }
          }))
        },

        setSelectedVendors: (vendors) => {
          set((state) => ({
            eventData: {
              ...state.eventData,
              selectedVendors: vendors
            }
          }))
        },

        updateEventData: (data) => {
          set((state) => ({
            eventData: {
              ...state.eventData,
              ...data
            }
          }))
        },

        // Package management
        addToPackage: (item) => {
          set((state) => {
            const existingItemIndex = state.package.items.findIndex(
              (pkgItem) => pkgItem.serviceCategory.id === item.serviceCategory.id
            )

            let newItems
            if (existingItemIndex >= 0) {
              // Replace existing item
              newItems = [...state.package.items]
              newItems[existingItemIndex] = item
            } else {
              // Add new item
              newItems = [...state.package.items, item]
            }

            return {
              package: {
                ...state.package,
                items: newItems
              }
            }
          })
          get().calculatePackage()
        },

        removeFromPackage: (itemId) => {
          set((state) => ({
            package: {
              ...state.package,
              items: state.package.items.filter((item) => item.id !== itemId)
            }
          }))
          get().calculatePackage()
        },

        updatePackageItem: (itemId, updates) => {
          set((state) => ({
            package: {
              ...state.package,
              items: state.package.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item
              )
            }
          }))
          get().calculatePackage()
        },

        clearPackage: () => {
          set((state) => ({
            package: {
              ...state.package,
              items: [],
              subtotal: 0,
              platformFee: 0,
              taxAmount: 0,
              totalAmount: 0,
              savings: 0,
              estimatedSavings: 0
            }
          }))
        },

        calculatePackage: () => {
          set((state) => {
            const items = state.package.items
            const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
            const platformFee = Math.floor(subtotal * 0.1) // 10% platform fee
            const taxAmount = Math.floor(subtotal * 0.18) // 18% GST
            const totalAmount = subtotal + platformFee + taxAmount
            
            // Calculate estimated savings (assuming 15% savings from package deals)
            const estimatedSavings = Math.floor(subtotal * 0.15)
            
            return {
              package: {
                ...state.package,
                subtotal,
                platformFee,
                taxAmount,
                totalAmount,
                savings: estimatedSavings,
                estimatedSavings
              }
            }
          })
        },

        // Recommendations
        setRecommendations: (recommendations) => {
          set({ recommendations })
        },

        addRecommendation: (recommendation) => {
          set((state) => ({
            recommendations: [...state.recommendations, recommendation]
          }))
        },

        removeRecommendation: (recommendationId) => {
          set((state) => ({
            recommendations: state.recommendations.filter(
              (rec) => rec.vendorCard.id !== recommendationId
            )
          }))
        },

        updateRecommendations: (updates) => {
          set((state) => ({
            recommendations: state.recommendations.map((rec, index) =>
              updates[index] ? { ...rec, ...updates[index] } : rec
            )
          }))
        },

        // Filters
        setFilters: (filters) => {
          set((state) => ({
            filters: { ...state.filters, ...filters }
          }))
        },

        resetFilters: () => {
          set({ filters: DEFAULT_FILTERS })
        },

        // Loading and error states
        setLoading: (loading) => {
          set({ loading })
        },

        setError: (error) => {
          set({ error })
        },

        // Reset and clear
        resetEventPlanning: () => {
          set(initialState)
        },

        clearEventData: () => {
          set((state) => ({
            eventData: initialState.eventData,
            package: initialState.package,
            recommendations: []
          }))
        }
      }),
      {
        name: 'event-planning-storage',
        partialize: (state) => ({
          currentStep: state.currentStep,
          steps: state.steps,
          eventData: state.eventData,
          package: state.package,
          filters: state.filters
        })
      }
    ),
    {
      name: 'event-planning-store'
    }
  )
)

// Selectors for better performance
export const useEventPlanningSelectors = {
  currentStep: () => useEventPlanningStore((state) => state.currentStep),
  steps: () => useEventPlanningStore((state) => state.steps),
  eventData: () => useEventPlanningStore((state) => state.eventData),
  eventType: () => useEventPlanningStore((state) => state.eventData.eventType),
  eventDetails: () => useEventPlanningStore((state) => state.eventData.eventDetails),
  selectedServices: () => useEventPlanningStore((state) => state.eventData.selectedServices),
  selectedVendors: () => useEventPlanningStore((state) => state.eventData.selectedVendors),
  package: () => useEventPlanningStore((state) => state.package),
  packageItems: () => useEventPlanningStore((state) => state.package.items),
  packageTotal: () => useEventPlanningStore((state) => state.package.totalAmount),
  recommendations: () => useEventPlanningStore((state) => state.recommendations),
  filters: () => useEventPlanningStore((state) => state.filters),
  loading: () => useEventPlanningStore((state) => state.loading),
  error: () => useEventPlanningStore((state) => state.error),
  isStepCompleted: (stepId: string) =>
    useEventPlanningStore((state) => state.steps.find((s) => s.id === stepId)?.isCompleted || false),
  canProceedToNextStep: () =>
    useEventPlanningStore((state) => {
      const currentStep = state.steps[state.currentStep]
      return currentStep?.isCompleted || false
    })
}

// Utility functions
export const eventPlanningUtils = {
  // Calculate recommendation score
  calculateRecommendationScore: (
    vendorCard: VendorCard,
    vendor: Vendor,
    reviews: Review[],
    filters: RecommendationFilters,
    eventDetails: EventPlanningData['eventDetails']
  ): number => {
    let score = 0

    // Rating score (0-30 points)
    if (vendorCard.average_rating) {
      score += (vendorCard.average_rating / 5) * 30
    }

    // Price match score (0-25 points)
    const budgetAllocation = BUDGET_ALLOCATION[vendorCard.category_id as keyof typeof BUDGET_ALLOCATION] || 0.1
    const allocatedBudget = eventDetails.budget * budgetAllocation
    const priceDiff = Math.abs(vendorCard.base_price - allocatedBudget)
    const priceScore = Math.max(0, 25 - (priceDiff / allocatedBudget) * 25)
    score += priceScore

    // Location score (0-20 points)
    if (vendorCard.service_area.includes(eventDetails.location)) {
      score += 20
    } else if (vendorCard.service_area.some(area => 
      area.toLowerCase().includes(eventDetails.location.toLowerCase())
    )) {
      score += 15
    }

    // Availability score (0-15 points)
    // This would need to be calculated based on actual availability data
    score += 10 // Default score

    // Reviews score (0-10 points)
    const reviewScore = Math.min(10, (vendorCard.total_reviews || 0) / 10)
    score += reviewScore

    return Math.round(score)
  },

  // Get budget allocation for service category
  getBudgetAllocation: (categoryId: string): number => {
    return BUDGET_ALLOCATION[categoryId as keyof typeof BUDGET_ALLOCATION] || 0.1
  },

  // Format price
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  },

  // Calculate estimated savings
  calculateEstimatedSavings: (packageTotal: number, individualTotal: number): number => {
    return Math.max(0, individualTotal - packageTotal)
  },

  // Validate event details
  validateEventDetails: (details: EventPlanningData['eventDetails']): string[] => {
    const errors: string[] = []

    if (!details.date) errors.push('Event date is required')
    if (!details.time) errors.push('Event time is required')
    if (!details.location) errors.push('Event location is required')
    if (!details.address) errors.push('Event address is required')
    if (details.guestCount < 1) errors.push('Guest count must be at least 1')
    if (details.budget < 1000) errors.push('Budget must be at least ₹1,000')
    if (details.duration < 1) errors.push('Event duration must be at least 1 hour')

    return errors
  }
}
