import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function setupSupabase() {
  console.log('🔧 Setting up Supabase database...\n');
  console.log('URL:', supabaseUrl);

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test connection
  console.log('\n📡 Testing connection...');
  const { data, error } = await supabase.from('_test_').select('*').limit(1);
  
  if (error && error.code === 'PGRST205') {
    console.log('✅ Connection successful!\n');
  } else if (!error) {
    console.log('✅ Connection successful!\n');
  } else {
    console.error('❌ Connection failed:', error);
    return;
  }

  console.log('📋 Setup Instructions:\n');
  console.log('1. Open Supabase SQL Editor:');
  console.log('   https://supabase.com/dashboard/project/vufravtnkmhpwriskiev/editor\n');
  
  console.log('2. Click "New query" and paste this SQL:\n');
  console.log('```sql');
  console.log(`-- Create tables
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

CREATE TABLE IF NOT EXISTS locations (
  id BIGSERIAL PRIMARY KEY,
  state TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  average_rate DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for simplicity)
CREATE POLICY "Allow all on posts" ON posts FOR ALL USING (TRUE);
CREATE POLICY "Allow all on locations" ON locations FOR ALL USING (TRUE);
CREATE POLICY "Allow all on location_blogs" ON location_blogs FOR ALL USING (TRUE);
CREATE POLICY "Allow all on popups" ON popups FOR ALL USING (TRUE);
`);
  console.log('```\n');

  console.log('3. Click "Run" button\n');
  console.log('4. Then run: npm run db:seed\n');
  
  console.log('📚 Or check SUPABASE_SETUP_INSTRUCTIONS.md for detailed steps\n');
}

setupSupabase()
  .then(() => {
    console.log('✅ Setup instructions displayed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
