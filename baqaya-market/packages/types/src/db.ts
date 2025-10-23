export type Role = 'user' | 'vendor' | 'admin';

export interface DBUser {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: Role;
  eco_points: number;
  created_at: string;
}

export interface DBVendor {
  id: string;
  user_id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  verified: boolean;
}

export interface DBOffer {
  id: string;
  vendor_id: string;
  title: string;
  description: string | null;
  images: string[] | null;
  original_price: number;
  discounted_price: number;
  qty: number;
  expires_at: string;
  status: 'active' | 'expired' | 'soldout';
}

export interface DBOrder {
  id: string;
  user_id: string;
  offer_id: string;
  qty: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  pickup_code: string;
  created_at: string;
}

export interface DBReview {
  id: string;
  order_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}
