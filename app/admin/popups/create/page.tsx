import PopupForm from '@/components/admin/PopupForm'
import { requireAuth } from '@/lib/server-auth'

export default async function CreatePopupPage() {
  await requireAuth()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Popup</h1>
        <p className="text-gray-600 mt-1">Design a promotional popup for your website</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <PopupForm />
      </div>
    </div>
  )
}
