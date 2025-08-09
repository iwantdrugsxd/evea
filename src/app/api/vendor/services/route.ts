import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import { sendEmail } from '@/lib/email/sender'

const VendorServicesSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  categoryId: z.string().uuid('Invalid category ID'),
  subcategory: z.string().optional(),
  secondaryServices: z.array(z.string()).optional(),
  serviceType: z.string().min(1, 'Service type is required'),
  weddingPriceMin: z.number().min(0, 'Wedding price must be positive'),
  weddingPriceMax: z.number().min(0, 'Wedding price must be positive'),
  corporatePriceMin: z.number().min(0, 'Corporate price must be positive'),
  corporatePriceMax: z.number().min(0, 'Corporate price must be positive'),
  birthdayPriceMin: z.number().min(0, 'Birthday price must be positive'),
  birthdayPriceMax: z.number().min(0, 'Birthday price must be positive'),
  festivalPriceMin: z.number().min(0, 'Festival price must be positive'),
  festivalPriceMax: z.number().min(0, 'Festival price must be positive'),
  basicPackagePrice: z.number().min(0, 'Basic package price must be positive'),
  basicPackageDetails: z.string().optional(),
  standardPackagePrice: z.number().min(0, 'Standard package price must be positive'),
  standardPackageDetails: z.string().optional(),
  premiumPackagePrice: z.number().min(0, 'Premium package price must be positive'),
  premiumPackageDetails: z.string().optional(),
  additionalServices: z.string().optional(),
  advancePaymentPercentage: z.number().min(0).max(100, 'Advance payment percentage must be between 0 and 100'),
  cancellationPolicy: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Vendor Services Setup Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = VendorServicesSchema.parse(body)
    console.log('Data validated:', validatedData)

    // Check if vendor exists and is at the correct step
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        user_id,
        business_name,
        registration_step,
        verification_status
      `)
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', validatedData.vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found:', vendorData.id, 'Current step:', vendorData.registration_step)

    // Check if vendor is at the correct step (should be step 3 after document upload)
    if (vendorData.registration_step < 3) {
      console.error('Vendor not at correct step:', vendorData.registration_step)
      return NextResponse.json(
        { error: 'Please complete the previous steps first' },
        { status: 400 }
      )
    }

    // Save vendor services
    console.log('Saving vendor services...')
    const { data: serviceData, error: serviceError } = await supabaseAdmin
      .from('vendor_services')
      .insert({
        vendor_id: validatedData.vendorId,
        category_id: validatedData.categoryId,
        subcategory: validatedData.subcategory || null,
        secondary_services: validatedData.secondaryServices || [],
        service_type: validatedData.serviceType,
        wedding_price_min: validatedData.weddingPriceMin,
        wedding_price_max: validatedData.weddingPriceMax,
        corporate_price_min: validatedData.corporatePriceMin,
        corporate_price_max: validatedData.corporatePriceMax,
        birthday_price_min: validatedData.birthdayPriceMin,
        birthday_price_max: validatedData.birthdayPriceMax,
        festival_price_min: validatedData.festivalPriceMin,
        festival_price_max: validatedData.festivalPriceMax,
        basic_package_price: validatedData.basicPackagePrice,
        basic_package_details: validatedData.basicPackageDetails || null,
        standard_package_price: validatedData.standardPackagePrice,
        standard_package_details: validatedData.standardPackageDetails || null,
        premium_package_price: validatedData.premiumPackagePrice,
        premium_package_details: validatedData.premiumPackageDetails || null,
        additional_services: validatedData.additionalServices || null,
        advance_payment_percentage: validatedData.advancePaymentPercentage,
        cancellation_policy: validatedData.cancellationPolicy || null
      })
      .select('id')
      .single()

    if (serviceError) {
      console.error('Failed to save vendor services:', serviceError)
      return NextResponse.json(
        { error: 'Failed to save services' },
        { status: 500 }
      )
    }

    console.log('Vendor services saved:', serviceData.id)

    // Update vendor registration step to 4 (pending approval)
    console.log('Updating vendor registration step to 4...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        registration_step: 4,
        verification_status: 'pending',
        updated_at: new Date().toISOString()
      })
      .eq('id', validatedData.vendorId)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Failed to update vendor status' },
        { status: 500 }
      )
    }

    // Get user email for notification
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('email, full_name')
      .eq('id', vendorData.user_id)
      .single()

    if (userError) {
      console.error('Failed to get user data:', userError)
    }

    // Create notification for admin
    try {
      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: null, // Admin notification
          type: 'vendor_registration',
          title: 'New Vendor Registration',
          message: `New vendor ${vendorData.business_name} has completed registration and is pending approval.`,
          data: {
            vendorId: vendorData.id,
            businessName: vendorData.business_name,
            userId: vendorData.user_id,
            userEmail: userData?.email || 'Unknown'
          }
        })
    } catch (notificationError) {
      console.error('Failed to create admin notification:', notificationError)
    }

    // Send email to vendor about pending approval
    if (userData?.email) {
      try {
        await sendEmail({
          to: userData.email,
          subject: 'Registration Complete - Pending Approval - Evea',
          template: 'vendor-registration-complete',
          data: {
            fullName: userData.full_name || 'Vendor',
            businessName: vendorData.business_name,
            supportEmail: 'support@evea.com'
          }
        })
      } catch (emailError) {
        console.error('Failed to send completion email:', emailError)
      }
    }

    console.log('--- Vendor Services Setup Success ---')
    return NextResponse.json({
      success: true,
      message: 'Services setup completed successfully. Your registration is now pending admin approval.',
      registrationStep: 4,
      vendorId: vendorData.id
    })

  } catch (error) {
    console.error('Vendor services setup error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to save services' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('--- Fetch Vendor Services Start ---')
    
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendorId')
    
    console.log('Vendor ID:', vendorId)

    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Get vendor services data
    const { data: serviceData, error: serviceError } = await supabaseAdmin
      .from('vendor_services')
      .select(`
        id,
        vendor_id,
        category_id,
        subcategory,
        secondary_services,
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
        basic_package_details,
        standard_package_price,
        standard_package_details,
        premium_package_price,
        premium_package_details,
        additional_services,
        advance_payment_percentage,
        cancellation_policy,
        created_at,
        updated_at
      `)
      .eq('vendor_id', vendorId)
      .single()

    if (serviceError && serviceError.code !== 'PGRST116') {
      console.error('Failed to fetch service data:', serviceError)
      return NextResponse.json(
        { error: 'Failed to fetch service data' },
        { status: 500 }
      )
    }

    console.log('Service data found:', serviceData?.id || 'No data')

    return NextResponse.json(serviceData || {})

  } catch (error) {
    console.error('Fetch vendor services error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor services' },
      { status: 500 }
    )
  }
}
