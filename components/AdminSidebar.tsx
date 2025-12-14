'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, PlusCircle, Home, Megaphone, LogOut, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'All Posts', href: '/admin/posts', icon: FileText },
  { name: 'Create New', href: '/admin/posts/create', icon: PlusCircle },
  { name: 'Locations', href: '/admin/locations', icon: MapPin },
  { name: 'Popups', href: '/admin/popups', icon: Megaphone },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear the auth cookie
    document.cookie = 'admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      {/* Brand */}
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold hover:text-orange-400 transition">
          <Home className="w-6 h-6" />
          <span>AutoSaver</span>
        </Link>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 pt-4 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition"
        >
          <Home className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-sm text-gray-400 hover:text-red-400 transition w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
