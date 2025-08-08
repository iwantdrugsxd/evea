// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// Define protected routes
const protectedRoutes = [
  '/profile',
  '/favorites',
  '/messages',
  '/orders'
]

// Define public routes that don't need authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/vendor',
  '/features',
  '/about',
  '/contact'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Get auth token from cookies
  const authToken = request.cookies.get('auth-token')?.value
  const vendorToken = request.cookies.get('vendorToken')?.value
  const token = authToken || vendorToken

  // If it's a protected route and no token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user has token and tries to access login/register, redirect to marketplace
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/marketplace', request.url))
  }

  // Verify token for protected routes
  if (isProtectedRoute && token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      
      // Check if user is accessing vendor routes with customer token
      if (pathname.startsWith('/vendor') && decoded.role !== 'vendor') {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      // Check if user is accessing customer routes with vendor token
      if (!pathname.startsWith('/vendor') && decoded.role === 'vendor') {
        return NextResponse.redirect(new URL('/vendor/dashboard', request.url))
      }
      
      // Check if user is accessing customer routes with customer token
      if (!pathname.startsWith('/vendor') && !pathname.startsWith('/admin') && decoded.role === 'customer') {
        // Allow access to marketplace and other customer routes
        return NextResponse.next()
      }
    } catch (error) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}