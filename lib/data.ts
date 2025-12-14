import { Post, Location } from './types';
import db from './db';

// Mock data as fallback (used during build when DB is not available)
const mockPosts: Post[] = [
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
];

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'California',
    slug: 'california',
    state: 'CA',
    description: 'Find the best car insurance rates in California',
    averageRate: '$1,868/year',
  },
];

// Helper to convert database row to Post object
function rowToPost(row: any): Post {
  return {
    id: String(row.id),
    title: row.title,
    slug: row.slug,
    category: row.category as 'Savings' | 'Guides' | 'Location',
    coverImage: row.cover_image,
    excerpt: row.excerpt,
    body: row.body,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    status: row.status as 'published' | 'draft',
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

// Helper to convert database row to Location object
function rowToLocation(row: any): Location {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    state: row.state,
    description: row.description,
    averageRate: row.average_rate,
  };
}

// Get posts with optional limit
export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    const posts = await db.getPosts();
    const result = limit ? posts.slice(0, limit) : posts;
    return result.map(rowToPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return limit ? mockPosts.slice(0, limit) : mockPosts;
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await db.getPostBySlug(slug);
    if (!post) return mockPosts.find(p => p.slug === slug) || null;
    return rowToPost(post);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return mockPosts.find(p => p.slug === slug) || null;
  }
}

// Get all locations
export async function getLocations(): Promise<Location[]> {
  try {
    const locations = await db.getLocations();
    return locations.map(rowToLocation);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return mockLocations;
  }
}

// Get single location by slug
export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const location = await db.getLocationBySlug(slug);
    if (!location) return mockLocations.find(l => l.slug === slug) || null;
    return rowToLocation(location);
  } catch (error) {
    console.error('Error fetching location by slug:', error);
    return mockLocations.find(l => l.slug === slug) || null;
  }
}
