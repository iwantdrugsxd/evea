import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { z } from 'zod'

const GoogleAuthSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    picture: z.string().optional()
  })
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Google Authentication Start ---')
    
    let body
    try {
      body = await request.json()
      console.log('Request body:', body)
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError)
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      )
    }
    
    const validatedData = GoogleAuthSchema.parse(body)
    console.log('Data validated successfully')

    // Check if user already exists
    console.log('Checking if user already exists...')
    const { data: existingUser, error: userCheckError } = await supabaseAdmin
      .from('users')
      .select('id, email_verified, role')
      .eq('email', validatedData.user.email)
      .single()

    if (existingUser) {
      console.log('User already exists:', existingUser)
      
      // Generate JWT token for existing user
      const jwt = require('jsonwebtoken')
      const token = jwt.sign(
        {
          userId: existingUser.id,
          email: validatedData.user.email,
          role: existingUser.role
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      )

      // Create response with cookie
      const response = NextResponse.json({
        success: true,
        message: 'Google authentication successful',
        user: {
          id: existingUser.id,
          email: validatedData.user.email,
          firstName: validatedData.user.firstName,
          lastName: validatedData.user.lastName,
          role: existingUser.role,
          isActive: true,
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

      return response
    }

    console.log('User does not exist, creating new user...')

    // Generate a random password for Google users
    const randomPassword = crypto.randomBytes(32).toString('hex')
    const passwordHash = await bcrypt.hash(randomPassword, 10)

    // Create user
    console.log('Creating user...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        full_name: `${validatedData.user.firstName} ${validatedData.user.lastName}`,
        email: validatedData.user.email,
        phone: 'Not provided', // Google users might not have phone
        password_hash: passwordHash,
        role: 'customer',
        is_active: true,
        email_verified: true, // Google emails are pre-verified
        profile_picture: validatedData.user.picture || null
      })
      .select('id, email, full_name, role')
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      )
    }

    console.log('User created successfully:', userData.id)

    // Send welcome email
    try {
      const { sendEmail } = await import('@/lib/email/sender')
      await sendEmail({
        to: userData.email,
        subject: 'Welcome to EVEA!',
        template: 'welcome-email',
        data: {
          name: userData.full_name,
          loginLink: `${process.env.NEXT_PUBLIC_APP_URL}/login`
        }
      })
      console.log('Welcome email sent successfully')
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail registration if email fails
    }

    // Generate JWT token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign(
      {
        userId: userData.id,
        email: userData.email,
        role: userData.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Google authentication successful',
      user: {
        id: userData.id,
        email: userData.email,
        firstName: validatedData.user.firstName,
        lastName: validatedData.user.lastName,
        role: userData.role,
        isActive: true,
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

    console.log('--- Google Authentication Success ---')
    return response

  } catch (error) {
    console.error('💥 Google authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
