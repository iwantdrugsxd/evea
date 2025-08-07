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
  Sparkles,
  TrendingUp,
  Award,
  Shield,
  Zap
} from 'lucide-react'
import { siteContent } from '@/data/content'
import Button from '@/components/ui/button'
import AnimatedCounter from '@/components/common/AnimatedCounter'

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { hero } = siteContent

  const features = [
    { icon: CheckCircle, text: 'Verified vendors across all categories' },
    { icon: Shield, text: '24/7 customer support & protection' },
    { icon: Zap, text: 'Transparent pricing & instant booking' }
  ]

  const floatingCards = [
    {
      title: 'Top Rated',
      subtitle: '500+ Reviews',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      position: 'top-4 left-4'
    },
    {
      title: 'Trending',
      subtitle: '+25% This Month',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      position: 'top-4 right-4'
    },
    {
      title: 'Award Winning',
      subtitle: 'Best Platform 2024',
      icon: Award,
      color: 'bg-purple-100 text-purple-600',
      position: 'bottom-4 left-4'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center hero-pattern overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/20 to-white"></div>
      
      {/* Floating Animated Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary-100 rounded-full opacity-40 animate-float blur-sm"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-30 animate-bounce-soft"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary-200 rounded-full opacity-50 animate-pulse-glow"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 px-6 py-4 rounded-full border border-primary-200 shadow-red-soft"
            >
              <Sparkles className="h-5 w-5 text-primary-600" />
              <span className="text-primary-700 font-semibold text-lg">{hero.badge.text}</span>
            </motion.div>

            {/* Hero Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-hero font-heading text-gray-900 leading-none text-balance">
                {hero.title}{' '}
                <span className="text-gradient block mt-2">
                  {hero.subtitle}
                </span>
                <span className="block mt-2">
                  {hero.tagline}
                </span>
              </h1>
              
              <p className="text-subtitle max-w-xl leading-relaxed">
                {hero.description}
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
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/marketplace">
                <Button variant="primary" size="lg" className="group">
                  {hero.cta.primary}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setIsVideoPlaying(true)}
                className="group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {hero.cta.secondary}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-200"
            >
              {hero.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-1 font-heading">
                    <AnimatedCounter 
                      end={stat.number} 
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative lg:pl-8"
          >
            <div className="relative">
              {/* Main Dashboard Container */}
              <div className="relative bg-white rounded-2xl shadow-elegant-large border border-gray-100 p-6 lg:p-8">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-heading">Event Dashboard</h3>
                    <p className="text-sm text-gray-600">Wedding Planning Progress</p>
                  </div>
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="space-y-4 mb-6">
                  {[
                    { name: 'Venue', status: 'completed', price: '₹1,50,000' },
                    { name: 'Catering', status: 'completed', price: '₹45,000' },
                    { name: 'Photography', status: 'in-progress', price: '₹25,000' },
                    { name: 'Decoration', status: 'pending', price: '₹35,000' },
                    { name: 'Music', status: 'pending', price: '₹15,000' }
                  ].map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          service.status === 'completed' 
                            ? 'bg-green-500' 
                            : service.status === 'in-progress'
                            ? 'bg-yellow-500'
                            : 'bg-gray-300'
                        }`}></div>
                        <span className="font-medium text-gray-900">{service.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{service.price}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-bold text-primary-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 2, delay: 2.5 }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Budget Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary-600 font-heading">₹2.7L</div>
                    <div className="text-xs text-gray-600">Total Budget</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 font-heading">₹15K</div>
                    <div className="text-xs text-gray-600">Savings</div>
                  </div>
                </div>
              </div>

              {/* Floating Notification Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.2 + index * 0.2 }}
                  className={`absolute ${card.position} bg-white rounded-xl p-4 shadow-elegant border border-gray-100 hover-lift`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{card.title}</div>
                      <div className="text-xs text-gray-600">{card.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-20 animate-pulse-soft"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
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
            className="bg-white rounded-2xl p-6 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="text-white text-center z-10">
                <Play className="h-20 w-20 mx-auto mb-4 text-primary-400" />
                <h3 className="text-xl font-semibold mb-2">Platform Demo Video</h3>
                <p className="text-gray-300">See how Evea transforms event planning</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="primary"
                onClick={() => setIsVideoPlaying(false)}
                className="px-8"
              >
                Close Preview
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection