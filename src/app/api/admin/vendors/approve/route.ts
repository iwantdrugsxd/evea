import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'
import { sendEmail } from '@/lib/email/sender'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { vendorId, adminId } = await request.json()

    // TODO: Verify admin authentication
    
    // Get vendor and user data
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select(`
        id,
        business_name,
        users!inner (
          id,
          full_name,
          email
        )
      `)
      .eq('id', vendorId)
      .single()

    if (vendorError || !vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Generate temporary password
    const tempPassword = crypto.randomBytes(8).toString('hex')
    const passwordHash = await bcrypt.hash(tempPassword, 10)

    // Update vendor status
    const { error: updateVendorError } = await supabase
      .from('vendors')
      .update({
        verification_status: 'verified',
        approved_at: new Date().toISOString(),
        approved_by: adminId
      })
      .eq('id', vendorId)

    if (updateVendorError) throw updateVendorError

    // Update user role and password
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        role: 'vendor',
        password_hash: passwordHash
      })
      .eq('id', vendorData.users.id)

    if (updateUserError) throw updateUserError

    // Record admin review
    const { error: reviewError } = await supabase
      .from('admin_reviews')
      .insert({
        vendor_id: vendorId,
        admin_id: adminId,
        review_status: 'approved',
        documents_reviewed: true,
        business_info_reviewed: true,
        services_reviewed: true
      })

    if (reviewError) throw reviewError

    // Send approval email with credentials
    await sendEmail({
      to: vendorData.users.email,
      subject: 'Welcome to EVEA - Your Vendor Account is Approved! 🎉',
      template: 'vendor-approval',
      data: {
        vendorName: vendorData.users.full_name,
        businessName: vendorData.business_name,
        email: vendorData.users.email,
        password: tempPassword,
        dashboardLink: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/dashboard`,
        loginLink: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/login`
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Vendor approved successfully'
    })

  } catch (error) {
    console.error('Vendor approval error:', error)
    return NextResponse.json(
      { error: 'Vendor approval failed' },
      { status: 500 }
    )
  }
}
