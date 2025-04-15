import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Login from '../../components/Login'
import '../App.css'
import AnimatedNav from '../../components/Nav2'

function LogIn({ setIsAuthenticated, setUser }) {
  return (
    <>
      <AnimatedNav />
      <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <Footer />
    </>
  )
}
export default LogIn
