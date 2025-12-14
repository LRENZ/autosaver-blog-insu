import Link from 'next/link';
import { Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-white mb-4">
              <Car className="w-8 h-8 text-orange-600" />
              <span>AutoSaver</span>
            </Link>
            <p className="text-sm text-gray-400">
              Find the best car insurance rates in minutes. Compare quotes from top providers and save money.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#guides" className="hover:text-orange-600 transition">
                  Insurance Guides
                </Link>
              </li>
              <li>
                <Link href="/#locations" className="hover:text-orange-600 transition">
                  Find by State
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-orange-600 transition">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <p className="text-sm text-gray-400">
              Have questions? We're here to help you find the best insurance rates.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AutoSaver. All rights reserved.</p>
          <p className="mt-2">
            Disclaimer: Insurance rates vary by location, driving record, and other factors. 
            Compare quotes from multiple providers for accurate pricing.
          </p>
        </div>
      </div>
    </footer>
  );
}
