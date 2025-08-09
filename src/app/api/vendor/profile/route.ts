import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Dummy realistic profile data
    const profile = {
      vendor: {
        id: tokenData.vendorId,
        businessName: 'Evea Wedding Studios',
        verificationStatus: 'pending',
        rating: 4.7,
        totalReviews: 267,
        joinDate: '2024-03-18T10:00:00.000Z',
        totalOrders: 152,
        address: 'Hiranandani Gardens, Powai',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400076',
      },
      user: {
        id: tokenData.userId,
        fullName: 'Rajesh Kumar',
        email: tokenData.email,
        phone: '+91 98765 43210',
      },
      business: {
        website: 'https://evea-studios.example',
        serviceAreas: ['Mumbai', 'Pune', 'Nashik'],
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        workingHours: { start: '10:00', end: '19:00' },
        social: {
          instagram: 'https://instagram.com/evea_studios',
          facebook: 'https://facebook.com/evea_studios',
        },
      },
      verification: {
        emailVerified: true,
        phoneVerified: true,
        documents: [
          { type: 'Business License', status: 'verified' },
          { type: 'Tax Certificate', status: 'pending' },
          { type: 'Identity Proof', status: 'verified' },
        ],
      },
    }

    return NextResponse.json({ success: true, ...profile })
  } catch (error) {
    console.error('Profile API error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


