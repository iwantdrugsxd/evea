'use client'

import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Megaphone, 
  Smartphone, 
  GraduationCap 
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const benefits = [
  {
    icon: DollarSign,
    title: 'No Upfront Fees',
    description: 'Zero joining cost—pay only when you earn.'
  },
  {
    icon: Megaphone,
    title: 'Marketing & Support',
    description: 'Get featured in Evea promotions, and enjoy dedicated support.'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Access',
    description: 'Manage your business on the go.'
  },
  {
    icon: GraduationCap,
    title: 'Training & Insights',
    description: 'Free resources to help you serve clients better and grow faster.'
  }
]

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Benefits for Vendors
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed on our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-elegant h-full hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
