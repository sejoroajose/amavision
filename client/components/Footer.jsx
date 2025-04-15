import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

// Replace with actual path to your logo
import logoImg from '/images/logo.png'

gsap.registerPlugin(ScrollTrigger)
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
)

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
)

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const Footer = () => {
  const footerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    const content = contentRef.current

    // Animation for footer elements
    gsap.fromTo(
      content.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    )

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-custom-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-24" ref={contentRef}>
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logoImg}
                alt="Hon. Dr. Adebayo"
                className="h-12 w-auto"
              />
              <h2 className="font-neuemachina text-xl">Hon. Dr. Adebayo</h2>
            </div>
            <p className="font-cabinetGrotesk text-left text-[#DBE7E8]/90 mb-6 max-w-md">
              Office of the Senior Special Assistant to Osun State Governor on
              Internal Revenue & Tax Matters, committed to sustainable
              development and fiscal responsibility.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="bg-custom-gold hover:bg-custom-gold/80 p-2 rounded-full text-custom-black transition-all duration-300"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="bg-custom-gold hover:bg-custom-gold/80 p-2 rounded-full text-custom-black transition-all duration-300"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="bg-custom-gold hover:bg-custom-gold/80 p-2 rounded-full text-custom-black transition-all duration-300"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="bg-custom-gold hover:bg-custom-gold/80 p-2 rounded-full text-custom-black transition-all duration-300"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4">
            <h3 className="font-bebas text-custom-gold text-xl mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 font-cabinetGrotesk text-[#DBE7E8]/90">
              <li>
                <a
                  href="#about"
                  className="hover:text-custom-gold transition-colors duration-300"
                >
                  About Dr. Adebayo
                </a>
              </li>
              <li>
                <a
                  href="#initiatives"
                  className="hover:text-custom-gold transition-colors duration-300"
                >
                  Our Initiatives
                </a>
              </li>
              <li>
                <a
                  href="#press"
                  className="hover:text-custom-gold transition-colors duration-300"
                >
                  Press Releases
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  className="hover:text-custom-gold transition-colors duration-300"
                >
                  Tax Resources
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-custom-gold transition-colors duration-300"
                >
                  Contact Office
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3">
            <h3 className="font-bebas text-custom-gold text-xl mb-4">
              CONTACT US
            </h3>
            <ul className="space-y-4 font-cabinetGrotesk text-[#DBE7E8]/90">
              <li className="flex items-start text-left space-x-3">
                <MapPinIcon className="w-5 h-5 text-custom-gold flex-shrink-0 mt-1" />
                <span>
                  Office of the SSA on Internal Revenue, Governor's Office,
                  Osogbo, Osun State, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-custom-gold flex-shrink-0" />
                <span>+234 801 234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-custom-gold flex-shrink-0" />
                <span>contact@dradebayo.gov.ng</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="font-cabinetGrotesk  text-sm uppercase mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 text-white px-4 py-2 rounded-l-full focus:outline-none flex-grow"
                />
                <button className="bg-custom-gold text-custom-black px-4 py-2 rounded-r-full font-medium hover:bg-custom-gold/80 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-8"></div>

        {/* Footer Bottom - Copyright & Additional Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#DBE7E8]/70 text-sm font-cabinetGrotesk mb-4 md:mb-0">
            © {new Date().getFullYear()} Office of Hon. Dr. Adegboyega Musthofa
            Adebayo. All rights reserved.
          </div>

          <div className="flex space-x-6 text-sm font-cabinetGrotesk text-[#DBE7E8]/70">
            <a
              href="#privacy"
              className="hover:text-[#9BC53D] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-[#9BC53D] transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#accessibility"
              className="hover:text-[#9BC53D] transition-colors duration-300"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
