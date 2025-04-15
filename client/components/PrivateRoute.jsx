/* import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  return token ? children : <Navigate to="/career/login" />
}

export default PrivateRoute */


import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  if (!isAuthenticated) {
    return <Navigate to="/career/login" />
  }

  return children
}

export default PrivateRoute