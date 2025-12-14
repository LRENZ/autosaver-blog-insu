'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { createPopup, updatePopup } from '@/lib/popup-actions'
import { Popup } from '@/lib/types'
import ImageUpload from '@/components/ImageUpload'

interface PopupFormProps {
  popup?: Popup
}

export default function PopupForm({ popup }: PopupFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: popup?.name || '',
    title: popup?.title || '',
    content: popup?.content || '',
    imageUrl: popup?.imageUrl || '',
    ctaText: popup?.ctaText || '',
    ctaUrl: popup?.ctaUrl || '',
    triggerType: popup?.triggerType || 'time' as const,
    triggerValue: popup?.triggerValue || '5',
    displayPages: popup?.displayPages || 'all',
    includePages: popup?.includePages || '',
    excludePages: popup?.excludePages || '',
    status: popup?.status || 'active' as const,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (popup) {
        await updatePopup(popup.id, formData)
      } else {
        await createPopup(formData)
      }
      router.push('/admin/popups')
    } catch (error) {
      console.error('Failed to save popup:', error)
      alert('Failed to save popup. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Internal Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="e.g., Spring Sale 2024"
        />
        <p className="mt-1 text-sm text-gray-500">For internal reference only</p>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Popup Title *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="e.g., ⏰ Your Exclusive Discount Expires Soon!"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>
        <textarea
          id="content"
          required
          rows={6}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-gray-900"
          placeholder="HTML content (supports basic tags like <p>, <strong>, <ul>, etc.)"
        />
        <p className="mt-1 text-sm text-gray-500">Supports HTML formatting</p>
      </div>

      {/* Image Upload */}
      <ImageUpload
        label="Popup Image (optional)"
        value={formData.imageUrl}
        onChange={(url) => setFormData({ ...formData, imageUrl: url })}
      />
      
      {/* Manual URL Input (Optional) */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Or enter image URL manually
        </label>
        <input
          type="url"
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* CTA Text & URL */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700 mb-2">
            CTA Button Text *
          </label>
          <input
            type="text"
            id="ctaText"
            required
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Get My Free Quote"
          />
        </div>
        <div>
          <label htmlFor="ctaUrl" className="block text-sm font-medium text-gray-700 mb-2">
            CTA URL *
          </label>
          <input
            type="url"
            id="ctaUrl"
            required
            value={formData.ctaUrl}
            onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="https://example.com/quote"
          />
        </div>
      </div>

      {/* Trigger Type & Value */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="triggerType" className="block text-sm font-medium text-gray-700 mb-2">
            Trigger Type *
          </label>
          <select
            id="triggerType"
            value={formData.triggerType}
            onChange={(e) => setFormData({ ...formData, triggerType: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="time">Time Delay</option>
            <option value="onload">On Page Load</option>
            <option value="scroll">Scroll Percentage</option>
            <option value="exit">Exit Intent</option>
          </select>
        </div>
        <div>
          <label htmlFor="triggerValue" className="block text-sm font-medium text-gray-700 mb-2">
            Trigger Value
          </label>
          <input
            type="number"
            id="triggerValue"
            value={formData.triggerValue}
            onChange={(e) => setFormData({ ...formData, triggerValue: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder={
              formData.triggerType === 'time' || formData.triggerType === 'onload'
                ? 'Seconds (e.g., 5)'
                : formData.triggerType === 'scroll'
                ? 'Percentage (e.g., 50)'
                : 'N/A'
            }
            min="0"
            max={formData.triggerType === 'scroll' ? 100 : 3600}
          />
          <p className="mt-1 text-xs text-gray-500">
            {formData.triggerType === 'time' || formData.triggerType === 'onload'
              ? '⏱️ Enter seconds (e.g., 5 = 5 seconds)'
              : formData.triggerType === 'scroll'
              ? '📊 Enter percentage (0-100)'
              : 'Trigger value for this type'}
          </p>
        </div>
      </div>

      {/* Display Pages (Legacy - kept for backwards compatibility) */}
      <div>
        <label htmlFor="displayPages" className="block text-sm font-medium text-gray-700 mb-2">
          Display on Pages (Legacy) *
        </label>
        <input
          type="text"
          id="displayPages"
          required
          value={formData.displayPages}
          onChange={(e) => setFormData({ ...formData, displayPages: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="all, home, blog, location, /custom-path"
        />
        <p className="mt-1 text-sm text-gray-500">
          Legacy field. Use Include/Exclude Pages below for more control.
        </p>
      </div>

      {/* Include Pages */}
      <div>
        <label htmlFor="includePages" className="block text-sm font-medium text-gray-700 mb-2">
          📌 Include Pages (Optional)
        </label>
        <input
          type="text"
          id="includePages"
          value={formData.includePages || ''}
          onChange={(e) => setFormData({ ...formData, includePages: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="/, /blog/*, /location/california"
        />
        <p className="mt-1 text-sm text-gray-500">
          ✅ Show popup ONLY on these pages. Supports wildcards: <code className="bg-gray-100 px-1 rounded">/*</code> means all sub-paths. Leave empty to use legacy displayPages.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Examples: <code className="bg-gray-100 px-1 rounded">/</code> (home only), 
          <code className="bg-gray-100 px-1 rounded ml-1">/blog/*</code> (all blog posts), 
          <code className="bg-gray-100 px-1 rounded ml-1">*</code> (all pages)
        </p>
      </div>

      {/* Exclude Pages */}
      <div>
        <label htmlFor="excludePages" className="block text-sm font-medium text-gray-700 mb-2">
          🚫 Exclude Pages (Optional)
        </label>
        <input
          type="text"
          id="excludePages"
          value={formData.excludePages || ''}
          onChange={(e) => setFormData({ ...formData, excludePages: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="/admin/*, /login"
        />
        <p className="mt-1 text-sm text-gray-500">
          ❌ NEVER show popup on these pages. Takes priority over include rules. Supports wildcards.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Examples: <code className="bg-gray-100 px-1 rounded">/admin/*</code> (all admin pages), 
          <code className="bg-gray-100 px-1 rounded ml-1">/checkout</code> (checkout page), 
          <code className="bg-gray-100 px-1 rounded ml-1">*</code> (nowhere)
        </p>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          Status *
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Saving...' : popup ? 'Update Popup' : 'Create Popup'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
