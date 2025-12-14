'use server';

import { revalidatePath } from 'next/cache';
import { Post } from './types';
import db from './db';

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// CREATE: Add new post
export async function createPost(formData: FormData) {
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

    const newPost = {
      title,
      slug,
      category,
      cover_image: coverImage,
      excerpt,
      body,
      meta_title: metaTitle,
      meta_description: metaDescription,
      status,
    };

    await db.createPost(newPost);
    
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to create post' 
    };
  }
}

// READ: Get all posts (for admin)
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await db.getAllPostsForAdmin();
    return posts.map((row: any) => ({
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
    }));
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// READ: Get single post by ID
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const row = await db.getPostById(Number(id));
    if (!row) return null;

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
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
}

// UPDATE: Update existing post
export async function updatePost(id: string, formData: FormData) {
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

    const updatedPost = {
      title,
      slug,
      category,
      cover_image: coverImage,
      excerpt,
      body,
      meta_title: metaTitle,
      meta_description: metaDescription,
      status,
      updated_at: new Date().toISOString(),
    };

    await db.updatePost(Number(id), updatedPost);
    
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/admin/posts');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating post:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to update post' 
    };
  }
}

// DELETE: Remove post
export async function deletePost(id: string) {
  try {
    await db.deletePost(Number(id));
    
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to delete post' 
    };
  }
}
