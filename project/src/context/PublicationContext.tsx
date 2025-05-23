import React, { createContext, useContext, useState } from 'react';
import { Publication } from '../types/Publication';

interface PublicationContextType {
  publications: Publication[];
  loading: boolean;
  error: string | null;
  addPublication: (publication: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePublication: (id: string, publication: Partial<Publication>) => void;
  deletePublication: (id: string) => void;
}

const PublicationContext = createContext<PublicationContextType | undefined>(undefined);

export const PublicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addPublication = (publicationData: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date();
      const newPublication: Publication = {
        ...publicationData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };

      setPublications(prev => [newPublication, ...prev]);
      setError(null);
    } catch (err) {
      setError('Failed to add publication');
      console.error('Error adding publication:', err);
    }
  };

  const updatePublication = (id: string, publicationData: Partial<Publication>) => {
    try {
      setPublications(prev => prev.map(pub => 
        pub.id === id 
          ? { ...pub, ...publicationData, updatedAt: new Date() }
          : pub
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update publication');
      console.error('Error updating publication:', err);
    }
  };

  const deletePublication = (id: string) => {
    try {
      setPublications(prev => prev.filter(pub => pub.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete publication');
      console.error('Error deleting publication:', err);
    }
  };

  return (
    <PublicationContext.Provider value={{
      publications,
      loading,
      error,
      addPublication,
      updatePublication,
      deletePublication
    }}>
      {children}
    </PublicationContext.Provider>
  );
};

export const usePublications = () => {
  const context = useContext(PublicationContext);
  if (context === undefined) {
    throw new Error('usePublications must be used within a PublicationProvider');
  }
  return context;
}; 