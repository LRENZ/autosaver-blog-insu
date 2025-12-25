'use client'

import { useEffect } from 'react';
import { initDataLayer, trackCTAClick, trackLinkClick, trackCardClick, GTMEvents } from '@/lib/gtm-tracking';

/**
 * GTM Tracking Initializer
 * Automatically adds click tracking to all CTA buttons and links
 */
export default function GTMTrackingInit() {
  useEffect(() => {
    // Initialize dataLayer
    initDataLayer();

    // Track all links with data-gtm-event attribute
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('[data-gtm-event]') as HTMLAnchorElement;
      
      if (link) {
        const eventName = link.getAttribute('data-gtm-event') || '';
        const eventLabel = link.getAttribute('data-gtm-label') || link.textContent || '';
        const eventModule = link.getAttribute('data-gtm-module') || '';
        const href = link.getAttribute('href') || '';
        
        // Determine if it's a CTA or regular link
        if (link.hasAttribute('data-gtm-cta')) {
          trackCTAClick(eventName, eventLabel, href, {
            module: eventModule,
          });
        } else if (link.hasAttribute('data-gtm-card')) {
          const cardType = link.getAttribute('data-gtm-card-type') || '';
          trackCardClick(eventName, eventLabel, cardType, href, {
            module: eventModule,
          });
        } else {
          trackLinkClick(eventName, eventLabel, href, {
            module: eventModule,
          });
        }
      }
    };

    // Attach event listener
    document.addEventListener('click', handleLinkClick, true);

    // Log initialization
    console.log('[GTM] Tracking initialized');

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, []);

  return null;
}
