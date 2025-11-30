/**
 * Alert Engine
 */
(function () {
    Supeco.Alerts = {
        init() {
            this.createContainer();
            this.startExpiryCheck();
        },

        createContainer() {
            if (!document.querySelector('.toast-container')) {
                const container = document.createElement('div');
                container.className = 'toast-container';
                document.body.appendChild(container);
            }
        },

        show(message, type = 'info') {
            const container = document.querySelector('.toast-container');
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;

            let icon = 'ℹ️';
            if (type === 'success') icon = '✅';
            if (type === 'error') icon = '❌';
            if (type === 'warning') icon = '⚠️';

            toast.innerHTML = `
                <span class="toast-icon">${icon}</span>
                <span class="toast-message">${message}</span>
            `;

            container.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-100%)';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },

        startExpiryCheck() {
            setInterval(() => {
                this.checkExpiry();
            }, 30000);
            setTimeout(() => this.checkExpiry(), 1000);
        },

        checkExpiry() {
            if (!Supeco.Database) return;
            const stats = Supeco.Database.getStats();
            if (stats.expired > 0) {
                this.updateBadge(stats.expired + stats.nearExpiry);
            }
        },

        updateBadge(count) {
            const badge = document.querySelector('.notifications-badge');
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'flex' : 'none';
            }
        }
    };
})();
