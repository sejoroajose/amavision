import React from 'react'

const ModalContent = ({ job, handleApply }) => (
  <div className="mt-4">
    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
    <p className="text-gray-600 mb-4">{job.description}</p>

    <h3 className="text-lg font-medium text-gray-900 mb-2">Requirements</h3>
    <ul className="list-disc pl-5 mb-6">
      {job.Requirements.map((req, index) => (
        <li key={index} className="text-gray-600 mb-2">
          {req.requirement}
        </li>
      ))}
    </ul>

    <div className="flex justify-between items-center mt-6 pt-4 border-t">
      <div className="text-sm text-gray-500">
        Posted: {new Date(job.createdAt).toLocaleDateString()}
      </div>
      <button
        onClick={() => handleApply(job.applicationUrl)}
        className="bg-custom-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
      >
        Apply Now
      </button>
    </div>
  </div>
)

export default ModalContent
