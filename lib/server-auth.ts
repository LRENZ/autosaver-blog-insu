import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyHash } from './auth';

/**
 * Server-side authentication check for admin routes
 * Call this in server components to protect admin pages
 */
export async function requireAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (!authCookie || !verifyHash(authCookie.value)) {
    redirect('/admin/login');
  }

  return true;
}

/**
 * Check if user is authenticated (returns boolean)
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (!authCookie) return false;
  
  return verifyHash(authCookie.value);
}
