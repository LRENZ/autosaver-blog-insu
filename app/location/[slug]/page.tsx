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
      <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
                <h1 className="text-5xl font-bold text-gray-900">
                  {location.name}
                </h1>
              </div>
              <p className="text-2xl text-gray-600 mb-6">
                {location.description}
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
                <div className="text-sm text-gray-600 mb-1">Average Annual Rate</div>
                <div className="text-4xl font-bold text-orange-600">
                  {location.averageRate}
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get Your Free Quote
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter ZIP Code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Your Age"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Current Insurance Status</option>
                  <option>Currently Insured</option>
                  <option>Not Currently Insured</option>
                </select>
                <Button className="w-full" size="lg">
                  Compare Rates Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Compare Insurance Rates in {location.name}?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Save Money
              </h3>
              <p className="text-gray-600">
                Compare quotes from 50+ providers and save up to $500 annually on your car insurance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stay Protected
              </h3>
              <p className="text-gray-600">
                Find the right coverage that meets {location.name} state requirements and protects you.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted by Thousands
              </h3>
              <p className="text-gray-600">
                Join thousands of {location.name} drivers who have saved money on their insurance.
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
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Save on {location.name} Car Insurance?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get personalized quotes from top providers in minutes
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-gray-100"
          >
            Get Your Free Quote Now
          </Button>
        </div>
      </section>
    </div>
  );
}
