# 🔧 Cloudinary Setup Guide for Evea

## 📋 **Step 1: Create Cloudinary Account**

1. **Visit Cloudinary**: https://cloudinary.com/
2. **Sign up** for a free account
3. **Verify your email** and complete registration

---

## 🔑 **Step 2: Get Your Credentials**

1. **Go to Dashboard**: https://cloudinary.com/console
2. **Copy your credentials**:
   - **Cloud Name**: `your_cloud_name`
   - **API Key**: `your_api_key`
   - **API Secret**: `your_api_secret`

---

## ⚙️ **Step 3: Environment Variables**

Add these to your `.env.local` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 🎯 **Step 4: Cloudinary Dashboard Settings**

### **4.1 Upload Presets**
1. Go to **Settings** → **Upload**
2. Create a new upload preset:
   - **Name**: `evea_vendor_cards`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `evea/vendor-cards`

### **4.2 Transformations**
1. Go to **Settings** → **Upload**
2. Add these transformations:
   - **Quality**: `auto`
   - **Format**: `auto`
   - **Width**: `800` (max)
   - **Height**: `600` (max)

---

## 🧪 **Step 5: Test the Setup**

### **5.1 Test Upload**
```bash
# Start your development server
npm run dev

# Visit the test page
http://localhost:3000/test-upload
```

### **5.2 Expected Behavior**
- ✅ File selection works
- ✅ Upload to Cloudinary succeeds
- ✅ Image preview displays
- ✅ Delete functionality works

---

## 📁 **Step 6: File Structure**

Your images will be organized as:
```
cloudinary.com/your_cloud_name/
├── evea/
│   ├── vendor-cards/
│   │   ├── service-images/
│   │   │   └── {vendor-id}/
│   │   └── portfolio-images/
│   │       └── {vendor-id}/
│   └── other-folders/
```

---

## 🔧 **Step 7: API Endpoints**

### **7.1 Upload Files**
```typescript
POST /api/upload
Content-Type: multipart/form-data

// Upload single file
const formData = new FormData()
formData.append('file', file)
formData.append('folder', 'evea/vendor-cards/service-images/vendor-id')

// Upload multiple files
const formData = new FormData()
files.forEach(file => formData.append('files', file))
formData.append('folder', 'evea/vendor-cards/service-images/vendor-id')
```

### **7.2 Delete Files**
```typescript
DELETE /api/upload
Content-Type: application/json

{
  "publicIds": ["public_id_1", "public_id_2"]
}
```

---

## 🛡️ **Step 8: Security & Best Practices**

### **8.1 File Validation**
- ✅ **Size limit**: 10MB per file
- ✅ **Formats**: jpg, jpeg, png, gif, webp
- ✅ **Virus scanning**: Automatic (Cloudinary)

### **8.2 Access Control**
- ✅ **Signed uploads**: For sensitive content
- ✅ **Folder organization**: By vendor ID
- ✅ **Automatic cleanup**: Old files

### **8.3 Cost Optimization**
- ✅ **Auto-format**: WebP for modern browsers
- ✅ **Auto-quality**: Optimized compression
- ✅ **Lazy loading**: On-demand transformations

---

## 🚨 **Step 9: Troubleshooting**

### **9.1 Common Issues**

#### **"Must supply api_key"**
- Check environment variables
- Restart development server
- Verify `.env.local` file

#### **"Upload failed"**
- Check file size (max 10MB)
- Verify file format
- Check Cloudinary account status

#### **"Invalid folder"**
- Create folder in Cloudinary dashboard
- Check folder permissions
- Verify upload preset settings

### **9.2 Debug Commands**
```bash
# Check environment variables
node -e "console.log(process.env.CLOUDINARY_CLOUD_NAME)"

# Test Cloudinary connection
curl -X GET "http://localhost:3000/api/test-cloudinary"
```

---

## 📞 **Step 10: Support**

### **10.1 Cloudinary Resources**
- **Documentation**: https://cloudinary.com/documentation
- **API Reference**: https://cloudinary.com/documentation/image_upload_api_reference
- **Support**: https://support.cloudinary.com/

### **10.2 Evea Integration**
- **Test Page**: `/test-upload`
- **Vendor Cards**: `/vendor/cards/create`
- **API Routes**: `/api/upload`, `/api/vendor-cards`

---

## 🎉 **Success Indicators**

You'll know it's working when:

1. ✅ **Environment variables** are set correctly
2. ✅ **Test upload page** works
3. ✅ **Vendor card creation** uploads images
4. ✅ **Image previews** display correctly
5. ✅ **No console errors** related to Cloudinary

---

## 🔄 **Step 11: Production Deployment**

### **11.1 Environment Variables**
Set these in your production environment:
```env
CLOUDINARY_CLOUD_NAME=your_production_cloud_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret
```

### **11.2 Monitoring**
- **Cloudinary Dashboard**: Monitor usage
- **Error Logs**: Check for upload failures
- **Performance**: Monitor response times

---

## 📊 **Step 12: Usage Analytics**

Monitor your Cloudinary usage:
- **Storage**: Total GB used
- **Bandwidth**: Monthly transfer
- **Transformations**: API calls
- **Costs**: Monthly billing

---

The Cloudinary integration is now **complete and bulletproof**! 🚀
