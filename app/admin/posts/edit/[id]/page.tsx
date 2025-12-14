'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { getPostById, updatePost } from '@/lib/actions';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import MarkdownEditor from '@/components/MarkdownEditor';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Guides' as 'Savings' | 'Guides' | 'Location',
    coverImage: '',
    excerpt: '',
    body: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft' as 'published' | 'draft',
  });

  useEffect(() => {
    const loadPost = async () => {
      const post = await getPostById(resolvedParams.id);
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          category: post.category,
          coverImage: post.coverImage,
          excerpt: post.excerpt,
          body: post.body,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          status: post.status,
        });
      } else {
        setError('Post not found');
      }
      setIsLoading(false);
    };

    loadPost();
  }, [resolvedParams.id]);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    const result = await updatePost(resolvedParams.id, formDataObj);

    if (result.success) {
      router.push('/admin/posts');
      router.refresh();
    } else {
      setError(result.error || 'Failed to update post');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/posts"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Posts</span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <p className="text-gray-600">Update your blog article</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Title */}
          <Input
            label="Title *"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Enter post title"
            required
          />

          {/* Slug */}
          <Input
            label="Slug *"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="post-url-slug"
            required
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                category: e.target.value as 'Savings' | 'Guides' | 'Location'
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="Savings">Savings</option>
              <option value="Guides">Guides</option>
              <option value="Location">Location</option>
            </select>
          </div>

          {/* Cover Image URL */}
          <Input
            label="Cover Image URL"
            value={formData.coverImage}
            onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />

          {/* Excerpt */}
          <Textarea
            label="Excerpt *"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief summary of the post"
            rows={3}
            required
          />

          {/* Body Content - Markdown Editor */}
          <MarkdownEditor
            label="Body Content (Markdown)"
            value={formData.body}
            onChange={(value) => setFormData(prev => ({ ...prev, body: value }))}
            placeholder="Write your article content in Markdown..."
            rows={20}
            required
          />

          {/* SEO Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <Input
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="SEO title (defaults to post title)"
              />

              <Textarea
                label="Meta Description"
                value={formData.metaDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="SEO description (defaults to excerpt)"
                rows={3}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as 'published' | 'draft'
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? 'Updating...' : 'Update Post'}</span>
            </Button>
            <Link href="/admin/posts">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
