import React from 'react'
import HeroSection from '../components/Hero'
import AboutSection from '../components/AboutSection'
import InitiativesSection from '../components/InitiativesSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import AnimatedNav from '../components/Nav2'

const HomePage = () => {
  return (
    <main className="bg-[#FAF5E9] min-h-screen">
      <AnimatedNav />
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-[#FAF5E9]">
        <AboutSection />
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-16 md:py-24 bg-custom-maroon/10">
        <InitiativesSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-[#FAF5E9]">
        <ContactSection />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default HomePage
