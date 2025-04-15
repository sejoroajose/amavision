import React, { useState, useEffect } from 'react'
import logo from '/images/logo.png'

const AnimatedNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let prevScrollPos = window.pageYOffset

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10

      prevScrollPos = currentScrollPos
      setScrollPosition(currentScrollPos)
      setIsVisible(visible)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/#about' },
    { name: 'Services', url: '/#initiatives' },
    { name: 'Projects', url: '/#initiatives' },
    { name: 'Contact', url: '/#contact' },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollPosition > 10
          ? 'bg-white/90 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      } ${isVisible ? 'top-0' : '-top-24'}`}
    >
      <div className="container mx-auto !md:px-28 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 w-1/4">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
              <span className="font-bold text-lg text-gray-800 hidden md:block">
                Hon. Dr. Adebayo
              </span>
            </a>
          </div>
          {/* Center section - Nav items */}
          <nav className="hidden lg:flex items-center font-cabinetGrotesk justify-center w-2/4">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  className="text-gray-700 hover:text-custom-maroon font-medium relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-custom-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
            </div>
          </nav>

          {/* Right section - Call to action */}
          <div className="hidden lg:flex justify-end w-1/4">
            <a
              href="/contact"
              className="bg-custom-maroon text-white px-6 py-2 rounded-lg font-medium hover:bg-custom-maroon transition-colors"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center p-2 rounded-md text-gray-700 hover:text-custom-maroon focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
              <span className="font-bold text-lg text-gray-800">
                Hon. Dr. Adebayo
              </span>
            </a>
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-700 hover:text-custom-maroon focus:outline-none"
          >
            <span className="sr-only">Close menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-8 text-center px-4">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  className="block py-3 text-base font-medium text-gray-800 hover:text-custom-maroon border-b border-gray-100"
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <a
              href="/contact"
              className="block w-full text-center bg-custom-maroon text-white px-6 py-3 rounded-lg font-medium hover:bg-custom-maroon transition-colors"
              onClick={toggleMenu}
            >
              Get in Touch
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  )
}

export default AnimatedNav
