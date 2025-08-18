'use client'

import { motion } from 'framer-motion'
import { 
  Target, 
  Shield, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react'
import Button from '@/components/ui/button'

const StepCard = ({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  index, 
  totalSteps 
}: { 
  step: string, 
  title: string, 
  description: string, 
  icon: any, 
  index: number, 
  totalSteps: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    className="relative"
  >
    {/* Connector Line */}
    {index < totalSteps - 1 && (
      <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent transform translate-x-8"></div>
    )}
    
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-elegant mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full opacity-10"></div>
        <Icon className="w-12 h-12 text-primary-600 relative z-10" />
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          {step}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{description}</p>
    </div>
  </motion.div>
)

export default function VendorHowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Sign up and create a comprehensive vendor profile with your services, portfolio, and pricing.',
      icon: Target
    },
    {
      step: '02',
      title: 'Get Verified',
      description: 'Our team verifies your credentials and approves your profile for the marketplace.',
      icon: Shield
    },
    {
      step: '03',
      title: 'Start Earning',
      description: 'Receive bookings from customers and grow your business with our powerful platform.',
      icon: TrendingUp
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just 3 simple steps and start growing your business today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step.step}
              title={step.title}
              description={step.description}
              icon={step.icon}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="primary" size="lg" className="group text-lg px-8 py-4">
            <span>Get Started Now</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
