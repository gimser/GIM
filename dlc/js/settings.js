/**
 * Settings Engine
 */
(function () {
    Supeco.Settings = {
        init() {
            this.bindEvents();
            this.loadCurrentSettings();
        },

        bindEvents() {
            document.getElementById('btnExport')?.addEventListener('click', () => {
                const data = Supeco.Database.getAll();
                const json = JSON.stringify(data, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = `supeco_backup_${new Date().toISOString().split('T')[0]}.json`;
                a.click();

                Supeco.Alerts.show('تم تصدير قاعدة البيانات بنجاح', 'success');
            });

            document.getElementById('btnImport')?.addEventListener('click', () => {
                document.getElementById('fileImport').click();
            });

            document.getElementById('fileImport')?.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        if (Array.isArray(data)) {
                            if (confirm('سيتم استبدال قاعدة البيانات الحالية. هل أنت متأكد؟')) {
                                Supeco.Storage.save(data);
                                Supeco.Database.init();
                                Supeco.Alerts.show('تم استيراد قاعدة البيانات بنجاح', 'success');
                                setTimeout(() => window.location.reload(), 1500);
                            }
                        } else {
                            throw new Error('Invalid format');
                        }
                    } catch (err) {
                        Supeco.Alerts.show('خطأ في ملف النسخة الاحتياطية', 'error');
                        console.error(err);
                    }
                };
                reader.readAsText(file);
            });

            document.getElementById('btnClear')?.addEventListener('click', () => {
                if (confirm('تحذير: سيتم حذف جميع المنتجات! هل أنت متأكد؟')) {
                    Supeco.Storage.clear();
                    Supeco.Database.init();
                    Supeco.Alerts.show('تم مسح قاعدة البيانات', 'warning');
                    setTimeout(() => window.location.reload(), 1500);
                }
            });

            document.querySelectorAll('.switch input').forEach(toggle => {
                toggle.addEventListener('change', () => {
                    this.saveSettings();
                });
            });
        },

        loadCurrentSettings() {
            const settings = Supeco.Storage.loadSettings();
            if (document.getElementById('autoBackup'))
                document.getElementById('autoBackup').checked = settings.autoBackup;
            if (document.getElementById('advancedMode'))
                document.getElementById('advancedMode').checked = settings.advancedMode;
        },

        saveSettings() {
            const settings = {
                autoBackup: document.getElementById('autoBackup')?.checked || false,
                advancedMode: document.getElementById('advancedMode')?.checked || false
            };
            Supeco.Storage.saveSettings(settings);
            Supeco.Alerts.show('تم حفظ الإعدادات', 'success');
        }
    };
})();
