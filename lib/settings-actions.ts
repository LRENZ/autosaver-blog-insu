'use server'

import { db } from './db';
import { revalidatePath } from 'next/cache';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get all site settings
 */
export async function getAllSettings(): Promise<SiteSetting[]> {
  try {
    const settings = await db.getAllSettings();
    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return [];
  }
}

/**
 * Get settings by category
 */
export async function getSettingsByCategory(category: string): Promise<SiteSetting[]> {
  try {
    const settings = await db.getSettingsByCategory(category);
    return settings;
  } catch (error) {
    console.error('Error fetching settings by category:', error);
    return [];
  }
}

/**
 * Get a single setting by key
 */
export async function getSettingByKey(key: string): Promise<string | null> {
  try {
    const setting = await db.getSettingByKey(key);
    return setting?.value || null;
  } catch (error) {
    console.error('Error fetching setting:', error);
    return null;
  }
}

/**
 * Get all CTA button URLs
 */
export async function getCtaUrls(): Promise<Record<string, string>> {
  try {
    const settings = await db.getSettingsByCategory('cta_buttons');
    
    const urls: Record<string, string> = {};
    settings.forEach(setting => {
      urls[setting.key] = setting.value;
    });
    
    // Return with defaults
    return {
      cta_get_quote_url: urls.cta_get_quote_url || '#quote',
      cta_get_my_free_quote_url: urls.cta_get_my_free_quote_url || '#quote',
      cta_get_your_free_quote_url: urls.cta_get_your_free_quote_url || '#quote',
      cta_compare_rates_url: urls.cta_compare_rates_url || '#quote',
      cta_learn_more_url: urls.cta_learn_more_url || '/',
    };
  } catch (error) {
    console.error('Error fetching CTA URLs:', error);
    // Return defaults on error
    return {
      cta_get_quote_url: '#quote',
      cta_get_my_free_quote_url: '#quote',
      cta_get_your_free_quote_url: '#quote',
      cta_compare_rates_url: '#quote',
      cta_learn_more_url: '/',
    };
  }
}

/**
 * Update a setting
 */
export async function updateSetting(key: string, value: string): Promise<{ success: boolean; error?: string }> {
  try {
    await db.updateSetting(key, value);
    
    // Revalidate all pages that might use these settings
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating setting:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update setting'
    };
  }
}

/**
 * Create a new setting
 */
export async function createSetting(
  key: string,
  value: string,
  description: string | null,
  category: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await db.createSetting(key, value, description, category);
    
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error) {
    console.error('Error creating setting:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create setting'
    };
  }
}

/**
 * Delete a setting
 */
export async function deleteSetting(key: string): Promise<{ success: boolean; error?: string }> {
  try {
    await db.deleteSetting(key);
    
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting setting:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete setting'
    };
  }
}
