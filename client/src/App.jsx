import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Voters from './pages/votersverification'
import Home from './home'
import News from './pages/newsline'
import JobPortal from './pages/JobPortal'
import LogIn from './pages/Login'
import PrivateRoute from '../components/PrivateRoute'
import Signup from './pages/Signup'
import Scholarship from './pages/scholarship'
import Journal from './pages/Journal'
import Reset from './pages/Reset'
import BadagryConstituency from './pages/Badagry'
import TributePage from './pages/TributePage'
import TributeAdmin from './pages/TributeAdmin'
import Admin from './pages/Admin'
import AdminLogin from '../components/adminLogin'
import AdminPrivateRoute from '../components/AdminPrivate'
import AdminJournal from './pages/AdminJournal'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      setUser({ username: 'User' })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
    navigate('/career/login')
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App
