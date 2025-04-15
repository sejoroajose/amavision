import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

const DateSelector = ({ onDateSelect }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="flex justify-center my-8">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center bg-green-600 text-white rounded-full px-4 py-2"
      >
        <Calendar className="mr-2" />
        Explore Adventures
      </button>
      {showCalendar && (
        <div className="absolute mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date)
              onDateSelect(date)
              setShowCalendar(false)
            }}
            inline
          />
        </div>
      )}
    </div>
  )
}

export default DateSelector
