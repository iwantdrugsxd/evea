'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Mail, 
  Clock,
  Users,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function VendorRegistrationCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="mb-6">
                <CheckCircle className="h-20 w-20 text-green-600 mx-auto" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                Registration Complete!
              </h1>
              <p className="text-gray-600">
                Thank you for registering with Evea. Your application is now under review.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-center">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Review Process</h3>
                        <p className="text-gray-600 text-sm">
                          Our admin team will review your application and documents within 2-3 business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Mail className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Notification</h3>
                        <p className="text-gray-600 text-sm">
                          You'll receive an email notification once your application is approved or if we need additional information.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Start Receiving Bookings</h3>
                        <p className="text-gray-600 text-sm">
                          Once approved, you can start receiving booking requests from customers and manage your business through the vendor dashboard.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Keep your login credentials safe</li>
                      <li>• Check your email regularly for updates</li>
                      <li>• Ensure all documents are valid and up-to-date</li>
                      <li>• Contact support if you have any questions</li>
                    </ul>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Link href="/vendor/login" className="block">
                      <Button variant="primary" size="lg" className="w-full">
                        Go to Vendor Login
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    
                    <Link href="/vendor/login" className="block">
                      <Button variant="ghost" size="lg" className="w-full">
                        Go to Vendor Login
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
