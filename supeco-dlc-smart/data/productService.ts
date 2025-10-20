import { Product, ProductFormData, ProductStatus } from '../types';

const DB_NAME = 'supeco_db';
const DB_VERSION = 1;
const STORE_NAME = 'products';

// --- Logic from sampleData.ts, integrated here for initial seeding ---
const productNames = [
  // Dairy
  { name: 'Milk 1L', category: 'Dairy' },
  { name: 'Yogurt Nature', category: 'Dairy' },
  { name: 'Cheddar Cheese 200g', category: 'Dairy' },
  { name: 'Butter 250g', category: 'Dairy' },
  // Meat & Fish
  { name: 'Chicken Breast 500g', category: 'Meat & Fish' },
  { name: 'Salmon Fillet', category: 'Meat & Fish' },
  { name: 'Ground Beef 1kg', category: 'Meat & Fish' },
  // Bakery
  { name: 'Whole Wheat Bread', category: 'Bakery' },
  { name: 'Croissants (x4)', category: 'Bakery' },
  // Produce
  { name: 'Organic Bananas', category: 'Produce' },
  { name: 'Tomatoes 1kg', category: 'Produce' },
  { name: 'Lettuce Head', category: 'Produce' },
  // Packaged Goods
  { name: 'Pasta 500g', category: 'Packaged Goods' },
  { name: 'Canned Tuna', category: 'Packaged Goods' },
  { name: 'Olive Oil 750ml', category: 'Packaged Goods' },
];

const locations = ['Aisle 1', 'Aisle 2', 'Aisle 3', 'Fridge 1', 'Fridge 2', 'Freezer A', 'Bakery Section', 'Produce Section'];
const employees = ['Jean Dupont', 'Amina Benali', 'John Smith', 'Fatima Zahra'];

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

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

const generateSampleData = (count: number): Product[] => {
  const data: Product[] = [];
  for (let i = 0; i < count; i++) {
    const baseProduct = getRandom(productNames);
    const dateOffset = Math.floor(Math.random() * 60) - 15; // -15 to +44 days from now
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + dateOffset);

    const product: Product = {
      id: `prod_sample_${i + 1}`,
      barcode: `0000${i + 1}`.slice(-5) + `0000${Math.floor(Math.random() * 99999)}`.slice(-5),
      name: baseProduct.name,
      category: baseProduct.category,
      expirationDate,
      quantity: Math.floor(Math.random() * 100) + 1,
      location: getRandom(locations),
      status: getStatus(expirationDate),
      scannedBy: getRandom(employees),
      photoUrl: `https://picsum.photos/seed/${i+1}/200/200`,
    };
    data.push(product);
  }
  return data;
};
// --- End of integrated logic ---

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('name', 'name', { unique: false });
                store.createIndex('category', 'category', { unique: false });
                store.createIndex('expirationDate', 'expirationDate', { unique: false });
                
                const sampleData = generateSampleData(30);
                sampleData.forEach(product => {
                    store.add(product);
                });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject('IndexedDB error: ' + (event.target as IDBOpenDBRequest).error);
        };
    });
};

export const getProducts = async (): Promise<Product[]> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result as Product[]);
        };

        request.onerror = () => {
            reject('Error fetching products: ' + request.error);
        };
    });
};

export const addProduct = async (productData: Omit<Product, 'id' | 'status' | 'photoUrl'>): Promise<Product> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const newProduct: Product = {
            ...productData,
            id: `prod_${Date.now()}`,
            status: getStatus(productData.expirationDate),
        };
        
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(newProduct);

        request.onsuccess = () => {
            resolve(newProduct);
        };

        request.onerror = () => {
            reject('Error adding product: ' + request.error);
        };
    });
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const productWithStatus = {
            ...updatedProduct,
            status: getStatus(updatedProduct.expirationDate),
        };
        
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(productWithStatus);

        request.onsuccess = () => {
            resolve(productWithStatus);
        };

        request.onerror = () => {
            reject('Error updating product: ' + request.error);
        };
    });
};

export const deleteProduct = async (productId: string): Promise<void> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(productId);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject('Error deleting product: ' + request.error);
        };
    });
};