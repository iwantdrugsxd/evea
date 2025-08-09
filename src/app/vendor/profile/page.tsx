'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import { User, Building2, CheckCircle, Shield, MapPin, Phone, Mail } from 'lucide-react'

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
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse h-6 w-48 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 bg-gray-100 rounded" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="card-elegant">
          <CardContent className="p-6">
            <p className="text-red-600">{error || 'Failed to load profile'}</p>
            <Button className="mt-3" onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { vendor, user, business, verification } = data

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your personal and business information</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Business Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-2">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-red-600" /> Business Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Business Name</p>
                    <p className="font-medium text-gray-900">{vendor.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">{vendor.address}</p>
                    <p className="text-sm text-gray-700">{vendor.city}, {vendor.state} {vendor.postalCode}</p>
                  </div>
                  {business.website && (
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a href={business.website} target="_blank" rel="noreferrer" className="text-red-600 hover:underline">
                        {business.website}
                      </a>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Service Areas</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {business.serviceAreas.map((s) => (
                        <span key={s} className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Working Hours</p>
                    <p className="font-medium text-gray-900">{business.workingHours.start} – {business.workingHours.end}</p>
                    <p className="text-sm text-gray-700">{business.workingDays.join(', ')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="card-elegant mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-red-600" /> Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{user.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{vendor.city}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Verification */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" /> Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className={`h-4 w-4 mr-2 ${verification.emailVerified ? 'text-green-600' : 'text-gray-300'}`} />
                  Email Verified
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className={`h-4 w-4 mr-2 ${verification.phoneVerified ? 'text-green-600' : 'text-gray-300'}`} />
                  Phone Verified
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-900 mb-2">Documents</p>
                  <div className="space-y-2">
                    {verification.documents.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm text-gray-700">{doc.type}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          doc.status === 'verified'
                            ? 'bg-green-100 text-green-700'
                            : doc.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>{doc.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => (window.location.href = '/vendor/settings')}>Edit Profile</Button>
      </div>
    </div>
  )
}


