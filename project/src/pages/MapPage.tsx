import React from 'react';
import CoinMap from '../components/CoinMap';
import CoinGallery from '../components/CoinGallery';
import CoinDetails from '../components/CoinDetails';
import { useCoins } from '../context/CoinContext';

const MapPage: React.FC = () => {
  const { selectedCoin } = useCoins();

  return (
    <div className="relative h-[calc(100vh-5rem)] border-t border-orange-500/30 shadow-sm">
      <div className="absolute inset-0">
        <CoinMap />
      </div>
      {selectedCoin && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <CoinDetails />
        </div>
      )}
    </div>
  );
};

export default MapPage; 