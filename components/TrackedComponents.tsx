'use client'

import Link from 'next/link';
import { trackCTAClick, trackLinkClick } from '@/lib/gtm-tracking';

interface TrackedLinkProps {
  href: string;
  eventName: string;
  children: React.ReactNode;
  className?: string;
  buttonText?: string;
  linkText?: string;
  additionalData?: Record<string, any>;
}

/**
 * Tracked Link Component
 * Automatically tracks clicks to GTM dataLayer
 */
export function TrackedLink({
  href,
  eventName,
  children,
  className,
  buttonText,
  linkText,
  additionalData,
}: TrackedLinkProps) {
  const handleClick = () => {
    if (buttonText) {
      trackCTAClick(eventName, buttonText, href, additionalData);
    } else if (linkText) {
      trackLinkClick(eventName, linkText, href, additionalData);
    } else {
      trackCTAClick(eventName, 'Unknown', href, additionalData);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

interface TrackedButtonProps {
  onClick?: () => void;
  eventName: string;
  buttonText: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  additionalData?: Record<string, any>;
}

/**
 * Tracked Button Component
 * Automatically tracks clicks to GTM dataLayer
 */
export function TrackedButton({
  onClick,
  eventName,
  buttonText,
  children,
  className,
  type = 'button',
  disabled,
  additionalData,
}: TrackedButtonProps) {
  const handleClick = () => {
    trackCTAClick(eventName, buttonText, 'button_action', additionalData);
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
