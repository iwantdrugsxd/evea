'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Play, 
  CheckCircle, 
  Star, 
  Users, 
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    'Verified vendors across all categories',
    '24/7 customer support',
    'Transparent pricing & instant booking'
  ]

  const stats = [
    { number: '500+', label: 'Trusted Vendors' },
    { number: '10K+', label: 'Events Managed' },
    { number: '4.8★', label: 'Average Rating' },
  ]

  return (
    <section className="relative min-h-screen flex items-center hero-pattern overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/30 to-white"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-40 animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-200 rounded-full opacity-50 animate-pulse-soft"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-3 rounded-full border border-primary-200"
            >
              <Sparkles className="h-4 w-4 text-primary-600" />
              <span className="text-primary-700 font-medium">India's Leading Event Platform</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 font-heading"
              >
                Transform Your
                <span className="block text-gradient">
                  Dream Events
                </span>
                Into Reality
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl text-balance"
              >
                Connect with verified vendors, manage bookings seamlessly, and create 
                unforgettable experiences for weddings, corporate events, and celebrations.
              </motion.p>
            </div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/marketplace" className="btn-primary group">
                Explore Services
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="btn-secondary group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-200"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Hero Image Container */}
              <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  {/* Mock Event Planning Interface */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Event Planning</h3>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-primary-600" />
                        <span className="text-sm text-gray-600">150 Guests</span>
                      </div>
                    </div>
                    
                    {/* Event Categories */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Catering', status: 'booked', price: '₹45,000' },
                        { name: 'Photography', status: 'pending', price: '₹25,000' },
                        { name: 'Decoration', status: 'booked', price: '₹35,000' },
                        { name: 'Music', status: 'available', price: '₹15,000' },
                      ].map((service, index) => (
                        <motion.div
                          key={service.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 1.5 + index * 0.1 }}
                          className={`p-3 rounded-lg border ${
                            service.status === 'booked' 
                              ? 'bg-green-50 border-green-200' 
                              : service.status === 'pending'
                              ? 'bg-yellow-50 border-yellow-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{service.name}</span>
                            <span className={`w-2 h-2 rounded-full ${
                              service.status === 'booked' 
                                ? 'bg-green-500' 
                                : service.status === 'pending'
                                ? 'bg-yellow-500'
                                : 'bg-gray-300'
                            }`}></span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{service.price}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-primary-600">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1.5, delay: 2 }}
                          className="bg-primary-600 h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                  className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary-600 fill-current" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Top Rated</div>
                      <div className="text-xs text-gray-600">500+ Reviews</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.4 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Next Event</div>
                      <div className="text-xs text-gray-600">Dec 25, 2024</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Play className="h-16 w-16 mx-auto mb-4" />
                <p>Demo video would be embedded here</p>
              </div>
            </div>
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="mt-4 btn-primary w-full"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default HeroSection