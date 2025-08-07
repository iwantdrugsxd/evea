import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Vendor Login Start ---')
    
    const body = await request.json()
    console.log('Login attempt for email:', body.email)
    
    const validatedData = LoginSchema.parse(body)
    console.log('Validated login data')

    // Find user by email first
    console.log('Fetching user by email...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        password_hash,
        full_name,
        role,
        is_active
      `)
      .eq('email', validatedData.email)
      .single()

    if (userError || !userData) {
      console.error('User not found for email:', validatedData.email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('User found:', userData.full_name, 'Role:', userData.role)

    // Check if user is a vendor
    if (userData.role !== 'vendor') {
      console.error('User is not a vendor. Role:', userData.role)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if account is active
    if (!userData.is_active) {
      console.error('Account is deactivated for user:', userData.id)
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // Verify password
    console.log('Verifying password...')
    const isPasswordValid = await bcrypt.compare(
      validatedData.password, 
      userData.password_hash
    )

    if (!isPasswordValid) {
      console.error('Invalid password for user:', userData.id)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('Password verified successfully')

    // Get vendor data
    console.log('Fetching vendor data for user:', userData.id)
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        business_name,
        verification_status
      `)
      .eq('user_id', userData.id)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found for user:', userData.id)
      return NextResponse.json(
        { error: 'Vendor profile not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found:', vendorData.business_name)

    // Check vendor verification status
    if (vendorData.verification_status !== 'verified') {
      console.error('Vendor not verified. Status:', vendorData.verification_status)
      return NextResponse.json(
        { error: 'Vendor account not verified yet' },
        { status: 403 }
      )
    }

    console.log('Vendor verification status confirmed')

    // Generate JWT token
    console.log('Generating JWT token...')
    const token = jwt.sign(
      {
        userId: userData.id,
        vendorId: vendorData.id,
        email: userData.email,
        role: userData.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    console.log('JWT token generated successfully')

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name,
        role: userData.role,
        vendor: {
          id: vendorData.id,
          businessName: vendorData.business_name,
          verificationStatus: vendorData.verification_status
        }
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('vendorToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    console.log('--- Vendor Login Success ---')
    return response

  } catch (error) {
    console.error('Login error:', error)
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