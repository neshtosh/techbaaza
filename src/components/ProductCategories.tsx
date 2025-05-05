import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Tablet, 
  Camera, 
  Speaker, 
  Gamepad2,
  Printer,
  Monitor,
  Keyboard,
  Mouse
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  path: string;
}

const categories: Category[] = [
  { id: 'phones', name: 'Smartphones', icon: <Smartphone className="w-6 h-6" />, count: 1200, path: '/products?category=phones' },
  { id: 'laptops', name: 'Laptops', icon: <Laptop className="w-6 h-6" />, count: 850, path: '/products?category=laptops' },
  { id: 'headphones', name: 'Headphones', icon: <Headphones className="w-6 h-6" />, count: 650, path: '/products?category=headphones' },
  { id: 'smartwatches', name: 'Smart Watches', icon: <Watch className="w-6 h-6" />, count: 450, path: '/products?category=smartwatches' },
  { id: 'tablets', name: 'Tablets', icon: <Tablet className="w-6 h-6" />, count: 300, path: '/products?category=tablets' },
  { id: 'cameras', name: 'Cameras', icon: <Camera className="w-6 h-6" />, count: 250, path: '/products?category=cameras' },
  { id: 'speakers', name: 'Speakers', icon: <Speaker className="w-6 h-6" />, count: 400, path: '/products?category=speakers' },
  { id: 'gaming', name: 'Gaming', icon: <Gamepad2 className="w-6 h-6" />, count: 350, path: '/products?category=gaming' },
  { id: 'printers', name: 'Printers', icon: <Printer className="w-6 h-6" />, count: 200, path: '/products?category=printers' },
  { id: 'monitors', name: 'Monitors', icon: <Monitor className="w-6 h-6" />, count: 300, path: '/products?category=monitors' },
  { id: 'keyboards', name: 'Keyboards', icon: <Keyboard className="w-6 h-6" />, count: 250, path: '/products?category=keyboards' },
  { id: 'mice', name: 'Mice', icon: <Mouse className="w-6 h-6" />, count: 200, path: '/products?category=mice' },
];

const ProductCategories: React.FC = () => {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Product Categories</h2>
          <p className="text-neutral-600">Browse our wide range of electronic products</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors duration-300">
                {category.icon}
              </div>
              <h3 className="font-medium text-neutral-900 mb-1 group-hover:text-primary-700 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm text-neutral-500">
                {category.count.toLocaleString()} products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories; 