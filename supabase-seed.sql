-- AutoSaver Blog Seed Data for Supabase
-- Run this AFTER running supabase-schema.sql

-- Insert locations
INSERT INTO locations (state, slug, name, description, average_rate) VALUES
('CA', 'california', 'California', 'Find the best car insurance rates in California', 1842.00),
('TX', 'texas', 'Texas', 'Compare car insurance quotes in Texas', 1678.00),
('FL', 'florida', 'Florida', 'Get cheap car insurance in Florida', 2309.00),
('NY', 'new-york', 'New York', 'Save on car insurance in New York', 1966.00),
('PA', 'pennsylvania', 'Pennsylvania', 'Compare insurance rates in Pennsylvania', 1521.00),
('IL', 'illinois', 'Illinois', 'Find affordable insurance in Illinois', 1334.00)
ON CONFLICT (slug) DO NOTHING;

-- Insert blog posts
INSERT INTO posts (title, slug, category, cover_image, excerpt, body, meta_title, meta_description, status) VALUES
(
  'How to Save $500+ on Car Insurance in 2024',
  'how-to-save-500-on-car-insurance-2024',
  'Savings',
  'https://images.unsplash.com/photo-1554224311-beee2ece0291?w=800&h=400&fit=crop',
  'Discover proven strategies to reduce your car insurance premiums and save hundreds of dollars annually.',
  E'# How to Save $500+ on Car Insurance in 2024\n\nCar insurance is a necessary expense, but that doesn''t mean you have to overpay. Here are proven strategies to reduce your premiums:\n\n## 1. Compare Multiple Quotes\nThe single most effective way to save is comparing quotes from different insurers. Rates can vary by $500-$1000 for the same coverage.\n\n## 2. Bundle Your Policies\nCombining auto and home insurance can save 15-25% on premiums.\n\n## 3. Increase Your Deductible\nRaising your deductible from $250 to $1000 can reduce premiums by 20-40%.\n\n## 4. Maintain Good Credit\nIn most states, better credit scores lead to lower rates.\n\n## 5. Ask About Discounts\n- Safe driver discount\n- Low mileage discount\n- Student discounts\n- Military discounts\n\nStart comparing quotes today and see how much you can save!',
  'How to Save $500+ on Car Insurance in 2024 | AutoSaver',
  'Learn proven strategies to reduce car insurance costs and save hundreds annually. Compare quotes, bundle policies, and discover hidden discounts.',
  'published'
),
(
  'Multi-Car Insurance Discount: Save Money on Family Coverage',
  'multi-car-insurance-discount-save-money',
  'Savings',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
  'Learn how insuring multiple vehicles on one policy can save your family 10-25% on car insurance premiums.',
  E'# Multi-Car Insurance Discount Guide\n\nIf your household has multiple vehicles, you could be missing out on significant savings.\n\n## What is a Multi-Car Discount?\nA discount offered when you insure 2 or more vehicles on the same policy.\n\n## Potential Savings\n- 2 cars: 10-15% discount\n- 3 cars: 15-20% discount\n- 4+ cars: 20-25% discount\n\n## Who Qualifies?\n- Family members in the same household\n- Married couples\n- Adult children living at home\n\n## Additional Benefits\n- Single policy management\n- One renewal date\n- Combined billing\n\nCompare multi-car quotes today!',
  'Multi-Car Insurance Discount Guide 2024 | Save 10-25%',
  'Discover how multi-car insurance discounts work and save 10-25% on family vehicle coverage. Complete guide with examples and tips.',
  'published'
),
(
  'Complete Guide to Car Insurance for New Drivers',
  'car-insurance-guide-new-drivers',
  'Guides',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
  'Everything new drivers need to know about getting affordable car insurance coverage.',
  E'# Car Insurance Guide for New Drivers\n\n## Understanding Coverage Types\n\n### Liability Coverage\nCovers damage you cause to others. Required in most states.\n\n### Collision Coverage\nCovers damage to your vehicle in accidents.\n\n### Comprehensive Coverage\nCovers non-collision damage (theft, weather, vandalism).\n\n## Tips for New Drivers\n1. Stay on parents'' policy if possible\n2. Choose higher deductibles\n3. Take defensive driving courses\n4. Maintain good grades (student discount)\n5. Choose insurance-friendly vehicles\n\n## Average Costs\n- Teen drivers: $3,000-$7,000/year\n- Young adults (20-24): $2,000-$4,000/year\n\nStart comparing quotes to find your best rate!',
  'Car Insurance for New Drivers: Complete Guide 2024',
  'New driver insurance guide covering coverage types, costs, and money-saving tips. Get affordable rates and proper protection.',
  'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert location blogs
INSERT INTO location_blogs (location_id, title, slug, hero_image, body, meta_title, meta_description, status) VALUES
(
  1,
  'California Car Insurance Guide 2024',
  'california-car-insurance-guide-2024',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
  E'# California Car Insurance: Complete Guide\n\nCalifornia drivers face unique insurance requirements and costs. Here''s everything you need to know.\n\n## Minimum Requirements\n- $15,000 bodily injury per person\n- $30,000 bodily injury per accident\n- $5,000 property damage\n\n## Average Costs\nCalifornia drivers pay an average of $1,842 per year for full coverage.\n\n## Saving Tips for California Drivers\n1. Compare quotes from multiple insurers\n2. Consider usage-based insurance\n3. Bundle with home insurance\n4. Maintain good credit\n5. Ask about earthquake coverage discounts\n\nStart comparing California car insurance quotes today!',
  'California Car Insurance Rates & Requirements 2024',
  'Complete guide to California car insurance including minimum requirements, average costs, and money-saving tips for Golden State drivers.',
  'published'
),
(
  2,
  'Texas Car Insurance: Everything You Need to Know',
  'texas-car-insurance-guide',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
  E'# Texas Car Insurance Guide\n\n## State Requirements\n- $30,000 bodily injury per person\n- $60,000 bodily injury per accident\n- $25,000 property damage\n\n## Average Costs\nTexas drivers pay approximately $1,678 annually.\n\n## Texas-Specific Tips\n1. Understand uninsured motorist coverage\n2. Consider hail damage coverage\n3. Ask about windshield repair discounts\n4. Look into usage-based programs\n\nCompare Texas car insurance quotes now!',
  'Texas Car Insurance Guide: Rates & Requirements 2024',
  'Everything Texas drivers need to know about car insurance including state requirements, average costs, and saving strategies.',
  'published'
),
(
  3,
  'Florida Car Insurance Requirements and Rates',
  'florida-car-insurance-guide',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
  E'# Florida Car Insurance Guide\n\n## Unique Florida Requirements\n- $10,000 Personal Injury Protection (PIP)\n- $10,000 Property Damage Liability\n\n## Average Costs\nFlorida has higher average rates at $2,309 per year due to weather risks.\n\n## Saving Strategies\n1. Compare quotes from multiple providers\n2. Bundle policies\n3. Increase deductibles\n4. Ask about hurricane preparedness discounts\n\nFind affordable Florida car insurance today!',
  'Florida Car Insurance: PIP Requirements & Rates 2024',
  'Complete Florida car insurance guide covering PIP requirements, average costs, and tips to save on Sunshine State premiums.',
  'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert default popup
INSERT INTO popups (id, name, title, content, image_url, cta_text, cta_url, trigger_type, trigger_value, display_pages, status) VALUES
(
  'popup_default_urgency',
  'Limited Time Insurance Discount',
  '⏰ Your Exclusive Discount Expires Soon!',
  'Get instant car insurance quotes and save up to 40% on your premium. Takes only 2 minutes!',
  'https://images.unsplash.com/photo-1554224311-beee2ece0291?w=600&h=400&fit=crop',
  '🎯 Get My Free Quote Now',
  'https://www.insurancequote.com/get-started',
  'time',
  3000,
  'all',
  'active'
)
ON CONFLICT (id) DO NOTHING;
