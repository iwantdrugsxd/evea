'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  BarChart3, 
  Users, 
  MessageSquare, 
  CreditCard,
  Bell,
  Settings,
  Database,
  Cloud,
  Lock,
  Wifi,
  Layers,
  Code,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  Target,
  Sparkles
} from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'
import Tilt from 'react-parallax-tilt'
import CountUp from 'react-countup'

const featureCategories = [
  {
    id: 'platform',
    label: 'Platform',
    icon: Layers,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50',
    features: [
      {
        icon: Zap,
        title: 'Lightning Performance',
        description: 'Optimized infrastructure delivering sub-second response times with global CDN distribution.',
        benefits: ['99.9% uptime guarantee', 'Global edge locations', 'Auto-scaling architecture', 'Real-time monitoring'],
        stats: { value: '<500ms', label: 'Response Time' },
        color: 'from-yellow-400 to-orange-500'
      },
      {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-grade security with end-to-end encryption, compliance certifications, and threat detection.',
        benefits: ['SOC 2 Type II certified', 'GDPR & CCPA compliant', '256-bit AES encryption', 'Multi-factor authentication'],
        stats: { value: '100%', label: 'Security Score' },
        color: 'from-green-400 to-emerald-500'
      },
      {
        icon: Globe,
        title: 'Global Scalability',
        description: 'Multi-region deployment with automatic failover and load balancing across continents.',
        benefits: ['50+ global regions', 'Auto-failover systems', 'Load balancing', 'Disaster recovery'],
        stats: { value: '50+', label: 'Regions' },
        color: 'from-blue-400 to-cyan-500'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50',
    features: [
      {
        icon: TrendingUp,
        title: 'Real-time Insights',
        description: 'Advanced analytics dashboard with live data visualization and predictive modeling.',
        benefits: ['Live data streaming', 'Custom dashboards', 'Predictive analytics', 'Export capabilities'],
        stats: { value: 'Real-time', label: 'Data Updates' },
        color: 'from-indigo-400 to-purple-500'
      },
      {
        icon: Target,
        title: 'Performance Metrics',
        description: 'Comprehensive KPI tracking with automated reporting and actionable recommendations.',
        benefits: ['Custom KPI tracking', 'Automated reports', 'Benchmark analysis', 'ROI calculations'],
        stats: { value: '50+', label: 'Metrics' },
        color: 'from-pink-400 to-rose-500'
      },
      {
        icon: Award,
        title: 'Business Intelligence',
        description: 'AI-powered insights with trend analysis, forecasting, and strategic recommendations.',
        benefits: ['AI-powered insights', 'Trend forecasting', 'Strategic planning', 'Competitive analysis'],
        stats: { value: '95%', label: 'Accuracy' },
        color: 'from-orange-400 to-red-500'
      }
    ]
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Code,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    features: [
      {
        icon: Database,
        title: 'API Ecosystem',
        description: 'Comprehensive REST & GraphQL APIs with extensive documentation and SDKs.',
        benefits: ['RESTful APIs', 'GraphQL support', 'SDK libraries', 'Webhook integrations'],
        stats: { value: '100+', label: 'Endpoints' },
        color: 'from-slate-400 to-gray-500'
      },
      {
        icon: Cloud,
        title: 'Cloud Platforms',
        description: 'Native integrations with major cloud providers and enterprise software solutions.',
        benefits: ['AWS integration', 'Azure compatibility', 'GCP support', 'Hybrid deployments'],
        stats: { value: '25+', label: 'Platforms' },
        color: 'from-sky-400 to-blue-500'
      },
      {
        icon: Wifi,
        title: 'Third-party Tools',
        description: 'Seamless connectivity with popular business tools, CRMs, and productivity suites.',
        benefits: ['CRM integrations', 'Email platforms', 'Payment gateways', 'Analytics tools'],
        stats: { value: '200+', label: 'Integrations' },
        color: 'from-teal-400 to-cyan-500'
      }
    ]
  }
]

const FeatureCard = ({ feature, index, categoryColor }: {
  feature: {
    icon: React.ComponentType<any>,
    title: string,
    description: string,
    benefits: string[],
    stats: { value: string, label: string },
    color: string
  },
  index: number,
  categoryColor: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = feature.icon
  
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
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
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
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl h-full overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-full blur-3xl`} />
          </div>
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-xl`}
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
            
            {/* Stats Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`bg-gradient-to-r ${categoryColor.replace('500', '50').replace('600', '50')} px-4 py-2 rounded-full border border-gray-200 flex items-center space-x-2`}
            >
              <span className="font-bold text-gray-900 text-sm">{feature.stats.value}</span>
              <span className="text-xs text-gray-600">{feature.stats.label}</span>
            </motion.div>
          </div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
            {feature.description}
          </p>
          
          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            {feature.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <CheckCircle className="h-3 w-3 text-white" />
                </motion.div>
                <span className="text-gray-700 font-medium text-sm">{benefit}</span>
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
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg cursor-pointer`}
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Tilt>
  )
}

export default function FeatureShowcaseSection() {
  const [activeTab, setActiveTab] = useState('platform')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  return (
    <section 
      id="features"
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-3xl" />
      </motion.div>
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm px-8 py-4 rounded-full border border-purple-200 shadow-lg mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-6 w-6 text-purple-600" />
            </motion.div>
            <span className="text-purple-700 font-bold text-lg">Feature Showcase</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Everything You Need{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Built-In
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover our comprehensive suite of advanced features designed to streamline operations, 
            boost productivity, and drive unprecedented growth for your business.
          </p>
        </motion.div>

        {/* Feature Categories Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab List */}
            <Tabs.List className="flex justify-center mb-12">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-white/50 shadow-xl">
                <div className="flex space-x-2">
                  {featureCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Tabs.Trigger
                        key={category.id}
                        value={category.id}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          activeTab === category.id
                            ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{category.label}</span>
                      </Tabs.Trigger>
                    )
                  })}
                </div>
              </div>
            </Tabs.List>

            {/* Tab Content */}
            {featureCategories.map((category) => (
              <Tabs.Content key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {category.features.map((feature, index) => (
                    <FeatureCard
                      key={feature.title}
                      feature={feature}
                      index={index}
                      categoryColor={category.color}
                    />
                  ))}
                </motion.div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-8">
              Trusted by Industry Leaders
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={99.9} decimals={1} duration={2.5} suffix="%" />
                </div>
                <p className="text-gray-300">Uptime SLA</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={50000} duration={2.5} suffix="+" />
                </div>
                <p className="text-gray-300">Enterprise Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={200} duration={2.5} suffix="+" />
                </div>
                <p className="text-gray-300">Integrations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <CountUp end={24} duration={2.5} suffix="/7" />
                </div>
                <p className="text-gray-300">Support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
