import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const stats = {
      totalItems: 84,
      lowStock: 7,
      outOfStock: 3,
      totalValue: 1250000,
    }

    const items = Array.from({ length: 20 }).map((_, i) => ({
      id: `inv-${i + 1}`,
      name: ['Canon EOS R5', 'Sony A7 III', 'DJI Ronin', 'Profoto B10'][i % 4],
      category: ['Camera', 'Camera', 'Gimbal', 'Lighting'][i % 4],
      sku: `SKU-${5000 + i}`,
      stock: [12, 3, 0, 8][i % 4],
      min: [5, 5, 2, 4][i % 4],
      max: [20, 20, 5, 10][i % 4],
      value: [325000, 120000, 75000, 45000][i % 4],
      status: ['active', 'active', 'maintenance', 'active'][i % 4],
      usage: Math.floor(Math.random() * 100),
      image: null,
    }))

    return NextResponse.json({ success: true, stats, items })
  } catch (error) {
    console.error('Inventory API error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


