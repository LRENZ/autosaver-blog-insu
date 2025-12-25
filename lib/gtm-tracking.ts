/**
 * GTM DataLayer Tracking Utilities
 * 
 * Event naming convention: {module}_{action}
 * Example: header_get_quote_click, popup_cta_click
 */

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push event to GTM dataLayer
 */
export function pushToDataLayer(event: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      page_url: window.location.href,
      ...data,
    });
    
    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[GTM] Event pushed:', event, data);
    }
  }
}

/**
 * CTA Button Click Events
 * Format: {module}_{button_name}_click
 */
export const GTMEvents = {
  // Header Events
  HEADER_GET_QUOTE: 'header_get_quote_click',
  HEADER_LOGO: 'header_logo_click',
  HEADER_NAV_HOME: 'header_nav_home_click',
  HEADER_NAV_GUIDES: 'header_nav_guides_click',
  HEADER_NAV_LOCATIONS: 'header_nav_locations_click',
  
  // Homepage Hero Events
  HERO_GET_MY_FREE_QUOTE: 'hero_get_my_free_quote_click',
  
  // Homepage Final CTA Events
  HOME_CTA_GET_YOUR_FREE_QUOTE: 'home_cta_get_your_free_quote_click',
  
  // Homepage Content Events
  HOME_BLOG_CARD: 'home_blog_card_click',
  HOME_LOCATION_CARD: 'home_location_card_click',
  HOME_VIEW_ALL_STATES: 'home_view_all_states_click',
  
  // Location Page Events
  LOCATION_COMPARE_RATES: 'location_compare_rates_click',
  LOCATION_CTA_GET_YOUR_FREE_QUOTE: 'location_cta_get_your_free_quote_click',
  LOCATION_CTA_LEARN_MORE: 'location_cta_learn_more_click',
  LOCATION_BACK_HOME: 'location_back_home_click',
  
  // Blog Page Events
  BLOG_CTA_GET_YOUR_FREE_QUOTE: 'blog_cta_get_your_free_quote_click',
  BLOG_CTA_LEARN_MORE: 'blog_cta_learn_more_click',
  BLOG_BACK_HOME: 'blog_back_home_click',
  
  // Popup Events
  POPUP_SHOWN: 'popup_shown',
  POPUP_CTA_CLICK: 'popup_cta_click',
  POPUP_CLOSE: 'popup_close',
  
  // Footer Events
  FOOTER_LINK: 'footer_link_click',
} as const;

/**
 * Track CTA button click
 */
export function trackCTAClick(
  eventName: string,
  buttonText: string,
  targetUrl: string,
  additionalData?: Record<string, any>
) {
  pushToDataLayer(eventName, {
    button_text: buttonText,
    target_url: targetUrl,
    cta_type: 'button',
    ...additionalData,
  });
}

/**
 * Track link click
 */
export function trackLinkClick(
  eventName: string,
  linkText: string,
  targetUrl: string,
  additionalData?: Record<string, any>
) {
  pushToDataLayer(eventName, {
    link_text: linkText,
    target_url: targetUrl,
    link_type: 'navigation',
    ...additionalData,
  });
}

/**
 * Track popup interaction
 */
export function trackPopupEvent(
  eventName: string,
  popupId: string,
  popupName: string,
  additionalData?: Record<string, any>
) {
  pushToDataLayer(eventName, {
    popup_id: popupId,
    popup_name: popupName,
    ...additionalData,
  });
}

/**
 * Track card click (blog, location, etc.)
 */
export function trackCardClick(
  eventName: string,
  cardTitle: string,
  cardType: string,
  targetUrl: string,
  additionalData?: Record<string, any>
) {
  pushToDataLayer(eventName, {
    card_title: cardTitle,
    card_type: cardType,
    target_url: targetUrl,
    ...additionalData,
  });
}

/**
 * Initialize dataLayer if not exists
 */
export function initDataLayer() {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = [];
  }
}
