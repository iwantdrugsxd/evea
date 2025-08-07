'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Calendar,
  Users,
  Shield
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { contactInfo } from '@/data/content'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Show success message
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our event specialists',
      contact: contactInfo.phone,
      action: 'Call Now',
      href: `tel:${contactInfo.phone}`,
      available: '24/7 Available'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us your questions and requirements',
      contact: contactInfo.email,
      action: 'Send Email',
      href: `mailto:${contactInfo.email}`,
      available: 'Response within 2 hours'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant answers to your questions',
      contact: 'Chat Support',
      action: 'Start Chat',
      href: '#',
      available: 'Mon-Sat: 9 AM - 8 PM'
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      description: 'Book a consultation with our experts',
      contact: 'Free Consultation',
      action: 'Book Now',
      href: '/schedule',
      available: 'Available slots daily'
    }
  ]

  const whyChooseUs = [
    { icon: Shield, text: 'Verified vendor network' },
    { icon: Clock, text: 'Quick response time' },
    { icon: Users, text: 'Expert consultation' },
    { icon: CheckCircle, text: 'Satisfaction guaranteed' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding-sm bg-gradient-to-br from-primary-50 to-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-heading mb-6">
                Get in Touch
                <span className="block text-gradient">We're Here to Help</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Have questions about planning your event? Need a custom quote? 
                Our expert team is ready to assist you every step of the way.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center p-6 hover-lift h-full border-2 hover:border-primary-200">
                    <CardContent className="p-0 space-y-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto">
                        <method.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 font-heading mb-2">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {method.description}
                        </p>
                        <div className="text-primary-600 font-semibold mb-1">
                          {method.contact}
                        </div>
                        <div className="text-xs text-gray-500 mb-4">
                          {method.available}
                        </div>
                      </div>
                      
                      <Link href={method.href}>
                        <Button variant="outline" size="sm" className="w-full">
                          {method.action}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-heading">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within 2 hours.
                    </p>
                  </CardHeader>

                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(value) => handleInputChange('name', value)}
                          required
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(value) => handleInputChange('email', value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Phone Number"
                          type="tel"
                          placeholder="+91 9999-XXX-XXX"
                          value={formData.phone}
                          onChange={(value) => handleInputChange('phone', value)}
                          required
                        />
                        <div className="form-group">
                          <label className="form-label">Event Type</label>
                          <select
                            value={formData.eventType}
                            onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                            className="input-base"
                            required
                          >
                            <option value="">Select event type</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">Event Date</label>
                          <input
                            type="date"
                            className="input-base"
                            value={formData.eventDate}
                            onChange={(e) => handleInputChange('eventDate', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Budget Range</label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                            className="input-base"
                          >
                            <option value="">Select budget</option>
                            <option value="under-25k">Under ₹25,000</option>
                            <option value="25k-50k">₹25,000 - ₹50,000</option>
                            <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                            <option value="100k-250k">₹1,00,000 - ₹2,50,000</option>
                            <option value="250k+">Above ₹2,50,000</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea
                          placeholder="Tell us about your event requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={6}
                          className="input-base resize-none"
                          required
                        />
                      </div>

                      <Button 
                        variant="primary" 
                        size="lg" 
                        loading={isSubmitting}
                        className="w-full group"
                        type="submit"
                      >
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Why Choose Us */}
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-heading">
                      Why Choose Evea?
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0 space-y-4">
                    {whyChooseUs.map((item, index) => (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4 text-primary-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{item.text}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-heading flex items-center space-x-2">
                      <Clock className="h-6 w-6 text-primary-600" />
                      <span>Office Hours</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Monday - Friday</span>
                        <span className="text-gray-900 font-semibold">9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Saturday</span>
                        <span className="text-gray-900 font-semibold">10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Sunday</span>
                        <span className="text-gray-900 font-semibold">Emergency Only</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 font-medium">Currently Available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="p-8 bg-primary-50 border-primary-200">
                  <CardContent className="p-0 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 font-heading">
                      Need Urgent Help?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      For event emergencies or last-minute requirements
                    </p>
                    <Button variant="primary" size="lg" className="w-full">
                      <Phone className="h-5 w-5 mr-2" />
                      Emergency Hotline
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}