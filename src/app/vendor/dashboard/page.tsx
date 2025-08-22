'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar, 
  Star,
  Settings,
  LogOut,
  Eye,
  ShoppingCart,
  MessageCircle,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Zap,
  Clock,
  MapPin,
  Phone,
  Mail,
  BarChart3,
  CreditCard,
  Package,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock3,
  Target,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react'
import Button from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface VendorData {
  id: string
  businessName: string
  email: string
  phone: string
  location: string
  totalRevenue: number
  totalOrders: number
  averageRating: number
  totalReviews: number
  activeServices: number
  pendingOrders: number
  completedOrders: number
}

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
  }, []);

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
    <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default function VendorDashboardPage() {
  const [vendorData, setVendorData] = useState<VendorData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVendorData({
        id: '1',
        businessName: 'Perfect Events',
        email: 'contact@perfectevents.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, Maharashtra',
        totalRevenue: 1250000,
        totalOrders: 156,
        averageRating: 4.8,
        totalReviews: 89,
        activeServices: 12,
        pendingOrders: 8,
        completedOrders: 148
      })
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color,
    subtitle,
    delay = 0,
    trend = 'up'
  }: { 
    title: string
    value: string
    change: number
    icon: React.ComponentType<any>
    color: string
    subtitle?: string
    delay?: number
    trend?: 'up' | 'down'
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center space-x-1">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {change}%
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          <p className="text-sm text-white/60 mb-2">{title}</p>
          {subtitle && (
            <p className="text-xs text-white/50">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  )

  const RecentActivityCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <Button variant="outline" size="sm" className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10">
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {[
          { type: 'order', message: 'New order received for Wedding Photography', time: '2 hours ago', status: 'pending' },
          { type: 'review', message: '5-star review from Priya Sharma', time: '4 hours ago', status: 'completed' },
          { type: 'message', message: 'New message from customer inquiry', time: '6 hours ago', status: 'pending' },
          { type: 'payment', message: 'Payment received for Event Decoration', time: '1 day ago', status: 'completed' },
        ].map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div className={`p-2 rounded-lg ${
              activity.status === 'completed' ? 'bg-green-500/20' : 'bg-blue-500/20'
            }`}>
              {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-blue-400" />}
              {activity.type === 'review' && <Star className="h-4 w-4 text-yellow-400" />}
              {activity.type === 'message' && <MessageCircle className="h-4 w-4 text-blue-400" />}
              {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-green-400" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{activity.message}</p>
              <p className="text-xs text-white/50">{activity.time}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              activity.status === 'completed' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )

  const QuickActionsCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: CreditCard, label: 'Add Service', color: 'bg-blue-500 hover:bg-blue-600' },
          { icon: ShoppingCart, label: 'View Orders', color: 'bg-green-500 hover:bg-green-600' },
          { icon: MessageCircle, label: 'Messages', color: 'bg-purple-500 hover:bg-purple-600' },
          { icon: BarChart3, label: 'Analytics', color: 'bg-orange-500 hover:bg-orange-600' },
        ].map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 flex flex-col items-center space-y-2`}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )

  const PerformanceChart = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Performance Overview</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-white/60">Revenue</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-white/60">Orders</span>
          </div>
        </div>
      </div>
      
      <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <LineChart className="h-12 w-12 text-white/40 mx-auto mb-2" />
          <p className="text-white/50">Performance chart will be displayed here</p>
        </div>
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded-2xl w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-white/10 rounded-3xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <motion.h1 
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.8)",
                      "0 0 40px rgba(59, 130, 246, 1)",
                      "0 0 60px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.8)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                >
                  Welcome back, {vendorData?.businessName}
                </motion.h1>
                <p className="text-white/60 mt-1">Here's what's happening with your business today</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" className="text-red-400 border-red-500/20 hover:bg-red-500/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
            
            {/* Business Info */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{vendorData?.businessName}</h2>
                    <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{vendorData?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{vendorData?.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{vendorData?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-green-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{vendorData?.averageRating}</span>
                    <span className="text-white/50">({vendorData?.totalReviews} reviews)</span>
                  </div>
                  <p className="text-sm text-white/60 mt-1">Active since 2023</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value={formatCurrency(vendorData?.totalRevenue || 0)}
              change={12.5}
              icon={DollarSign}
              color="bg-green-500"
              subtitle="This month"
              delay={0.1}
            />
            <StatCard
              title="Total Orders"
              value={vendorData?.totalOrders.toString() || '0'}
              change={8.2}
              icon={ShoppingCart}
              color="bg-blue-500"
              subtitle="Lifetime orders"
              delay={0.2}
            />
            <StatCard
              title="Active Services"
              value={vendorData?.activeServices.toString() || '0'}
              change={-2.1}
              icon={Package}
              color="bg-purple-500"
              subtitle="Currently listed"
              delay={0.3}
              trend="down"
            />
            <StatCard
              title="Pending Orders"
              value={vendorData?.pendingOrders.toString() || '0'}
              change={15.3}
              icon={Clock}
              color="bg-orange-500"
              subtitle="Require attention"
              delay={0.4}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PerformanceChart />
              <RecentActivityCard />
            </div>
            <div className="space-y-6">
              <QuickActionsCard />
              
              {/* Order Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-6">Order Status</h3>
                <div className="space-y-4">
                  {[
                    { status: 'Pending', count: vendorData?.pendingOrders || 0, color: 'bg-yellow-500', icon: Clock3 },
                    { status: 'Completed', count: vendorData?.completedOrders || 0, color: 'bg-green-500', icon: CheckCircle2 },
                    { status: 'Cancelled', count: 2, color: 'bg-red-500', icon: XCircle },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${item.color}`}>
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-white">{item.status}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{item.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}