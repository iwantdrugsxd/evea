// src/app/api/vendor/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const VerifyEmailSchema = z.object({
  token: z.string().uuid('Invalid verification token')
})

// POST method for programmatic verification
export async function POST(request: NextRequest) {
  try {
    console.log('--- Email Verification POST Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = VerifyEmailSchema.parse(body)
    console.log('Token validated:', validatedData.token)

    const result = await verifyVendorEmail(validatedData.token)
    return NextResponse.json(result, { status: result.success ? 200 : 400 })

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

// GET method for email verification via link (when user clicks email button)
export async function GET(request: NextRequest) {
  try {
    console.log('--- Email Verification via GET ---')
    
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    console.log('Token from URL:', token)

    if (!token) {
      // Redirect to error page instead of returning JSON
      return NextResponse.redirect(
        new URL('/vendor/onboarding?error=missing_token', request.url)
      )
    }

    // Validate token format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token)) {
      return NextResponse.redirect(
        new URL('/vendor/onboarding?error=invalid_token', request.url)
      )
    }

    const result = await verifyVendorEmail(token)
    
    if (result.success) {
      // Determine next step based on registration step
      let redirectUrl = '/vendor/onboarding'
      
      switch (result.registrationStep) {
        case 2:
          // Email verified, go to business details/document upload
          redirectUrl = `/vendor/onboarding/business-details?vendorId=${result.vendorId}&step=2`
          break
        case 3:
          // Business details completed, go to service setup
          redirectUrl = `/vendor/onboarding/services?vendorId=${result.vendorId}&step=3`
          break
        case 4:
          // Service setup completed, go to verification pending
          redirectUrl = `/vendor/onboarding/verification-pending?vendorId=${result.vendorId}&step=4`
          break
        default:
          // Registration complete or unknown step
          redirectUrl = `/vendor/dashboard?verified=true`
          break
      }

      console.log('Redirecting to:', redirectUrl)
      const origin = new URL(request.url).origin
      return NextResponse.redirect(new URL(redirectUrl, origin))
    } else {
      return NextResponse.redirect(
        new URL(`/vendor/onboarding?error=${encodeURIComponent(result.message)}`, request.url)
      )
    }

  } catch (error) {
    console.error('Email verification GET error:', error)
    return NextResponse.redirect(
      new URL('/vendor/onboarding?error=verification_failed', request.url)
    )
  }
}

// Shared verification logic
async function verifyVendorEmail(token: string) {
  console.log('Starting email verification for token:', token)

  // Find user by verification token
  console.log('Finding user by verification token...')
  const { data: userData, error: userError } = await supabaseAdmin
    .from('users')
    .select(`
      id,
      email,
      verification_token,
      token_expires_at,
      email_verified
    `)
    .eq('verification_token', token)
    .single()

  if (userError || !userData) {
    console.error('User not found for token:', token)
    return {
      success: false,
      message: 'Invalid or expired verification token'
    }
  }

  console.log('User found:', userData.id, 'Email verified:', userData.email_verified)

  // Check if token is expired
  if (userData.token_expires_at && new Date(userData.token_expires_at) < new Date()) {
    console.error('Token expired:', userData.token_expires_at)
    return {
      success: false,
      message: 'Verification token has expired. Please request a new one.'
    }
  }

  // Check if already verified
  if (userData.email_verified) {
    console.log('Email already verified for user:', userData.id)
    return {
      success: false,
      message: 'Email is already verified'
    }
  }

  // Get vendor data for this user
  const { data: vendorData, error: vendorError } = await supabaseAdmin
    .from('vendors')
    .select(`
      id,
      user_id,
      registration_step,
      business_name
    `)
    .eq('user_id', userData.id)
    .single()

  if (vendorError || !vendorData) {
    console.error('Vendor not found for user:', userData.id)
    return {
      success: false,
      message: 'Vendor profile not found'
    }
  }

  console.log('Vendor found:', vendorData.id, 'Current step:', vendorData.registration_step)

  // Check if already at step 2 or higher
  if (vendorData.registration_step >= 2) {
    console.log('Registration already at step 2 or higher. Current step:', vendorData.registration_step)
    return {
      success: true,
      message: 'Email already verified',
      registrationStep: vendorData.registration_step,
      vendorId: vendorData.id,
      isAlreadyVerified: true
    }
  }

  // Update user email verification status and clear token
  console.log('Updating user email verification status...')
  const { error: userUpdateError } = await supabaseAdmin
    .from('users')
    .update({
      email_verified: true,
      verification_token: null, // Clear token after successful verification
      updated_at: new Date().toISOString()
    })
    .eq('id', userData.id)

  if (userUpdateError) {
    console.error('Failed to update user:', userUpdateError)
    return {
      success: false,
      message: 'Email verification failed - user update error'
    }
  }

  console.log('User email verification updated')

  // Update vendor registration step
  console.log('Updating vendor registration step to 2...')
  const { error: vendorUpdateError } = await supabaseAdmin
    .from('vendors')
    .update({
      registration_step: 2,
      email_verified_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', vendorData.id)

  if (vendorUpdateError) {
    console.error('Failed to update vendor:', vendorUpdateError)
    return {
      success: false,
      message: 'Email verification failed - vendor update error'
    }
  }

  console.log('Vendor registration step updated to 2')

  // Create notification for successful verification
  try {
    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: vendorData.user_id,
        type: 'email_verified',
        title: 'Email Verified Successfully',
        message: `Welcome to Evea! Your email has been verified. Complete your business profile to start receiving orders.`,
        data: {
          vendorId: vendorData.id,
          businessName: vendorData.business_name,
          nextStep: 'business_details'
        }
      })
  } catch (notificationError) {
    console.error('Failed to create notification:', notificationError)
    // Don't fail the verification for notification errors
  }

  console.log('--- Email Verification Success ---')
  return {
    success: true,
    message: 'Email verified successfully! You can now complete your vendor registration.',
    registrationStep: 2,
    vendorId: vendorData.id,
    nextStep: 'business_details'
  }
}