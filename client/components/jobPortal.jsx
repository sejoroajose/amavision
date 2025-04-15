import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from './Header/Navigation'
import UserMenu from './Header/UserMenu'
import JobList from './Jobs/JobList'
import JobModal from './Jobs/JobModal'
import ProfileForm from './Profile/ProfileForm'


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
    console.log('Navigating to /login')
    setUser(null) 
    navigate('/login')
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

  const navigation = [
    { name: 'Current Openings', tab: 'openings' },
    { name: 'Profile', tab: 'profile' },
  ]

  return (
    <div className="min-h-full mt-24 w-3/4 mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-custom-orange font-neuemachina">
        Job Portal
      </h1>
      <p className="text-2xl tracking-tight text-custom-green font-cabinetGrotesk">
        Explore the world of many opportunities...
      </p>

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />

      

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {activeTab === 'openings'
              ? 'Current Openings'
              : 'Profile Management'}
          </h1>

          <main>
            {activeTab === 'openings' ? (
              <JobList jobs={jobs} handleJobClick={handleJobClick} />
            ) : (
              <ProfileForm
                profileData={profileData}
                handleInputChange={handleInputChange}
                handleProfileSubmit={handleProfileSubmit}
              />
            )}
          </main>
        </div>
      </header>

      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleApply={handleApply}
      />
    </div>
  )
}

export default JobPortal