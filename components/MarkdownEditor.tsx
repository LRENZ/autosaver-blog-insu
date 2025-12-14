'use client'

import { useState } from 'react'
import MarkdownRenderer from './MarkdownRenderer'
import { Eye, Edit } from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  rows?: number
  required?: boolean
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your content in Markdown...',
  label,
  rows = 20,
  required = false
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setIsPreview(false)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            !isPreview
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Edit className="w-4 h-4 inline-block mr-2" />
          Write
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            isPreview
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Eye className="w-4 h-4 inline-block mr-2" />
          Preview
        </button>
      </div>

      {/* Editor/Preview Area */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {!isPreview ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            required={required}
            placeholder={placeholder}
            className="w-full px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        ) : (
          <div className="p-4 bg-white min-h-[300px]">
            {value ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-gray-400 italic">Nothing to preview yet. Start writing!</p>
            )}
          </div>
        )}
      </div>

      {/* Markdown Syntax Help */}
      <details className="text-sm text-gray-600">
        <summary className="cursor-pointer hover:text-gray-800 font-medium">
          Markdown Syntax Guide
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg space-y-2">
          <p><code className="bg-gray-200 px-2 py-1 rounded"># Heading 1</code> - Large heading</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">## Heading 2</code> - Medium heading</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">**bold text**</code> - <strong>Bold text</strong></p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">*italic text*</code> - <em>Italic text</em></p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">[Link](url)</code> - Create link</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">![Alt](image.jpg)</code> - Insert image</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">- Item</code> - Bullet list</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">1. Item</code> - Numbered list</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">`code`</code> - Inline code</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">```code block```</code> - Code block</p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">&gt; Quote</code> - Blockquote</p>
        </div>
      </details>
    </div>
  )
}
