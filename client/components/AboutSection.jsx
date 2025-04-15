import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  ChartBarIcon, 
  UsersIcon, 
  LightBulbIcon, 
  ScaleIcon 
} from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const cardsRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const bio = bioRef.current;
    const cards = cardsRef.current?.children || [];
    const quote = quoteRef.current;

    // Heading animation
    gsap.fromTo(heading, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: heading,
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      }
    });

    // Bio animation
    gsap.fromTo(bio, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: bio,
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      }
    });

    // Cards animation
    gsap.fromTo(cards, {
      opacity: 0,
      y: 50,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      }
    });

    // Quote animation
    gsap.fromTo(quote, {
      opacity: 0,
      scale: 0.95
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: quote,
        start: 'top bottom-=50',
        toggleActions: 'play none none none'
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const credentials = [
    {
      title: 'Professional Background',
      description: 'Over 15 years of experience in financial management and tax policy implementation.',
      icon: BriefcaseIcon,
    },
    {
      title: 'Education',
      description: 'Ph.D. in Public Finance with focus on sustainable revenue models for developing economies.',
      icon: AcademicCapIcon,
    },
    {
      title: 'Policy Development',
      description: `Architect of several tax reforms that have increased Osun State's internal revenue.`,
      icon: ChartBarIcon,
    },
    {
      title: 'Public Service',
      description: 'Dedicated to transparent governance and equitable distribution of resources.',
      icon: UsersIcon,
    },
    {
      title: 'Innovation',
      description: 'Pioneer of digital tax collection systems that have simplified compliance for citizens.',
      icon: LightBulbIcon,
    },
    {
      title: 'Balanced Approach',
      description: 'Advocates for fair taxation policies that support both citizens and developmental goals.',
      icon: ScaleIcon,
    },
  ];

  return (
    <div ref={sectionRef} className="container mx-auto px-4 md:px-24">
      <h2
        ref={headingRef}
        className="font-neuemachina text-3xl md:text-5xl text-custom-gold text-center mb-12"
      >
        About <span className="text-[#701215]">Hon. Dr. Adebayo</span>
      </h2>

      <div className="flex flex-col md:flex-row text-left text-justify gap-8 md:gap-16 mb-16">
        <div ref={bioRef} className="w-full md:w-1/2">
          <h3 className="font-bebas text-2xl text-custom-gold mb-4">
            PROFESSIONAL JOURNEY
          </h3>
          <p className="font-cabinetGrotesk text-custom-black mb-6">
            Hon. (Dr.) Adegboyega Musthofa Adebayo has dedicated his career to
            advancing fiscal responsibility and economic development in Osun
            State. As the Senior Special Assistant to the Governor on Internal
            Revenue & Tax Matters, he brings a wealth of experience and
            innovative approaches to public finance.
          </p>
          <p className="font-cabinetGrotesk text-custom-black mb-6">
            His expertise in tax policy and administration has been instrumental
            in developing frameworks that balance revenue generation with
            business-friendly environments, ensuring sustainable growth for the
            state.
          </p>
          <p className="font-cabinetGrotesk text-custom-black">
            Under his guidance, Osun State has seen significant improvements in
            internal revenue collection, transparency in fiscal processes, and
            strategic investments in public infrastructure and services.
          </p>
        </div>

        <div className="w-full md:w-1/2 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D7B65A] opacity-10 rounded-full blur-2xl"></div>
          <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div ref={quoteRef} className="relative">
              <span className="absolute top-0 left-0 text-6xl font-neuemachina text-[#701215] opacity-20">
                "
              </span>
              <blockquote className="font-cabinetGrotesk text-lg text-custom-black italic mt-8 ml-6">
                Our vision is to create a sustainable revenue framework that
                powers Osun State's development while ensuring that the tax
                burden is fair and equitable for all citizens and businesses.
                <footer className="font-bebas text-custom-gold mt-4 text-right">
                  - Hon. Dr. Adebayo
                </footer>
              </blockquote>
              <span className="absolute bottom-0 right-0 text-6xl font-neuemachina text-[#701215] opacity-20">
                "
              </span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-bebas text-2xl text-custom-maroon text-center mb-8">
        EXPERTISE & CREDENTIALS
      </h3>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {credentials.map((item, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-white/50"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-custom-maroon/10 p-2 rounded-lg">
                <item.icon
                  className="h-6 w-6 text-custom-maroon"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-neuemachina text-custom-gold text-lg">
                {item.title}
              </h3>
            </div>
            <p className="font-cabinetGrotesk text-left text-custom-black ml-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default AboutSection;