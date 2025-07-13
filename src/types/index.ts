export interface User {
  id: string;
  name: string;
  email: string;
  type: 'farmer' | 'buyer';
  location: string;
  avatar?: string;
  verified: boolean;
  rating: number;
  createdAt: string;
}

export interface Farmer extends User {
  type: 'farmer';
  farmName: string;
  farmSize: string;
  certifications: string[];
  farmingMethods: string[];
  specialties: string[];
  description: string;
}

export interface Buyer extends User {
  type: 'buyer';
  businessType: 'retail' | 'wholesale';
  companyName?: string;
  purchasePreferences: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  images: string[];
  farmerId: string;
  farmer: Farmer;
  quality: 'Premium' | 'Standard' | 'Organic';
  harvestDate: string;
  expiryDate: string;
  availability: 'In Stock' | 'Out of Stock' | 'Seasonal';
  seasonal: boolean;
  location: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  currency: string;
  createdAt: string;
  deliveryDate?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  productId: string;
  buyerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}