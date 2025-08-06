import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware
    
    const { data: pendingVendors, error } = await supabase
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
        users!inner (
          full_name,
          email,
          phone
        ),
        vendor_services (
          categories (
            name
          )
        )
      `)
      .eq('verification_status', 'pending')
      .eq('registration_step', 3)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Get document counts for each vendor
    const vendorsWithDocCounts = await Promise.all(
      pendingVendors.map(async (vendor) => {
        const { count } = await supabase
          .from('vendor_documents')
          .select('*', { count: 'exact', head: true })
          .eq('vendor_id', vendor.id)

        return {
          ...vendor,
          documentCount: count || 0
        }
      })
    )

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