'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  LayoutDashboard, 
  Wallet, 
  ShieldCheck 
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const benefits = [
  {
    icon: Users,
    title: 'Reach More Clients',
    description: 'Get discovered by thousands of planners for weddings, parties, corporates, and more.'
  },
  {
    icon: LayoutDashboard,
    title: 'Easy Management',
    description: 'Handle orders, showcase your portfolio, and respond to inquiries all in one place.'
  },
  {
    icon: Wallet,
    title: 'Transparent Earnings',
    description: 'Pay just 5% commission—one of the lowest in the industry.'
  },
  {
    icon: ShieldCheck,
    title: 'Verified Platform',
    description: 'We work with quality vendors and verified customers, so your services always stand out.'
  }
]

export default function WhyJoinSection() {
  return (
    <section className="section-padding bg-gradient-red">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Why Join Evea?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join India's leading event marketplace and take your business to the next level
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
                <Card className="card-elegant h-full">
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
