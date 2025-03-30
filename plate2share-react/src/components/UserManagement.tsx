import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'donor' | 'recipient' | 'volunteer';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  avatar?: string;
  donations?: number;
  distributions?: number;
}

// Sample user data
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2024-03-25T10:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    donations: 0,
    distributions: 0
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'donor',
    status: 'active',
    joinDate: '2023-02-20',
    lastActive: '2024-03-24T14:45:00',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    donations: 15,
    distributions: 0
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    role: 'recipient',
    status: 'active',
    joinDate: '2023-03-10',
    lastActive: '2024-03-23T09:15:00',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    donations: 0,
    distributions: 8
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    role: 'volunteer',
    status: 'active',
    joinDate: '2023-04-05',
    lastActive: '2024-03-25T16:20:00',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    donations: 5,
    distributions: 12
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'donor',
    status: 'inactive',
    joinDate: '2023-05-12',
    lastActive: '2024-02-15T11:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    donations: 8,
    distributions: 0
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'recipient',
    status: 'pending',
    joinDate: '2024-03-22',
    lastActive: '2024-03-22T15:40:00',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    donations: 0,
    distributions: 0
  },
  {
    id: '7',
    name: 'Daniel Wilson',
    email: 'daniel.w@example.com',
    role: 'volunteer',
    status: 'active',
    joinDate: '2023-08-30',
    lastActive: '2024-03-24T13:10:00',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    donations: 3,
    distributions: 20
  },
  {
    id: '8',
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    role: 'donor',
    status: 'active',
    joinDate: '2023-09-15',
    lastActive: '2024-03-23T10:45:00',
    avatar: 'https://randomuser.me/api/portraits/women/64.jpg',
    donations: 25,
    distributions: 0
  }
];

const roleColors = {
  admin: 'bg-purple-900 text-purple-200',
  donor: 'bg-blue-900 text-blue-200',
  recipient: 'bg-green-900 text-green-200',
  volunteer: 'bg-yellow-900 text-yellow-200'
};

const statusColors = {
  active: 'bg-green-900 text-green-200',
  inactive: 'bg-gray-700 text-gray-300',
  pending: 'bg-yellow-900 text-yellow-200'
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Calculate summary values
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const admins = users.filter(u => u.role === 'admin').length;
  const donors = users.filter(u => u.role === 'donor').length;
  const recipients = users.filter(u => u.role === 'recipient').length;
  const volunteers = users.filter(u => u.role === 'volunteer').length;

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'email':
        comparison = a.email.localeCompare(b.email);
        break;
      case 'role':
        comparison = a.role.localeCompare(b.role);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'joinDate':
        comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        break;
      case 'lastActive':
        comparison = new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">User Management</h1>
        <p className="text-gray-600">Manage users, roles, and permissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
          <p className="mt-2 text-2xl font-semibold text-white">{totalUsers}</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Active Users</h3>
          <p className="mt-2 text-2xl font-semibold text-green-300">{activeUsers}</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Admins</h3>
          <p className="mt-2 text-2xl font-semibold text-purple-300">{admins}</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Donors</h3>
          <p className="mt-2 text-2xl font-semibold text-blue-300">{donors}</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Recipients</h3>
          <p className="mt-2 text-2xl font-semibold text-green-300">{recipients}</p>
        </div>
        
        <div className="bg-[#1b2233] p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Volunteers</h3>
          <p className="mt-2 text-2xl font-semibold text-yellow-300">{volunteers}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1b2233] p-5 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
            
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <button 
              onClick={() => setIsInviteModalOpen(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Invite User
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1b2233] rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    User {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email {getSortIcon('email')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center">
                    Role {getSortIcon('role')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('joinDate')}
                >
                  <div className="flex items-center">
                    Join Date {getSortIcon('joinDate')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastActive')}
                >
                  <div className="flex items-center">
                    Last Active {getSortIcon('lastActive')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Activity
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-300">{user.email}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${roleColors[user.role]}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[user.status]}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-300">{new Date(user.joinDate).toLocaleDateString()}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-300">{formatLastActive(user.lastActive)}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {user.role === 'donor' && (
                        <span className="px-2 py-1 text-xs bg-blue-900 text-blue-200 rounded-full">{user.donations} Donations</span>
                      )}
                      {user.role === 'recipient' && (
                        <span className="px-2 py-1 text-xs bg-green-900 text-green-200 rounded-full">{user.distributions} Received</span>
                      )}
                      {user.role === 'volunteer' && (
                        <span className="px-2 py-1 text-xs bg-yellow-900 text-yellow-200 rounded-full">{user.distributions} Distributed</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="text-blue-300 hover:text-blue-100 mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedUsers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-white text-lg">No users found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1b2233] rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Edit User</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                  defaultValue={selectedUser.name}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                  defaultValue={selectedUser.email}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                <select 
                  className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                  defaultValue={selectedUser.role}
                >
                  <option value="admin">Admin</option>
                  <option value="donor">Donor</option>
                  <option value="recipient">Recipient</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <select 
                  className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                  defaultValue={selectedUser.status}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 text-sm mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1b2233] rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Confirm Deletion</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-300">
                Are you sure you want to delete user <span className="font-semibold text-white">{selectedUser.name}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 text-sm mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 text-sm"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1b2233] rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Invite New User</h2>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                <select 
                  className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                  defaultValue="donor"
                >
                  <option value="admin">Admin</option>
                  <option value="donor">Donor</option>
                  <option value="recipient">Recipient</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Custom Message (Optional)</label>
                <textarea 
                  rows={3}
                  placeholder="Enter a custom message to include in the invitation email"
                  className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white text-sm"
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 text-sm mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 