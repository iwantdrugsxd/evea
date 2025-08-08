'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, 
  Megaphone, 
  Smartphone, 
  GraduationCap,
  Shield,
  Users,
  BarChart3,
  Clock,
  Star,
  Zap,
  Gift,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import CountUp from 'react-countup'

const primaryBenefits = [
  {
    icon: DollarSign,
    title: 'Zero Upfront Investment',
    description: 'Start earning immediately with no joining fees or hidden costs. Pay only when you succeed.',
    details: ['No registration fees', 'No monthly subscriptions', 'Only 5% commission on bookings', 'Instant payout system'],
    color: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    stats: { value: '₹0', label: 'Setup Cost', icon: DollarSign }
  },
  {
    icon: Megaphone,
    title: 'Marketing & Promotion',
    description: 'Get featured in our campaigns, social media, and premium listings to reach more customers.',
    details: ['Featured in promotions', 'Social media marketing', 'SEO-optimized listings', 'Premium placement options'],
    color: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    stats: { value: '10x', label: 'More Visibility', icon: TrendingUp }
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Platform',
    description: 'Manage your entire business from anywhere with our intuitive mobile app and responsive platform.',
    details: ['Native mobile app', 'Real-time notifications', 'Offline capability', 'Cloud synchronization'],
    color: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50',
    stats: { value: '24/7', label: 'Access', icon: Clock }
  },
  {
    icon: GraduationCap,
    title: 'Training & Growth',
    description: 'Access exclusive training materials, webinars, and insights to continuously improve your services.',
    details: ['Free training programs', 'Industry insights', 'Best practices guides', 'Certification courses'],
    color: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-50 to-red-50',
    stats: { value: '100+', label: 'Resources', icon: GraduationCap }
  }
]

const additionalPerks = [
  { icon: Shield, title: 'Payment Security', description: 'Guaranteed payments with escrow protection' },
  { icon: Users, title: 'Quality Customers', description: 'Verified clients with serious booking intent' },
  { icon: BarChart3, title: 'Business Analytics', description: 'Detailed insights to grow your business' },
  { icon: Star, title: 'Review System', description: 'Build credibility with authentic reviews' },
  { icon: Zap, title: 'Instant Booking', description: 'Quick booking confirmations and communication' },
  { icon: Gift, title: 'Loyalty Rewards', description: 'Earn bonuses and exclusive vendor benefits' }
]

const FloatingBenefitCard = ({ benefit, index, isHovered, onHover }: {
  benefit: typeof primaryBenefits[0],
  index: number,
  isHovered: boolean,
  onHover: (index: number | null) => void
}) => {
  const Icon = benefit.icon
  const StatsIcon = benefit.stats.icon
  
  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      transitionSpeed={1000}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        onHoverStart={() => onHover(index)}
        onHoverEnd={() => onHover(null)}
        className="group h-full"
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-1 rounded-3xl blur opacity-75"
          style={{
            background: `linear-gradient(45deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})`
          }}
          animate={{
            opacity: isHovered ? 1 : 0.75,
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl h-full overflow-hidden"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className={`w-full h-full bg-gradient-to-br ${benefit.color} rounded-full blur-2xl`} />
          </div>
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center shadow-xl`}
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
            
            {/* Stats Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`bg-gradient-to-r ${benefit.bgGradient} px-4 py-2 rounded-full border border-gray-200 flex items-center space-x-2`}
            >
              <StatsIcon className="h-4 w-4 text-gray-600" />
              <span className="font-bold text-gray-900">{benefit.stats.value}</span>
              <span className="text-sm text-gray-600">{benefit.stats.label}</span>
            </motion.div>
          </div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
            {benefit.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
            {benefit.description}
          </p>
          
          {/* Features List */}
          <div className="space-y-3 mb-6">
            {benefit.details.map((detail, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <CheckCircle className="h-3 w-3 text-white" />
                </motion.div>
                <span className="text-gray-700 font-medium">{detail}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Hover Action */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 right-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center shadow-lg cursor-pointer`}
                >
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Tilt>
  )
}

export default function BenefitsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y, opacity }}
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-200 to-red-200 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-sm px-8 py-4 rounded-full border border-indigo-200 shadow-lg mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Award className="h-6 w-6 text-indigo-600" />
            </motion.div>
            <span className="text-indigo-700 font-bold text-lg">Vendor Benefits</span>
            <Zap className="h-5 w-5 text-indigo-500" />
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Exclusive{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Benefits
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join thousands of successful vendors and unlock powerful tools, resources, and opportunities to accelerate your business growth
          </p>
        </motion.div>

        {/* Primary Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {primaryBenefits.map((benefit, index) => (
            <FloatingBenefitCard
              key={benefit.title}
              benefit={benefit}
              index={index}
              isHovered={hoveredCard === index}
              onHover={setHoveredCard}
            />
          ))}
        </div>

        {/* Additional Perks */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Plus Many More Perks
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalPerks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/90">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                  >
                    <perk.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h4 className="font-bold text-gray-900 text-center mb-2 group-hover:text-gray-800 transition-colors">
                    {perk.title}
                  </h4>
                  <p className="text-gray-600 text-sm text-center group-hover:text-gray-700 transition-colors">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-8">
              Join Our Success Story
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={500} duration={2.5} suffix="+" />
                </div>
                <p className="text-gray-300">Active Vendors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={10000} duration={2.5} suffix="+" />
                </div>
                <p className="text-gray-300">Events Completed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  ₹<CountUp end={50} duration={2.5} suffix="L+" />
                </div>
                <p className="text-gray-300">Monthly Revenue</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={4.8} decimals={1} duration={2.5} suffix="★" />
                </div>
                <p className="text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}