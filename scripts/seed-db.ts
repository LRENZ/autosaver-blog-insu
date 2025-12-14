import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function seedDatabase() {
  console.log('🌱 Seeding Supabase database...');

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Read and execute the seed SQL file
    const sqlPath = path.join(process.cwd(), 'supabase-seed.sql');
    
    if (fs.existsSync(sqlPath)) {
      console.log('📄 Found supabase-seed.sql file');
      console.log('\n⚠️  Please run the SQL file manually in Supabase Dashboard:');
      console.log('1. Go to: https://supabase.com/dashboard/project/vufravtnkmhpwriskiev/editor');
      console.log('2. Click SQL Editor');
      console.log('3. Copy and paste the contents of supabase-seed.sql');
      console.log('4. Click Run\n');
    }

    // Alternative: Insert data using Supabase client
    console.log('Inserting locations...');
    const { error: locError } = await supabase.from('locations').upsert([
      { state: 'CA', slug: 'california', name: 'California', description: 'Find the best car insurance rates in California', average_rate: 1842.00 },
      { state: 'TX', slug: 'texas', name: 'Texas', description: 'Compare car insurance quotes in Texas', average_rate: 1678.00 },
      { state: 'FL', slug: 'florida', name: 'Florida', description: 'Get cheap car insurance in Florida', average_rate: 2309.00 },
      { state: 'NY', slug: 'new-york', name: 'New York', description: 'Save on car insurance in New York', average_rate: 1966.00 },
      { state: 'PA', slug: 'pennsylvania', name: 'Pennsylvania', description: 'Compare insurance rates in Pennsylvania', average_rate: 1521.00 },
      { state: 'IL', slug: 'illinois', name: 'Illinois', description: 'Find affordable insurance in Illinois', average_rate: 1334.00 }
    ], { onConflict: 'slug' });

    if (locError) {
      console.error('Error inserting locations:', locError);
    } else {
      console.log('✅ Locations inserted');
    }

    console.log('Inserting posts...');
    const { error: postsError } = await supabase.from('posts').upsert([
      {
        title: 'How to Save $500+ on Car Insurance in 2024',
        slug: 'how-to-save-500-on-car-insurance-2024',
        category: 'Savings',
        cover_image: 'https://images.unsplash.com/photo-1554224311-beee2ece0291?w=800&h=400&fit=crop',
        excerpt: 'Discover proven strategies to reduce your car insurance premiums and save hundreds of dollars annually.',
        body: `# How to Save $500+ on Car Insurance in 2024\n\nCar insurance is a necessary expense, but that doesn't mean you have to overpay. Here are proven strategies to reduce your premiums:\n\n## 1. Compare Multiple Quotes\nThe single most effective way to save is comparing quotes from different insurers. Rates can vary by $500-$1000 for the same coverage.\n\n## 2. Bundle Your Policies\nCombining auto and home insurance can save 15-25% on premiums.\n\n## 3. Increase Your Deductible\nRaising your deductible from $250 to $1000 can reduce premiums by 20-40%.\n\n## 4. Maintain Good Credit\nIn most states, better credit scores lead to lower rates.\n\n## 5. Ask About Discounts\n- Safe driver discount\n- Low mileage discount\n- Student discounts\n- Military discounts\n\nStart comparing quotes today and see how much you can save!`,
        meta_title: 'How to Save $500+ on Car Insurance in 2024 | AutoSaver',
        meta_description: 'Learn proven strategies to reduce car insurance costs and save hundreds annually. Compare quotes, bundle policies, and discover hidden discounts.',
        status: 'published'
      },
      {
        title: 'Multi-Car Insurance Discount: Save Money on Family Coverage',
        slug: 'multi-car-insurance-discount-save-money',
        category: 'Savings',
        cover_image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
        excerpt: 'Learn how insuring multiple vehicles on one policy can save your family 10-25% on car insurance premiums.',
        body: `# Multi-Car Insurance Discount Guide\n\nIf your household has multiple vehicles, you could be missing out on significant savings.\n\n## What is a Multi-Car Discount?\nA discount offered when you insure 2 or more vehicles on the same policy.\n\n## Potential Savings\n- 2 cars: 10-15% discount\n- 3 cars: 15-20% discount\n- 4+ cars: 20-25% discount\n\n## Who Qualifies?\n- Family members in the same household\n- Married couples\n- Adult children living at home\n\n## Additional Benefits\n- Single policy management\n- One renewal date\n- Combined billing\n\nCompare multi-car quotes today!`,
        meta_title: 'Multi-Car Insurance Discount Guide 2024 | Save 10-25%',
        meta_description: 'Discover how multi-car insurance discounts work and save 10-25% on family vehicle coverage. Complete guide with examples and tips.',
        status: 'published'
      },
      {
        title: 'Complete Guide to Car Insurance for New Drivers',
        slug: 'car-insurance-guide-new-drivers',
        category: 'Guides',
        cover_image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
        excerpt: 'Everything new drivers need to know about getting affordable car insurance coverage.',
        body: `# Car Insurance Guide for New Drivers\n\n## Understanding Coverage Types\n\n### Liability Coverage\nCovers damage you cause to others. Required in most states.\n\n### Collision Coverage\nCovers damage to your vehicle in accidents.\n\n### Comprehensive Coverage\nCovers non-collision damage (theft, weather, vandalism).\n\n## Tips for New Drivers\n1. Stay on parents' policy if possible\n2. Choose higher deductibles\n3. Take defensive driving courses\n4. Maintain good grades (student discount)\n5. Choose insurance-friendly vehicles\n\n## Average Costs\n- Teen drivers: $3,000-$7,000/year\n- Young adults (20-24): $2,000-$4,000/year\n\nStart comparing quotes to find your best rate!`,
        meta_title: 'Car Insurance for New Drivers: Complete Guide 2024',
        meta_description: 'New driver insurance guide covering coverage types, costs, and money-saving tips. Get affordable rates and proper protection.',
        status: 'published'
      }
    ], { onConflict: 'slug' });

    if (postsError) {
      console.error('Error inserting posts:', postsError);
    } else {
      console.log('✅ Posts inserted');
    }

    console.log('Inserting popup...');
    const { error: popupError } = await supabase.from('popups').upsert([
      {
        id: 'popup_default_urgency',
        name: 'Limited Time Insurance Discount',
        title: '⏰ Your Exclusive Discount Expires Soon!',
        content: 'Get instant car insurance quotes and save up to 40% on your premium. Takes only 2 minutes!',
        image_url: 'https://images.unsplash.com/photo-1554224311-beee2ece0291?w=600&h=400&fit=crop',
        cta_text: '🎯 Get My Free Quote Now',
        cta_url: 'https://www.insurancequote.com/get-started',
        trigger_type: 'time',
        trigger_value: 3000,
        display_pages: 'all',
        status: 'active'
      }
    ], { onConflict: 'id' });

    if (popupError) {
      console.error('Error inserting popup:', popupError);
    } else {
      console.log('✅ Popup inserted');
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log('  - 6 locations');
    console.log('  - 3 blog posts');
    console.log('  - 1 popup');
    console.log('\nNote: Location blogs need to be added separately or via SQL file.');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

// Run seeding
seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
