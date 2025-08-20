'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  TrendingUp, 
  Star, 
  Users, 
  Calendar,
  CheckCircle,
  Shield,
  Zap,
  Play
} from 'lucide-react'
import Button from '@/components/ui/button'

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  delay = 0 
}: { 
  icon: any, 
  value: string, 
  label: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100 hover:shadow-elegant-hover transition-all duration-300"
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  </motion.div>
)

const FeatureItem = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start space-x-3"
  >
    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <CheckCircle className="h-4 w-4 text-primary-600" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </motion.div>
)

export default function VendorHeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const stats = [
    { icon: TrendingUp, value: '₹2.5L+', label: 'Average Monthly Revenue' },
    { icon: Users, value: '500+', label: 'Active Vendors' },
    { icon: Calendar, value: '10K+', label: 'Events Managed' },
    { icon: Star, value: '4.8★', label: 'Platform Rating' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Verified & Trusted',
      description: 'Join a platform trusted by thousands of customers'
    },
    {
      icon: Zap,
      title: 'Instant Bookings',
      description: 'Get real-time bookings and payments'
    },
    {
      icon: TrendingUp,
      title: 'Scale Your Business',
      description: 'Reach more customers and grow your revenue'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-50 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-50 rounded-full opacity-30"></div>
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
      </div>

              <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-primary-50 px-4 py-2 rounded-full border border-primary-200"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-primary-700 font-medium text-sm">Join India's Leading Event Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Grow Your Event
                <span className="text-primary-600 block">Business</span>
                <span className="text-gray-600 text-2xl sm:text-3xl lg:text-4xl block mt-2">
                  with Evea
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Join 500+ successful vendors who have transformed their event services business. 
                Get more bookings, manage clients efficiently, and scale your revenue.
              </p>
            </motion.div>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={1.0 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/vendor/register">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="group text-base sm:text-lg px-8 py-4"
                >
                  Start Selling Today
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setIsVideoPlaying(true)}
                className="text-base sm:text-lg px-8 py-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center space-x-6 pt-6 border-t border-gray-200"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-primary-100 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">500+ Active Vendors</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-600 text-sm ml-2">4.8/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  delay={0.8 + index * 0.1}
                />
              ))}
            </div>

            {/* Success Story Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Rajesh Photography</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    "Increased my bookings by 300% in just 3 months. The platform's reach and professional tools have transformed my business."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-xs text-gray-600 ml-2">Verified Vendor</span>
                    </div>
                    <div className="text-sm font-semibold text-primary-600">₹4.2L/month</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            key="video-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-4 lg:p-6 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4 lg:mb-6 relative overflow-hidden">
              <div className="text-white text-center z-10">
                <Play className="h-16 w-16 lg:h-20 lg:w-20 mx-auto mb-4 text-primary-400" />
                <h3 className="text-lg lg:text-xl font-semibold mb-2">Vendor Success Stories</h3>
                <p className="text-gray-300 text-sm lg:text-base">See how vendors are growing their business with Evea</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="primary"
                onClick={() => setIsVideoPlaying(false)}
                className="px-6 lg:px-8"
              >
                Close Video
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}