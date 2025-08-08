'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  Database, 
  Cloud, 
  Code2, 
  Smartphone, 
  Globe, 
  Mail, 
  CreditCard,
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  Lock,
  Wifi,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Layers,
  Box
} from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'
import Tilt from 'react-parallax-tilt'

const integrationCategories = [
  {
    id: 'business',
    label: 'Business Tools',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50',
    integrations: [
      { name: 'Salesforce', logo: '🔵', description: 'CRM & Sales automation', popular: true },
      { name: 'HubSpot', logo: '🟠', description: 'Marketing & CRM platform', popular: true },
      { name: 'Slack', logo: '💬', description: 'Team communication', popular: true },
      { name: 'Microsoft Teams', logo: '🟣', description: 'Collaboration platform', popular: false },
      { name: 'Zoom', logo: '📹', description: 'Video conferencing', popular: false },
      { name: 'Asana', logo: '🔴', description: 'Project management', popular: false }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & Data',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50',
    integrations: [
      { name: 'Google Analytics', logo: '📊', description: 'Web analytics platform', popular: true },
      { name: 'Mixpanel', logo: '🔍', description: 'Product analytics', popular: true },
      { name: 'Tableau', logo: '📈', description: 'Data visualization', popular: false },
      { name: 'Power BI', logo: '⚡', description: 'Business intelligence', popular: true },
      { name: 'Looker', logo: '👁️', description: 'Data platform', popular: false },
      { name: 'Segment', logo: '🎯', description: 'Customer data platform', popular: false }
    ]
  },
  {
    id: 'payment',
    label: 'Payment & Finance',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    integrations: [
      { name: 'Stripe', logo: '💳', description: 'Payment processing', popular: true },
      { name: 'PayPal', logo: '💙', description: 'Digital payments', popular: true },
      { name: 'Razorpay', logo: '💰', description: 'Payment gateway', popular: true },
      { name: 'QuickBooks', logo: '📚', description: 'Accounting software', popular: false },
      { name: 'Xero', logo: '🟢', description: 'Cloud accounting', popular: false },
      { name: 'FreshBooks', logo: '🍃', description: 'Invoicing & time tracking', popular: false }
    ]
  },
  {
    id: 'cloud',
    label: 'Cloud Platforms',
    icon: Cloud,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    integrations: [
      { name: 'AWS', logo: '☁️', description: 'Amazon Web Services', popular: true },
      { name: 'Google Cloud', logo: '🌥️', description: 'Google Cloud Platform', popular: true },
      { name: 'Microsoft Azure', logo: '🔷', description: 'Cloud computing platform', popular: true },
      { name: 'DigitalOcean', logo: '🌊', description: 'Cloud infrastructure', popular: false },
      { name: 'Heroku', logo: '🟣', description: 'Cloud application platform', popular: false },
      { name: 'Vercel', logo: '▲', description: 'Frontend cloud platform', popular: false }
    ]
  }
]

const apiFeatures = [
  {
    icon: Code2,
    title: 'RESTful APIs',
    description: 'Comprehensive REST endpoints with OpenAPI documentation',
    features: ['OpenAPI 3.0 spec', 'Rate limiting', 'Authentication', 'Versioning'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Database,
    title: 'GraphQL Support',
    description: 'Flexible GraphQL queries with real-time subscriptions',
    features: ['Type-safe queries', 'Real-time subscriptions', 'Schema introspection', 'Playground'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Webhooks',
    description: 'Real-time event notifications with reliable delivery',
    features: ['Event filtering', 'Retry mechanisms', 'Signature verification', 'Delivery logs'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Box,
    title: 'SDK Libraries',
    description: 'Native SDKs for popular programming languages',
    features: ['JavaScript/TypeScript', 'Python', 'PHP', 'Go'],
    color: 'from-green-500 to-emerald-500'
  }
]

const IntegrationCard = ({ integration, index }: {
  integration: {
    name: string,
    logo: string,
    description: string,
    popular: boolean
  },
  index: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      {integration.popular && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            Popular
          </div>
        </div>
      )}
      
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <div className="flex items-center space-x-4 mb-3">
          <div className="text-3xl">{integration.logo}</div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
              {integration.name}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
              {integration.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Connected</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowRight className="h-4 w-4 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const APIFeatureCard = ({ feature, index }: {
  feature: typeof apiFeatures[0],
  index: number
}) => {
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
        className="group h-full"
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-20`}
          whileHover={{ opacity: 0.4, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl h-full overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-full blur-2xl`} />
          </div>
          
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-xl mb-6`}
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
            {feature.description}
          </p>
          
          {/* Features List */}
          <div className="space-y-3">
            {feature.features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-2.5 w-2.5 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

export default function IntegrationsSection() {
  const [activeTab, setActiveTab] = useState('business')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-slate-50 via-white to-purple-50/20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full blur-3xl" />
      </motion.div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Layers className="h-4 w-4 text-purple-400" />
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
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm px-8 py-4 rounded-full border border-blue-200 shadow-lg mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-6 w-6 text-blue-600" />
            </motion.div>
            <span className="text-blue-700 font-bold text-lg">Integrations & APIs</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Connect{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Everything
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Seamlessly integrate with 200+ popular tools and services, or build custom solutions 
            with our comprehensive API ecosystem designed for developers.
          </p>
        </motion.div>

        {/* Integration Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab List */}
            <Tabs.List className="flex justify-center mb-12 overflow-x-auto">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-white/50 shadow-xl">
                <div className="flex space-x-2">
                  {integrationCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Tabs.Trigger
                        key={category.id}
                        value={category.id}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
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
            {integrationCategories.map((category) => (
              <Tabs.Content key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {category.integrations.map((integration, index) => (
                    <IntegrationCard
                      key={integration.name}
                      integration={integration}
                      index={index}
                    />
                  ))}
                </motion.div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </motion.div>

        {/* API Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 font-heading">
              Developer-First{' '}
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                API Platform
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Build powerful integrations with our comprehensive API suite, complete with SDKs, 
              documentation, and developer tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apiFeatures.map((feature, index) => (
              <APIFeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-8">
              Join the Integration Ecosystem
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">200+</div>
                <p className="text-gray-300">Integrations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <p className="text-gray-300">API Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50ms</div>
                <p className="text-gray-300">Avg Response</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <p className="text-gray-300">Support</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Explore API Docs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Request Integration
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
