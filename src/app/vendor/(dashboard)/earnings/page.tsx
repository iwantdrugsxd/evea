'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Wallet,
  PiggyBank,
  LineChart,
  PieChart,
  Activity,
  User,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface EarningsData {
  overview: {
    totalEarnings: number
    thisMonth: number
    lastMonth: number
    pendingPayouts: number
    totalEarningsChange: number
    thisMonthChange: number
    lastMonthChange: number
    pendingPayoutsChange: number
  }
  topServices: Array<{
    name: string
    orders: number
    earnings: number
    percentage: number
  }>
  recentTransactions: Array<{
    id: string
    customerName: string
    serviceTitle: string
    orderId: string
    amount: number
    status: 'completed' | 'pending' | 'processing'
    date: string
  }>
}

export default function EarningsPage() {
  const [data, setData] = useState<EarningsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        overview: {
          totalEarnings: 1250000,
          thisMonth: 125000,
          lastMonth: 98000,
          pendingPayouts: 45000,
          totalEarningsChange: 12.5,
          thisMonthChange: 27.6,
          lastMonthChange: 15.3,
          pendingPayoutsChange: 8.7
        },
        topServices: [
          { name: 'Wedding Photography', orders: 45, earnings: 450000, percentage: 36 },
          { name: 'Corporate Catering', orders: 32, earnings: 320000, percentage: 25.6 },
          { name: 'Event Decoration', orders: 28, earnings: 280000, percentage: 22.4 },
          { name: 'Sound & Lighting', orders: 22, earnings: 200000, percentage: 16 }
        ],
        recentTransactions: [
          {
            id: '1',
            customerName: 'Priya Sharma',
            serviceTitle: 'Wedding Photography Package',
            orderId: 'ORD-2024-001',
            amount: 25000,
            status: 'completed',
            date: '2024-12-15'
          },
          {
            id: '2',
            customerName: 'Rajesh Kumar',
            serviceTitle: 'Corporate Event Catering',
            orderId: 'ORD-2024-002',
            amount: 45000,
            status: 'pending',
            date: '2024-12-14'
          },
          {
            id: '3',
            customerName: 'Anita Patel',
            serviceTitle: 'Birthday Party Decoration',
            orderId: 'ORD-2024-003',
            amount: 12000,
            status: 'processing',
            date: '2024-12-13'
          }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'processing': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const stats = [
    { 
      title: 'Total Earnings', 
      value: data?.overview.totalEarnings || 0, 
      icon: DollarSign, 
      color: 'bg-green-500', 
      change: data?.overview.totalEarningsChange || 0, 
      trend: 'up' as const,
      format: 'currency'
    },
    { 
      title: 'This Month', 
      value: data?.overview.thisMonth || 0, 
      icon: Calendar, 
      color: 'bg-blue-500', 
      change: data?.overview.thisMonthChange || 0, 
      trend: 'up' as const,
      format: 'currency'
    },
    { 
      title: 'Last Month', 
      value: data?.overview.lastMonth || 0, 
      icon: TrendingUp, 
      color: 'bg-purple-500', 
      change: data?.overview.lastMonthChange || 0, 
      trend: 'up' as const,
      format: 'currency'
    },
    { 
      title: 'Pending Payouts', 
      value: data?.overview.pendingPayouts || 0, 
      icon: Wallet, 
      color: 'bg-yellow-500', 
      change: data?.overview.pendingPayoutsChange || 0, 
      trend: 'up' as const,
      format: 'currency'
    }
  ]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
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
              Earnings
            </motion.h1>
            <p className="text-white/60 mt-1">Track your revenue and financial performance</p>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Monthly Earnings</h3>
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-12 w-12 text-white/40 mx-auto mb-2" />
              <p className="text-white/50">Earnings chart will be displayed here</p>
            </div>
          </div>
        </motion.div>

        {/* Service Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Service Performance</h3>
            <PieChart className="h-5 w-5 text-purple-400" />
          </div>
          <div className="space-y-4">
            {data?.topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{service.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>{service.orders} orders</span>
                    <span>{service.percentage}% of total</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{formatCurrency(service.earnings)}</p>
                  <p className="text-xs text-white/50">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
          <Activity className="h-5 w-5 text-blue-400" />
        </div>
        <div className="space-y-4">
          {data?.recentTransactions.map((transaction, index) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{transaction.customerName}</h4>
                  <p className="text-sm text-white/60">{transaction.serviceTitle}</p>
                  <p className="text-xs text-white/50">Order: {transaction.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-white">{formatCurrency(transaction.amount)}</p>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </div>
                </div>
                <p className="text-xs text-white/50">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}