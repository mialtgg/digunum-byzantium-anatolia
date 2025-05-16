import React from 'react';
import CoinMap from '../components/CoinMap';
import CoinGallery from '../components/CoinGallery';
import CoinDetails from '../components/CoinDetails';
import { useCoins } from '../context/CoinContext';

const MapPage: React.FC = () => {
  const { selectedCoin } = useCoins();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-purple-900 mb-2">Byzantine Coins of Anatolia</h1>
        <p className="max-w-3xl mx-auto text-gray-600">
          Explore the digitized collection of Byzantine coins discovered throughout Anatolia. 
          Click on map markers to view detailed information about each historical artifact.
        </p>
      </div>
      <CoinMap />
      <CoinGallery />
      {selectedCoin && <CoinDetails />}
    </div>
  );
};

export default MapPage; 