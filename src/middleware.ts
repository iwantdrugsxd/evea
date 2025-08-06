// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  // Protect vendor routes
  if (request.nextUrl.pathname.startsWith('/vendor/dashboard')) {
    const token = request.cookies.get('vendorToken')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/vendor/login', request.url))
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.redirect(new URL('/vendor/login', request.url))
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Add admin authentication logic
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/vendor/dashboard/:path*', '/admin/:path*']
}