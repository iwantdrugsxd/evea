import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '@/lib/email/sender'

const VendorRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Vendor Registration Start ---')
    
    const body = await request.json()
    console.log('Registration request for:', body.email)
    
    const validatedData = VendorRegistrationSchema.parse(body)
    console.log('Data validated successfully')

    // Check if user already exists
    console.log('Checking if user exists...')
    const { data: existingUser, error: userCheckError } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('email', validatedData.email)
      .single()

    if (existingUser) {
      console.log('User already exists:', existingUser.email)
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    // Check if vendor business already exists
    console.log('Checking if business name exists...')
    const { data: existingVendor, error: vendorCheckError } = await supabaseAdmin
      .from('vendors')
      .select('id, business_name')
      .eq('business_name', validatedData.businessName)
      .single()

    if (existingVendor) {
      console.log('Business name already exists:', existingVendor.business_name)
      return NextResponse.json(
        { error: 'A business with this name already exists' },
        { status: 400 }
      )
    }

    // Hash password
    console.log('Hashing password...')
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(validatedData.password, saltRounds)

    // Generate verification token
    const verificationToken = uuidv4()
    console.log('Generated verification token')

    // Create user record
    console.log('Creating user record...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email: validatedData.email,
        password_hash: passwordHash,
        full_name: validatedData.fullName,
        phone: validatedData.phone,
        role: 'vendor',
        is_active: true,
        email_verified: false,
        verification_token: verificationToken,
        token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        created_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Registration failed - user creation error' },
        { status: 500 }
      )
    }

    console.log('User created successfully:', userData.id)

    // Create vendor record
    console.log('Creating vendor record...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .insert({
        user_id: userData.id,
        business_name: validatedData.businessName,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        postal_code: validatedData.postalCode,
        verification_status: 'pending',
        registration_step: 1, // Start at step 1 (email verification)
        created_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (vendorError) {
      console.error('Vendor creation error:', vendorError)
      // Cleanup user record if vendor creation fails
      await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', userData.id)
      
      return NextResponse.json(
        { error: 'Registration failed - vendor creation error' },
        { status: 500 }
      )
    }

    console.log('Vendor created successfully:', vendorData.id)

    // Send verification email
    console.log('Sending verification email...')
    try {
      // Build verification URL using current request origin to avoid wrong port issues
      const origin = (() => {
        try { return new URL(request.url).origin } catch { return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' }
      })()
      const verificationUrl = `${origin}/api/vendor/verify-email?token=${verificationToken}`
      
      await sendEmail({
        to: validatedData.email,
        subject: 'Verify Your Vendor Account - Evea',
        template: 'vendor-verification',
        data: {
          fullName: validatedData.fullName,
          businessName: validatedData.businessName,
          verificationUrl,
          supportEmail: process.env.SUPPORT_EMAIL || 'support@evea.com'
        }
      })
      
      console.log('Verification email sent successfully')
    } catch (emailError: any) {
      console.error('Failed to send verification email:', emailError)
      
      // Create notification in database about email failure
      try {
        await supabaseAdmin
          .from('notifications')
          .insert({
            user_id: userData.id,
            type: 'system_announcement',
            title: 'Email Verification Issue',
            message: 'There was an issue sending your verification email. Please contact support.',
            data: {
              vendorId: vendorData.id,
              verificationToken,
              emailError: emailError?.message || 'Unknown error'
            }
          })
      } catch (notificationError) {
        console.error('Failed to create notification:', notificationError)
      }
      
      // Don't fail the registration, but inform the user
      return NextResponse.json({
        success: true,
        vendorId: vendorData.id,
        userId: userData.id,
        registrationStep: 1,
        message: 'Registration successful, but there was an issue sending the verification email. Please contact support.',
        emailIssue: true
      })
    }

    // Log successful registration for analytics
    console.log('--- Vendor Registration Success ---')
    console.log('User ID:', userData.id)
    console.log('Vendor ID:', vendorData.id)
    console.log('Business Name:', validatedData.businessName)
    console.log('Email:', validatedData.email)

    return NextResponse.json({
      success: true,
      vendorId: vendorData.id,
      userId: userData.id,
      registrationStep: 1,
      message: 'Registration successful! Please check your email to verify your account and continue the registration process.',
      verificationEmailSent: true
    })

  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Registration failed - internal server error' },
      { status: 500 }
    )
  }
}