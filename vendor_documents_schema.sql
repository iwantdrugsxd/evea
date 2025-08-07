-- Create vendor_documents table
CREATE TABLE IF NOT EXISTS vendor_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL CHECK (
    document_type IN (
      'business_license', 
      'tax_certificate', 
      'insurance_policy', 
      'aadhar_card', 
      'pan_card', 
      'gst_certificate',
      'identity_proof',
      'address_proof',
      'bank_statement'
    )
  ),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendor_documents_vendor_id ON vendor_documents(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_documents_document_type ON vendor_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_vendor_documents_status ON vendor_documents(status);

-- Add RLS policies for vendor_documents
ALTER TABLE vendor_documents ENABLE ROW LEVEL SECURITY;

-- Policy for vendors to manage their own documents
CREATE POLICY "Vendors can manage their own documents" ON vendor_documents
  FOR ALL USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

-- Policy for admins to view all documents
CREATE POLICY "Admins can view all documents" ON vendor_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Verify the table was created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'vendor_documents'
ORDER BY ordinal_position;
