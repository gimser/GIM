/**
 * Products Manager
 */
(function () {
    Supeco.ProductsManager = {
        state: {
            filter: 'all',
            search: '',
            sort: 'expiry'
        },

        init() {
            this.render();
            this.bindEvents();
        },

        bindEvents() {
            const searchInput = document.getElementById('searchProduct');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.state.search = e.target.value;
                    this.render();
                });
            }

            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    this.state.filter = tab.dataset.filter;
                    this.render();
                });
            });

            const addForm = document.getElementById('addProductForm');
            if (addForm) {
                addForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleAddProduct(new FormData(e.target));
                });
            }

            const editForm = document.getElementById('editProductForm');
            if (editForm) {
                editForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleEditProduct(new FormData(e.target));
                });
            }

            const fab = document.querySelector('.fab');
            if (fab) {
                fab.addEventListener('click', () => {
                    const form = document.getElementById('addProductForm');
                    if (form) form.reset();
                    Supeco.Modals.open('addProductModal');
                });
            } else {
                console.warn('Products: FAB not found');
            }
        },

        getFilteredProducts() {
            let products = Supeco.Database.getAll();

            if (this.state.filter !== 'all') {
                products = products.filter(p => p.shelf === this.state.filter);
            }

            if (this.state.search) {
                const q = this.state.search.toLowerCase();
                products = products.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.barcode.includes(q)
                );
            }

            products.sort((a, b) => {
                if (this.state.sort === 'expiry') return new Date(a.expiry) - new Date(b.expiry);
                if (this.state.sort === 'name') return a.name.localeCompare(b.name);
                return 0;
            });

            return products;
        },

        render() {
            const container = document.getElementById('productsList');
            if (!container) return;

            const products = this.getFilteredProducts();

            if (products.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <h3>لا توجد منتجات</h3>
                        <p>أضف منتجات جديدة باستخدام الزر أدناه</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = products.map(product => this.createProductCard(product)).join('');

            container.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.closest('.product-card').dataset.id;
                    if (confirm('هل أنت متأكد من الحذف؟')) {
                        Supeco.Database.delete(id);
                        this.render();
                        Supeco.Alerts.show('تم حذف المنتج', 'success');
                    }
                });
            });

            container.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.closest('.product-card').dataset.id;
                    this.openEditModal(id);
                });
            });
        },

        createProductCard(product) {
            const daysUntilExpiry = Math.ceil((new Date(product.expiry) - new Date()) / (1000 * 60 * 60 * 24));
            let statusClass = 'status-ok';
            let statusText = 'صالح';

            if (daysUntilExpiry < 0) {
                statusClass = 'status-expired';
                statusText = 'منتهي';
            } else if (daysUntilExpiry <= 7) {
                statusClass = 'status-warning';
                statusText = 'قريب الانتهاء';
            }

            return `
                <div class="product-card ${statusClass}" data-id="${product.id}">
                    <div class="product-header">
                        <h3 class="product-title">${product.name}</h3>
                        <span class="product-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div class="product-details">
                        <div class="detail-item">
                            <span class="label">الباركود:</span>
                            <span class="value">${product.barcode}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">الرف:</span>
                            <span class="value">${product.shelf}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">تاريخ الانتهاء:</span>
                            <span class="value expiry-date">${product.expiry}</span>
                        </div>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-secondary btn-edit">تعديل</button>
                        <button class="btn btn-danger btn-delete">حذف</button>
                    </div>
                </div>
            `;
        },

        handleAddProduct(formData) {
            const product = {
                name: formData.get('name'),
                barcode: formData.get('barcode'),
                expiry: formData.get('expiry'),
                shelf: formData.get('shelf')
            };

            Supeco.Database.add(product);
            Supeco.Modals.close('addProductModal');
            this.render();
            Supeco.Alerts.show('تمت إضافة المنتج بنجاح', 'success');
        },

        openEditModal(id) {
            const product = Supeco.Database.getAll().find(p => p.id === id);
            if (!product) return;

            const form = document.getElementById('editProductForm');
            form.elements['id'].value = product.id;
            form.elements['name'].value = product.name;
            form.elements['barcode'].value = product.barcode;
            form.elements['expiry'].value = product.expiry;
            form.elements['shelf'].value = product.shelf;

            Supeco.Modals.open('editProductModal');
        },

        handleEditProduct(formData) {
            const id = formData.get('id');
            const updates = {
                name: formData.get('name'),
                barcode: formData.get('barcode'),
                expiry: formData.get('expiry'),
                shelf: formData.get('shelf')
            };

            Supeco.Database.update(id, updates);
            Supeco.Modals.close('editProductModal');
            this.render();
            Supeco.Alerts.show('تم تحديث المنتج', 'success');
        }
    };
})();
