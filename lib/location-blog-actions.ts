'use server';

import { revalidatePath } from 'next/cache';
import db from './db';

// Get location blogs by location slug
export async function getLocationBlogsBySlug(locationSlug: string) {
  try {
    const location = await db.getLocationBySlug(locationSlug);
    if (!location) return [];

    const blogs = await db.getLocationBlogs(Number(location.id));
    return blogs.map((row: any) => ({
      id: String(row.id),
      locationId: String(row.location_id),
      title: row.title,
      slug: row.slug,
      heroImage: row.hero_image,
      body: row.body,
      metaTitle: row.meta_title,
      metaDescription: row.meta_description,
      status: row.status,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  } catch (error) {
    console.error('Error fetching location blogs:', error);
    return [];
  }
}

// Get location blog by slug
export async function getLocationBlogBySlug(slug: string) {
  try {
    const blog = await db.getLocationBlogBySlug(slug);
    if (!blog) return null;

    return {
      id: String(blog.id),
      locationId: String(blog.location_id),
      title: blog.title,
      slug: blog.slug,
      heroImage: blog.hero_image,
      body: blog.body,
      metaTitle: blog.meta_title,
      metaDescription: blog.meta_description,
      status: blog.status,
      createdAt: new Date(blog.created_at),
      updatedAt: new Date(blog.updated_at),
    };
  } catch (error) {
    console.error('Error fetching location blog:', error);
    return null;
  }
}
