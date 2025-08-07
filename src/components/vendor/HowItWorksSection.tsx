'use client'

import { motion } from 'framer-motion'
import { 
  UserPlus, 
  MessageSquare, 
  CreditCard, 
  TrendingUp 
} from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Vendor Profile',
    description: 'Register and list your services, packages, and images.'
  },
  {
    icon: MessageSquare,
    title: 'Get Quality Leads',
    description: 'Receive direct inquiries from interested clients in your area and event category.'
  },
  {
    icon: CreditCard,
    title: 'Secure Bookings & Payments',
    description: 'Confirm bookings, chat securely, and get paid fast—online and hassle-free.'
  },
  {
    icon: TrendingUp,
    title: 'Grow with Evea',
    description: 'Access analytics, client reviews, and upgrade to premium features for more visibility.'
  }
]

export default function HowItWorksSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get started in minutes and start growing your business with Evea
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 w-full h-0.5 bg-gradient-to-r from-primary-100 to-primary-200" />
                )}
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-red rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Icon className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
