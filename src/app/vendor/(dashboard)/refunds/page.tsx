'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  RefreshCw,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  Download,
  FileText,
  User,
  CreditCard,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import Button from '@/components/ui/button'

interface RefundRequest {
  id: string
  refundNumber: string
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  serviceName: string
  orderAmount: number
  refundAmount: number
  reason: string
  description: string
  requestDate: string
  processedDate?: string
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed'
  adminNotes?: string
  attachments: string[]
  refundType: 'full' | 'partial'
  refundMethod: 'original_payment' | 'bank_transfer' | 'wallet'
}

const mockRefunds: RefundRequest[] = [
  {
    id: '1',
    refundNumber: 'REF-2024-001',
    orderId: 'o1',
    orderNumber: 'EVA-2024-001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    serviceName: 'Wedding Photography',
    orderAmount: 47250,
    refundAmount: 47250,
    reason: 'Event Cancelled',
    description: 'Wedding cancelled due to family emergency. Requesting full refund as per cancellation policy.',
    requestDate: '2024-11-15T10:30:00Z',
    status: 'pending',
    attachments: ['cancellation-proof.pdf'],
    refundType: 'full',
    refundMethod: 'original_payment'
  },
  {
    id: '2',
    refundNumber: 'REF-2024-002',
    orderId: 'o2',
    orderNumber: 'EVA-2024-002',
    customerName: 'Raj Patel',
    customerEmail: 'raj.patel@email.com',
    serviceName: 'Birthday Decoration',
    orderAmount: 12600,
    refundAmount: 6300,
    reason: 'Service Not Satisfactory',
    description: 'Setup was incomplete and decorations were damaged. Requesting partial refund.',
    requestDate: '2024-11-12T16:45:00Z',
    processedDate: '2024-11-14T14:20:00Z',
    status: 'approved',
    adminNotes: 'Partial refund approved based on vendor acknowledgment of issues.',
    attachments: ['damage-photos.jpg'],
    refundType: 'partial',
    refundMethod: 'original_payment'
  },
  {
    id: '3',
    refundNumber: 'REF-2024-003',
    orderId: 'o3',
    orderNumber: 'EVA-2024-003',
    customerName: 'Anita Verma',
    customerEmail: 'anita.verma@email.com',
    serviceName: 'Corporate Catering',
    orderAmount: 29400,
    refundAmount: 5000,
    reason: 'Late Delivery',
    description: 'Catering arrived 2 hours late causing significant inconvenience.',
    requestDate: '2024-11-10T09:15:00Z',
    processedDate: '2024-11-11T11:30:00Z',
    status: 'completed',
    adminNotes: 'Compensation approved for late delivery.',
    attachments: [],
    refundType: 'partial',
    refundMethod: 'original_payment'
  }
]

export default function RefundsPage() {
  const [refunds, setRefunds] = useState<RefundRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRefunds(mockRefunds)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.refundNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || refund.status === selectedStatus
    const matchesType = selectedType === 'all' || refund.refundType === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'approved': return 'bg-green-500/20 text-green-400'
      case 'rejected': return 'bg-red-500/20 text-red-400'
      case 'processing': return 'bg-blue-500/20 text-blue-400'
      case 'completed': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'processing': return <RefreshCw className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const stats = [
    { title: 'Total Refunds', value: refunds.length, icon: RefreshCw, color: 'bg-blue-500', change: 12.5, trend: 'up' },
    { title: 'Pending', value: refunds.filter(r => r.status === 'pending').length, icon: Clock, color: 'bg-yellow-500', change: 8.7, trend: 'up' },
    { title: 'Approved', value: refunds.filter(r => r.status === 'approved').length, icon: CheckCircle, color: 'bg-green-500', change: 15.3, trend: 'up' },
    { title: 'Total Amount', value: refunds.reduce((sum, r) => sum + r.refundAmount, 0), icon: DollarSign, color: 'bg-purple-500', change: 22.1, trend: 'up' }
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
              Refund Management
            </motion.h1>
            <p className="text-white/60 mt-1">Review and process customer refund requests</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
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
                    {stat.title.includes('Amount') ? formatCurrency(stat.value) : stat.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-white/60 mb-2">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder="Search refunds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">All Types</option>
              <option value="full">Full Refund</option>
              <option value="partial">Partial Refund</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <Filter className="h-4 w-4" />
            <span>{filteredRefunds.length} refunds found</span>
          </div>
        </div>
      </motion.div>

      {/* Refunds List */}
      <div className="space-y-6">
        {filteredRefunds.map((refund, index) => (
          <motion.div
            key={refund.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">{refund.refundNumber}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                    {getStatusIcon(refund.status)}
                    <span className="ml-1 capitalize">{refund.status}</span>
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    refund.refundType === 'full' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {refund.refundType === 'full' ? 'Full' : 'Partial'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="text-sm font-medium text-white">{refund.customerName}</p>
                      <p className="text-xs text-white/50">{refund.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="text-sm font-medium text-white">{refund.serviceName}</p>
                      <p className="text-xs text-white/50">{refund.orderNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="text-sm font-medium text-white">{formatCurrency(refund.refundAmount)}</p>
                      <p className="text-xs text-white/50">of {formatCurrency(refund.orderAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-1">Reason: {refund.reason}</h4>
                  <p className="text-sm text-white/80">{refund.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Requested: {formatDate(refund.requestDate)}</span>
                    </span>
                    {refund.processedDate && (
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Processed: {formatDate(refund.processedDate)}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
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
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>

                {refund.adminNotes && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-white/80"><strong>Admin Notes:</strong> {refund.adminNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRefunds.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="h-12 w-12 text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No refund requests found</h3>
          <p className="text-white/60 mb-6">Refund requests from customers will appear here</p>
        </motion.div>
      )}
    </div>
  )
}