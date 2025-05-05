import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';

const MobileMenu: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 py-2 md:hidden z-40">
      <div className="grid grid-cols-4">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center py-1 ${
            location.pathname === '/' ? 'text-primary-700' : 'text-neutral-600'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link 
          to="/products" 
          className={`flex flex-col items-center justify-center py-1 ${
            location.pathname === '/products' ? 'text-primary-700' : 'text-neutral-600'
          }`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs mt-1">Shop</span>
        </Link>
        <Link 
          to="/wishlist" 
          className={`flex flex-col items-center justify-center py-1 ${
            location.pathname === '/wishlist' ? 'text-primary-700' : 'text-neutral-600'
          }`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">Wishlist</span>
        </Link>
        <Link 
          to="/account" 
          className={`flex flex-col items-center justify-center py-1 ${
            location.pathname === '/account' ? 'text-primary-700' : 'text-neutral-600'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;