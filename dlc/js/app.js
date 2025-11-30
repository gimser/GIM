/**
 * Main Application Entry Point
 */
(function () {
    const initApp = async () => {
        console.log('🚀 Supeco DLC Manager Initializing...');

        try {
            // Modules are already loaded via script tags
            if (Supeco.Database) Supeco.Database.init();
            if (Supeco.UI) Supeco.UI.init();
            if (Supeco.Modals) Supeco.Modals.init();
            if (Supeco.Alerts) Supeco.Alerts.init();
            if (Supeco.Router) Supeco.Router.init();

            console.log('✅ App Initialized Successfully');
        } catch (error) {
            console.error('❌ App Initialization Failed:', error);
        }

        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('./sw.js');
                console.log('SW Registered:', registration.scope);
            } catch (error) {
                console.error('SW Registration failed:', error);
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
