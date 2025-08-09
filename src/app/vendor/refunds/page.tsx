'use client'

import { useState } from 'react'
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
  CreditCard
} from 'lucide-react'

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
    refundMethod: 'bank_transfer'
  }
]

export default function VendorRefundsPage() {
  const [refunds, setRefunds] = useState<RefundRequest[]>(mockRefunds)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null)
  const [showModal, setShowModal] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'processing':
        return 'bg-purple-100 text-purple-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'approved':
        return <CheckCircle className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      case 'processing':
        return <RefreshCw className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const handleStatusUpdate = (refundId: string, newStatus: RefundRequest['status'], notes?: string) => {
    setRefunds(prev =>
      prev.map(refund =>
        refund.id === refundId
          ? {
              ...refund,
              status: newStatus,
              processedDate: new Date().toISOString(),
              adminNotes: notes || refund.adminNotes
            }
          : refund
      )
    )
  }

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.refundNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || refund.status === selectedStatus
    const matchesType = selectedType === 'all' || refund.refundType === selectedType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const RefundStats = () => {
    const totalRefunds = refunds.length
    const pendingRefunds = refunds.filter(r => r.status === 'pending').length
    const approvedRefunds = refunds.filter(r => r.status === 'approved' || r.status === 'completed').length
    const totalRefundAmount = refunds
      .filter(r => r.status === 'approved' || r.status === 'completed')
      .reduce((sum, r) => sum + r.refundAmount, 0)

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{totalRefunds}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <RefreshCw className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingRefunds}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedRefunds}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Refunded</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRefundAmount)}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RefundModal = () => {
    if (!selectedRefund) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-xl shadow-xl mx-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Refund Request Details</h3>
            <button
              onClick={() => setShowModal(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Refund Number</label>
                <p className="text-gray-900 font-medium">{selectedRefund.refundNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Order Number</label>
                <p className="text-gray-900 font-medium">{selectedRefund.orderNumber}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-900">{selectedRefund.customerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{selectedRefund.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Details */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Refund Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Service</label>
                  <p className="text-gray-900">{selectedRefund.serviceName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Refund Type</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedRefund.refundType === 'full' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedRefund.refundType === 'full' ? 'Full Refund' : 'Partial Refund'}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Order Amount</label>
                  <p className="text-gray-900">{formatCurrency(selectedRefund.orderAmount)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Refund Amount</label>
                  <p className="text-gray-900 font-bold text-red-600">{formatCurrency(selectedRefund.refundAmount)}</p>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="text-sm font-medium text-gray-600">Reason</label>
              <p className="text-gray-900 font-medium">{selectedRefund.reason}</p>
              <p className="text-gray-600 mt-2">{selectedRefund.description}</p>
            </div>

            {/* Admin Notes */}
            {selectedRefund.adminNotes && (
              <div>
                <label className="text-sm font-medium text-gray-600">Admin Notes</label>
                <p className="text-gray-900 bg-blue-50 p-3 rounded-lg">{selectedRefund.adminNotes}</p>
              </div>
            )}

            {/* Actions */}
            {selectedRefund.status === 'pending' && (
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedRefund.id, 'approved', 'Refund approved by vendor')
                    setShowModal(false)
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Approve Refund
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedRefund.id, 'rejected', 'Refund rejected by vendor')
                    setShowModal(false)
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Reject Refund
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Refund Management</h1>
          <p className="text-gray-600 mt-1">Review and process customer refund requests</p>
        </div>
        <button className="mt-4 md:mt-0 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <RefundStats />

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4 space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search refunds..."
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
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Types</option>
                  <option value="full">Full Refund</option>
                  <option value="partial">Partial Refund</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Refunds List */}
      <div className="space-y-4">
        {filteredRefunds.map(refund => (
          <motion.div
            key={refund.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{refund.refundNumber}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                    {getStatusIcon(refund.status)}
                    <span className="ml-1 capitalize">{refund.status}</span>
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    refund.refundType === 'full' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {refund.refundType === 'full' ? 'Full' : 'Partial'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium text-gray-900">{refund.customerName}</p>
                    <p className="text-sm text-gray-500">{refund.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-medium text-gray-900">{refund.serviceName}</p>
                    <p className="text-sm text-gray-500">Requested: {formatDate(refund.requestDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Refund Amount</p>
                    <p className="font-bold text-red-600 text-lg">{formatCurrency(refund.refundAmount)}</p>
                    <p className="text-sm text-gray-500">of {formatCurrency(refund.orderAmount)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Reason: <span className="font-medium">{refund.reason}</span></p>
                  <p className="text-sm text-gray-700">{refund.description}</p>
                </div>

                {refund.adminNotes && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Admin Notes:</strong> {refund.adminNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => {
                    setSelectedRefund(refund)
                    setShowModal(true)
                  }}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>

                {refund.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(refund.id, 'approved', 'Approved by vendor')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(refund.id, 'rejected', 'Rejected by vendor')}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRefunds.length === 0 && (
        <div className="text-center py-12">
          <RefreshCw className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No refund requests found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search criteria' : 'Refund requests will appear here when customers submit them'}
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && <RefundModal />}
    </div>
  )
}