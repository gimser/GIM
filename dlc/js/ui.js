/**
 * UI Engine
 */
(function () {
    Supeco.UI = {
        init() {
            this.initSidebar();
            this.initActiveLinks();
        },

        initSidebar() {
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            const closeBtn = document.querySelector('.sidebar-close');

            if (!menuToggle || !sidebar || !overlay) {
                console.warn('UI: Sidebar elements not found');
                return;
            }

            const openSidebar = () => {
                sidebar.classList.add('open');
                overlay.classList.add('active');
                document.body.classList.add('sidebar-open');
            };

            const closeSidebar = () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            };

            menuToggle.addEventListener('click', openSidebar);
            if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
            overlay.addEventListener('click', closeSidebar);

            // Close on nav item click (mobile)
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        closeSidebar();
                    }
                });
            });
        },

        initActiveLinks() {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-item').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        }
    };
})();
