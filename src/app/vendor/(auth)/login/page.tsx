'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  Lock,
  Mail
} from 'lucide-react'
import Button from '@/components/ui/button'

export default function VendorLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push('/vendor/dashboard')
    }, 2000)
  }

  return (
    <div className="vendor-login-container">
      {/* Background Effects */}
      <div className="vendor-login-background">
        <div className="vendor-login-bg-circle vendor-login-bg-circle-1"></div>
        <div className="vendor-login-bg-circle vendor-login-bg-circle-2"></div>
        <div className="vendor-login-bg-circle vendor-login-bg-circle-3"></div>
      </div>

      <div className="vendor-login-content">
        <div className="vendor-login-centered">
          {/* Login Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="vendor-login-form-section"
          >
            <div className="vendor-login-form-container">
              {/* Header */}
              <div className="vendor-login-header">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="vendor-login-logo"
                >
                  <div className="vendor-login-logo-icon">
                    <Lock className="vendor-login-logo-icon-svg" />
                  </div>
                </motion.div>
                
                <motion.h1
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.8)",
                      "0 0 40px rgba(59, 130, 246, 1)",
                      "0 0 60px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.8)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="vendor-login-title"
                >
                  Welcome Back
                </motion.h1>
                <p className="vendor-login-subtitle">Access your vendor dashboard</p>
              </div>

              {/* Login Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="vendor-login-form-card"
              >
                <form onSubmit={handleSubmit} className="vendor-login-form">
                  <div className="vendor-login-form-group">
                    <label htmlFor="email" className="vendor-login-label">
                      <Mail className="vendor-login-label-icon" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="vendor-login-input"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="vendor-login-form-group">
                    <label htmlFor="password" className="vendor-login-label">
                      <Lock className="vendor-login-label-icon" />
                      Password
                    </label>
                    <div className="vendor-login-password-container">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="vendor-login-input vendor-login-password-input"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="vendor-login-password-toggle"
                      >
                        {showPassword ? <EyeOff className="vendor-login-password-icon" /> : <Eye className="vendor-login-password-icon" />}
                      </button>
                    </div>
                  </div>

                  <div className="vendor-login-form-options">
                    <label className="vendor-login-checkbox-group">
                      <div className="vendor-login-checkbox-container">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="vendor-login-checkbox"
                        />
                        <div className={`vendor-login-checkbox-custom ${rememberMe ? 'vendor-login-checkbox-checked' : ''}`}>
                          {rememberMe && <Check className="vendor-login-checkbox-icon" />}
                        </div>
                      </div>
                      <span className="vendor-login-checkbox-label">Remember me</span>
                    </label>
                    <Link href="/vendor/forgot-password" className="vendor-login-forgot-link">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="vendor-login-submit-button"
                  >
                    {isLoading ? (
                      <div className="vendor-login-loading">
                        <div className="vendor-login-spinner"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="vendor-login-button-content">
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="vendor-login-button-icon" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="vendor-login-signup">
                  <p className="vendor-login-signup-text">
                    Don't have an account?{' '}
                    <Link href="/vendor/register" className="vendor-login-signup-link">
                      Create one here
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}