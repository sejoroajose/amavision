import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logo from './logo.png'

function NavBar() {
  const [navbar, setNavbar] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    gsap.set(nav, { y: '-100%' })

    const showNav = () => {
      if (window.scrollY > 100) {
        gsap.to(nav, {
          y: '0%',
          duration: 0.5,
          ease: 'bounce.out',
        })
      } else {
        gsap.to(nav, {
          y: '-100%',
          duration: 0.5,
          ease: 'power2.in',
        })
      }
    }

    window.addEventListener('scroll', showNav)
    return () => window.removeEventListener('scroll', showNav)
  }, [])

  return (
    <div ref={navRef}>
      <nav className="w-full bg-transparent backdrop-blur-md fixed top-0 left-0 px-8 right-0 z-20">
        <div className="justify-between max-w-full px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:gap-40 md:px-2 md:mx-2">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="/" className="flex flex-row gap-4">
                <img src={logo} width={40} height={35} alt="logo" />
              </a>

              <div className="md:hidden">
                <button
                  className="p-2 text-[#DBE7E8] rounded-md outline-none focus:underline focus:underline-offset-2 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <img
                      src="/xmark.svg"
                      width={30}
                      height={30}
                      alt="close menu"
                      className="text-custom-green"
                    />
                  ) : (
                    <img
                      src="/nav.svg"
                      width={30}
                      height={30}
                      alt="open menu"
                      className="focus:border-none active:border-none text-custom-green"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex ml-10">
            <div
              className={`flex-1 justify-self-center pb-3  md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <div className="flex  flex-col md:flex-row">
                <ul className="flex flex-col md:flex-row w-full items-center justify-center md:items-end md:justify-end md:gap-4 md:h-auto mt-0 md:mt-4 ">
                  <li className="pb-6 text-xl font-neuemachina font-light text-custom-green py-2 md:px-6 text-center hover:underline hover:decoration-custom-orange hover:underline-offset-2">
                    <a href="/about" onClick={() => setNavbar(!navbar)}>
                      About
                    </a>
                  </li>
                  <li className="pb-6 text-xl font-neuemachina font-light text-custom-green py-2 md:px-6 text-center md:hover:underline md:hover:decoration-custom-orange md:hover:underline-offset-2">
                    <a href="/#project" onClick={() => setNavbar(!navbar)}>
                      Projects
                    </a>
                  </li>
                  <li className="pb-6 text-xl font-neuemachina font-light text-custom-green py-2 md:px-6 text-center md:hover:underline md:hover:decoration-custom-orange md:hover:underline-offset-2">
                    <a href="/career" onClick={() => setNavbar(!navbar)}>
                      Careers
                    </a>
                  </li>
                  <li className="pb-6 text-xl font-neuemachina font-light text-custom-green py-2 md:px-6 text-center md:hover:underline md:hover:decoration-custom-orange md:hover:underline-offset-2">
                    <a href="/journal" onClick={() => setNavbar(!navbar)}>
                      Journal
                    </a>
                  </li>
                  <li className="pb-6 text-xl font-neuemachina font-light text-custom-green py-2 md:px-6 text-center md:hover:underline md:hover:decoration-custom-orange md:hover:underline-offset-2">
                    <a href="/news" onClick={() => setNavbar(!navbar)}>
                      News
                    </a>
                  </li>
                </ul>
                <div className="flex justify-center md:justify-start">
                  <a href="/">
                    <button className="bg-custom-grey text-xl text-custom-orange px-4 py-2 border-2 rounded-l-full rounded-r-full border-custom-orange rounded-2xl md:ml-10 md:mt-4 hover:bg-custom-orange hover:text-custom-white">
                      CONTACT
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
