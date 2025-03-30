import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Add Food', path: '/add-food', icon: '🍲' },
    { name: 'Food Listing', path: '/food-listing', icon: '🍽️' },
    { name: 'My Donations', path: '/my-donations', icon: '💝' },
    { name: 'Communication', path: '/communication', icon: '💬' },
    { name: 'Notifications', path: '/notifications', icon: '🔔' },
    { name: 'Reports', path: '/reports', icon: '📈' },
    { name: 'User Management', path: '/user-management', icon: '👥' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Sidebar for larger screens */}
      <div className={`hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 ${isDarkMode ? 'bg-black' : 'bg-[#4D55CC]'} text-white z-30`}>
        {/* Sidebar Header */}
        <div className={`flex items-center h-16 flex-shrink-0 px-4 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-[#4D55CC] border-[#7A73D1]'} border-b`}>
          <span className="text-xl font-bold">Plate2Share</span>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigationLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  location.pathname === item.path
                    ? isDarkMode 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-[#7A73D1] text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                      : 'text-white hover:bg-[#7A73D1] hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
                {item.name === 'Add Food' && (
                  <span className="ml-auto bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer - User Info */}
        <div className={`p-4 ${isDarkMode ? 'border-t border-gray-800' : 'border-t border-[#7A73D1]'}`}>
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full mr-3"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
            />
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <button
                onClick={toggleDarkMode}
                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#B5A8D5]'} hover:underline flex items-center mt-1`}
              >
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
            <button className="ml-auto text-white hover:text-gray-300">
              <span className="text-sm">⬅️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-30 ${isDarkMode ? 'bg-black' : 'bg-[#4D55CC]'} text-white shadow-md`}>
        <div className="flex items-center justify-between h-16 px-4">
          <span className="text-xl font-bold">Plate2Share</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-40 md:hidden ${isDarkMode ? 'bg-black' : 'bg-[#B5A8D5]'}`}>
          <div className="pt-16 pb-6 px-4 h-full overflow-y-auto">
            <nav className="space-y-2">
              {navigationLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                    location.pathname === item.path
                      ? isDarkMode 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-[#7A73D1] text-white'
                      : isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-800 hover:bg-[#7A73D1] hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                  {item.name === 'Add Food' && (
                    <span className="ml-auto bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            <div className={`mt-6 pt-6 ${isDarkMode ? 'border-t border-gray-800' : 'border-t border-[#7A73D1]'}`}>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full mr-3"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>John Doe</p>
                  <button
                    onClick={toggleDarkMode}
                    className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#4D55CC]'} hover:underline flex items-center mt-1`}
                  >
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                </div>
                <button 
                  className={`ml-auto ${isDarkMode ? 'text-white' : 'text-gray-800'} hover:text-gray-500`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 