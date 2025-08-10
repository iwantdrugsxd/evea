'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import VendorHeroSection from '@/components/vendor/HeroSection'
import WhyJoinSection from '@/components/vendor/WhyJoinSection'
import HowItWorksSection from '@/components/vendor/HowItWorksSection'
import BenefitsSection from '@/components/vendor/BenefitsSection'
import TestimonialsSection from '@/components/vendor/TestimonialsSection'
import CTASection from '@/components/vendor/CTASection'

export default function VendorLandingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden"
    >
      {/* Professional Red Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-100 rounded-full opacity-20 animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-red-200 rounded-full opacity-30 animate-float"></div>
      </div>
      
      <Header />
      
      <main className="relative z-10 pt-20 lg:pt-24">
        <VendorHeroSection />
        <WhyJoinSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </motion.div>
  )
}