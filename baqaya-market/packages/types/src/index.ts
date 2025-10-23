export type UserRole = 'user' | 'vendor' | 'admin';

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: UserRole;
  ecoPoints: number;
  createdAt: string;
}

export interface Vendor {
  id: string;
  userId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  verified: boolean;
}

export type OfferStatus = 'active' | 'expired' | 'sold_out' | 'draft';

export interface Offer {
  id: string;
  vendorId: string;
  title: string;
  description: string | null;
  images: string[];
  originalPrice: number;
  discountedPrice: number;
  qty: number;
  expiresAt: string; // ISO string
  status: OfferStatus;
}

export type OrderStatus = 'created' | 'paid' | 'cancelled' | 'picked_up';

export interface Order {
  id: string;
  userId: string;
  offerId: string;
  qty: number;
  totalAmount: number;
  status: OrderStatus;
  pickupCode: string;
  createdAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  userId: string;
  rating: number; // 1-5
  comment: string | null;
  createdAt: string;
}
