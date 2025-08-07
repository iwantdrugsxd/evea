import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { z } from 'zod'

const ApproveVendorSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  adminId: z.string().uuid('Invalid admin ID').optional()
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Admin Vendor Approval Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = ApproveVendorSchema.parse(body)
    console.log('Data validated successfully')

    // Get vendor and user data
    console.log('Fetching vendor data...')
    const { data: vendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        user_id,
        business_name,
        verification_status,
        registration_step
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

    console.log('Vendor found:', vendorData.id)

    // Get user data
    console.log('Fetching user data...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        full_name,
        phone
      `)
      .eq('id', vendorData.user_id)
      .single()

    if (userError || !userData) {
      console.error('User not found:', vendorData.user_id)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('User found:', userData.id)

    // Check if vendor is ready for approval
    if (vendorData.registration_step < 4) {
      console.error('Vendor not ready for approval. Step:', vendorData.registration_step)
      return NextResponse.json(
        { error: 'Vendor registration not completed' },
        { status: 400 }
      )
    }

    if (vendorData.verification_status === 'verified') {
      console.log('Vendor already verified')
      return NextResponse.json({
        success: true,
        message: 'Vendor already verified'
      })
    }

    // Generate temporary password
    console.log('Generating temporary password...')
    const tempPassword = crypto.randomBytes(8).toString('hex')
    const hashedPassword = await bcrypt.hash(tempPassword, 10)
    console.log('Temporary password generated')

    // Update vendor status
    console.log('Updating vendor status...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        verification_status: 'verified',
        approved_at: new Date().toISOString(),
        approved_by: validatedData.adminId || '00000000-0000-0000-0000-000000000000'
      })
      .eq('id', validatedData.vendorId)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Failed to approve vendor' },
        { status: 500 }
      )
    }

    console.log('Vendor status updated')

    // Update user password
    console.log('Updating user password...')
    const { error: userUpdateError } = await supabaseAdmin
      .from('users')
      .update({
        password_hash: hashedPassword
      })
      .eq('id', userData.id)

    if (userUpdateError) {
      console.error('Failed to update user password:', userUpdateError)
      return NextResponse.json(
        { error: 'Failed to update user credentials' },
        { status: 500 }
      )
    }

    console.log('User password updated')

    // Send credentials email
    console.log('Sending credentials email...')
    try {
      const { sendEmail } = await import('@/lib/email/sender')
      
      const emailResult = await sendEmail({
        to: userData.email,
        subject: 'Your EVEA Vendor Account is Approved!',
        template: 'vendor-approval',
        data: {
          name: userData.full_name,
          businessName: vendorData.business_name,
          email: userData.email,
          password: tempPassword,
          loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/login`
        }
      })

      console.log('Credentials email sent:', emailResult)
    } catch (emailError) {
      console.error('Failed to send credentials email:', emailError)
      // Don't fail the approval if email fails
    }

    console.log('--- Admin Vendor Approval Success ---')
    return NextResponse.json({
      success: true,
      message: 'Vendor approved successfully. Login credentials sent to vendor email.',
      vendorId: vendorData.id,
      tempPassword: tempPassword
    })

  } catch (error) {
    console.error('Vendor approval error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to approve vendor' },
      { status: 500 }
    )
  }
}
