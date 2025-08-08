import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    console.log('--- Vendor Dashboard Start ---')
    
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
      console.log('Token verified for user:', decodedToken.userId)
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError)
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      )
    }

    // Check if user is a vendor
    if (decodedToken.role !== 'vendor') {
      console.error('User is not a vendor. Role:', decodedToken.role)
      return NextResponse.json(
        { error: 'Access denied. Vendor account required.' },
        { status: 403 }
      )
    }

    // Get user details
    console.log('Fetching user details...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        full_name,
        phone,
        role,
        is_active
      `)
      .eq('id', decodedToken.userId)
      .single()

    if (userError || !userData) {
      console.error('User not found:', decodedToken.userId)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('User found:', userData.email)

    // Check if user is active
    if (!userData.is_active) {
      console.error('User account is not active')
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // Get vendor details
    console.log('Fetching vendor details...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        business_name,
        address,
        city,
        state,
        postal_code,
        verification_status,
        registration_step
      `)
      .eq('user_id', userData.id)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found for user:', userData.id)
      return NextResponse.json(
        { error: 'Vendor profile not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found:', vendorData.business_name)

    // Get vendor services
    console.log('Fetching vendor services...')
    const { data: servicesData, error: servicesError } = await supabaseAdmin
      .from('vendor_services')
      .select(`
        id,
        category_id,
        service_type,
        description,
        wedding_price_min,
        wedding_price_max,
        corporate_price_min,
        corporate_price_max,
        birthday_price_min,
        birthday_price_max,
        festival_price_min,
        festival_price_max,
        basic_package_price,
        basic_package_details,
        standard_package_price,
        standard_package_details,
        premium_package_price,
        premium_package_details,
        additional_services,
        advance_payment_percentage,
        cancellation_policy,
        categories (
          id,
          name
        )
      `)
      .eq('vendor_id', vendorData.id)

    if (servicesError) {
      console.error('Failed to fetch services:', servicesError)
      // Don't fail the request, just return empty services
    }

    console.log('Services fetched:', servicesData?.length || 0)

    // Format services data
    const formattedServices = servicesData?.map(service => ({
      id: service.id,
      categoryId: service.category_id,
      categoryName: service.categories?.name || 'Unknown Category',
      serviceType: service.service_type,
      description: service.description,
      weddingPriceMin: service.wedding_price_min,
      weddingPriceMax: service.wedding_price_max,
      corporatePriceMin: service.corporate_price_min,
      corporatePriceMax: service.corporate_price_max,
      birthdayPriceMin: service.birthday_price_min,
      birthdayPriceMax: service.birthday_price_max,
      festivalPriceMin: service.festival_price_min,
      festivalPriceMax: service.festival_price_max,
      basicPackagePrice: service.basic_package_price,
      basicPackageDetails: service.basic_package_details,
      standardPackagePrice: service.standard_package_price,
      standardPackageDetails: service.standard_package_details,
      premiumPackagePrice: service.premium_package_price,
      premiumPackageDetails: service.premium_package_details,
      additionalServices: service.additional_services || [],
      advancePaymentPercentage: service.advance_payment_percentage,
      cancellationPolicy: service.cancellation_policy
    })) || []

    console.log('--- Vendor Dashboard Success ---')
    return NextResponse.json({
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name,
        phone: userData.phone,
        role: userData.role
      },
      vendor: {
        id: vendorData.id,
        businessName: vendorData.business_name,
        address: vendorData.address,
        city: vendorData.city,
        state: vendorData.state,
        postalCode: vendorData.postal_code,
        verificationStatus: vendorData.verification_status,
        registrationStep: vendorData.registration_step
      },
      services: formattedServices
    })

  } catch (error) {
    console.error('Vendor dashboard error:', error)
    return NextResponse.json(
      { error: 'Failed to load vendor dashboard' },
      { status: 500 }
    )
  }
}
