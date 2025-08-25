'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/button'
import { User, Building2, CheckCircle, Shield, MapPin, Phone, Mail, Edit, Star, Calendar, Award } from 'lucide-react'

interface ProfileResponse {
  success: boolean
  vendor: {
    id: string
    businessName: string
    verificationStatus: string
    rating: number
    totalReviews: number
    joinDate: string
    totalOrders: number
    address: string
    city: string
    state: string
    postalCode: string
  }
  user: {
    id: string
    fullName: string
    email: string
    phone: string
  }
  business: {
    website?: string
    serviceAreas: string[]
    workingDays: string[]
    workingHours: { start: string; end: string }
    social?: { instagram?: string; facebook?: string }
  }
  verification: {
    emailVerified: boolean
    phoneVerified: boolean
    documents: { type: string; status: 'verified' | 'pending' | 'rejected' }[]
  }
}

export default function VendorProfilePage() {
  const [data, setData] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/vendor/profile')
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Failed to load profile')
        setData(json)
      } catch (e: any) {
        setError(e?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded-2xl w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-64 bg-white/10 rounded-3xl"></div>
            <div className="h-64 bg-white/10 rounded-3xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6">
          <p className="text-red-400">{error || 'Failed to load profile'}</p>
          <Button className="mt-3" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  const { vendor, user, business, verification } = data

  const stats = [
    { title: 'Rating', value: vendor.rating.toFixed(1), icon: Star, color: 'bg-yellow-500', change: 0.2, trend: 'up' },
    { title: 'Total Reviews', value: vendor.totalReviews, icon: Award, color: 'bg-blue-500', change: 12.5, trend: 'up' },
    { title: 'Total Orders', value: vendor.totalOrders, icon: Calendar, color: 'bg-green-500', change: 8.7, trend: 'up' },
    { title: 'Join Date', value: new Date(vendor.joinDate).getFullYear(), icon: User, color: 'bg-purple-500', change: 0, trend: 'up' }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
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
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Profile
            </motion.h1>
            <p className="text-white/60 mt-1">Manage your personal and business information</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <div className="h-4 w-4 text-green-400">↗</div>
                    ) : (
                      <div className="h-4 w-4 text-red-400">↘</div>
                    )}
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60 mb-2">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }} 
          className="lg:col-span-2"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-6">
            <div className="flex items-center mb-6">
              <Building2 className="h-5 w-5 mr-2 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Business Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/60">Business Name</p>
                  <p className="font-medium text-white">{vendor.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Address</p>
                  <p className="font-medium text-white">{vendor.address}</p>
                  <p className="text-sm text-white/50">{vendor.city}, {vendor.state} {vendor.postalCode}</p>
                </div>
                {business.website && (
                  <div>
                    <p className="text-sm text-white/60">Website</p>
                    <a href={business.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                      {business.website}
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/60">Service Areas</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {business.serviceAreas.map((s) => (
                      <span key={s} className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60">Working Hours</p>
                  <p className="font-medium text-white">{business.workingHours.start} – {business.workingHours.end}</p>
                  <p className="text-sm text-white/50">{business.workingDays.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6">
            <div className="flex items-center mb-6">
              <User className="h-5 w-5 mr-2 text-green-400" />
              <h2 className="text-lg font-bold text-white">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-white/60 mr-2" />
                <span className="text-white">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-white/60 mr-2" />
                <span className="text-white">{user.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-white/60 mr-2" />
                <span className="text-white">{vendor.city}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 mr-2 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Verification</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <CheckCircle className={`h-4 w-4 mr-2 ${verification.emailVerified ? 'text-green-400' : 'text-white/30'}`} />
                <span className={verification.emailVerified ? 'text-white' : 'text-white/60'}>Email Verified</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className={`h-4 w-4 mr-2 ${verification.phoneVerified ? 'text-green-400' : 'text-white/30'}`} />
                <span className={verification.phoneVerified ? 'text-white' : 'text-white/60'}>Phone Verified</span>
              </div>
              {verification.documents.map((doc, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className={`h-4 w-4 mr-2 ${
                    doc.status === 'verified' ? 'text-green-400' : 
                    doc.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                  }`} />
                  <span className="text-white">{doc.type}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    doc.status === 'verified' ? 'bg-green-500/20 text-green-400' : 
                    doc.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


