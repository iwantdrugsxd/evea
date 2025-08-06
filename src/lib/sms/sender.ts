import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendOTP(phone: string, otp: string) {
  await client.messages.create({
    body: `Your EVEA verification code is: ${otp}. Valid for 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${phone}` // For India, adjust for your country
  })
}