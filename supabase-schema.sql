-- AutoSaver Blog Database Schema for Supabase
-- Run this in Supabase Dashboard → SQL Editor

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  cover_image TEXT,
  excerpt TEXT,
  body TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id BIGSERIAL PRIMARY KEY,
  state TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  average_rate DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_state ON locations(state);

-- Create location_blogs table
CREATE TABLE IF NOT EXISTS location_blogs (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT REFERENCES locations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  hero_image TEXT,
  body TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_location_blogs_slug ON location_blogs(slug);
CREATE INDEX IF NOT EXISTS idx_location_blogs_location_id ON location_blogs(location_id);
CREATE INDEX IF NOT EXISTS idx_location_blogs_status ON location_blogs(status);

-- Create popups table
CREATE TABLE IF NOT EXISTS popups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  cta_text TEXT,
  cta_url TEXT,
  trigger_type TEXT DEFAULT 'onload',
  trigger_value INTEGER,
  display_pages TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_popups_status ON popups(status);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read all locations" ON locations
  FOR SELECT USING (true);

CREATE POLICY "Public can read published location blogs" ON location_blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read active popups" ON popups
  FOR SELECT USING (status = 'active');

-- Create policies for authenticated users (full access)
CREATE POLICY "Authenticated users can insert posts" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete posts" ON posts
  FOR DELETE USING (true);

CREATE POLICY "Authenticated users can insert location_blogs" ON location_blogs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update location_blogs" ON location_blogs
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete location_blogs" ON location_blogs
  FOR DELETE USING (true);

CREATE POLICY "Authenticated users can manage popups" ON popups
  FOR ALL USING (true);

-- For simplicity, allow anon users to also write (since we're using simple auth)
-- In production, you should use proper Supabase Auth
CREATE POLICY "Allow anon to manage posts" ON posts
  FOR ALL USING (true);

CREATE POLICY "Allow anon to manage location_blogs" ON location_blogs
  FOR ALL USING (true);

CREATE POLICY "Allow anon to manage popups" ON popups
  FOR ALL USING (true);
