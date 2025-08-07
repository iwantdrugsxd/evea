import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Evea - Professional Event Management Platform',
    template: '%s | Evea'
  },
  description: 'Transform your events with Evea\'s comprehensive vendor marketplace. Find trusted vendors, manage bookings, and create memorable experiences for weddings, corporate events, and celebrations.',
  keywords: [
    'event management', 
    'wedding planning', 
    'corporate events', 
    'vendor marketplace', 
    'event planning',
    'birthday parties',
    'celebrations',
    'vendor services',
    'event coordination',
    'professional events'
  ],
  authors: [{ name: 'Evea Team' }],
  creator: 'Evea',
  publisher: 'Evea',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Evea',
    title: 'Evea - Professional Event Management Platform',
    description: 'Transform your events with professional vendor management and seamless booking experiences.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Evea Event Management Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@evea',
    creator: '@evea',
    title: 'Evea - Professional Event Management Platform',
    description: 'Transform your events with professional vendor management and seamless booking experiences.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Performance and SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        
        {/* Performance Hints - Using Google Fonts instead of local files */}
      </head>
      
      <body className={`${inter.className} antialiased bg-white text-gray-900 overflow-x-hidden layout-enterprise`}>
        {/* Skip Navigation for Accessibility */}
        <a href="#main-content" className="skip-link focus-ring">
          Skip to main content
        </a>
        
        {/* Main Content Wrapper */}
        <div id="root" className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
        
        {/* Toast Notifications with Enterprise Styling */}
        <Toaster
          position="top-right"
          gutter={12}
          containerClassName="z-50"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              maxWidth: '420px',
              padding: '16px 20px',
            },
            success: {
              style: {
                border: '1px solid #10b981',
                backgroundColor: '#ecfdf5',
                color: '#065f46',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              style: {
                border: '1px solid #ef4444',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
            loading: {
              style: {
                border: '1px solid #6b7280',
                backgroundColor: '#f9fafb',
                color: '#374151',
              },
            },
          }}
        />
        
        {/* Service Worker Registration for PWA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && 'PushManager' in window && window.location.hostname !== 'localhost') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('🚀 SW registered successfully');
                    })
                    .catch(function(error) {
                      console.log('❌ SW registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
        
        {/* Performance Analytics (Production Only) */}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}