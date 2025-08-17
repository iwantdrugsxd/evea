'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  Lock, 
  Mail,
  Smartphone,
  Globe,
  Palette,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  CreditCard,
  Trash2,
  Download,
  Upload
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function CustomerSettingsPage() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('notifications')
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    priceAlerts: true,
    
    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    
    // Security
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    
    // Preferences
    theme: 'light',
    language: 'en',
    currency: 'INR',
    timezone: 'Asia/Kolkata'
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const tabs = [
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'preferences', name: 'Preferences', icon: Settings }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account preferences and security</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-elegant p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-elegant p-6"
            >
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      
                      <div className="space-y-3 ml-8">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settings.orderUpdates}
                            onChange={(e) => handleSettingChange('orderUpdates', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Order updates and tracking</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settings.priceAlerts}
                            onChange={(e) => handleSettingChange('priceAlerts', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Price alerts and deals</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settings.marketingEmails}
                            onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Marketing emails</span>
                        </label>
                      </div>
                    </div>

                    {/* SMS Notifications */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">Push Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications in your browser</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.pushNotifications}
                            onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium text-gray-900 mb-4">Profile Visibility</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value="public"
                            checked={settings.profileVisibility === 'public'}
                            onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Public - Anyone can see my profile</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value="private"
                            checked={settings.profileVisibility === 'private'}
                            onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Private - Only I can see my profile</span>
                        </label>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settings.showEmail}
                            onChange={(e) => handleSettingChange('showEmail', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Show email address to vendors</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settings.showPhone}
                            onChange={(e) => handleSettingChange('showPhone', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Show phone number to vendors</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settings.allowMessages}
                            onChange={(e) => handleSettingChange('allowMessages', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Allow vendors to message me</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Lock className="h-4 w-4 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Two-Factor Authentication */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.twoFactorAuth}
                            onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Login Alerts */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Login Alerts</h3>
                          <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.loginAlerts}
                            onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Session Timeout */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Session Timeout</h3>
                      <select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never (not recommended)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium text-gray-900 mb-4">Theme</h3>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleSettingChange('theme', 'light')}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                            settings.theme === 'light'
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Sun className="h-4 w-4" />
                          <span>Light</span>
                        </button>
                        <button
                          onClick={() => handleSettingChange('theme', 'dark')}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                            settings.theme === 'dark'
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Moon className="h-4 w-4" />
                          <span>Dark</span>
                        </button>
                      </div>
                    </div>

                    {/* Language */}
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium text-gray-900 mb-4">Language</h3>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="gu">Gujarati</option>
                        <option value="mr">Marathi</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="font-medium text-gray-900 mb-4">Currency</h3>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Timezone</h3>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange('timezone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="Asia/Kolkata">India (IST)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="Europe/London">London (GMT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
