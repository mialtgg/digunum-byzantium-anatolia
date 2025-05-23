import React from 'react';
import { useCoins } from '../context/CoinContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CoinDetails: React.FC = () => {
  const { coins, selectedCoin, setSelectedCoin } = useCoins();
  
  if (!selectedCoin) return null;
  
  const currentIndex = coins.findIndex(coin => coin.id === selectedCoin.id);
  
  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + coins.length) % coins.length;
    setSelectedCoin(coins[newIndex]);
  };
  
  const handleNext = () => {
    const newIndex = (currentIndex + 1) % coins.length;
    setSelectedCoin(coins[newIndex]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 bg-purple-900 text-white flex justify-between items-center">
          <h2 className="font-serif text-xl font-bold">Coin Details</h2>
          <button 
            onClick={() => setSelectedCoin(null)}
            className="p-1 rounded-full hover:bg-purple-800 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Coin image with navigation */}
          <div className="md:w-1/2 p-4 bg-orange-50 relative">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
              <img 
                src={selectedCoin.imageUrl} 
                alt="Coin" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 flex items-center justify-between p-2">
                <button 
                  onClick={handlePrevious}
                  className="p-1 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-1 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </div>
            </div>
            
            <div className="text-center mt-2 text-sm text-gray-600">
              {`${currentIndex + 1} of ${coins.length}`}
            </div>
          </div>
          
          {/* Coin details */}
          <div className="md:w-1/2 p-6 overflow-y-auto max-h-[60vh] md:max-h-[70vh]">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-purple-900 mb-1">Employee</h3>
                <p className="text-gray-700">{selectedCoin.employee}</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-900 mb-1">Reference</h3>
                <p className="text-gray-700">{selectedCoin.reference}</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-900 mb-1">Location</h3>
                <p className="text-gray-700">{selectedCoin.location}</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-900 mb-1">Obverse</h3>
                <p className="text-gray-700">{selectedCoin.observe}</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-900 mb-1">Reverse</h3>
                <p className="text-gray-700">{selectedCoin.reverse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;