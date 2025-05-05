import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Product } from '../types/product';
import { fetchProducts } from '../services/productService';

interface ProductContextProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProductById: (id: string) => Product | undefined;
  filterProducts: (category?: string, search?: string) => Product[];
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const fetchProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const filterProducts = (category?: string, search?: string) => {
    return products.filter(product => {
      const matchesCategory = !category || product.category === category;
      const matchesSearch = !search || 
        product.name.toLowerCase().includes(search.toLowerCase()) || 
        product.description.toLowerCase().includes(search.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProductById,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};