import { ReactNode } from 'react';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard - AutoSaver',
  description: 'Content management system for AutoSaver',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
