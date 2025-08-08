'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, 
  MessageSquare, 
  CreditCard, 
  TrendingUp,
  CheckCircle,
  Play,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  DollarSign
} from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'

const steps = [
  {
    id: 'step1',
    icon: UserPlus,
    title: 'Create Your Vendor Profile',
    shortTitle: 'Sign Up',
    description: 'Register and create your professional profile with service listings, portfolio images, and pricing packages.',
    details: [
      'Upload high-quality portfolio images',
      'Set competitive pricing packages', 
      'Add detailed service descriptions',
      'Verify your business credentials'
    ],
    time: '5 minutes',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    stats: { icon: Users, value: '500+', label: 'New vendors monthly' }
  },
  {
    id: 'step2',
    icon: MessageSquare,
    title: 'Get Quality Leads',
    shortTitle: 'Connect',
    description: 'Receive direct inquiries from verified clients in your area and event categories with our smart matching system.',
    details: [
      'AI-powered lead matching',
      'Verified customer inquiries only',
      'Real-time notification system',
      'Lead quality scoring'
    ],
    time: 'Instant',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    stats: { icon: MessageSquare, value: '10K+', label: 'Monthly inquiries' }
  },
  {
    id: 'step3',
    icon: CreditCard,
    title: 'Secure Bookings & Payments',
    shortTitle: 'Book & Pay',
    description: 'Confirm bookings through our secure platform, communicate with clients, and receive guaranteed payments.',
    details: [
      'Secure escrow payment system',
      'Automated booking confirmations',
      'Built-in chat system',
      'Digital contract management'
    ],
    time: '2 minutes',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    stats: { icon: DollarSign, value: '₹50L+', label: 'Monthly transactions' }
  },
  {
    id: 'step4',
    icon: TrendingUp,
    title: 'Grow with Analytics',
    shortTitle: 'Scale',
    description: 'Access detailed analytics, client reviews, and premium features to continuously grow your business.',
    details: [
      'Real-time business analytics',
      'Customer feedback management',
      'Premium listing upgrades',
      'Marketing tools and insights'
    ],
    time: 'Ongoing',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50',
    stats: { icon: TrendingUp, value: '300%', label: 'Average growth' }
  }
]

const InteractiveTimeline = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  
  return (
    <div className="relative">
      {/* Desktop Timeline */}
      <div className="hidden lg:block relative">
        {/* Progress Line */}
        <div className="absolute top-20 left-0 w-full h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Timeline Steps */}
        <div className="grid grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index <= activeStep
            const isHovered = hoveredStep === index
            
            return (
              <motion.div
                key={step.id}
                className="relative cursor-pointer"
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Step Circle */}
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 border-4 ${
                    isActive 
                      ? 'border-white shadow-2xl' 
                      : 'border-gray-200 shadow-lg'
                  }`}
                  animate={{
                    background: isActive 
                      ? `linear-gradient(135deg, ${step.color.split(' ')[1]}, ${step.color.split(' ')[3]})`
                      : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className={`h-8 w-8 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  
                  {/* Pulse Animation for Active Step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-white/50"
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shadow-lg">
                  {index + 1}
                </div>

                {/* Step Content */}
                <motion.div
                  className="text-center"
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    y: isHovered ? -5 : 0
                  }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.shortTitle}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                  
                  {/* Stats */}
                  <motion.div
                    className={`bg-gradient-to-r ${step.bgColor} p-3 rounded-xl border border-gray-100`}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      opacity: isActive ? 1 : 0.8
                    }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <step.stats.icon className="h-4 w-4 text-gray-600" />
                      <span className="font-bold text-gray-900">{step.stats.value}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{step.stats.label}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === activeStep
          
          return (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-start space-x-6">
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-200" />
                )}
                
                {/* Step Circle */}
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r ${step.color} shadow-xl`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveStep(index)}
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
                
                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <step.stats.icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold">{step.stats.value} {step.stats.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const StepDetails = ({ activeStep }: { activeStep: number }) => {
  const step = steps[activeStep]
  const Icon = step.icon
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl"
      >
        <div className="flex items-start space-x-6">
          <motion.div
            className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-xl flex-shrink-0`}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Icon className="h-10 w-10 text-white" />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {step.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl" />
      </motion.div>
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
          className="text-center mb-20"
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
              <Play className="h-6 w-6 text-purple-600" />
            </motion.div>
            <span className="text-purple-700 font-bold text-lg">Simple Process</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            How It{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get started in minutes and begin growing your event services business with our streamlined onboarding process
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Tabs.Root value={`step${activeStep + 1}`} onValueChange={(value) => setActiveStep(parseInt(value.replace('step', '')) - 1)}>
            <InteractiveTimeline />
          </Tabs.Root>
        </motion.div>

        {/* Step Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <StepDetails activeStep={activeStep} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>Start Your Journey Today</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}