/**
 * Router Engine
 */
(function () {
    Supeco.Router = {
        init() {
            const path = window.location.pathname;
            const page = path.split('/').pop() || 'index.html';

            console.log('Current Page:', page);

            switch (page) {
                case 'index.html':
                case '':
                    if (Supeco.ProductsManager) Supeco.ProductsManager.init();
                    break;
                case 'dashboard.html':
                    if (Supeco.Dashboard) Supeco.Dashboard.init();
                    break;
                case 'settings.html':
                    if (Supeco.Settings) Supeco.Settings.init();
                    break;
                case 'scan.html':
                    if (Supeco.Scanner) Supeco.Scanner.init();
                    break;
            }
        },

        navigate(url) {
            window.location.href = url;
        }
    };
})();
