import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'
import { z } from 'zod'

const ServicesLocationSchema = z.object({
  vendorId: z.string().uuid(),
  // Location data
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  latitude: z.number(),
  longitude: z.number(),
  serviceAreaRadius: z.number().min(1).max(200),
  // Service data
  categoryId: z.string().uuid(),
  subcategory: z.string().optional(),
  secondaryServices: z.array(z.string()).optional(),
  serviceType: z.enum(['per_hour', 'per_day', 'per_event', 'custom_quote']),
  // Pricing
  weddingPriceMin: z.number().min(0).optional(),
  weddingPriceMax: z.number().min(0).optional(),
  corporatePriceMin: z.number().min(0).optional(),
  corporatePriceMax: z.number().min(0).optional(),
  birthdayPriceMin: z.number().min(0).optional(),
  birthdayPriceMax: z.number().min(0).optional(),
  festivalPriceMin: z.number().min(0).optional(),
  festivalPriceMax: z.number().min(0).optional(),
  // Packages
  basicPackagePrice: z.number().min(0).optional(),
  basicPackageDetails: z.string().optional(),
  standardPackagePrice: z.number().min(0).optional(),
  standardPackageDetails: z.string().optional(),
  premiumPackagePrice: z.number().min(0).optional(),
  premiumPackageDetails: z.string().optional(),
  // Additional
  additionalServices: z.array(z.string()).optional(),
  advancePaymentPercentage: z.number().min(0).max(100),
  cancellationPolicy: z.string().min(10, 'Cancellation policy is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ServicesLocationSchema.parse(body)

    // Verify vendor exists and is in correct step
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select('id, registration_step')
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    if (vendorData.registration_step !== 2) {
      return NextResponse.json(
        { error: 'Complete business authentication first' },
        { status: 400 }
      )
    }

    // Start transaction
    const { error: vendorUpdateError } = await supabase
      .from('vendors')
      .update({
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        postal_code: validatedData.postalCode,
        coordinates: `POINT(${validatedData.longitude} ${validatedData.latitude})`,
        service_area_radius: validatedData.serviceAreaRadius,
        registration_step: 3,
        verification_status: 'pending'
      })
      .eq('id', validatedData.vendorId)

    if (vendorUpdateError) throw vendorUpdateError

    // Insert service data
    const { error: serviceError } = await supabase
      .from('vendor_services')
      .insert({
        vendor_id: validatedData.vendorId,
        category_id: validatedData.categoryId,
        subcategory: validatedData.subcategory,
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
        basic_package_details: validatedData.basicPackageDetails,
        standard_package_price: validatedData.standardPackagePrice,
        standard_package_details: validatedData.standardPackageDetails,
        premium_package_price: validatedData.premiumPackagePrice,
        premium_package_details: validatedData.premiumPackageDetails,
        additional_services: validatedData.additionalServices || [],
        advance_payment_percentage: validatedData.advancePaymentPercentage,
        cancellation_policy: validatedData.cancellationPolicy
      })

    if (serviceError) throw serviceError

    return NextResponse.json({
      success: true,
      message: 'Registration completed. Pending admin approval.'
    })

  } catch (error) {
    console.error('Services location error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Services and location setup failed' },
      { status: 500 }
    )
  }
}