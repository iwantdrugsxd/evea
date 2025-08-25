'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Award, 
  Globe, 
  Heart,
  Target,
  Lightbulb,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
  MapPin
} from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import Footer from '@/components/layout/Footer'
import Logo from '@/components/layout/Logo'
import Button from '@/components/ui/button'
import AnimatedCounter from '@/components/common/AnimatedCounter'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make puts our customers and their special moments at the center.',
      color: 'from-red-500/20 to-pink-500/20',
      iconColor: 'text-red-400'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We maintain the highest standards of vendor verification and transparent pricing.',
      color: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology and user feedback.',
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering exceptional experiences that exceed expectations.',
      color: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400'
    }
  ]

  const milestones = [
    { year: '2022', title: 'Company Founded', description: 'Started with a vision to transform event planning', icon: Sparkles },
    { year: '2023', title: '100 Vendors', description: 'Reached our first major vendor milestone', icon: Users },
    { year: '2024', title: 'Award Winner', description: 'Recognized as Best Event Platform', icon: Award },
    { year: '2025', title: '500+ Vendors', description: 'Expanded across 25+ cities in India', icon: Globe }
  ]

  const stats = [
    { number: 10000, label: 'Events Completed', suffix: '+', icon: CheckCircle },
    { number: 500, label: 'Verified Vendors', suffix: '+', icon: Shield },
    { number: 25, label: 'Cities Covered', suffix: '+', icon: MapPin },
    { number: 98, label: 'Satisfaction Rate', suffix: '%', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <FloatingNavbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-black">
            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                x: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
              className="absolute bottom-40 left-1/4 w-36 h-36 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
            />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
          </div>

          <div className="container-custom relative z-10 pt-16 sm:pt-20 lg:pt-24">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <Logo size="lg" showText={true} variant="3d" />
                </motion.div>

                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
                >
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-semibold text-lg">About Evea</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-tight"
                >
                  <span className="block">Transforming Events</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Across India
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-xl sm:text-2xl lg:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto"
                >
                  We're on a mission to make event planning accessible, affordable, and stress-free 
                  for everyone. From intimate gatherings to grand celebrations, we connect you with 
                  India's most trusted vendors.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 lg:py-32 bg-black">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-6">
                    To democratize event planning by creating India's most comprehensive, 
                    trusted, and user-friendly platform that connects event organizers 
                    with verified professional vendors.
                  </p>
                  <p className="text-white/80 leading-relaxed text-lg">
                    We believe every celebration deserves to be perfect, regardless of budget 
                    or scale. Our platform eliminates the traditional barriers of event planning 
                    by providing transparency, quality assurance, and seamless coordination.
                  </p>
                </div>
                
                <Link href="/marketplace">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-2xl transition-all duration-300 group"
                  >
                    <span>See Our Platform</span>
                    <TrendingUp className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2 font-serif">
                        <AnimatedCounter 
                          end={stat.number} 
                          suffix={stat.suffix}
                          duration={2}
                        />
                      </div>
                      <div className="text-sm font-medium text-white/70">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32 bg-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-6">
                <Heart className="h-5 w-5 text-blue-400" />
                <span className="text-white font-semibold text-lg">Our Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6">
                What Drives Us
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                The core principles that guide everything we do and every decision we make.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300 h-full group">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`h-8 w-8 ${value.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 font-serif">
                      {value.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 lg:py-32 bg-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-6">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="text-white font-semibold text-lg">Our Journey</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6">
                Building the Future
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                From a simple idea to India's leading event management platform.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/50 to-purple-500/50 rounded-full"></div>

                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    } mb-16`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-black shadow-lg z-10"></div>

                    {/* Content Card */}
                    <div className={`w-80 ${index % 2 === 0 ? 'mr-8' : 'ml-8'} bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                          <milestone.icon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-white font-serif">
                          {milestone.year}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 font-serif">
                        {milestone.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6">
                Ready to Join Our Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Be part of India's fastest-growing event management community and 
                help us create unforgettable experiences for millions of people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-2xl transition-all duration-300"
                  >
                    Start Planning
                  </motion.button>
                </Link>
                <Link href="/vendor">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-2xl hover:bg-white/20 transition-all duration-300"
                  >
                    Become a Vendor
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}