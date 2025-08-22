'use client'

import { useState, useEffect, createContext, useContext } from 'react'

interface VendorUser {
  id: string
  email: string
  firstName: string
  lastName: string
  vendor: {
    id: string
    businessName: string
    verificationStatus: string
  }
}

interface VendorAuthContextType {
  user: VendorUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const VendorAuthContext = createContext<VendorAuthContextType | null>(null)

export function VendorAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<VendorUser | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/vendor/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/vendor/auth/logout', { method: 'POST' })
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const refresh = async (): Promise<void> => {
    try {
      const response = await fetch('/api/vendor/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Refresh error:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <VendorAuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </VendorAuthContext.Provider>
  )
}

export function useVendorAuth() {
  const context = useContext(VendorAuthContext)
  if (!context) {
    throw new Error('useVendorAuth must be used within VendorAuthProvider')
  }
  return context
}