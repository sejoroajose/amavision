import React, { useRef, useEffect } from 'react'
import { Menu } from '@headlessui/react'

const UserMenuItems = ({
  user,
  handleDownloadCV,
  handleLogout,
  onAvatarUpdate,
  onCVUpdate,
  uploading,
  downloading,
  error,
}) => {
  const cloudinaryRef = useRef(null)
  const avatarWidgetRef = useRef(null)
  const cvWidgetRef = useRef(null)

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    avatarWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dnu6az3um',
        uploadPreset: 'sesi_whingan_avataa_cv',
        maxFiles: 1,
        sources: ['local', 'camera'],
        resourceType: 'image',
      },
      function (error, result) {
        if (error) {
          console.error('Upload widget error:', error)
          return
        }

        if (result && result.event === 'success') {
          onAvatarUpdate(result.info.secure_url)
        }
      }
    )

    cvWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dnu6az3um',
        uploadPreset: 'sesi_whingan_avataa_cv',
        maxFiles: 1,
        sources: ['local'],
        resourceType: 'raw',
        accepted: ['.pdf', '.doc', '.docx'],
      },
      function (error, result) {
        if (error) {
          console.error('CV upload widget error:', error)
          return
        }

        if (result && result.event === 'success') {
          console.log('CV uploaded:', result.info.secure_url)
          onCVUpdate(result.info.secure_url)
        }
      }
    )
  }, [onAvatarUpdate, onCVUpdate])

  if (!user) {
    return (
      <div className="text-center p-4">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    )
  }

  const handleAvatarUpload = () => {
    avatarWidgetRef.current?.open()
  }

  const handleCVUpload = () => {
    cvWidgetRef.current?.open()
  }

  const hasAvatar = Boolean(user.avatar_url)
  const hasCV = Boolean(user.cv_url)

  return (
    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <Menu.Item>
        {({ active }) => (
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handleAvatarUpload}
            disabled={uploading}
            className={`block w-full px-4 py-2 text-sm ${
              uploading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            } text-center`}
          >
            {uploading
              ? 'Uploading...'
              : hasAvatar
              ? 'Change Avatar'
              : 'Upload Avatar'}
          </button>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handleCVUpload}
            disabled={uploading}
            className={`block w-full px-4 py-2 text-sm ${
              uploading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            } text-center`}
          >
            {uploading ? 'Uploading...' : hasCV ? 'Change CV' : 'Upload CV'}
          </button>
        )}
      </Menu.Item>

      {hasCV && (
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleDownloadCV}
              disabled={downloading}
              className={`block w-full px-4 py-2 text-sm ${
                downloading
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              } text-center`}
            >
              {downloading ? 'Downloading...' : 'Download CV'}
            </button>
          )}
        </Menu.Item>
      )}

      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
          >
            Sign out
          </button>
        )}
      </Menu.Item>
    </Menu.Items>
  )
}

export default UserMenuItems