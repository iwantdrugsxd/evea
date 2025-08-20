'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FloatingNavbar from '@/components/layout/FloatingNavbar';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Star,
  Search
} from 'lucide-react';

interface EventFormData {
  eventType: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  budget: number;
  location: string;
  description: string;
  services: string[];
}

const eventTypes = [
  { id: 'wedding', name: 'Wedding', icon: '💒', color: 'from-pink-500 to-rose-500' },
  { id: 'birthday', name: 'Birthday Party', icon: '🎂', color: 'from-blue-500 to-indigo-500' },
  { id: 'corporate', name: 'Corporate Event', icon: '🏢', color: 'from-gray-500 to-slate-500' },
  { id: 'conference', name: 'Conference', icon: '🎤', color: 'from-purple-500 to-violet-500' },
  { id: 'party', name: 'Party', icon: '🎉', color: 'from-yellow-500 to-orange-500' },
  { id: 'anniversary', name: 'Anniversary', icon: '💝', color: 'from-red-500 to-pink-500' },
  { id: 'graduation', name: 'Graduation', icon: '🎓', color: 'from-green-500 to-emerald-500' },
  { id: 'baby-shower', name: 'Baby Shower', icon: '👶', color: 'from-indigo-500 to-purple-500' }
];

const serviceCategories = [
  { id: 'photography', name: 'Photography & Video', icon: '📸' },
  { id: 'catering', name: 'Catering & Food', icon: '🍽️' },
  { id: 'decoration', name: 'Decoration & Styling', icon: '🎨' },
  { id: 'music', name: 'Music & Entertainment', icon: '🎵' },
  { id: 'venue', name: 'Venue & Location', icon: '🏛️' },
  { id: 'transportation', name: 'Transportation', icon: '🚗' },
  { id: 'beauty', name: 'Beauty & Makeup', icon: '💄' },
  { id: 'planning', name: 'Event Planning', icon: '📋' }
];

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>({
    eventType: '',
    eventName: '',
    eventDate: '',
    eventTime: '',
    guestCount: 50,
    budget: 50000,
    location: '',
    description: '',
    services: []
  });

  const totalSteps = 4;

  const updateFormData = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically submit the form data
    console.log('Event form data:', formData);
    // Redirect to marketplace with filters applied
    const servicesParam = formData.services.join(',');
    window.location.href = `/marketplace?eventType=${formData.eventType}&services=${servicesParam}&budget=${formData.budget}`;
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            index + 1 < currentStep
              ? 'bg-green-500 text-white'
              : index + 1 === currentStep
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {index + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-16 h-1 mx-2 ${
              index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What type of event are you planning?</h2>
        <p className="text-gray-600">Select the type of event to help us find the perfect vendors for you</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {eventTypes.map((eventType) => (
          <motion.div
            key={eventType.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              formData.eventType === eventType.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => updateFormData('eventType', eventType.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{eventType.icon}</div>
              <h3 className="font-semibold text-gray-900">{eventType.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Details</h2>
        <p className="text-gray-600">Tell us more about your event</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
          <input
            type="text"
            value={formData.eventName}
            onChange={(e) => updateFormData('eventName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) => updateFormData('eventDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Time</label>
          <input
            type="time"
            value={formData.eventTime}
            onChange={(e) => updateFormData('eventTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
          <input
            type="number"
            value={formData.guestCount}
            onChange={(e) => updateFormData('guestCount', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => updateFormData('budget', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1000"
            step="1000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your event vision and requirements..."
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What services do you need?</h2>
        <p className="text-gray-600">Select the services you'd like to include in your event</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {serviceCategories.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              formData.services.includes(service.id)
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Review Your Event</h2>
        <p className="text-gray-600">Please review your event details before we find vendors for you</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{formData.eventName || 'Not specified'}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{formData.location || 'Not specified'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  {formData.eventDate} {formData.eventTime ? `at ${formData.eventTime}` : ''}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{formData.guestCount} guests</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">₹{formData.budget.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Services</h3>
            <div className="space-y-2">
              {formData.services.length > 0 ? (
                formData.services.map((serviceId) => {
                  const service = serviceCategories.find(s => s.id === serviceId);
                  return (
                    <div key={serviceId} className="flex items-center">
                      <span className="text-2xl mr-3">{service?.icon}</span>
                      <span className="text-gray-600">{service?.name}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No services selected</p>
              )}
            </div>
          </div>
        </div>

        {formData.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Description</h3>
            <p className="text-gray-600">{formData.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Event</h1>
          <p className="text-xl text-gray-600">Let's plan the perfect event together</p>
        </div>

        {renderStepIndicator()}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderCurrentStep()}

          <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Find Vendors
                <Search className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
