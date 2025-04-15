import React, { useState, useEffect } from 'react'
import { Menu } from '@headlessui/react'

const UserMenuButton = ({ user, uploadedImageUrl }) => {
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    if (uploadedImageUrl) {
      setAvatarUrl(uploadedImageUrl)
    } else if (user?.avatar_url) {
      setAvatarUrl(user.avatar_url)
    } else {
      setAvatarUrl('https://via.placeholder.com/64')
    }
  }, [user, uploadedImageUrl])

  return (
    <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
      <span className="sr-only">Open user menu</span>
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={avatarUrl}
        alt={`${user?.firstName || 'User'}'s avatar`}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/64'
        }}
      />
    </Menu.Button>
  )
}

export default UserMenuButton