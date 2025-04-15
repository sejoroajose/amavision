// TimelineSVG.js
import React, { forwardRef } from 'react'
import { format } from 'date-fns'
/* import ChatBubble from './ChatBubble' */ // Ensure ChatBubble is imported correctly

const TimelineSVG = forwardRef(({ journalData, onBubbleClick }, ref) => (
  <svg
    ref={ref}
    id="svg-stage"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1200"
    className="max-w-[1000px] overflow-visible mt-[7vh]"
  >
    {/* Horizontal lines for each journal entry */}
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

    {/* Dates for each journal entry */}
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

    {/* Chat bubbles for each journal entry */}
    {journalData.map((entry, index) => (
      <ChatBubble
        key={`chat${index + 1}`}
        className={`chat0${index + 1}`}
        x={1090}
        y={162 + index * 200}
        entry={entry}
        onClick={() => onBubbleClick(entry)}
      />
    ))}

    {/* Animated path line */}
    <path
      className="theLine stroke-[#9BC53D] fill-none"
      strokeWidth="3"
      strokeMiterlimit="10"
      d="M0,0c80,25,200,80,276,201c49,75,54.8,140.7,49,200c-7,88-69,108-76,199c0,72,76.9,113,76,199c0,85-121.3,174.8-206,201"
    />

    {/* Moving ball */}
    <circle
      className="ball ball01 invisible"
      cx="66"
      cy="80"
      r="20"
      fill="#9BC53D"
    />

    {/* Static balls positioned along the path */}
    {journalData.map((_, index) => {
      const positions = [
        { cx: 272, cy: 201 },
        { cx: 325, cy: 401 },
        { cx: 252, cy: 601 },
        // Additional positions if needed
      ]

      return (
        <circle
          key={`ball${index + 2}`}
          className={`ball ball0${index + 2} static-ball`}
          cx={positions[index].cx}
          cy={positions[index].cy}
          r="20"
          fill="#9BC53D"
          stroke="white"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
      )
    })}
  </svg>
))

export default TimelineSVG
