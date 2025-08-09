import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const today = new Date()
    const fmt = (d: Date) => d.toISOString()

    // Dummy events for calendar visualization
    const events = [
      {
        id: 'evt-1001',
        title: 'Wedding Photography - Sharma Family',
        start: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0)),
        end: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 18, 0)),
        status: 'confirmed',
        location: 'The Leela, Mumbai',
        amount: 75000,
      },
      {
        id: 'evt-1002',
        title: 'Corporate Event - TechNova',
        start: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 9, 0)),
        end: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 17, 0)),
        status: 'pending',
        location: 'BKC Convention Center, Mumbai',
        amount: 120000,
      },
      {
        id: 'evt-1003',
        title: 'Birthday Party - Arya 5th',
        start: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 16, 0)),
        end: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 20, 0)),
        status: 'confirmed',
        location: 'Powai, Mumbai',
        amount: 25000,
      },
    ]

    const quickStats = {
      todaysEvents: 1,
      thisWeek: 5,
      pending: 2,
      monthlyRevenue: 185000,
    }

    return NextResponse.json({ success: true, events, quickStats })
  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


