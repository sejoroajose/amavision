import React, { useState, useEffect, useRef } from 'react'
import styles from './VideoBackground.module.css'

const VideoBackground = ({
  desktopVideo,
  mobileVideo,
  className,
  style,
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const playVideo = () => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.log('Autoplay failed:', error)
      })
    }
  }

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      // Reload the video source when switching between mobile and desktop
      videoElement.load()
      playVideo()
    }
  }, [isMobile])

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const handleFullscreen = () => {
    const videoElement = videoRef.current
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen()
    }
  }

  return (
    <div
      className={`${styles.videoBackground} ${className || ''}`}
      style={style}
    >
      <video
        ref={videoRef}
        loop
        playsInline
        poster={isMobile ? mobileVideo.poster : desktopVideo.poster}
        muted={isMuted}
        className={styles.video}
      >
        <source
          src={isMobile ? mobileVideo.src : desktopVideo.src}
          type={isMobile ? mobileVideo.type : desktopVideo.type}
        />
        Your browser does not support the video tag.
      </video>

      <div className={`${styles.overlay} ${styles.top}`}></div>
      <div className={`${styles.overlay} ${styles.bottom}`}></div>
      <div className={styles.content}>{children}</div>

      <button onClick={toggleMute} className={styles.muteButton}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>

      <button onClick={handleFullscreen} className={styles.fullscreenButton}>
        Fullscreen
      </button>
    </div>
  )
}

export default VideoBackground
