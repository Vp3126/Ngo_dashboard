import React, { useState } from 'react';

interface Donation {
  id: string;
  type: string;
  name: string;
  quantity: string;
  date: string;
  status: 'pending' | 'accepted' | 'distributed' | 'rejected';
  recipient?: string;
  distributionDate?: string;
  imageUrl?: string;
}

const sampleDonations: Donation[] = [
  {
    id: '1',
    type: 'Food',
    name: 'Fresh Vegetables',
    quantity: '15 kg',
    date: '2024-03-25',
    status: 'accepted',
    recipient: 'Downtown Food Bank',
    distributionDate: '2024-03-27',
    imageUrl: 'https://images.unsplash.com/photo-1557844352-761f2149536b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '2',
    type: 'Food',
    name: 'Canned Soups',
    quantity: '24 cans',
    date: '2024-03-22',
    status: 'distributed',
    recipient: 'Community Center',
    distributionDate: '2024-03-24',
    imageUrl: 'https://images.unsplash.com/photo-1585748582439-362896ed331a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '3',
    type: 'Money',
    name: 'Monetary Donation',
    quantity: '$250',
    date: '2024-03-18',
    status: 'distributed',
    recipient: 'Food for All Initiative',
    distributionDate: '2024-03-19'
  },
  {
    id: '4',
    type: 'Food',
    name: 'Rice',
    quantity: '25 kg',
    date: '2024-03-15',
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '5',
    type: 'Food',
    name: 'Fruits and Vegetables',
    quantity: '10 kg',
    date: '2024-03-10',
    status: 'rejected',
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  }
];

const MyDonations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<Donation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDonations = activeTab === 'all' 
    ? sampleDonations 
    : sampleDonations.filter(donation => donation.status === activeTab);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900 text-yellow-200';
      case 'accepted':
        return 'bg-blue-900 text-blue-200';
      case 'distributed':
        return 'bg-green-900 text-green-200';
      case 'rejected':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const handleViewDetails = (donation: Donation) => {
    setSelectedItem(donation);
    setIsModalOpen(true);
  };

  const donationStats = {
    total: sampleDonations.length,
    pending: sampleDonations.filter(d => d.status === 'pending').length,
    accepted: sampleDonations.filter(d => d.status === 'accepted').length,
    distributed: sampleDonations.filter(d => d.status === 'distributed').length,
    rejected: sampleDonations.filter(d => d.status === 'rejected').length,
  };

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Donations</h1>
        <p className="text-gray-600">Track and manage your contributions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-2xl font-semibold text-white">{donationStats.total}</p>
        </div>
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Pending</p>
          <p className="text-2xl font-semibold text-yellow-300">{donationStats.pending}</p>
        </div>
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Accepted</p>
          <p className="text-2xl font-semibold text-blue-300">{donationStats.accepted}</p>
        </div>
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Distributed</p>
          <p className="text-2xl font-semibold text-green-300">{donationStats.distributed}</p>
        </div>
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Rejected</p>
          <p className="text-2xl font-semibold text-red-300">{donationStats.rejected}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg mb-6">
        <div className="flex flex-wrap border-b border-gray-700">
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'all' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Donations
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'pending' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'accepted' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'distributed' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('distributed')}
          >
            Distributed
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'rejected' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Donation List */}
      <div className="bg-[#1b2233] rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {donation.imageUrl ? (
                        <img 
                          src={donation.imageUrl} 
                          alt={donation.name}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center mr-3">
                          <span className="text-white font-medium">
                            {donation.type === 'Money' ? '$' : 'F'}
                          </span>
                        </div>
                      )}
                      <div className="text-sm font-medium text-white">{donation.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {donation.type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {donation.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {donation.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(donation.status)}`}>
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleViewDetails(donation)}
                      className="text-blue-300 hover:text-blue-100 mr-3"
                    >
                      View
                    </button>
                    {donation.status === 'pending' && (
                      <button className="text-red-400 hover:text-red-300">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDonations.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-white text-lg">No donations found</p>
            <p className="text-gray-400 mt-2">
              {activeTab === 'all' 
                ? "You haven't made any donations yet" 
                : `You don't have any ${activeTab} donations`}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm font-medium">
              Make a Donation
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1b2233] rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Donation Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <div className="flex flex-col md:flex-row">
                {selectedItem.imageUrl && (
                  <div className="w-full md:w-1/3 md:pr-4 mb-4 md:mb-0">
                    <img 
                      src={selectedItem.imageUrl} 
                      alt={selectedItem.name} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="w-full md:w-2/3">
                  <div className="mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(selectedItem.status)}`}>
                      {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedItem.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Type</p>
                      <p className="text-sm text-white">{selectedItem.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Quantity</p>
                      <p className="text-sm text-white">{selectedItem.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Donation Date</p>
                      <p className="text-sm text-white">{selectedItem.date}</p>
                    </div>
                    {selectedItem.recipient && (
                      <div>
                        <p className="text-xs text-gray-400">Recipient</p>
                        <p className="text-sm text-white">{selectedItem.recipient}</p>
                      </div>
                    )}
                    {selectedItem.distributionDate && (
                      <div>
                        <p className="text-xs text-gray-400">Distribution Date</p>
                        <p className="text-sm text-white">{selectedItem.distributionDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-white mb-2">Donation Timeline</h4>
                <div className="relative pl-8">
                  <div className="absolute top-0 left-3 h-full w-0.5 bg-gray-700"></div>
                  
                  <div className="mb-4 relative">
                    <div className="absolute -left-5 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-xs text-gray-400">Donation Created</p>
                    <p className="text-sm text-white">{selectedItem.date}</p>
                  </div>
                  
                  {selectedItem.status === 'accepted' || selectedItem.status === 'distributed' || selectedItem.status === 'rejected' ? (
                    <div className="mb-4 relative">
                      <div className={`absolute -left-5 mt-1 w-3 h-3 rounded-full ${
                        selectedItem.status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <p className="text-xs text-gray-400">
                        {selectedItem.status === 'rejected' ? 'Donation Rejected' : 'Donation Accepted'}
                      </p>
                      <p className="text-sm text-white">{
                        selectedItem.status === 'rejected' ? selectedItem.date : 
                        new Date(new Date(selectedItem.date).getTime() + 86400000).toISOString().split('T')[0]
                      }</p>
                    </div>
                  ) : null}
                  
                  {selectedItem.status === 'distributed' && (
                    <div className="relative">
                      <div className="absolute -left-5 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                      <p className="text-xs text-gray-400">Donation Distributed</p>
                      <p className="text-sm text-white">{selectedItem.distributionDate}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-800 px-4 py-3 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonations; 