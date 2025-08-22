'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Star,
  Users,
  Package,
  User
} from 'lucide-react'
import Button from '@/components/ui/button'

interface EarningsData {
  totalEarnings: number
  monthlyEarnings: number
  pendingAmount: number
  completedOrders: number
  averageOrderValue: number
  monthlyData: Array<{
    month: string
    earnings: number
    orders: number
  }>
  topServices: Array<{
    name: string
    earnings: number
    orders: number
    percentage: number
  }>
  recentTransactions: Array<{
    id: string
    customerName: string
    serviceTitle: string
    amount: number
    status: 'completed' | 'pending' | 'cancelled'
    date: string
    orderId: string
  }>
}

export default function EarningsPage() {
  const [data, setData] = useState<EarningsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        totalEarnings: 1250000,
        monthlyEarnings: 85000,
        pendingAmount: 25000,
        completedOrders: 156,
        averageOrderValue: 8000,
        monthlyData: [
          { month: 'Jan', earnings: 65000, orders: 12 },
          { month: 'Feb', earnings: 72000, orders: 15 },
          { month: 'Mar', earnings: 68000, orders: 13 },
          { month: 'Apr', earnings: 81000, orders: 18 },
          { month: 'May', earnings: 76000, orders: 16 },
          { month: 'Jun', earnings: 92000, orders: 22 },
          { month: 'Jul', earnings: 88000, orders: 20 },
          { month: 'Aug', earnings: 95000, orders: 24 },
          { month: 'Sep', earnings: 102000, orders: 26 },
          { month: 'Oct', earnings: 98000, orders: 23 },
          { month: 'Nov', earnings: 105000, orders: 28 },
          { month: 'Dec', earnings: 112000, orders: 30 }
        ],
        topServices: [
          { name: 'Wedding Photography', earnings: 450000, orders: 45, percentage: 36 },
          { name: 'Event Catering', earnings: 380000, orders: 38, percentage: 30.4 },
          { name: 'Party Decoration', earnings: 220000, orders: 22, percentage: 17.6 },
          { name: 'Corporate Events', earnings: 200000, orders: 20, percentage: 16 }
        ],
        recentTransactions: [
          {
            id: '1',
            customerName: 'Priya Sharma',
            serviceTitle: 'Wedding Photography Package',
            amount: 25000,
            status: 'completed',
            date: '2024-12-15',
            orderId: 'ORD-2024-001'
          },
          {
            id: '2',
            customerName: 'Rajesh Kumar',
            serviceTitle: 'Corporate Event Catering',
            amount: 45000,
            status: 'pending',
            date: '2024-12-14',
            orderId: 'ORD-2024-002'
          },
          {
            id: '3',
            customerName: 'Anita Patel',
            serviceTitle: 'Birthday Party Decoration',
            amount: 12000,
            status: 'completed',
            date: '2024-12-13',
            orderId: 'ORD-2024-003'
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
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const stats = [
    { 
      title: 'Total Earnings', 
      value: data?.totalEarnings || 0, 
      icon: DollarSign, 
      color: 'bg-green-500', 
      change: 15.3, 
      trend: 'up',
      format: 'currency'
    },
    { 
      title: 'This Month', 
      value: data?.monthlyEarnings || 0, 
      icon: Calendar, 
      color: 'bg-blue-500', 
      change: 8.7, 
      trend: 'up',
      format: 'currency'
    },
    { 
      title: 'Pending Amount', 
      value: data?.pendingAmount || 0, 
      icon: Clock, 
      color: 'bg-yellow-500', 
      change: 12.5, 
      trend: 'up',
      format: 'currency'
    },
    { 
      title: 'Avg Order Value', 
      value: data?.averageOrderValue || 0, 
      icon: Target, 
      color: 'bg-purple-500', 
      change: 5.2, 
      trend: 'up',
      format: 'currency'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="p-6">
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
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
                  Earnings & Revenue
                </motion.h1>
                <p className="text-white/60 mt-1">Track your earnings and financial performance</p>
              </div>
              <div className="flex items-center space-x-2">
                {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeRange === range
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {range}
                  </button>
                ))}
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
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
                          <ArrowUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-400" />
                        )}
                        <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">
                        {formatCurrency(stat.value)}
                      </p>
                      <p className="text-sm text-white/60">{stat.title}</p>
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
      </div>
    </div>
  )
}