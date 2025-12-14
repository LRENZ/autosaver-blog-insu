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
  triggerValue?: string
  displayPages: string
}

interface PopupProviderProps {
  popups: PopupData[]
}

export default function PopupProvider({ popups }: PopupProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {popups.map((popup) => (
        <Popup key={popup.id} {...popup} />
      ))}
    </>
  )
}
