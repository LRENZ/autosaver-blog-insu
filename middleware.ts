import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a basic middleware structure for protecting admin routes
// In production, you should implement proper authentication (e.g., using NextAuth.js, Clerk, or Auth0)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // TODO: Implement authentication check here
    // For now, this is just a placeholder structure
    
    // Example: Check for authentication cookie/token
    // const token = request.cookies.get('auth-token');
    // const isAuthenticated = token && verifyToken(token.value);
    
    // For development, we'll allow access
    // In production, you should implement proper authentication:
    /*
    const isAuthenticated = false; // Replace with actual auth check
    
    if (!isAuthenticated) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
    */
  }

  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all admin routes except static files and images
     */
    '/admin/:path*',
  ],
};
