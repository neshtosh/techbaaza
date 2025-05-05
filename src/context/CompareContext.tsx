import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Product } from '../types/product';

interface CompareContextProps {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextProps | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Product[]>(() => {
    const savedCompareList = localStorage.getItem('compare');
    return savedCompareList ? JSON.parse(savedCompareList) : [];
  });

  // Save compare list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product: Product) => {
    setCompareItems(prevItems => {
      // Limit compare list to max 4 items
      if (prevItems.length >= 4) {
        // If already at max, don't add
        return prevItems;
      }
      
      // Check if product is already in compare list
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      }
      
      return [...prevItems, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const isInCompare = (productId: string) => {
    return compareItems.some(item => item.id === productId);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompareContext = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompareContext must be used within a CompareProvider');
  }
  return context;
};