import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, BarChart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useCompare } from '../../hooks/useCompare';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity: 1
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden h-56">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button 
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full ${
                isInWishlist(product.id) 
                  ? 'bg-accent-500 text-white' 
                  : 'bg-white text-neutral-700 hover:bg-accent-500 hover:text-white'
              } shadow-md transition-colors duration-300`}
            >
              <Heart className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleToggleCompare}
              className={`p-2 rounded-full ${
                isInCompare(product.id) 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-neutral-700 hover:bg-primary-500 hover:text-white'
              } shadow-md transition-colors duration-300`}
            >
              <BarChart className="w-5 h-5" />
            </button>
          </div>
          
          {/* Discount badge */}
          {product.discountPrice && (
            <div className="absolute top-2 left-2 bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4">
          {/* Brand */}
          <div className="text-xs text-neutral-500 mb-1">{product.brand}</div>
          
          {/* Product name */}
          <h3 className="font-semibold mb-1 transition-colors duration-300 group-hover:text-primary-700">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-neutral-300'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-neutral-500 ml-1">({product.reviews})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between mt-4">
            <div>
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-neutral-900">${product.discountPrice}</span>
                  <span className="text-sm text-neutral-500 line-through ml-2">${product.price}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-neutral-900">${product.price}</span>
              )}
            </div>
            
            {/* Add to cart button */}
            <button 
              onClick={handleAddToCart}
              className="bg-primary-100 hover:bg-primary-700 hover:text-white text-primary-700 p-2 rounded-full transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;