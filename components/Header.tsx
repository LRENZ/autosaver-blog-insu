import Link from 'next/link';
import { Car } from 'lucide-react';
import { getCtaUrls } from '@/lib/settings-actions';

export default async function Header() {
  const ctaUrls = await getCtaUrls();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-orange-600 transition">
            <Car className="w-8 h-8 text-orange-600" />
            <span>AutoSaver</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium transition">
              Home
            </Link>
            <Link href="/#guides" className="text-gray-700 hover:text-orange-600 font-medium transition">
              Guides
            </Link>
            <Link href="/#locations" className="text-gray-700 hover:text-orange-600 font-medium transition">
              Locations
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href={ctaUrls.cta_get_quote_url}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            Get Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
