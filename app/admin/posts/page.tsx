import Link from 'next/link';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { getAllPosts } from '@/lib/actions';
import { requireAuth } from '@/lib/server-auth';
import Button from '@/components/Button';
import DeletePostButton from '@/components/DeletePostButton';

export default async function AdminPostsPage() {
  await requireAuth();
  const posts = await getAllPosts();

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Posts</h1>
          <p className="text-gray-600">Manage your blog articles</p>
        </div>
        <Link href="/admin/posts/create">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5" />
            <span>Create New Post</span>
          </Button>
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No posts yet. Create your first post!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">{post.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/admin/posts/edit/${post.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="inline-flex items-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </Button>
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
