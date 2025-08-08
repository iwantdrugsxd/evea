import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import { sendEmail } from '@/lib/email/sender'

const ApproveVendorSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  adminId: z.string().uuid('Invalid admin ID')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Vendor Approval Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = ApproveVendorSchema.parse(body)
    console.log('Data validated successfully')

    // Check if vendor exists and get user details
    console.log('Checking vendor status...')
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

    // Check if already approved
    if (vendorData.verification_status === 'approved') {
      console.log('Vendor already approved')
      return NextResponse.json({
        success: true,
        message: 'Vendor already approved',
        vendorId: vendorData.id
      })
    }

    // Get user details for email
    console.log('Getting user details...')
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

    console.log('User found:', userData.email)

    // Update vendor status to approved
    console.log('Updating vendor status to approved...')
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        verification_status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: validatedData.adminId
      })
      .eq('id', validatedData.vendorId)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Failed to approve vendor' },
        { status: 500 }
      )
    }

    console.log('Vendor status updated to approved')

    // Update user status to active
    console.log('Updating user status to active...')
    const { error: userUpdateError } = await supabaseAdmin
      .from('users')
      .update({
        is_active: true
      })
      .eq('id', vendorData.user_id)

    if (userUpdateError) {
      console.error('Failed to update user:', userUpdateError)
      return NextResponse.json(
        { error: 'Failed to activate user' },
        { status: 500 }
      )
    }

    console.log('User status updated to active')

    // Send approval email
    console.log('Sending approval email...')
    try {
      const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/vendor/login`
      
      await sendEmail({
        to: userData.email,
        subject: 'Your Vendor Account is Approved - Evea',
        template: 'vendor-approval',
        data: {
          name: userData.full_name,
          businessName: vendorData.business_name,
          email: userData.email,
          password: 'Use the password you set during registration',
          loginUrl,
          supportEmail: 'support@evea.com'
        }
      })
      
      console.log('Approval email sent successfully')
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError)
      // Don't fail the approval process, just log the error
    }

    // Create notification for vendor
    console.log('Creating notification for vendor...')
    const { error: notificationError } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: vendorData.user_id,
        type: 'vendor_approval',
        title: 'Account Approved',
        message: `Your vendor account for ${vendorData.business_name} has been approved! You can now log in and start receiving bookings.`,
        data: {
          vendorId: vendorData.id,
          businessName: vendorData.business_name
        }
      })

    if (notificationError) {
      console.error('Failed to create notification:', notificationError)
      // Don't fail the approval process, just log the error
    }

    console.log('--- Vendor Approval Success ---')
    return NextResponse.json({
      success: true,
      message: 'Vendor approved successfully',
      vendorId: vendorData.id,
      businessName: vendorData.business_name,
      userEmail: userData.email
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
