'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Star, TrendingUp, Award } from 'lucide-react'
import CountUp from 'react-countup'
import Tilt from 'react-parallax-tilt'
import Button from '@/components/ui/button'

const FloatingCard = ({ children, delay = 0, className = "" }: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.8, 
      delay,
      type: "spring",
      stiffness: 100,
      damping: 10
    }}
    whileHover={{ 
      y: -10, 
      scale: 1.05,
      transition: { duration: 0.3 }
    }}
    className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 ${className}`}
  >
    {children}
  </motion.div>
)

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, delay: number }>>([])
  
  React.useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 2
      }))
      setParticles(newParticles)
    }
    
    generateParticles()
  }, [])
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-red-300/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default function VendorHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-900"
    >
      {/* Professional Red Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/80 to-red-900/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.3),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.3),transparent_50%)]"></div>
        <ParticleBackground />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-purple-300/30"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 font-medium text-sm">Live Platform</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <span className="text-purple-200 font-medium text-sm">Join 500+ Vendors</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white font-heading leading-tight">
                Become an
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                  Evea Vendor
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Transform your event services business with India's most advanced marketplace platform. 
              <span className="text-purple-300 font-semibold"> Scale faster, earn more.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row items-start gap-4 pt-4"
            >
              <Link href="/vendor/register">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/25 border-0 text-lg px-8 py-4 group transition-all duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 text-lg font-medium"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
                <span>Watch Success Stories</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center space-x-6 pt-6"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white/20" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">500+ Active Vendors</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-white/80 text-sm ml-2">4.9/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Revenue Card */}
              <FloatingCard delay={0.6} className="p-6 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Revenue</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-4xl font-bold text-green-600">₹</span>
                      <CountUp
                        end={2.5}
                        decimals={1}
                        duration={2.5}
                        suffix="L+"
                        className="text-4xl font-bold text-green-600"
                      />
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Average vendor earnings</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
              </FloatingCard>

              {/* Events Card */}
              <FloatingCard delay={0.8} className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    <CountUp end={10000} duration={2.5} suffix="+" />
                  </div>
                  <p className="text-gray-600 text-sm">Events Managed</p>
                </div>
              </FloatingCard>

              {/* Rating Card */}
              <FloatingCard delay={1.0} className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">4.8★</div>
                  <p className="text-gray-600 text-sm">Average Rating</p>
                </div>
              </FloatingCard>

              {/* Success Story Card */}
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className="col-span-2">
                <FloatingCard delay={1.2} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Rajesh Photography</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        "Increased my bookings by 300% in just 3 months. The platform's reach is incredible!"
                      </p>
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-xs text-gray-500 ml-2">Verified Review</span>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </Tilt>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}