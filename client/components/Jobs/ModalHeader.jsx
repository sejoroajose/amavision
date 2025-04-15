import React from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const ModalHeader = ({ title, onClose }) => (
  <div className="flex justify-between items-start">
    <Dialog.Title className="text-2xl font-bold text-gray-900">
      {title}
    </Dialog.Title>
    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
      <XMarkIcon className="h-6 w-6" />
    </button>
  </div>
)

export default ModalHeader
