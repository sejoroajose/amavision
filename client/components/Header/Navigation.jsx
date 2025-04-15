import React from 'react'
import { Disclosure } from '@headlessui/react'
import MobileMenuButton from './MobileMenuButton'
import MobileMenu from './MobileMenu'
import UserMenu from './UserMenu'

const Navigation = ({
  activeTab,
  setActiveTab,
  navigation,
  user,
  handleFileUpload,
  handleDownloadCV,
  handleLogout,
  API_URL,
}) => {
  return (
    <Disclosure as="nav" className="bg-custom-white mt-8">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Left side - navigation items */}
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveTab(item.tab)}
                        className={`${
                          activeTab === item.tab
                            ? 'bg-custom-green text-custom-white'
                            : 'text-gray-300 hover:bg-custom-green hover:text-white'
                        } rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - UserMenu for desktop */}
              <UserMenu
                user={user}
                handleFileUpload={handleFileUpload}
                handleDownloadCV={handleDownloadCV}
                handleLogout={handleLogout}
                API_URL={API_URL}
              />

              {/* Mobile menu button */}
              <MobileMenuButton open={open} />
            </div>
          </div>

          {/* Mobile menu items */}
          <MobileMenu
            navigation={navigation}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </>
      )}
    </Disclosure>
  )
}

export default Navigation
