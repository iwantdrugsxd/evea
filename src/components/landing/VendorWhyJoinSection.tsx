'use client'

import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Users, 
  Shield, 
  Zap
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const BenefitCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  delay = 0 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  color: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group"
  >
    <Card className="h-full bg-white border-gray-100 hover:border-primary-200 hover:shadow-elegant-hover transition-all duration-300 hover:-translate-y-2">
      <CardContent className="p-8">
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)

export default function VendorWhyJoinSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Higher Earnings',
      description: 'Increase your revenue by up to 40% with our premium customer base and smart pricing tools.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Quality Customers',
      description: 'Connect with verified customers who value quality services and are willing to pay premium rates.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Get guaranteed payments with our escrow system. No more chasing clients for payments.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Zap,
      title: 'Smart Tools',
      description: 'Use our AI-powered tools for inventory management, pricing optimization, and customer insights.',
      color: 'from-amber-500 to-orange-600'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Evea?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join India's fastest-growing event platform and unlock unprecedented business growth opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              color={benefit.color}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
