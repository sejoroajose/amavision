/* import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Menu, Disclosure, MenuButton, MenuItems, MenuItem, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const JobPortal = () => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('openings')
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phone: '',
    professionalSummary: '',
    preferredRole: '',
    yearsOfExperience: '',
    employmentStatus: 'seeking',
    currentCompany: '',
    currentRole: '',
    expectedSalary: '',
    location: '',
    willingToRelocate: false,
    skills: '',
    education: '',
    certifications: '',
    linkedInProfile: '',
    workPreference: 'full-time',
    noticePeriod: '',
  })
  const navigate = useNavigate()

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com/api'
      : 'http://localhost:8080/api'

  useEffect(() => {
    fetchJobs()
    fetchUser()
  }, [])

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error('Failed to fetch jobs')
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error('Failed to fetch user')
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleFileUpload = async (event, fileType) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append(fileType, file)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
      if (!response.ok) throw new Error('Failed to upload file')
      await fetchUser()
    } catch (error) {
      console.error(`Error uploading ${fileType}:`, error)
    }
  }

  const handleDownloadCV = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/cv/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error('Failed to download CV')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `${user.firstName}_${user.lastName}_CV.${user.cvMimeType.split('/')[1]}`
      )
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading CV:', error)
    }
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleApply = (applicationUrl) => {
    window.open(applicationUrl, '_blank', 'noopener noreferrer')
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      })
      if (!response.ok) throw new Error('Failed to update profile')
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

                                           
 const JobListings = () => (
   <main>
     <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
       <div className="px-4 py-6 sm:px-0">
         <div className="overflow-hidden bg-white shadow sm:rounded-lg">
           <ul className="divide-y divide-gray-200">
             {jobs.map((job) => (
               <li
                 key={job.id}
                 className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out"
                 onClick={() => handleJobClick(job)}
               >
                 <div className="px-4 py-4 sm:px-6">
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-medium text-gray-900">
                       {job.title}
                     </h3>
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
             ))}
           </ul>
         </div>
       </div>
     </div>
   </main>
 )

  const ProfileForm = () => (
    <div className="max-w-4xl mx-auto py-6">
      <form onSubmit={handleProfileSubmit} className="space-y-6">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Professional Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Professional Summary
                </label>
                <textarea
                  name="professionalSummary"
                  value={profileData.professionalSummary}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Role
                </label>
                <input
                  type="text"
                  name="preferredRole"
                  value={profileData.preferredRole}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={profileData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Employment Status
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Status
              </label>
              <select
                name="employmentStatus"
                value={profileData.employmentStatus}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="seeking">Actively Seeking Employment</option>
                <option value="employed-looking">
                  Employed, Looking for Better Opportunities
                </option>
                <option value="employed-not-looking">
                  Employed, Not Currently Looking
                </option>
              </select>
            </div>
            {profileData.employmentStatus.includes('employed') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Company
                  </label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={profileData.currentCompany}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Role
                  </label>
                  <input
                    type="text"
                    name="currentRole"
                    value={profileData.currentRole}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notice Period (in days)
                  </label>
                  <input
                    type="number"
                    name="noticePeriod"
                    value={profileData.noticePeriod}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Additional Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expected Salary (Annual)
              </label>
              <input
                type="number"
                name="expectedSalary"
                value={profileData.expectedSalary}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Location
              </label>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="willingToRelocate"
                checked={profileData.willingToRelocate}
                onChange={handleInputChange}
                className="h-4 w-4 text-custom-green border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Willing to Relocate
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Preference
              </label>
              <select
                name="workPreference"
                value={profileData.workPreference}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={profileData.skills}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <textarea
                name="education"
                value={profileData.education}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
                placeholder="List your educational qualifications"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certifications
              </label>
              <textarea
                name="certifications"
                value={profileData.certifications}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="List any relevant certifications"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedInProfile"
                value={profileData.linkedInProfile}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  )

  const navigation = [
    { name: 'Current Openings', tab: 'openings' },
    { name: 'Profile', tab: 'profile' },
  ]

  const JobModal = ({ job, isOpen, onClose }) => {
    if (!job) return null

    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white p-6 w-full">
            <div className="flex justify-between items-start mb-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {job.title}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 mb-4">{job.description}</p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Requirements
              </h3>
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
          </Dialog.Panel>
        </div>
      </Dialog>
    )
  }

  return (
    <div className="min-h-full mt-24 w-3/4 mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-custom-orange font-neuemachina">
        Job Portal
      </h1>
      <p className="text-2xl tracking-tight text-custom-green font-cabinetGrotesk">
        Explore the world of many opportunities...
      </p>

      <Disclosure as="nav" className="bg-custom-white mt-8">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setActiveTab(item.tab)}
                          className={`${
                            activeTab === item.tab
                              ? 'bg-custom-green text-custom-white'
                              : 'text-gray-300 hover:bg-custom-green hover:text-white'
                          } rounded-md px-3 py-2 text-sm font-medium`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <MenuButton className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              user?.hasAvatar
                                ? `${API_URL}/avatar/${user.id}`
                                : 'https://via.placeholder.com/64'
                            }
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          <div className="px-4 py-3">
                            <p className="text-sm font-medium text-gray-900">
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            {user?.hasAvatar
                              ? 'Change Avatar'
                              : 'Upload Avatar'}
                            <input
                              type="file"
                              accept="image/jpeg,image/png"
                              onChange={(e) => handleFileUpload(e, 'avatar')}
                              className="hidden"
                            />
                          </label>
                        </MenuItem>
                        <MenuItem>
                          <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            {user?.hasCv ? 'Change CV' : 'Upload CV'}
                            <input
                              type="file"
                              accept=".pdf,.docx"
                              onChange={(e) => handleFileUpload(e, 'cv')}
                              className="hidden"
                            />
                          </label>
                        </MenuItem>
                        {user?.hasCv && (
                          <MenuItem>
                            <button
                              onClick={handleDownloadCV}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Download CV
                            </button>
                          </MenuItem>
                        )}
                        <MenuItem>
                          <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Sign out
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
            <DisclosurePanel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    onClick={() => setActiveTab(item.tab)}
                    className={`${
                      activeTab === item.tab
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {activeTab === 'openings'
              ? 'Current Openings'
              : 'Profile Management'}
          </h1>

          <main>
            {activeTab === 'openings' ? <JobListings /> : <ProfileForm />}
          </main>
        </div>
      </header>

      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default JobPortal
 */
