'use client'

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, MapPin, Star, Quote } from 'lucide-react';
import Button from '@/components/Button';
import { GTMEvents, trackCTAClick, trackCardClick } from '@/lib/gtm-tracking';

interface HomePageClientProps {
  ctaUrls: {
    cta_get_my_free_quote_url: string;
    cta_get_your_free_quote_url: string;
  };
  latestPosts: any[];
  topLocations: any[];
}

export default function HomePageClient({ ctaUrls, latestPosts, topLocations }: HomePageClientProps) {
  return (
    <>
      {/* Hero CTA */}
      <div className="hero-cta-wrapper">
        <Link 
          href={ctaUrls.cta_get_my_free_quote_url}
          onClick={() => trackCTAClick(
            GTMEvents.HERO_GET_MY_FREE_QUOTE,
            'Get My Free Quote',
            ctaUrls.cta_get_my_free_quote_url,
            { module: 'hero', position: 'main_cta' }
          )}
        >
          <Button size="lg" className="text-xl px-10 py-4 shadow-xl hover:shadow-2xl">
            Get My Free Quote
          </Button>
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="blog-cards-wrapper">
        {latestPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => trackCardClick(
              GTMEvents.HOME_BLOG_CARD,
              post.title,
              'blog',
              `/blog/${post.slug}`,
              { category: post.category }
            )}
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

      {/* Location Cards */}
      <div className="location-cards-wrapper">
        {topLocations.map((location) => (
          <Link
            key={location.id}
            href={`/location/${location.slug}`}
            className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-600 transform hover:-translate-y-1"
            onClick={() => trackCardClick(
              GTMEvents.HOME_LOCATION_CARD,
              location.name,
              'location',
              `/location/${location.slug}`,
              { state: location.state, average_rate: location.averageRate }
            )}
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

      {/* Final CTA */}
      <div className="final-cta-wrapper">
        <Link 
          href={ctaUrls.cta_get_your_free_quote_url}
          onClick={() => trackCTAClick(
            GTMEvents.HOME_CTA_GET_YOUR_FREE_QUOTE,
            'Get Your Free Quote Now',
            ctaUrls.cta_get_your_free_quote_url,
            { module: 'home_cta', position: 'final_cta' }
          )}
        >
          <Button
            size="lg"
            variant="secondary"
            className="text-lg bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 shadow-2xl"
          >
            Get Your Free Quote Now
          </Button>
        </Link>
      </div>
    </>
  );
}
