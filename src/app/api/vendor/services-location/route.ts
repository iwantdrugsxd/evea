import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const ServicesLocationSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
  latitude: z.number().min(-90).max(90, 'Invalid latitude'),
  longitude: z.number().min(-180).max(180, 'Invalid longitude'),
  categoryId: z.string().uuid('Invalid category ID'),
  serviceType: z.enum(['per_hour', 'per_day', 'per_event', 'custom_quote']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  weddingPriceMin: z.number().min(0, 'Wedding price must be non-negative').optional(),
  weddingPriceMax: z.number().min(0, 'Wedding price must be non-negative').optional(),
  corporatePriceMin: z.number().min(0, 'Corporate price must be non-negative').optional(),
  corporatePriceMax: z.number().min(0, 'Corporate price must be non-negative').optional(),
  birthdayPriceMin: z.number().min(0, 'Birthday price must be non-negative').optional(),
  birthdayPriceMax: z.number().min(0, 'Birthday price must be non-negative').optional(),
  festivalPriceMin: z.number().min(0, 'Festival price must be non-negative').optional(),
  festivalPriceMax: z.number().min(0, 'Festival price must be non-negative').optional(),
  basicPackagePrice: z.number().min(0, 'Basic package price must be non-negative').optional(),
  basicPackageDetails: z.string().optional(),
  standardPackagePrice: z.number().min(0, 'Standard package price must be non-negative').optional(),
  standardPackageDetails: z.string().optional(),
  premiumPackagePrice: z.number().min(0, 'Premium package price must be non-negative').optional(),
  premiumPackageDetails: z.string().optional(),
  additionalServices: z.array(z.string()).optional(),
  advancePaymentPercentage: z.number().min(0).max(100, 'Advance payment percentage must be between 0 and 100'),
  cancellationPolicy: z.string().min(10, 'Cancellation policy must be at least 10 characters')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Business Details & Services Setup Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = ServicesLocationSchema.parse(body)
    console.log('Data validated successfully')

    // Check if vendor exists and get current registration step
    console.log('Checking vendor status...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        user_id,
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

    console.log('Vendor found. Current step:', vendorData.registration_step)

    // Allow if registration step is 2 or higher (business details step)
    if (vendorData.registration_step < 2) {
      console.error('Invalid registration step. Expected: >= 2, Got:', vendorData.registration_step)
      return NextResponse.json(
        { error: 'Complete registration first' },
        { status: 400 }
      )
    }

    // If already completed step 3, return success
    if (vendorData.registration_step >= 3) {
      console.log('Business details already completed. Current step:', vendorData.registration_step)
      return NextResponse.json({
        success: true,
        message: 'Business details already completed',
        registrationStep: vendorData.registration_step
      })
    }

    // Update vendor with business details
    console.log('Updating vendor with business details...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        postal_code: validatedData.postalCode,
        coordinates: `(${validatedData.longitude},${validatedData.latitude})`,
        registration_step: 3 // Move to document upload step
      })
      .eq('id', validatedData.vendorId)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Failed to update business details' },
        { status: 500 }
      )
    }

    console.log('Vendor business details updated')

    // Insert vendor service
    console.log('Creating vendor service...')
    const { error: serviceError } = await supabaseAdmin
      .from('vendor_services')
      .insert({
        vendor_id: validatedData.vendorId,
        category_id: validatedData.categoryId,
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
        basic_package_details: validatedData.basicPackageDetails,
        standard_package_price: validatedData.standardPackagePrice,
        standard_package_details: validatedData.standardPackageDetails,
        premium_package_price: validatedData.premiumPackagePrice,
        premium_package_details: validatedData.premiumPackageDetails,
        additional_services: validatedData.additionalServices || [],
        advance_payment_percentage: validatedData.advancePaymentPercentage,
        cancellation_policy: validatedData.cancellationPolicy
      })

    if (serviceError) {
      console.error('Failed to create vendor service:', serviceError)
      return NextResponse.json(
        { error: 'Failed to create service details' },
        { status: 500 }
      )
    }

    console.log('Vendor service created successfully')

    console.log('--- Business Details & Services Setup Success ---')
    return NextResponse.json({
      success: true,
      message: 'Business details saved successfully. Please proceed to upload documents.',
      registrationStep: 3
    })

  } catch (error) {
    console.error('Business details error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to save business details' },
      { status: 500 }
    )
  }
}