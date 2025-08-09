// src/app/(vendor)/orders/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Users,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  MoreVertical,
  Eye,
  Download,
  RefreshCw,
  TrendingUp,
  Package
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  serviceCategory: string
  eventDate: string
  eventTime: string
  eventLocation: string
  guestCount: number
  eventDuration: number
  specialRequirements: string
  subtotal: number
  platformFee: number
  totalAmount: number
  advancePayment: number
  remainingPayment: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'advance_paid' | 'paid' | 'failed' | 'refunded'
  createdAt: string
  updatedAt: string
  lastMessage?: string
  unreadMessages: number
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'EVA-2024-001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    customerPhone: '+91 9876543210',
    serviceName: 'Professional Wedding Photography',
    serviceCategory: 'Photography',
    eventDate: '2024-12-15',
    eventTime: '10:00',
    eventLocation: 'Hotel Grand Palace, Mumbai',
    guestCount: 250,
    eventDuration: 8,
    specialRequirements: 'Need drone shots and traditional ceremony coverage',
    subtotal: 45000,
    platformFee: 2250,
    totalAmount: 47250,
    advancePayment: 14175,
    remainingPayment: 33075,
    status: 'confirmed',
    paymentStatus: 'advance_paid',
    createdAt: '2024-11-01',
    updatedAt: '2024-11-02',
    lastMessage: 'Can you provide a timeline for the day?',
    unreadMessages: 2
  },
  {
    id: '2',
    orderNumber: 'EVA-2024-002',
    customerName: 'Raj Patel',
    customerEmail: 'raj.patel@email.com',
    customerPhone: '+91 9876543211',
    serviceName: 'Birthday Party Decoration',
    serviceCategory: 'Decoration',
    eventDate: '2024-11-28',
    eventTime: '16:00',
    eventLocation: 'Community Hall, Thane',
    guestCount: 50,
    eventDuration: 4,
    specialRequirements: 'Superhero theme with balloon arch',
    subtotal: 12000,
    platformFee: 600,
    totalAmount: 12600,
    advancePayment: 0,
    remainingPayment: 12600,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-11-05',
    updatedAt: '2024-11-05',
    unreadMessages: 1
  },
  {
    id: '3',
    orderNumber: 'EVA-2024-003',
    customerName: 'Anita Verma',
    customerEmail: 'anita.verma@email.com',
    customerPhone: '+91 9876543212',
    serviceName: 'Corporate Event Catering',
    serviceCategory: 'Catering',
    eventDate: '2024-11-20',
    eventTime: '12:00',
    eventLocation: 'Office Complex, Navi Mumbai',
    guestCount: 100,
    eventDuration: 3,
    specialRequirements: 'Vegetarian menu only, setup by 11:30 AM',
    subtotal: 28000,
    platformFee: 1400,
    totalAmount: 29400,
    advancePayment: 29400,
    remainingPayment: 0,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-10-15',
    updatedAt: '2024-11-21',
    unreadMessages: 0
  }
]

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  in_progress: { color: 'bg-purple-100 text-purple-800', icon: RefreshCw },
  completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
  refunded: { color: 'bg-gray-100 text-gray-800', icon: RefreshCw }
}

const paymentStatusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Payment Pending' },
  advance_paid: { color: 'bg-blue-100 text-blue-800', label: 'Advance Paid' },
  paid: { color: 'bg-green-100 text-green-800', label: 'Fully Paid' },
  failed: { color: 'bg-red-100 text-red-800', label: 'Payment Failed' },
  refunded: { color: 'bg-gray-100 text-gray-800', label: 'Refunded' }
}

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
    ))
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus
    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const StatsOverview = () => {
    const totalOrders = orders.length
    const pendingOrders = orders.filter(order => order.status === 'pending').length
    const completedOrders = orders.filter(order => order.status === 'completed').length
    const totalRevenue = orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.subtotal, 0)
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const [showActions, setShowActions] = useState(false)
    const StatusIcon = statusConfig[order.status].icon
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        {/* Order Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
              {order.unreadMessages > 0 && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  {order.unreadMessages} new
                </span>
              )}
            </div>
            <p className="text-gray-600">{order.serviceName}</p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <Link
                    href={`/vendor/orders/${order.id}`}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Details</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-900 font-medium">{order.customerName}</p>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-3 w-3 mr-1" />
                {order.customerEmail}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-3 w-3 mr-1" />
                {order.customerPhone}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Event Details</h4>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(order.eventDate)} at {order.eventTime}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                {order.eventLocation}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-3 w-3 mr-1" />
                {order.guestCount} guests • {order.eventDuration}h duration
              </div>
            </div>
          </div>
        </div>
        
        {/* Special Requirements */}
        {order.specialRequirements && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Special Requirements</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {order.specialRequirements}
            </p>
          </div>
        )}
        
        {/* Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(order.totalAmount)}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Advance Paid</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(order.advancePayment)}</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-lg font-bold text-yellow-600">{formatCurrency(order.remainingPayment)}</p>
          </div>
        </div>
        
        {/* Payment Status */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusConfig[order.paymentStatus].color}`}>
            {paymentStatusConfig[order.paymentStatus].label}
          </span>
          <p className="text-xs text-gray-500">
            Updated {formatDate(order.updatedAt)}
          </p>
        </div>
        
        {/* Last Message */}
        {order.lastMessage && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <MessageSquare className="h-4 w-4 inline mr-1" />
              "{order.lastMessage}"
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          {order.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Accept Order
              </button>
              <button
                onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Decline
              </button>
            </>
          )}
          
          {order.status === 'confirmed' && (
            <button
              onClick={() => handleStatusUpdate(order.id, 'in_progress')}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Start Service
            </button>
          )}
          
          {order.status === 'in_progress' && (
            <button
              onClick={() => handleStatusUpdate(order.id, 'completed')}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Mark Complete
            </button>
          )}
          
          <Link
            href={`/vendor/orders/${order.id}`}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
          >
            View Details
          </Link>
          
          <Link
            href={`/vendor/messages?order=${order.id}`}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center"
          >
            <MessageSquare className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">Track and manage your service bookings</p>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4 space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            {showFilters && (
              <div className="flex items-center space-x-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select
                  value={selectedPaymentStatus}
                  onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="advance_paid">Advance Paid</option>
                  <option value="paid">Fully Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search criteria' : 'New orders will appear here once customers book your services'}
          </p>
        </div>
      )}
    </div>
  )
}