import React from 'react'
import { Disclosure } from '@headlessui/react'

const MobileMenu = ({ navigation, activeTab, setActiveTab }) => {
  return (
    <Disclosure.Panel className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  )
}

export default MobileMenu
