import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Star, Quote } from 'lucide-react';
import { getPosts, getLocations } from '@/lib/data';
import { getCtaUrls } from '@/lib/settings-actions';
import Button from '@/components/Button';

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Los Angeles, CA',
    initials: 'SJ',
    content: 'I saved $680 in just 5 minutes! The comparison was so easy and I found a better policy with more coverage.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    location: 'Houston, TX',
    initials: 'MC',
    content: 'Finally, a service that actually delivers. My premium dropped by 35% and the process was completely hassle-free.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    initials: 'ER',
    content: 'No pushy sales calls, no hidden fees. Just honest comparisons that helped me make the best choice for my family.',
    rating: 5,
  },
];

export default async function HomePage() {
  const latestPosts = await getPosts(6);
  const topLocations = await getLocations();
  const ctaUrls = await getCtaUrls();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Cheaper <span className="text-orange-600">Car Insurance</span> in Minutes
              </h1>
              <p className="text-2xl text-gray-600 mb-8 font-medium">
                We compare top insurers so you don't overpay.
              </p>

              {/* Benefits List */}
              <ul className="space-y-4 mb-8">
                {[
                  'Save up to 20–40% on your premium',
                  'Takes 2–3 minutes',
                  'No phone calls, no commitment'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xl font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={ctaUrls.cta_get_my_free_quote_url}>
                <Button size="lg" className="text-xl px-10 py-4 shadow-xl hover:shadow-2xl">
                  Get My Free Quote
                </Button>
              </Link>

              {/* Trust Badge */}
              <div className="mt-8 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">50,000+ drivers served</div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-2 text-gray-600">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=900&fit=crop"
                  alt="Happy driver with car and savings"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Savings Badge */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-2xl text-white">
                <div className="text-sm font-medium mb-1">Average Savings</div>
                <div className="text-4xl font-bold">$847</div>
                <div className="text-sm opacity-90">per year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Stories, Real Savings
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who switched and saved
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <Quote className="w-10 h-10 text-orange-200 mb-4" />
                
                {/* Rating */}
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="guides" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Expert Insurance Guides
            </h2>
            <p className="text-xl text-gray-600">
              Learn how to save money and get better coverage
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
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
      <section id="locations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Rates by State
            </h2>
            <p className="text-xl text-gray-600">
              State-specific guides and average rates
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topLocations.map((location) => (
              <Link
                key={location.id}
                href={`/location/${location.slug}`}
                className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-600 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
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
            Get personalized quotes from top providers in under 3 minutes
          </p>
          <Link href={ctaUrls.cta_get_your_free_quote_url}>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 shadow-2xl"
            >
              Get Your Free Quote Now
            </Button>
          </Link>
          <p className="mt-6 text-orange-100 text-sm">
            ✓ No credit card required  ✓ No hidden fees  ✓ 100% secure
          </p>
        </div>
      </section>
    </div>
  );
}
