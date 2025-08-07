'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AuthCallback() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      console.log('Authorization code received:', code)
      alert(`Authorization code: ${code}\n\nCopy this code and paste it in your terminal.`)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            OAuth Callback
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Check your terminal for the authorization code
          </p>
        </div>
      </div>
    </div>
  )
}
