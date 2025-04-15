import React from 'react'
import { X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

const JournalModal = ({ entry, onClose }) => {
  if (!entry) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-custom-orange rounded-2xl w-full max-w-2xl overflow-hidden shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 p-2">
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">{entry.title}</h2>
          <p className="my-4">{entry.description}</p>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {entry.media.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Media ${index}`}
                  className="w-full h-64 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default JournalModal
