-- Create location_blogs table for state-specific blog content
CREATE TABLE IF NOT EXISTS location_blogs (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  hero_image TEXT NOT NULL,
  introduction TEXT NOT NULL,
  body TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('published', 'draft')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_location_blogs_location_id ON location_blogs(location_id);
CREATE INDEX IF NOT EXISTS idx_location_blogs_slug ON location_blogs(slug);
CREATE INDEX IF NOT EXISTS idx_location_blogs_status ON location_blogs(status);

-- Create popups table for popup management
CREATE TABLE IF NOT EXISTS popups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  cta_text TEXT NOT NULL,
  cta_url TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK(trigger_type IN ('onload', 'exit', 'scroll', 'time')),
  trigger_value TEXT,
  display_pages TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('active', 'inactive')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status
CREATE INDEX IF NOT EXISTS idx_popups_status ON popups(status);
