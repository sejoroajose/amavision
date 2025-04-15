import React, { useState, useEffect } from 'react'
import AnimatedNav from '../../components/Nav2'
import Footer from '../../components/Footer'
import { Pin, Trash2, Edit, Save, X } from 'lucide-react'

const TributeAdmin = () => {
  const [tributes, setTributes] = useState([])
  const [newTribute, setNewTribute] = useState({ author: '', content: '' })
  const [editingTribute, setEditingTribute] = useState(null)

  useEffect(() => {
    fetchTributes()
  }, [])

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com'
      : 'http://localhost:8080'


  const fetchTributes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tributes`)
      const data = await response.json()
      setTributes(data)
    } catch (error) {
      console.error('Error fetching tributes:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/api/admin/tributes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(newTribute),
      })
      if (response.ok) {
        setNewTribute({ author: '', content: '' })
        fetchTributes()
      }
    } catch (error) {
      console.error('Error creating tribute:', error)
    }
  }

  const handlePin = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/tributes/${id}/pin`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      })
      fetchTributes()
    } catch (error) {
      console.error('Error pinning tribute:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tribute?')) return

    try {
      await fetch(`${API_URL}/api/admin/tributes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      })
      fetchTributes()
    } catch (error) {
      console.error('Error deleting tribute:', error)
    }
  }

  const handleEdit = async (tribute) => {
    if (editingTribute?.id === tribute.id) {
      try {
        await fetch(`${API_URL}/api/admin/tributes/${tribute.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
          body: JSON.stringify(editingTribute),
        })
        setEditingTribute(null)
        fetchTributes()
      } catch (error) {
        console.error('Error updating tribute:', error)
      }
    } else {
      setEditingTribute(tribute)
    }
  }

  return (
    <div className="min-h-screen ">
      <AnimatedNav />

      <div className="pt-[120px] px-4 md:px-6">
        <div className="max-w-screen-xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Tribute Administration</h1>

          <div className="rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Tribute</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Author Name</label>
                <input
                  type="text"
                  value={newTribute.author}
                  onChange={(e) =>
                    setNewTribute({ ...newTribute, author: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Tribute Content</label>
                <textarea
                  value={newTribute.content}
                  onChange={(e) =>
                    setNewTribute({ ...newTribute, content: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Tribute
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {tributes.map((tribute) => (
              <div
                key={tribute.id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                {editingTribute?.id === tribute.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingTribute.author}
                      onChange={(e) =>
                        setEditingTribute({
                          ...editingTribute,
                          author: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      value={editingTribute.content}
                      onChange={(e) =>
                        setEditingTribute({
                          ...editingTribute,
                          content: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      rows={4}
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-gray-800 mb-2">{tribute.content}</p>
                    <p className="text-gray-600 mb-4">- {tribute.author}</p>
                  </>
                )}

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handlePin(tribute.id)}
                    className={`p-2 rounded ${
                      tribute.isPinned ? 'bg-orange-100' : 'bg-gray-100'
                    }`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(tribute)}
                    className="p-2 rounded bg-gray-100"
                  >
                    {editingTribute?.id === tribute.id ? (
                      <Save className="w-4 h-4" />
                    ) : (
                      <Edit className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(tribute.id)}
                    className="p-2 rounded bg-gray-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TributeAdmin
