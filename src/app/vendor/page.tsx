'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingNavbar from '@/components/layout/FloatingNavbar';
import { 
  ArrowRight, 
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
  Heart,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

// Vendor stats component - matching landing page design exactly
const VendorStats = ({ icon: Icon, value, label, subtitle, delay = 0 }: {
  icon: any;
  value: string;
  label: string;
  subtitle: string;
  delay?: number;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center hover:border-white/40 transition-all duration-500">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-3">{value}</div>
        <p className="text-white/80 text-base font-medium">{label}</p>
        <p className="text-white/60 text-xs mt-2">{subtitle}</p>
      </div>
    </motion.div>
  );
};

// Service card component
const ServiceCard = ({ title, description, price, features, image, delay = 0 }: {
  title: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <div className="text-xl font-bold text-white">₹{price}</div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-white/70 mb-6 leading-relaxed text-sm">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-xs">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link
          href="/vendor/contact"
          className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

// Review component
const Review = ({ author, rating, comment, date, avatar }: {
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            src={avatar}
            alt={author}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-white">{author}</p>
            <p className="text-white/60 text-sm">{date}</p>
          </div>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-white/80 leading-relaxed">{comment}</p>
    </motion.div>
  );
};

export default function VendorPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Sample vendor data
  const vendorData = {
    name: "Turn Your Expertise Into Revenue",
    tagline: "Join India's newest event marketplace and connect with customers who value quality",
    description: "Transform your event business with direct access to verified customers, streamlined bookings, and transparent pricing. No more cold calls or inflated middleman fees.",
    rating: 4.9,
    totalReviews: 247,
    experience: "8+ Years",
    eventsCompleted: "500+",
    responseTime: "< 2 hours",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    email: "priya@elegantevents.com",
    website: "www.elegantevents.com",
    social: {
      instagram: "@elegantevents_priya",
      facebook: "ElegantEventsPriya",
      twitter: "@ElegantEvents_P"
    },
    services: [
      {
        title: "Direct Customer Access",
        description: "Connect directly with customers actively seeking your services. No competing with dozens of vendors or paying for leads that don't convert.",
        price: "95%",
        features: ["Verified Customers", "Direct Communication", "No Middleman", "Quality Leads"],
        image: "/images/hero/theme.jpeg"
      },
      {
        title: "Fair Pricing Model",
        description: "Keep more of what you earn with our transparent 5% platform fee. No hidden charges, no inflated markups, no surprise deductions.",
        price: "5%",
        features: ["Transparent Fees", "No Hidden Costs", "Direct Payments", "Full Control"],
        image: "/images/hero/Fotos Plateia _ Freepik.jpeg"
      },
      {
        title: "Quality First",
        description: "Build your reputation by showcasing your portfolio, collecting genuine reviews, and creating a brand that drives repeat business.",
        price: "100%",
        features: ["Portfolio Showcase", "Genuine Reviews", "Brand Building", "Repeat Business"],
        image: "/images/hero/_ (3).jpeg"
      }
    ],
    reviews: [
      {
        author: "Sarah & Raj",
        rating: 5,
        comment: "Priya made our wedding absolutely perfect! Her attention to detail and calm demeanor throughout the process was incredible.",
        date: "2 weeks ago",
        avatar: "/images/hero/theme.jpeg"
      },
      {
        author: "TechCorp India",
        rating: 5,
        comment: "Outstanding corporate event management. Everything was executed flawlessly and within budget.",
        date: "1 month ago",
        avatar: "/images/hero/Fotos Plateia _ Freepik.jpeg"
      },
      {
        author: "Amit Patel",
        rating: 5,
        comment: "The best event planner we've worked with. Professional, creative, and reliable.",
        date: "3 months ago",
        avatar: "/images/hero/_ (3).jpeg"
      }
    ]
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingNavbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-purple-900/60 z-10"></div>
          <Image
            src="/images/vendor.png"
            alt="Vendor Background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {vendorData.name}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              {vendorData.tagline}
            </p>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {vendorData.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/vendor/register"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
            >
              Start Selling
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/vendor/login"
              className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center"
            >
              Vendor Login
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center border border-white/20">
              <Sparkles className="mr-2 w-5 h-5" />
              See How It Works
            </button>
          </motion.div>

          {/* Enhanced Glass Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <VendorStats icon={TrendingUp} value="95%" label="Earnings" subtitle="You Keep" delay={0.1} />
              <VendorStats icon={Shield} value="5%" label="Platform Fee" subtitle="Transparent" delay={0.2} />
              <VendorStats icon={Star} value="4.9" label="Average Rating" subtitle="Quality" delay={0.3} />
              <VendorStats icon={Users} value="2000+" label="Active Vendors" subtitle="Network" delay={0.4} />
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

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Why Choose Evea
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Simple. Transparent. Profitable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {vendorData.services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                price={service.price}
                features={service.features}
                image={service.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Simple. Transparent. Profitable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Apply & Get Verified</h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">Submit your business details and portfolio. Our verification process ensures only quality vendors join the platform, maintaining high standards for everyone.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Create Your Showcase</h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">Build your vendor profile with your best work, pricing, and availability. Customers can see exactly what you offer and how much it costs.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Receive & Fulfill Orders</h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">Get notified of new bookings, communicate directly with customers, and deliver exceptional events that build your reputation.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Client Reviews
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              See what our clients have to say about their experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {vendorData.reviews.map((review, index) => (
              <Review
                key={index}
                author={review.author}
                rating={review.rating}
                comment={review.comment}
                date={review.date}
                avatar={review.avatar}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Be Among Our First Vendors
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join a platform built for vendors who refuse to compete on price alone. Start building a sustainable event business with customers who value quality and professionalism.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <Phone className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Call Us</h3>
                <p className="text-white/90">{vendorData.phone}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <Mail className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Email Us</h3>
                <p className="text-white/90">{vendorData.email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/vendor/register"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
              >
                Start Your Application
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/vendor/demo"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 border border-white/30"
              >
                Schedule a Demo Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}