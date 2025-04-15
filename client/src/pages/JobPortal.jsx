import AnimatedNav from '../../components/Nav2'
import Footer from '../../components/Footer'
import Portal from '../../components/jobPortal'
import NewPortal from '../../components/NewPortal'
import '../App.css'


function JobPortal() {
  return (
    <>
      <AnimatedNav />
      {/* <NewPortal /> */}
      <Portal />
      <Footer />
    </>
  )
}

export default JobPortal
