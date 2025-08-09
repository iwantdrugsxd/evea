import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const overview = {
      totalEarnings: 1245000,
      monthlyEarnings: 145000,
      pendingPayouts: 32000,
      platformFees: 84500,
    }

    const earningsHistory = Array.from({ length: 12 }).map((_, i) => ({
      id: `earn-${i + 1}`,
      orderNumber: `ORD-${1000 + i}`,
      customer: ['Aman Gupta', 'Priya Sharma', 'Neha Verma', 'Rohit Patel'][i % 4],
      service: ['Wedding Photography', 'Birthday Decoration', 'Corporate Catering', 'Music & DJ'][i % 4],
      gross: 25000 + i * 5000,
      fee: 2500 + i * 300,
      net: 22500 + i * 4700,
      payoutStatus: ['paid', 'pending'][i % 2],
      date: new Date(Date.now() - i * 86_400_000 * 2).toISOString(),
    }))

    const payouts = Array.from({ length: 5 }).map((_, i) => ({
      id: `payout-${i + 1}`,
      amount: 50000 + i * 10000,
      status: ['processed', 'processing', 'failed'][i % 3],
      date: new Date(Date.now() - i * 604_800_000).toISOString(),
      reference: `PAYOUT-${9000 + i}`,
    }))

    const trend = Array.from({ length: 6 }).map((_, i) => ({
      month: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i],
      revenue: [85000, 92000, 87000, 110000, 98000, 145000][i],
      fees: [8100, 9100, 8600, 10500, 9600, 14500][i],
      net: [76900, 82900, 78400, 99500, 88400, 130500][i],
    }))

    return NextResponse.json({ success: true, overview, earningsHistory, payouts, trend })
  } catch (error) {
    console.error('Earnings API error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


