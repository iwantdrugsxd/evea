


import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const VerifyEmailSchema = z.object({
  token: z.string().uuid('Invalid verification token')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Email Verification Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = VerifyEmailSchema.parse(body)
    console.log('Token validated:', validatedData.token)

    // Find vendor by verification token
    console.log('Finding vendor by verification token...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        user_id,
        verification_token,
        registration_step
      `)
      .eq('verification_token', validatedData.token)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found for token:', validatedData.token)
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      )
    }

    console.log('Vendor found:', vendorData.id)

    // Check if already verified
    if (vendorData.registration_step >= 2) {
      console.log('Email already verified. Current step:', vendorData.registration_step)
      return NextResponse.json({
        success: true,
        message: 'Email already verified',
        registrationStep: vendorData.registration_step
      })
    }

    // Update user email verification status
    console.log('Updating user email verification status...')
    const { error: userUpdateError } = await supabaseAdmin
      .from('users')
      .update({
        email_verified: true
      })
      .eq('id', vendorData.user_id)

    if (userUpdateError) {
      console.error('Failed to update user:', userUpdateError)
      return NextResponse.json(
        { error: 'Email verification failed' },
        { status: 500 }
      )
    }

    console.log('User email verification updated')

    // Update vendor registration step
    console.log('Updating vendor registration step...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        registration_step: 2
      })
      .eq('id', vendorData.id)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Email verification failed' },
        { status: 500 }
      )
    }

    console.log('Vendor registration step updated to 2')

    console.log('--- Email Verification Success ---')
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      registrationStep: 2
    })

  } catch (error) {
    console.error('Email verification error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    )
  }
}

// GET method for email verification via link
export async function GET(request: NextRequest) {
  try {
    console.log('--- Email Verification via GET ---')
    
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    console.log('Token from URL:', token)

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Validate token format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token)) {
      return NextResponse.json(
        { error: 'Invalid verification token format' },
        { status: 400 }
      )
    }

    // Find vendor by verification token
    console.log('Finding vendor by verification token...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        user_id,
        verification_token,
        registration_step
      `)
      .eq('verification_token', token)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found for token:', token)
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      )
    }

    console.log('Vendor found:', vendorData.id)

    // Check if already verified
    if (vendorData.registration_step >= 2) {
      console.log('Email already verified. Current step:', vendorData.registration_step)
      return NextResponse.json({
        success: true,
        message: 'Email already verified',
        registrationStep: vendorData.registration_step
      })
    }

    // Update user email verification status
    console.log('Updating user email verification status...')
    const { error: userUpdateError } = await supabaseAdmin
      .from('users')
      .update({
        email_verified: true
      })
      .eq('id', vendorData.user_id)

    if (userUpdateError) {
      console.error('Failed to update user:', userUpdateError)
      return NextResponse.json(
        { error: 'Email verification failed' },
        { status: 500 }
      )
    }

    console.log('User email verification updated')

    // Update vendor registration step
    console.log('Updating vendor registration step...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        registration_step: 2
      })
      .eq('id', vendorData.id)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Email verification failed' },
        { status: 500 }
      )
    }

    console.log('Vendor registration step updated to 2')

    console.log('--- Email Verification Success ---')
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      registrationStep: 2
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    )
  }
}