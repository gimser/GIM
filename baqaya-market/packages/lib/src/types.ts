export type Role = 'user' | 'vendor' | 'admin';

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: Role;
  eco_points: number;
  created_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
  verified: boolean;
}

export interface Offer {
  id: string;
  vendor_id: string;
  title: string;
  description?: string;
  images?: string[];
  original_price: number;
  discounted_price: number;
  qty: number;
  expires_at: string;
  status: 'active' | 'expired' | 'soldout';
}

export interface Order {
  id: string;
  user_id: string;
  offer_id: string;
  qty: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  pickup_code: string;
  created_at: string;
}

export interface Review {
  id: string;
  order_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}
