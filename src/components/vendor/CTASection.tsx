'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Ready to Expand Your Business?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            One-click registration. Quick onboarding. Exclusive early vendor benefits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <Link href="/vendor/register">
            <Button variant="primary" size="lg" className="text-lg px-8 py-6 shadow-red-strong">
              Start Selling Today
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-gray-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold mb-6">Questions?</h3>
              <p className="text-gray-300 mb-8">
                Reach our Vendor Success team:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href="mailto:vendors@evea.com"
                  className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  vendors@evea.com
                </a>
                <a 
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +91-XXXXX-XXXXX
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
