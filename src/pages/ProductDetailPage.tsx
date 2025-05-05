import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, BarChart, Check, ChevronRight, Star, Truck, ArrowLeft } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useCompare } from '../hooks/useCompare';
import ProductCard from '../components/Product/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, fetchProductById, loading } = useProductContext();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  
  const [product, setProduct] = useState(fetchProductById(productId || ''));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [error, setError] = useState<string | null>(null);
  
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Find related products (same category)
  const relatedProducts = products
    .filter(p => p.id !== productId && p.category === product?.category)
    .slice(0, 4);
  
  // Set the product when it changes
  useEffect(() => {
    if (productId) {
      const fetchedProduct = fetchProductById(productId);
      setProduct(fetchedProduct);
      
      // Set default color if product has colors
      if (fetchedProduct?.colors && fetchedProduct.colors.length > 0) {
        setSelectedColor(fetchedProduct.colors[0]);
      }
    }
  }, [productId, fetchProductById]);
  
  // Handle wishlist toggle
  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  // Handle compare toggle
  const handleToggleCompare = () => {
    if (!product) return;
    
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    const minimumOrderQuantity = product.price < 100 ? 100 : 50;
    if (quantity < minimumOrderQuantity) {
      setError(`Minimum order quantity is ${minimumOrderQuantity} pieces for this product`);
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity,
      color: selectedColor
    });
    setError(null);
  };
  
  // Quantity controls
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    
    const minimumOrderQuantity = product.price < 100 ? 100 : 50;
    if (newQuantity < minimumOrderQuantity) {
      setError(`Minimum order quantity is ${minimumOrderQuantity} pieces for this product`);
    } else {
      setError(null);
    }
  };
  
  if (loading) {
    return (
      <div className="pt-28 pb-20 px-4 container mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/4 mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-96 bg-neutral-200 rounded-xl"></div>
              <div className="flex mt-4 gap-2">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="h-20 w-20 bg-neutral-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
              <div className="h-24 bg-neutral-200 rounded mb-6"></div>
              <div className="h-10 bg-neutral-200 rounded w-1/3 mb-6"></div>
              <div className="h-12 bg-neutral-200 rounded mb-6"></div>
              <div className="h-12 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-28 pb-20 px-4 container mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="text-neutral-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const minimumOrderQuantity = product.price < 100 ? 100 : 50;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center text-sm">
          <Link to="/" className="text-neutral-500 hover:text-primary-700">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2 text-neutral-400" />
          <Link to="/products" className="text-neutral-500 hover:text-primary-700">Products</Link>
          <ChevronRight className="w-3 h-3 mx-2 text-neutral-400" />
          <Link to={`/products?category=${product.category}`} className="text-neutral-500 hover:text-primary-700">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight className="w-3 h-3 mx-2 text-neutral-400" />
          <span className="text-neutral-800 font-medium">{product.name}</span>
        </nav>
        
        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="overflow-hidden rounded-xl mb-4 bg-neutral-100">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-auto object-contain aspect-square"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden flex-shrink-0 ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <motion.div 
              ref={infoRef}
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <div className="mb-2">
                <Link to={`/products?brand=${product.brand}`} className="text-primary-700 text-sm font-medium">
                  {product.brand}
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600 ml-2">{product.rating} ({product.reviews} reviews)</span>
              </div>
              
              {/* Description */}
              <p className="text-neutral-700 mb-6">{product.description}</p>
              
              {/* Price */}
              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-neutral-900">${product.discountPrice}</span>
                    <span className="text-xl text-neutral-500 line-through ml-3">${product.price}</span>
                    <span className="ml-3 bg-accent-100 text-accent-800 px-2 py-1 rounded text-sm font-medium">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-neutral-900">${product.price}</span>
                )}
              </div>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Color: <span className="font-normal">{selectedColor}</span></h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedColor === color 
                            ? 'border-primary-500 bg-primary-50 text-primary-700' 
                            : 'border-neutral-300 hover:border-primary-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={minimumOrderQuantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 h-10 border-t border-b border-neutral-300 text-center"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <Check className="w-5 h-5 mr-1" />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="text-red-600">Out of Stock</div>
                )}
                <div className="ml-6 flex items-center text-neutral-600">
                  <Truck className="w-5 h-5 mr-1" />
                  <span>Free shipping</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || quantity < minimumOrderQuantity}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg ${
                    product.inStock 
                      ? 'bg-primary-700 hover:bg-primary-800 text-white' 
                      : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg ${
                    isInWishlist(product.id)
                      ? 'bg-accent-100 text-accent-700 border border-accent-300'
                      : 'bg-white border border-neutral-300 text-neutral-700 hover:text-accent-700 hover:border-accent-300'
                  } transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-accent-700' : ''}`} />
                </button>
                <button
                  onClick={handleToggleCompare}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg ${
                    isInCompare(product.id)
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-white border border-neutral-300 text-neutral-700 hover:text-primary-700 hover:border-primary-300'
                  } transition-colors`}
                >
                  <BarChart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Tabs */}
          <div className="mt-12">
            <div className="border-b border-neutral-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'description'
                      ? 'border-primary-700 text-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'specifications'
                      ? 'border-primary-700 text-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-primary-700 text-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            <div className="py-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-neutral-700 mb-4">{product.description}</p>
                  
                  <h4 className="text-lg font-medium mt-6 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-primary-700 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <tr key={key} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                            <td className="py-3 px-4 font-medium text-neutral-700 w-1/3 capitalize">{key}</td>
                            <td className="py-3 px-4 text-neutral-600">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <button className="bg-primary-100 text-primary-700 hover:bg-primary-200 px-4 py-2 rounded-lg font-medium transition-colors">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-neutral-600 ml-2">Based on {product.reviews} reviews</span>
                    </div>
                    
                    {/* For demo purposes, showing placeholder reviews */}
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 ${i < 5 ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-neutral-500 ml-2">5.0</span>
                        </div>
                        <h4 className="font-medium mb-2">Great product, exceeded expectations!</h4>
                        <p className="text-neutral-600 text-sm mb-2">
                          I've been using this for about a month now and it's been fantastic. The build quality is excellent and performance is top-notch.
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">John D.</span>
                          <span className="text-xs text-neutral-500 ml-4">3 weeks ago</span>
                        </div>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-neutral-500 ml-2">4.0</span>
                        </div>
                        <h4 className="font-medium mb-2">Very good value for money</h4>
                        <p className="text-neutral-600 text-sm mb-2">
                          For the price point, this offers a lot of features. Battery life is impressive and the display is crisp and clear.
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">Sarah M.</span>
                          <span className="text-xs text-neutral-500 ml-4">1 month ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full border border-neutral-300 hover:border-primary-500 text-neutral-700 hover:text-primary-700 py-2 rounded-lg transition-colors">
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link 
                to={`/products?category=${product.category}`} 
                className="text-primary-700 hover:text-primary-800 font-medium inline-flex items-center"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;