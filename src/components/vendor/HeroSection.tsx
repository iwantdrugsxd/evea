'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/button'

export default function VendorHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-white" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6 border border-primary-200">
              <ShoppingBag className="h-4 w-4 text-primary-600" />
              <span className="text-primary-700 font-medium text-sm">India's Leading Event Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-heading">
              Become an Evea Vendor
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Join India's Event Marketplace and Grow Your Business!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/vendor/register">
                <Button variant="primary" size="lg" className="text-lg px-8 shadow-red-medium group">
                  Start Selling Today
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2 font-heading">500+</div>
                <div className="text-sm text-gray-600">Trusted Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2 font-heading">10,000+</div>
                <div className="text-sm text-gray-600">Events Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2 font-heading">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
