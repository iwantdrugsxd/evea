'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Shield,
  CreditCard,
  Key,
  Globe,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  Save
} from 'lucide-react'
import { toast } from 'sonner'
import Button from '@/components/ui/button'

interface NotificationSettings {
  orderNotifications: boolean
  paymentNotifications: boolean
  messageNotifications: boolean
  reviewNotifications: boolean
  marketingEmails: boolean
  weeklyReports: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  loginAlerts: boolean
  sessionTimeout: number
  allowedDevices: string[]
}

interface BankingInfo {
  accountNumber: string
  routingNumber: string
  accountHolderName: string
  bankName: string
  branch: string
}

export default function VendorSettingsPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'security' | 'banking' | 'privacy'>('notifications')
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    orderNotifications: true,
    paymentNotifications: true,
    messageNotifications: true,
    reviewNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: 60,
    allowedDevices: ['Chrome on Windows', 'Safari on iPhone']
  })

  const [banking, setBanking] = useState<BankingInfo>({
    accountNumber: '****1234',
    routingNumber: '****5678',
    accountHolderName: 'John Doe',
    bankName: 'State Bank of India',
    branch: 'Mumbai Main Branch'
  })

  const updateNotification = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
    toast.success('Notification settings updated')
  }

  const updateSecurity = (key: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({ ...prev, [key]: value }))
    toast.success('Security settings updated')
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    toast.success('Password updated successfully')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Order Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">New order notifications</h4>
              <p className="text-sm text-white/60">Get notified when you receive new orders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.orderNotifications}
                onChange={(e) => updateNotification('orderNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">Payment notifications</h4>
              <p className="text-sm text-white/60">Get notified when payments are received</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.paymentNotifications}
                onChange={(e) => updateNotification('paymentNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">Message notifications</h4>
              <p className="text-sm text-white/60">Get notified when customers send messages</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.messageNotifications}
                onChange={(e) => updateNotification('messageNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">Review notifications</h4>
              <p className="text-sm text-white/60">Get notified when customers leave reviews</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.reviewNotifications}
                onChange={(e) => updateNotification('reviewNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Communication Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">Email notifications</h4>
              <p className="text-sm text-white/60">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={(e) => updateNotification('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">SMS notifications</h4>
              <p className="text-sm text-white/60">Receive notifications via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.smsNotifications}
                onChange={(e) => updateNotification('smsNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">Push notifications</h4>
              <p className="text-sm text-white/60">Receive notifications in browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={(e) => updateNotification('pushNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const SecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  placeholder="Confirm new password"
                />
              </div>
              <Button onClick={handlePasswordChange} className="bg-blue-500 hover:bg-blue-600 text-white">
                <Key className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">Two-factor authentication</h4>
              <p className="text-sm text-white/60">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.twoFactorEnabled}
                onChange={(e) => updateSecurity('twoFactorEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Login Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/20 rounded-xl">
            <div>
              <h4 className="font-medium text-white">Login alerts</h4>
              <p className="text-sm text-white/60">Get notified of suspicious login attempts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.loginAlerts}
                onChange={(e) => updateSecurity('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-white">Session timeout</h4>
              <select
                value={security.sessionTimeout}
                onChange={(e) => updateSecurity('sessionTimeout', parseInt(e.target.value))}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={480}>8 hours</option>
                <option value={1440}>24 hours</option>
              </select>
            </div>
            <p className="text-sm text-white/60">Automatically log out after period of inactivity</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
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
              Settings
            </motion.h1>
            <p className="text-white/60 mt-1">Manage your account preferences and security</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-8"
      >
        <nav className="flex space-x-8">
          {[
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'banking', label: 'Banking', icon: CreditCard },
            { id: 'privacy', label: 'Privacy', icon: Eye }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-white/60 hover:text-white hover:border-white/40'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8"
      >
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'banking' && (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Banking Settings</h3>
            <p className="text-white/60">Manage your payout preferences and banking information</p>
          </div>
        )}
        {activeTab === 'privacy' && (
          <div className="text-center py-12">
            <Eye className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Privacy Settings</h3>
            <p className="text-white/60">Control your privacy and data sharing preferences</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}