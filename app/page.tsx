import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, TrendingDown, Shield, Clock } from 'lucide-react';
import { getPosts, getLocations } from '@/lib/data';
import Button from '@/components/Button';

export default async function HomePage() {
  const latestPosts = await getPosts(6);
  const topLocations = await getLocations();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find <span className="text-orange-600">Cheaper Car Insurance</span> in Minutes
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Compare quotes from top providers and save an average of $500 per year on your car insurance.
              </p>

              {/* Benefits List */}
              <ul className="space-y-4 mb-8">
                {[
                  'Compare quotes from 50+ insurance providers',
                  'Save up to $500 annually on average',
                  'Free, fast, and no obligation',
                  'Secure and confidential process'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex space-x-4">
                <Button size="lg" className="text-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Get My Free Quote
                </Button>
                <Button variant="ghost" size="lg" className="text-lg">
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Takes 2 Minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                  <span>Save $500/Year</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=800&fit=crop"
                  alt="Car and savings"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold text-orange-600">$500</div>
                <div className="text-sm text-gray-600">Average Savings</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Providers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="guides" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Insurance Guides
            </h2>
            <p className="text-xl text-gray-600">
              Expert advice to help you save money on car insurance
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="text-sm text-gray-500">
                    {post.createdAt.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="locations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Rates by State
            </h2>
            <p className="text-xl text-gray-600">
              Compare car insurance rates in your state
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topLocations.map((location) => (
              <Link
                key={location.id}
                href={`/location/${location.slug}`}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        {location.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {location.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Average Rate:</span>
                      <span className="text-lg font-bold text-orange-600">
                        {location.averageRate}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All States */}
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              View All States
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Save on Car Insurance?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of drivers who have saved an average of $500 per year
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg bg-white text-orange-600 hover:bg-gray-100"
          >
            Get Your Free Quote Now
          </Button>
        </div>
      </section>
    </div>
  );
}
