'use server';

import { revalidatePath } from 'next/cache';
import { Location } from './types';
import db from './db';

// Helper to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// CREATE: Add new location
export async function createLocation(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string || generateSlug(name);
    const state = formData.get('state') as string;
    const description = formData.get('description') as string;
    const averageRate = formData.get('averageRate') as string;

    const newLocation = {
      name,
      slug,
      state,
      description,
      average_rate: averageRate,
    };

    await db.createLocation(newLocation);
    
    revalidatePath('/');
    revalidatePath('/admin/locations');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error creating location:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to create location' 
    };
  }
}

// READ: Get all locations (for admin)
export async function getAllLocations(): Promise<Location[]> {
  try {
    const locations = await db.getLocations();
    return locations.map((row: any) => ({
      id: String(row.id),
      name: row.name,
      slug: row.slug,
      state: row.state,
      description: row.description,
      averageRate: row.average_rate,
    }));
  } catch (error) {
    console.error('Error fetching all locations:', error);
    return [];
  }
}

// READ: Get single location by ID
export async function getLocationById(id: string): Promise<Location | null> {
  try {
    const row = await db.getLocationById(Number(id));
    if (!row) return null;

    return {
      id: String(row.id),
      name: row.name,
      slug: row.slug,
      state: row.state,
      description: row.description,
      averageRate: row.average_rate,
    };
  } catch (error) {
    console.error('Error fetching location by ID:', error);
    return null;
  }
}

// UPDATE: Update existing location
export async function updateLocation(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string || generateSlug(name);
    const state = formData.get('state') as string;
    const description = formData.get('description') as string;
    const averageRate = formData.get('averageRate') as string;

    const updatedLocation = {
      name,
      slug,
      state,
      description,
      average_rate: averageRate,
      updated_at: new Date().toISOString(),
    };

    await db.updateLocation(Number(id), updatedLocation);
    
    revalidatePath('/');
    revalidatePath(`/location/${slug}`);
    revalidatePath('/admin/locations');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating location:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to update location' 
    };
  }
}

// DELETE: Remove location
export async function deleteLocation(id: string) {
  try {
    await db.deleteLocation(Number(id));
    
    revalidatePath('/');
    revalidatePath('/admin/locations');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting location:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to delete location' 
    };
  }
}
