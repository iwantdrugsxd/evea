import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = params.id

    // Fetch vendor details with related data
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select(`
        *,
        vendor_cards (
          *,
          category:categories (
            id,
            name,
            slug,
            icon
          )
        )
      `)
      .eq('id', vendorId)
      .single()

    if (vendorError || !vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Fetch reviews for this vendor
    const { data: reviews } = await supabase
      .from('reviews')
      .select(`
        *,
        customer:users (
          id,
          full_name,
          email
        )
      `)
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false })
      .limit(10)

    // Fetch similar vendors (same category)
    const { data: similarVendors } = await supabase
      .from('vendors')
      .select(`
        id,
        business_name,
        average_rating,
        total_reviews,
        city,
        state
      `)
      .neq('id', vendorId)
      .limit(3)

    // Mock business hours (in a real app, this would come from a business_hours table)
    const businessHours = [
      { day: 'Monday', open_time: '9:00 AM', close_time: '6:00 PM' },
      { day: 'Tuesday', open_time: '9:00 AM', close_time: '6:00 PM' },
      { day: 'Wednesday', open_time: '9:00 AM', close_time: '6:00 PM' },
      { day: 'Thursday', open_time: '9:00 AM', close_time: '6:00 PM' },
      { day: 'Friday', open_time: '9:00 AM', close_time: '6:00 PM' },
      { day: 'Saturday', open_time: '10:00 AM', close_time: '4:00 PM' },
      { day: 'Sunday', open_time: 'Closed', close_time: 'Closed' }
    ]

    // Mock portfolio images (in a real app, this would come from an images table)
    const portfolioImages = [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'
    ]

    // Mock services (in a real app, this would come from a services table)
    const services = vendor.vendor_cards?.map(card => ({
      name: card.title,
      description: card.description,
      price: card.base_price,
      max_capacity: card.max_capacity,
      duration: 'Full Day'
    })) || []

    const vendorDetail = {
      id: vendor.id,
      business_name: vendor.business_name,
      business_type: vendor.business_type,
      address: vendor.address,
      city: vendor.city,
      state: vendor.state,
      postal_code: vendor.postal_code,
      description: vendor.description,
      average_rating: vendor.average_rating || 4.5,
      total_reviews: vendor.total_reviews || 0,
      verification_status: vendor.verification_status,
      business_logo_url: vendor.business_logo_url,
      portfolio_images: portfolioImages,
      services: services,
      reviews: reviews || [],
      business_hours: businessHours,
      similar_vendors: similarVendors || []
    }

    return NextResponse.json(vendorDetail)
  } catch (error) {
    console.error('Error fetching vendor details:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
