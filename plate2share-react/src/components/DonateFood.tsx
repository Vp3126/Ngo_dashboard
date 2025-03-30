import React, { useState } from 'react';

interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  expiryDate: string;
  category: string;
  image: string;
}

const DonateFood: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [pickupSchedule, setPickupSchedule] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);

  // Simulated food items data (in a real app, this would come from an API)
  const foodItems: FoodItem[] = [
    {
      id: '1',
      name: 'Fresh Apples',
      quantity: '5 kg',
      expiryDate: '2023-12-31',
      category: 'Fruits & Vegetables',
      image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Milk',
      quantity: '2 liters',
      expiryDate: '2023-12-25',
      category: 'Dairy & Eggs',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      name: 'Bread Loaves',
      quantity: '3 loaves',
      expiryDate: '2023-12-27',
      category: 'Bread & Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      name: 'Canned Beans',
      quantity: '12 cans',
      expiryDate: '2024-06-30',
      category: 'Pantry Items',
      image: 'https://images.unsplash.com/photo-1584263347416-85a696b4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '5',
      name: 'Mixed Vegetables',
      quantity: '3 kg',
      expiryDate: '2023-12-29',
      category: 'Fruits & Vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Mock recipients data
  const recipients = [
    { id: '1', name: 'Local Food Bank' },
    { id: '2', name: 'Community Shelter' },
    { id: '3', name: 'Neighborhood Kitchen' },
    { id: '4', name: 'Children\'s Home' },
    { id: '5', name: 'Senior Center' },
  ];

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prevSelected) => 
      prevSelected.includes(itemId)
        ? prevSelected.filter(id => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItems.length === 0 || !recipient) {
      alert('Please select at least one item and a recipient');
      return;
    }
    
    // In a real app, you would submit this data to your API
    console.log({
      selectedItems,
      recipient,
      note,
      deliveryOption,
      pickupSchedule: deliveryOption === 'pickup' ? pickupSchedule : null,
    });
    
    // Show success message
    setDonationSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSelectedItems([]);
      setRecipient('');
      setNote('');
      setDeliveryOption('pickup');
      setPickupSchedule('');
      setDonationSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-4 md:p-6 bg-[#f2f2e6]">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Donate Food</h1>
      
      {donationSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success!</p>
          <p>Your donation has been submitted successfully. Thank you for your generosity!</p>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Food Items Selection - Left side */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Food Items to Donate</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodItems.map((item) => (
                <div 
                  key={item.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedItems.includes(item.id) 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleItemSelection(item.id)}
                >
                  <div className="flex">
                    <div className="w-1/3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <input 
                          type="checkbox" 
                          checked={selectedItems.includes(item.id)}
                          onChange={() => {}} // Handled by the parent div click
                          className="h-5 w-5 text-green-600"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Expires: {item.expiryDate}</p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {foodItems.length === 0 && (
              <p className="text-gray-500 italic">You don't have any food items available for donation.</p>
            )}
          </div>
        </div>
        
        {/* Donation Form - Right side */}
        <div className="w-full lg:w-96">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Donation Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient
                </label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white"
                  required
                >
                  <option value="">Select a recipient</option>
                  {recipients.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white"
                  placeholder="Any special instructions or notes..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Option
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pickup"
                      name="deliveryOption"
                      value="pickup"
                      checked={deliveryOption === 'pickup'}
                      onChange={() => setDeliveryOption('pickup')}
                      className="h-4 w-4 text-green-600 border-gray-300"
                    />
                    <label htmlFor="pickup" className="ml-2 block text-sm text-gray-700">
                      Pickup
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="dropoff"
                      name="deliveryOption"
                      value="dropoff"
                      checked={deliveryOption === 'dropoff'}
                      onChange={() => setDeliveryOption('dropoff')}
                      className="h-4 w-4 text-green-600 border-gray-300"
                    />
                    <label htmlFor="dropoff" className="ml-2 block text-sm text-gray-700">
                      I'll drop off
                    </label>
                  </div>
                </div>
              </div>
              
              {deliveryOption === 'pickup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Schedule
                  </label>
                  <input
                    type="datetime-local"
                    value={pickupSchedule}
                    onChange={(e) => setPickupSchedule(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white"
                    required={deliveryOption === 'pickup'}
                  />
                </div>
              )}
              
              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    Selected Items:
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {selectedItems.length}
                  </span>
                </div>
                
                <button
                  type="submit"
                  className={`w-full px-4 py-2 text-white rounded-md transition ${
                    selectedItems.length > 0
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={selectedItems.length === 0}
                >
                  Complete Donation
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateFood; 