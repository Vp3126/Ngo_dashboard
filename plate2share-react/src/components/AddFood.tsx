import React, { useState } from 'react';

const AddFood: React.FC = () => {
  const [foodItem, setFoodItem] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    description: '',
    category: '',
    isVegetarian: false,
    isVegan: false,
    allergens: '',
    pickupAddress: '',
    pickupTime: '',
    image: null as File | null
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFoodItem({
        ...foodItem,
        [name]: target.checked
      });
    } else {
      setFoodItem({
        ...foodItem,
        [name]: value
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoodItem({
        ...foodItem,
        image: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Food item submitted:', foodItem);
    // Here you would typically send the data to your backend API
    alert('Food item added successfully!');
    // Reset form
    setFoodItem({
      name: '',
      quantity: '',
      expiryDate: '',
      description: '',
      category: '',
      isVegetarian: false,
      isVegan: false,
      allergens: '',
      pickupAddress: '',
      pickupTime: '',
      image: null
    });
    setPreview(null);
  };

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Bread & Bakery',
    'Meat & Seafood',
    'Pantry Items',
    'Prepared Foods',
    'Beverages',
    'Other'
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Food Item</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                value={foodItem.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                value={foodItem.quantity}
                onChange={handleChange}
                placeholder="e.g., 2 kg, 5 boxes, 3 loaves"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={foodItem.expiryDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={foodItem.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVegetarian"
                  name="isVegetarian"
                  checked={foodItem.isVegetarian}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isVegetarian" className="ml-2 block text-sm text-gray-700">
                  Vegetarian
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVegan"
                  name="isVegan"
                  checked={foodItem.isVegan}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isVegan" className="ml-2 block text-sm text-gray-700">
                  Vegan
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allergens
              </label>
              <input
                type="text"
                name="allergens"
                value={foodItem.allergens}
                onChange={handleChange}
                placeholder="e.g., nuts, dairy, gluten"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={foodItem.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Address
              </label>
              <input
                type="text"
                name="pickupAddress"
                value={foodItem.pickupAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Time
              </label>
              <input
                type="datetime-local"
                name="pickupTime"
                value={foodItem.pickupTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Food preview"
                    className="h-40 w-auto object-contain border rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood; 