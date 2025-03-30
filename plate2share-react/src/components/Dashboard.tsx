import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, 
  Line, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', donations: 400, meals: 240 },
  { name: 'Feb', donations: 300, meals: 139 },
  { name: 'Mar', donations: 200, meals: 980 },
  { name: 'Apr', donations: 278, meals: 390 },
  { name: 'May', donations: 189, meals: 480 },
  { name: 'Jun', donations: 239, meals: 380 },
];

const recipientData = [
  { name: 'Individuals', value: 400 },
  { name: 'Organizations', value: 300 },
  { name: 'Communities', value: 300 },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const foodTypeDistribution = [
  { name: 'Fresh Produce', value: 35 },
  { name: 'Grains', value: 25 },
  { name: 'Canned Goods', value: 20 },
  { name: 'Dairy', value: 15 },
  { name: 'Other', value: 5 }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const recipientGrowth = [
  { month: 'Jan', recipients: 150 },
  { month: 'Feb', recipients: 180 },
  { month: 'Mar', recipients: 220 },
  { month: 'Apr', recipients: 250 },
  { month: 'May', recipients: 280 },
  { month: 'Jun', recipients: 300 }
];

const customerReviews = [
  {
    name: 'Jons Sena',
    rating: 4.5,
    review: 'Great platform for food donation!',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    name: 'Sofia',
    rating: 4.0,
    review: 'Easy to use and very helpful',
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    name: 'Anandreansyah',
    rating: 4.5,
    review: 'Connecting food donors efficiently',
    image: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    name: 'Sarah Johnson',
    rating: 5.0,
    review: 'Amazing initiative to reduce food waste',
    image: 'https://randomuser.me/api/portraits/women/4.jpg'
  }
];

const COLORS = ['#ADB2D4', '#C7D9DD', '#D5E5D5', '#EEF1DA'];

interface Donation {
  id: string;
  type: 'food' | 'money';
  description: string;
  quantity: string;
  donor: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Distribution {
  id: string;
  location: string;
  mealsServed: number;
  date: string;
  items: string[];
}

interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  isRead: boolean;
}

const sampleDonations: Donation[] = [
  {
    id: '1',
    type: 'food',
    description: 'Fresh Vegetables',
    quantity: '50 kg',
    donor: 'John Doe',
    date: '2024-03-15',
    status: 'pending'
  },
  {
    id: '2',
    type: 'money',
    description: 'Monetary Donation',
    quantity: '$500',
    donor: 'Jane Smith',
    date: '2024-03-14',
    status: 'accepted'
  }
];

const sampleDistributions: Distribution[] = [
  {
    id: '1',
    location: 'Community Center A',
    mealsServed: 150,
    date: '2024-03-15',
    items: ['Rice', 'Vegetables', 'Canned Goods']
  },
  {
    id: '2',
    location: 'Food Bank B',
    mealsServed: 200,
    date: '2024-03-14',
    items: ['Rice', 'Vegetables']
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'I have some fresh vegetables to donate.',
    date: '2024-03-15',
    isRead: false
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: 'When is the next distribution event?',
    date: '2024-03-14',
    isRead: true
  }
];

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('bar');

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6] min-h-screen">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Total Donations</h3>
          <p className="mt-2 text-3xl font-semibold text-white">1,234</p>
        </div>

        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Meals Distributed</h3>
          <p className="mt-2 text-3xl font-semibold text-white">5,678</p>
        </div>

        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Active Requests</h3>
          <p className="mt-2 text-3xl font-semibold text-white">89</p>
        </div>

        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Last Donation</h3>
          <p className="mt-2 text-3xl font-semibold text-white">2h ago</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Donations Chart */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Monthly Donations</h2>
            <div className="flex gap-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              >
                <option value="month">Last Month</option>
                <option value="week">Last Week</option>
                <option value="year">Last Year</option>
              </select>
              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="px-3 py-1 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
              </select>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {selectedChart === 'bar' ? (
                <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                  <Legend wrapperStyle={{ color: '#aaa' }} />
                  <Bar dataKey="donations" fill="#ADB2D4" name="Donations" />
                  <Bar dataKey="meals" fill="#C7D9DD" name="Meals" />
                </BarChart>
              ) : (
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                  <Legend wrapperStyle={{ color: '#aaa' }} />
                  <Line type="monotone" dataKey="donations" stroke="#ADB2D4" strokeWidth={2} dot={{ r: 4 }} name="Donations" />
                  <Line type="monotone" dataKey="meals" stroke="#C7D9DD" strokeWidth={2} dot={{ r: 4 }} name="Meals" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recipient Distribution Pie Chart */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-4">Recipient Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={recipientData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {recipientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                <Legend wrapperStyle={{ color: '#aaa' }} layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & Reviews Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Donations</h2>
          <div className="space-y-3">
            {sampleDonations.map(donation => (
              <div key={donation.id} className="flex items-center p-3 border border-gray-700 rounded-lg bg-gray-800">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  donation.type === 'food' ? 'bg-green-800' : 'bg-blue-800'
                }`}>
                  {donation.type === 'food' ? '🥬' : '💰'}
                </div>
                <div className="ml-3 flex-grow">
                  <p className="text-sm font-medium text-white">{donation.description}</p>
                  <p className="text-xs text-gray-400">by {donation.donor} • {donation.date}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  donation.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                  donation.status === 'accepted' ? 'bg-green-900 text-green-200' :
                  'bg-red-900 text-red-200'
                }`}>
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-2 text-sm font-medium text-blue-300 hover:text-blue-100 transition-colors">
              View All Donations
            </button>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {customerReviews.map((review, index) => (
              <div key={index} className="p-3 border border-gray-700 rounded-lg bg-gray-800">
                <div className="flex items-center mb-2">
                  <img src={review.image} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-white">{review.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs text-yellow-300">
                          {i < Math.floor(review.rating) ? "★" : i < review.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-300">{review.review}</p>
              </div>
            ))}
            <button className="col-span-2 mt-2 py-2 text-sm font-medium text-blue-300 hover:text-blue-100 transition-colors">
              View All Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Distributions Section - Uncomment if needed */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Distributions */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Distributions</h2>
          <div className="space-y-3">
            {sampleDistributions.map(distribution => (
              <div key={distribution.id} className="p-3 border border-gray-700 rounded-lg bg-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-white">{distribution.location}</h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-200">
                    {distribution.mealsServed} meals
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{distribution.date}</p>
                <div className="flex flex-wrap gap-1">
                  {distribution.items.map((item, i) => (
                    <span key={i} className="px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-2 text-sm font-medium text-blue-300 hover:text-blue-100 transition-colors">
              View All Distributions
            </button>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Messages</h2>
          <div className="space-y-3">
            {sampleMessages.map(message => (
              <div key={message.id} className="p-3 border border-gray-700 rounded-lg bg-gray-800 flex items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center text-white">
                  {message.sender.charAt(0)}
                </div>
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-white">{message.sender}</p>
                    <p className="text-xs text-gray-400">{message.date}</p>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{message.content}</p>
                </div>
                {!message.isRead && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                )}
              </div>
            ))}
            <button className="w-full mt-2 py-2 text-sm font-medium text-blue-300 hover:text-blue-100 transition-colors">
              View All Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
