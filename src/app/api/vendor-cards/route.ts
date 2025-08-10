import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ServiceCard, ServiceCardFormData } from '@/types/card'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const formData = await request.formData()
    
    // Get vendor ID from session (you'll need to implement auth middleware)
    const vendorId = formData.get('vendorId') as string
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Extract form data
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = formData.get('categoryId') as string
    const subcategoryId = formData.get('subcategoryId') as string
    const tags = JSON.parse(formData.get('tags') as string || '[]')
    const seoKeywords = JSON.parse(formData.get('seoKeywords') as string || '[]')
    
    // Pricing
    const priceType = formData.get('priceType') as string
    const basePrice = parseFloat(formData.get('basePrice') as string)
    const priceRange = JSON.parse(formData.get('priceRange') as string || 'null')
    const packageTiers = JSON.parse(formData.get('packageTiers') as string || '[]')
    const addOnServices = JSON.parse(formData.get('addOnServices') as string || '[]')
    const promotionalOffers = JSON.parse(formData.get('promotionalOffers') as string || '[]')
    
    // Service specifications
    const serviceArea = JSON.parse(formData.get('serviceArea') as string || '[]')
    const capacity = JSON.parse(formData.get('capacity') as string || '{}')
    const duration = parseInt(formData.get('duration') as string)
    const advanceBookingDays = parseInt(formData.get('advanceBookingDays') as string)
    const equipmentProvided = JSON.parse(formData.get('equipmentProvided') as string || '[]')
    const inclusions = JSON.parse(formData.get('inclusions') as string || '[]')
    const exclusions = JSON.parse(formData.get('exclusions') as string || '[]')
    
    // Additional settings
    const isCustomizable = formData.get('isCustomizable') === 'true'
    const customizationOptions = JSON.parse(formData.get('customizationOptions') as string || '[]')
    const responseTime = parseInt(formData.get('responseTime') as string)
    const specialRequirements = formData.get('specialRequirements') as string

    // Handle file uploads
    const serviceImages = formData.getAll('serviceImages') as File[]
    const portfolioImages = formData.getAll('portfolioImages') as File[]
    const videos = formData.getAll('videos') as File[]

    // Upload images to storage
    const uploadedServiceImages = await Promise.all(
      serviceImages.map(async (file, index) => {
        const fileName = `service-images/${vendorId}/${Date.now()}-${index}-${file.name}`
        const { data, error } = await supabase.storage
          .from('vendor-cards')
          .upload(fileName, file)
        
        if (error) throw error
        
        return {
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vendor-cards/${fileName}`,
          altText: file.name,
          isPrimary: index === 0,
          order: index
        }
      })
    )

    const uploadedPortfolioImages = await Promise.all(
      portfolioImages.map(async (file, index) => {
        const fileName = `portfolio-images/${vendorId}/${Date.now()}-${index}-${file.name}`
        const { data, error } = await supabase.storage
          .from('vendor-cards')
          .upload(fileName, file)
        
        if (error) throw error
        
        return {
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vendor-cards/${fileName}`,
          altText: file.name,
          isPrimary: false,
          order: index
        }
      })
    )

    // Create service card record
    const { data: serviceCard, error } = await supabase
      .from('vendor_cards')
      .insert({
        vendor_id: vendorId,
        title,
        description,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        tags,
        seo_keywords: seoKeywords,
        price_type: priceType,
        base_price: basePrice,
        price_range: priceRange,
        package_tiers: packageTiers,
        add_on_services: addOnServices,
        promotional_offers: promotionalOffers,
        service_area: serviceArea,
        capacity,
        duration,
        advance_booking_days: advanceBookingDays,
        equipment_provided: equipmentProvided,
        inclusions,
        exclusions,
        service_images: uploadedServiceImages,
        portfolio_images: uploadedPortfolioImages,
        is_customizable: isCustomizable,
        customization_options: customizationOptions,
        response_time: responseTime,
        special_requirements: specialRequirements,
        status: 'draft',
        is_active: false
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: serviceCard,
      message: 'Service card created successfully'
    })

  } catch (error) {
    console.error('Create service card error:', error)
    return NextResponse.json(
      { error: 'Failed to create service card' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    
    const vendorId = searchParams.get('vendorId')
    const categoryId = searchParams.get('categoryId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    let query = supabase
      .from('vendor_cards')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name, business_type)
      `)
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false })

    if (vendorId) {
      query = query.eq('vendor_id', vendorId)
    }
    
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    
    if (status) {
      query = query.eq('status', status)
    }

    const { data: serviceCards, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: serviceCards,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Get service cards error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service cards' },
      { status: 500 }
    )
  }
}
