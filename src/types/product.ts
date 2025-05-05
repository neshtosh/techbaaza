export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviews: number;
  category: 'phone' | 'laptop';
  brand: string;
  inStock: boolean;
  images: string[];
  colors?: string[];
  specifications: {
    brand: string;
    model: string;
    processor?: string;
    ram?: string;
    storage?: string;
    screenSize?: string;
    battery?: string;
    camera?: string;
  };
  stock: number;
  minimumOrderQuantity: number;
  shippingTime: string;
  warranty: string;
  origin: string;
  features: string[];
}