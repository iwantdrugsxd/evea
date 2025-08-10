import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/orders',
  '/favorites',
  '/messages',
  '/vendor/dashboard',
  '/admin/dashboard'
]

// Vendor onboarding routes that need vendor ID validation
const vendorOnboardingRoutes = [
  '/vendor/onboarding/business-details',
  '/vendor/onboarding/services',
  '/vendor/onboarding/verification-pending'
]

// Public routes that should redirect if authenticated
const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  // Accept both general token and vendor-specific cookie
  const token = request.cookies.get('token')?.value || request.cookies.get('vendor-token')?.value || request.cookies.get('vendorToken')?.value

  // Handle vendor email verification (allow without authentication)
  if (pathname === '/vendor/verify-email' || pathname === '/api/vendor/verify-email') {
    return NextResponse.next()
  }

  // Handle vendor onboarding routes
  if (vendorOnboardingRoutes.some(route => pathname.startsWith(route))) {
    const vendorId = request.nextUrl.searchParams.get('vendorId')
    
    if (!vendorId) {
      return NextResponse.redirect(new URL('/vendor/onboarding?error=missing_vendor_id', request.url))
    }

    // Optional: Validate vendor ID exists and user has permission
    // This would require a database call, implement if needed for security
    
    return NextResponse.next()
  }

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      // Store the attempted URL to redirect after login
      const loginUrl = new URL(pathname.startsWith('/vendor/') ? '/vendor/login' : '/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify the JWT token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      
      // Check role-based access
      if (pathname.startsWith('/vendor/') && payload.role !== 'vendor') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      
      if (pathname.startsWith('/admin/') && payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Token verification failed:', error)
      // Clear invalid token
       const response = NextResponse.redirect(new URL(pathname.startsWith('/vendor/') ? '/vendor/login' : '/login', request.url))
      response.cookies.delete('token')
       response.cookies.delete('vendor-token')
       response.cookies.delete('vendorToken')
      return response
    }
  }

  // Handle auth routes (redirect if already authenticated)
  if (authRoutes.includes(pathname)) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        await jwtVerify(token, secret)
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } catch (error) {
        // Invalid token, allow access to auth routes
        const response = NextResponse.next()
        response.cookies.delete('token')
        response.cookies.delete('vendor-token')
        response.cookies.delete('vendorToken')
        return response
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
}