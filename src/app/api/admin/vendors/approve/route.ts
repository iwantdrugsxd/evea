import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'
import { sendEmail } from '@/lib/email/sender'
import bcrypt from 'bcryptjs'

const ApproveVendorSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  adminId: z.string().uuid('Invalid admin ID')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Admin Vendor Approval Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = ApproveVendorSchema.parse(body)
    console.log('Data validated:', validatedData)

    // Get vendor and user data
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

    console.log('Vendor found:', vendorData.id, 'Status:', vendorData.verification_status)

    // Check if vendor is already approved
    if (vendorData.verification_status === 'approved') {
      console.log('Vendor already approved')
      return NextResponse.json(
        { error: 'Vendor is already approved' },
        { status: 400 }
      )
    }

    // Get user data
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, password_hash')
      .eq('id', vendorData.user_id)
      .single()

    if (userError || !userData) {
      console.error('User not found:', vendorData.user_id)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate a new password for the vendor
    const newPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const passwordHash = await bcrypt.hash(newPassword, 12)

    // Update user with new password and activate account
    const { error: userUpdateError } = await supabaseAdmin
      .from('users')
      .update({
        password_hash: passwordHash,
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userData.id)

    if (userUpdateError) {
      console.error('Failed to update user:', userUpdateError)
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    // Update vendor status to approved
    const { error: vendorUpdateError } = await supabaseAdmin
      .from('vendors')
      .update({
        verification_status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: validatedData.adminId,
        registration_step: 5, // Registration complete
        updated_at: new Date().toISOString()
      })
      .eq('id', vendorData.id)

    if (vendorUpdateError) {
      console.error('Failed to update vendor:', vendorUpdateError)
      return NextResponse.json(
        { error: 'Failed to update vendor status' },
        { status: 500 }
      )
    }

    // Create admin review record
    try {
      await supabaseAdmin
        .from('admin_reviews')
        .insert({
          vendor_id: vendorData.id,
          admin_id: validatedData.adminId,
          review_status: 'approved',
          review_notes: 'Vendor approved by admin',
          documents_reviewed: true,
          business_info_reviewed: true,
          services_reviewed: true
        })
    } catch (reviewError) {
      console.error('Failed to create admin review:', reviewError)
    }

    // Send approval email to vendor
    try {
      const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/vendor/login`
      
      await sendEmail({
        to: userData.email,
        subject: 'Your EVEA Vendor Account is Approved!',
        template: 'vendor-approval',
        data: {
          name: userData.full_name || 'Vendor',
          businessName: vendorData.business_name,
          email: userData.email,
          password: newPassword,
          loginUrl: loginUrl
        }
      })
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError)
    }

    // Create notification for vendor
    try {
      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: userData.id,
          type: 'vendor_approved',
          title: 'Account Approved',
          message: `Your vendor account for ${vendorData.business_name} has been approved! Check your email for login credentials.`,
          data: {
            vendorId: vendorData.id,
            businessName: vendorData.business_name
          }
        })
    } catch (notificationError) {
      console.error('Failed to create vendor notification:', notificationError)
    }

    console.log('--- Admin Vendor Approval Success ---')
    return NextResponse.json({
      success: true,
      message: 'Vendor approved successfully. Login credentials have been sent to the vendor.',
      vendorId: vendorData.id,
      businessName: vendorData.business_name
    })

  } catch (error) {
    console.error('Admin vendor approval error:', error)
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
