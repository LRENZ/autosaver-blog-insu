import { supabase } from './supabase';

// Database helper functions using Supabase
export const db = {
  // Posts operations
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getAllPostsForAdmin() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false});
    
    if (error) throw error;
    return data || [];
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async getPostById(id: number) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async createPost(post: any) {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePost(id: number, post: any) {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePost(id: number) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Locations operations
  async getLocations() {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('state', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getLocationBySlug(slug: string) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async getLocationById(id: number) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async createLocation(location: any) {
    const { data, error } = await supabase
      .from('locations')
      .insert([location])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateLocation(id: number, location: any) {
    const { data, error } = await supabase
      .from('locations')
      .update(location)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteLocation(id: number) {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Location blogs operations
  async getLocationBlogs(locationId: number) {
    const { data, error } = await supabase
      .from('location_blogs')
      .select('*')
      .eq('location_id', locationId)
      .eq('status', 'published');
    
    if (error) throw error;
    return data || [];
  },

  async getLocationBlogBySlug(slug: string) {
    const { data, error } = await supabase
      .from('location_blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  // Popups operations
  async getActivePopups() {
    const { data, error } = await supabase
      .from('popups')
      .select('*')
      .eq('status', 'active');
    
    if (error) throw error;
    return data || [];
  },

  async getAllPopups() {
    const { data, error } = await supabase
      .from('popups')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createPopup(popup: any) {
    const { data, error } = await supabase
      .from('popups')
      .insert([popup])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePopup(id: string, popup: any) {
    const { data, error } = await supabase
      .from('popups')
      .update(popup)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePopup(id: string) {
    const { error } = await supabase
      .from('popups')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Site Settings operations
  async getAllSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getSettingsByCategory(category: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('category', category)
      .order('key', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getSettingByKey(key: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', key)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async createSetting(key: string, value: string, description: string | null, category: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .insert({
        key,
        value,
        description,
        category
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSetting(key: string, value: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ value })
      .eq('key', key)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteSetting(key: string) {
    const { error } = await supabase
      .from('site_settings')
      .delete()
      .eq('key', key);
    
    if (error) throw error;
  },
};

export default db;
