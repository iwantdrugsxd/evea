'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Monitor, 
  Smartphone, 
  Tablet,
  Code2,
  Eye,
  Settings,
  BarChart3,
  Users,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Download,
  Share2,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'
import Tilt from 'react-parallax-tilt'

const demoScenarios = [
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization with interactive charts and KPI tracking',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-600',
    preview: {
      title: 'Revenue Analytics',
      metrics: [
        { label: 'Total Revenue', value: '$2.4M', change: '+12.3%', positive: true },
        { label: 'Active Users', value: '45.2K', change: '+8.7%', positive: true },
        { label: 'Conversion Rate', value: '3.4%', change: '-2.1%', positive: false },
        { label: 'Avg. Order Value', value: '$127', change: '+5.2%', positive: true }
      ]
    }
  },
  {
    id: 'messaging',
    title: 'Communication Hub',
    description: 'Unified messaging system with real-time notifications and team collaboration',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-600',
    preview: {
      title: 'Team Chat',
      messages: [
        { user: 'Sarah Chen', message: 'The new feature is ready for testing!', time: '2m ago', avatar: '👩‍💼' },
        { user: 'Mike Johnson', message: 'Great work team! Deployment looks smooth.', time: '5m ago', avatar: '👨‍💻' },
        { user: 'Alex Rivera', message: 'Analytics show 15% improvement in performance', time: '8m ago', avatar: '👨‍📊' }
      ]
    }
  },
  {
    id: 'management',
    title: 'User Management',
    description: 'Advanced user administration with role-based access control and permissions',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    preview: {
      title: 'User Directory',
      users: [
        { name: 'Emma Wilson', role: 'Admin', status: 'Active', lastSeen: 'Online', avatar: '👩‍💼' },
        { name: 'David Park', role: 'Manager', status: 'Active', lastSeen: '5m ago', avatar: '👨‍💼' },
        { name: 'Lisa Zhang', role: 'User', status: 'Inactive', lastSeen: '2h ago', avatar: '👩‍💻' }
      ]
    }
  }
]

const DevicePreview = ({ device, isActive, onClick }: {
  device: { id: string, icon: React.ComponentType<any>, label: string },
  isActive: boolean,
  onClick: () => void
}) => {
  const Icon = device.icon
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-purple-500 text-white shadow-lg' 
          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{device.label}</span>
    </motion.button>
  )
}

const DashboardPreview = ({ scenario }: { scenario: typeof demoScenarios[0] }) => {
  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{scenario.preview.title}</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {scenario.preview.metrics?.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-4"
          >
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <span className={`text-sm font-medium ${
                metric.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Mock Chart */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 h-32 flex items-end justify-between">
        {[65, 45, 78, 52, 89, 67, 95, 43, 76, 88, 92, 71].map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-gradient-to-t from-blue-400 to-purple-500 rounded-t-sm w-4"
          />
        ))}
      </div>
    </div>
  )
}

const MessagingPreview = ({ scenario }: { scenario: typeof demoScenarios[1] }) => {
  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{scenario.preview.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span className="text-sm text-gray-500">3 online</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {scenario.preview.messages?.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-start space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
              {message.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 text-sm">{message.user}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-gray-700 text-sm bg-gray-50 rounded-lg px-3 py-2">
                {message.message}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg"
        >
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  )
}

const UserManagementPreview = ({ scenario }: { scenario: typeof demoScenarios[2] }) => {
  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{scenario.preview.title}</h3>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
            <Users className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {scenario.preview.users?.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white">
                {user.avatar}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.status}
              </span>
              <span className="text-sm text-gray-500">{user.lastSeen}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function InteractiveDemoSection() {
  const [activeDemo, setActiveDemo] = useState('dashboard')
  const [activeDevice, setActiveDevice] = useState('desktop')
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"])

  const devices = [
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
    { id: 'tablet', icon: Tablet, label: 'Tablet' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile' }
  ]

  const getDeviceClass = () => {
    switch (activeDevice) {
      case 'tablet':
        return 'max-w-2xl aspect-[4/3]'
      case 'mobile':
        return 'max-w-sm aspect-[9/16]'
      default:
        return 'max-w-6xl aspect-[16/10]'
    }
  }

  const renderPreview = (scenario: typeof demoScenarios[0]) => {
    switch (scenario.id) {
      case 'messaging':
        return <MessagingPreview scenario={scenario} />
      case 'management':
        return <UserManagementPreview scenario={scenario} />
      default:
        return <DashboardPreview scenario={scenario} />
    }
  }

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-slate-50 via-white to-purple-50/20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-40 right-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm px-8 py-4 rounded-full border border-purple-200 shadow-lg mb-8"
          >
            <Play className="h-6 w-6 text-purple-600" />
            <span className="text-purple-700 font-bold text-lg">Interactive Demo</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            See It{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience our platform firsthand with interactive demos showcasing real-world scenarios 
            and powerful capabilities across different use cases.
          </p>
        </motion.div>

        {/* Demo Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Tabs.Root value={activeDemo} onValueChange={setActiveDemo}>
            {/* Scenario Tabs */}
            <Tabs.List className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-white/50 shadow-xl">
                <div className="flex space-x-2">
                  {demoScenarios.map((scenario) => {
                    const Icon = scenario.icon
                    return (
                      <Tabs.Trigger
                        key={scenario.id}
                        value={scenario.id}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          activeDemo === scenario.id
                            ? `bg-gradient-to-r ${scenario.color} text-white shadow-lg`
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{scenario.title}</span>
                      </Tabs.Trigger>
                    )
                  })}
                </div>
              </div>
            </Tabs.List>

            {/* Device Selection & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">View on:</span>
                <div className="flex items-center space-x-2">
                  {devices.map((device) => (
                    <DevicePreview
                      key={device.id}
                      device={device}
                      isActive={activeDevice === device.id}
                      onClick={() => setActiveDevice(device.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'} Demo</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Maximize2 className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Demo Preview */}
            <div className="flex justify-center">
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                transitionSpeed={1000}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gradient-to-br from-gray-800 to-slate-900 rounded-3xl p-6 shadow-2xl ${getDeviceClass()} mx-auto`}
                >
                  {/* Device Frame */}
                  <div className="bg-black rounded-2xl p-2">
                    <div className="bg-white rounded-xl overflow-hidden h-full">
                      {/* Browser Chrome (for desktop) */}
                      {activeDevice === 'desktop' && (
                        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                          <div className="flex-1 bg-white rounded-md px-3 py-1 text-sm text-gray-500 ml-4">
                            evea.com/dashboard
                          </div>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="h-full">
                        <AnimatePresence mode="wait">
                          {demoScenarios.map((scenario) => (
                            scenario.id === activeDemo && (
                              <motion.div
                                key={scenario.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                              >
                                {renderPreview(scenario)}
                              </motion.div>
                            )
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            </div>

            {/* Scenario Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mt-12"
            >
              {demoScenarios.map((scenario) => (
                scenario.id === activeDemo && (
                  <div key={scenario.id} className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {scenario.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                )
              ))}
            </motion.div>
          </Tabs.Root>
        </motion.div>
      </div>
    </section>
  )
}
