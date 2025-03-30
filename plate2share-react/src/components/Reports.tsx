import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, 
  Tooltip, Legend, ResponsiveContainer, CartesianGrid, AreaChart, Area
} from 'recharts';

// Sample data for reports and charts
const monthlyDonationsData = [
  { month: 'Jan', food: 120, money: 2500 },
  { month: 'Feb', food: 150, money: 3000 },
  { month: 'Mar', food: 200, money: 3500 },
  { month: 'Apr', food: 180, money: 3200 },
  { month: 'May', food: 250, money: 4000 },
  { month: 'Jun', food: 300, money: 4500 },
  { month: 'Jul', food: 280, money: 4200 },
  { month: 'Aug', food: 260, money: 3800 },
  { month: 'Sep', food: 320, money: 5000 },
  { month: 'Oct', food: 350, money: 5200 },
  { month: 'Nov', food: 380, money: 5500 },
  { month: 'Dec', food: 400, money: 6000 }
];

const foodCategoryData = [
  { name: 'Fresh Produce', value: 35 },
  { name: 'Canned Goods', value: 25 },
  { name: 'Grains & Pasta', value: 20 },
  { name: 'Dairy Products', value: 10 },
  { name: 'Meat & Protein', value: 10 }
];

const recipientTypeData = [
  { name: 'Families', value: 40 },
  { name: 'Individuals', value: 30 },
  { name: 'Shelters', value: 15 },
  { name: 'Food Banks', value: 10 },
  { name: 'Other Organizations', value: 5 }
];

const impactMetricsData = [
  { year: 2019, meals: 12000, people: 4000, waste: 8000 },
  { year: 2020, meals: 15000, people: 5000, waste: 10000 },
  { year: 2021, meals: 20000, people: 6500, waste: 12000 },
  { year: 2022, meals: 25000, people: 8000, waste: 15000 },
  { year: 2023, meals: 32000, people: 10000, waste: 18000 },
  { year: 2024, meals: 18000, people: 6000, waste: 10000 }
];

const Colors = {
  FOOD_CATEGORIES: ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'],
  RECIPIENT_TYPES: ['#ff8042', '#ffbb28', '#ffc658', '#ff8042', '#ff6b6b'],
  METRICS: ['#ADB2D4', '#C7D9DD', '#D5E5D5']
};

const Reports = () => {
  const [dateRange, setDateRange] = useState('year');
  const [reportType, setReportType] = useState('donations');
  
  // Summary calculations
  const totalFoodDonations = monthlyDonationsData.reduce((sum, item) => sum + item.food, 0);
  const totalMoneyDonations = monthlyDonationsData.reduce((sum, item) => sum + item.money, 0);
  const totalMealsProvided = impactMetricsData[impactMetricsData.length - 1].meals;
  const totalPeopleHelped = impactMetricsData[impactMetricsData.length - 1].people;
  const totalWasteReduced = impactMetricsData[impactMetricsData.length - 1].waste;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderMoneyLabel = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Insights and statistics on your donation activities</p>
      </div>

      {/* Filters */}
      <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
            >
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
            >
              <option value="donations">Donations</option>
              <option value="distributions">Distributions</option>
              <option value="impact">Impact Metrics</option>
              <option value="trends">Trends & Insights</option>
            </select>
          </div>
          
          <div className="md:ml-auto">
            <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Food Donations</h3>
          <p className="mt-2 text-2xl font-semibold text-white">{totalFoodDonations}</p>
          <p className="text-xs text-gray-400 mt-1">items</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Money Donations</h3>
          <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(totalMoneyDonations)}</p>
          <p className="text-xs text-gray-400 mt-1">total</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Meals Provided</h3>
          <p className="mt-2 text-2xl font-semibold text-white">{totalMealsProvided.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">total</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">People Helped</h3>
          <p className="mt-2 text-2xl font-semibold text-white">{totalPeopleHelped.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">individuals</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Food Waste Reduced</h3>
          <p className="mt-2 text-2xl font-semibold text-white">{totalWasteReduced.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">kg</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Donations Trend */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Donations</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDonationsData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.2} />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis yAxisId="left" orientation="left" stroke="#ADB2D4" />
                <YAxis yAxisId="right" orientation="right" stroke="#C7D9DD" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                  formatter={(value, name) => [
                    name === 'money' ? formatCurrency(value as number) : value,
                    name === 'money' ? 'Money Donations' : 'Food Donations'
                  ]}
                />
                <Legend wrapperStyle={{ color: '#aaa' }} />
                <Bar yAxisId="left" dataKey="food" name="Food Donations" fill="#ADB2D4" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar yAxisId="right" dataKey="money" name="Money Donations ($)" fill="#C7D9DD" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Food Categories Distribution */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-4">Donation Categories</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                  data={foodCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {foodCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Colors.FOOD_CATEGORIES[index % Colors.FOOD_CATEGORIES.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#aaa' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Impact Metrics Over Time */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-4">Impact Metrics Over Time</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactMetricsData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.2} />
                <XAxis dataKey="year" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                <Legend wrapperStyle={{ color: '#aaa' }} />
                <Area type="monotone" dataKey="meals" name="Meals Provided" stackId="1" stroke={Colors.METRICS[0]} fill={Colors.METRICS[0]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="people" name="People Helped" stackId="2" stroke={Colors.METRICS[1]} fill={Colors.METRICS[1]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="waste" name="Waste Reduced (kg)" stackId="3" stroke={Colors.METRICS[2]} fill={Colors.METRICS[2]} fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recipient Types */}
        <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg h-[400px]">
          <h2 className="text-lg font-semibold text-white mb-4">Recipient Distribution</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                  data={recipientTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {recipientTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Colors.RECIPIENT_TYPES[index % Colors.RECIPIENT_TYPES.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#aaa' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="ml-3 text-sm font-medium text-white">Donation Growth</h3>
            </div>
            <p className="text-sm text-gray-300">
              Donations have increased by <span className="font-semibold text-green-300">32%</span> compared to the previous year, with the most significant growth in fresh produce.
            </p>
          </div>
          
          <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="ml-3 text-sm font-medium text-white">Top Recipients</h3>
            </div>
            <p className="text-sm text-gray-300">
              Families with children represent <span className="font-semibold text-blue-300">40%</span> of all recipients, followed by individuals experiencing homelessness.
            </p>
          </div>
          
          <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="ml-3 text-sm font-medium text-white">Environmental Impact</h3>
            </div>
            <p className="text-sm text-gray-300">
              Your donations have prevented <span className="font-semibold text-green-300">18,000 kg</span> of food waste from reaching landfills in the last year.
            </p>
          </div>
        </div>
      </div>

      {/* Report Generation Section */}
      <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Custom Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Report Type</label>
            <select className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm">
              <option>Donation Summary</option>
              <option>Distribution Details</option>
              <option>Impact Analysis</option>
              <option>Donor Activity</option>
              <option>Recipient Demographics</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">From Date</label>
            <input type="date" className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">To Date</label>
            <input type="date" className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm" />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm font-medium">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports; 