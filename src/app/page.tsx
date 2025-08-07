'use client'

import { useIntersectionObserver } from '@/hooks/use-intersection'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection' 
import ServicesSection from '@/components/landing/ServicesSection'
import StatsSection from '@/components/landing/StatsSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import CTASection from '@/components/landing/CTASection'

export default function HomePage() {
  // Initialize scroll animations
  useIntersectionObserver()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="space-y-enterprise">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}