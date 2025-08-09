import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const reviews = Array.from({ length: 12 }).map((_, i) => ({
      id: `rev-${1000 + i}`,
      customer: {
        name: ['Aman Gupta', 'Priya Sharma', 'Neha Verma', 'Rohit Patel'][i % 4],
        verified: i % 3 !== 0,
      },
      rating: [5, 4, 5, 3][i % 4],
      title: ['Outstanding Service', 'Great Experience', 'Highly Professional', 'Could Improve'][i % 4],
      comment:
        [
          'Our wedding photos were stunning and delivered on time.',
          'Decoration was elegant and tasteful. Will book again!',
          'Very professional and punctual. Great value for money.',
          'Setup was slightly delayed, but overall good work.',
        ][i % 4],
      images: [],
      helpful: Math.floor(Math.random() * 50),
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      status: 'published',
    }))

    const stats = {
      averageRating: 4.7,
      responseRate: 92,
      monthlyReviews: 18,
      helpfulVotes: 328,
    }

    const distribution = [
      { stars: 5, count: 162 },
      { stars: 4, count: 68 },
      { stars: 3, count: 24 },
      { stars: 2, count: 8 },
      { stars: 1, count: 5 },
    ]

    return NextResponse.json({ success: true, reviews, stats, distribution })
  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


