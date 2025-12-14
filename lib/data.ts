import { Post, Location } from './types';

// Mock data as fallback (used during build)
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

// Helper to get database
function getDB(): D1Database | null {
  // Try to get D1 from various sources
  if (typeof process !== 'undefined') {
    // From process.env (wrangler dev)
    if ((process as any).env?.DB) {
      return (process as any).env.DB;
    }
  }
  
  // From global (Cloudflare Workers runtime)
  if (typeof globalThis !== 'undefined' && (globalThis as any).DB) {
    return (globalThis as any).DB;
  }
  
  return null;
}

// Helper to convert database row to Post object
function rowToPost(row: any): Post {
  return {
    id: row.id,
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
    id: row.id,
    name: row.name,
    slug: row.slug,
    state: row.state,
    description: row.description,
    averageRate: row.average_rate,
  };
}

// Get posts with optional limit
export async function getPosts(limit?: number): Promise<Post[]> {
  const db = getDB();
  
  if (!db) {
    // Fallback to mock data during build
    return limit ? mockPosts.slice(0, limit) : mockPosts;
  }
  
  try {
    const query = limit
      ? `SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC LIMIT ?`
      : `SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC`;
    
    const result = limit
      ? await db.prepare(query).bind(limit).all()
      : await db.prepare(query).all();
    
    return result.results ? result.results.map(rowToPost) : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return limit ? mockPosts.slice(0, limit) : mockPosts;
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = getDB();
  
  if (!db) {
    return mockPosts.find(p => p.slug === slug) || null;
  }
  
  try {
    const result = await db
      .prepare('SELECT * FROM posts WHERE slug = ? LIMIT 1')
      .bind(slug)
      .first();
    
    if (!result) return null;
    
    return rowToPost(result);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return mockPosts.find(p => p.slug === slug) || null;
  }
}

// Get all locations
export async function getLocations(): Promise<Location[]> {
  const db = getDB();
  
  if (!db) {
    return mockLocations;
  }
  
  try {
    const result = await db
      .prepare('SELECT * FROM locations ORDER BY name ASC')
      .all();
    
    return result.results ? result.results.map(rowToLocation) : [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return mockLocations;
  }
}

// Get single location by slug
export async function getLocationBySlug(slug: string): Promise<Location | null> {
  const db = getDB();
  
  if (!db) {
    return mockLocations.find(l => l.slug === slug) || null;
  }
  
  try {
    const result = await db
      .prepare('SELECT * FROM locations WHERE slug = ? LIMIT 1')
      .bind(slug)
      .first();
    
    if (!result) return null;
    
    return rowToLocation(result);
  } catch (error) {
    console.error('Error fetching location by slug:', error);
    return mockLocations.find(l => l.slug === slug) || null;
  }
}
