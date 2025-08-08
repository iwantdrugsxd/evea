'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Rocket, 
  Star, 
  Play,
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  TrendingUp,
  Award,
  Layers,
  Database,
  Smartphone,
  Cloud
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import CountUp from 'react-countup'
import Link from 'next/link'
import Button from '@/components/ui/button'

const floatingIcons = [
  { icon: Zap, color: 'text-yellow-400', delay: 0 },
  { icon: Shield, color: 'text-green-400', delay: 0.5 },
  { icon: Rocket, color: 'text-blue-400', delay: 1 },
  { icon: Globe, color: 'text-purple-400', delay: 1.5 },
  { icon: Users, color: 'text-pink-400', delay: 2 },
  { icon: TrendingUp, color: 'text-indigo-400', delay: 2.5 },
  { icon: Award, color: 'text-orange-400', delay: 3 },
  { icon: Layers, color: 'text-cyan-400', delay: 3.5 },
  { icon: Database, color: 'text-emerald-400', delay: 4 },
  { icon: Smartphone, color: 'text-rose-400', delay: 4.5 },
  { icon: Cloud, color: 'text-sky-400', delay: 5 }
]

const FeatureCard = ({ feature, index, isHovered, onHover }: {
  feature: {
    icon: React.ComponentType<any>,
    title: string,
    description: string,
    color: string,
    bgColor: string,
    stats: { value: string, label: string }
  },
  index: number,
  isHovered: boolean,
  onHover: (index: number | null) => void
}) => {
  const Icon = feature.icon
  
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
        transition={{ duration: 0.8, delay: index * 0.1 }}
        onHoverStart={() => onHover(index)}
        onHoverEnd={() => onHover(null)}
        className="group h-full"
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-20`}
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-2xl h-full overflow-hidden"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-full blur-2xl`} />
          </div>
          
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-xl mb-4`}
          >
            <Icon className="h-7 w-7 text-white" />
          </motion.div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
            {feature.description}
          </p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={`bg-gradient-to-r ${feature.bgColor} px-4 py-2 rounded-full border border-gray-200 inline-flex items-center space-x-2`}
          >
            <span className="font-bold text-gray-900">{feature.stats.value}</span>
            <span className="text-sm text-gray-600">{feature.stats.label}</span>
          </motion.div>
          
          {/* Hover Action */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 right-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg cursor-pointer`}
                >
                  <ArrowRight className="h-4 w-4 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Tilt>
  )
}

const FloatingIconsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {floatingIcons.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${10 + (index * 8) % 80}%`,
              top: `${10 + (index * 13) % 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <Icon className={`h-8 w-8 ${item.color}`} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function FeaturesHeroSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const coreFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with sub-second load times and instant interactions",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      stats: { value: "<1s", label: "Load Time" }
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance standards",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      stats: { value: "99.9%", label: "Security Score" }
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Multi-region deployment with CDN optimization for worldwide accessibility",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      stats: { value: "50+", label: "Countries" }
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Responsive design with native app experience across all devices",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      stats: { value: "100%", label: "Mobile Ready" }
    }
  ]

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <FloatingIconsBackground />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5 text-purple-300" />
              </motion.div>
              <span className="text-white/90 font-medium text-sm">Advanced Features</span>
              <div className="w-px h-4 bg-white/20" />
              <span className="text-purple-200 font-medium text-sm">Next-Gen Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold font-heading leading-tight">
                Powerful
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                  Features
                </span>
                That Scale
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Experience cutting-edge technology with enterprise-grade features designed to 
              <span className="text-purple-300 font-semibold"> transform your business operations.</span>
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: CheckCircle, text: "Real-time Analytics" },
                { icon: CheckCircle, text: "AI-Powered Insights" },
                { icon: CheckCircle, text: "Seamless Integration" },
                { icon: CheckCircle, text: "24/7 Support" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <item.icon className="h-5 w-5 text-green-400" />
                  <span className="text-white/80">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-start gap-4 pt-4"
            >
              <Link href="#features">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/25 border-0 text-lg px-8 py-4 group transition-all duration-300"
                >
                  Explore Features
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 text-lg font-medium group"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Performance Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    <CountUp end={99.9} decimals={1} duration={2.5} suffix="%" />
                  </div>
                  <p className="text-gray-300 text-sm">Uptime</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    <CountUp end={50000} duration={2.5} suffix="+" />
                  </div>
                  <p className="text-gray-300 text-sm">Active Users</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 col-span-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Processing Power</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-blue-400">
                        <CountUp end={1.2} decimals={1} duration={2.5} suffix="M" />
                      </span>
                      <span className="text-white/80">requests/hour</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Core Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {coreFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isHovered={hoveredCard === index}
              onHover={setHoveredCard}
            />
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setVideoModalOpen(false)}
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
                onClick={() => setVideoModalOpen(false)}
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
