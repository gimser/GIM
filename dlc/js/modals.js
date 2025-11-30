/**
 * Modal Engine
 */
(function () {
    Supeco.Modals = {
        init() {
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this.close(overlay.id);
                    }
                });
            });

            document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const modalId = btn.closest('.modal-overlay').id;
                    this.close(modalId);
                });
            });
        },

        open(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        },

        close(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        }
    };
})();
