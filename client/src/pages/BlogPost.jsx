import React from 'react'
import Blog from '../../components/Blog'
import Footer from '../../components/Footer'
import AnimatedNav from '../../components/Nav2'
import '../App.css'

const Posts = () => {
  return (
    <div>
      <AnimatedNav />
      <Blog />
      <Footer />
    </div>
  )
}
export default Posts
