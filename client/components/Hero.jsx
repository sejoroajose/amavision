import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../utils/SplitText'

import profileImg from '/images/hon-adebayo.png'
import osunLogo from '/images/osun-coat-of-arms.png'
import taxIcon from '/images/tax-icon.png'
import revenueIcon from '/images/revenue.png'
import naira from '/images/naira.png'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const imageRef = useRef(null)
  const iconsRef = useRef(null)
  const textSplitRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const heading = headingRef.current
    const image = imageRef.current
    const icons = iconsRef.current?.children

    if (!heading) return

    // Create SplitText instance for heading animation
    textSplitRef.current = new SplitText(heading, { type: 'chars,words' })
    const chars = textSplitRef.current.chars

    // Create timeline
    timelineRef.current = gsap.timeline({
      paused: false,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      },
    })

    // Initial states
    gsap.set(chars, { opacity: 0, y: 50 })
    gsap.set(image, { opacity: 0, scale: 0.8 })
    gsap.set(icons, { opacity: 0, scale: 0 })

    // Animate elements
    timelineRef.current
      .to(image, {
        duration: 1.2,
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
      })
      .to(
        chars,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: 'power4.out',
        },
        '-=0.8'
      )
      .to(
        icons,
        {
          duration: 0.6,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (textSplitRef.current && textSplitRef.current.revert) {
        textSplitRef.current.revert()
      }
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen md:px-24 bg-custom-cream overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-custom-maroon opacity-10 transform -skew-x-12"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-custom-gold opacity-10 rounded-tr-full"></div>
      </div>

      {/* Main content container - removed bottom padding */}
      <div className="container mx-auto px-4 !pt-24 md:pt-24 mt-24 md:mt-0 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="flex items-center mb-6 md:mt-12">
              <img
                src={osunLogo}
                alt="Osun State Logo"
                className="w-12 h-12 md:w-16 md:h-16 mr-4"
              />
              <div className="text-custom-maroon font-neuemachina text-xl">
                Office of the Governor
              </div>
            </div>

            <h1
              ref={headingRef}
              className="font-neuemachina text-4xl md:text-[65px] md:text-left text-custom-black leading-tight mb-6"
            >
              Hon. (Dr). Adegboyega Musthofa Adebayo
            </h1>

            <div className="flex items-center mb-8">
              <div className="h-1 w-24 bg-custom-gold mr-4"></div>
              <span className="text-custom-maroon font-cabinetGrotesk font-medium">
                Senior Special Assistant to Osun State Governor
              </span>
            </div>

            <p className="font-cabinetGrotesk text-lg md:text-left text-custom-black opacity-90 mb-8 max-w-xl">
              Driving sustainable revenue growth and implementing fair tax
              policies for the development and prosperity of Osun State.
            </p>

            <div className="flex space-x-4">
              <button className="px-8 py-3 bg-custom-maroon text-custom-white font-cabinetGrotesk rounded-full hover:bg-opacity-90 transition-all duration-300">
                Learn More
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-custom-gold text-custom-black font-cabinetGrotesk rounded-full hover:bg-custom-gold hover:bg-opacity-10 transition-all duration-300">
                Contact Office
              </button>
            </div>
          </div>

          {/* Right column - Image & icons - enlarged and positioned to touch stats */}
          <div className="w-full md:w-1/2 relative">
            <div ref={imageRef} className="relative z-10">
              <img
                src={profileImg}
                alt="Hon. Dr. Adegboyega Musthofa Adebayo"
                className="w-full max-w-none md:max-w-xl mx-auto drop-shadow-2xl transform scale-125 translate-y-16"
              />
              <div className="absolute -inset-4 bg-custom-gold opacity-20 rounded-full blur-2xl -z-10"></div>
            </div>

            {/* Floating icons - adjusted positions to match enlarged image */}
            <div ref={iconsRef} className="absolute inset-0 z-20">
              <div className="absolute top-1/3 -left-12 bg-custom-white p-4 rounded-full shadow-lg">
                <img src={taxIcon} alt="Tax Icon" className="w-10 h-10" />
              </div>
              <div className="absolute bottom-1/3 -right-8 bg-custom-white p-4 rounded-full shadow-lg">
                <img
                  src={revenueIcon}
                  alt="Revenue Icon"
                  className="w-10 h-10"
                />
              </div>
              <div className="absolute top-2/3 left-1/4 bg-custom-white p-4 rounded-full shadow-lg">
                <img
                  src={naira}
                  alt="Revenue Icon"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section - no margin top */}
      <div className="bg-custom-black bg-opacity-95 py-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-custom-gold font-neuemachina text-3xl md:text-4xl">
                15+
              </div>
              <div className="text-custom-white font-cabinetGrotesk">
                Years of Experience
              </div>
            </div>
            <div className="p-4">
              <div className="text-custom-gold font-neuemachina text-3xl md:text-4xl">
                ₦2.1B
              </div>
              <div className="text-custom-white font-cabinetGrotesk">
                Revenue Growth
              </div>
            </div>
            <div className="p-4">
              <div className="text-custom-gold font-neuemachina text-3xl md:text-4xl">
                125+
              </div>
              <div className="text-custom-white font-cabinetGrotesk">
                Tax Initiatives
              </div>
            </div>
            <div className="p-4">
              <div className="text-custom-gold font-neuemachina text-3xl md:text-4xl">
                30+
              </div>
              <div className="text-custom-white font-cabinetGrotesk">
                Policies Implemented
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
