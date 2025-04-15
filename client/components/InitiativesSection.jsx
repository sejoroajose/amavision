import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const InitiativesSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  const initiatives = [
    {
      category: 'Revenue Enhancement',
      items: [
        {
          title: 'Digital Tax Collection System',
          description:
            'Implementation of a modern digital infrastructure for seamless tax collection and management.',
          status: 'Completed',
          impact:
            'Increased collection efficiency by 45% and reduced processing time by 60%.',
        },
        {
          title: 'Tax Education Program',
          description:
            'Public awareness campaign to educate citizens on tax compliance and benefits.',
          status: 'Ongoing',
          impact:
            'Improved voluntary compliance rates by 30% across Osun State.',
        },
        {
          title: 'SME Tax Relief Initiative',
          description:
            'Targeted tax incentives for small and medium enterprises to stimulate growth.',
          status: 'Launched 2024',
          impact: 'Supporting over 1,200 SMEs throughout Osun State.',
        },
      ],
    },
    {
      category: 'Fiscal Transparency',
      items: [
        {
          title: 'Open Budget Portal',
          description:
            'Public platform displaying real-time revenue collection and allocation data.',
          status: 'Implemented',
          impact: 'Osun State ranked #3 nationally for fiscal transparency.',
        },
        {
          title: 'Taxpayer Feedback System',
          description:
            'Direct channel for citizens to provide feedback on tax policies and services.',
          status: 'Active',
          impact:
            'Over 2,000 citizen suggestions implemented in policy revisions.',
        },
        {
          title: 'Revenue Accountability Framework',
          description:
            'Comprehensive system for tracking and reporting on revenue utilization.',
          status: 'Established',
          impact: 'Reduced revenue leakage by 35% in the first year.',
        },
      ],
    },
    {
      category: 'Infrastructure Development',
      items: [
        {
          title: 'Revenue-Backed Infrastructure Fund',
          description:
            'Dedicated funding mechanism for critical infrastructure using tax revenue.',
          status: 'Operational',
          impact: 'Funded 17 major infrastructure projects across Osun State.',
        },
        {
          title: 'Rural Development Program',
          description:
            'Targeted infrastructure investments in underserved rural communities.',
          status: 'Expanding',
          impact: 'Connected 45 rural communities to essential services.',
        },
        {
          title: 'Public-Private Partnership Framework',
          description:
            'Structured approach to engaging private sector in infrastructure development.',
          status: 'Active',
          impact:
            'Attracted ₦18 billion in private investment for public projects.',
        },
      ],
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current

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

    // Set up a ScrollTrigger for each tab content
    const animateTabContent = () => {
      const items = document.querySelectorAll('.initiative-item')
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      )
    }

    animateTabContent()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [activeTab])

  const handleTabChange = (index) => {
    setActiveTab(index)
  }

  return (
    <div ref={sectionRef} className="container mx-auto px-4 md:px-24">
      <h2
        ref={headingRef}
        className="font-neuemachina text-3xl md:text-5xl text-custom-maroon text-center mb-12"
      >
        Key <span className="text-custom-gold">Initiatives</span>
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {initiatives.map((category, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-6 py-2 rounded-full font-bebas text-lg transition-all duration-300 ${
              activeTab === index
                ? 'bg-custom-gold text-white shadow-lg'
                : 'bg-white/70 text-custom-gold hover:bg-white hover:shadow-md'
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {initiatives[activeTab].items.map((item, index) => (
          <div
            key={index}
            className="initiative-item bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-neuemachina text-left  text-custom-maroon text-xl">
                {item.title}
              </h3>
              <span className="bg-custom-gold/20 text-custom-maroon px-3 py-1 rounded-full text-sm font-cabinetGrotesk">
                {item.status}
              </span>
            </div>

            <p className="font-cabinetGrotesk text-left text-justify text-custom-black mb-4">
              {item.description}
            </p>

            <div className="bg-[#FAF5E9]/70 p-3 rounded-lg mt-auto">
              <h4 className="font-bebas text-[#701215] text-sm mb-1">IMPACT</h4>
              <p className="font-cabinetGrotesk text-custom-black text-sm">
                {item.impact}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a
          href="#contact"
          className="inline-block bg-[#701215] hover:bg-opacity-90 text-white font-cabinetGrotesk font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Collaborate With Us
        </a>
      </div>
    </div>
  )
}

export default InitiativesSection
