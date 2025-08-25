'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Star,
  Clock,
  MapPin,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    averageRating: number
    revenueChange: number
    ordersChange: number
    customersChange: number
    ratingChange: number
  }
  topServices: Array<{
    name: string
    orders: number
    revenue: number
    rating: number
  }>
  customerDemographics: Array<{
    location: string
    customers: number
    revenue: number
  }>
  recentActivity: Array<{
    type: 'revenue' | 'rating' | 'customer' | 'order'
    description: string
    date: string
    amount?: number
    trend: 'up' | 'down'
  }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        overview: {
          totalRevenue: 1250000,
          totalOrders: 156,
          totalCustomers: 89,
          averageRating: 4.7,
          revenueChange: 12.5,
          ordersChange: 8.7,
          customersChange: 15.3,
          ratingChange: 2.1
        },
        topServices: [
          { name: 'Wedding Photography', orders: 45, revenue: 450000, rating: 4.8 },
          { name: 'Corporate Catering', orders: 32, revenue: 320000, rating: 4.6 },
          { name: 'Event Decoration', orders: 28, revenue: 280000, rating: 4.7 },
          { name: 'Sound & Lighting', orders: 22, revenue: 200000, rating: 4.5 }
        ],
        customerDemographics: [
          { location: 'Mumbai', customers: 35, revenue: 450000 },
          { location: 'Delhi', customers: 28, revenue: 380000 },
          { location: 'Bangalore', customers: 18, revenue: 250000 },
          { location: 'Pune', customers: 8, revenue: 170000 }
        ],
        recentActivity: [
          { type: 'revenue', description: 'New order received', date: '2 hours ago', amount: 25000, trend: 'up' },
          { type: 'rating', description: '5-star review received', date: '4 hours ago', trend: 'up' },
          { type: 'customer', description: 'New customer registered', date: '6 hours ago', trend: 'up' },
          { type: 'order', description: 'Order completed', date: '1 day ago', amount: 18000, trend: 'up' }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const stats = [
    { 
      title: 'Total Revenue', 
      value: data?.overview.totalRevenue || 0, 
      icon: DollarSign, 
      color: 'bg-green-500', 
      change: data?.overview.revenueChange || 0, 
      trend: 'up' as const,
      format: 'currency'
    },
    { 
      title: 'Total Orders', 
      value: data?.overview.totalOrders || 0, 
      icon: ShoppingCart, 
      color: 'bg-blue-500', 
      change: data?.overview.ordersChange || 0, 
      trend: 'up' as const,
      format: 'number'
    },
    { 
      title: 'Total Customers', 
      value: data?.overview.totalCustomers || 0, 
      icon: Users, 
      color: 'bg-purple-500', 
      change: data?.overview.customersChange || 0, 
      trend: 'up' as const,
      format: 'number'
    },
    { 
      title: 'Average Rating', 
      value: data?.overview.averageRating || 0, 
      icon: Star, 
      color: 'bg-yellow-500', 
      change: data?.overview.ratingChange || 0, 
      trend: 'up' as const,
      format: 'rating'
    }
  ]

  if (loading) {
    return (
      <div className="w-full max-w-none">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded-2xl w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white/10 rounded-3xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-none">
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
              Analytics
            </motion.h1>
            <p className="text-white/60 mt-1">Track your business performance and insights</p>
          </div>
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
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {stat.format === 'currency' 
                      ? formatCurrency(stat.value)
                      : stat.format === 'rating'
                      ? `${stat.value.toFixed(1)} ⭐`
                      : stat.value.toLocaleString()
                    }
                  </p>
                  <p className="text-sm text-white/60 mb-2">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Top Services</h3>
            <ShoppingCart className="h-5 w-5 text-blue-400" />
          </div>
          <div className="space-y-4">
            {data?.topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{service.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>{service.orders} orders</span>
                    <span className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                      {service.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{formatCurrency(service.revenue)}</p>
                  <p className="text-xs text-white/50">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Customer Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Customer Demographics</h3>
            <MapPin className="h-5 w-5 text-purple-400" />
          </div>
          <div className="space-y-4">
            {data?.customerDemographics.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-white">{location.location}</h4>
                    <p className="text-sm text-white/60">{location.customers} customers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{formatCurrency(location.revenue)}</p>
                  <p className="text-xs text-white/50">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <Clock className="h-5 w-5 text-blue-400" />
          </div>
          <div className="space-y-4">
            {data?.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'revenue' ? 'bg-green-500/20' :
                    activity.type === 'rating' ? 'bg-yellow-500/20' :
                    activity.type === 'customer' ? 'bg-blue-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    {activity.type === 'revenue' && <DollarSign className="h-4 w-4 text-green-400" />}
                    {activity.type === 'rating' && <Star className="h-4 w-4 text-yellow-400" />}
                    {activity.type === 'customer' && <Users className="h-4 w-4 text-blue-400" />}
                    {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-purple-400" />}
                  </div>
                  <div>
                    <p className="font-medium text-white">{activity.description}</p>
                    <p className="text-sm text-white/60">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {activity.amount && (
                    <span className="font-bold text-white">{formatCurrency(activity.amount)}</span>
                  )}
                  {activity.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}