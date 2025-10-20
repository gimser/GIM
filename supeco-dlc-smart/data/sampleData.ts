
import { Product, ProductStatus } from '../types';

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

const getStatus = (expDate: Date): ProductStatus => {
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

export const generateSampleData = (count: number): Product[] => {
  const data: Product[] = [];
  for (let i = 0; i < count; i++) {
    const baseProduct = getRandom(productNames);
    const dateOffset = Math.floor(Math.random() * 60) - 15; // -15 to +44 days from now
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + dateOffset);

    const product: Product = {
      id: `prod_${i + 1}`,
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
