import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { uploadMultipleFiles } from '@/lib/utils/upload'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const formData = await request.formData()
    
    // Get user ID from form data (this should come from auth session in production)
    const userId = formData.get('vendorId') as string
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // First, get the actual vendor_id from the vendors table using user_id
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (vendorError || !vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found for this user' },
        { status: 404 }
      )
    }

    const vendorId = vendorData.id

    // Extract form data
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = formData.get('categoryId') as string
    const basePrice = parseFloat(formData.get('basePrice') as string) || 0
    const serviceArea = JSON.parse(formData.get('serviceArea') as string || '[]')
    const inclusions = JSON.parse(formData.get('inclusions') as string || '[]')
    const exclusions = JSON.parse(formData.get('exclusions') as string || '[]')

    // Handle file uploads
    const serviceImages = formData.getAll('serviceImages') as File[]
    const portfolioImages = formData.getAll('portfolioImages') as File[]

    // Upload images to Cloudinary
    let uploadedServiceImages: any[] = []
    let uploadedPortfolioImages: any[] = []

    try {
      if (serviceImages.length > 0) {
        console.log('Uploading service images to Cloudinary...')
        uploadedServiceImages = await uploadMultipleFiles(
          serviceImages,
          `vendor-cards/service-images/${vendorId}`
        )
      }

      if (portfolioImages.length > 0) {
        console.log('Uploading portfolio images to Cloudinary...')
        uploadedPortfolioImages = await uploadMultipleFiles(
          portfolioImages,
          `vendor-cards/portfolio-images/${vendorId}`
        )
      }
    } catch (error) {
      console.error('File upload error:', error)
      return NextResponse.json(
        { error: 'Failed to upload images', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      )
    }

    // Validate categoryId - if it's a number, we need to get the actual UUID
    let actualCategoryId = categoryId
    if (categoryId && !categoryId.includes('-')) {
      // If categoryId is a number, get the actual UUID from categories table
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('id', categoryId)
        .single()
      
      if (categoryError || !categoryData) {
        // If not found by ID, try to get the first category
        const { data: firstCategory } = await supabase
          .from('categories')
          .select('id')
          .limit(1)
          .single()
        
        if (!firstCategory) {
          return NextResponse.json(
            { error: 'No categories found in database' },
            { status: 400 }
          )
        }
        
        actualCategoryId = firstCategory.id
      } else {
        actualCategoryId = categoryData.id
      }
    }

    if (!actualCategoryId) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      )
    }

    // Create service card record with ONLY existing columns from the actual table
    const insertData = {
      vendor_id: vendorId,
      title: title || 'Untitled Service',
      description: description || '',
      category_id: actualCategoryId,
      base_price: basePrice || 0,
      price_type: 'fixed',
      service_area: serviceArea || ['General'],
      max_capacity: null,
      cancellation_policy: null,
      inclusions: inclusions || null,
      exclusions: exclusions || null,
      equipment_provided: null,
      images: uploadedServiceImages.map(img => img.url),
      videos: null,
      is_active: false,
      featured: false,
      average_rating: 0,
      total_reviews: 0,
      portfolio_images: uploadedPortfolioImages.map(img => img.url),
      starting_price: null,
      subcategory_id: null,
      simplified_price_type: 'starting_from',
      seo_description: null,
      insurance_coverage: null,
      certifications: null,
      experience_years: null,
      emergency_contact: null,
      tags: null
    }

    console.log('Inserting vendor card with data:', insertData)

    // Validate required fields
    if (!insertData.vendor_id || !insertData.title || !insertData.category_id) {
      return NextResponse.json(
        { error: 'Missing required fields: vendor_id, title, or category_id' },
        { status: 400 }
      )
    }

    const { data: serviceCard, error } = await supabase
      .from('vendor_cards')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Database insert error:', error)
      return NextResponse.json(
        { error: 'Failed to create service card', details: error.message },
        { status: 500 }
      )
    }

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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    let query = supabase
      .from('vendor_cards')
      .select('*')
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false })

    if (vendorId) {
      query = query.eq('vendor_id', vendorId)
    }
    
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data: serviceCards, error } = await query

    if (error) {
      console.error('Database query error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch service cards', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: serviceCards || [],
      pagination: {
        page,
        limit,
        total: serviceCards?.length || 0
      }
    })

  } catch (error) {
    console.error('Fetch service cards error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service cards' },
      { status: 500 }
    )
  }
}
