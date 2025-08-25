'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Eye,
  MessageCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Star
} from 'lucide-react'
import Button from '@/components/ui/button'

interface Event {
  id: string
  title: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  duration: number
  location: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  type: 'wedding' | 'birthday' | 'corporate' | 'other'
  guestCount: number
  amount: number
  notes: string
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents([
        {
          id: '1',
          title: 'Wedding Photography - Priya & Raj',
          customerName: 'Priya Sharma',
          customerEmail: 'priya.sharma@email.com',
          customerPhone: '+91 98765 43210',
          date: '2024-12-28',
          time: '10:00',
          duration: 8,
          location: 'Taj Palace Hotel, Mumbai',
          status: 'confirmed',
          type: 'wedding',
          guestCount: 150,
          amount: 25000,
          notes: 'Traditional Indian wedding ceremony with reception'
        },
        {
          id: '2',
          title: 'Corporate Event Catering',
          customerName: 'Rajesh Kumar',
          customerEmail: 'rajesh.kumar@email.com',
          customerPhone: '+91 87654 32109',
          date: '2024-12-20',
          time: '12:00',
          duration: 4,
          location: 'Convention Center, Delhi',
          status: 'confirmed',
          type: 'corporate',
          guestCount: 200,
          amount: 45000,
          notes: 'Annual company meeting with lunch service'
        },
        {
          id: '3',
          title: 'Birthday Party Decoration',
          customerName: 'Anita Patel',
          customerEmail: 'anita.patel@email.com',
          customerPhone: '+91 76543 21098',
          date: '2024-12-15',
          time: '16:00',
          duration: 3,
          location: 'Community Hall, Bangalore',
          status: 'completed',
          type: 'birthday',
          guestCount: 50,
          amount: 12000,
          notes: '10th birthday party with pink and gold theme'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'completed': return 'bg-blue-500/20 text-blue-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'wedding': return 'bg-pink-500/20 text-pink-400'
      case 'birthday': return 'bg-purple-500/20 text-purple-400'
      case 'corporate': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    return { daysInMonth, startingDay }
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const stats = [
    { title: 'Total Events', value: events.length, icon: CalendarIcon, color: 'bg-blue-500', change: 15.2, trend: 'up' },
    { title: 'This Month', value: events.filter(e => new Date(e.date).getMonth() === currentDate.getMonth()).length, icon: Package, color: 'bg-green-500', change: 8.7, trend: 'up' },
    { title: 'Confirmed', value: events.filter(e => e.status === 'confirmed').length, icon: CheckCircle, color: 'bg-purple-500', change: 12.3, trend: 'up' },
    { title: 'Revenue', value: events.reduce((sum, e) => sum + e.amount, 0), icon: DollarSign, color: 'bg-orange-500', change: 22.1, trend: 'up' }
  ]

  if (loading) {
    return (
      <div className="w-full max-w-none">
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
    <div className="w-full max-w-none">
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
              Event Calendar
            </motion.h1>
            <p className="text-white/60 mt-1">Manage your event schedule and bookings</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
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
                    {typeof stat.value === 'number' && stat.title.includes('Revenue') 
                      ? formatCurrency(stat.value)
                      : stat.value.toLocaleString()
                    }
                  </p>
                  <p className="text-sm text-white/60 mb-2">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Calendar Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {(['month', 'week', 'day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-white/60">
              {day}
            </div>
          ))}
          
          {(() => {
            const { daysInMonth, startingDay } = getDaysInMonth(currentDate)
            const days = []
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < startingDay; i++) {
              days.push(<div key={`empty-${i}`} className="p-3 min-h-[100px]"></div>)
            }
            
            // Add cells for each day of the month
            for (let day = 1; day <= daysInMonth; day++) {
              const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const dayEvents = getEventsForDate(dateString)
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
              
              days.push(
                <div
                  key={day}
                  className={`p-3 min-h-[100px] border border-white/10 hover:border-white/30 transition-colors cursor-pointer ${
                    isToday ? 'bg-blue-500/20' : ''
                  }`}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                >
                  <div className="text-sm font-medium text-white mb-2">{day}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded ${getTypeColor(event.type)} truncate`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-white/50">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )
            }
            
            return days
          })()}
        </div>
      </motion.div>

      {/* Selected Date Events */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              Events for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-white/60 hover:text-white"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            {getEventsForDate(selectedDate.toISOString().split('T')[0]).map((event) => (
              <div key={event.id} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{event.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time} ({event.duration}h)
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="text-sm font-medium text-white">{event.customerName}</p>
                      <p className="text-xs text-white/50">{event.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="text-sm font-medium text-white">{event.guestCount} guests</p>
                      <p className="text-xs text-white/50">{event.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="text-sm font-medium text-white">{formatCurrency(event.amount)}</p>
                      <p className="text-xs text-white/50">Total amount</p>
                    </div>
                  </div>
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
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
            
            {getEventsForDate(selectedDate.toISOString().split('T')[0]).length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-white/40 mx-auto mb-2" />
                <p className="text-white/60">No events scheduled for this date</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}