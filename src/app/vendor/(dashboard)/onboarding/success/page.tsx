'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle, Clock, FileCheck, UserCheck, Zap, ArrowRight, Home } from 'lucide-react'

export default function VendorRegistrationSuccess() {
  const [currentStep, setCurrentStep] = useState(0)
  const [redirectCountdown, setRedirectCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setRedirectCountdown(prev => {
        if (prev <= 1) {
          window.location.href = '/vendor/login'
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < 3 ? prev + 1 : prev))
    }, 800)
    return () => clearInterval(stepTimer)
  }, [])

  const steps = [
    {
      icon: FileCheck,
      title: 'Document Verification',
      description: 'Our team will review your business documents and service information to ensure quality standards.',
      timeframe: '24-48 hours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: UserCheck,
      title: 'Profile Review & Approval',
      description: "We'll verify your services, pricing, and business credentials.",
      timeframe: '2-3 business days',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: Zap,
      title: 'Account Activation',
      description: "Once approved, you'll receive login credentials via email to access your vendor dashboard.",
      timeframe: 'Immediate',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: CheckCircle,
      title: 'Start Receiving Bookings!',
      description: 'Your profile will go live and customers can start booking your services.',
      timeframe: 'Same day',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="bg-green-100 text-green-800 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Registration Status: SUBMITTED FOR REVIEW
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Choosing Evea!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Your vendor registration has been successfully submitted.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Clock className="w-6 h-6 mr-3" />
              What happens next?
            </h2>
            <p className="text-blue-100">We've outlined the verification process below. Our team works quickly to get you up and running!</p>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep >= index
                const isCompleted = currentStep > index
                return (
                  <div key={index} className={`relative flex items-start space-x-4 p-6 rounded-xl border-2 transition-all duration-700 ${isActive ? `${step.bgColor} ${step.borderColor}` : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${isCompleted ? 'bg-green-500 text-white' : isActive ? `${step.color} bg-white border-2 ${step.borderColor.replace('border-', 'border-')}` : 'bg-gray-200 text-gray-500'}`}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold transition-colors duration-500 ${isActive ? step.color : 'text-gray-500'}`}>{step.title}</h3>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${isActive ? `${step.color} ${step.bgColor}` : 'text-gray-500 bg-gray-100'}`}>{step.timeframe}</span>
                      </div>
                      <p className={`${isActive ? 'text-gray-700' : 'text-gray-500'} transition-colors duration-500`}>{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`p-3 rounded-lg ${isActive ? step.bgColor : 'bg-gray-100'} transition-all duration-500`}>
                        <Icon className={`w-6 h-6 ${isActive ? step.color : 'text-gray-400'} transition-colors duration-500`} />
                      </div>
                    </div>
                    {index < steps.length - 1 && <div className="absolute left-9 top-16 w-0.5 h-6 bg-gray-200" />}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="bg-blue-50 border-t-2 border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Information:</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" /><span className="text-sm">You'll receive email updates at each stage of the verification process</span></li>
              <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" /><span className="text-sm">Our support team is available 24/7 if you have any questions</span></li>
              <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" /><span className="text-sm">Average approval time is 2-3 business days for complete applications</span></li>
              <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" /><span className="text-sm">Once approved, you can immediately start receiving bookings</span></li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Questions?</h4>
                <p className="text-sm text-gray-600 mb-2">Contact our support team</p>
                <a href="mailto:support@evea.com" className="text-blue-600 hover:text-blue-800 text-sm font-medium">support@evea.com</a>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                <p className="text-sm text-gray-600 mb-2">Speak with our team</p>
                <a href="tel:+1-555-0123" className="text-blue-600 hover:text-blue-800 text-sm font-medium">+1 (555) 012-3456</a>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Help Center</h4>
                <p className="text-sm text-gray-600 mb-2">Find answers to common questions</p>
                <a href="/help" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Visit Help Center</a>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Auto-redirect in:</span>
                <span className="ml-1 font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{redirectCountdown}s</span>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => (window.location.href = '/vendor/onboarding')} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">Back to Registration</button>
                <button onClick={() => (window.location.href = '/vendor/login')} className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm font-medium">
                  <Home className="w-4 h-4" />
                  <span>Go to Vendor Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">While You Wait</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Prepare high-quality photos of your work</li>
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Gather customer testimonials and reviews</li>
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Review our vendor best practices guide</li>
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Set up your business calendar and availability</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Create compelling service packages</li>
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Set competitive pricing strategies</li>
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Optimize your profile for search</li>
              <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Start building your customer base</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


