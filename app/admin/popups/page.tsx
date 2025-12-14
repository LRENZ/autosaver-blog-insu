import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { getAllPopups, deletePopup, togglePopupStatus } from '@/lib/popup-actions'

export default async function PopupsPage() {
  const popups = await getAllPopups()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Popups</h1>
          <p className="text-gray-600 mt-1">Manage promotional popups and notifications</p>
        </div>
        <Link
          href="/admin/popups/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Popup
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trigger
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {popups.map((popup) => (
              <tr key={popup.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{popup.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{popup.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {popup.triggerType}
                    {popup.triggerValue && ` (${popup.triggerValue})`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{popup.displayPages}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <form action={async () => {
                    'use server'
                    await togglePopupStatus(popup.id)
                  }}>
                    <button
                      type="submit"
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        popup.status === 'active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      {popup.status === 'active' ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </button>
                  </form>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/popups/edit/${popup.id}`}
                      className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <form
                      action={async () => {
                        'use server'
                        await deletePopup(popup.id)
                      }}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                        onClick={(e) => {
                          if (!confirm('Are you sure you want to delete this popup?')) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {popups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No popups found. Create your first popup!</p>
          </div>
        )}
      </div>
    </div>
  )
}
