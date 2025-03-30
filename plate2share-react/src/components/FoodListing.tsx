import React, { useState } from 'react';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  expiryDate: string;
  donorName: string;
  location: string;
  status: 'available' | 'reserved' | 'claimed';
  imageUrl: string;
}

const sampleFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Fresh Vegetables',
    category: 'Produce',
    quantity: '20 kg',
    expiryDate: '2024-04-05',
    donorName: 'Green Fields Organic',
    location: 'Downtown Food Bank',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1557844352-761f2149536b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '2',
    name: 'Bread Loaves',
    category: 'Bakery',
    quantity: '15 loaves',
    expiryDate: '2024-04-02',
    donorName: 'Daily Bread Bakery',
    location: 'Community Center',
    status: 'reserved',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '3',
    name: 'Canned Beans',
    category: 'Canned Goods',
    quantity: '40 cans',
    expiryDate: '2024-12-25',
    donorName: 'Metro Supermarket',
    location: 'Food Pantry',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '4',
    name: 'Rice',
    category: 'Grains',
    quantity: '50 kg',
    expiryDate: '2025-03-15',
    donorName: 'Asian Market',
    location: 'Shelter B',
    status: 'claimed',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '5',
    name: 'Milk',
    category: 'Dairy',
    quantity: '20 liters',
    expiryDate: '2024-04-01',
    donorName: 'Local Dairy Farm',
    location: 'Downtown Food Bank',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '6',
    name: 'Assorted Fruits',
    category: 'Produce',
    quantity: '15 kg',
    expiryDate: '2024-04-03',
    donorName: 'Fresh Mart',
    location: 'Community Center',
    status: 'reserved',
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  }
];

const FoodListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'Produce', 'Bakery', 'Canned Goods', 'Grains', 'Dairy'];
  const statuses = ['All', 'Available', 'Reserved', 'Claimed'];

  const filteredItems = sampleFoodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Available' && item.status === 'available') ||
                         (selectedStatus === 'Reserved' && item.status === 'reserved') ||
                         (selectedStatus === 'Claimed' && item.status === 'claimed');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Food Listing</h1>
        <p className="text-gray-600">Browse available food items for distribution</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, donor, or location"
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select
              id="category"
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-400 mb-1">Status</label>
            <select
              id="status"
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-[#1b2233] rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 relative overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'available' ? 'bg-green-900 text-green-200' :
                item.status === 'reserved' ? 'bg-yellow-900 text-yellow-200' :
                'bg-red-900 text-red-200'
              }`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white mb-1">{item.name}</h2>
              <p className="text-sm text-gray-400 mb-3">
                {item.category} • {item.quantity} • Expires: {item.expiryDate}
              </p>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs text-gray-400">Donor</p>
                  <p className="text-sm text-white">{item.donorName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm text-white">{item.location}</p>
                </div>
              </div>
              <button className={`w-full py-2 rounded-md text-sm font-medium ${
                item.status === 'available' ? 'bg-blue-900 text-white hover:bg-blue-800' :
                item.status === 'reserved' ? 'bg-gray-700 text-gray-300 cursor-not-allowed' :
                'bg-gray-700 text-gray-300 cursor-not-allowed'
              }`}>
                {item.status === 'available' ? 'Reserve Now' : 
                 item.status === 'reserved' ? 'Reserved' : 'Claimed'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-[#1b2233] p-8 rounded-lg shadow-lg text-center">
          <p className="text-white text-lg">No food items found matching your criteria</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default FoodListing; 