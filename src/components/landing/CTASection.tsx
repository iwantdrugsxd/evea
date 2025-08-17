'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Users, 
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  Star,
  Gift,
  Zap,
  Award
} from 'lucide-react'
import { siteContent } from '@/data/content'
import Button from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Input from '@/components/ui/input'

const CTASection = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cta } = siteContent

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setEmail('')
    // Show success toast
  }

  const urgencyFeatures = [
    { icon: Clock, text: 'Limited time 20% discount' },
    { icon: Star, text: 'Priority vendor access' },
    { icon: Shield, text: 'Extended support guarantee' },
    { icon: Award, text: 'Premium feature access' }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full translate-x-1/2 translate-y-1/2 animate-float"></div>
        <div className="absolute inset-0 dot-pattern opacity-20"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-16">
          {/* Special Offer Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 glass-red px-8 py-4 rounded-full mb-8 border border-primary-500/30"
          >
            <Gift className="h-6 w-6 text-primary-400" />
            <span className="text-primary-200 font-semibold text-lg">{cta.badge.text}</span>
            <Zap className="h-5 w-5 text-yellow-400" />
          </motion.div>
          
          {/* Main CTA Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-heading leading-tight"
          >
            {cta.title}
            <motion.span 
              className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {cta.subtitle}
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {cta.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/plan-event">
              <Button
                size="lg"
                className="btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Sparkles className="h-5 w-5" />
                  <span>Start Planning Today</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="lg"
              className="btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-900"
            >
              <Phone className="h-5 w-5 mr-2" />
              Talk to Expert
            </Button>
          </motion.div>
          {/* Duplicate description removed */}

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {cta.benefits.map((benefit, index) => {
              const IconComponent = benefit.icon === 'CheckCircle' ? CheckCircle : 
                                 benefit.icon === 'Shield' ? Shield :
                                 benefit.icon === 'Clock' ? Clock : Star
              
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <IconComponent className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">{benefit.text}</span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Second set of CTA buttons removed - keeping only the first set */}
        </div>

        {/* Urgency Section removed */}

        {/* Final Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary-400" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-primary-400" />
              <span>Award Winning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary-400" />
              <span>10K+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-primary-400" />
              <span>500+ Vendors</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection