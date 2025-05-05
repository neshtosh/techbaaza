import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, User, X, ChevronDown, Smartphone, Laptop } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();
  const { items: cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-950">Tech<span className="text-accent-700">Bazaar</span></span>
          </Link>

          {/* Navigation - Desktop Only */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-neutral-800 hover:text-primary-700 transition">Home</Link>
            
            <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
              <button className="flex items-center font-medium text-neutral-800 hover:text-primary-700 transition">
                Categories <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-64 py-2 z-20"
                  >
                    <Link to="/products?category=phones" className="flex items-center px-4 py-2 hover:bg-neutral-100">
                      <Smartphone className="w-5 h-5 mr-2 text-primary-600" />
                      <span>Smartphones</span>
                    </Link>
                    <Link to="/products?category=laptops" className="flex items-center px-4 py-2 hover:bg-neutral-100">
                      <Laptop className="w-5 h-5 mr-2 text-primary-600" />
                      <span>Laptops</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link to="/products" className="font-medium text-neutral-800 hover:text-primary-700 transition">All Products</Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-4 text-neutral-500 hover:text-primary-700">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative text-neutral-700 hover:text-primary-700 transition">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-neutral-700 hover:text-primary-700 transition">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to={user ? "/account" : "/login"} className="text-neutral-700 hover:text-primary-700 transition">
              <User className="w-6 h-6" />
            </Link>
            <button 
              className="md:hidden text-neutral-700 hover:text-primary-700 transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <span className="text-2xl font-bold text-primary-950">Tech<span className="text-accent-700">Bazaar</span></span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4">
                <form onSubmit={handleSearch} className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button type="submit" className="absolute right-0 top-0 h-full px-4 text-neutral-500 hover:text-primary-700">
                    <Search className="w-5 h-5" />
                  </button>
                </form>
                
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/" 
                    className="font-medium text-neutral-800 hover:text-primary-700 transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <div className="border-b pb-2">
                    <h3 className="font-medium text-neutral-800 mb-2">Categories</h3>
                    <Link 
                      to="/products?category=phones" 
                      className="flex items-center py-2 pl-4 text-neutral-700 hover:text-primary-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Smartphone className="w-5 h-5 mr-2" />
                      <span>Smartphones</span>
                    </Link>
                    <Link 
                      to="/products?category=laptops" 
                      className="flex items-center py-2 pl-4 text-neutral-700 hover:text-primary-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Laptop className="w-5 h-5 mr-2" />
                      <span>Laptops</span>
                    </Link>
                  </div>
                  <Link 
                    to="/products" 
                    className="font-medium text-neutral-800 hover:text-primary-700 transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="font-medium text-neutral-800 hover:text-primary-700 transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link 
                    to="/cart" 
                    className="font-medium text-neutral-800 hover:text-primary-700 transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <Link 
                    to={user ? "/account" : "/login"} 
                    className="font-medium text-neutral-800 hover:text-primary-700 transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {user ? "My Account" : "Login / Register"}
                  </Link>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;