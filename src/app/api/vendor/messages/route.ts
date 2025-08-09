import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const conversations = Array.from({ length: 6 }).map((_, i) => ({
      id: `conv-${i + 1}`,
      customer: {
        id: `cust-${i + 1}`,
        name: ['Riya', 'Karan', 'Sneha', 'Manish', 'Aisha', 'Vikram'][i],
        avatar: null,
      },
      lastMessage: {
        content: ['Is the date available?', 'Can you share package details?', 'What about travel charges?', 'Do you cover candid?', 'Any discount?', 'How many photos?'][i],
        time: new Date(Date.now() - i * 3600_000).toISOString(),
        unread: i % 2 === 0,
      },
    }))

    const messages = Array.from({ length: 12 }).map((_, i) => ({
      id: `msg-${i + 1}`,
      conversationId: 'conv-1',
      sender: i % 2 === 0 ? 'customer' : 'vendor',
      content: ['Hi, I am interested in your services.', 'Thanks! When is your event?', 'It is on 12th Jan.', 'Great, we are available.', 'Can you share prices?', 'Sure, sending details.'][i % 6],
      time: new Date(Date.now() - (12 - i) * 600_000).toISOString(),
    }))

    return NextResponse.json({ success: true, conversations, messages })
  } catch (error) {
    console.error('Messages API error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


