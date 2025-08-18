'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Play, 
  CheckCircle, 
  Star, 
  Users, 
  Calendar,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Search,
  MapPin,
  Filter
} from 'lucide-react'
import { siteContent } from '@/data/content'
import Button from '@/components/ui/button'
import AnimatedCounter from '@/components/common/AnimatedCounter'

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedEventType, setSelectedEventType] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const { hero } = siteContent

  // Hero backgrounds and content for home page
  const heroContent = [
    {
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=1080&fit=crop&crop=center',
      title: 'India\'s #1',
      subtitle: 'Event Planning',
      description: 'Connect with 500+ verified vendors, book instantly, and create unforgettable events. Save up to 40% on costs.'
    },
    {
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop&crop=center',
      title: 'Create Unforgettable',
      subtitle: 'Memories',
      description: 'From intimate gatherings to grand celebrations, find the perfect vendors to make your special moments extraordinary.'
    },
    {
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=1080&fit=crop&crop=center',
      title: 'Trusted by',
      subtitle: 'Thousands',
      description: 'Join thousands of happy customers who have successfully planned their events with our verified vendor network.'
    },
    {
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1920&h=1080&fit=crop&crop=center',
      title: 'Everything You Need',
      subtitle: 'In One Place',
      description: 'Photography, catering, decoration, entertainment - find all your event needs from trusted professionals.'
    },
    {
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop&crop=center',
      title: 'Seamless',
      subtitle: 'Experience',
      description: 'Easy booking, secure payments, and dedicated support to ensure your event planning journey is smooth and stress-free.'
    }
  ]

  const eventTypes = [
    { id: 'wedding', name: 'Wedding', icon: '💒', color: 'bg-pink-100 text-pink-600' },
    { id: 'corporate', name: 'Corporate', icon: '🏢', color: 'bg-blue-100 text-blue-600' },
    { id: 'birthday', name: 'Birthday', icon: '🎂', color: 'bg-purple-100 text-purple-600' },
    { id: 'festival', name: 'Festival', icon: '🎉', color: 'bg-orange-100 text-orange-600' }
  ]

  const features = [
    { icon: CheckCircle, text: '500+ Verified Vendors', highlight: 'Verified' },
    { icon: Shield, text: '24/7 Customer Support', highlight: '24/7' },
    { icon: Zap, text: 'Instant Booking & Payment', highlight: 'Instant' }
  ]

  const floatingCards = [
    {
      title: 'Top Rated',
      subtitle: '4.8/5 Stars',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      position: 'lg:top-4 lg:left-4 top-2 left-2',
      responsivePosition: 'lg:absolute relative lg:mb-0 mb-4'
    },
    {
      title: 'Trending',
      subtitle: '+25% This Month',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      position: 'lg:top-4 lg:right-4 top-2 right-2',
      responsivePosition: 'lg:absolute relative lg:mb-0 mb-4'
    },
    {
      title: 'Award Winning',
      subtitle: 'Best Platform 2024',
      icon: Award,
      color: 'bg-purple-100 text-purple-600',
      position: 'lg:bottom-4 lg:left-4 bottom-2 left-2',
      responsivePosition: 'lg:absolute relative lg:mb-0 mb-4'
    }
  ]

  // Rotate hero content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroContent.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroContent.length])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
            alt="Event planning background"
            fill
            className="object-cover"
            priority
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="container-custom relative z-10 pt-16 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 xl:order-1 text-white"
          >
            {/* Premium Badge */}
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-full border border-white/30"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-yellow-400" />
              <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">{hero.badge.text}</span>
            </motion.div>

            {/* Hero Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-tight text-balance">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`title-${currentHeroIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    {heroContent[currentHeroIndex].title}{' '}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`subtitle-${currentHeroIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block mt-1 sm:mt-2"
                  >
                    {heroContent[currentHeroIndex].subtitle}
                  </motion.span>
                </AnimatePresence>
                <span className="block mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white/80">
                  Platform
                </span>
              </h1>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={`description-${currentHeroIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-base sm:text-lg lg:text-xl xl:text-2xl max-w-xl leading-relaxed text-white/90"
                >
                  {heroContent[currentHeroIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Interactive Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Event Type Selector */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-xs sm:text-sm font-semibold text-white/90">What type of event are you planning?</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                  {eventTypes.map((eventType) => (
                    <motion.button
                      key={eventType.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedEventType(eventType.id)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedEventType === eventType.id
                          ? 'border-yellow-400 bg-yellow-400/20 backdrop-blur-sm'
                          : 'border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-lg sm:text-xl lg:text-2xl mb-1">{eventType.icon}</div>
                      <div className="text-xs font-medium text-white">{eventType.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Location Search */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-xs sm:text-sm font-semibold text-white/90">Where is your event?</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Enter city or location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base text-white placeholder-white/60"
                  />
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Find Vendors Now</span>
              </motion.button>
            </motion.div>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-2 sm:space-y-3 lg:space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                  className="flex items-center space-x-2 sm:space-x-3"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-yellow-400/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-yellow-400" />
                  </div>
                  <span className="text-xs sm:text-sm lg:text-base text-white/90 font-medium">
                    {feature.text.split(' ').map((word, i) => 
                      word === feature.highlight ? (
                        <span key={i} className="text-yellow-400 font-semibold"> {word}</span>
                      ) : (
                        <span key={i}> {word}</span>
                      )
                    )}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative order-1 xl:order-2"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-elegant p-6 sm:p-8 border border-white/30"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Book Your Event</h3>
                  <p className="text-gray-600">Find the perfect vendors for your special day</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Available Vendors</span>
                    <span className="font-semibold text-gray-900">500+</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Average Rating</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="font-semibold text-gray-900 ml-1">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Success Rate</span>
                    <span className="font-semibold text-gray-900">98%</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  className={`${card.position} ${card.responsivePosition} bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant p-3 sm:p-4 border border-white/30`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${card.color}`}>
                      <card.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900">{card.title}</div>
                      <div className="text-xs text-gray-600">{card.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection