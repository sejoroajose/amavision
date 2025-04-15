import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ImageGallery = () => {
  const imageSources = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    className: 'center',
    fade: true,
    cssEase: 'linear',
  }

  const images = imageSources.map((src, index) => (
    <div key={index} className="flex justify-center items-center p-4">
      <img
        src={src}
        alt={`Blog image ${index + 1}`}
        width={300}
        height={350}
        className="rounded-t-[50px] rounded-b-[50px] md:rounded-b-[60px] md:rounded-t-[60px] object-cover shadow-lg"
      />
    </div>
  ))

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-16">
      <div className="relative">
        <Slider {...settings}>{images}</Slider>
      </div>
    </div>
  )
}

export default ImageGallery