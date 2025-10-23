export type Role = 'user' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: Role;
  eco_points: number;
  created_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  verified: boolean;
}

export interface Offer {
  id: string;
  vendor_id: string;
  title: string;
  description: string | null;
  images: string[];
  original_price: number;
  discounted_price: number;
  qty: number;
  expires_at: string;
  status: 'active' | 'expired' | 'sold_out';
}

export interface Order {
  id: string;
  user_id: string;
  offer_id: string;
  qty: number;
  total_amount: number;
  status: 'pending' | 'paid' | 'picked_up' | 'cancelled';
  pickup_code: string;
  created_at: string;
}

export interface Review {
  id: string;
  order_id: string;
  user_id: string;
  rating: number; // 1-5
  comment: string | null;
  created_at: string;
}
