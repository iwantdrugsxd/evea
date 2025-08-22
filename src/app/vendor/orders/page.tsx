'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Package,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  MessageCircle,
  AlertCircle
} from 'lucide-react'
import Button from '@/components/ui/button'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceTitle: string
  amount: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  orderDate: string
  eventDate: string
  location: string
  guestCount: number
  specialRequirements: string
  rating?: number
  review?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          customerName: 'Priya Sharma',
          customerEmail: 'priya.sharma@email.com',
          customerPhone: '+91 98765 43210',
          serviceTitle: 'Wedding Photography Package',
          amount: 25000,
          status: 'confirmed',
          orderDate: '2024-12-15',
          eventDate: '2024-12-28',
          location: 'Mumbai, Maharashtra',
          guestCount: 150,
          specialRequirements: 'Traditional Indian wedding ceremony with reception'
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          customerName: 'Rajesh Kumar',
          customerEmail: 'rajesh.kumar@email.com',
          customerPhone: '+91 87654 32109',
          serviceTitle: 'Corporate Event Catering',
          amount: 45000,
          status: 'in_progress',
          orderDate: '2024-12-14',
          eventDate: '2024-12-20',
          location: 'Delhi, NCR',
          guestCount: 200,
          specialRequirements: 'Vegetarian menu with international cuisine options'
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-003',
          customerName: 'Anita Patel',
          customerEmail: 'anita.patel@email.com',
          customerPhone: '+91 76543 21098',
          serviceTitle: 'Birthday Party Decoration',
          amount: 12000,
          status: 'completed',
          orderDate: '2024-12-10',
          eventDate: '2024-12-15',
          location: 'Bangalore, Karnataka',
          guestCount: 50,
          specialRequirements: 'Pink and gold theme for 10th birthday'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'confirmed': return 'bg-blue-500/20 text-blue-400'
      case 'in_progress': return 'bg-purple-500/20 text-purple-400'
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock
      case 'confirmed': return CheckCircle
      case 'in_progress': return Package
      case 'completed': return CheckCircle
      case 'cancelled': return XCircle
      default: return AlertCircle
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    { title: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'bg-blue-500', change: 12.5, trend: 'up' },
    { title: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'bg-yellow-500', change: -5.2, trend: 'down' },
    { title: 'Completed Orders', value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, color: 'bg-green-500', change: 8.7, trend: 'up' },
    { title: 'Total Revenue', value: orders.reduce((sum, o) => sum + o.amount, 0), icon: DollarSign, color: 'bg-purple-500', change: 15.3, trend: 'up' }
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
                  Orders Management
                </motion.h1>
                <p className="text-white/60 mt-1">Track and manage all your customer orders</p>
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
                        {typeof stat.value === 'number' && stat.title.includes('Revenue') 
                          ? formatCurrency(stat.value)
                          : stat.value.toLocaleString()
                        }
                      </p>
                      <p className="text-sm text-white/60">{stat.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search orders by customer name, service, or order number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{order.serviceTitle}</h3>
                            <p className="text-white/60 text-sm">{order.orderNumber}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                            <StatusIcon className="h-3 w-3" />
                            <span className="capitalize">{order.status.replace('_', ' ')}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-white/60" />
                            <div>
                              <p className="text-sm font-medium text-white">{order.customerName}</p>
                              <p className="text-xs text-white/50">{order.customerEmail}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-white/60" />
                            <div>
                              <p className="text-sm font-medium text-white">Event Date</p>
                              <p className="text-xs text-white/50">{new Date(order.eventDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-white/60" />
                            <div>
                              <p className="text-sm font-medium text-white">Location</p>
                              <p className="text-xs text-white/50">{order.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-white/60" />
                            <div>
                              <p className="text-sm font-medium text-white">Amount</p>
                              <p className="text-xs text-white/50">{formatCurrency(order.amount)}</p>
                            </div>
                          </div>
                        </div>

                        {order.specialRequirements && (
                          <div className="bg-white/5 rounded-xl p-3 mb-4">
                            <p className="text-sm text-white/80">
                              <span className="font-medium">Special Requirements:</span> {order.specialRequirements}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-400 border-green-500/20 hover:bg-green-500/10"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-12 w-12 text-white/40" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No orders found</h3>
              <p className="text-white/60 mb-6">Orders will appear here once customers place them</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}