import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('english');
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8901',
    address: '123 Main St, City, Country',
    organization: 'Community Food Bank',
    bio: 'Passionate about reducing food waste and helping communities.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save to the backend here
    alert('Profile saved successfully!');
  };

  return (
    <div className="p-4 md:p-6 bg-[#B5A8D5]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar navigation */}
        <div className="col-span-1">
          <div className="bg-[#4D55CC] rounded-lg shadow-lg overflow-hidden">
            <nav>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 ${
                  activeTab === 'profile' 
                    ? 'bg-[#211C84] text-white' 
                    : 'text-white hover:bg-[#7A73D1] hover:text-white'
                }`}
              >
                Profile Settings
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 ${
                  activeTab === 'notifications' 
                    ? 'bg-[#211C84] text-white' 
                    : 'text-white hover:bg-[#7A73D1] hover:text-white'
                }`}
              >
                Notification Preferences
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 ${
                  activeTab === 'security' 
                    ? 'bg-[#211C84] text-white' 
                    : 'text-white hover:bg-[#7A73D1] hover:text-white'
                }`}
              >
                Account Security
              </button>
              
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-3 ${
                  activeTab === 'privacy' 
                    ? 'bg-[#211C84] text-white' 
                    : 'text-white hover:bg-[#7A73D1] hover:text-white'
                }`}
              >
                Privacy
              </button>
              
              <button
                onClick={() => setActiveTab('language')}
                className={`w-full text-left px-4 py-3 ${
                  activeTab === 'language' 
                    ? 'bg-[#211C84] text-white' 
                    : 'text-white hover:bg-[#7A73D1] hover:text-white'
                }`}
              >
                Language
              </button>
              
              <button
                onClick={() => setActiveTab('connected')}
                className={`w-full text-left px-4 py-3 ${
                  activeTab === 'connected' 
                    ? 'bg-[#211C84] text-white' 
                    : 'text-white hover:bg-[#7A73D1] hover:text-white'
                }`}
              >
                Connected Accounts
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="col-span-1 md:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Settings</h2>
              
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={profile.avatar} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <button type="button" className="px-3 py-1 bg-[#4D55CC] text-white text-sm rounded-md hover:bg-[#211C84]">
                      Change Photo
                    </button>
                    <p className="text-gray-500 text-xs mt-1">
                      Recommended: Square JPG or PNG, at least 200x200 pixels
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A73D1] focus:border-[#7A73D1]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A73D1] focus:border-[#7A73D1]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A73D1] focus:border-[#7A73D1]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={profile.organization}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A73D1] focus:border-[#7A73D1]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A73D1] focus:border-[#7A73D1]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleProfileChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A73D1] focus:border-[#7A73D1]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4D55CC] text-white rounded-md hover:bg-[#211C84]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          )}
          
          {/* Notification Preferences */}
          {activeTab === 'notifications' && (
            <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                    <p className="text-xs text-gray-500">Receive email updates about your activity</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        emailNotifications ? 'bg-[#4D55CC]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Push Notifications</h3>
                    <p className="text-xs text-gray-500">Receive push notifications for important updates</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        pushNotifications ? 'bg-[#4D55CC]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Dark Mode</h3>
                    <p className="text-xs text-gray-500">Switch between light and dark themes</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        darkMode ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Account Security */}
          {activeTab === 'security' && (
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Security</h2>
              
              <div className="space-y-4">
                <div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    Change Password
                  </button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</h3>
                  <button className="px-4 py-2 bg-[#7A73D1] text-white rounded-md hover:bg-[#4D55CC]">
                    Enable 2FA
                  </button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-red-500 mb-2">Danger Zone</h3>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Privacy */}
          {activeTab === 'privacy' && (
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Privacy Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Profile Visibility</h3>
                    <p className="text-xs text-gray-500">Make your profile visible to others</p>
                  </div>
                  <div>
                    <select className="px-3 py-2 border border-gray-300 rounded-md">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Only Organizations</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Data Sharing</h3>
                    <p className="text-xs text-gray-500">Allow us to share anonymized data for analytics</p>
                  </div>
                  <div>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Connected Accounts */}
          {activeTab === 'connected' && (
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Connected Accounts</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-800">G</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Google</h3>
                      <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[#4D55CC] text-white text-sm rounded-md hover:bg-[#211C84]">
                    Connect
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white">f</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Facebook</h3>
                      <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[#4D55CC] text-white text-sm rounded-md hover:bg-[#211C84]">
                    Connect
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Language Settings */}
          {activeTab === 'language' && (
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Language Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Application Language
                  </label>
                  <div className="max-w-md">
                    <select
                      name="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-[#7A73D1] focus:ring focus:ring-[#7A73D1] focus:ring-opacity-50"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Español (Spanish)</option>
                      <option value="french">Français (French)</option>
                      <option value="german">Deutsch (German)</option>
                      <option value="hindi">हिन्दी (Hindi)</option>
                      <option value="chinese">中文 (Chinese)</option>
                      <option value="japanese">日本語 (Japanese)</option>
                      <option value="arabic">العربية (Arabic)</option>
                      <option value="portuguese">Português (Portuguese)</option>
                      <option value="russian">Русский (Russian)</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Changing the language will affect all text in the application. Your data will remain the same.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#4D55CC] text-white rounded-md hover:bg-[#211C84] focus:outline-none focus:ring-2 focus:ring-[#7A73D1] focus:ring-offset-2"
                    >
                      Apply Language
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Regional Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Format
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Format
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="12h">12-hour (AM/PM)</option>
                        <option value="24h">24-hour</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 