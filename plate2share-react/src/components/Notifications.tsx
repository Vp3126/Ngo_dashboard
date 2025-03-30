import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'donation' | 'message' | 'distribution' | 'system' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'donation',
    title: 'Donation Accepted',
    description: 'Your donation of Fresh Vegetables has been accepted by Downtown Food Bank.',
    timestamp: '2024-03-25T14:30:00',
    isRead: false,
    actionUrl: '/my-donations/1',
    actionText: 'View Details',
    icon: '🥬'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'John Doe from Downtown Food Bank sent you a message regarding your donation.',
    timestamp: '2024-03-25T10:15:00',
    isRead: false,
    actionUrl: '/communication',
    actionText: 'Reply',
    icon: '💬'
  },
  {
    id: '3',
    type: 'distribution',
    title: 'Distribution Complete',
    description: 'Your donation has been distributed to 25 families in need.',
    timestamp: '2024-03-24T16:45:00',
    isRead: true,
    actionUrl: '/my-donations/2',
    actionText: 'View Impact',
    icon: '📦'
  },
  {
    id: '4',
    type: 'system',
    title: 'Account Verified',
    description: 'Your account has been verified successfully. You can now make donations.',
    timestamp: '2024-03-23T09:20:00',
    isRead: true,
    icon: '✅'
  },
  {
    id: '5',
    type: 'alert',
    title: 'Urgent Need',
    description: 'Local shelter urgently needs non-perishable food items due to recent increase in demand.',
    timestamp: '2024-03-22T12:00:00',
    isRead: false,
    actionUrl: '/donate',
    actionText: 'Donate Now',
    icon: '🚨'
  },
  {
    id: '6',
    type: 'message',
    title: 'New Message',
    description: 'Food For All organization sent you a message with their monthly impact report.',
    timestamp: '2024-03-21T14:30:00',
    isRead: true,
    actionUrl: '/communication',
    actionText: 'Read Message',
    icon: '💬'
  },
  {
    id: '7',
    type: 'donation',
    title: 'Donation Reminder',
    description: 'You scheduled a donation for tomorrow. Don\'t forget to prepare your items.',
    timestamp: '2024-03-20T18:00:00',
    isRead: true,
    actionUrl: '/my-donations/3',
    actionText: 'View Details',
    icon: '🔔'
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const getFilteredNotifications = () => {
    return notifications.filter(notification => {
      const matchesSearch = 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'unread' && !notification.isRead) ||
        (activeTab === notification.type);
      
      return matchesSearch && matchesTab;
    });
  };

  const filteredNotifications = getFilteredNotifications();

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'donation': return 'Donation';
      case 'message': return 'Message';
      case 'distribution': return 'Distribution';
      case 'system': return 'System';
      case 'alert': return 'Alert';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'donation': return 'bg-blue-900 text-blue-200';
      case 'message': return 'bg-green-900 text-green-200';
      case 'distribution': return 'bg-purple-900 text-purple-200';
      case 'system': return 'bg-gray-700 text-gray-300';
      case 'alert': return 'bg-red-900 text-red-200';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated with your donation activities</p>
      </div>

      {/* Filter and Actions */}
      <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search notifications..."
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                unreadCount === 0 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              Mark All as Read
            </button>
            <button 
              onClick={deleteAllNotifications}
              disabled={notifications.length === 0}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                notifications.length === 0 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-red-900 text-white hover:bg-red-800'
              }`}
            >
              Clear All
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap mt-4 border-b border-gray-700">
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'all' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
            {notifications.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-gray-700 text-white text-xs rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'unread' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-900 text-white text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'donation' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('donation')}
          >
            Donations
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'message' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('message')}
          >
            Messages
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'alert' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('alert')}
          >
            Alerts
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id} 
            className={`bg-[#1b2233] p-4 rounded-lg shadow-lg border-l-4 ${
              !notification.isRead ? 'border-blue-500' : 'border-gray-700'
            }`}
          >
            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-xl mr-3">
                {notification.icon}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-white">{notification.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(notification.type)}`}>
                      {getTypeLabel(notification.type)}
                    </span>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mt-2">{notification.description}</p>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex space-x-3">
                    {notification.actionUrl && notification.actionText && (
                      <a 
                        href={notification.actionUrl} 
                        className="text-blue-300 hover:text-blue-100 text-xs font-medium"
                      >
                        {notification.actionText}
                      </a>
                    )}
                    {!notification.isRead && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-gray-400 hover:text-white text-xs font-medium"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredNotifications.length === 0 && (
          <div className="bg-[#1b2233] p-8 rounded-lg shadow-lg text-center">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-white mb-2">No notifications found</h3>
            <p className="text-gray-400">
              {activeTab === 'all' 
                ? "You're all caught up! No notifications to display." 
                : `No ${activeTab === 'unread' ? 'unread ' : ''}${
                    activeTab !== 'all' && activeTab !== 'unread' 
                      ? getTypeLabel(activeTab).toLowerCase() + ' ' 
                      : ''
                  }notifications to display.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Settings Section */}
      <div className="mt-8 bg-[#1b2233] p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">Email Notifications</h3>
              <p className="text-xs text-gray-400">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">Push Notifications</h3>
              <p className="text-xs text-gray-400">Receive push notifications on your device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">Donation Updates</h3>
              <p className="text-xs text-gray-400">Get notified about donation status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">Distribution Alerts</h3>
              <p className="text-xs text-gray-400">Get notified about distribution events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">Marketing Communications</h3>
              <p className="text-xs text-gray-400">Receive updates about campaigns and events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 