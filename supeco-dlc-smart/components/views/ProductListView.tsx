import React, { useState, useMemo } from 'react';
import { Product, ProductStatus } from '../../types';
import { STATUS_COLORS, STATUS_TEXT_COLORS } from '../../constants';
import Card from '../Card';
import { CameraIcon, EditIcon, TrashIcon } from '../icons';

type SortKey = keyof Product;

interface ProductListViewProps {
    products: Product[];
    alertDays: number;
    onOpenCamera: (product: Product) => void;
    onAddProduct: () => void;
    onEditProduct: (product: Product) => void;
    onDeleteProduct: (productId: string) => void;
}

const ProductListView: React.FC<ProductListViewProps> = ({ products, alertDays, onOpenCamera, onAddProduct, onEditProduct, onDeleteProduct }) => {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>({ key: 'expirationDate', direction: 'asc' });
    
    const sortedProducts = useMemo(() => {
        let sortableItems = [...products];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (valA < valB) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [products, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: SortKey) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? '▲' : '▼';
    };
    
    const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-CA');

    const isExpiringSoon = (expirationDate: Date, thresholdDays: number): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const expiration = new Date(expirationDate);
        expiration.setHours(0, 0, 0, 0);
        
        if (expiration < today) return false;

        const diffTime = expiration.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays <= thresholdDays;
    }

    const tableHeaders: { key: SortKey | 'actions', label: string }[] = [
        { key: 'name', label: 'Name' },
        { key: 'barcode', label: 'Barcode' },
        { key: 'category', label: 'Category' },
        { key: 'expirationDate', label: 'Expiration Date' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'location', label: 'Location' },
        { key: 'status', label: 'Status' },
        { key: 'scannedBy', label: 'Scanned By' },
        { key: 'actions', label: 'Actions' },
    ];

    return (
        <Card title={`Product List (${products.length} items)`} icon={
             <button
                onClick={onAddProduct}
                className="bg-supeco-yellow text-supeco-gray font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 text-sm transition-colors"
            >
                Add New Product
            </button>
        }>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-supeco-light-gray">
                        <tr>
                            {tableHeaders.map(({key, label}) => (
                                <th key={key} scope="col" className="px-6 py-3 cursor-pointer" onClick={() => key !== 'actions' && requestSort(key as SortKey)}>
                                    {label} {key !== 'actions' && getSortIndicator(key as SortKey)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((product) => {
                             const isAlert = isExpiringSoon(product.expirationDate, alertDays) && product.status !== ProductStatus.Expired;
                             return (
                                <tr 
                                    key={product.id} 
                                    className={`border-b border-supeco-light-gray transition-colors duration-200 ${
                                        isAlert ? 'bg-orange-900/50 hover:bg-orange-900/80' : 'bg-supeco-dark hover:bg-supeco-light-gray'
                                    }`}
                                >
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        <div className="flex items-center space-x-3">
                                            <img 
                                                src={product.photoUrl || `https://via.placeholder.com/40x40/333333/FFD600?text=${product.name.charAt(0)}`} 
                                                alt={product.name} 
                                                className="w-10 h-10 rounded-md object-cover bg-supeco-light-gray"
                                            />
                                            <span>{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-400">{product.barcode}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className={`px-6 py-4 font-bold ${STATUS_TEXT_COLORS[product.status]}`}>{formatDate(product.expirationDate)}</td>
                                    <td className="px-6 py-4">{product.quantity}</td>
                                    <td className="px-6 py-4">{product.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${STATUS_COLORS[product.status]}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{product.scannedBy}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <button onClick={() => onOpenCamera(product)} className="text-gray-400 hover:text-supeco-yellow" aria-label="Take Photo">
                                                <CameraIcon />
                                            </button>
                                            <button onClick={() => onEditProduct(product)} className="text-gray-400 hover:text-supeco-yellow" aria-label="Edit Product">
                                                <EditIcon />
                                            </button>
                                            <button onClick={() => onDeleteProduct(product.id)} className="text-gray-400 hover:text-status-red" aria-label="Delete Product">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                 {products.length === 0 && <div className="text-center py-8 text-gray-400">No products found. Click "Add New Product" to get started.</div>}
            </div>
        </Card>
    );
};

export default ProductListView;