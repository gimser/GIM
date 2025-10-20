import React, { useState, useEffect, useCallback } from 'react';
import { Product, ProductFormData } from '../types';

interface ProductFormModalProps {
    productToEdit: Product | null;
    initialBarcode?: string | null;
    onClose: () => void;
    onSave: (data: ProductFormData) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ productToEdit, initialBarcode, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        barcode: '',
        category: '',
        expirationDate: '',
        quantity: '0',
        location: '',
        scannedBy: 'Admin Manager',
    });

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                barcode: productToEdit.barcode || '',
                category: productToEdit.category,
                expirationDate: productToEdit.expirationDate.toISOString().split('T')[0],
                quantity: String(productToEdit.quantity),
                location: productToEdit.location,
                scannedBy: productToEdit.scannedBy,
            });
        } else {
             setFormData(prev => ({
                ...prev,
                name: '',
                barcode: initialBarcode || '',
                category: '',
                expirationDate: '',
                quantity: '0',
                location: '',
                scannedBy: 'Admin Manager'
            }));
        }
    }, [productToEdit, initialBarcode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData: ProductFormData = {
            ...formData,
            quantity: parseInt(formData.quantity, 10) || 0,
            expirationDate: new Date(formData.expirationDate),
        };
        onSave(submissionData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-supeco-dark rounded-lg shadow-xl p-6 w-full max-w-lg border border-supeco-light-gray">
                <h2 className="text-xl font-bold mb-6 text-white">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">Product Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-supeco-light-gray text-white border border-supeco-light-gray rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-supeco-yellow" />
                        </div>
                         <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="barcode">Barcode (EAN/UPC)</label>
                            <input type="text" id="barcode" name="barcode" value={formData.barcode} onChange={handleChange} className="w-full bg-supeco-light-gray text-white border border-supeco-light-gray rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-supeco-yellow" />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="category">Category</label>
                            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full bg-supeco-light-gray text-white border border-supeco-light-gray rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-supeco-yellow" />
                        </div>
                         <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="expirationDate">Expiration Date</label>
                            <input type="date" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required className="w-full bg-supeco-light-gray text-white border border-supeco-light-gray rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-supeco-yellow" />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="quantity">Quantity</label>
                            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" className="w-full bg-supeco-light-gray text-white border border-supeco-light-gray rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-supeco-yellow" />
                        </div>
                         <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="location">Location</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="w-full bg-supeco-light-gray text-white border border-supeco-light-gray rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-supeco-yellow" />
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="scannedBy">Scanned By</label>
                            <input type="text" id="scannedBy" name="scannedBy" value={formData.scannedBy} onChange={handleChange} required className="w-full bg-supeco-light-gray text-white border border-supeco-light-gray rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-supeco-yellow" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="bg-supeco-light-gray text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-supeco-yellow text-supeco-gray font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;