'use client'

import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  CheckCircle, 
  Globe
} from 'lucide-react'
import Button from '@/components/ui/button'

export default function VendorCTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full"></div>
      </div>

      <div className="relative z-10 container-custom text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Ready to Transform Your Business?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-primary-100 mb-8 leading-relaxed max-w-4xl mx-auto"
        >
          Join thousands of successful vendors and start growing your event business today. 
          No setup fees, no hidden charges.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Button variant="secondary" size="lg" className="text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-50">
            <span>Start Your Journey</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Globe className="mr-2 w-5 h-5" />
            <span>Learn More</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center space-x-8 text-primary-100"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Free to join</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>24/7 support</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Secure payments</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
