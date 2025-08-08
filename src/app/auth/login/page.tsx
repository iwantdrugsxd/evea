'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthLoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main login page
    router.replace('/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  )
}
