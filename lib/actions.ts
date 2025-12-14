'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Post } from './types';
import { mockPosts } from './data';

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

    // Validation
    if (!title || !slug || !category || !excerpt || !body) {
      return { 
        success: false, 
        error: 'Please fill in all required fields' 
      };
    }

    // Check if slug already exists
    const existingPost = mockPosts.find(p => p.slug === slug);
    if (existingPost) {
      return { 
        success: false, 
        error: 'A post with this slug already exists' 
      };
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      slug,
      category,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
      excerpt,
      body,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      status: status || 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In production, this would be: await db.posts.create(newPost)
    mockPosts.unshift(newPost);

    // Revalidate the admin posts page and home page
    revalidatePath('/admin/posts');
    revalidatePath('/');

    return { success: true, post: newPost };
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
  // In production: return await db.posts.findMany()
  return mockPosts;
}

// READ: Get single post by ID
export async function getPostById(id: string): Promise<Post | null> {
  // In production: return await db.posts.findUnique({ where: { id } })
  return mockPosts.find(post => post.id === id) || null;
}

// UPDATE: Edit existing post
export async function updatePost(id: string, formData: FormData) {
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
    const existingPost = mockPosts.find(p => p.slug === slug && p.id !== id);
    if (existingPost) {
      return { 
        success: false, 
        error: 'A post with this slug already exists' 
      };
    }

    // Find and update post
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return { 
        success: false, 
        error: 'Post not found' 
      };
    }

    const updatedPost: Post = {
      ...mockPosts[postIndex],
      title,
      slug,
      category,
      coverImage: coverImage || mockPosts[postIndex].coverImage,
      excerpt,
      body,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      status: status || 'draft',
      updatedAt: new Date(),
    };

    // In production: await db.posts.update({ where: { id }, data: updatedPost })
    mockPosts[postIndex] = updatedPost;

    // Revalidate pages
    revalidatePath('/admin/posts');
    revalidatePath('/');
    revalidatePath(`/blog/${slug}`);

    return { success: true, post: updatedPost };
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
  try {
    const postIndex = mockPosts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
      return { 
        success: false, 
        error: 'Post not found' 
      };
    }

    const deletedPost = mockPosts[postIndex];

    // In production: await db.posts.delete({ where: { id } })
    mockPosts.splice(postIndex, 1);

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
