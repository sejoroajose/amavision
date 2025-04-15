import React from 'react'
import JobListItem from './JobListItem'

const JobList = ({ jobs, handleJobClick }) => {
  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  onClick={() => handleJobClick(job)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default JobList;