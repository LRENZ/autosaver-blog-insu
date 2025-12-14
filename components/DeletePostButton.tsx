'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deletePost } from '@/lib/actions';
import Button from './Button';

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    const result = await deletePost(postId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Failed to delete post');
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="danger"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center space-x-1"
    >
      <Trash2 className="w-4 h-4" />
      <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
    </Button>
  );
}
