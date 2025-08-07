interface OTPStore {
  [phone: string]: {
    otp: string
    expires: number
  }
}

// In-memory OTP store (use Redis in production)
const otpStore: OTPStore = {}

export async function sendOTP(phone: string): Promise<boolean> {
  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP (use Redis in production)
    otpStore[phone] = { otp, expires }

    // For development, log the OTP (remove in production)
    console.log(`📱 OTP sent to ${phone}: ${otp}`)
    console.log(`⏰ OTP expires at: ${new Date(expires).toLocaleString()}`)

    // Here you would integrate with your SMS provider
    // Example with Twilio:
    /*
    const client = twilio(accountSid, authToken)
    await client.messages.create({
      body: `Your EVEA verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    })
    */

    return true
  } catch (error) {
    console.error('❌ OTP sending error:', error)
    return false
  }
}

export async function verifyOTP(phone: string, otp: string): Promise<boolean> {
  try {
    console.log(`🔍 Verifying OTP for ${phone}: ${otp}`)
    
    const stored = otpStore[phone]
    
    if (!stored) {
      console.log(`❌ No OTP found for ${phone}`)
      return false
    }

    console.log(`📋 Stored OTP for ${phone}: ${stored.otp}`)
    console.log(`⏰ OTP expires at: ${new Date(stored.expires).toLocaleString()}`)

    if (Date.now() > stored.expires) {
      console.log(`⏰ OTP expired for ${phone}`)
      delete otpStore[phone]
      return false
    }

    const isValid = stored.otp === otp
    
    if (isValid) {
      console.log(`✅ OTP verified successfully for ${phone}`)
      delete otpStore[phone]
    } else {
      console.log(`❌ Invalid OTP for ${phone}. Expected: ${stored.otp}, Received: ${otp}`)
    }

    return isValid
  } catch (error) {
    console.error('❌ OTP verification error:', error)
    return false
  }
}

// Helper function to get current OTP for testing
export function getCurrentOTP(phone: string): string | null {
  const stored = otpStore[phone]
  return stored ? stored.otp : null
}