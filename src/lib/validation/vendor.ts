import { z } from 'zod'

export const VendorRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  businessName: z.string().min(2, 'Business name is required'),
  otp: z.string().length(6, 'Invalid OTP')
})

export const BusinessAuthSchema = z.object({
  vendorId: z.string().uuid(),
  gstNumber: z.string().optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  aadharNumber: z.string().regex(/^\d{12}$/, 'Invalid Aadhar format'),
  bankAccountNumber: z.string().min(9, 'Invalid account number'),
  bankIFSC: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
  bankHolderName: z.string().min(2, 'Account holder name is required')
})

export const ServicesLocationSchema = z.object({
  vendorId: z.string().uuid(),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().regex(/^\d{6}$/, 'Invalid postal code'),
  latitude: z.number(),
  longitude: z.number(),
  serviceAreaRadius: z.number().min(1).max(100),
  categoryId: z.string().uuid(),
  subcategory: z.string().optional(),
  secondaryServices: z.array(z.string()).optional(),
  serviceType: z.enum(['per_hour', 'per_day', 'per_event', 'custom_quote']),
  weddingPriceMin: z.number().optional(),
  weddingPriceMax: z.number().optional(),
  corporatePriceMin: z.number().optional(),
  corporatePriceMax: z.number().optional(),
  birthdayPriceMin: z.number().optional(),
  birthdayPriceMax: z.number().optional(),
  festivalPriceMin: z.number().optional(),
  festivalPriceMax: z.number().optional(),
  basicPackagePrice: z.number().optional(),
  basicPackageDetails: z.string().optional(),
  standardPackagePrice: z.number().optional(),
  standardPackageDetails: z.string().optional(),
  premiumPackagePrice: z.number().optional(),
  premiumPackageDetails: z.string().optional(),
  additionalServices: z.array(z.string()).optional(),
  advancePaymentPercentage: z.number().min(0).max(100),
  cancellationPolicy: z.string().min(10, 'Cancellation policy is required')
})