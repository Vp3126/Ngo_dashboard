import React, { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastSeen: string;
  isOnline: boolean;
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
}

const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Food Bank Manager',
    lastSeen: '2 min ago',
    isOnline: true,
    unreadCount: 3
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Restaurant Owner',
    lastSeen: '1 hour ago',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Food For All',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    role: 'Organization',
    lastSeen: 'Yesterday',
    isOnline: false,
    unreadCount: 1
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    role: 'Volunteer',
    lastSeen: 'Just now',
    isOnline: true,
    unreadCount: 0
  },
  {
    id: '5',
    name: 'Community Center',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    role: 'Organization',
    lastSeen: '3 days ago',
    isOnline: false,
    unreadCount: 0
  }
];

const sampleMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1-1',
      senderId: '1',
      text: 'Hi there! We received your donation of fresh vegetables yesterday.',
      timestamp: '2024-03-25T10:30:00',
      isRead: true
    },
    {
      id: '1-2',
      senderId: 'me',
      text: 'Great! I\'m glad to hear that. Were they in good condition?',
      timestamp: '2024-03-25T10:32:00',
      isRead: true
    },
    {
      id: '1-3',
      senderId: '1',
      text: 'Yes, they were perfect! We\'ve already distributed some to families in need.',
      timestamp: '2024-03-25T10:35:00',
      isRead: true
    },
    {
      id: '1-4',
      senderId: '1',
      text: 'Here\'s a photo of the distribution event.',
      timestamp: '2024-03-25T10:36:00',
      isRead: false,
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          name: 'distribution_event.jpg'
        }
      ]
    },
    {
      id: '1-5',
      senderId: '1',
      text: 'Would you be interested in donating again next week?',
      timestamp: '2024-03-25T10:37:00',
      isRead: false
    },
    {
      id: '1-6',
      senderId: '1',
      text: 'We particularly need more fresh vegetables and fruits.',
      timestamp: '2024-03-25T10:38:00',
      isRead: false
    }
  ],
  '3': [
    {
      id: '3-1',
      senderId: '3',
      text: 'Thank you for your monetary donation to our organization!',
      timestamp: '2024-03-24T14:15:00',
      isRead: true
    },
    {
      id: '3-2',
      senderId: 'me',
      text: 'You\'re welcome! Happy to support your cause.',
      timestamp: '2024-03-24T15:20:00',
      isRead: true
    },
    {
      id: '3-3',
      senderId: '3',
      text: 'Here\'s our impact report from last month.',
      timestamp: '2024-03-24T15:25:00',
      isRead: false,
      attachments: [
        {
          type: 'document',
          url: '#',
          name: 'Impact_Report_Feb_2024.pdf'
        }
      ]
    }
  ]
};

const Communication = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [messages, setMessages] = useState<Record<string, Message[]>>(sampleMessages);

  const filteredContacts = sampleContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'unread' && contact.unreadCount > 0) ||
      (activeTab === 'online' && contact.isOnline);
    
    return matchesSearch && matchesTab;
  });

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;
    
    // Create a new message object
    const newMessage: Message = {
      id: `${selectedContact.id}-${Date.now()}`,
      senderId: 'me',
      text: messageText,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    // Add the new message to the selected contact's messages
    setMessages(prevMessages => {
      const contactMessages = prevMessages[selectedContact.id] || [];
      return {
        ...prevMessages,
        [selectedContact.id]: [...contactMessages, newMessage]
      };
    });
    
    // Clear the input
    setMessageText('');
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Communication</h1>
        <p className="text-gray-600">Connect with donors, recipients, and organizations</p>
      </div>

      <div className="bg-[#1b2233] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row h-[calc(100vh-210px)]">
        {/* Contacts Sidebar */}
        <div className="w-full md:w-1/3 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex px-4 pt-2 border-b border-gray-700">
            <button 
              className={`px-3 py-2 text-sm font-medium mr-2 ${
                activeTab === 'all' 
                  ? 'text-blue-300 border-b-2 border-blue-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-2 text-sm font-medium mr-2 ${
                activeTab === 'unread' 
                  ? 'text-blue-300 border-b-2 border-blue-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('unread')}
            >
              Unread
            </button>
            <button 
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'online' 
                  ? 'text-blue-300 border-b-2 border-blue-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('online')}
            >
              Online
            </button>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                className={`p-3 border-b border-gray-700 flex items-center cursor-pointer ${
                  selectedContact?.id === contact.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="relative">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></div>
                  )}
                </div>
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-white">{contact.name}</h3>
                    <span className="text-xs text-gray-400">{contact.lastSeen}</span>
                  </div>
                  <p className="text-xs text-gray-400">{contact.role}</p>
                </div>
                {contact.unreadCount > 0 && (
                  <div className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unreadCount}
                  </div>
                )}
              </div>
            ))}

            {filteredContacts.length === 0 && (
              <div className="p-4 text-center text-gray-400">
                No contacts found
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <button className="flex items-center justify-center w-full py-2 rounded-md bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Message
            </button>
          </div>
        </div>
        
        {/* Chat Area */}
        {selectedContact ? (
          <div className="w-full md:w-2/3 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <img 
                    src={selectedContact.avatar} 
                    alt={selectedContact.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedContact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-white">{selectedContact.name}</h3>
                  <p className="text-xs text-gray-400">
                    {selectedContact.isOnline ? 'Online' : `Last seen ${selectedContact.lastSeen}`}
                  </p>
                </div>
              </div>
              <div className="flex">
                <button className="text-gray-400 hover:text-white p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 flex flex-col">
              <div className="flex flex-col space-y-3">
                {messages[selectedContact.id]?.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === 'me' 
                        ? 'bg-blue-900 text-white' 
                        : 'bg-gray-800 text-white'
                    }`}>
                      <div className="text-sm">{message.text}</div>
                      
                      {message.attachments?.map((attachment, index) => (
                        <div key={index} className="mt-2">
                          {attachment.type === 'image' ? (
                            <img 
                              src={attachment.url} 
                              alt={attachment.name} 
                              className="rounded-lg max-h-48 w-auto"
                            />
                          ) : (
                            <div className="flex items-center bg-gray-700 rounded-lg p-2">
                              <svg className="w-5 h-5 text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-xs text-gray-300">{attachment.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="text-right mt-1">
                        <span className="text-xs text-gray-400">
                          {formatMessageTime(message.timestamp)}
                          {message.senderId === 'me' && (
                            <span className="ml-1">
                              {message.isRead ? (
                                <svg className="w-3 h-3 inline text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3 inline text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {!messages[selectedContact.id] && (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-gray-400">No messages yet. Start a conversation!</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t border-gray-700">
              <div className="flex items-center">
                <button className="p-2 text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-grow mx-2 px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="p-2 text-white bg-blue-900 rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || !selectedContact}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full md:w-2/3 flex items-center justify-center bg-gray-900">
            <div className="text-center p-6">
              <div className="inline-block p-6 rounded-full bg-gray-800 mb-4">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Select a conversation</h3>
              <p className="text-gray-400 max-w-xs">
                Choose a contact from the list to start messaging or continue a conversation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Communication; 