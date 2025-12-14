import { Post, Location } from './types';

// Mock data for posts - Replace with database calls later
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'How to Save $500 on Car Insurance in 2024',
    slug: 'how-to-save-500-on-car-insurance-2024',
    category: 'Savings',
    coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
    excerpt: 'Discover proven strategies to cut your car insurance costs by up to $500 this year.',
    body: '# Full article content here...\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit...',
    metaTitle: 'Save $500 on Car Insurance - Expert Tips 2024',
    metaDescription: 'Learn how to reduce your car insurance premiums with these proven strategies.',
    status: 'published',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Understanding Full Coverage Car Insurance',
    slug: 'understanding-full-coverage-car-insurance',
    category: 'Guides',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    excerpt: 'A complete guide to full coverage insurance and what it really means for you.',
    body: '# Understanding Full Coverage\n\nFull coverage is a term...',
    metaTitle: 'Full Coverage Car Insurance Explained',
    metaDescription: 'Complete guide to understanding full coverage car insurance policies.',
    status: 'published',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    title: 'Best Car Insurance Rates in California',
    slug: 'best-car-insurance-rates-california',
    category: 'Location',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop',
    excerpt: 'Find the best car insurance deals available in California with our comprehensive guide.',
    body: '# California Car Insurance Guide\n\nCalifornia has unique...',
    metaTitle: 'Cheapest Car Insurance in California 2024',
    metaDescription: 'Compare the best car insurance rates in California and save money.',
    status: 'published',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    title: 'Teen Driver Insurance: What Parents Need to Know',
    slug: 'teen-driver-insurance-guide',
    category: 'Guides',
    coverImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop',
    excerpt: 'Adding a teen driver to your policy? Here\'s everything you need to know to save money.',
    body: '# Teen Driver Insurance Guide\n\nAdding a teenager...',
    metaTitle: 'Teen Driver Insurance Guide for Parents',
    metaDescription: 'Everything parents need to know about insuring teen drivers.',
    status: 'published',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '5',
    title: 'How Credit Score Affects Your Car Insurance Rate',
    slug: 'credit-score-car-insurance-rate',
    category: 'Savings',
    coverImage: 'https://images.unsplash.com/photo-1554224311-beee2ece0291?w=800&h=400&fit=crop',
    excerpt: 'Learn how your credit score impacts your insurance premiums and what you can do about it.',
    body: '# Credit Score and Insurance\n\nYour credit score plays...',
    metaTitle: 'Credit Score Impact on Car Insurance Rates',
    metaDescription: 'How your credit score affects car insurance and tips to improve it.',
    status: 'published',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
  },
  {
    id: '6',
    title: 'Texas Car Insurance Requirements 2024',
    slug: 'texas-car-insurance-requirements-2024',
    category: 'Location',
    coverImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=400&fit=crop',
    excerpt: 'Everything you need to know about car insurance requirements in Texas.',
    body: '# Texas Insurance Requirements\n\nTexas requires all drivers...',
    metaTitle: 'Texas Car Insurance Requirements & Best Rates',
    metaDescription: 'Complete guide to car insurance requirements in Texas.',
    status: 'published',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

// Mock locations data
export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'California',
    slug: 'california',
    state: 'CA',
    description: 'Find the best car insurance rates in California',
    averageRate: '$1,868/year',
  },
  {
    id: '2',
    name: 'Texas',
    slug: 'texas',
    state: 'TX',
    description: 'Compare car insurance quotes in Texas',
    averageRate: '$1,678/year',
  },
  {
    id: '3',
    name: 'Florida',
    slug: 'florida',
    state: 'FL',
    description: 'Get affordable car insurance in Florida',
    averageRate: '$2,364/year',
  },
  {
    id: '4',
    name: 'New York',
    slug: 'new-york',
    state: 'NY',
    description: 'Find cheap car insurance in New York',
    averageRate: '$2,211/year',
  },
  {
    id: '5',
    name: 'Pennsylvania',
    slug: 'pennsylvania',
    state: 'PA',
    description: 'Compare Pennsylvania car insurance rates',
    averageRate: '$1,589/year',
  },
  {
    id: '6',
    name: 'Illinois',
    slug: 'illinois',
    state: 'IL',
    description: 'Best car insurance deals in Illinois',
    averageRate: '$1,467/year',
  },
];

// Helper functions (these will be replaced with actual DB queries)
export async function getPosts(limit?: number): Promise<Post[]> {
  // Simulate async database call
  await new Promise(resolve => setTimeout(resolve, 100));
  return limit ? mockPosts.slice(0, limit) : mockPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPosts.find(post => post.slug === slug) || null;
}

export async function getLocations(): Promise<Location[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockLocations;
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockLocations.find(loc => loc.slug === slug) || null;
}
