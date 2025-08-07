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
  Gift
} from 'lucide-react'

const CTASection = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const benefits = [
    { icon: CheckCircle, text: 'No setup fees or hidden costs' },
    { icon: Shield, text: '100% money-back guarantee' },
    { icon: Clock, text: 'Book vendors in under 5 minutes' },
    { icon: Star, text: 'Access to 500+ verified vendors' }
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail('')
      // Could show success toast here
    }, 2000)
  }

  return (
    <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-16 animate-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary-600/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-primary-600/30"
          >
            <Gift className="h-5 w-5 text-primary-400" />
            <span className="text-primary-300 font-medium">Limited Time Offer - 20% Off First Event</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 font-heading leading-tight"
          >
            Ready to Create Your
            <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Perfect Event?
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Join thousands of satisfied customers who have transformed their events 
            with our trusted vendor network. Start planning today and experience the difference.
          </motion.p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50"
                >
                  <Icon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{benefit.text}</span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link 
              href="/marketplace"
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-medium transform hover:-translate-y-1"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Start Planning Now
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/vendor-onboarding"
              className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary-600 text-primary-400 hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              <Users className="h-5 w-5 mr-2" />
              Join as Vendor
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-gray-400 text-sm"
          >
            <div className="flex items-center justify-center space-x-6 mb-2">
              <span className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>SSL Secured</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>Verified Platform</span>
              </span>
              <span className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>4.8/5 Rating</span>
              </span>
            </div>
            <p>No spam, unsubscribe anytime</p>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-16"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">
              Get Event Planning Tips & Exclusive Offers
            </h3>
            <p className="text-gray-400">
              Join our newsletter for expert tips, vendor recommendations, and exclusive discounts.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Subscribe</span>
                  <Sparkles className="h-5 w-5" />
                </div>
              )}
            </button>
          </form>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="w-14 h-14 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-7 w-7 text-primary-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Call Us</h4>
            <p className="text-gray-400 mb-3">Speak with our event specialists</p>
            <Link href="tel:+919999999999" className="text-primary-400 hover:text-primary-300 font-medium">
              +91 9999-XXX-XXX
            </Link>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="w-14 h-14 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-7 w-7 text-primary-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Email Us</h4>
            <p className="text-gray-400 mb-3">Get detailed information via email</p>
            <Link href="mailto:hello@evea.com" className="text-primary-400 hover:text-primary-300 font-medium">
              hello@evea.com
            </Link>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="w-14 h-14 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-7 w-7 text-primary-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Book a Demo</h4>
            <p className="text-gray-400 mb-3">See our platform in action</p>
            <Link href="/demo" className="text-primary-400 hover:text-primary-300 font-medium">
              Schedule Demo
            </Link>
          </div>
        </motion.div>

        {/* Final Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-6 bg-gray-800/50 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-700/50">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">500+ vendors online</span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300 text-sm">10K+ events completed</span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-gray-300 text-sm">4.8/5 rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection