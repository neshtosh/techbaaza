export interface Supplier {
  id: string;
  name: string;
  logo: string;
  description: string;
  location: string;
  mainProducts: string[];
  certifications: string[];
  responseTime: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  productionCapacity: string;
  yearEstablished: number;
  businessType: 'Manufacturer' | 'Trading Company' | 'Distributor' | 'Other';
  employees: string;
  annualRevenue: string;
  contact: {
    name: string;
    position: string;
    email: string;
    phone: string;
    address: string;
    website?: string;
  };
  socialMedia?: {
    website?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
} 