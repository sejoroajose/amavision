import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const navigate = useNavigate()

  const token = searchParams.get('token')

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com/api'
      : 'http://localhost:8080/api'

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(`${API_URL}/verify-reset-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          })
          if (response.ok) {
            setIsTokenValid(true)
          } else {
            setError('Invalid or expired reset token')
          }
        } catch (err) {
          setError('Failed to verify reset token')
        }
      }
      verifyToken()
    }
  }, [token, API_URL])

  const handleRequestReset = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password reset instructions have been sent to your email!')
      } else {
        throw new Error(data.error || 'Failed to request password reset')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password reset successful!')
        setTimeout(() => {
          navigate('/career/login')
        }, 2000)
      } else {
        throw new Error(data.error || 'Failed to reset password')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (token && !isTokenValid) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Invalid reset token'}
        </div>
      </div>
    )
  }

  if (token && isTokenValid) {
    return (
      <div className="flex justify-center items-center h-screen md:mt-[100px]">
        <div className="bg-custom-orange flex text-custom-white flex-col gap-8 p-8 rounded-lg shadow-lg w-[1000px] max-w-md">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h2 className="text-2xl font-neuemachina font-bold mb-6 text-center text-black">
              Reset Your Password
            </h2>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-custom-white font-cabinetGrotresk text-left">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="text-custom-white px-2 py-3 border-2 rounded-lg focus:bg-transparent focus:outline-none focus:placeholder-transparent"
                required
                minLength={8}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-custom-white font-cabinetGrotresk text-left">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="text-custom-white px-2 py-3 border-2 rounded-lg focus:bg-transparent focus:outline-none focus:placeholder-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-custom-white border text-white py-2 px-4 rounded-lg hover:border-none hover:text-black hover:bg-custom-orange disabled:opacity-50"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Show the request reset form if we don't have a token
  return (
    <div className="flex justify-center items-center h-screen md:mt-[100px]">
      <div className="bg-custom-orange flex text-custom-white flex-col gap-8 p-8 rounded-lg shadow-lg w-[1000px] max-w-md">
        <div className="flex flex-col gap-1 justify-center items-center">
          <h2 className="text-2xl font-neuemachina font-bold mb-6 text-center text-black">
            Reset Your Password
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleRequestReset} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="font-medium text-custom-white font-cabinetGrotresk text-left">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="text-custom-white px-2 py-3 border-2 rounded-lg focus:bg-transparent focus:outline-none focus:placeholder-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-custom-white border text-white py-2 px-4 rounded-lg hover:border-none hover:text-black hover:bg-custom-orange disabled:opacity-50"
          >
            {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordForm
