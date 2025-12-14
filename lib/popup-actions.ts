'use server';

import { revalidatePath } from 'next/cache';
import { Popup } from './types';
import db from './db';

// Get all popups (admin)
export async function getAllPopups(): Promise<Popup[]> {
  try {
    const popups = await db.getAllPopups();
    return popups.map((row: any) => ({
      id: row.id,
      name: row.name,
      title: row.title,
      content: row.content,
      imageUrl: row.image_url,
      ctaText: row.cta_text,
      ctaUrl: row.cta_url,
      triggerType: row.trigger_type as 'onload' | 'exit' | 'scroll' | 'time',
      triggerValue: row.trigger_value,
      displayPages: row.display_pages,
      status: row.status as 'active' | 'inactive',
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  } catch (error) {
    console.error('Error fetching all popups:', error);
    return [];
  }
}

// Get popup by ID
export async function getPopupById(id: string): Promise<Popup | null> {
  try {
    const popups = await db.getAllPopups();
    const row = popups.find((p: any) => p.id === id);
    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      title: row.title,
      content: row.content,
      imageUrl: row.image_url,
      ctaText: row.cta_text,
      ctaUrl: row.cta_url,
      triggerType: row.trigger_type as 'onload' | 'exit' | 'scroll' | 'time',
      triggerValue: row.trigger_value,
      displayPages: row.display_pages,
      status: row.status as 'active' | 'inactive',
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  } catch (error) {
    console.error('Error fetching popup by ID:', error);
    return null;
  }
}

// Get active popups (public)
export async function getActivePopups(): Promise<Popup[]> {
  try {
    const popups = await db.getActivePopups();
    return popups.map((row: any) => ({
      id: row.id,
      name: row.name,
      title: row.title,
      content: row.content,
      imageUrl: row.image_url,
      ctaText: row.cta_text,
      ctaUrl: row.cta_url,
      triggerType: row.trigger_type as 'onload' | 'exit' | 'scroll' | 'time',
      triggerValue: row.trigger_value,
      displayPages: row.display_pages,
      status: row.status as 'active' | 'inactive',
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  } catch (error) {
    console.error('Error fetching active popups:', error);
    return [];
  }
}

// Create popup
export async function createPopup(data: any) {
  try {
    const id = `popup_${Date.now()}`;
    const newPopup = {
      id,
      name: data.name,
      title: data.title,
      content: data.content,
      image_url: data.imageUrl,
      cta_text: data.ctaText,
      cta_url: data.ctaUrl,
      trigger_type: data.triggerType,
      trigger_value: Number(data.triggerValue),
      display_pages: data.displayPages,
      status: data.status,
    };

    await db.createPopup(newPopup);
    
    revalidatePath('/');
    revalidatePath('/admin/popups');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error creating popup:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to create popup' 
    };
  }
}

// Update popup
export async function updatePopup(id: string, data: any) {
  try {
    const updatedPopup = {
      name: data.name,
      title: data.title,
      content: data.content,
      image_url: data.imageUrl,
      cta_text: data.ctaText,
      cta_url: data.ctaUrl,
      trigger_type: data.triggerType,
      trigger_value: Number(data.triggerValue),
      display_pages: data.displayPages,
      status: data.status,
      updated_at: new Date().toISOString(),
    };

    await db.updatePopup(id, updatedPopup);
    
    revalidatePath('/');
    revalidatePath('/admin/popups');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating popup:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to update popup' 
    };
  }
}

// Toggle popup status
export async function togglePopupStatus(id: string, currentStatus: string) {
  try {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    await db.updatePopup(id, {
      status: newStatus,
      updated_at: new Date().toISOString(),
    });
    
    revalidatePath('/');
    revalidatePath('/admin/popups');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error toggling popup status:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to toggle popup status' 
    };
  }
}

// Delete popup
export async function deletePopup(id: string) {
  try {
    await db.deletePopup(id);
    
    revalidatePath('/');
    revalidatePath('/admin/popups');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting popup:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to delete popup' 
    };
  }
}
