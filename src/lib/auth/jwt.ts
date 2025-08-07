import jwt from 'jsonwebtoken'

interface TokenPayload {
  userId: string
  vendorId?: string
  email: string
  role: string
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export function extractTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}