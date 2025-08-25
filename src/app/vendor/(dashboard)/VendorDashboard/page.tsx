// src/app/(vendor)/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Star,
  Users,
  Calendar,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface DashboardStats {
  totalEarnings: number
  earningsChange: number
  totalOrders: number
  ordersChange: number
  averageRating: number
  ratingChange: number
  totalViews: number
  viewsChange: number
}

interface RecentOrder {
  id: string
  customerName: string
  serviceName: string
  eventDate: string
  amount: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
}

interface QuickAction {
  title: string
  description: string
  href: string
  icon: React.ComponentType<any>
  color: string
}

const quickActions: QuickAction[] = [
  {
    title: 'Create Service Card',
    description: 'Add a new service to your portfolio',
    href: '/vendor/cards/create',
    icon: Plus,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'View Analytics',
    description: 'Check your performance metrics',
    href: '/vendor/analytics',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Manage Calendar',
    description: 'Update your availability',
    href: '/vendor/calendar',
    icon: Calendar,
    color: 'from-green-500 to-emerald-500'
  }
]

export default function VendorDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEarnings: 125000,
    earningsChange: 12.5,
    totalOrders: 48,
    ordersChange: 8.3,
    averageRating: 4.8,
    ratingChange: 0.2,
    totalViews: 2340,
    viewsChange: -2.1
  })

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    {
      id: '1',
      customerName: 'Priya Sharma',
      serviceName: 'Wedding Photography',
      eventDate: '2024-12-15',
      amount: 45000,
      status: 'confirmed'
    },
    {
      id: '2',
      customerName: 'Raj Patel',
      serviceName: 'Birthday Decoration',
      eventDate: '2024-11-28',
      amount: 12000,
      status: 'pending'
    },
    {
      id: '3',
      customerName: 'Anita Verma',
      serviceName: 'Corporate Catering',
      eventDate: '2024-11-25',
      amount: 28000,
      status: 'completed'
    }
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color 
  }: { 
    title: string
    value: string
    change: number
    icon: React.ComponentType<any>
    color: string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
            <p className="text-purple-100 text-lg">
              You have 3 new orders and 2 messages waiting for you.
            </p>
          </div>
          <div className="hidden md:block">
            <Link
              href="/vendor/cards/create"
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Service
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          change={stats.earningsChange}
          icon={DollarSign}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change={stats.ordersChange}
          icon={ShoppingBag}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating.toString()}
          change={stats.ratingChange}
          icon={Star}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Profile Views"
          value={stats.totalViews.toString()}
          change={stats.viewsChange}
          icon={Eye}
          color="from-purple-500 to-pink-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={action.href}
              className="block bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-purple-600 font-medium">
                Get started
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Link
              href="/vendor/orders"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
            >
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{order.serviceName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">Customer: {order.customerName}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Event Date: {new Date(order.eventDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
                <div className="text-right ml-6">
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(order.amount)}</p>
                  <Link
                    href={`/vendor/orders/${order.id}`}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Highlights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-600">Orders Completed</span>
              </div>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                <span className="text-gray-600">Pending Reviews</span>
              </div>
              <span className="font-semibold text-gray-900">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-3" />
                <span className="text-gray-600">New Reviews</span>
              </div>
              <span className="font-semibold text-gray-900">8</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Boost your visibility:</strong> Upload high-quality photos to your service cards
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Improve ratings:</strong> Respond to customer messages within 2 hours
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Increase bookings:</strong> Keep your calendar updated with availability
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}