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
    
    // Event planning specific parameters
    const eventDate = searchParams.get('eventDate')
    const guestCount = searchParams.get('guestCount')
    const budget = searchParams.get('budget')
    const services = searchParams.get('services')

    // Determine if this is an event planning request
    const isEventPlanning = eventDate || guestCount || budget || services

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
      eventDate,
      guestCount,
      budget,
      services,
      isEventPlanning
    })
    
    const supabase = createClient()
    
    // Build the query
    let query = supabase
      .from('vendor_cards')
      .select(`
        *,
        vendor:vendors!vendor_cards_vendor_id_fkey (
          id,
          business_name,
          city,
          state,
          verification_status
        ),
        category:categories!vendor_cards_category_id_fkey (
          id,
          name,
          slug,
          icon
        )
      `)
      .eq('is_active', true)

    // Apply filters
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
      // Temporarily disable search to ensure event planning works
      // query = query.ilike('title', `%${search}%`)
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

    if (location) {
      // Temporarily disable location filtering to fix the urgent error
      // query = query.or(`vendor.city.ilike.%${location}%`)
    }

    if (capacity) {
      query = query.gte('max_capacity', Number(capacity))
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (verified === 'true') {
      query = query.eq('vendor.verification_status', 'verified')
    }

    // Event planning specific filters
    if (isEventPlanning) {
      if (guestCount) {
        query = query.gte('max_capacity', Number(guestCount))
      }
      
      if (budget) {
        query = query.lte('base_price', Number(budget))
      }
      
      if (services) {
        const serviceSlugs = services.split(',').filter(Boolean)
        if (serviceSlugs.length > 0) {
          // Get category IDs from slugs for event planning
          const { data: categoryData } = await supabase
            .from('categories')
            .select('id')
            .in('slug', serviceSlugs)
          
          if (categoryData && categoryData.length > 0) {
            const categoryIds = categoryData.map(cat => cat.id)
            query = query.in('category_id', categoryIds)
          }
        }
      }
    }

    // Execute query with ordering and limit
    const { data: vendorCards, error } = await query
      .order('featured', { ascending: false })
      .order('average_rating', { ascending: false })
      .limit(isEventPlanning ? 50 : 100)

    if (error) {
      console.error('Error fetching vendors:', error)
      return NextResponse.json(
        { error: 'Failed to fetch vendors', details: error },
        { status: 500 }
      )
    }

    console.log(`Found ${vendorCards?.length || 0} vendors`)

    // Group by category for marketplace display
    const vendorsByCategory: { [key: string]: any } = {}
    vendorCards?.forEach((vendorCard) => {
      const categorySlug = vendorCard.category?.slug || 'unknown'
      if (!vendorsByCategory[categorySlug]) {
        vendorsByCategory[categorySlug] = {
          category: vendorCard.category,
          vendors: [],
          total: 0
        }
      }
      vendorsByCategory[categorySlug].vendors.push(vendorCard)
      vendorsByCategory[categorySlug].total += 1
    })

    // Return different response format based on request type
    if (isEventPlanning) {
      return NextResponse.json({
        vendorsByCategory,
        total: vendorCards?.length || 0,
        recommendations: vendorCards || [],
        eventPlanning: {
          eventType,
          eventDate,
          guestCount,
          budget,
          services: services ? services.split(',') : []
        }
      })
    } else {
      return NextResponse.json({
        vendorsByCategory,
        total: vendorCards?.length || 0,
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
          verified
        }
      })
    }

  } catch (error) {
    console.error('Error in vendors API:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    )
  }
}
