'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Vendor Components
import VendorHeroSection from '@/components/landing/VendorHeroSection'
import VendorWhyJoinSection from '@/components/landing/VendorWhyJoinSection'
import VendorHowItWorksSection from '@/components/landing/VendorHowItWorksSection'
import VendorTestimonialsSection from '@/components/landing/VendorTestimonialsSection'
import VendorCTASection from '@/components/landing/VendorCTASection'

export default function VendorLandingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white relative overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.05),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.05),transparent_50%)]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-50 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary-50 rounded-full opacity-20"></div>
      </div>
      
      <Header />
      
      <main className="relative z-10">
        <VendorHeroSection />
        <VendorWhyJoinSection />
        <VendorHowItWorksSection />
        <VendorTestimonialsSection />
        <VendorCTASection />
      </main>

      <Footer />
    </motion.div>
  )
}