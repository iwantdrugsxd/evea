// src/app/(vendor)/earnings/page.tsx
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
  CreditCard,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  PieChart,
  BarChart3,
  Receipt,
  Landmark as Bank,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  RefreshCw
} from 'lucide-react'

interface Earning {
  id: string
  orderId: string
  orderNumber: string
  customerName: string
  serviceName: string
  eventDate: string
  orderAmount: number
  platformFee: number
  netEarning: number
  payoutStatus: 'pending' | 'processing' | 'completed' | 'failed'
  payoutDate?: string
  transactionDate: string
  paymentMethod: string
}

interface Payout {
  id: string
  amount: number
  date: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  method: 'bank_transfer' | 'upi' | 'wallet'
  transactionId?: string
  ordersCount: number
  description: string
}

interface FinancialSummary {
  totalEarnings: number
  totalEarningsChange: number
  thisMonthEarnings: number
  thisMonthChange: number
  pendingPayouts: number
  platformFees: number
  averageOrderValue: number
  orderCount: number
}

const mockEarnings: Earning[] = [
  {
    id: '1',
    orderId: 'o1',
    orderNumber: 'EVA-2024-001',
    customerName: 'Priya Sharma',
    serviceName: 'Wedding Photography',
    eventDate: '2024-12-15',
    orderAmount: 47250,
    platformFee: 2363,
    netEarning: 44887,
    payoutStatus: 'completed',
    payoutDate: '2024-11-10',
    transactionDate: '2024-11-08',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    orderId: 'o2',
    orderNumber: 'EVA-2024-002',
    customerName: 'Raj Patel',
    serviceName: 'Birthday Decoration',
    eventDate: '2024-11-28',
    orderAmount: 12600,
    platformFee: 630,
    netEarning: 11970,
    payoutStatus: 'pending',
    transactionDate: '2024-11-05',
    paymentMethod: 'UPI'
  },
  {
    id: '3',
    orderId: 'o3',
    orderNumber: 'EVA-2024-003',
    customerName: 'Anita Verma',
    serviceName: 'Corporate Catering',
    eventDate: '2024-11-20',
    orderAmount: 29400,
    platformFee: 1470,
    netEarning: 27930,
    payoutStatus: 'completed',
    payoutDate: '2024-11-12',
    transactionDate: '2024-11-08',
    paymentMethod: 'Bank Transfer'
  }
]

const mockPayouts: Payout[] = [
  {
    id: '1',
    amount: 72817,
    date: '2024-11-12',
    status: 'completed',
    method: 'bank_transfer',
    transactionId: 'TXN123456789',
    ordersCount: 2,
    description: 'Weekly payout for orders #EVA-2024-001, #EVA-2024-003'
  },
  {
    id: '2',
    amount: 11970,
    date: '2024-11-15',
    status: 'pending',
    method: 'bank_transfer',
    ordersCount: 1,
    description: 'Pending payout for order #EVA-2024-002'
  }
]

const mockSummary: FinancialSummary = {
  totalEarnings: 84787,
  totalEarningsChange: 23.5,
  thisMonthEarnings: 84787,
  thisMonthChange: 15.8,
  pendingPayouts: 11970,
  platformFees: 4463,
  averageOrderValue: 29596,
  orderCount: 3
}

export default function VendorEarningsPage() {
  const [earnings, setEarnings] = useState<Earning[]>(mockEarnings)
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts)
  const [summary, setSummary] = useState<FinancialSummary>(mockSummary)
  const [timeRange, setTimeRange] = useState('this_month')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'earnings' | 'payouts' | 'analytics'>('earnings')

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
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const EarningsOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalEarnings)}</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600">
                {summary.totalEarningsChange}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.thisMonthEarnings)}</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600">
                {summary.thisMonthChange}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.pendingPayouts)}</p>
            <p className="text-sm text-yellow-600 mt-2">Awaiting transfer</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Platform Fees</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.platformFees)}</p>
            <p className="text-sm text-gray-500 mt-2">
              {((summary.platformFees / (summary.totalEarnings + summary.platformFees)) * 100).toFixed(1)}% of gross
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <Percent className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  )

  const EarningsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="last_3_months">Last 3 Months</option>
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Earning
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {earnings.map(earning => (
              <tr key={earning.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{earning.orderNumber}</div>
                    <div className="text-sm text-gray-500">{earning.serviceName}</div>
                    <div className="text-xs text-gray-400">Event: {formatDate(earning.eventDate)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{earning.customerName}</div>
                  <div className="text-xs text-gray-500">{earning.paymentMethod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(earning.orderAmount)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600">-{formatCurrency(earning.platformFee)}</div>
                  <div className="text-xs text-gray-500">5%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">{formatCurrency(earning.netEarning)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(earning.payoutStatus)}`}>
                    {earning.payoutStatus === 'completed' ? 'Paid' : earning.payoutStatus}
                  </span>
                  {earning.payoutDate && (
                    <div className="text-xs text-gray-500 mt-1">
                      Paid: {formatDate(earning.payoutDate)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-purple-600 hover:text-purple-900 mr-3">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Download className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const PayoutsTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Payout History</h3>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
            <Wallet className="h-4 w-4 mr-2" />
            Request Payout
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {payouts.map(payout => (
          <div key={payout.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  payout.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {payout.status === 'completed' ? (
                    <CheckCircle className={`h-6 w-6 ${
                      payout.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  ) : (
                    <Clock className="h-6 w-6 text-yellow-600" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{formatCurrency(payout.amount)}</h4>
                  <p className="text-sm text-gray-600">{payout.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">{formatDate(payout.date)}</span>
                    <span className="text-xs text-gray-500">{payout.ordersCount} orders</span>
                    {payout.transactionId && (
                      <span className="text-xs text-gray-500">ID: {payout.transactionId}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                  {payout.status}
                </span>
                <div className="flex items-center justify-end space-x-1 mt-2">
                  <Bank className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500 capitalize">
                    {payout.method.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const EarningsChart = () => {
    const monthlyData = [
      { month: 'Jun', earnings: 45000, orders: 12 },
      { month: 'Jul', earnings: 52000, orders: 15 },
      { month: 'Aug', earnings: 48000, orders: 14 },
      { month: 'Sep', earnings: 67000, orders: 18 },
      { month: 'Oct', earnings: 58000, orders: 16 },
      { month: 'Nov', earnings: 85000, orders: 23 }
    ]

    const maxEarnings = Math.max(...monthlyData.map(d => d.earnings))

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Earnings Trend</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Last 6 months</span>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md relative group cursor-pointer"
                style={{
                  height: `${(data.earnings / maxEarnings) * 200}px`,
                  minHeight: '20px'
                }}
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {formatCurrency(data.earnings)}
                  <br />
                  {data.orders} orders
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{data.month}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const FinancialBreakdown = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Breakdown</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <ArrowUpRight className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Gross Revenue</p>
              <p className="text-sm text-green-600">Total order amounts</p>
            </div>
          </div>
          <span className="text-lg font-bold text-green-900">{formatCurrency(summary.totalEarnings + summary.platformFees)}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <ArrowDownRight className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Platform Fees</p>
              <p className="text-sm text-red-600">5% commission</p>
            </div>
          </div>
          <span className="text-lg font-bold text-red-900">-{formatCurrency(summary.platformFees)}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">Net Earnings</p>
              <p className="text-sm text-purple-600">Your take-home amount</p>
            </div>
          </div>
          <span className="text-xl font-bold text-purple-900">{formatCurrency(summary.totalEarnings)}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{summary.orderCount}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.averageOrderValue)}</p>
            <p className="text-sm text-gray-600">Avg Order Value</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings & Payouts</h1>
          <p className="text-gray-600 mt-1">Track your revenue and manage payouts</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Tax Document
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <EarningsOverview />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
            { id: 'payouts', label: 'Payouts', icon: Wallet },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {selectedTab === 'earnings' && <EarningsTable />}
        
        {selectedTab === 'payouts' && <PayoutsTable />}
        
        {selectedTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EarningsChart />
            <FinancialBreakdown />
          </div>
        )}
      </div>

      {/* Payout Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">Payout Information</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Payouts are processed weekly on Fridays for orders completed in the previous week</p>
              <p>• Minimum payout amount is ₹500</p>
              <p>• Bank transfers typically take 1-3 business days to reflect in your account</p>
              <p>• Platform fee of 5% is deducted from each order before payout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}