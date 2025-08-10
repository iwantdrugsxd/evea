import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log('--- Fetch Vendor Details Start ---')
    const { id } = await context.params
    console.log('Vendor ID:', id)

    // Get comprehensive vendor data
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select('*')
      .eq('id', id)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', id)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Get vendor services
    const { data: services, error: servicesError } = await supabaseAdmin
      .from('vendor_services')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          description
        )
      `)
      .eq('vendor_id', id)
      .eq('is_active', true)

    // Get vendor cards
    const { data: cards, error: cardsError } = await supabaseAdmin
      .from('vendor_cards')
      .select('*')
      .eq('vendor_id', id)
      .eq('is_active', true)

    // Get vendor portfolio
    const { data: portfolio, error: portfolioError } = await supabaseAdmin
      .from('vendor_portfolio')
      .select('*')
      .eq('vendor_id', id)
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    // Get vendor business hours
    const { data: businessHours, error: hoursError } = await supabaseAdmin
      .from('vendor_business_hours')
      .select('*')
      .eq('vendor_id', id)
      .order('day_of_week', { ascending: true })

    // Get vendor verification documents
    const { data: documents, error: docsError } = await supabaseAdmin
      .from('vendor_verification_documents')
      .select('*')
      .eq('vendor_id', id)
      .eq('verification_status', 'verified')

    // Get reviews (paginated)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const { data: reviews, error: reviewsError, count } = await supabaseAdmin
      .from('reviews')
      .select(`
        *,
        users!inner (
          id,
          first_name,
          last_name,
          profile_picture_url
        )
      `, { count: 'exact' })
      .eq('vendor_id', id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Get similar vendors (same category, location, similar rating)
    const { data: similarVendors, error: similarError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        business_name,
        business_logo_url,
        average_rating,
        total_reviews,
        city,
        state,
        verification_status
      `)
      .eq('verification_status', 'verified')
      .eq('is_active', true)
      .neq('id', id)
      .in('city', [vendorData.city])
      .gte('average_rating', Math.max(0, vendorData.average_rating - 0.5))
      .lte('average_rating', Math.min(5, vendorData.average_rating + 0.5))
      .limit(6)

    // Transform the data
    const transformedData = {
      vendor: {
        id: vendorData.id,
        business_name: vendorData.business_name,
        business_type: vendorData.business_type,
        address: vendorData.address,
        city: vendorData.city,
        state: vendorData.state,
        postal_code: vendorData.postal_code,
        verification_status: vendorData.verification_status,
        created_at: vendorData.created_at,
        updated_at: vendorData.updated_at,
        user: null
      },
      services: services || [],
      cards: cards || [],
      portfolio: portfolio || [],
      business_hours: businessHours || [],
      verification_documents: documents || [],
      reviews: {
        data: reviews || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          total_pages: Math.ceil((count || 0) / limit)
        }
      },
      similar_vendors: similarVendors || []
    }

    console.log('--- Fetch Vendor Details Success ---')
    return NextResponse.json(transformedData)

  } catch (error) {
    console.error('Fetch vendor details error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor details' },
      { status: 500 }
    )
  }
}
