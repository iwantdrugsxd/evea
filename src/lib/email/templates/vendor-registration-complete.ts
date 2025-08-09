export const vendorRegistrationCompleteTemplate = (data: {
  fullName: string
  businessName: string
  supportEmail: string
}) => {
  return {
    subject: 'Registration Complete - Pending Approval - Evea',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Complete - Evea</title>
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
          .status-badge {
            display: inline-block;
            background-color: #fbbf24;
            color: #92400e;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
            margin: 16px 0;
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
            margin-bottom: 12px;
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
              Congratulations, ${data.fullName}!
            </h2>
            
            <div class="status-badge">
              ⏳ Registration Complete - Pending Approval
            </div>
            
            <p style="font-size: 16px; margin-bottom: 8px;">
              Your business <strong>${data.businessName}</strong> has successfully completed the registration process!
            </p>
            
            <p style="color: #64748b; margin-bottom: 24px;">
              Our team is now reviewing your application and documents. You'll receive an email with your login credentials once your account is approved.
            </p>

            <div class="steps">
              <h3 style="margin-top: 0; color: #1e293b; font-size: 16px;">What happens next?</h3>
              <div class="step">
                <div class="step-number">1</div>
                <span>Our team reviews your business documents and service information</span>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <span>Account approval (usually within 24-48 hours)</span>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <span>You'll receive login credentials via email</span>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <span>Start receiving bookings and growing your business!</span>
              </div>
            </div>

            <div style="background-color: #eff6ff; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; font-size: 14px; color: #1e40af;">
                <strong>💡 Tip:</strong> While waiting for approval, you can prepare your business profile and service descriptions to hit the ground running!
              </p>
            </div>
          </div>

          <div class="footer">
            <p>
              Have questions about your registration? Contact our support team at 
              <a href="mailto:${data.supportEmail}" class="support-link">
                ${data.supportEmail}
              </a>
            </p>
            
            <p style="margin-top: 16px; font-size: 12px;">
              This email was sent to you because you completed vendor registration on Evea. 
              If you didn't register, please ignore this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Congratulations, ${data.fullName}!

      Your business ${data.businessName} has successfully completed the registration process!

      Our team is now reviewing your application and documents. You'll receive an email with your login credentials once your account is approved.

      What happens next?
      1. Our team reviews your business documents and service information
      2. Account approval (usually within 24-48 hours)
      3. You'll receive login credentials via email
      4. Start receiving bookings and growing your business!

      Have questions about your registration? Contact our support team at ${data.supportEmail}

      This email was sent to you because you completed vendor registration on Evea. If you didn't register, please ignore this email.
    `
  }
}
