'use server';

import { revalidatePath } from 'next/cache';
import { Post } from './types';
import { getDB } from './db-adapter';

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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

// CREATE: Add new post
export async function createPost(formData: FormData) {
  const db = getDB();
  
  if (!db) {
    return { 
      success: false, 
      error: 'Database not available. Please start with wrangler pages dev.' 
    };
  }
  
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string || generateSlug(title);
    const category = formData.get('category') as 'Savings' | 'Guides' | 'Location';
    const coverImage = formData.get('coverImage') as string;
    const excerpt = formData.get('excerpt') as string;
    const body = formData.get('body') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const status = formData.get('status') as 'published' | 'draft';

    // Validation
    if (!title || !slug || !category || !excerpt || !body) {
      return { 
        success: false, 
        error: 'Please fill in all required fields' 
      };
    }

    // Check if slug already exists
    const existing = await db
      .prepare('SELECT id FROM posts WHERE slug = ? LIMIT 1')
      .bind(slug)
      .first();
    
    if (existing) {
      return { 
        success: false, 
        error: 'A post with this slug already exists' 
      };
    }

    const id = Date.now().toString();
    const now = new Date().toISOString();
    
    // Insert new post
    await db
      .prepare(`
        INSERT INTO posts (
          id, title, slug, category, cover_image, excerpt, body,
          meta_title, meta_description, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        id,
        title,
        slug,
        category,
        coverImage || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
        excerpt,
        body,
        metaTitle || title,
        metaDescription || excerpt,
        status || 'draft',
        now,
        now
      )
      .run();

    // Revalidate the admin posts page and home page
    revalidatePath('/admin/posts');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error creating post:', error);
    return { 
      success: false, 
      error: 'Failed to create post. Please try again.' 
    };
  }
}

// READ: Get all posts (for admin)
export async function getAllPosts(): Promise<Post[]> {
  const db = getDB();
  
  if (!db) {
    console.warn('Database not available, returning empty array');
    return [];
  }
  
  try {
    const result = await db
      .prepare('SELECT * FROM posts ORDER BY created_at DESC')
      .all();
    
    return result.results ? result.results.map(rowToPost) : [];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// READ: Get single post by ID
export async function getPostById(id: string): Promise<Post | null> {
  const db = getDB();
  
  if (!db) {
    return null;
  }
  
  try {
    const result = await db
      .prepare('SELECT * FROM posts WHERE id = ? LIMIT 1')
      .bind(id)
      .first();
    
    if (!result) return null;
    
    return rowToPost(result);
  } catch (error) {
    console.error('Error fetching post by id:', error);
    return null;
  }
}

// UPDATE: Edit existing post
export async function updatePost(id: string, formData: FormData) {
  const db = getDB();
  
  if (!db) {
    return { 
      success: false, 
      error: 'Database not available. Please start with wrangler pages dev.' 
    };
  }
  
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const category = formData.get('category') as 'Savings' | 'Guides' | 'Location';
    const coverImage = formData.get('coverImage') as string;
    const excerpt = formData.get('excerpt') as string;
    const body = formData.get('body') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const status = formData.get('status') as 'published' | 'draft';

    // Validation
    if (!title || !slug || !category || !excerpt || !body) {
      return { 
        success: false, 
        error: 'Please fill in all required fields' 
      };
    }

    // Check if slug exists on another post
    const existing = await db
      .prepare('SELECT id FROM posts WHERE slug = ? AND id != ? LIMIT 1')
      .bind(slug, id)
      .first();
    
    if (existing) {
      return { 
        success: false, 
        error: 'A post with this slug already exists' 
      };
    }

    // Check if post exists
    const post = await db
      .prepare('SELECT id, cover_image FROM posts WHERE id = ? LIMIT 1')
      .bind(id)
      .first();
    
    if (!post) {
      return { 
        success: false, 
        error: 'Post not found' 
      };
    }

    const now = new Date().toISOString();
    
    // Update post
    await db
      .prepare(`
        UPDATE posts SET
          title = ?,
          slug = ?,
          category = ?,
          cover_image = ?,
          excerpt = ?,
          body = ?,
          meta_title = ?,
          meta_description = ?,
          status = ?,
          updated_at = ?
        WHERE id = ?
      `)
      .bind(
        title,
        slug,
        category,
        coverImage || post.cover_image,
        excerpt,
        body,
        metaTitle || title,
        metaDescription || excerpt,
        status || 'draft',
        now,
        id
      )
      .run();

    // Revalidate pages
    revalidatePath('/admin/posts');
    revalidatePath('/');
    revalidatePath(`/blog/${slug}`);

    return { success: true };
  } catch (error) {
    console.error('Error updating post:', error);
    return { 
      success: false, 
      error: 'Failed to update post. Please try again.' 
    };
  }
}

// DELETE: Remove post
export async function deletePost(id: string) {
  const db = getDB();
  
  if (!db) {
    return { 
      success: false, 
      error: 'Database not available. Please start with wrangler pages dev.' 
    };
  }
  
  try {
    // Check if post exists
    const post = await db
      .prepare('SELECT id FROM posts WHERE id = ? LIMIT 1')
      .bind(id)
      .first();
    
    if (!post) {
      return { 
        success: false, 
        error: 'Post not found' 
      };
    }

    // Delete post
    await db
      .prepare('DELETE FROM posts WHERE id = ?')
      .bind(id)
      .run();

    // Revalidate pages
    revalidatePath('/admin/posts');
    revalidatePath('/');

    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { 
      success: false, 
      error: 'Failed to delete post. Please try again.' 
    };
  }
}
