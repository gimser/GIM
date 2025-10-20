import { Product, ProductFormData, ProductStatus } from '../types';
import { supabase } from '../services/supabaseClient';

// --- Status computation (kept consistent with previous logic) ---
export const getStatus = (expDate: Date): ProductStatus => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiration = new Date(expDate);
  expiration.setHours(0, 0, 0, 0);
  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return ProductStatus.Expired;
  }
  if (diffDays <= 7) {
    return ProductStatus.Soon;
  }
  return ProductStatus.Fresh;
};

// --- DB Row mapping ---
type DBProductRow = {
  id: string;
  name: string;
  category: string | null;
  quantity: number | null;
  expiration_date: string | null; // ISO date (YYYY-MM-DD)
  location: string | null;
  status: string | null;
  image_url: string | null;
  // Optional columns if you extend schema for full feature parity
  barcode?: string | null;
  scanned_by?: string | null;
  created_at?: string | null;
};

const toIsoDate = (date: Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const mapRowToProduct = (row: DBProductRow): Product => {
  const expirationDate = row.expiration_date ? new Date(row.expiration_date) : new Date();
  const computedStatus = getStatus(expirationDate);
  const statusString = (row.status as ProductStatus | null) || computedStatus;

  // Coerce to valid ProductStatus; fallback to computed
  const validStatuses: Record<string, ProductStatus> = {
    [ProductStatus.Fresh]: ProductStatus.Fresh,
    [ProductStatus.Soon]: ProductStatus.Soon,
    [ProductStatus.Expired]: ProductStatus.Expired,
  };
  const status = validStatuses[statusString as string] || computedStatus;

  return {
    id: row.id,
    name: row.name,
    category: row.category ?? '',
    quantity: row.quantity ?? 0,
    expirationDate,
    location: row.location ?? '',
    status,
    photoUrl: row.image_url ?? undefined,
    barcode: (row as any).barcode ?? undefined,
    scannedBy: (row as any).scanned_by ?? 'Admin Manager',
  };
};

const maybeInclude = <T extends object>(obj: T, key: string, value: unknown): T => {
  if (value === undefined || value === null || value === '') return obj;
  return { ...(obj as any), [key]: value } as T;
};

// Upload data URL image to Supabase Storage bucket `product-images`
const uploadImageFromDataUrl = async (dataUrl: string, productId: string): Promise<string> => {
  const matches = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.*)$/);
  if (!matches) throw new Error('Invalid data URL');
  const contentType = matches[1];
  const base64 = matches[2];
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: contentType });

  const fileName = `images/${productId}_${Date.now()}.jpg`;
  const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, blob, {
    contentType: contentType || 'image/jpeg',
    upsert: false,
  });
  if (uploadError) throw uploadError;
  const { data: pub } = supabase.storage.from('product-images').getPublicUrl(fileName);
  return pub.publicUrl;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Error fetching products: ${error.message}`);
  const rows = (data || []) as DBProductRow[];
  return rows.map(mapRowToProduct);
};

export const addProduct = async (productData: ProductFormData): Promise<Product> => {
  const status = getStatus(productData.expirationDate);
  const payloadBase = {
    name: productData.name,
    category: productData.category,
    quantity: productData.quantity,
    expiration_date: toIsoDate(productData.expirationDate),
    location: productData.location,
    status,
  } as Record<string, unknown>;

  let payload = payloadBase;
  payload = maybeInclude(payload, 'image_url', undefined);
  payload = maybeInclude(payload, 'barcode', productData.barcode);
  payload = maybeInclude(payload, 'scanned_by', productData.scannedBy);

  // First attempt with all keys; if the DB lacks optional columns, retry without them
  let insertRes = await supabase.from('products').insert([payload]).select('*').single();
  if (insertRes.error) {
    const msg = insertRes.error.message.toLowerCase();
    const maybeMissingCols = msg.includes('column') && msg.includes('does not exist');
    if (maybeMissingCols) {
      const fallbackPayload = payloadBase; // drop optional keys
      insertRes = await supabase.from('products').insert([fallbackPayload]).select('*').single();
    }
  }
  if (insertRes.error || !insertRes.data) {
    throw new Error(`Error adding product: ${insertRes.error?.message ?? 'unknown error'}`);
  }
  return mapRowToProduct(insertRes.data as DBProductRow);
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
  const status = getStatus(updatedProduct.expirationDate);
  const payloadBase = {
    name: updatedProduct.name,
    category: updatedProduct.category,
    quantity: updatedProduct.quantity,
    expiration_date: toIsoDate(updatedProduct.expirationDate),
    location: updatedProduct.location,
    status,
  } as Record<string, unknown>;

  let imageUrl: string | undefined;
  if (updatedProduct.photoUrl && updatedProduct.photoUrl.startsWith('data:image')) {
    imageUrl = await uploadImageFromDataUrl(updatedProduct.photoUrl, updatedProduct.id);
  } else if (updatedProduct.photoUrl) {
    imageUrl = updatedProduct.photoUrl;
  }

  let payload = payloadBase;
  payload = maybeInclude(payload, 'image_url', imageUrl);
  payload = maybeInclude(payload, 'barcode', updatedProduct.barcode);
  payload = maybeInclude(payload, 'scanned_by', updatedProduct.scannedBy);

  let updateRes = await supabase
    .from('products')
    .update(payload)
    .eq('id', updatedProduct.id)
    .select('*')
    .single();

  if (updateRes.error) {
    const msg = updateRes.error.message.toLowerCase();
    const maybeMissingCols = msg.includes('column') && msg.includes('does not exist');
    if (maybeMissingCols) {
      const fallbackPayload = payloadBase;
      updateRes = await supabase
        .from('products')
        .update(fallbackPayload)
        .eq('id', updatedProduct.id)
        .select('*')
        .single();
    }
  }
  if (updateRes.error || !updateRes.data) {
    throw new Error(`Error updating product: ${updateRes.error?.message ?? 'unknown error'}`);
  }
  return mapRowToProduct(updateRes.data as DBProductRow);
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (error) throw new Error(`Error deleting product: ${error.message}`);
};