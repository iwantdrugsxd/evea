import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getVendorId } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    
    // Get vendor ID from auth
    const vendorId = await getVendorId()
    if (!vendorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    
    // Extract form data
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const subcategory = formData.get('subcategory') as string
    const basePrice = Number(formData.get('basePrice'))
    const priceType = formData.get('priceType') as string
    const eventTypePricing = JSON.parse(formData.get('eventTypePricing') as string)
    const serviceArea = JSON.parse(formData.get('serviceArea') as string)
    const maxCapacity = Number(formData.get('maxCapacity'))
    const minBookingTime = Number(formData.get('minBookingTime'))
    const maxBookingTime = Number(formData.get('maxBookingTime'))
    const advanceBookingDays = Number(formData.get('advanceBookingDays'))
    const inclusions = JSON.parse(formData.get('inclusions') as string)
    const exclusions = JSON.parse(formData.get('exclusions') as string)
    const equipmentProvided = JSON.parse(formData.get('equipmentProvided') as string)
    const tags = JSON.parse(formData.get('tags') as string)
    const seoDescription = formData.get('seoDescription') as string
    const cancellationPolicy = formData.get('cancellationPolicy') as string
    const refundPolicy = formData.get('refundPolicy') as string
    const workingDays = JSON.parse(formData.get('workingDays') as string)
    const workingHours = JSON.parse(formData.get('workingHours') as string)

    // Handle new image uploads
    const newImages = formData.getAll('newImages') as File[]
    const existingImages = JSON.parse(formData.get('existingImages') as string)
    
    const imageUrls: string[] = [...existingImages]
    
    for (const image of newImages) {
      const fileName = `vendor-cards/${vendorId}/${Date.now()}-${image.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('vendor-assets')
        .upload(fileName, image)
      
      if (uploadError) {
        console.error('Image upload error:', uploadError)
        continue
      }
      
      const { data: publicUrl } = supabase.storage
        .from('vendor-assets')
        .getPublicUrl(fileName)
      
      imageUrls.push(publicUrl.publicUrl)
    }

    // Update service card record
    const { data: cardData, error: cardError } = await supabase
      .from('vendor_service_cards')
      .update({
        title,
        description,
        category,
        subcategory,
        base_price: basePrice,
        price_type: priceType,
        event_type_pricing: eventTypePricing,
        service_area: serviceArea,
        max_capacity: maxCapacity,
        min_booking_time: minBookingTime,
        max_booking_time: maxBookingTime,
        advance_booking_days: advanceBookingDays,
        inclusions,
        exclusions,
        equipment_provided: equipmentProvided,
        tags,
        seo_description: seoDescription,
        cancellation_policy: cancellationPolicy,
        refund_policy: refundPolicy,
        working_days: workingDays,
        working_hours: workingHours,
        images: imageUrls,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .eq('vendor_id', vendorId)
      .select()
      .single()

    if (cardError) {
      console.error('Database error:', cardError)
      return NextResponse.json({ error: 'Failed to update service card' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      card: cardData,
      message: 'Service card updated successfully' 
    })

  } catch (error) {
    console.error('Service card update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    
    // Get vendor ID from auth
    const vendorId = await getVendorId()
    if (!vendorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Soft delete - mark as inactive
    const { error } = await supabase
      .from('vendor_service_cards')
      .update({ 
        status: 'inactive',
        is_published: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .eq('vendor_id', vendorId)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete service card' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Service card deleted successfully' 
    })

  } catch (error) {
    console.error('Service card deletion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    
    const { data: card, error } = await supabase
      .from('vendor_service_cards')
      .select(`
        *,
        vendor:vendor_id(
          id, 
          business_name, 
          business_email, 
          business_phone,
          business_address,
          business_description,
          business_logo,
          rating,
          total_reviews
        )
      `)
      .eq('id', params.id)
      .eq('status', 'active')
      .eq('is_published', true)
      .single()

    if (error || !card) {
      return NextResponse.json({ error: 'Service card not found' }, { status: 404 })
    }

    return NextResponse.json({ card })

  } catch (error) {
    console.error('Service card fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
