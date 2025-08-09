// src/app/(vendor)/messages/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Star,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Circle,
  Image as ImageIcon,
  Download,
  Archive,
  Trash2
} from 'lucide-react'

interface Message {
  id: string
  content: string
  senderId: string
  senderType: 'vendor' | 'customer'
  timestamp: string
  type: 'text' | 'image' | 'file' | 'system'
  attachments?: {
    name: string
    url: string
    type: string
    size: number
  }[]
  read: boolean
}

interface Conversation {
  id: string
  customerId: string
  customerName: string
  customerAvatar?: string
  orderId?: string
  orderNumber?: string
  serviceName: string
  lastMessage: Message
  unreadCount: number
  status: 'active' | 'archived' | 'blocked'
  createdAt: string
  updatedAt: string
  customerInfo: {
    email: string
    phone: string
    eventDate?: string
    eventLocation?: string
    guestCount?: number
    totalAmount?: number
  }
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'Priya Sharma',
    customerAvatar: '/api/placeholder/40/40',
    orderId: 'o1',
    orderNumber: 'EVA-2024-001',
    serviceName: 'Wedding Photography',
    lastMessage: {
      id: 'm1',
      content: 'Can you provide a detailed timeline for the wedding day?',
      senderId: 'c1',
      senderType: 'customer',
      timestamp: '2024-11-10T14:30:00Z',
      type: 'text',
      read: false
    },
    unreadCount: 2,
    status: 'active',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-10T14:30:00Z',
    customerInfo: {
      email: 'priya.sharma@email.com',
      phone: '+91 9876543210',
      eventDate: '2024-12-15',
      eventLocation: 'Hotel Grand Palace, Mumbai',
      guestCount: 250,
      totalAmount: 45000
    }
  },
  {
    id: '2',
    customerId: 'c2',
    customerName: 'Raj Patel',
    orderId: 'o2',
    orderNumber: 'EVA-2024-002',
    serviceName: 'Birthday Decoration',
    lastMessage: {
      id: 'm2',
      content: 'Perfect! Thank you for the superhero theme suggestions.',
      senderId: 'v1',
      senderType: 'vendor',
      timestamp: '2024-11-09T16:45:00Z',
      type: 'text',
      read: true
    },
    unreadCount: 0,
    status: 'active',
    createdAt: '2024-11-05T12:00:00Z',
    updatedAt: '2024-11-09T16:45:00Z',
    customerInfo: {
      email: 'raj.patel@email.com',
      phone: '+91 9876543211',
      eventDate: '2024-11-28',
      eventLocation: 'Community Hall, Thane',
      guestCount: 50,
      totalAmount: 12000
    }
  },
  {
    id: '3',
    customerId: 'c3',
    customerName: 'Anita Verma',
    orderId: 'o3',
    orderNumber: 'EVA-2024-003',
    serviceName: 'Corporate Catering',
    lastMessage: {
      id: 'm3',
      content: 'The event was fantastic! Thank you for the excellent service.',
      senderId: 'c3',
      senderType: 'customer',
      timestamp: '2024-11-08T18:20:00Z',
      type: 'text',
      read: true
    },
    unreadCount: 0,
    status: 'active',
    createdAt: '2024-10-15T09:00:00Z',
    updatedAt: '2024-11-08T18:20:00Z',
    customerInfo: {
      email: 'anita.verma@email.com',
      phone: '+91 9876543212',
      eventDate: '2024-11-20',
      eventLocation: 'Office Complex, Navi Mumbai',
      guestCount: 100,
      totalAmount: 28000
    }
  }
]

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: 'm1-1',
      content: 'Hi! I\'m excited about the wedding photography service. Can we discuss the details?',
      senderId: 'c1',
      senderType: 'customer',
      timestamp: '2024-11-01T10:30:00Z',
      type: 'text',
      read: true
    },
    {
      id: 'm1-2',
      content: 'Hello Priya! Thank you for choosing our service. I\'d be happy to discuss all the details. What specific aspects would you like to cover?',
      senderId: 'v1',
      senderType: 'vendor',
      timestamp: '2024-11-01T11:00:00Z',
      type: 'text',
      read: true
    },
    {
      id: 'm1-3',
      content: 'I\'d like to know about the different packages and what\'s included in each one.',
      senderId: 'c1',
      senderType: 'customer',
      timestamp: '2024-11-01T11:30:00Z',
      type: 'text',
      read: true
    },
    {
      id: 'm1-4',
      content: 'Here are our wedding photography packages with detailed information.',
      senderId: 'v1',
      senderType: 'vendor',
      timestamp: '2024-11-01T12:00:00Z',
      type: 'file',
      attachments: [{
        name: 'Wedding_Photography_Packages.pdf',
        url: '/files/packages.pdf',
        type: 'application/pdf',
        size: 2048000
      }],
      read: true
    },
    {
      id: 'm1-5',
      content: 'Can you provide a detailed timeline for the wedding day?',
      senderId: 'c1',
      senderType: 'customer',
      timestamp: '2024-11-10T14:30:00Z',
      type: 'text',
      read: false
    }
  ]
}

export default function VendorMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages[selectedConversation.id] || [])
      // Mark messages as read
      markConversationAsRead(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const markConversationAsRead = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    )
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: `m-${Date.now()}`,
      content: newMessage,
      senderId: 'v1',
      senderType: 'vendor',
      timestamp: new Date().toISOString(),
      type: 'text',
      read: true
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: message, updatedAt: message.timestamp }
          : conv
      )
    )
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    } else if (diffInHours < 168) {
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const filteredConversations = conversations.filter(conv =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const ConversationsList = () => (
    <div className="w-full md:w-1/3 bg-white border-r border-gray-200">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="overflow-y-auto h-full">
        {filteredConversations.map(conversation => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedConversation?.id === conversation.id ? 'bg-purple-50 border-purple-200' : ''
            }`}
            onClick={() => setSelectedConversation(conversation)}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                  {conversation.customerName.charAt(0)}
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {conversation.customerName}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-1">{conversation.serviceName}</p>
                
                <p className={`text-sm truncate ${
                  conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                }`}>
                  {conversation.lastMessage.senderType === 'vendor' ? 'You: ' : ''}
                  {conversation.lastMessage.content}
                </p>
                
                {conversation.orderNumber && (
                  <p className="text-xs text-purple-600 mt-1">
                    Order: {conversation.orderNumber}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const MessageArea = () => {
    if (!selectedConversation) {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                {selectedConversation.customerName.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedConversation.customerName}</h3>
                <p className="text-sm text-gray-600">{selectedConversation.serviceName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Video className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Customer Info Panel */}
        <div className="bg-blue-50 border-b border-gray-200 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-gray-600">
                {selectedConversation.customerInfo.eventDate 
                  ? new Date(selectedConversation.customerInfo.eventDate).toLocaleDateString('en-IN')
                  : 'No date set'
                }
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-gray-600 truncate">
                {selectedConversation.customerInfo.eventLocation || 'Location TBD'}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-gray-600">
                {selectedConversation.customerInfo.guestCount || 0} guests
              </span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-gray-600 font-medium">
                {selectedConversation.customerInfo.totalAmount 
                  ? formatCurrency(selectedConversation.customerInfo.totalAmount)
                  : 'Price pending'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.senderType === 'vendor' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs md:max-w-md ${
                message.senderType === 'vendor'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              } rounded-lg p-3 shadow-sm`}>
                {message.type === 'text' && (
                  <p className="text-sm">{message.content}</p>
                )}
                
                {message.type === 'file' && message.attachments && (
                  <div className="space-y-2">
                    <p className="text-sm">{message.content}</p>
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-white/10 rounded">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm flex-1 truncate">{attachment.name}</span>
                        <button className="text-sm hover:underline">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className={`flex items-center justify-between mt-2 text-xs ${
                  message.senderType === 'vendor' ? 'text-purple-200' : 'text-gray-500'
                }`}>
                  <span>{formatTime(message.timestamp)}</span>
                  {message.senderType === 'vendor' && (
                    <div className="flex items-center space-x-1">
                      {message.read ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Circle className="h-3 w-3" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ImageIcon className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors">
                <Smile className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communicate with your customers</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="text-sm text-gray-600">
            {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)} unread messages
          </div>
        </div>
      </div>

      {/* Messages Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
        <ConversationsList />
        <MessageArea />
      </div>
    </div>
  )
}