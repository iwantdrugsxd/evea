// src/lib/email/templates/vendor-verification.ts
export const vendorVerificationTemplate = (data: {
    fullName: string
    businessName: string
    verificationUrl: string
    supportEmail: string
  }) => {
    return {
      subject: 'Verify Your Vendor Account - Evea',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Vendor Account</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f8fafc;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .logo {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo h1 {
              color: #2563eb;
              font-size: 28px;
              margin: 0;
              font-weight: bold;
            }
            .content {
              text-align: center;
            }
            .verification-button {
              display: inline-block;
              background-color: #2563eb;
              color: white;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              margin: 24px 0;
              transition: background-color 0.3s;
            }
            .verification-button:hover {
              background-color: #1d4ed8;
            }
            .steps {
              background-color: #f1f5f9;
              padding: 20px;
              border-radius: 6px;
              margin: 24px 0;
              text-align: left;
            }
            .step {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
            }
            .step-number {
              background-color: #2563eb;
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: bold;
              margin-right: 12px;
            }
            .footer {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid #e2e8f0;
              font-size: 14px;
              color: #64748b;
              text-align: center;
            }
            .support-link {
              color: #2563eb;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>EVEA</h1>
              <p style="color: #64748b; margin: 0;">Event Management Platform</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1e293b; margin-bottom: 16px;">
                Welcome to Evea, ${data.fullName}!
              </h2>
              
              <p style="font-size: 16px; margin-bottom: 8px;">
                Thank you for registering <strong>${data.businessName}</strong> with Evea.
              </p>
              
              <p style="color: #64748b; margin-bottom: 24px;">
                To complete your vendor registration and start receiving event bookings, 
                please verify your email address by clicking the button below.
              </p>
  
              <a href="${data.verificationUrl}" class="verification-button">
                Verify Email & Continue Registration
              </a>
  
              <div class="steps">
                <h3 style="margin-top: 0; color: #1e293b; font-size: 16px;">Next Steps After Verification:</h3>
                <div class="step">
                  <div class="step-number">1</div>
                  <span>Complete business details and upload documents</span>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <span>Set up your service offerings and pricing</span>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <span>Wait for admin verification (24-48 hours)</span>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <span>Start receiving bookings and grow your business!</span>
                </div>
              </div>
  
              <div style="background-color: #eff6ff; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>💡 Tip:</strong> Complete your profile within 7 days to get featured in our "New Vendors" section!
                </p>
              </div>
            </div>
  
            <div class="footer">
              <p>
                If you're having trouble clicking the button, copy and paste this link into your browser:
              </p>
              <p style="word-break: break-all; color: #2563eb;">
                ${data.verificationUrl}
              </p>
              
              <p style="margin-top: 16px;">
                Need help? Contact us at 
                <a href="mailto:${data.supportEmail}" class="support-link">
                  ${data.supportEmail}
                </a>
              </p>
              
              <p style="margin-top: 16px; font-size: 12px;">
                This email was sent to you because you registered as a vendor on Evea. 
                If you didn't register, please ignore this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Evea, ${data.fullName}!
  
        Thank you for registering ${data.businessName} with Evea.
  
        To complete your vendor registration and start receiving event bookings, please verify your email address by visiting this link:
  
        ${data.verificationUrl}
  
        Next Steps After Verification:
        1. Complete business details and upload documents
        2. Set up your service offerings and pricing  
        3. Wait for admin verification (24-48 hours)
        4. Start receiving bookings and grow your business!
  
        If you're having trouble with the link, copy and paste this URL into your browser:
        ${data.verificationUrl}
  
        Need help? Contact us at ${data.supportEmail}
  
        This email was sent to you because you registered as a vendor on Evea. If you didn't register, please ignore this email.
      `
    }
  }