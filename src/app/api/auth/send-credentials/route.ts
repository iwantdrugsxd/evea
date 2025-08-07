import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { sendEmail } from '@/lib/email/sender'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const SendCredentialsSchema = z.object({
  vendorId: z.string().uuid(),
  adminId: z.string().uuid().optional()
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Send Credentials Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = SendCredentialsSchema.parse(body)
    console.log('Validated data:', validatedData)

    // Get vendor data first
    console.log('Fetching vendor data for ID:', validatedData.vendorId)
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        business_name,
        verification_status,
        user_id
      `)
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', validatedData.vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found:', vendorData.business_name)

    if (vendorData.verification_status !== 'verified') {
      console.error('Vendor not verified. Status:', vendorData.verification_status)
      return NextResponse.json(
        { error: 'Vendor not verified yet' },
        { status: 400 }
      )
    }

    // Get user data
    console.log('Fetching user data for ID:', vendorData.user_id)
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        full_name,
        email
      `)
      .eq('id', vendorData.user_id)
      .single()

    if (userError || !userData) {
      console.error('User not found for vendor:', vendorData.user_id)
      return NextResponse.json(
        { error: 'User not found for vendor' },
        { status: 404 }
      )
    }

    console.log('User found:', userData.full_name)

    // Generate temporary password
    const tempPassword = crypto.randomBytes(8).toString('hex')
    console.log('Generated temp password:', tempPassword)
    
    const passwordHash = await bcrypt.hash(tempPassword, 10)
    console.log('Password hashed successfully')

    // Update user password and role
    console.log('Updating user password and role...')
    const { error: updateUserError } = await supabaseAdmin
      .from('users')
      .update({
        password_hash: passwordHash,
        role: 'vendor'
      })
      .eq('id', userData.id)

    if (updateUserError) {
      console.error('Failed to update user:', updateUserError)
      throw updateUserError
    }

    console.log('User updated successfully')

    // Send credentials email
    console.log('Sending credentials email...')
    try {
      await sendEmail({
        to: userData.email,
        subject: 'Welcome to EVEA - Your Vendor Account is Approved! 🎉',
        template: 'vendor-approval',
        data: {
          vendorName: userData.full_name,
          businessName: vendorData.business_name,
          email: userData.email,
          password: tempPassword,
          dashboardLink: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/dashboard`,
          loginLink: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/login`
        }
      })
      console.log('Credentials email sent successfully')
    } catch (emailError) {
      console.error('Failed to send credentials email (continuing):', emailError)
    }

    console.log('--- Send Credentials Success ---')
    return NextResponse.json({
      success: true,
      message: 'Credentials sent successfully',
      vendorId: validatedData.vendorId,
      tempPassword: tempPassword
    })

  } catch (error) {
    console.error('Send credentials error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to send credentials' },
      { status: 500 }
    )
  }
}