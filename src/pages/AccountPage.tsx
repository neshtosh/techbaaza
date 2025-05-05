import React from 'react';
import useAuth from '../hooks/useAuth';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Account</h1>
          <p className="text-gray-600 mb-4">Please log in to view your account details.</p>
          <a 
            href="/login" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Account Details</h2>
              {user && (
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {user.name || 'Not provided'}</p>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Order History</h2>
              <p className="text-gray-600">You have no orders yet.</p>
              <a href="/products" className="mt-3 text-sm text-blue-600 hover:text-blue-800 block">
                Browse Products
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Saved Addresses</h2>
              <p className="text-gray-600">No addresses saved yet.</p>
              <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                Add New Address
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Actions</h2>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
              Sign Out
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;