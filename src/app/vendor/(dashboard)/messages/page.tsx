'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare,
  Send,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Star,
  Reply,
  Archive,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  Clock
} from 'lucide-react'
import Button from '@/components/ui/button'

interface Message {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  subject: string
  message: string
  date: string
  time: string
  status: 'unread' | 'read' | 'replied'
  priority: 'low' | 'medium' | 'high'
  orderId?: string
  serviceTitle?: string
  response?: string
  responseDate?: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          customerName: 'Priya Sharma',
          customerEmail: 'priya.sharma@email.com',
          customerPhone: '+91 98765 43210',
          subject: 'Wedding Photography Inquiry',
          message: 'Hi, I\'m planning my wedding for next month and would like to discuss photography packages. Could you please share your portfolio and pricing details?',
          date: '2024-12-15',
          time: '10:30 AM',
          status: 'unread',
          priority: 'high',
          orderId: 'ORD-2024-001',
          serviceTitle: 'Wedding Photography Package'
        },
        {
          id: '2',
          customerName: 'Rajesh Kumar',
          customerEmail: 'rajesh.kumar@email.com',
          customerPhone: '+91 87654 32109',
          subject: 'Thank you for the excellent service!',
          message: 'Thank you so much for the amazing catering service at our corporate event. Everyone loved the food and the presentation was perfect.',
          date: '2024-12-14',
          time: '2:15 PM',
          status: 'replied',
          priority: 'medium',
          response: 'Thank you Rajesh! We\'re delighted that you enjoyed our service. We would be happy to cater your next event. I\'ll send you our updated menu and availability.',
          responseDate: '2024-12-14'
        },
        {
          id: '3',
          customerName: 'Anita Patel',
          customerEmail: 'anita.patel@email.com',
          customerPhone: '+91 76543 21098',
          subject: 'Birthday Party Decoration Quote',
          message: 'I need decoration for my daughter\'s 10th birthday party. Theme is pink and gold. Can you provide a quote for 50 guests?',
          date: '2024-12-13',
          time: '4:45 PM',
          status: 'read',
          priority: 'medium'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-500/20 text-blue-400'
      case 'read': return 'bg-gray-500/20 text-gray-400'
      case 'replied': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'low': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const stats = [
    { 
      title: 'Total Messages', 
      value: messages.length, 
      icon: MessageSquare, 
      color: 'bg-blue-500', 
      change: 12.5, 
      trend: 'up' as const
    },
    { 
      title: 'Unread', 
      value: messages.filter(m => m.status === 'unread').length, 
      icon: Clock, 
      color: 'bg-yellow-500', 
      change: 8.7, 
      trend: 'up' as const
    },
    { 
      title: 'Replied', 
      value: messages.filter(m => m.status === 'replied').length, 
      icon: Reply, 
      color: 'bg-green-500', 
      change: 15.3, 
      trend: 'up' as const
    },
    { 
      title: 'High Priority', 
      value: messages.filter(m => m.priority === 'high').length, 
      icon: Users, 
      color: 'bg-red-500', 
      change: 22.1, 
      trend: 'up' as const
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
              Messages
            </motion.h1>
            <p className="text-white/60 mt-1">Manage customer communications and inquiries</p>
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
                    {stat.value.toLocaleString()}
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
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>{filteredMessages.length} messages found</span>
          </div>
        </div>
      </motion.div>

      {/* Messages List */}
      <div className="space-y-6">
        {filteredMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{message.subject}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-3">{message.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-white/60" />
                  <div>
                    <p className="text-sm font-medium text-white">{message.customerName}</p>
                    <p className="text-xs text-white/50">{message.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-white/60" />
                  <div>
                    <p className="text-sm font-medium text-white">Phone</p>
                    <p className="text-xs text-white/50">{message.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-white/60" />
                  <div>
                    <p className="text-sm font-medium text-white">Date</p>
                    <p className="text-xs text-white/50">{formatDate(message.date)} at {message.time}</p>
                  </div>
                </div>
                {message.orderId && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="text-sm font-medium text-white">Order</p>
                      <p className="text-xs text-white/50">{message.orderId}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Vendor Response */}
              {message.response && (
                <div className="bg-white/5 rounded-xl p-4 border-l-4 border-blue-500 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Reply className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Your Response</span>
                    <span className="text-xs text-white/50">({formatDate(message.responseDate!)})</span>
                  </div>
                  <p className="text-white/80 text-sm">{message.response}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-400 border-green-500/20 hover:bg-green-500/10"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-400 border-purple-500/20 hover:bg-purple-500/10"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/10"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-12 w-12 text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No messages found</h3>
          <p className="text-white/60 mb-6">Messages from customers will appear here</p>
        </motion.div>
      )}
    </div>
  )
}