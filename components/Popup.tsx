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
  includePages?: string
  excludePages?: string
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
  displayPages,
  includePages,
  excludePages
}: PopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    console.log('[Popup] Initializing popup:', { id, title, triggerType, triggerValue, displayPages });
    
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem(`popup_${id}_shown`)
    if (shown) {
      console.log('[Popup] Already shown in this session, skipping:', id);
      return;
    }

    // Check if current page matches display rules
    const currentPath = window.location.pathname
    console.log('[Popup] Current path:', currentPath);
    
    // Check exclude pages first (highest priority)
    if (excludePages) {
      const excludedPaths = excludePages.split(',').map(p => p.trim())
      console.log('[Popup] Exclude pages:', excludedPaths);
      
      const isExcluded = excludedPaths.some(page => {
        if (page === '*') return true // Exclude all
        if (page.endsWith('/*')) {
          // Wildcard exclude: /admin/* excludes all /admin/... paths
          const prefix = page.slice(0, -2)
          return currentPath.startsWith(prefix)
        }
        return currentPath === page || currentPath.startsWith(page + '/')
      })
      
      if (isExcluded) {
        console.log('[Popup] Page is excluded, skipping:', id);
        return
      }
    }
    
    // Check include pages (if specified)
    if (includePages) {
      const includedPaths = includePages.split(',').map(p => p.trim())
      console.log('[Popup] Include pages:', includedPaths);
      
      const isIncluded = includedPaths.some(page => {
        if (page === '*') return true // Include all
        if (page === '/') return currentPath === '/' // Exact home page
        if (page.endsWith('/*')) {
          // Wildcard include: /blog/* includes all /blog/... paths
          const prefix = page.slice(0, -2)
          return currentPath.startsWith(prefix)
        }
        return currentPath === page || currentPath.startsWith(page + '/')
      })
      
      if (!isIncluded) {
        console.log('[Popup] Page is not included, skipping:', id);
        return
      }
      
      console.log('[Popup] Page is included');
    } else {
      // Legacy displayPages logic (backwards compatibility)
      const pages = displayPages.split(',').map(p => p.trim())
      console.log('[Popup] Display pages config (legacy):', pages);
      
      const shouldDisplay = pages.includes('all') || pages.some(page => {
        if (page === 'home' && currentPath === '/') return true
        if (page === 'blog' && currentPath.startsWith('/blog')) return true
        if (page === 'location' && currentPath.startsWith('/location')) return true
        return currentPath === page
      })

      console.log('[Popup] Should display (legacy):', shouldDisplay);
      
      if (!shouldDisplay) {
        console.log('[Popup] Page does not match display rules, skipping:', id);
        return;
      }
    }
    
    setShouldShow(true)
    console.log('[Popup] Setting shouldShow to true');

    // Handle different trigger types
    switch (triggerType) {
      case 'onload':
        const delay = triggerValue || 0
        console.log('[Popup] Onload trigger, delay:', delay, 'seconds');
        setTimeout(() => {
          console.log('[Popup] Opening popup (onload):', id);
          setIsOpen(true);
        }, delay * 1000)
        break

      case 'time':
        const timeDelay = triggerValue || 5
        console.log('[Popup] Time trigger, delay:', timeDelay, 'seconds');
        setTimeout(() => {
          console.log('[Popup] Opening popup (time):', id);
          setIsOpen(true);
        }, timeDelay * 1000)
        break

      case 'scroll':
        console.log('[Popup] Scroll trigger, threshold:', triggerValue || 50, '%');
        const handleScroll = () => {
          const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
          const threshold = triggerValue || 50
          console.log('[Popup] Scroll progress:', scrollPercent.toFixed(2), '% / threshold:', threshold, '%');
          if (scrollPercent >= threshold) {
            console.log('[Popup] Opening popup (scroll):', id);
            setIsOpen(true)
            window.removeEventListener('scroll', handleScroll)
          }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

      case 'exit':
        console.log('[Popup] Exit intent trigger');
        const handleExit = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            console.log('[Popup] Opening popup (exit intent):', id);
            setIsOpen(true)
            document.removeEventListener('mouseleave', handleExit)
          }
        }
        document.addEventListener('mouseleave', handleExit)
        return () => document.removeEventListener('mouseleave', handleExit)
    }
  }, [id, title, triggerType, triggerValue, displayPages])

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
              unoptimized={imageUrl.includes('blob.vercel-storage.com')}
              onError={(e) => {
                console.error('[Popup] Image load error:', imageUrl);
                // Hide image on error
                (e.target as HTMLImageElement).style.display = 'none';
              }}
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
