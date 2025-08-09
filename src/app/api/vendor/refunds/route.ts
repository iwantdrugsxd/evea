import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const stats = {
      totalRequests: 18,
      pending: 5,
      approved: 10,
      totalRefunded: 185000,
    }

    const refunds = Array.from({ length: 10 }).map((_, i) => ({
      id: `rf-${i + 1}`,
      number: `RF-${1000 + i}`,
      status: ['pending', 'approved', 'rejected'][i % 3],
      type: ['full', 'partial'][i % 2],
      customer: ['Aman Gupta', 'Priya Sharma', 'Neha Verma'][i % 3],
      orderNumber: `ORD-${2000 + i}`,
      service: ['Wedding Photography', 'Decoration', 'Catering'][i % 3],
      refundAmount: 5000 + i * 2500,
      orderAmount: 20000 + i * 4000,
      reason: ['Event Cancelled', 'Service Issue', 'Schedule Change'][i % 3],
      description: 'Customer requested a refund due to scheduling changes.',
      adminNotes: i % 3 === 0 ? 'Please verify supporting documents.' : null,
      date: new Date(Date.now() - i * 86400000).toISOString(),
    }))

    return NextResponse.json({ success: true, stats, refunds })
  } catch (error) {
    console.error('Refunds API error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


