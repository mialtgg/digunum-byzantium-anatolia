import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCoins } from '../context/CoinContext';
import { Coins as Coin } from 'lucide-react';
import L from 'leaflet';

// Fix for Leaflet marker icon issues in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icon for coins
const coinIcon = L.divIcon({
  className: 'custom-coin-marker',
  html: '<div class="coin-marker-inner"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coins"><circle cx="8" cy="8" r="7"/><circle cx="16" cy="16" r="7"/><path d="M8 15h8"/><path d="M8 8h8"/><path d="M8 11h8"/></svg></div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Map center adjustment component
const SetMapView: React.FC<{center: [number, number], zoom: number}> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const CoinMap: React.FC = () => {
  const { coins, selectedCoin, setSelectedCoin } = useCoins();
  
  // Center of Anatolia (approximately Konya)
  const center: [number, number] = [38.5, 33.0];
  const zoom = 7;

  // Anatolia bounds - wider focus
  const anatoliaBounds: L.LatLngBoundsLiteral = [
    [35.0, 25.0], // Southwest coordinates
    [42.0, 45.0]  // Northeast coordinates
  ];

  return (
    <div className="h-full w-full relative z-0">
      <style jsx>{`
        .custom-coin-marker {
          background: none;
        }
        .coin-marker-inner {
          background-color: #FBBF24;
          color: #7E22CE;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
          transition: all 0.3s ease;
        }
        .coin-marker-inner:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.9);
        }
      `}</style>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        maxBounds={anatoliaBounds}
        minZoom={5}
        maxZoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {selectedCoin && (
          <SetMapView 
            center={[selectedCoin.location.lat, selectedCoin.location.lng]} 
            zoom={10} 
          />
        )}

        {coins.map(coin => (
          <Marker 
            key={coin.id} 
            position={[coin.location.lat, coin.location.lng]}
            icon={coinIcon}
            eventHandlers={{
              click: () => {
                setSelectedCoin(coin);
              }
            }}
          >
            <Popup>
              <div className="text-center p-1">
                <h3 className="font-serif font-bold text-purple-900">{coin.name}</h3>
                <p className="text-sm text-gray-600">{coin.location.name}</p>
                <p className="text-xs text-gray-500">{coin.year}</p>
                <button 
                  className="mt-2 text-xs bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded transition-colors"
                  onClick={() => setSelectedCoin(coin)}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoinMap;