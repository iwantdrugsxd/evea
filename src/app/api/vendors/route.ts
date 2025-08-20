import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get all query parameters
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const eventType = searchParams.get('eventType')
    const rating = searchParams.get('rating')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const location = searchParams.get('location')
    const capacity = searchParams.get('capacity')
    const featured = searchParams.get('featured')
    const verified = searchParams.get('verified')
    const sortBy = searchParams.get('sortBy') || 'relevance'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit
    
    // Event planning specific parameters
    const eventDate = searchParams.get('eventDate')
    const guestCount = searchParams.get('guestCount')
    const budget = searchParams.get('budget')
    const services = searchParams.get('services')

    console.log('Vendors API called with params:', {
      category,
      search,
      eventType,
      rating,
      minPrice,
      maxPrice,
      location,
      capacity,
      featured,
      verified,
      sortBy,
      page,
      limit,
      eventDate,
      guestCount,
      budget,
      services
    })
    
    const supabase = createClient()
    
    // Build query with basic fields
    let query = supabase
      .from('vendor_cards')
      .select('id, title, description, base_price, featured, average_rating, total_reviews')

    // Apply basic filters
    if (category) {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single()
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id)
      }
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (rating) {
      query = query.gte('average_rating', Number(rating))
    }

    if (minPrice) {
      query = query.gte('base_price', Number(minPrice))
    }

    if (maxPrice) {
      query = query.lte('base_price', Number(maxPrice))
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        query = query.order('average_rating', { ascending: false })
        break
      case 'price_low':
        query = query.order('base_price', { ascending: true })
        break
      case 'price_high':
        query = query.order('base_price', { ascending: false })
        break
      case 'name':
        query = query.order('title', { ascending: true })
        break
      case 'popularity':
        query = query.order('total_reviews', { ascending: false })
        break
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      default:
        // Relevance: combination of rating and reviews
        query = query.order('average_rating', { ascending: false })
          .order('total_reviews', { ascending: false })
    }

    // Apply pagination
    query = query.limit(limit)

    const { data: vendors, error } = await query

    console.log('Vendors query result:', { vendors: vendors?.length, error })

    if (error) {
      console.error('Error fetching vendors:', error)
      return NextResponse.json(
        { error: 'Failed to fetch vendors', details: error },
        { status: 500 }
      )
    }

    // Transform the data to match the expected format
    const transformedVendors = vendors?.map(vendor => ({
      id: vendor.id,
      title: vendor.title,
      description: vendor.description,
      base_price: vendor.base_price,
      price_range_min: null,
      price_range_max: null,
      average_rating: vendor.average_rating || 0,
      total_reviews: vendor.total_reviews || 0,
      total_orders: 0, // total_orders column doesn't exist in vendor_cards table
      max_capacity: null,
      featured: vendor.featured || false,
      images: [],
      videos: [],
      inclusions: [],
      exclusions: [],
      service_area: [],
      response_time_hours: 24,
      vendor: {
        id: 'vendor-id',
        business_name: 'Vendor Name',
        business_logo_url: null,
        city: 'City',
        state: 'State',
        verification_status: 'verified',
        verification_tier: 'premium',
        portfolio_quality_score: 85
      },
      category: {
        id: 'category-id',
        name: 'Category',
        slug: 'category',
        icon: null
      }
    })) || []

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('vendor_cards')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      vendors: transformedVendors,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      },
      filters: {
        category,
        search,
        eventType,
        rating,
        minPrice,
        maxPrice,
        location,
        capacity,
        featured,
        verified,
        sortBy
      }
    })

  } catch (error) {
    console.error('Error in vendors API:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
