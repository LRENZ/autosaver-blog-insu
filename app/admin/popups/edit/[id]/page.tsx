import { notFound } from 'next/navigation'
import PopupForm from '@/components/admin/PopupForm'
import { getPopupById } from '@/lib/popup-actions'

export default async function EditPopupPage({ params }: { params: { id: string } }) {
  const popup = await getPopupById(params.id)

  if (!popup) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Popup</h1>
        <p className="text-gray-600 mt-1">Update popup content and settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <PopupForm popup={popup} />
      </div>
    </div>
  )
}
