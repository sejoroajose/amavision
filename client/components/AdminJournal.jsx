import React, { useState, useEffect } from 'react'
import {
  FileEditIcon,
  PlusIcon,
  TrashIcon,
  NewspaperIcon,
  HomeIcon,
  LogOutIcon,
  CalendarIcon,
  ImageIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sesi-new.onrender.com'
    : 'http://localhost:8080'

const AdminJournalDashboard = () => {
  const [journalList, setJournalList] = useState([])
  const [selectedJournal, setSelectedJournal] = useState(null)
  const [formMode, setFormMode] = useState('create')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    media: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dnu6az3um',
          uploadPreset: 'sesi_whingan_avataa_cv',
          multiple: true,
          maxFiles: 5,
          folder: 'sesi-journal',
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            setFormData((prev) => ({
              ...prev,
              media: [...prev.media, result.info.secure_url],
            }))
          }
        }
      )
      setCloudinaryWidget(widget)
    }
  }, [])

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${API_URL}/api/journals?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()
        setJournalList(data.journals)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('Error fetching journals:', error)
      }
    }

    fetchJournals()
  }, [currentPage])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRemoveMedia = (mediaToRemove) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((media) => media !== mediaToRemove),
    }))
  }

  const openCloudinaryWidget = () => {
    if (cloudinaryWidget) {
      cloudinaryWidget.open()
    }
  }

  const handleCreateJournal = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date.toISOString().split('T')[0],
        }),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          title: '',
          description: '',
          date: new Date(),
          media: [],
        })

        // Update journal list
        const updatedResponse = await fetch(
          `${API_URL}/api/journals?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const updatedData = await updatedResponse.json()
        setJournalList(updatedData.journals)

        // Show success popup
        window.alert('Journal publishing successful!')

        // Close sidebar on mobile after action
        setSidebarOpen(false)
      }
    } catch (error) {
      console.error('Error creating journal:', error)
    }
  }

  const handleUpdateJournal = async (e) => {
    e.preventDefault()
    if (!selectedJournal) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${API_URL}/api/journals/${selectedJournal.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            date: formData.date.toISOString().split('T')[0],
          }),
        }
      )

      if (response.ok) {
        const updatedResponse = await fetch(
          `${API_URL}/api/journals?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const updatedData = await updatedResponse.json()
        setJournalList(updatedData.journals)

        setSelectedJournal(null)
        setFormMode('create')
        setFormData({
          title: '',
          description: '',
          date: new Date(),
          media: [],
        })

        window.alert('Journal update successful!')

        // Close sidebar on mobile after action
        setSidebarOpen(false)
      }
    } catch (error) {
      console.error('Error updating journal:', error)
    }
  }

  const handleDeleteJournal = async (id) => {
    // Confirm before deletion
    const confirmed = window.confirm(
      'Are you sure you want to delete this journal?'
    )
    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/journals/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const updatedResponse = await fetch(
          `${API_URL}/api/journals?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const updatedData = await updatedResponse.json()
        setJournalList(updatedData.journals)

        // Optionally show a delete success message
        window.alert('Journal deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting journal:', error)
    }
  }

  const prepareEditJournal = (journal) => {
    setSelectedJournal(journal)
    setFormMode('edit')
    setFormData({
      title: journal.title,
      description: journal.description,
      date: new Date(journal.date),
      media: journal.media || [],
    })

    // On mobile, show sidebar with form when editing
    if (window.innerWidth < 768) {
      setSidebarOpen(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin')
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-100 relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded bg-base-300 text-custom-green"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar - hidden on mobile unless toggled */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static top-0 left-0 z-20 w-64 h-full bg-base-200 p-6 border-r border-base-300 transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="mb-10 pt-10 md:pt-0">
          <h2 className="text-2xl font-bold text-custom-orange">
            Admin Dashboard
          </h2>
        </div>

        <nav className="space-y-2">
          <button
            className="flex items-center w-full p-3 rounded hover:bg-base-300 transition-colors text-custom-green"
            onClick={() => {
              setFormMode('create')
              setSelectedJournal(null)
              setFormData({
                title: '',
                description: '',
                date: new Date(),
                media: [],
              })
              if (window.innerWidth < 768) {
                setSidebarOpen(false)
              }
            }}
          >
            <PlusIcon className="mr-2" /> Create Journal
          </button>

          <button
            className="flex items-center w-full p-3 rounded hover:bg-base-300 transition-colors text-custom-green"
            onClick={() => {
              navigate('/admin/dashboard')
              if (window.innerWidth < 768) {
                setSidebarOpen(false)
              }
            }}
          >
            <NewspaperIcon className="mr-2" /> Manage News
          </button>

          <button
            className="flex items-center w-full p-3 rounded hover:bg-base-300 transition-colors text-custom-green"
            onClick={() => {
              navigate('/')
              if (window.innerWidth < 768) {
                setSidebarOpen(false)
              }
            }}
          >
            <HomeIcon className="mr-2" /> Home
          </button>

          <button
            className="flex items-center w-full p-3 rounded hover:bg-base-300 transition-colors text-custom-green"
            onClick={handleLogout}
          >
            <LogOutIcon className="mr-2" /> Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-4 md:p-6 lg:p-10 pt-16 md:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Journal Form - Can be toggled on mobile */}
          <div
            className={`bg-base-200 p-4 md:p-6 rounded-xl shadow-xl ${
              sidebarOpen && window.innerWidth < 768 ? 'hidden' : 'block'
            } order-2 lg:order-1`}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-custom-orange">
              {formMode === 'create' ? 'Create Journal' : 'Edit Journal'}
            </h3>
            <form
              onSubmit={
                formMode === 'create'
                  ? handleCreateJournal
                  : handleUpdateJournal
              }
            >
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Journal Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-base-300 text-custom-green"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Journal Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-base-300 text-custom-green h-32 md:h-48"
                  required
                />

                {/* Date Picker */}
                <div className="relative">
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) =>
                      setFormData((prev) => ({ ...prev, date }))
                    }
                    className="w-full p-2 rounded bg-base-300 text-custom-green"
                    placeholderText="Select Date"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-green" />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={openCloudinaryWidget}
                    className="flex items-center justify-center gap-2 w-full p-2 bg-custom-orange text-white rounded hover:opacity-90"
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span>Upload Images</span>
                  </button>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.media.map((mediaUrl) => (
                      <div key={mediaUrl} className="relative">
                        <img
                          src={mediaUrl}
                          alt="Uploaded"
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(mediaUrl)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full p-3 bg-custom-green text-white rounded hover:opacity-90"
                >
                  {formMode === 'create' ? 'Create Journal' : 'Update Journal'}
                </button>
              </div>
            </form>
          </div>

          {/* Journal List */}
          <div className="bg-base-200 p-4 md:p-6 rounded-xl shadow-xl order-1 lg:order-2">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-custom-orange">
              Journal List
            </h3>
            <div className="space-y-3 md:space-y-4">
              {journalList.length === 0 ? (
                <p className="text-center py-6 text-custom-green opacity-70">
                  No journals found
                </p>
              ) : (
                journalList.map((journal) => (
                  <div
                    key={journal.id}
                    className="bg-base-300 p-3 md:p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center"
                  >
                    <div className="mb-2 sm:mb-0">
                      <h4 className="font-bold text-custom-green">
                        {journal.title}
                      </h4>
                      <p className="text-sm text-custom-green opacity-70">
                        {new Date(
                          journal.date + 'T00:00:00'
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => prepareEditJournal(journal)}
                        className="text-custom-green hover:bg-base-200 p-2 rounded"
                        aria-label="Edit journal"
                      >
                        <FileEditIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJournal(journal.id)}
                        className="text-red-500 hover:bg-base-200 p-2 rounded"
                        aria-label="Delete journal"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex justify-between items-center mt-4 md:mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 bg-base-300 rounded disabled:opacity-50 text-sm md:text-base"
                >
                  Previous
                </button>
                <span className="text-custom-green text-sm md:text-base">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-base-300 rounded disabled:opacity-50 text-sm md:text-base"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminJournalDashboard
