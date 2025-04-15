import { Navigate } from 'react-router-dom'

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/admin" />
}

export default AdminPrivateRoute
