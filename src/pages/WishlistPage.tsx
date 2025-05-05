import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import { ShoppingCart, Trash2 } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();
  const navigate = useNavigate();
  
  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative border border-gray-200 rounded-lg overflow-hidden group">
              <ProductCard product={item} />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 size={18} className="mr-1" /> Remove
                </button>
                <button
                  onClick={() => moveToCart(item.id)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <ShoppingCart size={18} className="mr-1" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;