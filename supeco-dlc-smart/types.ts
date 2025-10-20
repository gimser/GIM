export enum ProductStatus {
  Fresh = 'Fresh',
  Soon = 'Expiring Soon',
  Expired = 'Expired',
}

export interface Product {
  id: string;
  barcode?: string;
  name: string;
  category: string;
  expirationDate: Date;
  quantity: number;
  location: string; // e.g., "Aisle 5", "Fridge 2"
  status: ProductStatus;
  scannedBy: string;
  photoUrl?: string;
}

// Represents the data structure for the product form
export type ProductFormData = Omit<Product, 'id' | 'status' | 'photoUrl'>;


export enum AISuggestionType {
    PROMOTION = 'promotion',
    ORDER = 'order',
    WASTE = 'waste',
    SHORTAGE = 'shortage'
}

export interface AISuggestion {
  type: AISuggestionType;
  title: string;
  recommendation: string;
}