// src/app/(vendor)/inventory/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Calendar,
  Eye,
  Download,
  Upload
} from 'lucide-react'
import Button from '@/components/ui/button'

interface InventoryItem {
  id: string
  name: string
  category: string
  sku: string
  currentStock: number
  minimumStock: number
  maximumStock: number
  unit: string
  costPrice: number
  sellingPrice: number
  location: string
  supplier: string
  lastRestocked: string
  nextRestock?: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued'
  description: string
  images: string[]
  usagePerEvent: number
  totalUsed: number
  totalPurchased: number
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Professional Camera (Canon 5D Mark IV)',
    category: 'Photography Equipment',
    sku: 'CAM-001',
    currentStock: 3,
    minimumStock: 2,
    maximumStock: 5,
    unit: 'pieces',
    costPrice: 180000,
    sellingPrice: 0, // Not sold directly
    location: 'Main Storage',
    supplier: 'Canon India',
    lastRestocked: '2024-10-15',
    nextRestock: '2025-01-15',
    status: 'in_stock',
    description: 'High-end DSLR camera for professional photography',
    images: ['/api/placeholder/200/150'],
    usagePerEvent: 1,
    totalUsed: 45,
    totalPurchased: 3
  },
  {
    id: '2',
    name: 'LED Panel Lights (Set of 4)',
    category: 'Lighting Equipment',
    sku: 'LED-004',
    currentStock: 1,
    minimumStock: 2,
    maximumStock: 8,
    unit: 'sets',
    costPrice: 15000,
    sellingPrice: 0,
    location: 'Equipment Room',
    supplier: 'Godox India',
    lastRestocked: '2024-09-20',
    status: 'low_stock',
    description: 'Professional LED lighting panels for video and photography',
    images: ['/api/placeholder/200/150'],
    usagePerEvent: 2,
    totalUsed: 28,
    totalPurchased: 2
  },
  {
    id: '3',
    name: 'Tripod Stand (Heavy Duty)',
    category: 'Support Equipment',
    sku: 'TRP-003',
    currentStock: 0,
    minimumStock: 3,
    maximumStock: 6,
    unit: 'pieces',
    costPrice: 8000,
    sellingPrice: 0,
    location: 'Equipment Room',
    supplier: 'Manfrotto India',
    lastRestocked: '2024-08-10',
    status: 'out_of_stock',
    description: 'Heavy-duty tripod for professional cameras',
    images: ['/api/placeholder/200/150'],
    usagePerEvent: 1,
    totalUsed: 32,
    totalPurchased: 3
  }
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInventory(mockInventory)
      setLoading(false)
    }, 1000)
  }, [])

  const categories = [...new Set(inventory.map(item => item.category))]
  const statuses = ['in_stock', 'low_stock', 'out_of_stock', 'discontinued']

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

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
      case 'in_stock': return 'bg-green-500/20 text-green-400'
      case 'low_stock': return 'bg-yellow-500/20 text-yellow-400'
      case 'out_of_stock': return 'bg-red-500/20 text-red-400'
      case 'discontinued': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const stats = [
    { title: 'Total Items', value: inventory.length, icon: Package, color: 'bg-blue-500', change: 8.2, trend: 'up' },
    { title: 'Low Stock', value: inventory.filter(item => item.status === 'low_stock').length, icon: TrendingDown, color: 'bg-yellow-500', change: -12.5, trend: 'down' },
    { title: 'Out of Stock', value: inventory.filter(item => item.status === 'out_of_stock').length, icon: AlertTriangle, color: 'bg-red-500', change: 5.3, trend: 'up' },
    { title: 'Total Value', value: inventory.reduce((sum, item) => sum + (item.currentStock * item.costPrice), 0), icon: BarChart3, color: 'bg-green-500', change: 15.7, trend: 'up' }
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
              Inventory Management
            </motion.h1>
            <p className="text-white/60 mt-1">Track and manage your equipment and supplies</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
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
                    {stat.title.includes('Value') ? formatCurrency(stat.value) : stat.value.toLocaleString()}
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
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <Filter className="h-4 w-4" />
            <span>{filteredInventory.length} items found</span>
          </div>
        </div>
      </motion.div>

      {/* Inventory Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/20">
          <h3 className="text-lg font-bold text-white">Inventory Items</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  Item Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredInventory.map(item => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-white/60" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-white/50">{item.sku} • {item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">{item.currentStock} {item.unit}</p>
                      <p className="text-xs text-white/50">Min: {item.minimumStock} | Max: {item.maximumStock}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">{formatCurrency(item.currentStock * item.costPrice)}</p>
                      <p className="text-xs text-white/50">Cost: {formatCurrency(item.costPrice)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">{item.totalUsed} events</p>
                      <p className="text-xs text-white/50">{item.usagePerEvent} per event</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-400 border-green-500/20 hover:bg-green-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-400 border-red-500/20 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Low Stock Alert */}
      {inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 mt-8"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-400 mb-2">Stock Alerts</h3>
              <div className="text-sm text-yellow-300 space-y-1">
                {inventory.filter(item => item.status === 'out_of_stock').map(item => (
                  <p key={item.id}>• {item.name} is out of stock</p>
                ))}
                {inventory.filter(item => item.status === 'low_stock').map(item => (
                  <p key={item.id}>• {item.name} is running low ({item.currentStock} remaining)</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}