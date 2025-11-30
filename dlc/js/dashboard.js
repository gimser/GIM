/**
 * Dashboard Engine
 */
(function () {
    Supeco.Dashboard = {
        init() {
            this.renderStats();
            this.renderCharts();
            this.renderActivityLog();
        },

        renderStats() {
            const stats = Supeco.Database.getStats();

            const elTotal = document.getElementById('totalProducts');
            if (elTotal) elTotal.textContent = stats.total;

            const elExpired = document.getElementById('expiredProducts');
            if (elExpired) elExpired.textContent = stats.expired;

            const elNear = document.getElementById('nearExpiryProducts');
            if (elNear) elNear.textContent = stats.nearExpiry;

            const usageBytes = new Blob([localStorage.getItem('supeco_ultra_database') || '']).size;
            const usageKB = (usageBytes / 1024).toFixed(2);

            const elUsage = document.getElementById('storageUsage');
            if (elUsage) elUsage.textContent = `${usageKB} KB`;

            const elFill = document.querySelector('.storage-fill');
            if (elFill) elFill.style.width = `${Math.min((usageBytes / (5 * 1024 * 1024)) * 100, 100)}%`;
        },

        renderCharts() {
            const stats = Supeco.Database.getStats();

            const barChart = document.getElementById('shelfChart');
            if (barChart) {
                const maxVal = Math.max(...Object.values(stats.shelfDist), 1);

                barChart.innerHTML = Object.entries(stats.shelfDist).map(([shelf, count]) => {
                    const height = (count / maxVal) * 100;
                    return `
                        <div class="bar-group">
                            <div class="bar" style="height: ${height}%" data-value="${count}"></div>
                            <div class="bar-label">${shelf}</div>
                        </div>
                    `;
                }).join('');
            }

            const total = stats.total || 1;
            const expiredPct = (stats.expired / total) * 100;
            const nearPct = (stats.nearExpiry / total) * 100;
            const goodPct = 100 - expiredPct - nearPct;

            const pieChart = document.querySelector('.pie-chart');
            if (pieChart) {
                pieChart.style.background = `conic-gradient(
                    var(--color-success) 0% ${goodPct}%,
                    var(--color-warning) ${goodPct}% ${goodPct + nearPct}%,
                    var(--color-error) ${goodPct + nearPct}% 100%
                )`;
            }
        },

        renderActivityLog() {
            const products = Supeco.Database.getAll();
            const recent = [...products].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 5);

            const container = document.getElementById('activityLog');
            if (container) {
                if (recent.length === 0) {
                    container.innerHTML = '<div class="p-4 text-center text-gray-500">لا يوجد نشاط حديث</div>';
                    return;
                }

                container.innerHTML = recent.map(p => {
                    const date = new Date(p.updatedAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
                    return `
                        <div class="log-item">
                            <span class="log-time">${date}</span>
                            <div class="log-content">
                                <strong>${p.name}</strong>
                                <span style="color: #666; font-size: 0.9rem;">تم تحديثه</span>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    };
})();
