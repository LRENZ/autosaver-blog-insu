'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

interface PopupProps {
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

export default function Popup({
  id,
  title,
  content,
  imageUrl,
  ctaText,
  ctaUrl,
  triggerType,
  triggerValue,
  displayPages
}: PopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem(`popup_${id}_shown`)
    if (shown) return

    // Check if current page matches display rules
    const currentPath = window.location.pathname
    const pages = displayPages.split(',').map(p => p.trim())
    const shouldDisplay = pages.includes('all') || pages.some(page => {
      if (page === 'home' && currentPath === '/') return true
      if (page === 'blog' && currentPath.startsWith('/blog')) return true
      if (page === 'location' && currentPath.startsWith('/location')) return true
      return currentPath === page
    })

    if (!shouldDisplay) return
    setShouldShow(true)

    // Handle different trigger types
    switch (triggerType) {
      case 'onload':
        const delay = triggerValue || 0
        setTimeout(() => setIsOpen(true), delay * 1000)
        break

      case 'time':
        const timeDelay = triggerValue || 5
        setTimeout(() => setIsOpen(true), timeDelay * 1000)
        break

      case 'scroll':
        const handleScroll = () => {
          const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
          const threshold = triggerValue || 50
          if (scrollPercent >= threshold) {
            setIsOpen(true)
            window.removeEventListener('scroll', handleScroll)
          }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

      case 'exit':
        const handleExit = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            setIsOpen(true)
            document.removeEventListener('mouseleave', handleExit)
          }
        }
        document.addEventListener('mouseleave', handleExit)
        return () => document.removeEventListener('mouseleave', handleExit)
    }
  }, [id, triggerType, triggerValue, displayPages])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem(`popup_${id}_shown`, 'true')
  }

  const handleCTA = () => {
    sessionStorage.setItem(`popup_${id}_shown`, 'true')
    window.location.href = ctaUrl
  }

  if (!shouldShow || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Image Section */}
        {imageUrl && (
          <div className="relative w-full h-48 bg-gradient-to-br from-blue-600 to-blue-800">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h3>
          <div 
            className="text-gray-600 mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CTA Button */}
          <button
            onClick={handleCTA}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {ctaText}
          </button>

          {/* Close Text Link */}
          <button
            onClick={handleClose}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4 transition-colors"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
