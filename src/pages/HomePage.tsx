import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { motion } from 'framer-motion';
import { ChevronRight, Truck, Shield, Award } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';

const HomePage: React.FC = () => {
  const { products } = useProductContext();
  
  // Get products by category
  const phoneProducts = products.filter(product => product.category === 'phone');
  const laptopProducts = products.filter(product => product.category === 'laptop');
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-28 pb-16 md:pt-32 md:pb-20 px-4"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 mb-6"
              >
                Find Your Perfect <span className="text-primary-700">Tech</span> Match
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-neutral-600 mb-8 max-w-lg"
              >
                Discover premium smartphones and laptops at unbeatable prices. The latest tech, delivered to your doorstep.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/products?category=phones" className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 text-center">
                  Shop Smartphones
                </Link>
                <Link to="/products?category=laptops" className="bg-white border border-neutral-300 hover:border-primary-700 text-neutral-800 hover:text-primary-700 px-8 py-3 rounded-lg font-medium transition-colors duration-300 text-center">
                  Shop Laptops
                </Link>
              </motion.div>
            </div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="md:w-1/2"
            >
              <img 
                src="https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg" 
                alt="Latest tech devices" 
                className="rounded-xl w-full shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Categories */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-neutral-100"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative overflow-hidden group rounded-xl shadow-lg h-72"
            >
              <img 
                src="https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg" 
                alt="Smartphones" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Smartphones</h3>
                <p className="text-white mb-4 opacity-90">The latest models from Apple, Samsung, Google and more</p>
                <Link 
                  to="/products?category=phones" 
                  className="inline-flex items-center text-white bg-accent-700 hover:bg-accent-800 py-2 px-4 rounded-lg w-fit transition-colors duration-300"
                >
                  Shop Now <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative overflow-hidden group rounded-xl shadow-lg h-72"
            >
              <img 
                src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg" 
                alt="Laptops" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Laptops</h3>
                <p className="text-white mb-4 opacity-90">Powerful machines for work, gaming and creativity</p>
                <Link 
                  to="/products?category=laptops" 
                  className="inline-flex items-center text-white bg-accent-700 hover:bg-accent-800 py-2 px-4 rounded-lg w-fit transition-colors duration-300"
                >
                  Shop Now <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Smartphones</h2>
            <Link 
              to="/products?category=phones" 
              className="text-primary-700 hover:text-primary-800 font-medium inline-flex items-center"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phoneProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 mb-10 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Featured Laptops</h2>
            <Link 
              to="/products?category=laptops" 
              className="text-primary-700 hover:text-primary-800 font-medium inline-flex items-center"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {laptopProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trust Badges */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="bg-primary-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6">
                <Truck className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast & Free Shipping</h3>
              <p className="text-neutral-600">Free delivery on all orders over $100. Same-day dispatch on orders placed before 2pm.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="bg-primary-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6">
                <Shield className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">100% Secure Checkout</h3>
              <p className="text-neutral-600">We ensure your data is protected with the highest security standards and encryption.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="bg-primary-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6">
                <Award className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2-Year Warranty</h3>
              <p className="text-neutral-600">All our products come with a minimum 2-year warranty and 30-day money back guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary-900 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
              <p className="text-primary-100 mb-8">Subscribe to get exclusive offers, early access to new products, and tech tips delivered to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button 
                  type="submit"
                  className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-primary-300 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;