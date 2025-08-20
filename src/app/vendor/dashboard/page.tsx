'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  Star,
  Settings,
  LogOut,
  XCircle,
  ShoppingBag,
  Eye,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'

interface VendorData {
  id: string
  businessName: string
  address: string
  city: string
  state: string
  postalCode: string
  description: string
  verificationStatus: string
  approvedAt: string
  createdAt: string
}

interface UserData {
  id: string
  fullName: string
  email: string
  phone: string
  createdAt: string
}

interface ServiceData {
  id: string
  categoryId: string
  categoryName: string
  serviceType: string
  weddingPriceMin: number
  weddingPriceMax: number
  corporatePriceMin: number
  corporatePriceMax: number
  birthdayPriceMin: number
  birthdayPriceMax: number
  festivalPriceMin: number
  festivalPriceMax: number
  basicPackagePrice: number
  standardPackagePrice: number
  premiumPackagePrice: number
  advancePaymentPercentage: number
  cancellationPolicy: string
}

export default function VendorDashboardPage() {
  const [vendorData, setVendorData] = useState<VendorData | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [serviceData, setServiceData] = useState<ServiceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<any | null>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [recentReviews, setRecentReviews] = useState<any[]>([])
  const [monthlyTrends, setMonthlyTrends] = useState<any[]>([])
  const maxRevenue = Math.max(1, ...monthlyTrends.map((m: any) => m?.revenue || 0))

  useEffect(() => {
    fetchVendorData()
  }, [])

  const fetchVendorData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [dashRes, analyticsRes] = await Promise.all([
        fetch('/api/vendor/dashboard'),
        fetch('/api/vendor/analytics?period=6months')
      ])

      const dashData = await dashRes.json()
      const analyticsData = await analyticsRes.json()

      if (dashRes.ok && dashData.success) {
        if (dashData.vendor) setVendorData(dashData.vendor)
        if (dashData.user) setUserData(dashData.user)
        if (dashData.service) setServiceData(dashData.service)
        if (dashData.stats) setStats(dashData.stats)
        setRecentOrders(dashData.recentOrders || [])
        setRecentReviews(dashData.recentReviews || [])
      } else {
        setError(dashData.error || 'Failed to load vendor data')
      }

      if (analyticsRes.ok) {
        setMonthlyTrends(analyticsData.monthlyTrends || [])
        // Prefer analytics totals for richer cards if available
        setStats((prev: any) => ({
          ...(prev || {}),
          totalRevenue: analyticsData.totalRevenue ?? prev?.totalRevenue ?? 0,
          totalOrders: analyticsData.totalOrders ?? prev?.totalOrders ?? 0,
          averageRating: analyticsData.averageRating ?? prev?.averageRating ?? 0,
          totalViews: analyticsData.totalViews ?? 0
        }))
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error)
      setError('An error occurred while loading your data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })

      if (response.ok) {
        window.location.href = '/vendor/login'
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="text-red-600 mb-4">
              <XCircle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error Loading Dashboard
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchVendorData} variant="primary" size="sm">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
              <main className="pb-6">
        <div className="w-full px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
            <div className="lg:col-span-12">
              <div className="max-w-none">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
                    Welcome back, {userData?.fullName || 'Vendor'}!
                  </h1>
                  <p className="text-gray-600">
                    Manage your business profile and services
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = '/vendor/profile'}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <Card className="card-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-100">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalOrders || 0}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.averageRating || 0}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-100">
                      <Star className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Profile Views</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{(stats?.totalViews || 0).toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Eye className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
              {/* Business Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Card className="card-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-red-600" />
                      Business Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Business Information</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-600">Business Name</label>
                              <p className="text-gray-900">{vendorData?.businessName}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Address</label>
                              <p className="text-gray-900">{vendorData?.address}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">City</label>
                                <p className="text-gray-900">{vendorData?.city}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">State</label>
                                <p className="text-gray-900">{vendorData?.state}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Postal Code</label>
                                <p className="text-gray-900">{vendorData?.postalCode}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-gray-900">{userData?.fullName}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-gray-900">{userData?.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-gray-900">{userData?.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {vendorData?.description && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Description</label>
                          <p className="text-gray-900 mt-1">{vendorData.description}</p>
                        </div>
                      )}

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm text-gray-600">Verified</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            Joined {new Date(vendorData?.createdAt || '').toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card className="card-elegant mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-2 text-red-600" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length === 0 ? (
                      <p className="text-gray-600">No recent orders.</p>
                    ) : (
                      <div className="space-y-4">
                        {recentOrders.map((o: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">Order #{o.id || o.orderNumber || '—'}</p>
                              <p className="text-sm text-gray-600">{new Date(o.created_at || Date.now()).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600 capitalize">{o.status || 'pending'}</p>
                              <p className="text-sm font-medium">₹{(o.total || o.amount || 0).toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="card-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-red-600" />
                      Service Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {serviceData ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Service Type</label>
                          <p className="text-gray-900 capitalize">{serviceData.serviceType.replace('_', ' ')}</p>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Category</label>
                          <p className="text-gray-900">{serviceData.categoryName}</p>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Pricing Range</label>
                          <div className="space-y-2 mt-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Wedding Events</span>
                              <span className="text-sm font-medium">
                                ₹{serviceData.weddingPriceMin.toLocaleString()} - ₹{serviceData.weddingPriceMax.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Corporate Events</span>
                              <span className="text-sm font-medium">
                                ₹{serviceData.corporatePriceMin.toLocaleString()} - ₹{serviceData.corporatePriceMax.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Birthday Parties</span>
                              <span className="text-sm font-medium">
                                ₹{serviceData.birthdayPriceMin.toLocaleString()} - ₹{serviceData.birthdayPriceMax.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Festivals</span>
                              <span className="text-sm font-medium">
                                ₹{serviceData.festivalPriceMin.toLocaleString()} - ₹{serviceData.festivalPriceMax.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Package Pricing</label>
                          <div className="space-y-2 mt-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Basic Package</span>
                              <span className="text-sm font-medium">₹{serviceData.basicPackagePrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Standard Package</span>
                              <span className="text-sm font-medium">₹{serviceData.standardPackagePrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Premium Package</span>
                              <span className="text-sm font-medium">₹{serviceData.premiumPackagePrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">Advance Payment</label>
                          <p className="text-gray-900">{serviceData.advancePaymentPercentage}%</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No service information available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Revenue Trend */}
                <Card className="card-elegant mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
                      Revenue Trend (6 months)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between space-x-2">
                      {monthlyTrends.map((m: any, i: number) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md"
                            style={{ height: `${Math.max(20, Math.min(200, ((m?.revenue || 0) / maxRevenue) * 200))}px` }}
                          />
                          <p className="text-xs text-gray-600 mt-2">{m.month}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6"
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center"
                      onClick={() => window.location.href = '/vendor/profile'}
                    >
                      <Settings className="h-6 w-6 mb-2" />
                      <span>Edit Profile</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center"
                      onClick={() => window.location.href = '/vendor/services'}
                    >
                      <Package className="h-6 w-6 mb-2" />
                      <span>Manage Services</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center"
                      onClick={() => window.location.href = '/vendor/orders'}
                    >
                      <Calendar className="h-6 w-6 mb-2" />
                      <span>View Orders</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}