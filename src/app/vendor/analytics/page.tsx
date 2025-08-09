// src/app/(vendor)/analytics/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  ShoppingBag,
  Star,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'

interface AnalyticsData {
  // Revenue Metrics
  totalRevenue: number
  revenueChange: number
  monthlyRevenue: number[]
  
  // Booking Metrics
  totalBookings: number
  bookingsChange: number
  conversionRate: number
  conversionChange: number
  
  // Engagement Metrics
  profileViews: number
  viewsChange: number
  avgRating: number
  ratingChange: number
  totalReviews: number
  
  // Category Performance
  categoryPerformance: {
    category: string
    revenue: number
    bookings: number
    avgRating: number
  }[]
  
  // Monthly Trends
  monthlyTrends: {
    month: string
    revenue: number
    bookings: number
    views: number
  }[]
  
  // Top Services
  topServices: {
    id: string
    name: string
    revenue: number
    bookings: number
    views: number
    rating: number
  }[]
}

const mockAnalyticsData: AnalyticsData = {
  totalRevenue: 285000,
  revenueChange: 23.5,
  monthlyRevenue: [45000, 52000, 48000, 67000, 58000, 85000],
  
  totalBookings: 98,
  bookingsChange: 15.8,
  conversionRate: 4.2,
  conversionChange: 0.8,
  
  profileViews: 5420,
  viewsChange: -2.3,
  avgRating: 4.7,
  ratingChange: 0.1,
  totalReviews: 267,
  
  categoryPerformance: [
    { category: 'Wedding Photography', revenue: 180000, bookings: 40, avgRating: 4.8 },
    { category: 'Birthday Decoration', revenue: 65000, bookings: 35, avgRating: 4.6 },
    { category: 'Corporate Catering', revenue: 40000, bookings: 23, avgRating: 4.9 }
  ],
  
  monthlyTrends: [
    { month: 'Jun', revenue: 45000, bookings: 12, views: 890 },
    { month: 'Jul', revenue: 52000, bookings: 15, views: 950 },
    { month: 'Aug', revenue: 48000, bookings: 14, views: 820 },
    { month: 'Sep', revenue: 67000, bookings: 18, views: 1200 },
    { month: 'Oct', revenue: 58000, bookings: 16, views: 980 },
    { month: 'Nov', revenue: 85000, bookings: 23, views: 1580 }
  ],
  
  topServices: [
    { id: '1', name: 'Professional Wedding Photography', revenue: 180000, bookings: 40, views: 2340, rating: 4.8 },
    { id: '2', name: 'Birthday Party Decoration', revenue: 65000, bookings: 35, views: 1580, rating: 4.6 },
    { id: '3', name: 'Corporate Event Catering', revenue: 40000, bookings: 23, views: 1240, rating: 4.9 }
  ]
}

export default function VendorAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(mockAnalyticsData)
  const [timeRange, setTimeRange] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [isLoading, setIsLoading] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color,
    suffix = ''
  }: { 
    title: string
    value: string | number
    change: number
    icon: React.ComponentType<any>
    color: string
    suffix?: string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  )

  const RevenueChart = () => {
    const maxRevenue = Math.max(...analyticsData.monthlyTrends.map(d => d.revenue))
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {analyticsData.monthlyTrends.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md relative group cursor-pointer"
                style={{
                  height: `${(data.revenue / maxRevenue) * 200}px`,
                  minHeight: '20px'
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(data.revenue)}
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{data.month}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const CategoryPerformance = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
      <div className="space-y-4">
        {analyticsData.categoryPerformance.map((category, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{category.category}</h4>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{category.avgRating}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(category.revenue)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bookings</p>
                <p className="text-lg font-bold text-blue-600">{category.bookings}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const TopServices = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Services</h3>
      <div className="space-y-4">
        {analyticsData.topServices.map((service, index) => (
          <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{service.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{service.bookings} bookings</span>
                  <span>{service.views} views</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    {service.rating}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{formatCurrency(service.revenue)}</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const BookingConversionChart = () => {
    const conversionData = analyticsData.monthlyTrends.map(trend => ({
      month: trend.month,
      conversion: (trend.bookings / trend.views * 100).toFixed(1)
    }))
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Conversion Rate</h3>
        <div className="h-48 flex items-end justify-between space-x-2">
          {conversionData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md relative group cursor-pointer"
                style={{
                  height: `${parseFloat(data.conversion) * 4}px`,
                  minHeight: '10px'
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.conversion}%
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{data.month}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const QuickInsights = () => (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Best performing month:</span>
          <span className="font-bold">November (₹85,000)</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Top category:</span>
          <span className="font-bold">Wedding Photography</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Average order value:</span>
          <span className="font-bold">{formatCurrency(analyticsData.totalRevenue / analyticsData.totalBookings)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Customer satisfaction:</span>
          <span className="font-bold">{analyticsData.avgRating}/5.0 ⭐</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your business performance and growth</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setIsLoading(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(analyticsData.totalRevenue)}
          change={analyticsData.revenueChange}
          icon={DollarSign}
          color="from-green-500 to-emerald-500"
        />
        <MetricCard
          title="Total Bookings"
          value={analyticsData.totalBookings}
          change={analyticsData.bookingsChange}
          icon={ShoppingBag}
          color="from-blue-500 to-cyan-500"
        />
        <MetricCard
          title="Profile Views"
          value={analyticsData.profileViews}
          change={analyticsData.viewsChange}
          icon={Eye}
          color="from-purple-500 to-pink-500"
        />
        <MetricCard
          title="Conversion Rate"
          value={analyticsData.conversionRate}
          change={analyticsData.conversionChange}
          icon={TrendingUp}
          color="from-yellow-500 to-orange-500"
          suffix="%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <BookingConversionChart />
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPerformance />
        <TopServices />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickInsights />
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Ratings</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = Math.floor(Math.random() * 50) + 10
              const percentage = (count / analyticsData.totalReviews * 100).toFixed(1)
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{analyticsData.avgRating}</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Tips</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Improve visibility:</strong> Your profile views are down 2.3%. Consider updating your photos and descriptions.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Great work!</strong> Your conversion rate is above average. Keep maintaining quality service.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Opportunity:</strong> Corporate events show potential. Consider expanding this category.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}