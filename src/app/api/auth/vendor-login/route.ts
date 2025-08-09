import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    console.log('Data validated:', validatedData)

    // Find user by email
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        full_name,
        password_hash,
        role,
        is_active,
        email_verified
      `)
      .eq('email', validatedData.email)
      .single()

    if (userError || !userData) {
      console.error('User not found:', validatedData.email)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('User found:', userData.id, 'Role:', userData.role)

    // Check if user is a vendor
    if (userData.role !== 'vendor') {
      console.error('User is not a vendor:', userData.role)
      return NextResponse.json(
        { error: 'This login is only for vendors' },
        { status: 401 }
      )
    }

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
    const isPasswordValid = await bcrypt.compare(validatedData.password, userData.password_hash)
    
    if (!isPasswordValid) {
      console.error('Invalid password for user:', userData.id)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Get vendor data
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
      console.error('Vendor data not found for user:', userData.id)
      return NextResponse.json(
        { error: 'Vendor profile not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found:', vendorData.id, 'Status:', vendorData.verification_status)

    // Check if vendor is approved
    if (vendorData.verification_status !== 'approved') {
      console.error('Vendor not approved:', vendorData.verification_status)
      return NextResponse.json(
        { error: 'Your vendor account is pending approval. You will receive an email once approved.' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: userData.id,
        email: userData.email,
        role: userData.role,
        vendorId: vendorData.id
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // Create response with token cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name,
        role: userData.role
      },
      vendor: {
        id: vendorData.id,
        businessName: vendorData.business_name,
        verificationStatus: vendorData.verification_status
      }
    })

    // Set authentication cookie
    response.cookies.set('vendorToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
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