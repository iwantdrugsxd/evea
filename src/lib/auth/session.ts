import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export interface User {
  id: string;
  email: string;
  name: string;
  profile_image?: string;
  google_id?: string;
  created_at: string;
  updated_at?: string;
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie?.value) {
      return null;
    }

    // In a real implementation, you'd verify the session token
    // For now, we'll decode it as JSON (assuming it's stored as JSON)
    const user = JSON.parse(decodeURIComponent(sessionCookie.value));
    return user;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  return await getSession();
}

export function setSessionCookie(user: User, response: Response): void {
  const sessionData = JSON.stringify(user);
  const encodedSession = encodeURIComponent(sessionData);
  
  response.headers.set(
    'Set-Cookie',
    `session=${encodedSession}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
  );
}

export function clearSessionCookie(response: Response): void {
  response.headers.set(
    'Set-Cookie',
    'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
  );
}
