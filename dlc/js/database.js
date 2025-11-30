/**
 * Database Engine
 */
(function () {
    Supeco.Database = {
        products: [],

        init() {
            const data = Supeco.Storage.load();
            if (data && Array.isArray(data)) {
                this.products = data;
            } else {
                this.seed();
            }
        },

        seed() {
            const demoProducts = [
                { id: '1', name: 'بسكويت أوريو', barcode: '123456789', expiry: '2025-12-01', shelf: 'بسكويتري', updatedAt: Date.now() },
                { id: '2', name: 'حليب كامل الدسم', barcode: '987654321', expiry: '2023-11-25', shelf: 'مواد غذائية', updatedAt: Date.now() },
                { id: '3', name: 'منظف أرضيات', barcode: '456123789', expiry: '2026-01-15', shelf: 'منظفات', updatedAt: Date.now() },
                { id: '4', name: 'دقيق فاخر', barcode: '789123456', expiry: '2024-05-20', shelf: 'لا فارين', updatedAt: Date.now() },
                { id: '5', name: 'عصير برتقال', barcode: '321654987', expiry: '2023-11-28', shelf: 'ليكيد', updatedAt: Date.now() },
                { id: '6', name: 'شامبو شعر', barcode: '147258369', expiry: '2025-08-10', shelf: 'منظفات', updatedAt: Date.now() },
                { id: '7', name: 'شوكولاتة داكنة', barcode: '963852741', expiry: '2024-02-14', shelf: 'بسكويتري', updatedAt: Date.now() },
                { id: '8', name: 'زيت زيتون', barcode: '159357486', expiry: '2025-11-30', shelf: 'مواد غذائية', updatedAt: Date.now() },
                { id: '9', name: 'صابون يد', barcode: '753951468', expiry: '2026-03-22', shelf: 'منظفات', updatedAt: Date.now() },
                { id: '10', name: 'معكرونة', barcode: '852456963', expiry: '2025-06-18', shelf: 'مواد غذائية', updatedAt: Date.now() }
            ];
            this.products = demoProducts;
            this.save();
        },

        save() {
            Supeco.Storage.save(this.products);
        },

        getAll() {
            return this.products;
        },

        add(product) {
            product.id = Date.now().toString();
            product.updatedAt = Date.now();
            product.createdAt = Date.now();
            this.products.push(product);
            this.save();
            return product;
        },

        update(id, updates) {
            const index = this.products.findIndex(p => p.id === id);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...updates, updatedAt: Date.now() };
                this.save();
                return true;
            }
            return false;
        },

        delete(id) {
            this.products = this.products.filter(p => p.id !== id);
            this.save();
        },

        search(query) {
            const q = query.toLowerCase();
            return this.products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.barcode.includes(q) ||
                p.shelf.toLowerCase().includes(q)
            );
        },

        getStats() {
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            let expired = 0;
            let nearExpiry = 0;
            const shelfDist = {};

            this.products.forEach(p => {
                if (p.expiry < today) expired++;
                else if (p.expiry <= nextWeek) nearExpiry++;

                shelfDist[p.shelf] = (shelfDist[p.shelf] || 0) + 1;
            });

            return {
                total: this.products.length,
                expired,
                nearExpiry,
                shelfDist
            };
        }
    };
})();
