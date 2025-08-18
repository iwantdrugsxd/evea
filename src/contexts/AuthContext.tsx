'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'customer' | 'vendor' | 'admin'
  isActive: boolean
  createdAt: string
  // Vendor specific fields
  businessName?: string
  verificationStatus?: 'pending' | 'verified' | 'rejected' | 'suspended'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string, role?: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  clearError: () => void
  isAuthenticated: boolean
  hasRole: (role: string) => boolean
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role?: 'customer' | 'vendor'
  businessName?: string
  businessType?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const clearError = () => setError(null)

  // Check if user is authenticated on mount and token changes
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const token = getCookie('auth-token')
      
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        // Token is invalid, remove it
        removeCookie('auth-token')
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      removeCookie('auth-token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)

      // Use common login endpoint for all roles
      const endpoint = '/api/auth/login'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Set user data from login response
        setUser(data.user)
        
        // Also refresh user data from /api/auth/me to ensure consistency
        setTimeout(async () => {
          try {
            const meResponse = await fetch('/api/auth/me')
            if (meResponse.ok) {
              const meData = await meResponse.json()
              if (meData.success) {
                setUser(meData.user)
              }
            }
          } catch (error) {
            console.error('Error refreshing user data:', error)
          }
        }, 100)
        
        // All users redirect to marketplace regardless of role
        router.push('/marketplace')
        
        return true
      } else {
        setError(data.error || 'Login failed')
        return false
      }
    } catch (error) {
      setError('Network error. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      console.log('🔍 AuthContext: Starting registration...')
      console.log('📝 User data:', userData)
      
      setLoading(true)
      setError(null)

      const endpoint = userData.role === 'vendor' ? '/api/vendor/register' : '/api/auth/register'
      console.log('🌐 API endpoint:', endpoint)

      console.log('📤 Sending request to:', endpoint)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      console.log('📥 Response status:', response.status)
      console.log('📥 Response ok:', response.ok)

      const data = await response.json()
      console.log('📊 Response data:', data)

      if (response.ok && data.success) {
        console.log('✅ Registration successful in AuthContext')
        if (userData.role === 'vendor') {
          // Vendor registration requires admin approval
          router.push('/vendor/registration-pending')
        } else {
          // Customer registration success - redirect to login
          router.push('/login')
        }
        return true
      } else {
        console.log('❌ Registration failed in AuthContext')
        console.log('❌ Error:', data.error)
        setError(data.error || 'Registration failed')
        return false
      }
    } catch (error) {
      console.error('💥 AuthContext registration error:', error)
      setError('Network error. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setLoading(true)
      
      // Call logout API to clear server-side session
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getCookie('auth-token')}`,
        },
      })
      
      // Clear client-side state
      removeCookie('auth-token')
      setUser(null)
      
      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Force clear client state even if API call fails
      removeCookie('auth-token')
      setUser(null)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async (): Promise<void> => {
    await checkAuth()
  }

  const isAuthenticated = !!user && user.isActive
  
  const hasRole = (role: string): boolean => {
    return user?.role === role
  }

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    refreshUser,
    clearError,
    isAuthenticated,
    hasRole,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Utility functions for cookie management
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift()
    return cookie || null
  }
  return null
}

function removeCookie(name: string): void {
  if (typeof document === 'undefined') return
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`
}

// Export types for use in other components
export type { User, AuthContextType, RegisterData }