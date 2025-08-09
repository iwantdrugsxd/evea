// src/app/api/vendor/onboarding/progress/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const vendorId = new URL(request.url).searchParams.get('vendorId')
    if (!vendorId) {
      return NextResponse.json({ error: 'vendorId is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('vendor_onboarding_progress')
      .select('*')
      .eq('vendor_id', vendorId)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


