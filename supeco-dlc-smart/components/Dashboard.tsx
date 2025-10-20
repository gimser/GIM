import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../data/productService';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardView from './views/DashboardView';
import ProductListView from './views/ProductListView';
import AISuggestionsView from './views/AISuggestionsView';
import CameraModal from './CameraModal';
import ProductFormModal from './ProductFormModal';
import { Product, ProductFormData } from '../types';

export type ViewType = 'dashboard' | 'products' | 'ai_suggestions' | 'reports' | 'employees';

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState<ViewType>('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [alertDays, setAlertDays] = useState<number>(7);
    
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [productForPhoto, setProductForPhoto] = useState<Product | null>(null);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newProductBarcode, setNewProductBarcode] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const dbProducts = await getProducts();
                setProducts(dbProducts);
            } catch (error) {
                console.error("Failed to load products from the database:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, []);
    
    const handleOpenAddModalWithBarcode = useCallback((barcode: string) => {
        setEditingProduct(null);
        setNewProductBarcode(barcode);
        setIsProductFormOpen(true);
    }, []);

    const handleScan = useCallback((barcode: string) => {
        setSearchTerm(barcode);
        const productExists = products.some(p => p.barcode === barcode);
        if (!productExists) {
            if (window.confirm(`Product with barcode ${barcode} not found. Would you like to add it?`)) {
                handleOpenAddModalWithBarcode(barcode);
            }
        }
    }, [products, handleOpenAddModalWithBarcode]);

    useEffect(() => {
        let buffer: { key: string, time: number }[] = [];
        const timeout = 50; // Max time between keystrokes for a scan

        const handleKeyDown = (e: KeyboardEvent) => {
            const now = Date.now();
            
            if (buffer.length > 0 && now - buffer[buffer.length - 1].time > timeout) {
                buffer = [];
            }
            
            buffer.push({ key: e.key, time: now });
            
            if (e.key === 'Enter') {
                const scanned = buffer
                    .slice(0, -1)
                    .map(k => k.key)
                    .join('');

                if (scanned.length > 3) {
                    handleScan(scanned);
                }
                buffer = [];
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleScan]);

    const handleViewChange = useCallback((view: ViewType) => {
        setActiveView(view);
        setIsSidebarOpen(false); // Close sidebar on navigation on mobile
    }, []);

    const handleOpenCamera = useCallback((product: Product) => {
        setProductForPhoto(product);
        setIsCameraOpen(true);
    }, []);

    const handleCloseCamera = useCallback(() => {
        setIsCameraOpen(false);
        setProductForPhoto(null);
    }, []);

    const handleCapturePhoto = useCallback(async (photoDataUrl: string) => {
        if (productForPhoto) {
            try {
                const productToUpdate = { ...productForPhoto, photoUrl: photoDataUrl };
                const updatedProductResult = await updateProduct(productToUpdate);
                setProducts(prev => 
                    prev.map(p => p.id === updatedProductResult.id ? updatedProductResult : p)
                );
            } catch (error) {
                 console.error("Failed to update product photo:", error);
            }
        }
        handleCloseCamera();
    }, [productForPhoto, handleCloseCamera]);

    const handleOpenAddModal = useCallback(() => {
        setEditingProduct(null);
        setNewProductBarcode(null);
        setIsProductFormOpen(true);
    }, []);

    const handleOpenEditModal = useCallback((product: Product) => {
        setEditingProduct(product);
        setNewProductBarcode(null);
        setIsProductFormOpen(true);
    }, []);
    
    const handleCloseFormModal = useCallback(() => {
        setEditingProduct(null);
        setNewProductBarcode(null);
        setIsProductFormOpen(false);
    }, []);

    const handleSaveProduct = useCallback(async (productData: ProductFormData) => {
        try {
            if (editingProduct) {
                const productToUpdate = { ...editingProduct, ...productData };
                const result = await updateProduct(productToUpdate);
                setProducts(prev => prev.map(p => (p.id === result.id ? result : p)));
            } else {
                const newProduct = await addProduct(productData);
                setProducts(prev => [...prev, newProduct]);
            }
        } catch(error) {
            console.error("Failed to save product:", error);
        }
        handleCloseFormModal();
    }, [editingProduct, handleCloseFormModal]);

    const handleDeleteProduct = useCallback(async (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(productId);
                setProducts(prev => prev.filter(p => p.id !== productId));
            } catch(error) {
                console.error("Failed to delete product:", error);
            }
        }
    }, []);

    const expiringProducts = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return products.filter(product => {
            const expiration = new Date(product.expirationDate);
            expiration.setHours(0, 0, 0, 0);
            
            if (expiration < today) return false;

            const diffTime = expiration.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return diffDays <= alertDays;
        }).sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime());
    }, [products, alertDays]);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const lowercasedTerm = searchTerm.toLowerCase();
        return products.filter(p => 
            p.name.toLowerCase().includes(lowercasedTerm) ||
            p.barcode?.includes(searchTerm) ||
            p.category.toLowerCase().includes(lowercasedTerm) ||
            p.location.toLowerCase().includes(lowercasedTerm)
        );
    }, [products, searchTerm]);

    const renderView = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full w-full">
                    <div className="text-center">
                        <svg className="animate-spin h-10 w-10 text-supeco-yellow mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-lg text-gray-300">Loading Product Data...</p>
                    </div>
                </div>
            );
        }
        
        switch (activeView) {
            case 'dashboard':
                return <DashboardView products={products} expiringProducts={expiringProducts} alertDays={alertDays} />;
            case 'products':
                return (
                    <ProductListView 
                        products={filteredProducts} 
                        alertDays={alertDays} 
                        onOpenCamera={handleOpenCamera}
                        onAddProduct={handleOpenAddModal}
                        onEditProduct={handleOpenEditModal}
                        onDeleteProduct={handleDeleteProduct}
                    />
                );
            case 'ai_suggestions':
                return <AISuggestionsView products={products} />;
            default:
                return <div className="p-8 text-center"><h2 className="text-2xl">Coming Soon</h2><p className="text-gray-400">This feature is under development.</p></div>;
        }
    };

    return (
        <div className="flex w-full h-screen">
            <Sidebar 
              activeView={activeView} 
              setActiveView={handleViewChange} 
              isOpen={isSidebarOpen} 
              setIsOpen={setIsSidebarOpen} 
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    alertDays={alertDays}
                    setAlertDays={setAlertDays}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <div className="flex-1 overflow-y-auto p-6 bg-supeco-gray">
                    {renderView()}
                </div>
            </main>
            {isCameraOpen && productForPhoto && (
                <CameraModal
                    productName={productForPhoto.name}
                    onClose={handleCloseCamera}
                    onCapture={handleCapturePhoto}
                />
            )}
            {isProductFormOpen && (
                <ProductFormModal
                    productToEdit={editingProduct}
                    initialBarcode={newProductBarcode}
                    onClose={handleCloseFormModal}
                    onSave={handleSaveProduct}
                />
            )}
        </div>
    );
};

export default Dashboard;