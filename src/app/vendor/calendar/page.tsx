// src/app/(vendor)/calendar/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  DollarSign,
  Phone,
  Mail,
  Eye,
  Edit,
  X,
  Check,
  AlertCircle
} from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  serviceName: string
  customerName: string
  customerPhone: string
  customerEmail: string
  date: string
  startTime: string
  endTime: string
  duration: number
  location: string
  guestCount: number
  amount: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  type: 'booking' | 'blocked' | 'available'
  notes?: string
}

interface TimeSlot {
  time: string
  available: boolean
  booked?: CalendarEvent
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Wedding Photography',
    serviceName: 'Professional Wedding Photography',
    customerName: 'Priya Sharma',
    customerPhone: '+91 9876543210',
    customerEmail: 'priya.sharma@email.com',
    date: '2024-12-15',
    startTime: '10:00',
    endTime: '18:00',
    duration: 8,
    location: 'Hotel Grand Palace, Mumbai',
    guestCount: 250,
    amount: 45000,
    status: 'confirmed',
    type: 'booking',
    notes: 'Need drone shots and traditional ceremony coverage'
  },
  {
    id: '2',
    title: 'Birthday Decoration',
    serviceName: 'Birthday Party Decoration',
    customerName: 'Raj Patel',
    customerPhone: '+91 9876543211',
    customerEmail: 'raj.patel@email.com',
    date: '2024-11-28',
    startTime: '14:00',
    endTime: '18:00',
    duration: 4,
    location: 'Community Hall, Thane',
    guestCount: 50,
    amount: 12000,
    status: 'pending',
    type: 'booking',
    notes: 'Superhero theme setup required'
  },
  {
    id: '3',
    title: 'Personal Time',
    serviceName: 'Blocked Time',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    date: '2024-11-25',
    startTime: '09:00',
    endTime: '17:00',
    duration: 8,
    location: 'Personal',
    guestCount: 0,
    amount: 0,
    status: 'confirmed',
    type: 'blocked'
  }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

const statusColors = {
  confirmed: 'bg-green-100 border-green-500 text-green-800',
  pending: 'bg-yellow-100 border-yellow-500 text-yellow-800',
  completed: 'bg-blue-100 border-blue-500 text-blue-800',
  cancelled: 'bg-red-100 border-red-500 text-red-800'
}

const typeColors = {
  booking: 'bg-purple-100 border-purple-500',
  blocked: 'bg-gray-100 border-gray-500',
  available: 'bg-green-50 border-green-200'
}

export default function VendorCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour12 = parseInt(hours) % 12 || 12
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM'
    return `${hour12}:${minutes} ${ampm}`
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateString)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const MonthView = () => {
    const days = getDaysInMonth(currentDate)
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowBlockModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Block Time
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </button>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map(day => (
            <div key={day} className="p-4 text-center text-sm font-medium text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-32 border-r border-b border-gray-200" />
            }

            const dayEvents = getEventsForDate(day)
            const isToday = day.toDateString() === new Date().toDateString()
            const isSelected = selectedDate?.toDateString() === day.toDateString()

            return (
              <div
                key={day.toISOString()}
                className={`h-32 border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
                  isSelected ? 'bg-purple-50' : ''
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isToday ? 'text-purple-600' : 'text-gray-900'
                }`}>
                  {day.getDate()}
                  {isToday && (
                    <span className="ml-1 w-2 h-2 bg-purple-600 rounded-full inline-block" />
                  )}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded border-l-2 cursor-pointer hover:opacity-80 ${statusColors[event.status]}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedEvent(event)
                        setShowEventModal(true)
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-75">
                        {formatTime(event.startTime)}
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 pl-1">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const DayView = () => {
    const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []
    const displayDate = selectedDate || new Date()

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {displayDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Time Slots */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Time Slots</h3>
              <div className="space-y-2">
                {timeSlots.map(time => (
                  <div key={time} className="text-sm text-gray-600 py-2">
                    {formatTime(time)}
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="md:col-span-10">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Events</h3>
              <div className="relative">
                {timeSlots.map(time => {
                  const eventsAtTime = selectedDateEvents.filter(event => 
                    event.startTime <= time && event.endTime > time
                  )

                  return (
                    <div key={time} className="h-16 border-b border-gray-100 relative">
                      {eventsAtTime.map(event => (
                        <div
                          key={event.id}
                          className={`absolute left-0 right-0 mx-1 p-2 rounded border-l-4 cursor-pointer hover:opacity-80 ${statusColors[event.status]}`}
                          style={{
                            top: '4px',
                            height: `${event.duration * 16 - 8}px`
                          }}
                          onClick={() => {
                            setSelectedEvent(event)
                            setShowEventModal(true)
                          }}
                        >
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs opacity-75">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </div>
                          <div className="text-xs opacity-75">{event.customerName}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const EventModal = () => {
    if (!selectedEvent) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowEventModal(false)} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-xl shadow-xl mx-4 w-full max-w-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
            <button
              onClick={() => setShowEventModal(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Event Status */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedEvent.status]}`}>
                {selectedEvent.status.toUpperCase()}
              </span>
              <div className="flex space-x-2">
                {selectedEvent.status === 'pending' && (
                  <>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Service</label>
                  <p className="text-gray-900">{selectedEvent.serviceName}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Date & Time</label>
                  <div className="flex items-center text-gray-900">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {new Date(selectedEvent.date).toLocaleDateString('en-IN')}
                  </div>
                  <div className="flex items-center text-gray-900 mt-1">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <div className="flex items-center text-gray-900">
                    <MapPin className="h-4 w-4 mr-2" />
                    {selectedEvent.location}
                  </div>
                </div>
              </div>

              {selectedEvent.type === 'booking' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Customer</label>
                    <p className="text-gray-900 font-medium">{selectedEvent.customerName}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Phone className="h-3 w-3 mr-2" />
                      {selectedEvent.customerPhone}
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Mail className="h-3 w-3 mr-2" />
                      {selectedEvent.customerEmail}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Event Details</label>
                    <div className="flex items-center text-gray-900">
                      <Users className="h-4 w-4 mr-2" />
                      {selectedEvent.guestCount} guests
                    </div>
                    <div className="flex items-center text-gray-900 mt-1">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {formatCurrency(selectedEvent.amount)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Special Notes */}
            {selectedEvent.notes && (
              <div>
                <label className="text-sm font-medium text-gray-600">Special Requirements</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                  {selectedEvent.notes}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                View Order
              </button>
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Scheduling</h1>
          <p className="text-gray-600 mt-1">Manage your bookings and availability</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Events</p>
              <p className="text-2xl font-bold text-gray-900">{events.filter(e => e.date === new Date().toISOString().split('T')[0]).length}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{events.filter(e => e.status === 'pending').length}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(85000)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'month' && <MonthView />}
      {(viewMode === 'day' || selectedDate) && <DayView />}

      {/* Event Modal */}
      {showEventModal && <EventModal />}

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(event.startTime)}
                      </div>
                      {event.type === 'booking' && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.customerName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {event.type === 'booking' && (
                      <p className="font-bold text-gray-900">{formatCurrency(event.amount)}</p>
                    )}
                    <button
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowEventModal(true)
                      }}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}