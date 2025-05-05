import React from 'react';
import { useCompare } from '../hooks/useCompare';
import { useProduct } from '../hooks/useProduct';

const ComparePage: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { getProduct } = useProduct();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Compare Products</h1>
      
      {compareItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">You have no items to compare.</p>
          <a href="/products" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            Browse Products
          </a>
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-4">
            <button 
              onClick={clearCompare}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-6 text-left">Product</th>
                  <th className="py-4 px-6 text-left">Price</th>
                  <th className="py-4 px-6 text-left">Rating</th>
                  <th className="py-4 px-6 text-left">Description</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {compareItems.map((itemId) => {
                  const product = getProduct(itemId);
                  return product ? (
                    <tr key={product.id} className="border-t border-gray-200">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 object-cover mr-4"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {product.rating}
                          <span className="text-yellow-400 ml-1">★</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{product.description.substring(0, 100)}...</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;