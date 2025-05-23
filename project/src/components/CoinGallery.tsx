import React from 'react';
import { useCoins } from '../context/CoinContext';

const CoinGallery: React.FC = () => {
  const { coins, setSelectedCoin } = useCoins();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-serif font-bold text-orange-500 mb-4">Coin Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map((coin) => (
          <div 
            key={coin.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => setSelectedCoin(coin)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={coin.imageUrl} 
                alt={coin.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif font-bold text-orange-500">{coin.name}</h3>
              <p className="text-sm text-orange-500">{coin.period}</p>
              <p className="text-sm text-gray-600">{coin.year}</p>
              <p className="text-sm text-gray-500 mt-1">{coin.location.name}</p>
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">{coin.description}</p>
              <button 
                className="mt-3 text-sm bg-orange-500 hover:bg-orange-500 text-white px-3 py-1 rounded-full transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinGallery;