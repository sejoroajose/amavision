import React, { useState, useRef, useEffect } from 'react'
import logo from '/images/logo.png'

const AnimatedNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const navRef = useRef(null)
  const linksRef = useRef([])
  const navBgRef = useRef(null)
  const lastScrollY = useRef(0)

  // Add refs for each nav link
  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el)
    }
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolled past threshold
      const isScrolled = currentScrollY > 100
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }

      // Hide navbar when scrolling up
      if (currentScrollY < lastScrollY.current) {
        // Scrolling up, show the navbar
        setVisible(true)
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        // Scrolling down & past threshold, hide the navbar
        setVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  // Handle menu animation with React instead of direct GSAP
  useEffect(() => {
    if (navBgRef.current) {
      navBgRef.current.style.opacity = isOpen ? '1' : '0'
      navBgRef.current.style.backdropFilter = isOpen ? 'blur(10px)' : 'none'
    }

    linksRef.current.forEach((link, index) => {
      if (link) {
        setTimeout(
          () => {
            link.style.opacity = isOpen ? '1' : '0'
            link.style.transform = isOpen ? 'translateY(0)' : 'translateY(2rem)'
            link.style.pointerEvents = isOpen ? 'all' : 'none'
          },
          isOpen ? index * 100 : 0
        )
      }
    })
  }, [isOpen])

  const toggleNav = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/#about' },
    { name: 'Services', url: '/#initiatives' },
    { name: 'Projects', url: '/#initiatives' },
    { name: 'Contact', url: '/#contact' },
  ]

  // Define inline styles for custom colors
  const styles = {
    customMaroon: '#701215',
    customGold: '#EEDE80',
    bgColor: scrolled ? 'rgba(238, 222, 128, 0.9)' : 'rgba(27, 61, 56, 0)',
  }

  return (
    <header
      style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 40,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.3s ease',
        backgroundColor: styles.bgColor,
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center h-20">
        <a href="/" className="relative z-50">
          <div className="flex items-center">
            <img
              src={logo}
              width={40}
              height={35}
              alt="logo"
              className="mr-3"
            />
            <span
              className="font-neuemachina text-lg hidden md:block"
              style={{ color: styles.customMaroon }}
            >
              Hon. Dr. Adebayo
            </span>
          </div>
        </a>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="font-neuemachina hover:text-custom-gold transition-colors relative"
              style={{
                color: styles.customMaroon,
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                const underline = e.target.querySelector('.nav-underline')
                if (underline) underline.style.transform = 'scaleX(1)'
              }}
              onMouseLeave={(e) => {
                const underline = e.target.querySelector('.nav-underline')
                if (underline) underline.style.transform = 'scaleX(0)'
              }}
            >
              {item.name}
              <span
                className="nav-underline"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  backgroundColor: styles.customGold,
                  bottom: '-4px',
                  left: 0,
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease-in-out',
                  transform: 'scaleX(0)',
                  borderRadius: '5px',
                }}
              />
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href="/contact"
            className="font-neuemachina text-white py-2 px-5 rounded-lg transition-all"
            style={{
              backgroundColor: styles.customMaroon,
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = `${styles.customMaroon}E6`)
            } // 90% opacity
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.customMaroon)
            }
          >
            Get in Touch
          </a>
        </div>

        <div
          className="cursor-pointer lg:hidden relative z-50"
          onClick={toggleNav}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={styles.customMaroon}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={styles.customMaroon}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </div>

        <nav
          ref={navRef}
          className="fixed inset-0 z-40 flex items-center justify-center lg:hidden"
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <div
            ref={navBgRef}
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(250, 245, 233, 0.5)',
              backdropFilter: isOpen ? 'blur(10px)' : 'none',
              opacity: 0,
              transition: 'opacity 0.8s ease, backdrop-filter 0.8s ease',
            }}
          ></div>
          <ul className="relative z-10 flex flex-col items-center justify-center space-y-8">
            {navItems.map((item, index) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  ref={addToLinksRef}
                  className="font-neuemachina text-2xl"
                  style={{
                    color: styles.customMaroon,
                    opacity: 0,
                    transform: 'translateY(2rem)',
                    pointerEvents: 'none',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    position: 'relative',
                  }}
                  onClick={toggleNav}
                  onMouseEnter={(e) => {
                    const underline = e.target.querySelector('.nav-underline')
                    if (underline) underline.style.transform = 'scaleX(1)'
                  }}
                  onMouseLeave={(e) => {
                    const underline = e.target.querySelector('.nav-underline')
                    if (underline) underline.style.transform = 'scaleX(0)'
                  }}
                >
                  {item.name}
                  <span
                    className="nav-underline"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      backgroundColor: '#9BC53D',
                      bottom: '-6px',
                      left: 0,
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease-in-out',
                      transform: 'scaleX(0)',
                      borderRadius: '5px',
                    }}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href="/contact"
                ref={addToLinksRef}
                className="font-neuemachina text-white py-2 px-6 rounded-lg mt-4 inline-block"
                style={{
                  backgroundColor: styles.customMaroon,
                  opacity: 0,
                  transform: 'translateY(2rem)',
                  pointerEvents: 'none',
                  transition:
                    'opacity 0.8s ease, transform 0.8s ease, background-color 0.3s ease',
                }}
                onClick={toggleNav}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = `${styles.customMaroon}E6`)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = styles.customMaroon)
                }
              >
                Get in Touch
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AnimatedNav
