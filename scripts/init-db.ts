import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function initDatabase() {
  console.log('🔧 Initializing Supabase database...');
  console.log('URL:', supabaseUrl);

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Note: Supabase uses SQL via the dashboard or API
    // We'll use RPC calls to execute SQL
    
    // Create posts table
    console.log('Creating posts table...');
    const { error: postsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (postsError && postsError.code !== '42P07') {
      console.log('Posts table may already exist or RPC not available');
    }

    // Create locations table
    console.log('Creating locations table...');
    const { error: locationsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (locationsError && locationsError.code !== '42P07') {
      console.log('Locations table may already exist or RPC not available');
    }

    // Create location_blogs table
    console.log('Creating location_blogs table...');
    const { error: locationBlogsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS location_blogs (
          id BIGSERIAL PRIMARY KEY,
          location_id BIGINT REFERENCES locations(id),
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
      `
    });

    if (locationBlogsError && locationBlogsError.code !== '42P07') {
      console.log('Location blogs table may already exist or RPC not available');
    }

    // Create popups table
    console.log('Creating popups table...');
    const { error: popupsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (popupsError && popupsError.code !== '42P07') {
      console.log('Popups table may already exist or RPC not available');
    }

    console.log('\n⚠️  Note: If tables were not created automatically, please run the SQL manually in Supabase Dashboard:');
    console.log('Dashboard → SQL Editor → Run the CREATE TABLE statements\n');
    
    console.log('✅ Database initialization completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/vufravtnkmhpwriskiev');
    console.log('2. Run the SQL scripts in SQL Editor');
    console.log('3. Run: npm run db:seed');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run initialization
initDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
