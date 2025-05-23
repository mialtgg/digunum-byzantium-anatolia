import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Glasses, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCoins } from '../context/CoinContext';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { coins, setSelectedCoin } = useCoins();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return coins;
    
    const query = searchQuery.toLowerCase();
    return coins.filter(coin => 
      (coin.name?.toLowerCase() || '').includes(query) ||
      (coin.description?.toLowerCase() || '').includes(query) ||
      (coin.location?.name?.toLowerCase() || '').includes(query) ||
      (coin.year?.toString() || '').includes(query) ||
      (coin.material?.toLowerCase() || '').includes(query)
    );
  }, [searchQuery, coins]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-600 mb-8 drop-shadow-md">
              Digital Byzantine Numismatic Project of Anatolia
            </h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search coins, locations, or descriptions..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 border border-gray-100">
                    {filteredCoins.length > 0 ? (
                      filteredCoins.map(coin => (
                        <Link
                          key={coin.id}
                          to="/map"
                          onClick={() => setSelectedCoin(coin)}
                          className="block w-full px-4 py-3 text-left hover:bg-orange-50/50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="font-medium text-gray-900">{coin.name}</div>
                          <div className="text-sm text-gray-600">{coin.location.name} - {coin.year}</div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VR Museum Button */}
      <div className="text-center -mt-8 mb-12">
        <Link 
          to="/vr-museum" 
          className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-orange-500 rounded-lg shadow-lg hover:bg-orange-500 transition-all duration-300 transform hover:scale-105"
        >
          <Glasses className="w-6 h-6 mr-2" />
          {t('vr.button')}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;