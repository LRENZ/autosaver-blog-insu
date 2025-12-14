import Link from 'next/link';
import { FileText, Eye, PlusCircle, TrendingUp } from 'lucide-react';
import { getAllPosts } from '@/lib/actions';
import { requireAuth } from '@/lib/server-auth';
import Button from '@/components/Button';

export default async function AdminDashboard() {
  // Server-side authentication check
  await requireAuth();
  
  const posts = await getAllPosts();
  const publishedPosts = posts.filter(p => p.status === 'published');
  const draftPosts = posts.filter(p => p.status === 'draft');

  const stats = [
    {
      name: 'Total Posts',
      value: posts.length,
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Published',
      value: publishedPosts.length,
      icon: Eye,
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'Drafts',
      value: draftPosts.length,
      icon: FileText,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      name: 'This Month',
      value: posts.filter(p => {
        const thisMonth = new Date().getMonth();
        return new Date(p.createdAt).getMonth() === thisMonth;
      }).length,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
            <div className="text-sm text-gray-600">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/posts/create">
            <Button className="flex items-center space-x-2">
              <PlusCircle className="w-5 h-5" />
              <span>Create New Post</span>
            </Button>
          </Link>
          <Link href="/admin/posts">
            <Button variant="secondary" className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>View All Posts</span>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>View Website</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
        </div>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.slice(0, 5).map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
