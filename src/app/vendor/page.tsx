'use client'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import VendorHeroSection from '@/components/vendor/HeroSection'
import WhyJoinSection from '@/components/vendor/WhyJoinSection'
import HowItWorksSection from '@/components/vendor/HowItWorksSection'
import BenefitsSection from '@/components/vendor/BenefitsSection'
import TestimonialsSection from '@/components/vendor/TestimonialsSection'
import CTASection from '@/components/vendor/CTASection'

export default function VendorLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main>
        <VendorHeroSection />

        <WhyJoinSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
