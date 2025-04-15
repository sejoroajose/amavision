import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Disclosure } from '@headlessui/react'
import { format } from 'date-fns'
import { ChevronDown, Calendar, Clock } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'react-datepicker/dist/react-datepicker.css'



const journalData = [
  {
    date: '2024-09-25',
    title: 'REPRESENTING NIGERIA IN KENTUCKY, USA',
    description: `Driven by the vision of National progress as a representative of Badagry Constituency in the 10th National Assembly, Honorable Sesi Whingan had the privilege of representing Nigeria at The National Conference of State Legislators in Kentucky, USA in September, 2024.`,
    media: [
      '/images/journal-1.jpg',
      '/images/journal-2.jpg',
      '/images/journal-4.jpg',
    ],
  },
  {
    date: '2024-09-24',
    title: 'Community Outreach Program',
    description:
      'Led a community outreach program focusing on youth education and empowerment.',
    media: ['/api/placeholder/800/600'],
  },
  {
    date: '2024-09-23',
    title: 'Legislative Session',
    description:
      'Participated in key legislative sessions discussing infrastructure development.',
    media: ['/api/placeholder/800/600'],
  },
  {
    date: '2024-09-22',
    title: 'Town Hall Meeting',
    description:
      'Hosted a town hall meeting to address constituent concerns and share progress updates.',
    media: ['/api/placeholder/800/600'],
  },
  {
    date: '2024-09-21',
    title: 'Economic Development Forum',
    description:
      'Attended an economic development forum focused on local business growth.',
    media: ['/api/placeholder/800/600'],
  },
]



const JournalPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedEntry, setSelectedEntry] = useState(journalData[0])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    const formattedDate = format(date, 'yyyy-MM-dd')
    const entry = journalData.find((item) => item.date === formattedDate)
    if (entry) {
      setSelectedEntry(entry)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-2">
            Activity Journal
          </h1>
          <p className="text-base-content/70">
            Tracking progress and making impact
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="card bg-base-100 shadow-lg rounded-lg">
              <div className="card-body p-5">
                <Disclosure defaultOpen>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="btn btn-ghost w-full flex justify-between items-center gap-2 px-4 py-2 bg-base-200 hover:bg-base-300 rounded-lg transition-all">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-base-content">
                            Calendar
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transform transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-4">
                        <div className="p-4 border border-base-300 rounded-lg bg-base-100 shadow-inner">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateSelect}
                            inline
                            calendarClassName="!bg-base-100 !text-base-content !shadow-lg rounded-lg"
                            dayClassName={() => '!hover:bg-base-200'}
                            className="w-full border border-base-300 rounded-lg"
                          />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            {selectedEntry && (
              <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-base-content/70" />
                        <span className="text-sm text-base-content/70">
                          {format(
                            new Date(selectedEntry.date),
                            'MMMM do, yyyy'
                          )}
                        </span>
                      </div>
                      <h2 className="card-title text-2xl mb-4">
                        {selectedEntry.title}
                      </h2>
                      <p className="text-base-content/80 leading-relaxed">
                        {selectedEntry.description}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="rounded-xl overflow-hidden">
                        <Swiper
                          spaceBetween={0}
                          slidesPerView={1}
                          className="rounded-xl"
                        >
                          {selectedEntry.media.map((url, index) => (
                            <SwiperSlide key={index}>
                              <div className="aspect-video">
                                <img
                                  src={url}
                                  alt={`Journal media ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-base-content">
                Recent Entries
              </h3>
              <div className="badge badge-lg">{journalData.length} Entries</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journalData.slice(1, 6).map((entry, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="card-body p-4">
                    <div className="flex gap-4">
                      <div className="mask mask-squircle w-24 h-24 flex-shrink-0">
                        <img
                          src={entry.media[0]}
                          alt={entry.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-3 h-3 text-base-content/70" />
                          <span className="text-xs text-base-content/70">
                            {format(new Date(entry.date), 'MMMM do, yyyy')}
                          </span>
                        </div>
                        <h4 className="font-semibold text-base-content mb-1">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-base-content/80 line-clamp-2">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </div>
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