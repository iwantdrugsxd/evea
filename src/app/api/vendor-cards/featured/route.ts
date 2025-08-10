import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('--- Fetch Featured Vendor Cards Start ---')
    
    // Get featured vendor cards with vendor details
    const { data: vendorCards, error } = await supabaseAdmin
      .from('vendor_cards')
      .select(`
        *,
        vendors!inner (
          id,
          business_name,
          business_type,
          city,
          state,
          verification_status
        ),
        categories!vendor_cards_category_id_fkey (
          id,
          name,
          slug,
          description
        )
      `)
      .eq('is_active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error fetching featured vendor cards:', error)
      return NextResponse.json(
        { error: 'Failed to fetch vendor cards' },
        { status: 500 }
      )
    }

    console.log(`Found ${vendorCards?.length || 0} featured vendor cards`)
    
    // Transform data to match VendorCard interface
    const transformedCards = vendorCards?.map(card => ({
      id: card.id,
      vendorId: card.vendor_id,
      title: card.title,
      description: card.description,
      categoryId: card.category_id,
      basePrice: card.base_price,
      priceType: card.price_type,
      serviceArea: card.service_area || [],
      maxCapacity: card.max_capacity,
      minBookingTime: card.min_booking_time,
      maxBookingTime: card.max_booking_time,
      advanceBookingDays: card.advance_booking_days,
      inclusions: card.inclusions || [],
      exclusions: card.exclusions || [],
      equipmentProvided: card.equipment_provided || [],
      images: card.images || [],
      videos: card.videos || [],
      isActive: card.is_active,
      featured: card.featured,
      averageRating: card.average_rating || 0,
      totalReviews: card.total_reviews || 0,
      createdAt: card.created_at,
      updatedAt: card.updated_at,
      vendor: {
        businessName: card.vendors.business_name,
        city: card.vendors.city,
        state: card.vendors.state,
        rating: card.average_rating || 0,
        totalReviews: card.total_reviews || 0
      },
      category: card.categories?.name || 'General'
    })) || []

    return NextResponse.json(transformedCards)
    
  } catch (error) {
    console.error('Unexpected error in featured vendor cards API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
