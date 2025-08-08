import nodemailer from 'nodemailer'
import { vendorVerificationTemplate } from './templates/vendor-verification'

interface EmailData {
  to: string
  subject: string
  template: string
  data: Record<string, any>
}

// Create transporter with environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail({ to, subject, template, data }: EmailData): Promise<boolean> {
  try {
    console.log('📧 Sending email via SMTP...')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('Template:', template)

    const htmlContent = generateEmailTemplate(template, data)

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('❌ Email sending error:', error)
    return false
  }
}

function generateEmailTemplate(template: string, data: Record<string, any>): string {
  switch (template) {
    case 'vendor-verification':
      return vendorVerificationTemplate({
        fullName: data.fullName || '',
        businessName: data.businessName || '',
        verificationUrl: data.verificationUrl || '',
        supportEmail: data.supportEmail || 'support@evea.com'
      })

    case 'email-verification':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Verify Your EVEA Account</h2>
          <p>Hello ${data.userName},</p>
          <p>Thank you for registering on EVEA. Please verify your email address by clicking the link below:</p>
          <a href="${data.verificationLink}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Verify Email</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${data.verificationLink}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The EVEA Team</p>
        </div>
      `

    case 'welcome-email':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #28a745;">🎉 Welcome to EVEA!</h2>
          <p>Hello ${data.name},</p>
          <p>Welcome to EVEA! Your account has been successfully created and verified.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Get Started:</h3>
            <p>You can now log in to your account and start exploring amazing event services.</p>
            <a href="${data.loginLink}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Login to Your Account</a>
          </div>
          
          <p>What you can do:</p>
          <ul>
            <li>Browse and book event services</li>
            <li>Connect with verified vendors</li>
            <li>Manage your bookings</li>
            <li>Get customer support</li>
          </ul>
          
          <p>If you have any questions, please contact our support team.</p>
          
          <p>Welcome to EVEA!<br>The EVEA Team</p>
        </div>
      `

    case 'vendor-approval':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #28a745;">🎉 Your EVEA Vendor Account is Approved!</h2>
          <p>Hello ${data.name},</p>
          <p>Congratulations! Your vendor account for <strong>${data.businessName}</strong> has been approved by our admin team.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Login Credentials:</h3>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Password:</strong> ${data.password}</p>
            <p><strong>Login URL:</strong> <a href="${data.loginUrl}">${data.loginUrl}</a></p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>Important:</strong> Please change your password after your first login for security.</p>
          </div>
          
          <p>You can now:</p>
          <ul>
            <li>Log in to your vendor dashboard</li>
            <li>Manage your services and packages</li>
            <li>Receive booking requests from customers</li>
            <li>Update your business information</li>
          </ul>
          
          <p>If you have any questions, please contact our support team.</p>
          
          <p>Welcome to EVEA!<br>The EVEA Team</p>
        </div>
      `

    default:
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>EVEA Notification</h2>
          <p>${JSON.stringify(data)}</p>
        </div>
      `
  }
}