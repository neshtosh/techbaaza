import { Product } from '../types/product';

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Apple\'s most advanced iPhone with powerful camera system and A17 Pro chip.',
    price: 999,
    rating: 4.8,
    reviews: 127,
    category: 'phones',
    brand: 'Apple',
    inStock: true,
    images: [
      'https://images.pexels.com/photos/18996524/pexels-photo-18996524/free-photo-of-iphone-15-pro-titanium-blue.jpeg',
      'https://images.pexels.com/photos/18996526/pexels-photo-18996526/free-photo-of-iphone-15-pro-titanium-blue.jpeg',
    ],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    specifications: {
      display: '6.1" Super Retina XDR display',
      chip: 'A17 Pro chip',
      camera: '48MP main camera',
      battery: 'Up to 23 hours video playback',
      storage: '256GB',
      os: 'iOS 17'
    },
    features: [
      'Dynamic Island',
      'Always-On display',
      'ProMotion technology',
      'Ceramic Shield front',
      'Titanium design',
      'Water resistant (IP68)'
    ]
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The ultimate Galaxy AI phone with powerful camera and S Pen included.',
    price: 1199,
    discountPrice: 1099,
    rating: 4.7,
    reviews: 94,
    category: 'phones',
    brand: 'Samsung',
    inStock: true,
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
      'https://images.pexels.com/photos/13588627/pexels-photo-13588627.jpeg',
    ],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    specifications: {
      display: '6.8" Dynamic AMOLED 2X display',
      chip: 'Snapdragon 8 Gen 3',
      camera: '200MP main camera',
      battery: '5,000 mAh',
      storage: '256GB',
      os: 'Android 14'
    },
    features: [
      'S Pen included',
      'AI-powered camera features',
      'Armor Aluminum frame',
      '120Hz adaptive refresh rate',
      'Ray tracing for gaming',
      'IP68 water resistance'
    ]
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    description: 'Google\'s flagship phone with the most advanced Pixel camera and AI capabilities.',
    price: 999,
    discountPrice: 899,
    rating: 4.6,
    reviews: 82,
    category: 'phones',
    brand: 'Google',
    inStock: true,
    images: [
      'https://images.pexels.com/photos/16814428/pexels-photo-16814428/free-photo-of-google-pixel-7-pro-in-obsidian.jpeg',
      'https://images.pexels.com/photos/13598468/pexels-photo-13598468.jpeg',
    ],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    specifications: {
      display: '6.7" Super Actua display',
      chip: 'Google Tensor G3',
      camera: '50MP Octa PD wide camera',
      battery: '5,050 mAh',
      storage: '128GB',
      os: 'Android 14'
    },
    features: [
      'Google AI',
      'Magic Editor',
      'Call Screen',
      'Adaptive Battery',
      'Live Translate',
      'IP68 water resistance'
    ]
  },
  {
    id: '4',
    name: 'MacBook Pro 16"',
    description: 'Supercharged by M3 Pro and M3 Max. The most powerful MacBook Pro ever.',
    price: 2499,
    rating: 4.9,
    reviews: 67,
    category: 'laptops',
    brand: 'Apple',
    inStock: true,
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
    ],
    colors: ['Space Black', 'Silver'],
    specifications: {
      display: '16.2" Liquid Retina XDR display',
      chip: 'M3 Pro or M3 Max chip',
      memory: 'Up to 128GB unified memory',
      storage: 'Up to 8TB SSD storage',
      battery: 'Up to 22 hours',
      ports: 'Thunderbolt 4, HDMI, SDXC'
    },
    features: [
      'Liquid Retina XDR display',
      'Up to 38-core GPU',
      'High-fidelity six-speaker sound system',
      'Studio-quality mic array',
      'Magic Keyboard with Touch ID',
      'Force Touch trackpad'
    ]
  },
  {
    id: '5',
    name: 'Dell XPS 15',
    description: 'Premium 15-inch laptop with InfinityEdge display and powerful performance.',
    price: 1899,
    discountPrice: 1799,
    rating: 4.6,
    reviews: 54,
    category: 'laptops',
    brand: 'Dell',
    inStock: true,
    images: [
      'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg',
    ],
    colors: ['Platinum Silver with Black Carbon Fiber', 'Frost with Arctic White'],
    specifications: {
      display: '15.6" 4K UHD+ display',
      processor: '13th Gen Intel Core i9',
      graphics: 'NVIDIA GeForce RTX 4070',
      memory: '32GB DDR5',
      storage: '1TB SSD',
      battery: 'Up to 12 hours'
    },
    features: [
      'InfinityEdge display',
      'CNC machined aluminum',
      'Quad-speaker design',
      'Killer Wi-Fi 6E',
      'Advanced thermal design',
      'HD webcam with Windows Hello'
    ]
  },
  {
    id: '6',
    name: 'ASUS ROG Zephyrus G14',
    description: 'Ultra-slim gaming laptop with powerful AMD processor and NVIDIA graphics.',
    price: 1649,
    rating: 4.7,
    reviews: 48,
    category: 'laptops',
    brand: 'ASUS',
    inStock: true,
    images: [
      'https://images.pexels.com/photos/7974/pexels-photo.jpg',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
    ],
    colors: ['Eclipse Gray', 'Moonlight White'],
    specifications: {
      display: '14" QHD 165Hz display',
      processor: 'AMD Ryzen 9 7940HS',
      graphics: 'NVIDIA GeForce RTX 4070',
      memory: '16GB DDR5',
      storage: '1TB SSD',
      battery: 'Up to 10 hours'
    },
    features: [
      'AniMe Matrix™ LED display',
      'Dolby Atmos sound system',
      'RGB keyboard',
      'Intelligent cooling',
      'ROG Nebula Display',
      'Wi-Fi 6E'
    ]
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 800);
  });
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id);
      resolve(product);
    }, 500);
  });
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(p => p.category === category);
      resolve(filteredProducts);
    }, 500);
  });
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchResults = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      );
      resolve(searchResults);
    }, 500);
  });
};