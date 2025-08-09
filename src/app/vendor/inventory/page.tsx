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
    location: 'Storage A',
    supplier: 'Manfrotto',
    lastRestocked: '2024-08-10',
    status: 'out_of_stock',
    description: 'Heavy duty tripod for professional cameras',
    images: ['/api/placeholder/200/150'],
    usagePerEvent: 2,
    totalUsed: 15,
    totalPurchased: 3
  },
  {
    id: '4',
    name: 'Backdrop Stands',
    category: 'Support Equipment',
    sku: 'BKD-002',
    currentStock: 5,
    minimumStock: 2,
    maximumStock: 8,
    unit: 'pieces',
    costPrice: 3500,
    sellingPrice: 0,
    location: 'Storage B',
    supplier: 'Local Supplier',
    lastRestocked: '2024-11-01',
    status: 'in_stock',
    description: 'Adjustable backdrop stands for photo shoots',
    images: ['/api/placeholder/200/150'],
    usagePerEvent: 3,
    totalUsed: 60,
    totalPurchased: 8
  }
]

export default function VendorInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const categories = ['Photography Equipment', 'Lighting Equipment', 'Support Equipment', 'Audio Equipment']
  const statuses = ['in_stock', 'low_stock', 'out_of_stock', 'discontinued']

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800'
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'
      case 'discontinued':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircle className="h-4 w-4" />
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4" />
      case 'out_of_stock':
        return <Clock className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const InventoryStats = () => {
    const totalItems = inventory.length
    const lowStockItems = inventory.filter(item => item.status === 'low_stock').length
    const outOfStockItems = inventory.filter(item => item.status === 'out_of_stock').length
    const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPrice), 0)

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrendingDown className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{outOfStockItems}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const InventoryTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
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
            {filteredInventory.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                      <div className="text-xs text-gray-400">SKU: {item.sku}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{item.currentStock}</span> {item.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    Min: {item.minimumStock} | Max: {item.maximumStock}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className={`h-1.5 rounded-full ${
                        item.currentStock <= item.minimumStock ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min((item.currentStock / item.maximumStock) * 100, 100)}%`
                      }}
                    />
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatCurrency(item.currentStock * item.costPrice)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(item.costPrice)} per {item.unit}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item.usagePerEvent} per event
                  </div>
                  <div className="text-xs text-gray-500">
                    Total used: {item.totalUsed}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span className="ml-1 capitalize">{item.status.replace('_', ' ')}</span>
                  </span>
                  {item.nextRestock && (
                    <div className="text-xs text-gray-500 mt-1">
                      Next restock: {new Date(item.nextRestock).toLocaleDateString('en-IN')}
                    </div>
                  )}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-purple-600 hover:text-purple-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your equipment and supplies</p>
        </div>
      </div>

      {/* Stats */}
      <InventoryStats />

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4 space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <InventoryTable />

      {/* Low Stock Alert */}
      {inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Stock Alerts</h3>
              <div className="text-sm text-yellow-800 space-y-1">
                {inventory.filter(item => item.status === 'out_of_stock').map(item => (
                  <p key={item.id}>• {item.name} is out of stock</p>
                ))}
                {inventory.filter(item => item.status === 'low_stock').map(item => (
                  <p key={item.id}>• {item.name} is running low ({item.currentStock} remaining)</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}