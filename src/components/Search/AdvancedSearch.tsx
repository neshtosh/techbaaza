import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useProductContext } from '../../context/ProductContext';
import { Product } from '../../types/product';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  image: string;
}

const AdvancedSearch: React.FC = () => {
  const { products } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'phone', label: 'Smartphones' },
    { value: 'laptop', label: 'Laptops' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = products
        .filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
          const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
          return matchesSearch && matchesCategory && matchesPrice;
        })
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.images[0]
        }))
        .slice(0, 5);

      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm, products, selectedCategory, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search submitted:', { searchTerm, selectedCategory, priceRange });
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products, suppliers, categories..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>
        
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        </button>

        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Search
        </button>
      </form>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-24 px-2 py-1 border border-gray-300 rounded"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-24 px-2 py-1 border border-gray-300 rounded"
                placeholder="Max"
              />
            </div>
          </div>
          {/* Add more filters here */}
        </div>
      )}

      {showResults && searchResults.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10">
          {searchResults.map(result => (
            <a
              key={result.id}
              href={`/products/${result.id}`}
              className="flex items-center p-3 hover:bg-gray-50"
            >
              <img
                src={result.image}
                alt={result.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{result.name}</div>
                <div className="text-xs text-gray-500 capitalize">{result.category}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch; 