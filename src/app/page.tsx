'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  Calendar, 
  Sparkles,
  CheckCircle,
  ChevronDown,
  Quote,
  Award,
  Zap,
  Shield,
  Heart
} from 'lucide-react';
import FloatingNavbar from '@/components/layout/FloatingNavbar';

// Hero background component with local images
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-purple-900/60 z-10"></div>
      <Image
        src="/images/hero/theme.jpeg"
        alt="Event Planning Hero"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-4xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Testimonial component
const Testimonial = ({ quote, author, role, company, avatar, rating = 5 }: {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
    >
      <div className="flex items-center mb-6">
        <div className="flex text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
      </div>
      <Quote className="w-8 h-8 text-blue-400 mb-4" />
      <p className="text-lg text-white/90 mb-6 leading-relaxed">{quote}</p>
      <div className="flex items-center">
        <Image
          src={avatar}
          alt={author}
          width={48}
          height={48}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-white/70 text-sm">{role} at {company}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Service package component
const ServicePackage = ({ title, price, features, popular = false, delay = 0 }: {
  title: string;
  price: number;
  features: string[];
  popular?: boolean;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-300 ${
        popular 
          ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <div className="text-4xl font-bold text-white mb-2">
          ₹{price.toLocaleString()}
        </div>
        <p className="text-white/70">per event</p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white/90">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link
        href="/plan-event"
        className={`block w-full text-center py-4 rounded-xl font-semibold transition-all duration-300 ${
          popular
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  );
};

export default function LandingPage() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Hero content with storytelling
  const heroContent = [
    {
      title: "Transform Your Events with AI-Powered Planning",
      subtitle: "From intimate gatherings to grand celebrations, our technology makes every event extraordinary",
      cta: "Start Planning",
      stats: { events: 5000, vendors: 2000, satisfaction: 98 }
    },
    {
      title: "Seamless Vendor Management & Coordination",
      subtitle: "Connect with the best vendors, manage timelines, and ensure perfect execution",
      cta: "Explore Vendors",
      stats: { events: 5000, vendors: 2000, satisfaction: 98 }
    },
    {
      title: "Real-Time Event Analytics & Insights",
      subtitle: "Track guest engagement, manage budgets, and optimize your event performance",
      cta: "View Dashboard",
      stats: { events: 5000, vendors: 2000, satisfaction: 98 }
    }
  ];

  // Auto-rotate hero content
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingNavbar />
      {/* Hero Section */}
              <section className="relative h-screen flex items-center justify-center">
          <HeroBackground />
        
        <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {heroContent[currentHeroIndex].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              {heroContent[currentHeroIndex].subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/plan-event"
              className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
            >
              {heroContent[currentHeroIndex].cta}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={5000} suffix="+" />
              </div>
              <p className="text-white/70">Events Planned</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={2000} suffix="+" />
              </div>
              <p className="text-white/70">Verified Vendors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <p className="text-white/70">Satisfaction Rate</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our AI-powered platform streamlines every aspect of event planning, from initial concept to flawless execution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Plan & Design</h3>
              <p className="text-white/70 leading-relaxed">
                Use our AI planner to create your perfect event. Get personalized recommendations for venues, vendors, and timelines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect & Coordinate</h3>
              <p className="text-white/70 leading-relaxed">
                Connect with verified vendors, manage communications, and coordinate all aspects through our integrated platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Execute & Celebrate</h3>
              <p className="text-white/70 leading-relaxed">
                Monitor everything in real-time, manage guest experiences, and ensure your event is executed flawlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Powered by Technology
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Cutting-edge features that make event planning effortless and extraordinary
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Sparkles}
              title="AI Event Planner"
              description="Our AI analyzes your requirements and creates personalized event plans with optimal vendor recommendations."
              delay={0.1}
            />
            <FeatureCard
              icon={Users}
              title="Vendor Marketplace"
              description="Access a curated network of verified vendors, from photographers to caterers, all in one place."
              delay={0.2}
            />
            <FeatureCard
              icon={Calendar}
              title="Smart Scheduling"
              description="Intelligent scheduling that optimizes timelines and ensures perfect coordination between all parties."
              delay={0.3}
            />
            <FeatureCard
              icon={Zap}
              title="Real-Time Analytics"
              description="Track guest engagement, manage budgets, and get insights to optimize your event performance."
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Secure Payments"
              description="End-to-end encrypted payment processing with escrow protection for your peace of mind."
              delay={0.5}
            />
            <FeatureCard
              icon={Heart}
              title="Guest Experience"
              description="Create memorable experiences with personalized guest management and interactive features."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Flexible packages designed to meet every event planning need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServicePackage
              title="Starter"
              price={15000}
              features={[
                "AI Event Planning",
                "Vendor Recommendations",
                "Basic Timeline Management",
                "Email Support",
                "Up to 50 Guests"
              ]}
              delay={0.1}
            />
            <ServicePackage
              title="Professional"
              price={35000}
              features={[
                "Everything in Starter",
                "Full Vendor Coordination",
                "Real-Time Analytics",
                "Priority Support",
                "Up to 200 Guests",
                "Custom Branding"
              ]}
              popular={true}
              delay={0.2}
            />
            <ServicePackage
              title="Enterprise"
              price={75000}
              features={[
                "Everything in Professional",
                "Dedicated Event Manager",
                "Advanced Analytics",
                "24/7 Support",
                "Unlimited Guests",
                "Custom Integrations"
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Plan Event Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/Diwali Decoration Ideas By Artbyte Studio.jpeg"
            alt="Event Planning Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Plan Your Perfect Event
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, our AI-powered platform helps you create unforgettable moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Planning</h3>
              <p className="text-white/70">
                AI-powered event planning that adapts to your preferences and budget
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Vendor Matching</h3>
              <p className="text-white/70">
                Connect with the best vendors in your area for every aspect of your event
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Seamless Execution</h3>
              <p className="text-white/70">
                Real-time coordination and management tools for flawless event execution
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Link
              href="/plan-event"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Start Planning Your Event
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join thousands of satisfied customers who've created unforgettable events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <Testimonial
               quote="Evea transformed our wedding planning experience. The AI recommendations were spot-on, and everything was executed flawlessly."
               author="Priya & Raj"
               role="Newlyweds"
               company="Personal"
               avatar="/images/hero/theme.jpeg"
               rating={5}
             />
             <Testimonial
               quote="As a corporate event planner, Evea has revolutionized how we manage large-scale events. The analytics and coordination tools are incredible."
               author="Sarah Johnson"
               role="Event Director"
               company="TechCorp"
               avatar="/images/hero/Fotos Plateia _ Freepik.jpeg"
               rating={5}
             />
             <Testimonial
               quote="The vendor marketplace is a game-changer. We found the perfect photographer and caterer within hours, and the quality was exceptional."
               author="Amit Patel"
               role="Business Owner"
               company="StartupXYZ"
               avatar="/images/hero/_ (3).jpeg"
               rating={5}
             />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Create Something Extraordinary?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of event planners who trust Evea to make their events unforgettable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plan-event"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                Start Planning Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/marketplace"
                className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Explore Vendors
              </Link>
              <Link
                href="/vendor/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center"
              >
                Start Selling
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}