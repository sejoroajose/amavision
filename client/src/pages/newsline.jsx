import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AnimatedNav from '../../components/Nav2'
import Footer from '../../components/Footer'
import {
  CalendarIcon,
  ArchiveIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'

const ITEMS_PER_PAGE = 5

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sesi-new.onrender.com'
    : 'http://localhost:8080'

const News = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [newsData, setNewsData] = useState([])
  const [selectedNews, setSelectedNews] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${API_URL}/api/news?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${searchQuery}`
        )
        if (!response.ok) throw new Error('Failed to fetch news')
        const data = await response.json()

        setNewsData(data.news)
        setTotalPages(data.totalPages)

        if (!slug && data.news.length > 0 && !selectedNews) {
          setSelectedNews(data.news[0])
          navigate(`/news/${data.news[0].slug}`, { replace: true })
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [currentPage, searchQuery, slug, navigate])

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!slug) return

      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/api/news/${slug}`)
        if (!response.ok) throw new Error('Failed to fetch news detail')
        const data = await response.json()
        setSelectedNews(data)
      } catch (err) {
        setError(err.message)
        navigate('/news', { replace: true })
      } finally {
        setLoading(false)
      }
    }

    fetchNewsDetail()
  }, [slug, navigate])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsSelect = (news) => {
    setSelectedNews(news)
    window.history.pushState({}, '', `/news/${news.slug}`)
  }

  if (loading && !selectedNews) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AnimatedNav />

      <div className="pt-[120px] pb-16">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
          <h1 className="font-neuemachina text-custom-orange text-4xl md:text-[32px] mb-8">
            NEWS & UPDATES
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80 xl:w-96 flex-shrink-0 order-2 lg:order-1">
              <div className="sticky top-[120px] bg-base-200 rounded-xl shadow-xl">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <ArchiveIcon className="w-5 h-5 text-custom-orange" />
                    <h3 className="text-xl font-bold text-custom-orange">
                      News Archive
                    </h3>
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 pl-10 rounded-lg bg-base-300 text-custom-green placeholder-custom-green/50 focus:outline-none focus:ring-2 focus:ring-custom-orange"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-custom-green/50" />
                  </div>

                  <div className="divide-y divide-base-300">
                    {newsData.map((news) => (
                      <button
                        key={news.id}
                        className={`w-full text-left p-4 transition-colors duration-200 hover:bg-base-300 ${
                          selectedNews?.id === news.id ? 'bg-base-300' : ''
                        }`}
                        onClick={() => handleNewsSelect(news)}
                      >
                        <h4 className="font-medium text-custom-green line-clamp-2 mb-2">
                          {news.title.toUpperCase()}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-custom-green opacity-75">
                          <CalendarIcon className="w-3 h-3" />
                          <time dateTime={news.date}>
                            {new Date(news.date).toLocaleDateString()}
                          </time>
                        </div>
                      </button>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 px-4 py-2 bg-base-300 rounded-lg">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1 rounded-md hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon className="w-5 h-5 text-custom-orange" />
                      </button>

                      <span className="text-sm text-custom-green">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1 rounded-md hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRightIcon className="w-5 h-5 text-custom-orange" />
                      </button>
                    </div>
                  )}

                  {newsData.length === 0 && (
                    <div className="text-center py-8 text-custom-green">
                      No news articles found matching your search.
                    </div>
                  )}
                </div>
              </div>
            </aside>

            <main className="lg:flex-1 order-1 lg:order-2">
              {selectedNews ? (
                <article className="bg-base-200 rounded-xl shadow-xl">
                  <figure className="px-4 pt-4">
                    <img
                      src={selectedNews.image}
                      alt={selectedNews.title}
                      className="rounded-xl w-full aspect-video object-cover"
                    />
                  </figure>
                  <div className="p-6">
                    <h2 className="text-custom-orange font-cabinetGrotesk text-2xl md:text-3xl mb-4">
                      {selectedNews.title}
                    </h2>

                    <div className="flex items-center text-justify gap-2 text-sm text-custom-green mb-6">
                      <CalendarIcon className="w-4 h-4" />
                      <time dateTime={selectedNews.date}>
                        {new Date(selectedNews.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </time>
                    </div>

                    <div className="prose max-w-none text-custom-green mb-6">
                      {/* <p className="text-lg text-justify leading-relaxed whitespace-pre-line">
                        {selectedNews.fullContent}
                      </p> */}
                      <p
                        className="text-lg text-justify leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: selectedNews.fullContent.replace(
                            /\n/g,
                            '<br>'
                          ),
                        }}
                      />
                    </div>
                    <div className="text-left mb-8">
                      <div className="text-custom-orange text-md font-bold text-2xl font-cabinetGrotesk">
                        {selectedNews.author}
                      </div>
                      <div>{selectedNews.author_portfolio}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedNews.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-primary p-4 text-custom-white bg-custom-orange border-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-custom-green">
                    Select a news article to view
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default News
