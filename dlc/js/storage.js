/**
 * Storage Engine
 */
(function () {
    const DB_KEY = 'supeco_ultra_database';
    const SETTINGS_KEY = 'supeco_settings';

    Supeco.Storage = {
        save(data) {
            try {
                const cleanData = JSON.stringify(data);
                localStorage.setItem(DB_KEY, cleanData);
                return true;
            } catch (e) {
                console.error('Storage Save Error:', e);
                if (e.name === 'QuotaExceededError') {
                    alert('Storage Full! Please export and clear data.');
                }
                return false;
            }
        },

        load() {
            try {
                const data = localStorage.getItem(DB_KEY);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error('Storage Load Error:', e);
                return null;
            }
        },

        clear() {
            localStorage.removeItem(DB_KEY);
        },

        getUsage() {
            let total = 0;
            for (let x in localStorage) {
                if (localStorage.hasOwnProperty(x)) {
                    total += ((localStorage[x].length + x.length) * 2);
                }
            }
            return total;
        },

        saveSettings(settings) {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        },

        loadSettings() {
            const s = localStorage.getItem(SETTINGS_KEY);
            return s ? JSON.parse(s) : {
                autoBackup: false,
                advancedMode: false,
                theme: 'light'
            };
        }
    };
})();
