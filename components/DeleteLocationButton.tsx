'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deleteLocation } from '@/lib/location-actions';
import Button from './Button';

interface DeleteLocationButtonProps {
  locationId: string;
}

export default function DeleteLocationButton({ locationId }: DeleteLocationButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteLocation(locationId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Failed to delete location');
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4" />
      <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
    </Button>
  );
}
