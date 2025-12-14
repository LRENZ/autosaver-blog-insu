import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft, TrendingDown, Shield, Users } from 'lucide-react';
import { getLocationBySlug, getLocations } from '@/lib/data';
import Button from '@/components/Button';

interface LocationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all locations
export async function generateStaticParams() {
  const locations = await getLocations();
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `${location.name} Car Insurance - Best Rates & Quotes`,
    description: `Find the best car insurance rates in ${location.name}. Compare quotes from top providers and save money. Average rate: ${location.averageRate}`,
    openGraph: {
      title: `${location.name} Car Insurance Rates`,
      description: location.description,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{location.state}</div>
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    {location.name}
                  </h1>
                </div>
              </div>
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                {location.description}
              </p>
              <div className="bg-white p-8 rounded-2xl shadow-2xl inline-block border-2 border-orange-100 hover:border-orange-300 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Average Annual Rate</div>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  {location.averageRate}
                </div>
                <p className="text-sm text-gray-500 mt-2">*Based on state average</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-gray-100 hover:border-orange-200 transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Get Your Free Quote
                </h3>
              </div>
              <p className="text-gray-600 mb-8">Compare {location.name} providers in minutes</p>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    placeholder="Enter your ZIP code"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Age</label>
                  <input
                    type="text"
                    placeholder="Enter your age"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance Status</label>
                  <select className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900">
                    <option>Select your status</option>
                    <option>Currently Insured</option>
                    <option>Not Currently Insured</option>
                    <option>Insurance Expired</option>
                  </select>
                </div>
                <Button className="w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all" size="lg">
                  Compare Rates Now →
                </Button>
                <p className="text-xs text-center text-gray-500">
                  🔒 Your information is secure and will never be sold
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Compare Insurance Rates in {location.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits of shopping smart for car insurance in {location.state}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-200">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Save Money
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Compare quotes from <span className="font-semibold text-orange-600">50+ providers</span> and save up to <span className="font-semibold text-green-600">$500 annually</span> on your car insurance.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200">
              <div className="bg-gradient-to-br from-green-100 to-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Stay Protected
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Find the right coverage that meets <span className="font-semibold text-gray-900">{location.name} state requirements</span> and protects you and your family.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Trusted by Thousands
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Join <span className="font-semibold text-blue-600">thousands</span> of {location.name} drivers who have saved money on their insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {location.name} Car Insurance Requirements
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-gray-700 leading-relaxed mb-6">
              {location.name} requires all drivers to maintain minimum car insurance coverage to legally operate a vehicle. 
              Understanding these requirements helps you stay compliant while finding the best rates.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Minimum Coverage Requirements:
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-orange-600 font-bold">•</span>
                <span>Bodily injury liability coverage per person and per accident</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-600 font-bold">•</span>
                <span>Property damage liability coverage</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-600 font-bold">•</span>
                <span>Uninsured/underinsured motorist coverage (where applicable)</span>
              </li>
            </ul>
            <div className="mt-8 p-6 bg-orange-50 rounded-xl">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> These are minimum requirements. Many drivers choose additional coverage 
                for better protection. Compare quotes to find the best coverage for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzMi00IDItNi0yLTQtMi02LTItNi0yLTYgMi00IDItNiAyLTQgMi02IDItNCAyLTYtMi00LTItNi0yLTQtMi02LTItNi0yLTYgMi00IDItNiAyLTQgMi02IDItNCAyLTYtMi00LTItNiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-block mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              <p className="text-white font-semibold">🎉 Limited Time Offer</p>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Save on {location.name} Car Insurance?
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get personalized quotes from top providers in minutes. <span className="font-bold text-white">No phone calls required!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all px-10 py-4 text-lg font-bold"
            >
              Get Your Free Quote Now →
            </Button>
            <Link href="/">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">No Commitment</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">2-3 Minutes</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
