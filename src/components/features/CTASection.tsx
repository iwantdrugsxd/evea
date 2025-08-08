'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Rocket, 
  Star, 
  CheckCircle, 
  Zap, 
  Shield, 
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Play,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Gift,
  Clock,
  Target,
  Heart
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import CountUp from 'react-countup'
import Button from '@/components/ui/button'

const ctaBenefits = [
  { icon: Zap, text: 'Setup in under 5 minutes' },
  { icon: Shield, text: 'Enterprise-grade security' },
  { icon: Users, text: '24/7 expert support' },
  { icon: Award, text: '30-day money-back guarantee' }
]

const urgencyFeatures = [
  { icon: Gift, title: 'Limited Time Offer', description: 'Get 50% off your first 3 months' },
  { icon: Clock, title: 'Quick Implementation', description: 'Go live in less than 24 hours' },
  { icon: Target, title: 'Proven Results', description: '40% average productivity increase' }
]

const contactMethods = [
  {
    icon: Calendar,
    title: 'Schedule Demo',
    description: 'Book a personalized demo with our experts',
    action: 'Book Now',
    color: 'from-blue-500 to-cyan-500',
    popular: true
  },
  {
    icon: Phone,
    title: 'Call Sales',
    description: 'Speak directly with our sales team',
    action: 'Call Now',
    color: 'from-green-500 to-emerald-500',
    popular: false
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Get instant answers to your questions',
    action: 'Chat Now',
    color: 'from-purple-500 to-pink-500',
    popular: false
  }
]

const ParticleField = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 3
  }))
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

const FloatingElement = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode,
  delay?: number,
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.8, 
      delay,
      type: "spring",
      stiffness: 100,
      damping: 10
    }}
    className={className}
  >
    {children}
  </motion.div>
)

const ContactCard = ({ method, index }: {
  method: typeof contactMethods[0],
  index: number
}) => {
  const Icon = method.icon
  
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={1000}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`group relative ${method.popular ? 'transform scale-105' : ''}`}
      >
        {/* Popular Badge */}
        {method.popular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-3 -right-3 z-10"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Most Popular</span>
            </div>
          </motion.div>
        )}

        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${method.color} rounded-3xl blur opacity-20`}
          whileHover={{ opacity: 0.4, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl h-full overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${method.color} rounded-full blur-2xl`} />
          </div>
          
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center shadow-xl mb-6`}
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
            {method.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
            {method.description}
          </p>
          
          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              method.popular
                ? `bg-gradient-to-r ${method.color} text-white shadow-lg hover:shadow-xl`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {method.action}
          </motion.button>
        </motion.div>
      </motion.div>
    </Tilt>
  )
}

export default function FeaturesCTASection() {
  const [isHovered, setIsHovered] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]" />
        <ParticleField />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container-custom relative z-10">
        {/* Main CTA Hero */}
        <div className="text-center mb-20">
          <FloatingElement delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-8 py-4 rounded-full border border-purple-300/30 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="h-6 w-6 text-purple-300" />
              </motion.div>
              <span className="text-white/90 font-bold text-lg">Ready to Get Started?</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FloatingElement>

          <FloatingElement delay={0.4}>
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 font-heading leading-tight">
              Start Your
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                Success Story
              </span>
              Today
            </h2>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Join 50,000+ businesses that trust Evea to power their growth. 
              <span className="text-purple-300 font-semibold"> Experience the difference in minutes, not months.</span>
            </p>
          </FloatingElement>

          {/* Benefits Grid */}
          <FloatingElement delay={0.8}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {ctaBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
                >
                  <benefit.icon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-white/80 font-medium">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </FloatingElement>

          {/* Main CTA Buttons */}
          <FloatingElement delay={1.0}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/register">
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="relative group"
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75"
                      animate={{
                        opacity: isHovered ? 1 : 0.75,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <Button 
                      variant="primary" 
                      size="lg"
                      className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl"
                    >
                      <span className="flex items-center space-x-3">
                        <span>Start Free Trial</span>
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="h-6 w-6" />
                        </motion.div>
                      </span>
                    </Button>
                  </motion.div>
                </Tilt>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 text-lg font-medium group"
              >
                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span>Watch 2-min Demo</span>
              </motion.button>
            </div>
          </FloatingElement>
        </div>

        {/* Urgency Section */}
        <FloatingElement delay={1.2}>
          <motion.div
            style={{ rotateX }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Limited Time Launch Offer
              </h3>
              <p className="text-xl text-gray-300">
                Get started with exclusive benefits - available for the next 7 days only
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {urgencyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </FloatingElement>

        {/* Contact Methods */}
        <FloatingElement delay={1.4}>
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-xl text-gray-300">
                Our experts are standing by to help you succeed
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <ContactCard
                  key={method.title}
                  method={method}
                  index={index}
                />
              ))}
            </div>
          </div>
        </FloatingElement>

        {/* Final Stats */}
        <FloatingElement delay={1.6}>
          <div className="bg-gradient-to-r from-gray-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-8">
              Join the Success Story
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={50000} duration={2.5} suffix="+" />
                </div>
                <p className="text-gray-300">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={4.9} decimals={1} duration={2.5} suffix="★" />
                </div>
                <p className="text-gray-300">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={99.9} decimals={1} duration={2.5} suffix="%" />
                </div>
                <p className="text-gray-300">Uptime SLA</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={24} duration={2.5} suffix="/7" />
                </div>
                <p className="text-gray-300">Support</p>
              </div>
            </div>
          </div>
        </FloatingElement>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl">Demo video would be embedded here</p>
                </div>
              </div>
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
