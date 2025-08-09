// src/app/api/vendor/onboarding/stage4/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

const Stage4Schema = z.object({
  vendorId: z.string().uuid(),
  service_subcategories: z.array(z.string()).optional(),
  pricing_structure: z.string().optional(),
  capacity_details: z.object({
    max_events_per_month: z.number().optional(),
    advance_booking_days: z.number().optional()
  }).optional(),
  availability_calendar: z.array(z.object({
    availability_date: z.string(),
    is_available: z.boolean()
  })).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = Stage4Schema.parse(body)

    const { error: vUpdateErr } = await supabaseAdmin
      .from('vendors')
      .update({
        max_events_per_month: data.capacity_details?.max_events_per_month,
      })
      .eq('id', data.vendorId)

    if (vUpdateErr) {
      return NextResponse.json({ error: 'Failed to update vendor capacity' }, { status: 500 })
    }

    const { error: progErr } = await supabaseAdmin
      .from('vendor_onboarding_progress')
      .upsert({
        vendor_id: data.vendorId,
        current_stage: 4,
        stage_4_data: {
          service_subcategories: data.service_subcategories,
          pricing_structure: data.pricing_structure,
          capacity_details: data.capacity_details,
          availability_calendar: data.availability_calendar
        },
        last_updated_at: new Date().toISOString()
      }, { onConflict: 'vendor_id' })

    if (progErr) {
      return NextResponse.json({ error: 'Failed to update onboarding progress' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


