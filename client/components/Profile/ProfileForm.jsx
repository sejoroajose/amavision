import React, { useState, useEffect } from 'react'

const ProfileForm = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    stateOfOrigin: '',
    professionalSummary: '',
    preferredRole: '',
    yearsOfExperience: '',
    employmentStatus: '',
    currentCompany: '',
    currentRole: '',
    noticePeriod: '',
    expectedSalary: '',
    location: '',
    willingToRelocate: false,
    workPreference: '',
    skills: '',
    education: '',
    certifications: '',
    linkedInProfile: '',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com/api'
      : 'http://localhost:8080/api'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await response.json()

        if (response.ok) {
          // Update all form fields with the retrieved data
          setProfileData((prevData) => ({
            ...prevData,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            dateOfBirth: data.dateOfBirth || '',
            stateOfOrigin: data.stateOfOrigin || '',
            professionalSummary: data.professionalSummary || '',
            preferredRole: data.preferredRole || '',
            yearsOfExperience: data.yearsOfExperience || '',
            employmentStatus: data.employmentStatus || 'seeking',
            currentCompany: data.currentCompany || '',
            currentRole: data.currentRole || '',
            noticePeriod: data.noticePeriod || '',
            expectedSalary: data.expectedSalary || '',
            location: data.location || '',
            willingToRelocate: data.willingToRelocate || false,
            workPreference: data.workPreference || 'full-time',
            skills: data.skills || '',
            education: data.education || '',
            certifications: data.certifications || '',
            linkedInProfile: data.linkedInProfile || '',
          }))
        } else {
          setError(data.error || 'Failed to fetch user details')
        }
      } catch (error) {
        setError('Error fetching user details. Please try again later.')
        console.error('Error fetching user details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [API_URL])

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setProfileData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        alert('Profile updated successfully')
      } else {
        const errorData = await response.json()
        alert(`Failed to update profile: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again later.')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
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
                  readOnly
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State Of Orign
                </label>
                <input
                  type="Text"
                  name="stateOfOrigin"
                  value={profileData.stateOfOrigin}
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
}

export default ProfileForm
