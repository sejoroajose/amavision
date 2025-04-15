import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../src/App.css'
import { Link } from 'react-router-dom'
import logo from './logo.png'

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com/api/signup'
      : 'http://localhost:8080/api/signup'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('User registered successfully!')
        localStorage.setItem('token', data.token)
        setTimeout(() => {
          navigate('/career/login')
        }, 1500)
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const validationErrors = {}
          data.errors.forEach((error) => {
            validationErrors[error.param] = error.msg || 'Invalid input'
          })
          setErrors(validationErrors)
        } else {
          setErrors({ general: data.error || 'Failed to create account' })
        }
      }
    } catch (err) {
      console.error('Signup error:', err)
      setErrors({ general: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const getInputClassName = (fieldName) => {
    return `w-full px-4 py-2 border rounded-md focus:bg-transparent focus:outline-none focus:placeholder-transparent focus:text-black 
    ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`
  }

  return (
    <div className="flex justify-center items-center h-auto mt-[200px]">
      <div className="bg-custom-grey flex flex-col gap-8 p-8 rounded-lg shadow-lg w-[1000px] max-w-md">
        <div className="flex flex-col gap-1 justify-center items-center">
          <h2 className="text-4xl font-neuemachina font-bold mb-6 text-center text-black">
            Sign Up
          </h2>
          <img src={logo} width={60} height={28} alt="logo" />
        </div>

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {errors.general}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <label className="font-medium text-black text-left">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={getInputClassName('firstName')}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium text-black text-left">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={getInputClassName('lastName')}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium text-black justify-start mr-24 text-left">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={getInputClassName('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-medium text-black text-left">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a secure password (min. 8 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              className={getInputClassName('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`rounded-md bg-custom-green text-black py-2 hover:bg-custom-orange
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-black">
          Already have an Account{' '}
          <span>
            <Link
              to="/career/login"
              className="text-custom-green hover:text-custom-orange hover:underline"
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignUp