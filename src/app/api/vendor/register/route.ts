import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const RegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Vendor Registration Start ---')
    
    let body
    try {
      body = await request.json()
      console.log('Request body:', body)
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError)
      console.error('Raw request body:', await request.text())
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      )
    }
    
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

    // Create user first
    console.log('Creating user...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        full_name: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        password_hash: passwordHash,
        role: 'vendor',
        is_active: true,
        email_verified: true // Auto-verify email for seamless flow
      })
      .select('id')
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Registration failed' },
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
        verification_status: 'pending',
        registration_step: 2, // Start at step 2 (business details)
        address: 'Not provided',
        city: 'Not provided',
        state: 'Not provided',
        postal_code: 'Not provided'
      })
      .select('id')
      .single()

    if (vendorError) {
      console.error('Vendor creation error:', vendorError)
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      )
    }

    console.log('Vendor created successfully:', vendorData.id)

    console.log('--- Vendor Registration Success ---')
    return NextResponse.json({
      success: true,
      vendorId: vendorData.id,
      userId: userData.id,
      registrationStep: 2,
      message: 'Registration successful. Please proceed to provide business details.'
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
