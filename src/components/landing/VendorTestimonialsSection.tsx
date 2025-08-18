'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const TestimonialCard = ({ 
  name, 
  role, 
  location, 
  content, 
  rating, 
  image, 
  delay = 0 
}: { 
  name: string, 
  role: string, 
  location: string, 
  content: string, 
  rating: number, 
  image: string, 
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
        <div className="flex items-center space-x-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-6 italic">
          "{content}"
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-gray-600 text-sm">{role} • {location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function VendorTestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Wedding Photographer',
      location: 'Mumbai',
      content: 'Evea has transformed my business. I\'ve increased my bookings by 300% and my revenue has doubled in just 6 months.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Event Decorator',
      location: 'Delhi',
      content: 'The quality of customers on Evea is exceptional. They appreciate good work and are willing to pay for premium services.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Sneha Patel',
      role: 'Catering Services',
      location: 'Pune',
      content: 'With Evea\'s tools and customer base, I\'ve been able to scale my catering business beyond my expectations.',
      rating: 5,
      image: '/api/placeholder/60/60'
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
            Success <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from vendors who have transformed their businesses with Evea.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              location={testimonial.location}
              content={testimonial.content}
              rating={testimonial.rating}
              image={testimonial.image}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
