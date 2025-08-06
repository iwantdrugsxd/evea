'use client'
import { useAuth } from '@/contexts/AuthContext'
import { signOut } from '@/lib/auth'

export default function Dashboard() {
  const { user } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
          <p className="text-gray-600">User ID: {user?.id}</p>
        </div>
        
        {/* Add your app content here */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Your Content</h3>
          <p className="text-gray-600">Start building your app features here!</p>
        </div>
      </div>
    </div>
  )
}