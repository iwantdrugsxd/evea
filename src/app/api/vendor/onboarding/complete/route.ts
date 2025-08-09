// src/app/api/vendor/onboarding/complete/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

const CompleteSchema = z.object({
  vendorId: z.string().uuid(),
  preferences: z.any().optional(),
  goals: z.any().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = CompleteSchema.parse(body)

    // Mark onboarding progress
    const { error: progErr } = await supabaseAdmin
      .from('vendor_onboarding_progress')
      .upsert({
        vendor_id: data.vendorId,
        current_stage: 5,
        completed_at: new Date().toISOString(),
        last_updated_at: new Date().toISOString()
      }, { onConflict: 'vendor_id' })

    if (progErr) {
      return NextResponse.json({ error: 'Failed to complete onboarding' }, { status: 500 })
    }

    // Update vendor registration step to 6 (completed)
    const { error: vErr } = await supabaseAdmin
      .from('vendors')
      .update({ registration_step: 6, onboarding_completed_at: new Date().toISOString() })
      .eq('id', data.vendorId)

    if (vErr) {
      return NextResponse.json({ error: 'Failed to finalize vendor' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


