import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'
import { createClient } from '@/lib/supabase/server'
import { uploadFile } from '@/lib/utils/upload'

export async function GET(request: NextRequest) {
  try {
    const vendorData = await verifyVendorToken(request)
    if (!vendorData) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    let query = supabase
      .from('vendor_cards')
      .select(`
        *,
        categories:category_id (name)
      `)
      .eq('vendor_id', vendorData.vendorId)
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (category && category !== 'all') {
      query = query.eq('category_id', category)
    }

    const { data: cards, error } = await query
      .range((page - 1) * limit, page * limit - 1)

    if (error) {
      throw error
    }

    return NextResponse.json({ cards })
  } catch (error) {
    console.error('Get cards error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const vendorData = await verifyVendorToken(request)
    if (!vendorData) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const cardData = {
      vendor_id: vendorData.vendorId,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category_id: formData.get('category') as string,
      base_price: parseFloat(formData.get('basePrice') as string),
      price_type: formData.get('priceType') as string,
      event_type_pricing: formData.get('eventTypePricing') ? JSON.parse(formData.get('eventTypePricing') as string) : null,
      service_area: formData.get('serviceArea') ? JSON.parse(formData.get('serviceArea') as string) : [],
      max_capacity: parseInt(formData.get('maxCapacity') as string),
      min_booking_time: parseInt(formData.get('minBookingTime') as string),
      max_booking_time: parseInt(formData.get('maxBookingTime') as string),
      advance_booking_days: parseInt(formData.get('advanceBookingDays') as string),
      inclusions: formData.get('inclusions') ? JSON.parse(formData.get('inclusions') as string) : [],
      exclusions: formData.get('exclusions') ? JSON.parse(formData.get('exclusions') as string) : [],
      equipment_provided: formData.get('equipmentProvided') ? JSON.parse(formData.get('equipmentProvided') as string) : [],
      cancellation_policy: formData.get('cancellationPolicy') as string,
      refund_policy: formData.get('refundPolicy') as string,
      working_days: formData.get('workingDays') ? JSON.parse(formData.get('workingDays') as string) : [],
      working_hours: formData.get('workingHours') ? JSON.parse(formData.get('workingHours') as string) : null,
      tags: formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [],
      seo_description: formData.get('seoDescription') as string,
      is_active: true
    } as any

    // Handle image uploads
    const images = formData.getAll('images') as File[]
    const imageUrls: string[] = []

    for (const image of images) {
      if (image.size > 0) {
        const url = await uploadFile(image, 'vendor-cards')
        imageUrls.push(url)
      }
    }

    cardData.images = imageUrls

    const supabase = createClient()
    const { data: card, error } = await supabase
      .from('vendor_cards')
      .insert(cardData)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ card }, { status: 201 })
  } catch (error) {
    console.error('Create card error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}