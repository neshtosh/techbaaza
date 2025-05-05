import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Supplier } from '../types/supplier';

interface SupplierContextType {
  suppliers: Supplier[];
  getSupplierById: (id: string) => Supplier | undefined;
  getSuppliersByProduct: (productId: string) => Supplier[];
  getSuppliersByCategory: (category: string) => Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplier must be used within a SupplierProvider');
  }
  return context;
};

interface SupplierProviderProps {
  children: ReactNode;
}

export const SupplierProvider: React.FC<SupplierProviderProps> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSupplierById = (id: string) => {
    return suppliers.find(supplier => supplier.id === id);
  };

  const getSuppliersByProduct = (productId: string) => {
    // This would typically be an API call
    return suppliers.filter(supplier => 
      supplier.mainProducts.some(product => product === productId)
    );
  };

  const getSuppliersByCategory = (category: string) => {
    // This would typically be an API call
    return suppliers.filter(supplier => 
      supplier.mainProducts.some(product => product.toLowerCase().includes(category.toLowerCase()))
    );
  };

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    setLoading(true);
    try {
      const newSupplier: Supplier = {
        ...supplier,
        id: Math.random().toString(36).substr(2, 9), // Temporary ID generation
      };
      setSuppliers(prev => [...prev, newSupplier]);
      setError(null);
    } catch (err) {
      setError('Failed to add supplier');
    } finally {
      setLoading(false);
    }
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setLoading(true);
    try {
      setSuppliers(prev =>
        prev.map(supplier =>
          supplier.id === id ? { ...supplier, ...updates } : supplier
        )
      );
      setError(null);
    } catch (err) {
      setError('Failed to update supplier');
    } finally {
      setLoading(false);
    }
  };

  const deleteSupplier = (id: string) => {
    setLoading(true);
    try {
      setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        getSupplierById,
        getSuppliersByProduct,
        getSuppliersByCategory,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        loading,
        error,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}; 