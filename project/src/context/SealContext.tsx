import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Seal } from '../types';

interface SealContextType {
  seals: Seal[];
  addSeal: (seal: Seal) => void;
  selectedSeal: Seal | null;
  setSelectedSeal: (seal: Seal | null) => void;
}

const SealContext = createContext<SealContextType | undefined>(undefined);

export const SealProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or empty array
  const [seals, setSeals] = useState<Seal[]>(() => {
    const savedSeals = localStorage.getItem('byzantineSeals');
    return savedSeals ? JSON.parse(savedSeals) : [];
  });
  const [selectedSeal, setSelectedSeal] = useState<Seal | null>(null);

  // Save seals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('byzantineSeals', JSON.stringify(seals));
  }, [seals]);

  const addSeal = (seal: Seal) => {
    setSeals(prevSeals => [...prevSeals, { ...seal, id: String(prevSeals.length + 1) }]);
  };

  return (
    <SealContext.Provider value={{ seals, addSeal, selectedSeal, setSelectedSeal }}>
      {children}
    </SealContext.Provider>
  );
};

export const useSeals = () => {
  const context = useContext(SealContext);
  if (context === undefined) {
    throw new Error('useSeals must be used within a SealProvider');
  }
  return context;
}; 