'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Sparkles, 
  Rocket,
  Star,
  CheckCircle,
  Gift,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Award,
  Heart,
  Target
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import CountUp from 'react-countup'
import Button from '@/components/ui/button'

const benefits = [
  { icon: CheckCircle, text: 'Zero setup fees' },
  { icon: Zap, text: 'Instant approval' },
  { icon: TrendingUp, text: '300% growth potential' },
  { icon: Award, text: 'Premium vendor badge' }
]

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

const ParticleField = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2
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
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false)
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
        {/* Main CTA */}
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
              <span className="text-white/90 font-bold text-lg">Launch Your Success</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FloatingElement>

          <FloatingElement delay={0.4}>
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 font-heading leading-tight">
              Ready to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Transform
              </span>
              <br />
              Your Business?
            </h2>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Join India's fastest-growing event marketplace and unlock unlimited growth potential. 
              <span className="text-purple-300 font-semibold"> Start earning more today!</span>
            </p>
          </FloatingElement>

          {/* Benefits Grid */}
          <FloatingElement delay={0.8}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
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

          {/* Main CTA Button */}
          <FloatingElement delay={1.0}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/vendor/register">
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
                        <span>Start Your Journey</span>
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
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 text-lg font-medium group"
              >
                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
                <span>Watch Demo</span>
              </motion.button>
            </div>
          </FloatingElement>
        </div>

        {/* Stats Section */}
        <FloatingElement delay={1.2}>
          <motion.div
            style={{ rotateX }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={500} duration={2.5} suffix="+" />
                </div>
                <p className="text-gray-300">Active Vendors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  ₹<CountUp end={50} duration={2.5} suffix="L+" />
                </div>
                <p className="text-gray-300">Monthly Revenue</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={10000} duration={2.5} suffix="+" />
                </div>
                <p className="text-gray-300">Events Managed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={4.9} decimals={1} duration={2.5} suffix="★" />
                </div>
                <p className="text-gray-300">Platform Rating</p>
              </div>
            </div>
          </motion.div>
        </FloatingElement>

        {/* Support Section */}
        <FloatingElement delay={1.4}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Card */}
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Need Help?</h3>
                    <p className="text-gray-300">Our vendor success team is here for you</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <motion.a 
                    href="mailto:vendors@evea.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-blue-300 hover:text-blue-200 transition-colors group"
                  >
                    <Mail className="h-5 w-5" />
                    <span>vendors@evea.com</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                  
                  <motion.a 
                    href="tel:+91XXXXXXXXXX"
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-blue-300 hover:text-blue-200 transition-colors group"
                  >
                    <Phone className="h-5 w-5" />
                    <span>+91-XXXXX-XXXXX</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </div>
              </motion.div>
            </Tilt>

            {/* Urgency Card */}
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-8 border border-orange-300/30 relative overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-2xl"
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Limited Time Offer</h3>
                      <p className="text-orange-200">Early bird benefits for new vendors</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">Zero commission for first month</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">Premium listing for 3 months</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">Dedicated account manager</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-6 text-orange-300">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Offer expires in 7 days</span>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          </div>
        </FloatingElement>
      </div>
    </section>
  )
}