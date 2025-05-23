import React from 'react';
import backgroundImage from '../assets/background.jpeg';

const Home: React.FC = () => {
  return (
    <div 
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60">
        <div className="relative h-screen flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              Byzantine Coin Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Explore the rich history of Byzantine numismatics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 