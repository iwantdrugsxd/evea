// src/app/api/vendor/check-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')?.trim()

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1)

    if (error) {
      console.error('Email check error:', error)
      return NextResponse.json({ error: 'Failed to check email' }, { status: 500 })
    }

    const isAvailable = !data || data.length === 0
    return NextResponse.json({ available: isAvailable })
  } catch (error) {
    console.error('Email check exception:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


