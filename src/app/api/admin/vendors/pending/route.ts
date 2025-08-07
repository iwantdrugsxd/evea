import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('--- Fetching Pending Vendors ---')
    
    // TODO: Add admin authentication middleware
    
    // First, get pending vendors with basic info
    const { data: pendingVendors, error: vendorsError } = await supabaseAdmin
      .from('vendors')
      .select(`
        id,
        business_name,
        address,
        city,
        state,
        registration_step,
        verification_status,
        created_at,
        user_id
      `)
      .eq('verification_status', 'pending')
      .eq('registration_step', 3)
      .order('created_at', { ascending: false })

    if (vendorsError) {
      console.error('Error fetching vendors:', vendorsError)
      throw vendorsError
    }

    console.log('Found pending vendors:', pendingVendors?.length || 0)

    // Get user details for each vendor
    const vendorsWithUsers = await Promise.all(
      pendingVendors.map(async (vendor) => {
        const { data: userData, error: userError } = await supabaseAdmin
          .from('users')
          .select('full_name, email, phone')
          .eq('id', vendor.user_id)
          .single()

        if (userError) {
          console.error('Error fetching user for vendor:', vendor.id, userError)
          return {
            ...vendor,
            user: null
          }
        }

        return {
          ...vendor,
          user: userData
        }
      })
    )

    // Get service details for each vendor
    const vendorsWithServices = await Promise.all(
      vendorsWithUsers.map(async (vendor) => {
        const { data: serviceData, error: serviceError } = await supabaseAdmin
          .from('vendor_services')
          .select(`
            id,
            category_id,
            subcategory,
            service_type,
            categories (
              name,
              slug
            )
          `)
          .eq('vendor_id', vendor.id)
          .single()

        if (serviceError) {
          console.error('Error fetching service for vendor:', vendor.id, serviceError)
          return {
            ...vendor,
            service: null
          }
        }

        return {
          ...vendor,
          service: serviceData
        }
      })
    )

    // Get document counts for each vendor
    const vendorsWithDocCounts = await Promise.all(
      vendorsWithServices.map(async (vendor) => {
        const { count, error: docError } = await supabaseAdmin
          .from('vendor_documents')
          .select('*', { count: 'exact', head: true })
          .eq('vendor_id', vendor.id)

        if (docError) {
          console.error('Error counting documents for vendor:', vendor.id, docError)
          return {
            ...vendor,
            documentCount: 0
          }
        }

        return {
          ...vendor,
          documentCount: count || 0
        }
      })
    )

    console.log('--- Pending Vendors Fetched Successfully ---')
    return NextResponse.json({
      success: true,
      vendors: vendorsWithDocCounts
    })

  } catch (error) {
    console.error('Get pending vendors error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending vendors' },
      { status: 500 }
    )
  }
}