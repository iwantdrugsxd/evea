'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  BarChart3, 
  Headphones, 
  Code2,
  Database,
  Cloud,
  Star,
  Award,
  Target,
  Sparkles
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'

const comparisonData = [
  {
    category: 'Core Features',
    features: [
      { name: 'Real-time Analytics', evea: true, competitor1: true, competitor2: false },
      { name: 'Advanced Reporting', evea: true, competitor1: true, competitor2: true },
      { name: 'Custom Dashboards', evea: true, competitor1: false, competitor2: false },
      { name: 'AI-Powered Insights', evea: true, competitor1: false, competitor2: false },
      { name: 'Predictive Analytics', evea: true, competitor1: false, competitor2: false }
    ]
  },
  {
    category: 'Integration & APIs',
    features: [
      { name: 'REST API Access', evea: true, competitor1: true, competitor2: true },
      { name: 'GraphQL Support', evea: true, competitor1: false, competitor2: false },
      { name: 'Webhook Integration', evea: true, competitor1: true, competitor2: false },
      { name: 'SDK Libraries', evea: true, competitor1: false, competitor2: false },
      { name: '200+ Pre-built Integrations', evea: true, competitor1: false, competitor2: false }
    ]
  },
  {
    category: 'Security & Compliance',
    features: [
      { name: 'SSL Encryption', evea: true, competitor1: true, competitor2: true },
      { name: 'SOC 2 Type II Certified', evea: true, competitor1: false, competitor2: false },
      { name: 'GDPR Compliance', evea: true, competitor1: true, competitor2: false },
      { name: 'Multi-factor Authentication', evea: true, competitor1: false, competitor2: false },
      { name: 'Advanced Threat Detection', evea: true, competitor1: false, competitor2: false }
    ]
  },
  {
    category: 'Support & Training',
    features: [
      { name: '24/7 Customer Support', evea: true, competitor1: false, competitor2: false },
      { name: 'Dedicated Account Manager', evea: true, competitor1: false, competitor2: false },
      { name: 'Free Training & Onboarding', evea: true, competitor1: false, competitor2: false },
      { name: 'Community Forums', evea: true, competitor1: true, competitor2: true },
      { name: 'Video Tutorials', evea: true, competitor1: true, competitor2: false }
    ]
  }
]

const plans = [
  {
    name: 'Competitor A',
    price: '$199',
    period: '/month',
    description: 'Industry standard solution',
    color: 'from-gray-400 to-gray-500',
    bgColor: 'from-gray-50 to-gray-100',
    features: ['Basic Analytics', 'Email Support', 'Standard Integrations'],
    popular: false
  },
  {
    name: 'Evea Platform',
    price: '$149',
    period: '/month',
    description: 'Advanced enterprise platform',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50',
    features: ['AI-Powered Analytics', '24/7 Priority Support', '200+ Integrations', 'Custom Dashboards'],
    popular: true
  },
  {
    name: 'Competitor B',
    price: '$249',
    period: '/month',
    description: 'Premium business solution',
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    features: ['Advanced Reports', 'Phone Support', 'Limited Integrations'],
    popular: false
  }
]

const FeatureRow = ({ feature, index }: {
  feature: {
    name: string,
    evea: boolean,
    competitor1: boolean,
    competitor2: boolean
  },
  index: number
}) => {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
    >
      <td className="py-4 px-6 text-left font-medium text-gray-900">
        {feature.name}
      </td>
      <td className="py-4 px-6 text-center">
        {feature.competitor1 ? (
          <Check className="h-5 w-5 text-green-500 mx-auto" />
        ) : (
          <X className="h-5 w-5 text-red-400 mx-auto" />
        )}
      </td>
      <td className="py-4 px-6 text-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        </motion.div>
      </td>
      <td className="py-4 px-6 text-center">
        {feature.competitor2 ? (
          <Check className="h-5 w-5 text-green-500 mx-auto" />
        ) : (
          <X className="h-5 w-5 text-red-400 mx-auto" />
        )}
      </td>
    </motion.tr>
  )
}

const PricingCard = ({ plan, index }: {
  plan: typeof plans[0],
  index: number
}) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={1000}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`relative ${plan.popular ? 'transform scale-105' : ''}`}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
              <Crown className="h-4 w-4" />
              <span>Most Popular</span>
            </div>
          </motion.div>
        )}

        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${plan.color} rounded-3xl blur opacity-20`}
          animate={{
            opacity: plan.popular ? 0.4 : 0.2,
            scale: plan.popular ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className={`relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 ${
          plan.popular ? 'border-purple-200' : 'border-white/50'
        } shadow-2xl h-full`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            
            <div className="flex items-baseline justify-center">
              <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-500 ml-2">{plan.period}</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-4 mb-8">
            {plan.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {plan.popular ? 'Get Started' : 'Learn More'}
          </motion.button>
        </div>
      </motion.div>
    </Tilt>
  )
}

export default function ComparisonSection() {
  const [activeView, setActiveView] = useState<'table' | 'pricing'>('table')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"])

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-white via-purple-50/30 to-white relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl" />
      </motion.div>

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
            <Target className="h-6 w-6 text-purple-600" />
            <span className="text-purple-700 font-bold text-lg">Platform Comparison</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Evea
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            See how Evea stacks up against the competition with superior features, 
            better pricing, and unmatched support that drives real business results.
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-white/50 shadow-xl">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveView('table')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeView === 'table'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Feature Comparison</span>
              </button>
              <button
                onClick={() => setActiveView('pricing')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeView === 'pricing'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Crown className="h-5 w-5" />
                <span>Pricing Comparison</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {activeView === 'table' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-purple-50/50">
                  <tr>
                    <th className="py-6 px-6 text-left font-bold text-gray-900 text-lg">Features</th>
                    <th className="py-6 px-6 text-center font-bold text-gray-700">Competitor A</th>
                    <th className="py-6 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Crown className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-900 text-lg">Evea</span>
                      </div>
                    </th>
                    <th className="py-6 px-6 text-center font-bold text-gray-700">Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((category, categoryIndex) => (
                    <React.Fragment key={category.category}>
                      <tr>
                        <td colSpan={4} className="py-4 px-6 bg-gradient-to-r from-purple-50 to-pink-50 border-y border-purple-100">
                          <h3 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                            <Sparkles className="h-5 w-5 text-purple-500" />
                            <span>{category.category}</span>
                          </h3>
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <FeatureRow
                          key={feature.name}
                          feature={feature}
                          index={categoryIndex * 10 + featureIndex}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join thousands of businesses that have already made the switch to Evea's 
                superior platform and are seeing unprecedented results.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
