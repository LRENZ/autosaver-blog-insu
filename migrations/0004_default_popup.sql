-- Insert default "Limited Time Offer" popup
INSERT INTO popups (
  id, 
  name, 
  title, 
  content, 
  image_url, 
  cta_text, 
  cta_url, 
  trigger_type, 
  trigger_value, 
  display_pages, 
  status, 
  created_at, 
  updated_at
) VALUES (
  'popup_default_urgency',
  'Limited Time Insurance Discount',
  '⏰ Your Exclusive Discount Expires Soon!',
  '<p class="text-lg font-semibold text-red-600 mb-2">🔥 Special Offer Ending in 24 Hours!</p><p class="mb-3">Don''t miss out on <strong>up to 40% savings</strong> on your car insurance premium.</p><ul class="list-disc list-inside space-y-1 mb-3"><li>Compare quotes from 50+ top insurers</li><li>Get instant quotes in 2 minutes</li><li>No commitment, 100% free</li></ul><p class="text-sm text-gray-600">Limited slots available. Act now to secure your discount!</p>',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
  '🎯 Get My Free Quote Now',
  'https://www.insurancequote.com/get-started',
  'time',
  '5',
  'all',
  'active',
  datetime('now'),
  datetime('now')
);
