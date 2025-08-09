import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    console.log('--- Vendor Dashboard Data Fetch Start ---')
    
    // Get vendor token from cookies
    const vendorToken = request.cookies.get('vendorToken')?.value
    
    if (!vendorToken) {
      console.error('No vendor token found')
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify JWT token
    let decodedToken
    try {
      decodedToken = jwt.verify(vendorToken, process.env.JWT_SECRET!) as any
    } catch (error) {
      console.error('Token verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { userId, vendorId } = decodedToken
    console.log('Token verified for user:', userId, 'vendor:', vendorId)

    // Get vendor data
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        business_name,
        address,
        city,
        state,
        postal_code,
        description,
        verification_status,
        approved_at,
        created_at
      `)
      .eq('id', vendorId)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Get user data
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        full_name,
        email,
        phone,
        created_at
      `)
      .eq('id', userId)
      .single()

    if (userError || !userData) {
      console.error('User not found:', userId)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get service data
    const { data: serviceData, error: serviceError } = await supabaseAdmin
      .from('vendor_services')
      .select(`
        id,
        category_id,
        service_type,
        wedding_price_min,
        wedding_price_max,
        corporate_price_min,
        corporate_price_max,
        birthday_price_min,
        birthday_price_max,
        festival_price_min,
        festival_price_max,
        basic_package_price,
        standard_package_price,
        premium_package_price,
        advance_payment_percentage,
        cancellation_policy
      `)
      .eq('vendor_id', vendorId)
      .single()

    // Get category name if service exists
    let categoryName = null
    if (serviceData && !serviceError) {
      const { data: categoryData } = await supabaseAdmin
        .from('categories')
        .select('name')
        .eq('id', serviceData.category_id)
        .single()
      
      categoryName = categoryData?.name || 'Unknown Category'
    }

    console.log('--- Vendor Dashboard Data Fetch Success ---')
    return NextResponse.json({
      success: true,
      vendor: {
        id: vendorData.id,
        businessName: vendorData.business_name,
        address: vendorData.address,
        city: vendorData.city,
        state: vendorData.state,
        postalCode: vendorData.postal_code,
        description: vendorData.description,
        verificationStatus: vendorData.verification_status,
        approvedAt: vendorData.approved_at,
        createdAt: vendorData.created_at
      },
      user: {
        id: userData.id,
        fullName: userData.full_name,
        email: userData.email,
        phone: userData.phone,
        createdAt: userData.created_at
      },
      service: serviceData && !serviceError ? {
        id: serviceData.id,
        categoryId: serviceData.category_id,
        categoryName: categoryName,
        serviceType: serviceData.service_type,
        weddingPriceMin: serviceData.wedding_price_min,
        weddingPriceMax: serviceData.wedding_price_max,
        corporatePriceMin: serviceData.corporate_price_min,
        corporatePriceMax: serviceData.corporate_price_max,
        birthdayPriceMin: serviceData.birthday_price_min,
        birthdayPriceMax: serviceData.birthday_price_max,
        festivalPriceMin: serviceData.festival_price_min,
        festivalPriceMax: serviceData.festival_price_max,
        basicPackagePrice: serviceData.basic_package_price,
        standardPackagePrice: serviceData.standard_package_price,
        premiumPackagePrice: serviceData.premium_package_price,
        advancePaymentPercentage: serviceData.advance_payment_percentage,
        cancellationPolicy: serviceData.cancellation_policy
      } : null
    })

  } catch (error) {
    console.error('Vendor dashboard data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
