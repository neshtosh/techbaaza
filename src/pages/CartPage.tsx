import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaExclamationCircle } from 'react-icons/fa';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [error, setError] = useState<string | null>(null);
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    try {
      updateQuantity(id, newQuantity);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/products" className="flex items-center text-primary-700 hover:text-primary-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {items.map((item: CartItem) => {
              const minimumOrderQuantity = item.price < 100 ? 100 : 50;
              
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <FaExclamationCircle className="text-yellow-500 mr-2" />
                        <span className="text-sm text-gray-600">
                          Minimum order: {minimumOrderQuantity} pieces
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min={minimumOrderQuantity}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-20 px-2 py-1 border rounded mr-4"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">
                    {totalPrice > 100 ? 'Free' : '$10.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">
                    ${(totalPrice + (totalPrice > 100 ? 0 : 10) + totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;