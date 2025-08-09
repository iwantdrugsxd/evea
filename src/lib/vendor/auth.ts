import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export interface VendorTokenData {
  userId: string
  email: string
  role: string
  vendorId: string
}

export async function verifyVendorToken(request: NextRequest): Promise<VendorTokenData | null> {
  try {
    // Support both historical and current cookie names
    const token = request.cookies.get('vendor-token')?.value || request.cookies.get('vendorToken')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as VendorTokenData

    if (decoded.role !== 'vendor') {
      return null
    }

    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}
