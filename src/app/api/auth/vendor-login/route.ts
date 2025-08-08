import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const VendorLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Vendor Login Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = VendorLoginSchema.parse(body)
    console.log('Data validated successfully')

    // Find user by email
    console.log('Finding user by email...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        full_name,
        phone,
        password_hash,
        role,
        is_active,
        email_verified
      `)
      .eq('email', validatedData.email)
      .eq('role', 'vendor')
      .single()

    if (userError || !userData) {
      console.error('User not found or not a vendor:', validatedData.email)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('User found:', userData.id)

    // Check if user is active
    if (!userData.is_active) {
      console.error('User account is not active')
      return NextResponse.json(
        { error: 'Your account is not active. Please contact support.' },
        { status: 401 }
      )
    }

    // Check if email is verified
    if (!userData.email_verified) {
      console.error('Email not verified')
      return NextResponse.json(
        { error: 'Please verify your email address before logging in.' },
        { status: 401 }
      )
    }

    // Verify password
    console.log('Verifying password...')
    const isPasswordValid = await bcrypt.compare(validatedData.password, userData.password_hash)
    
    if (!isPasswordValid) {
      console.error('Invalid password')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('Password verified successfully')

    // Get vendor details
    console.log('Getting vendor details...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        business_name,
        verification_status,
        registration_step
      `)
      .eq('user_id', userData.id)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor details not found')
      return NextResponse.json(
        { error: 'Vendor profile not found' },
        { status: 404 }
      )
    }

    console.log('Vendor details found:', vendorData.id)

    // Check if vendor is approved
    if (vendorData.verification_status !== 'approved') {
      console.error('Vendor not approved. Status:', vendorData.verification_status)
      return NextResponse.json(
        { error: 'Your vendor account is pending approval. You will be notified once approved.' },
        { status: 401 }
      )
    }

    // Generate JWT token
    console.log('Generating JWT token...')
    const token = jwt.sign(
      {
        userId: userData.id,
        vendorId: vendorData.id,
        email: userData.email,
        role: userData.role,
        businessName: vendorData.business_name
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    console.log('JWT token generated')

    // Set vendor token cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
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
        verificationStatus: vendorData.verification_status,
        registrationStep: vendorData.registration_step
      }
    })

    // Set secure cookie
    response.cookies.set('vendorToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    console.log('--- Vendor Login Success ---')
    return response

  } catch (error) {
    console.error('Vendor login error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}