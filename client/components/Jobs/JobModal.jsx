import React from 'react'
import { Dialog } from '@headlessui/react'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'

const JobModal = ({ job, isOpen, onClose, handleApply }) => {
  if (!job) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white w-full">
          <div className="sticky top-0  z-10 p-6 border-b">
            <ModalHeader title={job.title} onClose={onClose} />
          </div>

          <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
            <ModalContent job={job} handleApply={handleApply} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default JobModal
