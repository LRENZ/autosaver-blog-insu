import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function verifyAuthToken(token: string): boolean {
  try {
    // Verify the auth token
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [password] = decoded.split(':');
    return password === 'creatorshouse1!';
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for authentication cookie
    const authToken = request.cookies.get('admin_auth');
    
    if (!authToken || !verifyAuthToken(authToken.value)) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while already authenticated, redirect to dashboard
  if (pathname === '/admin/login') {
    const authToken = request.cookies.get('admin_auth');
    if (authToken && verifyAuthToken(authToken.value)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
