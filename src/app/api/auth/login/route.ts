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
    console.log('--- User Login Start ---')
    
    const body = await request.json()
    console.log('Login attempt for email:', body.email)
    
    const validatedData = LoginSchema.parse(body)
    console.log('Validated login data')

    // Find user by email
    console.log('Fetching user by email...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        password_hash,
        full_name,
        role,
        is_active,
        email_verified
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

    // Allow all roles to login through common portal
    // All users will be redirected to marketplace regardless of role

    // Check if account is active
    if (!userData.is_active) {
      console.error('Account is deactivated for user:', userData.id)
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // Check if email is verified
    if (!userData.email_verified) {
      console.error('Email not verified for user:', userData.id)
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
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

    // Generate JWT token
    console.log('Generating JWT token...')
    const token = jwt.sign(
      {
        userId: userData.id,
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
        firstName: userData.full_name?.split(' ')[0] || '',
        lastName: userData.full_name?.split(' ').slice(1).join(' ') || '',
        role: userData.role,
        isActive: userData.is_active,
        createdAt: new Date().toISOString()
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    console.log('--- User Login Success ---')
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
