export const vendorVerificationTemplate = (data: {
  fullName: string
  businessName: string
  verificationUrl: string
  supportEmail: string
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Vendor Account - Evea</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #374151;
        }
        .message {
            font-size: 16px;
            margin-bottom: 30px;
            color: #6b7280;
            line-height: 1.7;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: all 0.3s ease;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            margin: 5px 0;
            color: #6b7280;
            font-size: 14px;
        }
        .highlight {
            background-color: #fef3c7;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #f59e0b;
        }
        .business-info {
            background-color: #f0f9ff;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #0ea5e9;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to Evea!</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello ${data.fullName},
            </div>
            
            <div class="message">
                Thank you for registering your business <strong>${data.businessName}</strong> with Evea! We're excited to have you join our platform and help you grow your business.
            </div>
            
            <div class="business-info">
                <strong>Business Details:</strong><br>
                Business Name: ${data.businessName}<br>
                Owner: ${data.fullName}
            </div>
            
            <div class="highlight">
                <strong>⚠️ Important:</strong> To complete your registration and start receiving bookings, you need to verify your email address.
            </div>
            
            <div style="text-align: center;">
                <a href="${data.verificationUrl}" class="button">
                    ✅ Verify Email Address
                </a>
            </div>
            
            <div class="message">
                After email verification, you'll be able to:
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li>Upload your business documents</li>
                    <li>Set up your services and pricing</li>
                    <li>Start receiving customer bookings</li>
                    <li>Access your vendor dashboard</li>
                </ul>
            </div>
            
            <div class="message">
                <strong>What happens next?</strong><br>
                1. Click the verification button above<br>
                2. Upload your business documents<br>
                3. Set up your services and pricing<br>
                4. Get approved by our team<br>
                5. Start receiving bookings!
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Need help?</strong></p>
            <p>Contact us at <a href="mailto:${data.supportEmail}" style="color: #dc2626;">${data.supportEmail}</a></p>
            <p>This link will expire in 24 hours for security reasons.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                © 2024 Evea. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`
