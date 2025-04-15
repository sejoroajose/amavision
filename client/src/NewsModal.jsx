import React, { useState, useEffect } from 'react'

export default function NewsModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if modal has been shown today
    const lastShown = localStorage.getItem('newsModalLastShown')
    const today = new Date().toDateString()

    if (!lastShown || lastShown !== today) {
      // Show modal after a short delay if not shown today
      const showTimer = setTimeout(() => {
        setIsOpen(true)
      }, 800)

      return () => clearTimeout(showTimer)
    }
  }, [])

  useEffect(() => {
    // Auto-close modal after 5 seconds and refresh homepage
    if (isOpen) {
      const closeTimer = setTimeout(() => {
        closeModal()
      }, 5000)

      return () => clearTimeout(closeTimer)
    }
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)

    // Mark modal as shown for today
    const today = new Date().toDateString()
    localStorage.setItem('newsModalLastShown', today)

    // Reload the page after the modal closes
    window.location.reload()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center rounded p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg max-h-screen overflow-y-auto bg-[#FAF5E9] rounded-lg shadow-xl animate-fadeIn">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10"
              aria-label="Close"
            >
              <div className="bg-white rounded-full p-1 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#181213] hover:text-[#701215] transition-colors"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </button>

            <div className="bg-[#701215] text-[#FFFEFE] p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Latest News</h2>
                <div className="text-sm text-[#D7B65A]">13th April 2025</div>
              </div>
            </div>

            <div className="w-full h-48 overflow-hidden">
              <img
                src="/images/phd.jpeg"
                alt="Dr Adebayo Adegboyega receiving his doctorate"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-[#181213] mb-3">
                Osun gov's aide bags PhD, eyes entrepreneurial growth
              </h3>

              <div className="prose text-[#181213] font-cabinetGrotesk mb-6 text-justify">
                <p className="mb-3">
                  Dr Adebayo Adegboyega, the Senior Special Assistant to
                  Governor Ademola Adeleke of Osun State on Tax and Revenue
                  Matters, has been formally conferred with the Doctor of
                  Business Administration in International Business by Lagos
                  State University, Ojo...
                </p>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://www.vanguardngr.com/2025/01/dr-adegboyega-musthofa-adebayo-a-visionary-leader-and-champion-of-development/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 bg-[#D7B65A] text-[#181213] font-medium rounded hover:bg-[#D7B65A]/80 transition-colors"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
