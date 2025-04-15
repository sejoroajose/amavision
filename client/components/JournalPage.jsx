import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import DatePicker from 'react-datepicker'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { X, Calendar, ChevronDown } from 'lucide-react'
import { format } from 'date-fns'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'react-datepicker/dist/react-datepicker.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sesi-new.onrender.com'
    : 'http://localhost:8080'

const JournalPage = () => {
  const svgRef = useRef(null)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [journalData, setJournalData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJournals = async (startDate = null, endDate = null) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const url = new URL(`${API_URL}/api/journals`)

      if (startDate && endDate) {
        url.searchParams.append('startDate', startDate)
        url.searchParams.append('endDate', endDate)
      }
      url.searchParams.append('page', 1)
      // Set the limit to 7 to display only the latest 7 journals
      url.searchParams.append('limit', 7)

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch journals')
      }

      const data = await response.json()
      // Sort journals descending by date to ensure the latest ones appear first,
      // then slice the first 7 entries (in case the API returns extra data)
      const sortedJournals = data.journals.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
      setJournalData(sortedJournals.slice(0, 7))
      setLoading(false)
    } catch (err) {
      console.error('Error fetching journals:', err)
      setError('Failed to fetch journals')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    const formattedDate = format(date, 'yyyy-MM-dd')
    const entry = journalData.find((item) => item.date === formattedDate)
    if (entry) {
      setSelectedEntry(entry)
      setShowModal(true)
    }
    setShowCalendar(false)
  }

  const handleBubbleClick = (entry) => {
    setSelectedEntry(entry)
    setShowModal(true)
  }

  useEffect(() => {
    if (!svgRef.current) return

    const theLine = svgRef.current.querySelector('.theLine')
    const pathLength = theLine?.getTotalLength() || 0

    gsap.set('.theLine', {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    })

    gsap.set('.horizontal-line', { opacity: 0.5 })
    gsap.set('.static-ball', { autoAlpha: 0 })
    gsap.set('.chat-bubble', {
      autoAlpha: 0,
      scale: 0.8,
      transformOrigin: 'right center',
    })

    const reveals = gsap.timeline({
      defaults: { duration: 0.1 },
    })

    reveals
      .to('.line01', { opacity: 1, ease: 'elastic(2.5, 1)' }, 0.2)
      .to('.date01', { autoAlpha: 1 }, 0.2)
      .to('.ball02', { autoAlpha: 1 }, 0.2)
      .to(
        '.chat01',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        },
        0.3
      )
      .to('.line02', { opacity: 1, ease: 'elastic(2.5, 1)' }, 0.33)
      .to('.date02', { autoAlpha: 1 }, 0.33)
      .to('.ball03', { autoAlpha: 1 }, 0.33)
      .to(
        '.chat02',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        },
        0.43
      )
      .to('.line03', { opacity: 1, ease: 'elastic(2.5, 1)' }, 0.46)
      .to('.date03', { autoAlpha: 1 }, 0.46)
      .to('.ball04', { autoAlpha: 1 }, 0.46)
      .to(
        '.chat03',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        },
        0.56
      )

    const main = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: '#svg-stage',
          scrub: true,
          start: 'top center',
          end: 'bottom center',
        },
      })
      .to('.ball01', { duration: 0.01, autoAlpha: 1 })
      .to('.theLine', { strokeDashoffset: 0 }, 0)
      .to(
        '.ball01',
        {
          motionPath: {
            path: '.theLine',
            align: '.theLine',
            alignOrigin: [0.5, 0.5],
          },
        },
        0
      )
      .add(reveals, 0)

    return () => {
      main.kill()
      reveals.kill()
    }
  }, [journalData])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-custom-orange"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    )
  }

  const Modal = () => {
    const [isFullDescription, setIsFullDescription] = useState(false)

    if (!selectedEntry) return null

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-custom-orange rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-2 hover:bg-black/10 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 overflow-y-auto max-h-[90vh]">
                <h2 className="text-3xl font-neuemachina text-custom-white mb-4 leading-tight">
                  {selectedEntry.title}
                </h2>
                <div className="bg-base-200/50 px-4 py-2 font-cabinetGrotesk rounded-lg inline-block mb-6">
                  {format(new Date(selectedEntry.date), 'MMMM d, yyyy')}
                </div>
                <p
                  className={`text-custom-white text-lg font-cabinetGrotesk leading-relaxed 
                  ${!isFullDescription ? 'line-clamp-3' : ''}`}
                >
                  {selectedEntry.description}
                </p>
                {selectedEntry.description.length > 150 && (
                  <button
                    onClick={() => setIsFullDescription(!isFullDescription)}
                    className="text-custom-white underline mt-2 flex  items-center"
                  >
                    {isFullDescription ? 'Show Less' : 'Read More'}
                    <ChevronDown
                      className={`ml-1 w-4 h-4 transform  transition-transform 
                        ${isFullDescription ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
              <div className="bg-base-200 h-full">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  pagination={{ clickable: true }}
                  className="h-full"
                >
                  {selectedEntry.media.map((url, index) => (
                    <SwiperSlide key={index}>
                      <div className="aspect-square md:aspect-auto md:h-full">
                        <img
                          src={url}
                          alt={`Event media ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.closest(
                              '.swiper-slide'
                            ).innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-500">
                                Image Not Available
                               </div>`
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-black/30 rounded-full"></div>
                  <div className="swiper-button-next !text-white !w-12 !h-12 !bg-black/30 rounded-full"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MobileJournalEntry = ({ entry, onClick }) => {
    const [isFullDescription, setIsFullDescription] = useState(false)

    return (
      <div
        className="w-4/5 bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer relative"
        onClick={onClick}
      >
        <div className="bg-[#9BC53D] text-white px-3 py-1 rounded-md w-fit text-sm mb-4">
          {format(new Date(entry.date), 'MMMM d, yyyy')}
        </div>
        <h3 className="text-gray-800 font-neuemachina text-xl mb-2">
          {entry.title}
        </h3>
        <p
          className={`text-gray-600 font-cabinetGrotesk 
          ${!isFullDescription ? 'line-clamp-3' : ''}`}
        >
          {entry.description}
        </p>
        {entry.media && entry.media.length > 0 && (
          <div className="mt-4 aspect-square overflow-hidden rounded-lg">
            <img
              src={entry.media[0]}
              alt={`First media for ${entry.title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.closest(
                  'div'
                ).innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-500">
                    Image Not Available
                   </div>`
              }}
            />
          </div>
        )}
        {entry.description.length > 150 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsFullDescription(!isFullDescription)
            }}
            className="text-[#9BC53D] underline mt-2 flex text-center items-center"
          >
            {isFullDescription ? 'Show Less' : 'Read More'}
            <ChevronDown
              className={`ml-1 w-4 h-4 transform transition-transform 
                ${isFullDescription ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    )
  }

  const JournalNote = ({ className, x, y, entry }) => (
    <g
      className={`journal-note ${className} cursor-pointer group`}
      transform={`translate(${x}, ${y})`}
      onClick={() => handleBubbleClick(entry)}
    >
      <g transform="scale(1, 0.9)">
        <path
          className="fill-white transition-transform duration-300 group-hover:scale-105"
          transform="rotate(-2)"
          d="M-400,-30 
           h380 
           c5.5,0 10,4.5 10,10 
           v100 
           c0,5.5 -4.5,10 -10,10 
           h-380 
           c-5.5,0 -10,-4.5 -10,-10 
           v-100 
           c0,-5.5 4.5,-10 10,-10 
           z"
          filter="url(#paper-shadow)"
        />
        <g transform="translate(-380, -20)">
          <rect
            width="80"
            height="25"
            className="fill-[#9BC53D] opacity-80"
            rx="4"
          />
          <text
            className="fill-white text-[12px] font-cabinetGrotesk"
            x="5"
            y="16"
          >
            {format(new Date(entry.date), 'MMM d')}
          </text>
        </g>
        <text
          className="fill-gray-800 text-[16px] font-neuemachina"
          x="-380"
          y="50"
        >
          {entry.title}
        </text>
        <text
          className="fill-gray-600 text-[12px] font-cabinetGrotesk"
          x="-380"
          y="70"
        >
          {entry.description.slice(0, 50)}...
        </text>
      </g>
    </g>
  )

  const ShadowFilter = () => (
    <defs>
      <filter id="paper-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.15" />
        <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
        <feOffset dx="0" dy="1" in="blur" result="offsetBlur" />
        <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
      </filter>
    </defs>
  )

  // Define a static positions array with 7 coordinate objects for the circles
  const staticPositions = [
    { cx: 272, cy: 201 },
    { cx: 325, cy: 401 },
    { cx: 252, cy: 601 },
    { cx: 300, cy: 801 },
    { cx: 350, cy: 901 },
    { cx: 300, cy: 1001 },
    { cx: 250, cy: 1101 },
  ]

  return (
    <div className="md:mt-32 mt-28">
      <div className="min-h-screen text-white font-sans relative">
        {showModal && <Modal />}
        <div className="container px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl text-custom-orange font-neuemachina mb-4">
              Activity Journal
            </h1>
            <p className="text-xl font-cabinetGrotesk text-white/70">
              Track my activities, milestones and progress
            </p>
          </div>
          <div className="flex justify-center mt-8 z-40">
            <div className="relative">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9BC53D] to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 font-cabinetGrotesk"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Click here to explore my adventures
                </span>
              </button>
              {showCalendar && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateSelect}
                    inline
                    calendarClassName="bg-white text-gray-700"
                    dayClassName={(date) => {
                      const dateString = format(date, 'yyyy-MM-dd')
                      return journalData.some(
                        (entry) => entry.date === dateString
                      )
                        ? 'bg-[#9BC53D] text-white rounded-full'
                        : 'hover:bg-green-100 rounded-full'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="md:block hidden">
            <svg
              ref={svgRef}
              id="svg-stage"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1200"
              className="max-w-[1000px] overflow-visible mt-[7vh]"
            >
              <ShadowFilter />
              {journalData.map((_, index) => (
                <path
                  key={`line${index + 1}`}
                  className={`line0${
                    index + 1
                  } horizontal-line stroke-white stroke-2 fill-none`}
                  d={`M0,${200 + index * 200}h590`}
                  strokeDasharray="8 8"
                />
              ))}
              {journalData.map((entry, index) => (
                <text
                  key={`date${index + 1}`}
                  className={`date0${
                    index + 1
                  } fill-white text-[12px] font-cabinetGrotesk invisible`}
                  transform={`matrix(1 0 0 1 110 ${190 + index * 200})`}
                >
                  {format(new Date(entry.date), 'MMMM d, yyyy')}
                </text>
              ))}
              {journalData.map((entry, index) => (
                <JournalNote
                  key={`note${index + 1}`}
                  className={`note0${index + 1}`}
                  x={1020}
                  y={162 + index * 200}
                  entry={entry}
                />
              ))}
              <path
                className="theLine stroke-[#9BC53D] fill-none"
                strokeWidth="3"
                strokeMiterlimit="10"
                d="M0,0c80,25,200,80,276,201c49,75,54.8,140.7,49,200c-7,88-69,108-76,199c0,72,76.9,113,76,199c0,85-121.3,174.8-206,201"
              />
              <circle
                className="ball ball01 invisible"
                cx="66"
                cy="80"
                r="20"
                fill="#9BC53D"
              />
              {journalData.map((_, index) => (
                <circle
                  key={`ball${index + 2}`}
                  className={`ball ball0${index + 2} static-ball`}
                  cx={staticPositions[index].cx}
                  cy={staticPositions[index].cy}
                  r="20"
                  fill="#9BC53D"
                  stroke="white"
                  strokeWidth="3"
                  strokeMiterlimit="10"
                />
              ))}
            </svg>
          </div>
          <div className="md:hidden block z-0">
            <div className="flex flex-col items-center mt-8 space-y-8">
              {journalData.map((entry, index) => (
                <div
                  key={`mobile-note-${index}`}
                  className="w-4/5 bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleBubbleClick(entry)}
                >
                  <div className="bg-[#9BC53D] text-white px-3 py-1 rounded-md w-fit text-sm mb-4">
                    {format(new Date(entry.date + 'T00:00:00'), 'MMMM d, yyyy')}
                  </div>

                  <h3 className="text-gray-800 font-neuemachina text-xl mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 font-cabinetGrotesk">
                    {entry.description.slice(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JournalPage
