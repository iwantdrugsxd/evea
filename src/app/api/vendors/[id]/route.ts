import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log('--- Fetch Vendor Data Start ---')
    const { id } = await context.params
    console.log('Vendor ID:', id)

    // Get vendor data with user information
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        user_id,
        business_name,
        address,
        city,
        state,
        postal_code,
        description,
        verification_status,
        registration_step,
        created_at,
        updated_at,
        users!inner (
          id,
          email,
          full_name,
          phone,
          role,
          is_active,
          email_verified,
          created_at
        )
      `)
      .eq('id', id)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', id)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found:', vendorData.id)

    // Transform the data to flatten the user information
    const transformedData = {
      id: vendorData.id,
      user_id: vendorData.user_id,
      business_name: vendorData.business_name,
      address: vendorData.address,
      city: vendorData.city,
      state: vendorData.state,
      postal_code: vendorData.postal_code,
      description: vendorData.description,
      verification_status: vendorData.verification_status,
      registration_step: vendorData.registration_step,
      created_at: vendorData.created_at,
      updated_at: vendorData.updated_at,
      user: vendorData.users
    }

    console.log('--- Fetch Vendor Data Success ---')
    return NextResponse.json(transformedData)

  } catch (error) {
    console.error('Fetch vendor data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor data' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log('--- Update Vendor Data Start ---')
    const { id } = await context.params
    console.log('Vendor ID:', id)

    const body = await request.json()
    console.log('Update data:', body)

    // Update vendor data
    const { data: updatedVendor, error: updateError } = await supabaseAdmin
      .from('vendors')
      .update({
        business_name: body.business_name,
        address: body.address,
        city: body.city,
        state: body.state,
        postal_code: body.postal_code,
        description: body.description,
        registration_step: body.registration_step,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Failed to update vendor:', updateError)
      return NextResponse.json(
        { error: 'Failed to update vendor data' },
        { status: 500 }
      )
    }

    console.log('Vendor updated successfully:', updatedVendor.id)

    return NextResponse.json({
      success: true,
      message: 'Vendor data updated successfully',
      data: updatedVendor
    })

  } catch (error) {
    console.error('Update vendor data error:', error)
    return NextResponse.json(
      { error: 'Failed to update vendor data' },
      { status: 500 }
    )
  }
}
