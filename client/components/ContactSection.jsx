import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

gsap.registerPlugin(ScrollTrigger)

const ContactSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const contactInfoRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const form = formRef.current
    const contactInfo = contactInfoRef.current

    // Heading animation
    gsap.fromTo(
      heading,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    )

    // Form animation
    gsap.fromTo(
      form,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: form,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    )

    // Contact info animation
    gsap.fromTo(
      contactInfo,
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: contactInfo,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    )

    // Form elements animation
    const formElements = form.querySelectorAll('input, textarea, button')
    gsap.fromTo(
      formElements,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        scrollTrigger: {
          trigger: form,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    )

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate form submission
    console.log('Form submitted:', formData)

    // Animation for form submission
    const timeline = gsap.timeline()

    timeline
      .to(formRef.current, {
        y: -10,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power1.inOut',
      })
      .to(formRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
        onComplete: () => {
          setFormSubmitted(true)
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          })

          // Reset form after 3 seconds
          setTimeout(() => {
            setFormSubmitted(false)
          }, 3000)
        },
      })
  }

  return (
    <div ref={sectionRef} className="container mx-auto px-4 md:px-8">
      <h2
        ref={headingRef}
        className="font-neuemachina text-3xl md:text-5xl text-custom-black text-center mb-12"
      >
        Get In <span className="text-[#701215]">Touch</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Contact Form */}
        <div ref={formRef} className="w-full md:w-1/2">
          {formSubmitted ? (
            <div className="bg-[#9BC53D]/20 p-8 rounded-xl text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#9BC53D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-bebas text-2xl text-[#1B3D38] mb-2">
                MESSAGE SENT
              </h3>
              <p className="font-cabinetGrotesk text-[#1B3D38]">
                Thank you for reaching out! We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="">
                <label
                  htmlFor="name"
                  className="block font-bebas text-[#701215] mb-1"
                >
                  YOUR NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-[#DBE7E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-gold focus:border-transparent font-cabinetGrotesk"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-bebas text-[#701215] mb-1"
                >
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-[#DBE7E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-gold focus:border-transparent font-cabinetGrotesk"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block font-bebas text-[#701215] mb-1"
                >
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-[#DBE7E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-gold focus:border-transparent font-cabinetGrotesk"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-bebas text-[#701215] mb-1"
                >
                  YOUR MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-[#DBE7E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-gold focus:border-transparent font-cabinetGrotesk"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-custom-gold text-custom-maroon font-cabinetGrotesk font-medium rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Information */}
        <div ref={contactInfoRef} className="w-full md:w-1/2">
          <div className="bg-custom-gold/10 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="font-bebas text-2xl text-[#701215] mb-6">
              CONTACT INFORMATION
            </h3>

            <div className="space-y-6">
              <div className="flex items-start text-left">
                <div className="bg-custom-gold/20 p-2 rounded-lg mr-4">
                  <EnvelopeIcon className="h-6 w-6 text-custom-gold" />
                </div>
                <div>
                  <h4 className="font-neuemachina text-custom-maroon text-lg">
                    Email Address
                  </h4>
                  <p className="font-cabinetGrotesk text-custom-black">
                    contact@adebayo-osun.gov.ng
                  </p>
                  <p className="font-cabinetGrotesk text-custom-black">
                    adebayo.office@osunstate.gov.ng
                  </p>
                </div>
              </div>

              <div className="flex items-start text-left">
                <div className="bg-custom-gold/20 p-2 rounded-lg mr-4">
                  <PhoneIcon className="h-6 w-6 text-custom-gold" />
                </div>
                <div>
                  <h4 className="font-neuemachina text-custom-maroon text-lg">
                    Phone Numbers
                  </h4>
                  <p className="font-cabinetGrotesk text-custom-black">
                    +234 (0) 801 234 5678
                  </p>
                  <p className="font-cabinetGrotesk text-custom-black">
                    +234 (0) 809 876 5432
                  </p>
                </div>
              </div>

              <div className="flex items-start text-left">
                <div className="bg-custom-gold/20 p-2 rounded-lg mr-4">
                  <MapPinIcon className="h-6 w-6 text-custom-gold" />
                </div>
                <div>
                  <h4 className="font-neuemachina text-custom-maroon text-lg">
                    Office Location
                  </h4>
                  <p className="font-cabinetGrotesk text-custom-black">
                    Office of the Senior Special Assistant to the Governor,
                    <br />
                    Osun State Government Secretariat,
                    <br />
                    Abere, Osogbo, Osun State, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-left">
              <h4 className="font-bebas text-xl text-[#701215] mb-4">
                OFFICE HOURS
              </h4>
              <div className="font-cabinetGrotesk text-custom-black">
                <p>
                  <strong>Monday - Friday:</strong> 8:00 AM - 4:00 PM
                </p>
                <p>
                  <strong>Saturday - Sunday:</strong> Closed
                </p>
                <p>
                  <em className="text-sm mt-2 italic block text-[#701215]">
                    All official holidays observed
                  </em>
                </p>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-custom-black flex items-center justify-center rounded-full text-white hover:bg-[#701215] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-custom-black flex items-center justify-center rounded-full text-white hover:bg-[#701215] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-custom-black flex items-center justify-center rounded-full text-white hover:bg-[#701215] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-custom-black flex items-center justify-center rounded-full text-white hover:bg-[#701215] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
