/**
 * Script to fix popup trigger values in database
 * Run this to fix any popups with incorrect trigger_value
 * 
 * Usage: npx tsx scripts/fix-popup-trigger.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixPopupTriggers() {
  console.log('🔧 Starting popup trigger value fix...\n');

  try {
    // Fetch all popups
    const { data: popups, error: fetchError } = await supabase
      .from('popups')
      .select('*');

    if (fetchError) throw fetchError;

    if (!popups || popups.length === 0) {
      console.log('ℹ️  No popups found in database');
      return;
    }

    console.log(`📊 Found ${popups.length} popup(s)\n`);

    // Check and fix each popup
    for (const popup of popups) {
      console.log(`Checking: ${popup.name} (ID: ${popup.id})`);
      console.log(`  Trigger Type: ${popup.trigger_type}`);
      console.log(`  Current Value: ${popup.trigger_value}`);

      let needsFix = false;
      let newValue = popup.trigger_value;

      // Fix time/onload triggers with values > 60 (likely milliseconds)
      if ((popup.trigger_type === 'time' || popup.trigger_type === 'onload') && popup.trigger_value > 60) {
        needsFix = true;
        // If it looks like milliseconds (e.g., 3000, 5000), convert to seconds
        if (popup.trigger_value >= 1000) {
          newValue = Math.round(popup.trigger_value / 1000);
          console.log(`  ⚠️  Looks like milliseconds, converting to seconds`);
        } else {
          // If it's just a large number of seconds (>60), reduce to reasonable value
          newValue = 5; // Default to 5 seconds
          console.log(`  ⚠️  Value too large, resetting to default`);
        }
      }

      // Fix scroll triggers > 100 (should be percentage)
      if (popup.trigger_type === 'scroll' && popup.trigger_value > 100) {
        needsFix = true;
        newValue = 50; // Default to 50%
        console.log(`  ⚠️  Scroll percentage > 100, resetting to 50%`);
      }

      if (needsFix) {
        console.log(`  ✅ Updating to: ${newValue}`);
        
        const { error: updateError } = await supabase
          .from('popups')
          .update({ trigger_value: newValue })
          .eq('id', popup.id);

        if (updateError) {
          console.log(`  ❌ Failed to update: ${updateError.message}`);
        } else {
          console.log(`  ✅ Successfully updated!`);
        }
      } else {
        console.log(`  ✓ Value is OK`);
      }

      console.log('');
    }

    console.log('🎉 Popup trigger fix completed!\n');
    
    // Show updated popups
    const { data: updatedPopups } = await supabase
      .from('popups')
      .select('id, name, trigger_type, trigger_value, status');

    console.log('📋 Current popup configuration:');
    console.table(updatedPopups);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the fix
fixPopupTriggers().then(() => {
  console.log('\n✅ Script completed successfully');
  process.exit(0);
}).catch((error) => {
  console.error('\n❌ Script failed:', error);
  process.exit(1);
});
