import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { z } from 'zod'
import { sendEmail } from '@/lib/email/sender'

const RegisterSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- User Registration Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = RegisterSchema.parse(body)
    console.log('Data validated successfully')

    // Check if email already exists
    console.log('Checking if email already exists...')
    const { data: existingUser, error: userCheckError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', validatedData.email)
      .single()

    if (existingUser) {
      console.error('Email already registered:', validatedData.email)
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    console.log('Email is available')

    // Check if phone already exists
    console.log('Checking if phone already exists...')
    const { data: existingPhone, error: phoneCheckError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('phone', validatedData.phone)
      .single()

    if (existingPhone) {
      console.error('Phone already registered:', validatedData.phone)
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 400 }
      )
    }

    console.log('Phone is available')

    // Hash password
    console.log('Hashing password...')
    const passwordHash = await bcrypt.hash(validatedData.password, 10)
    console.log('Password hashed successfully')

    // Generate email verification token
    const verificationToken = crypto.randomUUID()
    console.log('Generated verification token:', verificationToken)

    // Create user
    console.log('Creating user...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        full_name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        phone: validatedData.phone,
        password_hash: passwordHash,
        role: 'customer',
        is_active: true,
        email_verified: true, // Set to true for testing
        phone_verified: false,
        verification_token: verificationToken
      })
      .select('id, email, full_name')
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      )
    }

    console.log('User created successfully:', userData.id)

    // Send verification email
    console.log('Sending verification email...')
    try {
      const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`
      
      await sendEmail({
        to: userData.email,
        subject: 'Welcome to EVEA - Verify Your Email',
        template: 'email-verification',
        data: {
          userName: userData.full_name,
          verificationLink,
          loginLink: `${process.env.NEXT_PUBLIC_APP_URL}/login`
        }
      })
      console.log('Verification email sent successfully')
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Continue with registration even if email fails
    }

    console.log('--- User Registration Success ---')
    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name
      }
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
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
