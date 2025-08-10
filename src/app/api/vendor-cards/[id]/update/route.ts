import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CardQueries } from '@/lib/database/queries/card-queries'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const cardQueries = new CardQueries(supabase)
    const cardId = params.id
    
    // Get vendor ID from session (implement auth middleware)
    const vendorId = request.headers.get('x-vendor-id') || request.nextUrl.searchParams.get('vendorId')
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Verify the service card exists and belongs to the vendor
    const { data: existingCard, error: cardError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id, status, title')
      .eq('id', cardId)
      .eq('vendor_id', vendorId)
      .single()

    if (cardError || !existingCard) {
      return NextResponse.json(
        { error: 'Service card not found or access denied' },
        { status: 404 }
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

    // Handle new file uploads
    const newServiceImages = formData.getAll('newServiceImages') as File[]
    const newPortfolioImages = formData.getAll('newPortfolioImages') as File[]
    const newVideos = formData.getAll('newVideos') as File[]
    
    // Get existing media to preserve
    const existingServiceImages = JSON.parse(formData.get('existingServiceImages') as string || '[]')
    const existingPortfolioImages = JSON.parse(formData.get('existingPortfolioImages') as string || '[]')
    const existingVideos = JSON.parse(formData.get('existingVideos') as string || '[]')

    // Upload new service images
    const uploadedNewServiceImages = await Promise.all(
      newServiceImages.map(async (file, index) => {
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
          isPrimary: false,
          order: existingServiceImages.length + index
        }
      })
    )

    // Upload new portfolio images
    const uploadedNewPortfolioImages = await Promise.all(
      newPortfolioImages.map(async (file, index) => {
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
          order: existingPortfolioImages.length + index
        }
      })
    )

    // Upload new videos
    const uploadedNewVideos = await Promise.all(
      newVideos.map(async (file, index) => {
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

    // Combine existing and new media
    const combinedServiceImages = [...existingServiceImages, ...uploadedNewServiceImages]
    const combinedPortfolioImages = [...existingPortfolioImages, ...uploadedNewPortfolioImages]
    const combinedVideos = [...existingVideos, ...uploadedNewVideos]

    // Update service card using CardQueries
    const updateData = {
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
      serviceImages: combinedServiceImages,
      portfolioImages: combinedPortfolioImages,
      videos: combinedVideos,
      isCustomizable,
      customizationOptions,
      responseTime,
      specialRequirements
    }

    const updatedCard = await cardQueries.updateServiceCard(cardId, updateData)

    // Log the update for analytics
    await supabase
      .from('vendor_card_activity_logs')
      .insert({
        vendor_id: vendorId,
        card_id: cardId,
        action: 'updated',
        details: {
          title,
          category: category.name,
          price_type: priceType,
          base_price: basePrice,
          previous_status: existingCard.status
        },
        ip_address: request.headers.get('x-forwarded-for') || request.ip,
        user_agent: request.headers.get('user-agent')
      })

    return NextResponse.json({
      success: true,
      data: updatedCard,
      message: 'Service card updated successfully'
    })

  } catch (error) {
    console.error('Update service card error:', error)
    return NextResponse.json(
      { error: 'Failed to update service card', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const cardQueries = new CardQueries(supabase)
    const cardId = params.id
    
    // Get vendor ID from session (implement auth middleware)
    const vendorId = request.headers.get('x-vendor-id') || request.nextUrl.searchParams.get('vendorId')
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Verify the service card exists and belongs to the vendor
    const { data: existingCard, error: cardError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id, title')
      .eq('id', cardId)
      .eq('vendor_id', vendorId)
      .single()

    if (cardError || !existingCard) {
      return NextResponse.json(
        { error: 'Service card not found or access denied' },
        { status: 404 }
      )
    }

    // Delete the service card
    await cardQueries.deleteServiceCard(cardId)

    // Log the deletion for analytics
    await supabase
      .from('vendor_card_activity_logs')
      .insert({
        vendor_id: vendorId,
        card_id: cardId,
        action: 'deleted',
        details: {
          title: existingCard.title
        },
        ip_address: request.headers.get('x-forwarded-for') || request.ip,
        user_agent: request.headers.get('user-agent')
      })

    return NextResponse.json({
      success: true,
      message: 'Service card deleted successfully'
    })

  } catch (error) {
    console.error('Delete service card error:', error)
    return NextResponse.json(
      { error: 'Failed to delete service card' },
      { status: 500 }
    )
  }
}
