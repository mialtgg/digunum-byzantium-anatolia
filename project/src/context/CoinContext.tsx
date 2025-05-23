import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Coin } from '../types';
import { sampleCoins } from '../data/sampleCoins';

interface CoinContextType {
  coins: Coin[];
  addCoin: (coin: Coin) => void;
  selectedCoin: Coin | null;
  setSelectedCoin: (coin: Coin | null) => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or fall back to sampleCoins
  const [coins, setCoins] = useState<Coin[]>(() => {
    const savedCoins = localStorage.getItem('byzantineCoins');
    return savedCoins ? JSON.parse(savedCoins) : sampleCoins;
  });
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  // Save coins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('byzantineCoins', JSON.stringify(coins));
  }, [coins]);

  const addCoin = (coin: Coin) => {
    setCoins(prevCoins => [...prevCoins, { ...coin, id: String(prevCoins.length + 1) }]);
  };

  return (
    <CoinContext.Provider value={{ coins, addCoin, selectedCoin, setSelectedCoin }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = (): CoinContextType => {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
};