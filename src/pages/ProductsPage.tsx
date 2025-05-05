import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { ShoppingCart, Heart, AlertCircle } from 'lucide-react';
import { Product } from '../types/product';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const { products, loading } = useProductContext();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');

  // Extract search parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    filterAndSortProducts(categoryParam, searchParam);
  }, [location.search, products]);

  // Get unique brands from products
  const brands = [...new Set(products.map(product => product.brand))];

  const filterAndSortProducts = (categoryParam?: string | null, searchParam?: string | null) => {
    let filtered = [...products];

    // Filter by category
    if (categoryParam) {
      filtered = filtered.filter(product => product.category === categoryParam);
    }

    // Filter by search query
    const search = searchParam || searchQuery;
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      product => {
        const price = product.discountPrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        // In a real app, you would sort by date
        // For this demo, we'll just use the default order
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured'
        // Default sorting, could be based on a featured flag in a real app
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterAndSortProducts();
  };

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 3000]);
    setSearchQuery('');
  };

  // Apply filters
  useEffect(() => {
    filterAndSortProducts();
  }, [priceRange, selectedBrands, sortOption]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity: 1
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-28 pb-20 md:pt-32 md:pb-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-lg"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Search</h4>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-9 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                    </div>
                  </form>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="text-xs text-neutral-500">Min</label>
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500">Max</label>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="3000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Brands</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="mr-2 rounded text-primary-600 focus:ring-primary-500"
                        />
                        {brand}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters - Mobile */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                className="fixed inset-0 bg-white z-50 md:hidden overflow-auto"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-xl flex items-center">
                      <SlidersHorizontal className="w-5 h-5 mr-2" />
                      Filters
                    </h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="divide-y">
                    <div className="py-4">
                      <h4 className="font-medium mb-3">Search</h4>
                      <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-9 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                        </div>
                      </form>
                    </div>
                    
                    <div className="py-4">
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <label className="text-xs text-neutral-500">Min</label>
                          <input
                            type="number"
                            min="0"
                            max={priceRange[1]}
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-neutral-500">Max</label>
                          <input
                            type="number"
                            min={priceRange[0]}
                            max="3000"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="py-4">
                      <h4 className="font-medium mb-3">Brands</h4>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <label key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => handleBrandChange(brand)}
                              className="mr-2 rounded text-primary-600 focus:ring-primary-500"
                            />
                            {brand}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <button
                      onClick={clearFilters}
                      className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="bg-primary-700 text-white px-4 py-2 rounded-lg"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-neutral-600">
                  Showing <span className="font-medium">{filteredProducts.length}</span> products
                </p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-neutral-600">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-neutral-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-neutral-200 animate-pulse h-80 rounded-lg"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const minimumOrderQuantity = product.price < 100 ? 100 : 50;
                  
                  return (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-contain p-4"
                        />
                      </Link>
                      
                      <div className="p-4">
                        <Link to={`/products/${product.id}`} className="block">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                        </Link>
                        
                        <div className="flex items-center text-yellow-600 mb-2">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Min. Order: {minimumOrderQuantity} pcs</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">per unit</span>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <ShoppingCart className="inline-block mr-2" />
                            Add to Cart
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                              } else {
                                addToWishlist(product);
                              }
                            }}
                            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            <Heart className="inline-block" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;