'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp, 
  Award,
  PlayCircle
} from 'lucide-react'
import Button from '@/components/ui/button'

const StatCard = ({ 
  icon: Icon, 
  number, 
  label 
}: { 
  icon: any, 
  number: string, 
  label: string 
}) => (
  <div className="text-center lg:text-left">
    <div className="flex items-center justify-center lg:justify-start mb-2">
      <Icon className="w-5 h-5 text-yellow-400 mr-2" />
      <span className="text-2xl font-bold text-white">{number}</span>
    </div>
    <p className="text-white/80 font-medium">{label}</p>
  </div>
)

export default function VendorHeroSection() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  
  // Hero backgrounds and content for vendors
  const heroContent = [
    {
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1920&h=1080&fit=crop&crop=center',
      title: 'Grow Your',
      subtitle: 'Event Business',
      description: 'Join thousands of successful vendors who have transformed their event businesses. Get more bookings, higher earnings, and premium customers.'
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center',
      title: 'Reach More',
      subtitle: 'Customers',
      description: 'Connect with customers actively looking for your services. Our platform brings qualified leads directly to your business.'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&crop=center',
      title: 'Increase Your',
      subtitle: 'Revenue',
      description: 'Boost your earnings with our commission-free platform. Keep more of what you earn while growing your business.'
    },
    {
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&h=1080&fit=crop&crop=center',
      title: 'Build Your',
      subtitle: 'Brand',
      description: 'Showcase your work, build trust with reviews, and establish your brand as a leading event service provider.'
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=1080&fit=crop&crop=center',
      title: 'Professional',
      subtitle: 'Tools',
      description: 'Access powerful tools for booking management, customer communication, and business analytics.'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Active Customers', icon: Users },
    { number: '₹2.5Cr+', label: 'Revenue Generated', icon: TrendingUp },
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '95%', label: 'Customer Retention', icon: TrendingUp }
  ]

  // Rotate hero content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroContent.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroContent.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Rotating Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeroIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={heroContent[currentHeroIndex].image}
            alt="Vendor business background"
            fill
            className="object-cover"
            priority
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container-custom pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left text-white"
          >
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium mb-6 border border-white/30"
            >
              <Award className="w-4 h-4" />
              <span>India's #1 Event Platform</span>
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`title-${currentHeroIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  {heroContent[currentHeroIndex].title}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`subtitle-${currentHeroIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block"
                >
                  {heroContent[currentHeroIndex].subtitle}
                </motion.span>
              </AnimatePresence>
            </h1>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={`description-${currentHeroIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl mb-8 leading-relaxed text-white/90"
              >
                {heroContent[currentHeroIndex].description}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button variant="primary" size="lg" className="group text-lg px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                <span>Start Earning Today</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:border-white/50 hover:bg-white/10">
                <PlayCircle className="mr-2 w-5 h-5" />
                <span>Watch Demo</span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  number={stat.number}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-elegant p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-white/30">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">New Booking!</p>
                    <p className="text-gray-600 text-sm">Wedding Photography</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">₹45,000</div>
                <div className="text-green-600 font-medium">+15% from last month</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Monthly Revenue</span>
                  <span className="font-semibold text-gray-900">₹2,50,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Active Bookings</span>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Customer Rating</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="font-semibold text-gray-900 ml-1">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
