import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  GraduationCap,
  Building,
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const BiographySection = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="max-w-4xl text-left mx-auto mb-16">
      <Card className="bg-white/90 border-l-4 border-custom-white relative overflow-hidden">
        <CardContent
          className={`p-8 transition-all duration-500 ease-in-out ${
            isExpanded ? '' : 'max-h-[400px]'
          }`}
        >
          <h2 className="text-3xl font-bold font-neuemachina mb-6 text-green-800">
            Biography
          </h2>

          <div
            className={`space-y-6 font-cabinetGrotesk ${
              !isExpanded && 'blur-sm opacity-40'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="bg-custom-white rounded-full p-2 mt-1">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Early Life
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  AKINSANYA SUNNY AJOSE was born on February 10, 1946, in
                  Badagry, Lagos State, Nigeria. He was a distinguished public
                  administrator and politician whose career spanned several
                  decades, leaving an indelible mark on Lagos State's political
                  landscape.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-custom-white rounded-full p-2 mt-1">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Education
                </h3>
                <ul className="text-gray-800 leading-relaxed space-y-2">
                  <li>
                    • Started education at Ijaiye Baptist Day School in 1954
                  </li>
                  <li>
                    • Completed primary education at Tinubu Methodist Day School
                    in 1959
                  </li>
                  <li>
                    • Attended Badagry Divisional Grammar School, graduating in
                    1964
                  </li>
                  <li>
                    • Bachelor of Arts in Liberal Arts and Sciences (Political
                    Science) from the University of Illinois, Chicago (1973)
                  </li>
                  <li>
                    • Master of Arts in Social Science from Governors State
                    University (1974)
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start  gap-4">
              <div className="bg-custom-white rounded-full p-2 mt-1">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Recent Engagements
                </h3>
                <p className="text-gray-800 mb-8 leading-relaxed">
                  In September 2022, Ajose was appointed to the Lagos State
                  Governance Advisory Council (GAC), the state's highest
                  political decision-making body. This appointment reflected his
                  enduring influence and leadership in Lagos State politics.
                  Throughout his career, Ajose demonstrated an unwavering
                  dedication to public administration and governance, making
                  significant contributions to the development and
                  administration of Lagos State.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Text */}
          {!isExpanded && (
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-white">
              <div className="absolute top-[100px] left-0 w-full px-8">
                <p className="text-gray-800 leading-relaxed">
                  AKINSANYA SUNNY AJOSE was born on February 10, 1946, in
                  Badagry, Lagos State, Nigeria. He was a distinguished public
                  administrator and politician...
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {/* Read More Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-0 left-0 w-full bg-custom-white text-white py-3 flex items-center justify-center gap-2 hover:bg-custom-white transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </Card>
     
    </div>
  )
}

export default BiographySection