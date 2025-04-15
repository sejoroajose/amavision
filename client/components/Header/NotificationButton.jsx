import React from 'react'
import { BellIcon } from '@heroicons/react/24/outline'

const NotificationButton = () => {
  return (
    <button
      type="button"
      className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}

export default NotificationButton
