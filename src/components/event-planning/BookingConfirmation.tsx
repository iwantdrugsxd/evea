'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventPlanningStore, eventPlanningUtils } from '@/stores/event-planning-store'
import { 
  CheckCircle, 
  CreditCard, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  FileText,
  Shield,
  Gift,
  TrendingUp,
  Download,
  Share2,
  MessageCircle,
  Phone
} from 'lucide-react'

interface BookingConfirmationProps {
  onComplete: (stepId: string) => void
}

const BookingConfirmation = ({ onComplete }: BookingConfirmationProps) => {
  const { eventData, package: eventPackage } = useEventPlanningStore()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onComplete('booking')
    }, 3000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: CreditCard,
      description: 'Pay using UPI apps'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: CreditCard,
      description: 'Pay using your bank account'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 px-6 py-3 rounded-full border border-primary-200 shadow-red-soft mb-6">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <span className="text-primary-700 font-semibold">Step 6 of 6</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4">
          Complete Your Booking
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          You're just one step away from securing your perfect {eventData.eventType?.name.toLowerCase()} package!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-elegant p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Method</h2>
            
            <div className="space-y-4 mb-8">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`
                    border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
                    ${selectedPaymentMethod === method.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      ${selectedPaymentMethod === method.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    
                    {selectedPaymentMethod === method.id && (
                      <CheckCircle className="h-5 w-5 text-primary-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Form */}
            {selectedPaymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="input-base w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input-base w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="input-base w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input-base w-full"
                  />
                </div>
              </div>
            )}

            {selectedPaymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="input-base w-full"
                  />
                </div>
              </div>
            )}

            {selectedPaymentMethod === 'netbanking' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Bank
                  </label>
                  <select className="input-base w-full">
                    <option>Select your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-elegant p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Event Date</p>
                    <p className="text-sm text-gray-600">{formatDate(eventData.eventDetails.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{eventData.eventDetails.time}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{eventData.eventDetails.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Guests</p>
                    <p className="text-sm text-gray-600">{eventData.eventDetails.guestCount} people</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Total Amount</p>
                    <p className="text-sm text-gray-600">{eventPackage.items.length} services included</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {eventPlanningUtils.formatPrice(eventPackage.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-elegant p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Summary</h2>
            
            {/* Security Badge */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">Secure Payment</p>
                  <p className="text-xs text-green-700">
                    Your payment is protected with bank-level security
                  </p>
                </div>
              </div>
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.platformFee)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">{eventPlanningUtils.formatPrice(eventPackage.taxAmount)}</span>
              </div>
              
              {eventPackage.estimatedSavings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Package Savings:</span>
                  <span className="font-medium">-{eventPlanningUtils.formatPrice(eventPackage.estimatedSavings)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>{eventPlanningUtils.formatPrice(eventPackage.totalAmount)}</span>
                </div>
              </div>
            </div>
            
            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="btn-primary btn-lg w-full group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center space-x-2">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {eventPlanningUtils.formatPrice(eventPackage.totalAmount)}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
            
            {/* Additional Info */}
            <div className="mt-6 space-y-3 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Instant booking confirmation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Free cancellation up to 7 days</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 border border-green-200"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Booking Confirmed!
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Your {eventData.eventType?.name.toLowerCase()} has been successfully booked. 
            You'll receive a confirmation email with all the details shortly.
          </p>
          
          <div className="flex items-center justify-center space-x-6">
            <button className="btn-outline btn-sm flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Receipt</span>
            </button>
            
            <button className="btn-outline btn-sm flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share Details</span>
            </button>
            
            <button className="btn-outline btn-sm flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-elegant p-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">What's Next?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Vendor Coordination</h4>
            <p className="text-sm text-gray-600">
              Our team will coordinate with all vendors and share your requirements
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Pre-Event Meeting</h4>
            <p className="text-sm text-gray-600">
              Schedule a meeting with your vendors 1 week before the event
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-sm text-gray-600">
              Our support team is available round the clock for any assistance
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BookingConfirmation
