export interface User {
    id: string
    email: string
    full_name: string
    phone: string
    role: 'customer' | 'vendor' | 'vendor_pending' | 'admin'
    is_active: boolean
    email_verified: boolean
    phone_verified: boolean
    created_at: string
    updated_at: string
  }
  
  export interface Vendor {
    id: string
    user_id: string
    business_name: string
    gst_number?: string
    pan_number: string
    aadhar_number: string
    aadhar_verified: boolean
    bank_account_number: string
    bank_ifsc: string
    bank_holder_name: string
    address: string
    city: string
    state: string
    postal_code: string
    description?: string
    verification_status: 'pending' | 'verified' | 'rejected' | 'suspended'
    registration_step: number
    coordinates?: string
    service_area_radius: number
    approved_at?: string
    approved_by?: string
    created_at: string
    updated_at: string
  }
  
  export interface VendorService {
    id: string
    vendor_id: string
    category_id: string
    subcategory?: string
    secondary_services: string[]
    service_type: 'per_hour' | 'per_day' | 'per_event' | 'custom_quote'
    wedding_price_min?: number
    wedding_price_max?: number
    corporate_price_min?: number
    corporate_price_max?: number
    birthday_price_min?: number
    birthday_price_max?: number
    festival_price_min?: number
    festival_price_max?: number
    basic_package_price?: number
    basic_package_details?: string
    standard_package_price?: number
    standard_package_details?: string
    premium_package_price?: number
    premium_package_details?: string
    additional_services: string[]
    advance_payment_percentage: number
    cancellation_policy: string
    created_at: string
    updated_at: string
  }
  
  export interface VendorDocument {
    id: string
    vendor_id: string
    document_type: 'business_license' | 'gst_certificate' | 'identity_proof' | 'address_proof' | 'bank_statement' | 'aadhar_card'
    google_drive_file_id: string
    google_drive_folder_id?: string
    file_name: string
    file_size: number
    mime_type: string
    drive_view_link: string
    drive_download_link: string
    verification_status: 'pending' | 'verified' | 'rejected'
    verified_by?: string
    verified_at?: string
    rejection_reason?: string
    created_at: string
  }
  
  export interface AdminReview {
    id: string
    vendor_id: string
    admin_id: string
    review_status: 'approved' | 'rejected' | 'pending'
    review_notes?: string
    documents_reviewed: boolean
    business_info_reviewed: boolean
    services_reviewed: boolean
    created_at: string
  }
  
  export interface Category {
    id: string
    name: string
    slug: string
    description?: string
    icon?: string
    parent_id?: string
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
  }
  
  export interface APIResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    error?: string
  }