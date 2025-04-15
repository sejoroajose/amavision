import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockIcon, UserIcon } from 'lucide-react'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sesi-new.onrender.com'
    : 'http://localhost:8080'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token)

        // Redirect to admin dashboard
        navigate('/admin/dashboard')
      } else {
        // Handle login error
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-base-200 shadow-xl rounded-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-custom-orange">
              Admin Login
            </h1>
            <p className="text-custom-green mt-2">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded">
                {error}
              </div>
            )}

            <div className="relative">
              <label
                htmlFor="emailOrUsername"
                className="block mb-2 text-custom-green"
              >
                Email or Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-green/50" />
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 rounded-lg bg-base-300 text-custom-green 
                    focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  placeholder="Enter email or username"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-custom-green"
              >
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-green/50" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-10 rounded-lg bg-base-300 text-custom-green 
                    focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-custom-orange text-white p-3 rounded-lg 
                hover:opacity-90 transition-opacity
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center"
            >
              {loading ? <span>Logging in...</span> : <span>Login</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
