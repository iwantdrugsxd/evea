import { SupabaseClient } from '@supabase/supabase-js'
import { ServiceCard, ServiceCardFormData, ServiceCardStats } from '@/types/card'

export class CardQueries {
  constructor(private supabase: SupabaseClient) {}

  // Create a new service card
  async createServiceCard(vendorId: string, cardData: Partial<ServiceCard>) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .insert({
        vendor_id: vendorId,
        title: cardData.title,
        description: cardData.description,
        category_id: cardData.categoryId,
        subcategory_id: cardData.subcategoryId,
        tags: cardData.tags || [],
        seo_keywords: cardData.seoKeywords || [],
        price_type: cardData.priceType,
        base_price: cardData.basePrice,
        price_range: cardData.priceRange,
        package_tiers: cardData.packageTiers || [],
        add_on_services: cardData.addOnServices || [],
        promotional_offers: cardData.promotionalOffers || [],
        service_area: cardData.serviceArea || [],
        capacity: cardData.capacity,
        duration: cardData.duration,
        advance_booking_days: cardData.advanceBookingDays,
        equipment_provided: cardData.equipmentProvided || [],
        inclusions: cardData.inclusions || [],
        exclusions: cardData.exclusions || [],
        service_images: cardData.serviceImages || [],
        portfolio_images: cardData.portfolioImages || [],
        videos: cardData.videos || [],
        is_customizable: cardData.isCustomizable || false,
        customization_options: cardData.customizationOptions || [],
        response_time: cardData.responseTime,
        special_requirements: cardData.specialRequirements,
        status: 'draft',
        is_active: false,
        featured: false,
        average_rating: 0,
        total_reviews: 0,
        total_views: 0,
        total_bookings: 0
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Update an existing service card
  async updateServiceCard(cardId: string, updates: Partial<ServiceCard>) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .update({
        title: updates.title,
        description: updates.description,
        category_id: updates.categoryId,
        subcategory_id: updates.subcategoryId,
        tags: updates.tags,
        seo_keywords: updates.seoKeywords,
        price_type: updates.priceType,
        base_price: updates.basePrice,
        price_range: updates.priceRange,
        package_tiers: updates.packageTiers,
        add_on_services: updates.addOnServices,
        promotional_offers: updates.promotionalOffers,
        service_area: updates.serviceArea,
        capacity: updates.capacity,
        duration: updates.duration,
        advance_booking_days: updates.advanceBookingDays,
        equipment_provided: updates.equipmentProvided,
        inclusions: updates.inclusions,
        exclusions: updates.exclusions,
        service_images: updates.serviceImages,
        portfolio_images: updates.portfolioImages,
        videos: updates.videos,
        is_customizable: updates.isCustomizable,
        customization_options: updates.customizationOptions,
        response_time: updates.responseTime,
        special_requirements: updates.specialRequirements,
        updated_at: new Date().toISOString()
      })
      .eq('id', cardId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Get service card by ID with full details
  async getServiceCardById(cardId: string) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          description,
          icon
        ),
        vendors (
          id,
          business_name,
          business_type,
          business_description,
          contact_email,
          contact_phone,
          business_address,
          business_city,
          business_state,
          business_country,
          business_pincode,
          business_website,
          business_logo,
          average_rating,
          total_reviews,
          total_orders,
          total_earnings,
          is_verified,
          is_featured
        )
      `)
      .eq('id', cardId)
      .single()

    if (error) throw error
    return data
  }

  // Get service cards by vendor ID
  async getServiceCardsByVendor(vendorId: string, options: {
    status?: string
    page?: number
    limit?: number
    categoryId?: string
  } = {}) {
    const { status, page = 1, limit = 10, categoryId } = options
    
    let query = this.supabase
      .from('vendor_cards')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          description
        )
      `)
      .eq('vendor_id', vendorId)
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error, count } = await query

    if (error) throw error

    return {
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  }

  // Get service cards by category
  async getServiceCardsByCategory(categoryId: string, options: {
    page?: number
    limit?: number
    status?: string
    vendorId?: string
    priceRange?: { min: number; max: number }
    serviceArea?: string[]
  } = {}) {
    const { page = 1, limit = 10, status = 'active', vendorId, priceRange, serviceArea } = options
    
    let query = this.supabase
      .from('vendor_cards')
      .select(`
        *,
        vendors (
          id,
          business_name,
          business_type,
          business_city,
          business_state,
          business_country,
          average_rating,
          total_reviews,
          total_orders,
          is_verified
        )
      `)
      .eq('category_id', categoryId)
      .eq('status', status)
      .eq('is_active', true)
      .range((page - 1) * limit, page * limit - 1)
      .order('featured', { ascending: false })
      .order('average_rating', { ascending: false })

    if (vendorId) {
      query = query.eq('vendor_id', vendorId)
    }

    if (priceRange) {
      query = query.gte('base_price', priceRange.min)
      if (priceRange.max > 0) {
        query = query.lte('base_price', priceRange.max)
      }
    }

    if (serviceArea && serviceArea.length > 0) {
      query = query.overlaps('service_area', serviceArea)
    }

    const { data, error, count } = await query

    if (error) throw error

    return {
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  }

  // Search service cards
  async searchServiceCards(searchTerm: string, options: {
    page?: number
    limit?: number
    categoryId?: string
    vendorId?: string
    priceRange?: { min: number; max: number }
    serviceArea?: string[]
    tags?: string[]
  } = {}) {
    const { page = 1, limit = 10, categoryId, vendorId, priceRange, serviceArea, tags } = options
    
    let query = this.supabase
      .from('vendor_cards')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          description
        ),
        vendors (
          id,
          business_name,
          business_type,
          business_city,
          business_state,
          business_country,
          average_rating,
          total_reviews,
          total_orders,
          is_verified
        )
      `)
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`)
      .eq('status', 'active')
      .eq('is_active', true)
      .range((page - 1) * limit, page * limit - 1)
      .order('featured', { ascending: false })
      .order('average_rating', { ascending: false })

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (vendorId) {
      query = query.eq('vendor_id', vendorId)
    }

    if (priceRange) {
      query = query.gte('base_price', priceRange.min)
      if (priceRange.max > 0) {
        query = query.lte('base_price', priceRange.max)
      }
    }

    if (serviceArea && serviceArea.length > 0) {
      query = query.overlaps('service_area', serviceArea)
    }

    if (tags && tags.length > 0) {
      query = query.overlaps('tags', tags)
    }

    const { data, error, count } = await query

    if (error) throw error

    return {
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  }

  // Get featured service cards
  async getFeaturedServiceCards(limit: number = 10) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          description
        ),
        vendors (
          id,
          business_name,
          business_type,
          business_city,
          business_state,
          business_country,
          average_rating,
          total_reviews,
          total_orders,
          is_verified
        )
      `)
      .eq('featured', true)
      .eq('status', 'active')
      .eq('is_active', true)
      .order('average_rating', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }

  // Update service card status
  async updateServiceCardStatus(cardId: string, status: string, isActive: boolean = false) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .update({
        status,
        is_active: isActive,
        updated_at: new Date().toISOString(),
        ...(status === 'active' && { published_at: new Date().toISOString() })
      })
      .eq('id', cardId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Delete service card
  async deleteServiceCard(cardId: string) {
    const { error } = await this.supabase
      .from('vendor_cards')
      .delete()
      .eq('id', cardId)

    if (error) throw error
    return true
  }

  // Get service card statistics for a vendor
  async getVendorCardStats(vendorId: string): Promise<ServiceCardStats> {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .select('status, total_views, total_bookings, average_rating, total_reviews')
      .eq('vendor_id', vendorId)

    if (error) throw error

    const stats: ServiceCardStats = {
      totalCards: data.length,
      activeCards: data.filter(card => card.status === 'active').length,
      draftCards: data.filter(card => card.status === 'draft').length,
      pendingCards: data.filter(card => card.status === 'pending').length,
      totalViews: data.reduce((sum, card) => sum + (card.total_views || 0), 0),
      totalBookings: data.reduce((sum, card) => sum + (card.total_bookings || 0), 0),
      averageRating: data.length > 0 
        ? data.reduce((sum, card) => sum + (card.average_rating || 0), 0) / data.length 
        : 0,
      totalReviews: data.reduce((sum, card) => sum + (card.total_reviews || 0), 0)
    }

    return stats
  }

  // Increment view count for a service card
  async incrementViewCount(cardId: string) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .update({
        total_views: this.supabase.sql`total_views + 1`,
        updated_at: new Date().toISOString()
      })
      .eq('id', cardId)
      .select('total_views')
      .single()

    if (error) throw error
    return data
  }

  // Update rating and review count
  async updateRatingStats(cardId: string, newRating: number) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .update({
        total_reviews: this.supabase.sql`total_reviews + 1`,
        average_rating: this.supabase.sql`(average_rating * total_reviews + ${newRating}) / (total_reviews + 1)`,
        updated_at: new Date().toISOString()
      })
      .eq('id', cardId)
      .select('average_rating, total_reviews')
      .single()

    if (error) throw error
    return data
  }

  // Get categories with subcategories
  async getCategoriesWithSubcategories() {
    const { data, error } = await this.supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        description,
        icon,
        is_active,
        sort_order,
        subcategories:categories!parent_id (
          id,
          name,
          slug,
          description,
          icon,
          is_active,
          sort_order
        )
      `)
      .is('parent_id', null)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  }

  // Get service areas (cities/states) for filtering
  async getServiceAreas() {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .select('service_area')
      .eq('status', 'active')
      .eq('is_active', true)

    if (error) throw error

    const areas = new Set<string>()
    data.forEach(card => {
      if (card.service_area) {
        card.service_area.forEach(area => areas.add(area))
      }
    })

    return Array.from(areas).sort()
  }

  // Get popular tags
  async getPopularTags(limit: number = 20) {
    const { data, error } = await this.supabase
      .from('vendor_cards')
      .select('tags')
      .eq('status', 'active')
      .eq('is_active', true)

    if (error) throw error

    const tagCounts: { [key: string]: number } = {}
    data.forEach(card => {
      if (card.tags) {
        card.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag]) => tag)
  }
}
