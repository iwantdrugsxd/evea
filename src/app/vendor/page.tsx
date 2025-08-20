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

// Vendor stats component
const VendorStats = ({ icon: Icon, value, label, delay = 0 }: {
  icon: any;
  value: string;
  label: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <p className="text-white/70">{label}</p>
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
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <div className="text-2xl font-bold text-white">₹{price}</div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-white/70 mb-6 leading-relaxed">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
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
    name: "Elegant Events by Priya",
    tagline: "Creating Unforgettable Moments Since 2015",
    description: "We specialize in crafting extraordinary events that leave lasting impressions. From intimate gatherings to grand celebrations, our attention to detail and creative vision ensure every event is truly special.",
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
        title: "Wedding Planning",
        description: "Complete wedding planning and coordination services",
        price: "75,000",
        features: ["Venue Selection", "Vendor Coordination", "Timeline Management", "Day-of Coordination"],
        image: "/images/hero/theme.jpeg"
      },
      {
        title: "Corporate Events",
        description: "Professional corporate event management",
        price: "50,000",
        features: ["Event Strategy", "Logistics Management", "AV Setup", "Post-Event Reports"],
        image: "/images/hero/Fotos Plateia _ Freepik.jpeg"
      },
      {
        title: "Birthday Celebrations",
        description: "Personalized birthday party planning",
        price: "25,000",
        features: ["Theme Design", "Decoration", "Catering", "Entertainment"],
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
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-purple-900/60 z-10"></div>
          <Image
            src="/images/hero/Indian Wedding Decor.jpeg"
            alt="Elegant Events"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full mb-6">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white/90">{vendorData.rating} ({vendorData.totalReviews} reviews)</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {vendorData.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              {vendorData.tagline}
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {vendorData.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/vendor/contact"
              className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
            >
              Get Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20">
              <Phone className="mr-2 w-5 h-5" />
              Call Now
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <VendorStats icon={Calendar} value={vendorData.experience} label="Experience" delay={0.1} />
            <VendorStats icon={Users} value={vendorData.eventsCompleted} label="Events Completed" delay={0.2} />
            <VendorStats icon={Clock} value={vendorData.responseTime} label="Response Time" delay={0.3} />
            <VendorStats icon={MapPin} value={vendorData.location} label="Location" delay={0.4} />
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
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive event planning services tailored to your unique vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the difference that comes with years of expertise and dedication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Award Winning</h3>
              <p className="text-white/70">Recognized for excellence in event planning and execution</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fully Insured</h3>
              <p className="text-white/70">Complete coverage for your peace of mind</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Quick Response</h3>
              <p className="text-white/70">We respond to all inquiries within 2 hours</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Personal Touch</h3>
              <p className="text-white/70">Every event is unique and receives our personal attention</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Client Reviews
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See what our clients have to say about their experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ready to start planning your perfect event? Get in touch with us today.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Phone className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                <p className="text-white/90">{vendorData.phone}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Mail className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-white/90">{vendorData.email}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vendor/contact"
                className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/30"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/vendor/portfolio"
                className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}