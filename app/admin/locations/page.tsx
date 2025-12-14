import Link from 'next/link';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { getAllLocations } from '@/lib/location-actions';
import Button from '@/components/Button';
import DeleteLocationButton from '@/components/DeleteLocationButton';

export default async function AdminLocationsPage() {
  const locations = await getAllLocations();

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Locations</h1>
          <p className="text-gray-600">Manage location-specific content</p>
        </div>
        <Link href="/admin/locations/create">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5" />
            <span>Add New Location</span>
          </Button>
        </Link>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Rate
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No locations yet. Add your first location!
                  </td>
                </tr>
              ) : (
                locations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-500">{location.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {location.state}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {location.averageRate}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/admin/locations/edit/${location.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="inline-flex items-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </Button>
                      </Link>
                      <DeleteLocationButton locationId={location.id} />
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
