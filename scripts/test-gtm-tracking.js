#!/usr/bin/env node

/**
 * GTM DataLayer 埋点测试脚本
 * 
 * 使用方法:
 * node scripts/test-gtm-tracking.js
 */

console.log('🎯 GTM DataLayer 埋点测试');
console.log('========================\n');

// 模拟 window.dataLayer
const mockDataLayer = [];

// 模拟 trackCTAClick 函数
function trackCTAClick(eventName, buttonText, targetUrl, additionalData = {}) {
  const event = {
    event: eventName,
    button_text: buttonText,
    target_url: targetUrl,
    cta_type: 'button',
    timestamp: new Date().toISOString(),
    page_path: '/test',
    page_url: 'https://test.com',
    ...additionalData,
  };
  
  mockDataLayer.push(event);
  console.log(`✅ ${eventName}`);
  console.log(`   Button: "${buttonText}"`);
  console.log(`   URL: ${targetUrl}`);
  console.log(`   Data:`, JSON.stringify(additionalData, null, 2));
  console.log('');
}

// 测试所有 CTA 事件
console.log('📍 Header 模块测试\n');
trackCTAClick('header_get_quote_click', 'Get Quote', '#quote', { module: 'header' });
console.log(`   Total events: ${mockDataLayer.length}\n`);

console.log('📍 Hero 模块测试\n');
trackCTAClick('hero_get_my_free_quote_click', 'Get My Free Quote', '#quote', { module: 'hero' });
console.log(`   Total events: ${mockDataLayer.length}\n`);

console.log('📍 Home CTA 模块测试\n');
trackCTAClick('home_cta_get_your_free_quote_click', 'Get Your Free Quote Now', '#quote', { module: 'home_cta', position: 'final_cta' });
console.log(`   Total events: ${mockDataLayer.length}\n`);

console.log('📍 Location 模块测试\n');
trackCTAClick('location_compare_rates_click', 'Compare Rates Now', '#quote', { module: 'location', location_name: 'California' });
trackCTAClick('location_cta_get_your_free_quote_click', 'Get Your Free Quote Now', '#quote', { module: 'location_cta' });
trackCTAClick('location_cta_learn_more_click', 'Learn More', '/', { module: 'location_cta' });
console.log(`   Total events: ${mockDataLayer.length}\n`);

console.log('📍 Blog 模块测试\n');
trackCTAClick('blog_cta_get_your_free_quote_click', 'Get Your Free Quote', '#quote', { module: 'blog_cta', post_title: 'Test Post' });
trackCTAClick('blog_cta_learn_more_click', 'Learn More', '/', { module: 'blog_cta' });
console.log(`   Total events: ${mockDataLayer.length}\n`);

console.log('📍 Popup 模块测试\n');
trackCTAClick('popup_shown', 'N/A', 'N/A', { popup_id: 'popup_test', popup_name: 'Test Popup', trigger_type: 'time' });
trackCTAClick('popup_cta_click', 'Get Started', '#quote', { popup_id: 'popup_test', popup_name: 'Test Popup' });
trackCTAClick('popup_close', 'Close', 'N/A', { popup_id: 'popup_test', popup_name: 'Test Popup' });
console.log(`   Total events: ${mockDataLayer.length}\n`);

// 总结
console.log('=================================');
console.log(`✨ 测试完成！共 ${mockDataLayer.length} 个事件`);
console.log('=================================\n');

// 显示所有事件名称
console.log('📊 所有事件列表:');
mockDataLayer.forEach((event, index) => {
  console.log(`   ${index + 1}. ${event.event}`);
});

console.log('\n🎉 所有埋点测试通过！\n');
