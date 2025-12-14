'use client'

import { useEffect, useState } from 'react'
import Popup from './Popup'

interface PopupData {
  id: string
  title: string
  content: string
  imageUrl?: string
  ctaText: string
  ctaUrl: string
  triggerType: 'onload' | 'exit' | 'scroll' | 'time'
  triggerValue?: number
  displayPages: string
}

interface PopupProviderProps {
  popups: PopupData[]
}

export default function PopupProvider({ popups }: PopupProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log('[PopupProvider] Mounting, received popups:', popups);
    console.log('[PopupProvider] Number of popups:', popups.length);
    setMounted(true)
  }, [popups])

  if (!mounted) {
    console.log('[PopupProvider] Not mounted yet, waiting...');
    return null;
  }

  console.log('[PopupProvider] Rendering', popups.length, 'popups');

  return (
    <>
      {popups.map((popup) => (
        <Popup key={popup.id} {...popup} />
      ))}
    </>
  )
}
