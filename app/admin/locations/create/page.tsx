'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { createLocation } from '@/lib/location-actions';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';

export default function CreateLocationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    state: '',
    description: '',
    averageRate: '',
  });

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData(prev => ({ ...prev, name, slug }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    const result = await createLocation(formDataObj);

    if (result.success) {
      router.push('/admin/locations');
      router.refresh();
    } else {
      setError(result.error || 'Failed to create location');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/locations"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Locations</span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Location</h1>
        <p className="text-gray-600">Create a new location page</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Name */}
          <Input
            label="Location Name *"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="e.g., California"
            required
          />

          {/* Slug */}
          <Input
            label="Slug *"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="california"
            required
          />

          {/* State Abbreviation */}
          <Input
            label="State Abbreviation *"
            value={formData.state}
            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value.toUpperCase() }))}
            placeholder="CA"
            maxLength={2}
            required
          />

          {/* Description */}
          <Textarea
            label="Description *"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Find the best car insurance rates in..."
            rows={3}
            required
          />

          {/* Average Rate */}
          <Input
            label="Average Rate *"
            value={formData.averageRate}
            onChange={(e) => setFormData(prev => ({ ...prev, averageRate: e.target.value }))}
            placeholder="$1,868/year"
            required
          />

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? 'Creating...' : 'Create Location'}</span>
            </Button>
            <Link href="/admin/locations">
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
