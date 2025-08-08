'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Settings,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface VendorData {
  user: {
    id: string
    email: string
    fullName: string
    phone: string
  }
  vendor: {
    id: string
    businessName: string
    address: string
    city: string
    state: string
    postalCode: string
    verificationStatus: string
    registrationStep: number
  }
  services: any[]
}

export default function VendorDashboardPage() {
  const [vendorData, setVendorData] = useState<VendorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchVendorData()
  }, [])

  const fetchVendorData = async () => {
    try {
      const response = await fetch('/api/vendor/dashboard')
      const data = await response.json()

      if (response.ok) {
        setVendorData(data)
      } else {
        setError(data.error || 'Failed to load vendor data')
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error)
      setError('Failed to load vendor data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
        <Header />
        <main className="section-padding">
          <div className="container-custom">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
        <Header />
        <main className="section-padding">
          <div className="container-custom">
            <div className="max-w-md mx-auto text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
        <Header />
        <main className="section-padding">
          <div className="container-custom">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Data Found</h2>
              <p className="text-gray-600">Vendor data not available.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
              Vendor Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {vendorData.user.fullName}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{vendorData.vendor.businessName}</p>
                        <p className="text-sm text-gray-500">Business Name</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{vendorData.user.fullName}</p>
                        <p className="text-sm text-gray-500">Owner Name</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{vendorData.user.email}</p>
                        <p className="text-sm text-gray-500">Email Address</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{vendorData.user.phone}</p>
                        <p className="text-sm text-gray-500">Phone Number</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {vendorData.vendor.address}, {vendorData.vendor.city}, {vendorData.vendor.state} {vendorData.vendor.postalCode}
                        </p>
                        <p className="text-sm text-gray-500">Business Address</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {vendorData.vendor.verificationStatus === 'approved' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {vendorData.vendor.verificationStatus}
                        </p>
                        <p className="text-sm text-gray-500">Verification Status</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Services Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Services Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {vendorData.services && vendorData.services.length > 0 ? (
                    <div className="space-y-4">
                      {vendorData.services.map((service, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{service.category_name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Type: {service.service_type}</span>
                            {service.wedding_price_min && (
                              <span>Wedding: ₹{service.wedding_price_min}-{service.wedding_price_max}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Services Added</h3>
                      <p className="text-gray-600 mb-4">
                        You haven't added any services yet. Add your first service to start receiving bookings.
                      </p>
                      <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <Settings className="h-4 w-4 mr-2" />
                        Add Service
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors">
                    <Settings className="h-5 w-5 mr-2" />
                    <span>Manage Services</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>View Bookings</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Earnings</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
