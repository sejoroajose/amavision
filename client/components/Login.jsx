import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../src/App.css'
import logo from './logo.png'

function Login({ setIsAuthenticated, setUser }) {
  const [values, setValues] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  
  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com/api/login'
      : 'http://localhost:8080/api/login'

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    
    if (!values.emailOrUsername || !values.password) {
      setErrorMessage('Please fill in both fields.')
      return
    }

    setIsLoading(true) 
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailOrUsername: values.emailOrUsername,
          password: values.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please try again.')
      }

      
      localStorage.setItem('token', data.token)

      
      setIsAuthenticated(true)
      setUser({ id: data.user.id, email: data.user.email })

      navigate('/career')
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false) 
    }
  }

  return (
    <div className="flex justify-center items-center h-screen  md:mt-[100px]">
      <div className="bg-custom-orange flex text-custom-white flex-col gap-8 p-8 rounded-lg shadow-lg w-[1000px] max-w-md">
        <div className="flex flex-col gap-1 justify-center items-center">
          <h2 className="text-2xl font-neuemachina font-bold mb-6 text-center text-black">
            Want to explore a world of Career Opportunities?
          </h2>
          <p className="text-g-600 text-custom-white mb-4">
            Fill in the details below
          </p>
          <img src={logo} width={60} height={28} alt="logo" />
        </div>
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="flex   flex-col gap-6">
          <div className="flex  flex-col">
            <label
              htmlFor="emailOrUsername"
              className="font-medium text-custom-white  font-cabinetGrotresk text-left"
            >
              Email or Username
            </label>
            <input
              type="text"
              name="emailOrUsername"
              value={values.emailOrUsername}
              placeholder="Enter email address or username"
              onChange={handleInput}
              className="text-custom-white  px-2 py-3 border-2 rounded-lg focus:bg-transparent focus:outline-none focus:placeholder-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-medium text-custom-white  font-cabinetGrotresk text-black text-left"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="Enter password"
              onChange={handleInput}
              className="text-custom-white  px-8 py-3 border-2 rounded-lg focus:bg-transparent focus:outline-none focus:placeholder-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-custom-white border text-white py-2 px-4 rounded-lg hover:broder-none hover:text-black hover:bg-custom-orange"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-black">
            Don't have an account yet?{' '}
            <span>
              <Link
                to="/career/register"
                className="text-custom-green hover:text-custom-green hover:underline"
              >
                Sign Up
              </Link>
            </span>
          </p>
          <p className="text-center text-black">
            Forgot Password?{' '}
            <span>
              <Link
                to="/career/password-reset"
                className="text-custom-green hover:text-custom-green hover:underline"
              >
                Reset Password
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
