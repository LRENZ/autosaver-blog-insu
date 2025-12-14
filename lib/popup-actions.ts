'use server'

import { revalidatePath } from 'next/cache'
import { getDb } from './db-adapter'

export interface Popup {
  id: string
  name: string
  title: string
  content: string
  imageUrl?: string
  ctaText: string
  ctaUrl: string
  triggerType: 'onload' | 'exit' | 'scroll' | 'time'
  triggerValue?: string
  displayPages: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// Get all active popups
export async function getActivePopups(): Promise<Popup[]> {
  const db = getDb()
  const popups = db.prepare(`
    SELECT id, name, title, content, image_url as imageUrl, 
           cta_text as ctaText, cta_url as ctaUrl,
           trigger_type as triggerType, trigger_value as triggerValue,
           display_pages as displayPages, status,
           created_at as createdAt, updated_at as updatedAt
    FROM popups 
    WHERE status = 'active'
    ORDER BY created_at DESC
  `).all() as Popup[]

  return popups
}

// Get all popups (for admin)
export async function getAllPopups(): Promise<Popup[]> {
  const db = getDb()
  const popups = db.prepare(`
    SELECT id, name, title, content, image_url as imageUrl, 
           cta_text as ctaText, cta_url as ctaUrl,
           trigger_type as triggerType, trigger_value as triggerValue,
           display_pages as displayPages, status,
           created_at as createdAt, updated_at as updatedAt
    FROM popups 
    ORDER BY created_at DESC
  `).all() as Popup[]

  return popups
}

// Get popup by ID
export async function getPopupById(id: string): Promise<Popup | null> {
  const db = getDb()
  const popup = db.prepare(`
    SELECT id, name, title, content, image_url as imageUrl, 
           cta_text as ctaText, cta_url as ctaUrl,
           trigger_type as triggerType, trigger_value as triggerValue,
           display_pages as displayPages, status,
           created_at as createdAt, updated_at as updatedAt
    FROM popups 
    WHERE id = ?
  `).get(id) as Popup | undefined

  return popup || null
}

// Create popup
export async function createPopup(data: Omit<Popup, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = getDb()
  const id = `popup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO popups (
      id, name, title, content, image_url, cta_text, cta_url,
      trigger_type, trigger_value, display_pages, status,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.name,
    data.title,
    data.content,
    data.imageUrl || null,
    data.ctaText,
    data.ctaUrl,
    data.triggerType,
    data.triggerValue || null,
    data.displayPages,
    data.status,
    now,
    now
  )

  revalidatePath('/')
  revalidatePath('/admin/popups')
  return { success: true, id }
}

// Update popup
export async function updatePopup(id: string, data: Partial<Omit<Popup, 'id' | 'createdAt' | 'updatedAt'>>) {
  const db = getDb()
  const now = new Date().toISOString()

  const fields: string[] = []
  const values: any[] = []

  if (data.name !== undefined) {
    fields.push('name = ?')
    values.push(data.name)
  }
  if (data.title !== undefined) {
    fields.push('title = ?')
    values.push(data.title)
  }
  if (data.content !== undefined) {
    fields.push('content = ?')
    values.push(data.content)
  }
  if (data.imageUrl !== undefined) {
    fields.push('image_url = ?')
    values.push(data.imageUrl)
  }
  if (data.ctaText !== undefined) {
    fields.push('cta_text = ?')
    values.push(data.ctaText)
  }
  if (data.ctaUrl !== undefined) {
    fields.push('cta_url = ?')
    values.push(data.ctaUrl)
  }
  if (data.triggerType !== undefined) {
    fields.push('trigger_type = ?')
    values.push(data.triggerType)
  }
  if (data.triggerValue !== undefined) {
    fields.push('trigger_value = ?')
    values.push(data.triggerValue)
  }
  if (data.displayPages !== undefined) {
    fields.push('display_pages = ?')
    values.push(data.displayPages)
  }
  if (data.status !== undefined) {
    fields.push('status = ?')
    values.push(data.status)
  }

  fields.push('updated_at = ?')
  values.push(now)
  values.push(id)

  db.prepare(`
    UPDATE popups 
    SET ${fields.join(', ')}
    WHERE id = ?
  `).run(...values)

  revalidatePath('/')
  revalidatePath('/admin/popups')
  return { success: true }
}

// Delete popup
export async function deletePopup(id: string) {
  const db = getDb()
  db.prepare('DELETE FROM popups WHERE id = ?').run(id)

  revalidatePath('/')
  revalidatePath('/admin/popups')
  return { success: true }
}

// Toggle popup status
export async function togglePopupStatus(id: string) {
  const db = getDb()
  const popup = await getPopupById(id)
  if (!popup) return { success: false, error: 'Popup not found' }

  const newStatus = popup.status === 'active' ? 'inactive' : 'active'
  await updatePopup(id, { status: newStatus })

  return { success: true, status: newStatus }
}
