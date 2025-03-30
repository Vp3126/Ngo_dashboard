import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode to document if enabled
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Toggle dark mode class on document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSignOut = () => {
    // Implement sign out logic here
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black text-white' : 'bg-[#B5A8D5] text-gray-800'}`}>
      <div className="flex flex-col md:flex-row">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className={`flex-grow p-4 md:ml-64 md:p-8 transition-all duration-200 ${isDarkMode ? 'bg-black' : 'bg-[#B5A8D5]'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 