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
  UploadIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sesi-new.onrender.com'
    : 'http://localhost:8080'

const CLOUDINARY_UPLOAD_PRESET = 'sesi_whingan_avataa_cv'
const CLOUDINARY_CLOUD_NAME = 'dnu6az3um'
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

const AdminDashboard = () => {
  const [newsList, setNewsList] = useState([])
  const [selectedNews, setSelectedNews] = useState(null)
  const [formMode, setFormMode] = useState('create')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    fullContent: '',
    tags: [],
    image: '',
    author: '',
    author_portfolio: '',
  })
  const [tagInput, setTagInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('form') // 'form' or 'list'
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${API_URL}/api/news?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()
        setNewsList(data.news)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchNews()
  }, [currentPage])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formDataForUpload = new FormData()
    formDataForUpload.append('file', file)
    formDataForUpload.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    setIsUploading(true)

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formDataForUpload,
      })

      const data = await response.json()

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          image: data.secure_url,
        }))
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      window.alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCreateNews = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          title: '',
          content: '',
          fullContent: '',
          tags: [],
          image: '',
          author: '',
          author_portfolio: '',
        })

        // Fetch the updated news list
        const updatedResponse = await fetch(
          `${API_URL}/api/news?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const updatedData = await updatedResponse.json()
        setNewsList(updatedData.news)

        // Show success popup
        window.alert('News publishing successful!')
        // Switch to news list tab on mobile after creating
        setActiveTab('list')
      }
    } catch (error) {
      console.error('Error creating news:', error)
    }
  }

  const handleUpdateNews = async (e) => {
    e.preventDefault()
    if (!selectedNews) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/news/${selectedNews.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedResponse = await fetch(
          `${API_URL}/api/news?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const updatedData = await updatedResponse.json()
        setNewsList(updatedData.news)

        setSelectedNews(null)
        setFormMode('create')
        setFormData({
          title: '',
          content: '',
          fullContent: '',
          tags: [],
          image: '',
          author: '',
          author_portfolio: '',
        })

        // Show success popup
        window.alert('News update successful!')
        // Switch to news list tab on mobile after updating
        setActiveTab('list')
      }
    } catch (error) {
      console.error('Error updating news:', error)
    }
  }

  const handleDeleteNews = async (slug) => {
    // Confirm before deleting
    const confirmed = window.confirm(
      'Are you sure you want to delete this news?'
    )
    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/news/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const updatedResponse = await fetch(
          `${API_URL}/api/news?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const updatedData = await updatedResponse.json()
        setNewsList(updatedData.news)

        window.alert('News deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  const prepareEditNews = (news) => {
    setSelectedNews(news)
    setFormMode('edit')
    setFormData({
      title: news.title,
      content: news.content,
      fullContent: news.fullContent,
      tags: news.tags,
      image: news.image,
      author: news.author,
      author_portfolio: news.author_portfolio,
    })
    // Switch to form tab on mobile when editing
    setActiveTab('form')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin')
  }

  const resetForm = () => {
    setFormMode('create')
    setSelectedNews(null)
    setFormData({
      title: '',
      content: '',
      fullContent: '',
      tags: [],
      image: '',
      author: '',
      author_portfolio: '',
    })
    setActiveTab('form')
    setSidebarOpen(false)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-100">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-base-200 border-b border-base-300">
        <h2 className="text-xl font-bold text-custom-orange">
          Admin Dashboard
        </h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full hover:bg-base-300"
        >
          {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-base-200 p-6 border-r border-base-300 md:static fixed inset-0 z-10`}
      >
        <div className="mb-10 hidden md:block">
          <h2 className="text-2xl font-bold text-custom-orange">
            Admin Dashboard
          </h2>
        </div>

        <nav className="space-y-2">
          <button
            className="flex items-center w-full p-3 rounded hover:bg-base-300 transition-colors text-custom-green"
            onClick={resetForm}
          >
            <PlusIcon className="mr-2" /> Create News
          </button>

          <button
            className="flex items-center w-full p-3 rounded hover:bg-base-300 transition-colors text-custom-green"
            onClick={() => navigate('/journal-admin')}
          >
            <CalendarIcon className="mr-2" /> Manage Journals
          </button>

          <button
            className="flex items-center w-full p-3 rounded hover:bg-base-300 transition-colors text-custom-green"
            onClick={() => navigate('/')}
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

        {/* Close button for mobile sidebar */}
        <button
          className="mt-8 p-2 rounded text-custom-green md:hidden block w-full text-center"
          onClick={() => setSidebarOpen(false)}
        >
          Close Menu
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        {/* Mobile Tab Controls */}
        <div className="md:hidden flex mb-4 border-b border-base-300">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === 'form'
                ? 'border-b-2 border-custom-orange font-bold text-custom-orange'
                : 'text-custom-green'
            }`}
            onClick={() => setActiveTab('form')}
          >
            {formMode === 'create' ? 'Create News' : 'Edit News'}
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === 'list'
                ? 'border-b-2 border-custom-orange font-bold text-custom-orange'
                : 'text-custom-green'
            }`}
            onClick={() => setActiveTab('list')}
          >
            News List
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* News Creation/Edit Form */}
          <div
            className={`bg-base-200 p-4 md:p-6 rounded-xl shadow-xl ${
              activeTab === 'form' || window.innerWidth >= 768
                ? 'block'
                : 'hidden'
            }`}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-custom-orange">
              {formMode === 'create' ? 'Create News' : 'Edit News'}
            </h3>
            <form
              onSubmit={
                formMode === 'create' ? handleCreateNews : handleUpdateNews
              }
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="News Title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-base-300 text-custom-green"
                required
              />
              <textarea
                name="content"
                placeholder="Short Content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-base-300 text-custom-green h-24"
                required
              />
              <p className="text-custom-green text-sm text-left italic">
                {
                  'To add a breakline, add <br> to the end of the terminating paragraph'
                }
              </p>
              <textarea
                name="fullContent"
                placeholder="Full Content"
                value={formData.fullContent}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-base-300 text-custom-green h-32 md:h-48"
                required
              />

              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="block text-custom-green">
                  Featured Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-3">
                  <label className="cursor-pointer bg-custom-orange text-white px-4 py-2 rounded flex items-center">
                    <UploadIcon className="mr-2" size={16} />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="flex-1 w-full sm:w-auto p-2 rounded bg-base-300 text-custom-green"
                    readOnly
                  />
                </div>
                {formData.image && (
                  <div className="mt-2 bg-base-300 p-2 rounded">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-32 object-cover rounded mx-auto"
                    />
                  </div>
                )}
              </div>

              <input
                type="text"
                name="author"
                placeholder="Author Name"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-base-300 text-custom-green"
              />
              <input
                type="text"
                name="author_portfolio"
                placeholder="Author Portfolio"
                value={formData.author_portfolio}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-base-300 text-custom-green"
              />

              <div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="text"
                    placeholder="Add Tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 p-2 rounded-l sm:rounded-l-md sm:rounded-r-none rounded-r bg-base-300 text-custom-green"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-custom-orange text-white px-4 py-2 rounded-r sm:rounded-r-md sm:rounded-l-none rounded-l"
                  >
                    Add Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-custom-orange text-white px-2 py-1 rounded flex items-center text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-custom-orange text-white p-2 rounded hover:opacity-90 transition-opacity"
              >
                {formMode === 'create' ? 'Create News' : 'Update News'}
              </button>
            </form>
          </div>

          {/* News List */}
          <div
            className={`bg-base-200 p-4 md:p-6 rounded-xl shadow-xl ${
              activeTab === 'list' || window.innerWidth >= 768
                ? 'block'
                : 'hidden'
            }`}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-custom-orange">
              News List
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[60vh] md:max-h-[65vh]">
              {newsList.length === 0 ? (
                <p className="text-center text-custom-green p-4">
                  No news items found
                </p>
              ) : (
                newsList.map((news) => (
                  <div
                    key={news.id}
                    className="bg-base-300 p-3 md:p-4 rounded flex flex-col sm:flex-row sm:items-center gap-2"
                  >
                    <div className="flex items-center flex-grow min-w-0">
                      {news.image && (
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-10 h-10 md:w-12 md:h-12 rounded object-cover mr-3 flex-shrink-0"
                        />
                      )}
                      <div className="overflow-hidden min-w-0">
                        <h4 className="font-bold text-custom-green text-sm md:text-base truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]">
                          {news.title}
                        </h4>
                        <p className="text-xs md:text-sm text-custom-green/70">
                          {new Date(news.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 self-end sm:self-center flex-shrink-0">
                      <button
                        onClick={() => prepareEditNews(news)}
                        className="text-blue-500 hover:bg-base-200 p-2 rounded"
                      >
                        <FileEditIcon size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(news.slug)}
                        className="text-red-500 hover:bg-base-200 p-2 rounded"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-base-300 px-2 py-1 md:p-2 rounded text-sm md:text-base disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-custom-green text-sm md:text-base flex items-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="bg-base-300 px-2 py-1 md:p-2 rounded text-sm md:text-base disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
