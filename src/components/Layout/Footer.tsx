import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Trust badges */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <Truck className="w-8 h-8 text-primary-500" />
              <div>
                <h3 className="font-semibold text-white">Free Shipping</h3>
                <p className="text-sm">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <Shield className="w-8 h-8 text-primary-500" />
              <div>
                <h3 className="font-semibold text-white">Secure Payment</h3>
                <p className="text-sm">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <CreditCard className="w-8 h-8 text-primary-500" />
              <div>
                <h3 className="font-semibold text-white">Easy Returns</h3>
                <p className="text-sm">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Tech<span className="text-accent-600">Bazaar</span></h2>
            <p className="mb-4">Premium e-commerce platform for the latest smartphones and laptops. Find the best tech at unbeatable prices.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Shop</Link></li>
              <li><Link to="/products?category=phones" className="hover:text-white transition">Smartphones</Link></li>
              <li><Link to="/products?category=laptops" className="hover:text-white transition">Laptops</Link></li>
              <li><Link to="/compare" className="hover:text-white transition">Compare Products</Link></li>
            </ul>
          </div>
          
          {/* Customer service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="hover:text-white transition">My Account</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition">Wishlist</Link></li>
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-primary-500" />
                <span>1234 Tech Street, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary-500" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary-500" />
                <span>support@techbazaar.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-neutral-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left">© 2025 TechBazaar. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <img src="https://via.placeholder.com/250x30" alt="Payment methods" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;