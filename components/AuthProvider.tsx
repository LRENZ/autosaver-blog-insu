'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if current route is an admin route (except login page)
    const isAdminRoute = pathname?.startsWith('/admin');
    const isLoginPage = pathname === '/admin/login';

    if (isAdminRoute && !isLoginPage) {
      // Check for auth cookie
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(c => c.trim().startsWith('admin_auth='));

      if (!authCookie) {
        // Redirect to login if not authenticated
        router.push('/admin/login?redirect=' + encodeURIComponent(pathname || '/admin'));
      }
    }

    // If on login page and already authenticated, redirect to dashboard
    if (isLoginPage) {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(c => c.trim().startsWith('admin_auth='));

      if (authCookie) {
        router.push('/admin');
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
