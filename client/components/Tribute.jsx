import React, { useState, useEffect, useRef } from 'react'
import AnimatedNav from '../components/Nav2'
import { Pin, Heart, Calendar, User, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Cookies from 'js-cookie'
import gsap from 'gsap'
import BiographySection from '../components/Biography'

const Tribute = () => {
  const [tributes, setTributes] = useState([])
  const [newTribute, setNewTribute] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(true)
  const [likedTributes, setLikedTributes] = useState(new Set())

  const doveRef = useRef(null)

  useEffect(() => {
    gsap.to(doveRef.current, {
      y: -10,
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(doveRef.current, {
      rotate: 5,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, [])


  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://sesi-new.onrender.com'
      : 'http://localhost:8080'

  useEffect(() => {
    fetchTributes()
    const liked = Cookies.get('likedTributes')
    if (liked) {
      setLikedTributes(new Set(JSON.parse(liked)))
    }
  }, [])

  const fetchTributes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tributes`)
      const data = await response.json()
      setTributes(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tributes:', error)
      setLoading(false)
    }
  }

  const handleSubmitTribute = async (e) => {
    e.preventDefault()
    if (!newTribute.trim() || !firstName.trim() || !lastName.trim()) return

    try {
      const response = await fetch(`${API_URL}/api/tributes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newTribute, firstName, lastName }),
      })
      if (response.ok) {
        setNewTribute('')
        setFirstName('')
        setLastName('')
        fetchTributes()
      }
    } catch (error) {
      console.error('Error submitting tribute:', error)
    }
  }

  const handleLikeTribute = async (tributeId) => {
    if (likedTributes.has(tributeId)) {
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/api/tributes/${tributeId}/like`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (response.ok) {
        const newLikedTributes = new Set(likedTributes)
        newLikedTributes.add(tributeId)
        setLikedTributes(newLikedTributes)

        Cookies.set('likedTributes', JSON.stringify([...newLikedTributes]), {
          expires: 7,
        })

        await fetchTributes()
      }
    } catch (error) {
      console.error('Error liking tribute:', error)
    }
  }

  const getTributeColor = (uuid) => {
    const colors = [
      'bg-gradient-to-br from-green-100 to-emerald-50',
      'bg-gradient-to-br from-emerald-50 to-green-100',
      'bg-gradient-to-br from-lime-50 to-green-100',
      'bg-gradient-to-br from-green-50 to-emerald-100',
      'bg-gradient-to-br from-emerald-100 to-lime-50',
      'bg-gradient-to-br from-green-100 to-lime-50',
    ]

    const hash = uuid
      .substring(0, 8)
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }
  const TributeCard = ({ tribute, isPinned }) => (
    <Card
      className={`${getTributeColor(
        tribute.id
      )} border-l-4 border-green-600  transition-all duration-300 hover:shadow-xl`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-green-200">
          <div className="bg-green-600 rounded-full p-2">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-neuemachina text-lg font-medium text-green-800">
              {tribute.author}
            </h3>
            {/* <p className="text-sm text-green-600">Tribute Author</p> */}
          </div>
        </div>

        <p className="text-gray-800 mb-4 text-lg text-left text-justify leading-relaxed font-cabinetGrotesk">
          {tribute.content}
        </p>

        {/* Footer with date and likes */}
        <div className="flex items-center justify-end text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-green-700" />
              {new Date(tribute.createdAt).toLocaleDateString()}
            </span>
            <button
              onClick={() => handleLikeTribute(tribute.id)}
              className={`flex items-center gap-1 transition-colors ${
                likedTributes.has(tribute.id)
                  ? 'text-red-500 cursor-not-allowed'
                  : 'hover:text-red-500'
              }`}
              disabled={likedTributes.has(tribute.id)}
            >
              <Heart
                className={`w-4 h-4 ${
                  likedTributes.has(tribute.id) ? 'fill-red-500' : ''
                }`}
              />
              {tribute.likes}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen ">
      <AnimatedNav />

      <section className="pt-[120px] relative">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16">
          <div className="text-center mb-16">
            <div className="mb-8 relative">
              <img
                ref={doveRef}
                src="https://res.cloudinary.com/dnu6az3um/image/upload/v1737108535/dove_a0cvwo.png"
                alt="Dove"
                className="absolute -top-8 right-3/4 w-16 h-16 md:w-20 md:h-20 z-10"
              />

              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-custom-white shadow-xl">
                <img
                  src="https://res.cloudinary.com/dnu6az3um/image/upload/v1737106171/sunny_c8jbjw.jpg"
                  alt="Sunny Ajose"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-neuemachina mb-6 text-custom-orange">
              In Memory of Chief Sunny Ajose (OON)
            </h1>
            <p className="text-xl text-white font-cabinetGrotesk max-w-2xl mx-auto">
              A tribute to a remarkable Nigerian political icon whose legacy
              continues to inspire generations. (1946 - 2025)
            </p>
          </div>
          <BiographySection />
          {/* Rest of your component... */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-white/90 border border-green-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold font-neuemachina mb-6 text-green-800">
                  Share Your Tribute
                </h2>
                <form onSubmit={handleSubmitTribute} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-custom-orange focus:border-custom-white bg-white/50"
                      required
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-custom-orange focus:border-custom-white bg-white/50"
                      required
                    />
                  </div>
                  <textarea
                    value={newTribute}
                    onChange={(e) => setNewTribute(e.target.value)}
                    placeholder="Share your memories and thoughts about Sunny Ajose..."
                    className="w-full p-4 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/50 min-h-[150px]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-custom-white text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Send className="w-4 h-4" />
                    Submit Tribute
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-12">
            {tributes.some((t) => t.isPinned) && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-800">
                  <Pin className="w-6 h-6" />
                  Pinned Tributes
                </h2>
                <div className="grid gap-6">
                  {tributes
                    .filter((tribute) => tribute.isPinned)
                    .map((tribute) => (
                      <TributeCard
                        key={tribute.id}
                        tribute={tribute}
                        isPinned={true}
                      />
                    ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-6 text-custom-green">
                Recent Tributes
              </h2>
              <div className="grid gap-6">
                {tributes
                  .filter((tribute) => !tribute.isPinned)
                  .map((tribute) => (
                    <TributeCard
                      key={tribute.id}
                      tribute={tribute}
                      isPinned={false}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-custom-white text-white text-center py-4">
        <p>
          Built with ❤️ by the guys @
          <a
            href="https://codeverse.africa"
            target="_blank"
            className="text-custom-orange hover:underline"
          >
            CodeverseAfrica
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Tribute
