import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { getPostBySlug, getPosts } from '@/lib/data';
import { getCtaUrls } from '@/lib/settings-actions';
import Button from '@/components/Button';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: `car insurance, ${post.category}, insurance tips, ${post.title}`,
    authors: [{ name: 'AutoSaver Team' }],
    openGraph: {
      type: 'article',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ['AutoSaver Team'],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `https://autosaver-blog-insu.vercel.app/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const ctaUrls = await getCtaUrls();

  if (!post) {
    notFound();
  }

  // JSON-LD structured data for better SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt?.toISOString() || post.createdAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'AutoSaver',
      url: 'https://autosaver-blog-insu.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AutoSaver',
      logo: {
        '@type': 'ImageObject',
        url: 'https://autosaver-blog-insu.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://autosaver-blog-insu.vercel.app/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-orange-600" />
            <span className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-1.5 rounded-full font-semibold shadow-sm">
              {post.category}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 px-4 py-1.5 rounded-full">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>
              {post.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {post.title}
        </h1>

        {/* Excerpt */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl border-l-4 border-orange-500 mb-10 shadow-sm">
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </div>

        {/* Body Content with enhanced styling */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-a:text-orange-600 prose-a:no-underline hover:prose-a:text-orange-700 hover:prose-a:underline prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
          <MarkdownRenderer content={post.body} />
        </div>

        {/* CTA Section */}
        <div className="mt-16 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 opacity-10 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
          
          <div className="relative p-10 bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl border-2 border-orange-200 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Ready to Save on Car Insurance?
              </h3>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Compare quotes from top providers in minutes and save up to <span className="font-bold text-orange-600">$500 per year</span>. 
              No phone calls, no hidden fees—just honest comparisons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={ctaUrls.cta_get_your_free_quote_url} className="flex-1 sm:flex-initial">
                <Button size="lg" className="w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Get Your Free Quote →
                </Button>
              </Link>
              <Link href={ctaUrls.cta_learn_more_url}>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>2-3 minutes</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No commitment</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
