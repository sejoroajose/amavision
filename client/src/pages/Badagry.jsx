import React from 'react'
import AnimatedNav from '../../components/Nav2'
import Footer from '../../components/Footer'
import {
  Users2,
  Landmark,
  MapPin,
  Building2,
  Construction,
  GraduationCap,
  School,
  HeartPulse,
  Palmtree,
  BadgeDollarSign,
} from 'lucide-react'

import BDG from './badagry-15.png'


const PriorityItem = ({ icon: Icon, title, className = "" }) => (
  <li className="flex items-center gap-4 p-4 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="p-2 bg-custom-orange/10 rounded-full">
      <Icon className="w-6 h-6 text-custom-orange" />
    </div>
    <span className="text-lg text-custom-green">{title}</span>
  </li>
)

const BadagryConstituency = () => {
  return (
    <div className="min-h-screen ">
      <AnimatedNav />
      <section className="pt-[120px] relative text-center items-center bg-gradient-to-b from-custom-orange/20 to-transparent">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-16">
          <h1 className="font-neuemachina text-custom-orange text-4xl md:text-5xl mb-4">
            BADAGRY FEDERAL CONSTITUENCY
          </h1>
          <p className="text-custom-green font-cabinetGrotesk align-center items-center text-center text-xl max-w-2xl mx-auto">
            A historic coastal constituency in Lagos State, representing the
            gateway to Nigeria and a rich cultural heritage spanning centuries
            of history.
          </p>
        </div>
      </section>
      <img src={BDG} className="w-3/4 mx-auto mt-8 rounded-2xl" />
      <section className="py-12  font-cabinetGrotesk">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 text-left shadow-xl">
              <div className="card-body text-left">
                <Users2 className="w-8 h-8 text-custom-orange mb-2" />
                <h3 className="card-title text-custom-green">Population</h3>
                <p className="text-custom-green/80">
                  Approximately 450,000 residents
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-left">
                <MapPin className="w-8 h-8 text-left text-custom-orange mb-2" />
                <h3 className="card-title text-custom-green">Location</h3>
                <p className="text-custom-green/80">
                  Western Lagos State, bordering Benin Republic
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-left">
                <Landmark className="w-8 h-8  text-custom-orange mb-2" />
                <h3 className="card-title text-custom-green">
                  Local Governments
                </h3>
                <p className="text-custom-green/80 text-left">
                  Badagry Local Government Area
                </p>
              </div>
            </div>

            <div className="card bg-base-100 text-left shadow-xl">
              <div className="card-body">
                <Building2 className="w-8 h-8 text-custom-orange mb-2" />
                <h3 className="card-title text-custom-green">
                  Current Representative
                </h3>
                <p className="text-custom-green/80">Hon. Sesi Whingan</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 mx-8 font-cabinetGrotesk">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="prose max-w-none">
                <h2 className="text-3xl font-bold text-custom-orange mb-6">
                  About the Constituency
                </h2>
                <p className="text-custom-green text-xl">
                  Badagry Federal Constituency is a historic and culturally rich
                  district in Lagos State, Nigeria. Known for its significant
                  role in Nigerian history and its position as a key border
                  town, Badagry continues to be an important cultural and
                  economic center in Lagos State.
                </p>

                <h3 className="text-3xl font-bold text-custom-orange mt-8 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-4 text-left text-xl text-custom-green">
                  <li className="flex items-start gap-3">
                    <div>
                      <span className="font-bold">
                        Rich Historical Heritage:
                      </span>{' '}
                      Home to numerous historical sites including the first
                      storey building in Nigeria and several museums documenting
                      the trans-Atlantic slave trade era.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <span className="font-bold">Strategic Location:</span>{' '}
                      Serves as a major border town between Nigeria and Benin
                      Republic, making it a crucial point for international
                      trade and commerce.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <span className="font-bold">Educational Hub:</span> Houses
                      several important educational institutions including the
                      Nigerian French Language Village and numerous secondary
                      schools.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <span className="font-bold">Tourism Potential:</span>{' '}
                      Features beautiful beaches, historical sites, and cultural
                      festivals that attract tourists from around the world.
                    </div>
                  </li>
                </ul>
              </div>

              
              <div className="prose text-left max-w-none mt-8">
                <h3 className="text-2xl font-bold md:text-center text-custom-orange mb-6">
                  Current Priorities
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <PriorityItem
                    icon={Construction}
                    title="Infrastructure development and road network improvement"
                  />
                  <PriorityItem
                    icon={GraduationCap}
                    title="Youth empowerment and skills acquisition programs"
                  />
                  <PriorityItem
                    icon={School}
                    title="Educational development and school rehabilitation"
                  />
                  <PriorityItem
                    icon={HeartPulse}
                    title="Healthcare facility upgrade and accessibility"
                  />
                  <PriorityItem
                    icon={Palmtree}
                    title="Tourism development and cultural heritage preservation"
                  />
                  <PriorityItem
                    icon={BadgeDollarSign}
                    title="Economic empowerment through trade facilitation"
                  />
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1 text-center">
              <div className="sticky top-[120px] space-y-6">
                <div className="card bg-base-200 shadow-xl">
                  <div className="card-body text-center items-center">
                    <h3 className="card-title  text-custom-orange">
                      Constituency Resources
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="/career"
                          className="text-custom-green hover:text-custom-orange transition-colors"
                        >
                          Job Portal
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-custom-green hover:text-custom-orange transition-colors"
                        >
                          Constituency Projects
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-custom-green hover:text-custom-orange transition-colors"
                        >
                          Town Hall Meetings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-custom-green hover:text-custom-orange transition-colors"
                        >
                          Community Updates
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-base-200  shadow-xl">
                  <div className="card-body items-center">
                    <h3 className="card-title text-custom-orange">
                      Constituency Office
                    </h3>
                    <div className="space-y-2 text-custom-green">
                      <p>Badagry Constituency Office</p>
                      <p>Contact: (234) XXX-XXXX</p>
                      <p>Email: office@badagryconstituency.gov.ng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default BadagryConstituency
