'use server'

import { getDB } from './db-adapter'

export interface LocationBlog {
  id: string
  locationId: string
  title: string
  slug: string
  heroImage: string
  introduction: string
  body: string
  metaTitle: string
  metaDescription: string
  status: 'published' | 'draft'
  createdAt: string
  updatedAt: string
}

// Get all published location blogs
export async function getLocationBlogs(): Promise<LocationBlog[]> {
  const db = getDB()
  const blogs = db.prepare(`
    SELECT 
      id, 
      location_id as locationId,
      title, 
      slug, 
      hero_image as heroImage,
      introduction,
      body,
      meta_title as metaTitle,
      meta_description as metaDescription,
      status,
      created_at as createdAt,
      updated_at as updatedAt
    FROM location_blogs 
    WHERE status = 'published'
    ORDER BY created_at DESC
  `).all() as LocationBlog[]

  return blogs
}

// Get location blog by slug
export async function getLocationBlogBySlug(slug: string): Promise<LocationBlog | null> {
  const db = getDB()
  const blog = db.prepare(`
    SELECT 
      id, 
      location_id as locationId,
      title, 
      slug, 
      hero_image as heroImage,
      introduction,
      body,
      meta_title as metaTitle,
      meta_description as metaDescription,
      status,
      created_at as createdAt,
      updated_at as updatedAt
    FROM location_blogs 
    WHERE slug = ?
  `).get(slug) as LocationBlog | undefined

  return blog || null
}

// Get location blog by ID
export async function getLocationBlogById(id: string): Promise<LocationBlog | null> {
  const db = getDB()
  const blog = db.prepare(`
    SELECT 
      id, 
      location_id as locationId,
      title, 
      slug, 
      hero_image as heroImage,
      introduction,
      body,
      meta_title as metaTitle,
      meta_description as metaDescription,
      status,
      created_at as createdAt,
      updated_at as updatedAt
    FROM location_blogs 
    WHERE id = ?
  `).get(id) as LocationBlog | undefined

  return blog || null
}

// Create location blog
export async function createLocationBlog(data: Omit<LocationBlog, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = getDB()
  const id = `loc_blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO location_blogs (
      id, location_id, title, slug, hero_image, introduction, body,
      meta_title, meta_description, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.locationId,
    data.title,
    data.slug,
    data.heroImage,
    data.introduction,
    data.body,
    data.metaTitle,
    data.metaDescription,
    data.status,
    now,
    now
  )

  return { success: true, id }
}

// Update location blog
export async function updateLocationBlog(id: string, data: Partial<Omit<LocationBlog, 'id' | 'createdAt' | 'updatedAt'>>) {
  const db = getDB()
  const now = new Date().toISOString()

  const fields: string[] = []
  const values: any[] = []

  if (data.locationId !== undefined) {
    fields.push('location_id = ?')
    values.push(data.locationId)
  }
  if (data.title !== undefined) {
    fields.push('title = ?')
    values.push(data.title)
  }
  if (data.slug !== undefined) {
    fields.push('slug = ?')
    values.push(data.slug)
  }
  if (data.heroImage !== undefined) {
    fields.push('hero_image = ?')
    values.push(data.heroImage)
  }
  if (data.introduction !== undefined) {
    fields.push('introduction = ?')
    values.push(data.introduction)
  }
  if (data.body !== undefined) {
    fields.push('body = ?')
    values.push(data.body)
  }
  if (data.metaTitle !== undefined) {
    fields.push('meta_title = ?')
    values.push(data.metaTitle)
  }
  if (data.metaDescription !== undefined) {
    fields.push('meta_description = ?')
    values.push(data.metaDescription)
  }
  if (data.status !== undefined) {
    fields.push('status = ?')
    values.push(data.status)
  }

  fields.push('updated_at = ?')
  values.push(now)
  values.push(id)

  db.prepare(`
    UPDATE location_blogs 
    SET ${fields.join(', ')}
    WHERE id = ?
  `).run(...values)

  return { success: true }
}

// Delete location blog
export async function deleteLocationBlog(id: string) {
  const db = getDB()
  db.prepare('DELETE FROM location_blogs WHERE id = ?').run(id)
  return { success: true }
}
