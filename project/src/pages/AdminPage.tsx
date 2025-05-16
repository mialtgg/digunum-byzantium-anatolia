import React, { useState } from 'react';
import { useCoins } from '../context/CoinContext';
import { Coin } from '../types';
import { Plus, Save } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { coins, addCoin } = useCoins();
  const [isAdding, setIsAdding] = useState(false);
  const [newCoin, setNewCoin] = useState<Partial<Coin>>({
    name: '',
    period: '',
    year: '',
    description: '',
    imageUrl: '',
    location: {
      lat: 39.0,
      lng: 35.0,
      name: '',
    },
    mint: '',
    material: '',
    denomination: '',
    obverseDescription: '',
    reverseDescription: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setNewCoin(prev => ({
        ...prev,
        location: {
          ...prev.location as any,
          [locationField]: locationField === 'lat' || locationField === 'lng' 
            ? parseFloat(value) 
            : value
        }
      }));
    } else {
      setNewCoin(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCoin.name && newCoin.description && newCoin.location) {
      addCoin(newCoin as Coin);
      setNewCoin({
        name: '',
        period: '',
        year: '',
        description: '',
        imageUrl: '',
        location: {
          lat: 39.0,
          lng: 35.0,
          name: '',
        },
        mint: '',
        material: '',
        denomination: '',
        obverseDescription: '',
        reverseDescription: '',
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-purple-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage the Byzantine coin collection database</p>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-serif font-bold text-purple-800">
          {isAdding ? 'Add New Coin' : 'Coin Collection'}
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
        >
          {isAdding ? 'Cancel' : (
            <>
              <Plus className="h-5 w-5 mr-1" />
              Add New Coin
            </>
          )}
        </button>
      </div>
      
      {!isAdding ? (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coins.map((coin) => (
                <tr key={coin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                    <div className="text-sm text-gray-500">{coin.year}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{coin.period}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{coin.location.name}</div>
                    <div className="text-xs text-gray-500">
                      {coin.location.lat.toFixed(4)}, {coin.location.lng.toFixed(4)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coin.material}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Coin Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCoin.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                  Period
                </label>
                <input
                  type="text"
                  id="period"
                  name="period"
                  value={newCoin.period}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year/Era
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={newCoin.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={newCoin.material}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="denomination" className="block text-sm font-medium text-gray-700 mb-1">
                  Denomination
                </label>
                <input
                  type="text"
                  id="denomination"
                  name="denomination"
                  value={newCoin.denomination}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="mint" className="block text-sm font-medium text-gray-700 mb-1">
                  Mint
                </label>
                <input
                  type="text"
                  id="mint"
                  name="mint"
                  value={newCoin.mint}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={newCoin.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="obverseDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Obverse Description
                </label>
                <textarea
                  id="obverseDescription"
                  name="obverseDescription"
                  rows={2}
                  value={newCoin.obverseDescription}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="reverseDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Reverse Description
                </label>
                <textarea
                  id="reverseDescription"
                  name="reverseDescription"
                  rows={2}
                  value={newCoin.reverseDescription}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={newCoin.imageUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-1">Location</legend>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label htmlFor="location.name" className="sr-only">Location Name</label>
                      <input
                        type="text"
                        id="location.name"
                        name="location.name"
                        value={newCoin.location?.name || ''}
                        onChange={handleInputChange}
                        required
                        placeholder="Location Name (e.g., Constantinople)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="location.lat" className="sr-only">Latitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          id="location.lat"
                          name="location.lat"
                          value={newCoin.location?.lat || ''}
                          onChange={handleInputChange}
                          required
                          placeholder="Latitude"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="location.lng" className="sr-only">Longitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          id="location.lng"
                          name="location.lng"
                          value={newCoin.location?.lng || ''}
                          onChange={handleInputChange}
                          required
                          placeholder="Longitude"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                className="flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Coin
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;