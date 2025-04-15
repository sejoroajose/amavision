import React, { useState, useEffect, useRef } from 'react'
import { Menu } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import NotificationButton from './NotificationButton'
import UserMenuButton from './UserMenuButton'
import UserMenuItems from './UserMenuItems'

const UserMenu = ({ setGlobalUser }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [localUser, setLocalUser] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [downloading, setDownloading] = useState(false)

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com/api'
      : 'http://localhost:8080/api'

  const cloudinaryRef = useRef(null)
  const widgetRef = useRef(null)
  const cvWidgetRef = useRef(null)

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dnu6az3um',
        uploadPreset: 'sesi_whingan_avataa_cv',
      },
      async function (error, result) {
        if (!error && result && result.event === 'success') {
          setUploading(true)
          const imageUrl = result.info.secure_url
          await handleAvatarUpdate(imageUrl)
          setUploading(false)
        }
      }
    )
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    if (setGlobalUser) setGlobalUser(null)
    navigate('/career/login')
  }

  const fetchUser = async () => {
    try {
      if (!token) {
        console.error('No token available')
        return
      }

      const response = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user: ${response.status} ${response.statusText}`
        )
      }

      const userData = await response.json()
      setLocalUser(userData)
      if (setGlobalUser) setGlobalUser(userData)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const handleCVUpdate = async (newCVUrl) => {
    setUploading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cv_url: newCVUrl,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update CV')
      }

      const updatedUser = await response.json()
      setLocalUser(updatedUser)
      if (setGlobalUser) {
        setGlobalUser(updatedUser)
      }
      console.log('CV updated successfully:', updatedUser)
    } catch (error) {
      console.error('Error updating CV:', error)
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleAvatarUpdate = async (newAvatarUrl) => {
    setUploading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar_url: newAvatarUrl,
        }),
      })

      const responseText = await response.text()

      if (!response.ok) {
        const errorData = responseText ? JSON.parse(responseText) : {}
        throw new Error(errorData.error || 'Failed to update avatar')
      }

      const updatedUser = responseText ? JSON.parse(responseText) : null

      if (updatedUser) {
        updatedUser.hasAvatar = !!updatedUser.avatar_url
        setLocalUser(updatedUser)
        if (setGlobalUser) {
          setGlobalUser(updatedUser)
        }
        console.log('Avatar updated successfully:', updatedUser)
      }
    } catch (error) {
      setError(error.message)
      console.error('Error updating avatar:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDownloadCV = async () => {
    if (!localUser?.cv_url) {
      setError('No CV available for download')
      return
    }

    try {
      setDownloading(true)

      const link = document.createElement('a')

      link.href = `${API_URL}/user/cv`

      const response = await fetch(link.href, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to download CV')
      }

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)

      link.href = url
      link.download = `CV_${localUser.firstName}_${localUser.lastName}.pdf` 

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading CV:', error)
      setError('Failed to download CV. Please try again.')
    } finally {
      setDownloading(false)
    }
  }


  const handleUpload = () => {
    widgetRef.current.open()
  }

  useEffect(() => {
    fetchUser()
  }, [])

  console.log('handleAvatarUpdate function:', handleAvatarUpdate)

  return (
    <div className="md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <NotificationButton />
        <Menu as="div" className="ml-3 relative">
          <UserMenuButton user={localUser} uploading={uploading} />
          <UserMenuItems
            user={localUser}
            token={token}
            handleDownloadCV={handleDownloadCV}
            handleLogout={handleLogout}
            onAvatarUpdate={handleAvatarUpdate}
            onCVUpdate={handleCVUpdate}
            uploading={uploading}
            downloading={downloading}
            error={error}
          />
        </Menu>
      </div>
      {error && (
        <div
          className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  )
}

export default UserMenu
