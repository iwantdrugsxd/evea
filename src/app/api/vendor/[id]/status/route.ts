import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: vendorId } = await params
    console.log('Looking for vendor with ID:', vendorId)

    // Find vendor by ID
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select(`
        id,
        user_id,
        business_name,
        verification_status,
        registration_step,
        created_at,
        updated_at
      `)
      .eq('id', vendorId)
      .single()

    if (vendorError) {
      console.error('Vendor query error:', vendorError)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    if (!vendor) {
      console.log('No vendor found with ID:', vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Found vendor:', vendor)

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        phone,
        email_verified,
        phone_verified
      `)
      .eq('id', vendor.user_id)
      .single()

    if (userError) {
      console.error('User query error:', userError)
      return NextResponse.json(
        { error: 'User not found for vendor' },
        { status: 404 }
      )
    }

    console.log('Found user:', user)

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        businessName: vendor.business_name,
        verificationStatus: vendor.verification_status,
        registrationStep: vendor.registration_step,
        createdAt: vendor.created_at,
        updatedAt: vendor.updated_at,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          phone: user.phone,
          emailVerified: user.email_verified,
          phoneVerified: user.phone_verified
        }
      }
    })

  } catch (error) {
    console.error('Vendor status error:', error)
    return NextResponse.json(
      { error: 'Failed to get vendor status' },
      { status: 500 }
    )
  }
}