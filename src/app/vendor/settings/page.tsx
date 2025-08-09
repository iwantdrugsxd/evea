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
  Upload
} from 'lucide-react'
import { toast } from 'sonner'

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
      toast.error('Password must be at least 8 characters')
      return
    }
    toast.success('Password updated successfully')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const NotificationsTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'orderNotifications', label: 'New order received', description: 'Get notified when customers place new orders' },
            { key: 'paymentNotifications', label: 'Payment updates', description: 'Notifications about payment status changes' },
            { key: 'messageNotifications', label: 'New messages', description: 'When customers send you messages' },
            { key: 'reviewNotifications', label: 'New reviews', description: 'When customers leave reviews for your services' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof NotificationSettings] as boolean}
                  onChange={(e) => updateNotification(item.key as keyof NotificationSettings, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Channels</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email notifications', icon: Mail },
            { key: 'smsNotifications', label: 'SMS notifications', icon: Phone },
            { key: 'pushNotifications', label: 'Push notifications', icon: Bell }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof NotificationSettings] as boolean}
                  onChange={(e) => updateNotification(item.key as keyof NotificationSettings, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing & Reports</h3>
        <div className="space-y-4">
          {[
            { key: 'marketingEmails', label: 'Marketing emails', description: 'Receive updates about new features and promotions' },
            { key: 'weeklyReports', label: 'Weekly reports', description: 'Get weekly summaries of your business performance' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof NotificationSettings] as boolean}
                  onChange={(e) => updateNotification(item.key as keyof NotificationSettings, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const SecurityTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center"
          >
            <Lock className="h-4 w-4 mr-2" />
            Update Password
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Enable 2FA</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <div className="flex items-center space-x-3">
            {security.twoFactorEnabled && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.twoFactorEnabled}
                onChange={(e) => updateSecurity('twoFactorEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Login alerts</h4>
              <p className="text-sm text-gray-600">Get notified of suspicious login attempts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.loginAlerts}
                onChange={(e) => updateSecurity('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Session timeout</h4>
              <select
                value={security.sessionTimeout}
                onChange={(e) => updateSecurity('sessionTimeout', parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={480}>8 hours</option>
                <option value={1440}>24 hours</option>
              </select>
            </div>
            <p className="text-sm text-gray-600">Automatically log out after period of inactivity</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'banking', label: 'Banking', icon: CreditCard },
            { id: 'privacy', label: 'Privacy', icon: Eye }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'banking' && (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Banking Settings</h3>
            <p className="text-gray-600">Manage your payout preferences and banking information</p>
          </div>
        )}
        {activeTab === 'privacy' && (
          <div className="text-center py-12">
            <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy Settings</h3>
            <p className="text-gray-600">Control your privacy and data sharing preferences</p>
          </div>
        )}
      </div>
    </div>
  )
}