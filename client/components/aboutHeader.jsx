import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const RotatingText = () => {
  const rotatorRef = useRef(null)
  useEffect(() => {
    const words = rotatorRef.current.querySelectorAll('span')
    let mainTimeline = gsap.timeline({ repeat: -1 })

    words.forEach((word, i) => {
      let wordTimeline = gsap.timeline()

      wordTimeline.fromTo(
        word,
        { y: '100%', opacity: 0 },
        { duration: 0.5, y: '0%', opacity: 1, ease: 'power2.out' }
      )

      wordTimeline.to(word, { duration: 2, opacity: 1 })

      wordTimeline.to(word, {
        duration: 0.5,
        y: '-100%',
        opacity: 0,
        ease: 'power2.in',
      })

      mainTimeline.add(wordTimeline, i * 2)
    })
  }, [])

  return (
    <div
      style={{ marginTop: '400px !important' }}
      className=" text-4xl md:text-7xl justify-left align-center  md:ml-[200px]  flex py-[100px] font-neuemachina"
    >
      <div className="text-custom-green">I AM</div>
      <span ref={rotatorRef} className="rotator relative ml-8">
        <span className="word-item absolute whitespace-nowrap text-custom-orange">SESI</span>
        <span></span>
        <span className="word-item absolute whitespace-nowrap text-custom-orange">OLUWASEUN</span>
        <span></span>
        <span className="word-item absolute whitespace-nowrap text-custom-orange">WHINGAN</span>
        <span></span>
        <span className="word-item absolute whitespace-nowrap text-custom-orange">SMART</span>
        <span></span>
        <span className="word-item absolute whitespace-nowrap text-custom-orange">
          INTELLIGENT
        </span>
        <span></span>
        <span className="word-item absolute whitespace-nowrap text-custom-orange">
          FOR BADAGRY
        </span>
        <span></span>
      </span>
    </div>
  )
}

export default RotatingText
 