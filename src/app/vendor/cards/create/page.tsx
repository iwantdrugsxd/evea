'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FormData {
  title: string;
  description: string;
  category_id: string;
  subcategory_id: string;
  base_price: number;
  starting_price: number;
  price_type: 'fixed' | 'hourly' | 'daily' | 'per_person' | 'custom';
  service_area: string[];
  max_capacity: number;
  inclusions: string[];
  exclusions: string[];
  equipment_provided: string[];
  cancellation_policy: string;
  tags: string[];
  images: string[];
  videos: string[];
  portfolio_images: string[];
  discount_percentage?: number; // Optional since not in DB schema
  years_of_experience: number;
  insurance_coverage: string;
  certifications: string;
  emergency_contact: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Category[];
}

export default function CreateServiceCard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category_id: '',
    subcategory_id: '',
    base_price: 0,
    starting_price: 0,
    price_type: 'fixed',
    service_area: [],
    max_capacity: 0,
    inclusions: [''],
    exclusions: [''],
    equipment_provided: [''],
    cancellation_policy: '',
    tags: [],
    images: [],
    videos: [''],
    portfolio_images: [],
    years_of_experience: 0,
    insurance_coverage: '',
    certifications: '',
    emergency_contact: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: keyof FormData, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field] as string[])];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field: keyof FormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayField = (field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (files: FileList | null, type: 'images' | 'portfolio_images') => {
    if (!files) return;

    const uploadedUrls: string[] = [];
    setLoading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', type === 'images' ? 'service-images' : 'portfolio-images');

        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        } else {
          throw new Error('Upload failed');
        }
      }

      setFormData(prev => ({
        ...prev,
        [type]: [...(prev[type] as string[]), ...uploadedUrls]
      }));

      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (type: 'images' | 'portfolio_images', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/vendor-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Service card created successfully!');
        router.push(`/vendor/cards/${data.card.id}`);
      } else {
        const error = await response.json();
        console.error('API Error:', error);
        toast.error(error.message || error.error || 'Failed to create service card');
      }
    } catch (error) {
      toast.error('An error occurred while creating the service card');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutofill = () => {
    const sampleData: FormData = {
      title: 'Professional Wedding Photography & Videography',
      description: 'Capture your special day with our premium wedding photography and videography services. We specialize in creating timeless memories with a blend of traditional and contemporary styles. Our experienced team ensures every moment is beautifully documented with high-quality equipment and creative expertise.',
      category_id: categories.length > 0 ? categories[0].id : '',
      subcategory_id: '',
      base_price: 25000,
      starting_price: 20000,
      price_type: 'fixed',
      service_area: ['Mumbai', 'Pune', 'Nashik', 'Thane'],
      max_capacity: 500,
      inclusions: [
        'Professional photographer and videographer',
        '8 hours of coverage',
        'Edited photos (200+ images)',
        'Wedding video with highlights',
        'Online gallery access',
        'Print-ready high-resolution images',
        'Engagement shoot included',
        'Drone photography'
      ],
      exclusions: [
        'Travel costs beyond 50km',
        'Additional editing hours',
        'Print products',
        'Wedding album design',
        'Same-day edits'
      ],
      equipment_provided: [
        'Canon EOS R5 cameras',
        'Professional lighting setup',
        'Drone for aerial shots',
        'Backup equipment',
        'Multiple lenses'
      ],
      cancellation_policy: '50% refund if cancelled 30 days before the event. No refund for cancellations within 7 days of the event.',
      tags: ['wedding', 'photography', 'videography', 'professional', 'premium'],
      images: [],
      videos: ['https://youtube.com/watch?v=sample'],
      portfolio_images: [],
      years_of_experience: 8,
      insurance_coverage: 'Full professional liability insurance coverage included',
      certifications: 'Certified Professional Photographer (CPP), Member of Professional Photographers of America',
      emergency_contact: '+91-98765-43210'
    };

    setFormData(sampleData);
    toast.success('Form autofilled with sample data!');
  };

  const handleClearForm = () => {
    const emptyData: FormData = {
      title: '',
      description: '',
      category_id: '',
      subcategory_id: '',
      base_price: 0,
      starting_price: 0,
      price_type: 'fixed',
      service_area: [],
      max_capacity: 0,
      inclusions: [''],
      exclusions: [''],
      equipment_provided: [''],
      cancellation_policy: '',
      tags: [],
      images: [],
      videos: [''],
      portfolio_images: [],
      discount_percentage: 0,
      years_of_experience: 0,
      insurance_coverage: '',
      certifications: '',
      emergency_contact: ''
    };

    setFormData(emptyData);
    setCurrentStep(1);
    toast.success('Form cleared!');
  };

  const steps = [
    { title: 'Basic Information', description: 'Service details and category' },
    { title: 'Pricing & Packages', description: 'Set your pricing structure' },
    { title: 'Service Details', description: 'Coverage areas and policies' },
    { title: 'Media Upload', description: 'Images and portfolio' },
    { title: 'Review & Publish', description: 'Final review and publish' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Create Service Card</h1>
              <p className="text-white/60">Add a new service to your portfolio</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAutofill}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Autofill
              </button>
              <button
                onClick={handleClearForm}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index + 1 <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-white/20 text-white/40'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-4 ${
                    index + 1 < currentStep ? 'bg-blue-600' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">{steps[currentStep - 1].title}</h3>
            <p className="text-white/60">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your service title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your service in detail"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => handleInputChange('category_id', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Years of Experience</label>
                    <input
                      type="number"
                      value={formData.years_of_experience}
                      onChange={(e) => handleInputChange('years_of_experience', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.base_price}
                      onChange={(e) => handleInputChange('base_price', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Starting Price (₹)</label>
                    <input
                      type="number"
                      value={formData.starting_price}
                      onChange={(e) => handleInputChange('starting_price', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Type *</label>
                  <select
                    value={formData.price_type}
                    onChange={(e) => handleInputChange('price_type', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Per Hour</option>
                    <option value="daily">Per Day</option>
                    <option value="per_person">Per Person</option>
                    <option value="custom">Custom Quote</option>
                  </select>
                </div>

                {/* Discount field removed - not supported in current database schema */}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Areas *</label>
                  <div className="space-y-2">
                    {formData.service_area.map((area, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={area}
                          onChange={(e) => handleArrayFieldChange('service_area', index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter service area"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField('service_area', index)}
                          className="px-3 py-3 bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('service_area')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30"
                    >
                      <Plus className="w-4 h-4" />
                      Add Service Area
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Max Capacity</label>
                  <input
                    type="number"
                    value={formData.max_capacity}
                    onChange={(e) => handleInputChange('max_capacity', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Inclusions</label>
                  <div className="space-y-2">
                    {formData.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={inclusion}
                          onChange={(e) => handleArrayFieldChange('inclusions', index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="What's included in your service"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField('inclusions', index)}
                          className="px-3 py-3 bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('inclusions')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30"
                    >
                      <Plus className="w-4 h-4" />
                      Add Inclusion
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cancellation Policy</label>
                  <textarea
                    value={formData.cancellation_policy}
                    onChange={(e) => handleInputChange('cancellation_policy', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your cancellation policy"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Images *</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
                    <p className="text-white/60 mb-4">Upload images of your service</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files, 'images')}
                      className="hidden"
                      id="service-images"
                    />
                    <label
                      htmlFor="service-images"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                    >
                      Choose Images
                    </label>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                            alt={`Service ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage('images', index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Portfolio Images</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
                    <p className="text-white/60 mb-4">Upload portfolio images</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files, 'portfolio_images')}
                      className="hidden"
                      id="portfolio-images"
                    />
                    <label
                      htmlFor="portfolio-images"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                    >
                      Choose Images
                    </label>
                  </div>
                  {formData.portfolio_images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData.portfolio_images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage('portfolio_images', index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Service Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Basic Information</h4>
                      <p><strong>Title:</strong> {formData.title}</p>
                      <p><strong>Category:</strong> {categories.find(c => c.id === formData.category_id)?.name}</p>
                      <p><strong>Experience:</strong> {formData.years_of_experience} years</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Pricing</h4>
                                             <p><strong>Base Price:</strong> ₹{formData.base_price}</p>
                       <p><strong>Starting Price:</strong> ₹{formData.starting_price}</p>
                       <p><strong>Price Type:</strong> {formData.price_type}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-white/80">{formData.description}</p>
                  </div>
                  {formData.service_area.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Service Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.service_area.map((area, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Service Card'}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}