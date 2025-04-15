import React from 'react'

const JobListItem = ({ job, onClick }) => {
  return (
    <li
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out"
      onClick={onClick}
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <div className="ml-2 flex-shrink-0">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {job.status || 'Active'}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-left text-gray-600 line-clamp-2">
            {job.description}
          </p>
        </div>
        <div className="mt-2 text-left font-bold text-sm text-gray-500">
          Posted on {new Date(job.createdAt).toLocaleDateString()}
        </div>
      </div>
    </li>
  )
}

export default JobListItem
