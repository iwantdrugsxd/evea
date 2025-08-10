import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CardQueries } from '@/lib/database/queries/card-queries'
import { ServiceCardFormData } from '@/types/card'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const cardQueries = new CardQueries(supabase)
    
    // Get vendor ID from session (implement auth middleware)
    const vendorId = request.headers.get('x-vendor-id') || request.nextUrl.searchParams.get('vendorId')
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Verify vendor exists and is active
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('id, business_name, is_active, is_verified')
      .eq('id', vendorId)
      .single()

    if (vendorError || !vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    if (!vendor.is_active) {
      return NextResponse.json(
        { error: 'Vendor account is not active' },
        { status: 403 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    
    // Extract basic information
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = formData.get('categoryId') as string
    const subcategoryId = formData.get('subcategoryId') as string
    const tags = JSON.parse(formData.get('tags') as string || '[]')
    const seoKeywords = JSON.parse(formData.get('seoKeywords') as string || '[]')
    
    // Extract pricing information
    const priceType = formData.get('priceType') as 'fixed' | 'per_hour' | 'per_day' | 'per_person' | 'package'
    const basePrice = parseFloat(formData.get('basePrice') as string)
    const priceRange = JSON.parse(formData.get('priceRange') as string || 'null')
    const packageTiers = JSON.parse(formData.get('packageTiers') as string || '[]')
    const addOnServices = JSON.parse(formData.get('addOnServices') as string || '[]')
    const promotionalOffers = JSON.parse(formData.get('promotionalOffers') as string || '[]')
    
    // Extract service specifications
    const serviceArea = JSON.parse(formData.get('serviceArea') as string || '[]')
    const capacity = JSON.parse(formData.get('capacity') as string || '{}')
    const duration = parseInt(formData.get('duration') as string)
    const advanceBookingDays = parseInt(formData.get('advanceBookingDays') as string)
    const equipmentProvided = JSON.parse(formData.get('equipmentProvided') as string || '[]')
    const inclusions = JSON.parse(formData.get('inclusions') as string || '[]')
    const exclusions = JSON.parse(formData.get('exclusions') as string || '[]')
    
    // Extract additional settings
    const isCustomizable = formData.get('isCustomizable') === 'true'
    const customizationOptions = JSON.parse(formData.get('customizationOptions') as string || '[]')
    const responseTime = parseInt(formData.get('responseTime') as string)
    const specialRequirements = formData.get('specialRequirements') as string

    // Validate required fields
    if (!title || !description || !categoryId || !priceType || !basePrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate category exists
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id, name')
      .eq('id', categoryId)
      .eq('is_active', true)
      .single()

    if (categoryError || !category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Handle file uploads
    const serviceImages = formData.getAll('serviceImages') as File[]
    const portfolioImages = formData.getAll('portfolioImages') as File[]
    const videos = formData.getAll('videos') as File[]

    // Upload service images
    const uploadedServiceImages = await Promise.all(
      serviceImages.map(async (file, index) => {
        const fileName = `service-images/${vendorId}/${Date.now()}-${index}-${file.name}`
        const { data, error } = await supabase.storage
          .from('vendor-cards')
          .upload(fileName, file)
        
        if (error) throw error
        
        return {
          id: `${Date.now()}-${index}`,
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vendor-cards/${fileName}`,
          altText: file.name,
          description: '',
          isPrimary: index === 0,
          order: index
        }
      })
    )

    // Upload portfolio images
    const uploadedPortfolioImages = await Promise.all(
      portfolioImages.map(async (file, index) => {
        const fileName = `portfolio-images/${vendorId}/${Date.now()}-${index}-${file.name}`
        const { data, error } = await supabase.storage
          .from('vendor-cards')
          .upload(fileName, file)
        
        if (error) throw error
        
        return {
          id: `${Date.now()}-${index}`,
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vendor-cards/${fileName}`,
          altText: file.name,
          description: '',
          isPrimary: false,
          order: index
        }
      })
    )

    // Upload videos
    const uploadedVideos = await Promise.all(
      videos.map(async (file, index) => {
        const fileName = `videos/${vendorId}/${Date.now()}-${index}-${file.name}`
        const { data, error } = await supabase.storage
          .from('vendor-cards')
          .upload(fileName, file)
        
        if (error) throw error
        
        return {
          id: `${Date.now()}-${index}`,
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vendor-cards/${fileName}`,
          title: file.name,
          description: '',
          thumbnailUrl: '',
          duration: 0
        }
      })
    )

    // Create service card using CardQueries
    const serviceCardData = {
      title,
      description,
      categoryId,
      subcategoryId,
      tags,
      seoKeywords,
      priceType,
      basePrice,
      priceRange,
      packageTiers,
      addOnServices,
      promotionalOffers,
      serviceArea,
      capacity,
      duration,
      advanceBookingDays,
      equipmentProvided,
      inclusions,
      exclusions,
      serviceImages: uploadedServiceImages,
      portfolioImages: uploadedPortfolioImages,
      videos: uploadedVideos,
      isCustomizable,
      customizationOptions,
      responseTime,
      specialRequirements
    }

    const serviceCard = await cardQueries.createServiceCard(vendorId, serviceCardData)

    // Log the creation for analytics
    await supabase
      .from('vendor_card_activity_logs')
      .insert({
        vendor_id: vendorId,
        card_id: serviceCard.id,
        action: 'created',
        details: {
          title,
          category: category.name,
          price_type: priceType,
          base_price: basePrice
        },
        ip_address: request.headers.get('x-forwarded-for') || request.ip,
        user_agent: request.headers.get('user-agent')
      })

    return NextResponse.json({
      success: true,
      data: serviceCard,
      message: 'Service card created successfully and saved as draft'
    })

  } catch (error) {
    console.error('Create service card error:', error)
    return NextResponse.json(
      { error: 'Failed to create service card', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const cardQueries = new CardQueries(supabase)
    
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendorId')
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Get vendor's service cards
    const result = await cardQueries.getServiceCardsByVendor(vendorId, {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      status: searchParams.get('status') || undefined,
      categoryId: searchParams.get('categoryId') || undefined
    })

    return NextResponse.json({
      success: true,
      ...result
    })

  } catch (error) {
    console.error('Get vendor cards error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor cards' },
      { status: 500 }
    )
  }
}
