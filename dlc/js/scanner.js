/**
 * Scanner Engine
 */
(function () {
    Supeco.Scanner = {
        stream: null,
        video: null,
        detector: null,
        scanning: false,

        async init() {
            this.video = document.getElementById('cameraFeed');
            if (!this.video) return;

            this.bindEvents();

            if ('BarcodeDetector' in window) {
                this.detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'qr_code'] });
            } else {
                Supeco.Alerts.show('المتصفح لا يدعم مسح الباركود تلقائياً', 'warning');
            }

            await this.startCamera();
        },

        bindEvents() {
            document.getElementById('btnSwitchCamera')?.addEventListener('click', () => {
                Supeco.Alerts.show('تبديل الكاميرا غير مدعوم حالياً', 'info');
            });

            document.getElementById('btnFlash')?.addEventListener('click', async () => {
                if (this.stream) {
                    const track = this.stream.getVideoTracks()[0];
                    const capabilities = track.getCapabilities();
                    if (capabilities.torch) {
                        const settings = track.getSettings();
                        await track.applyConstraints({
                            advanced: [{ torch: !settings.torch }]
                        });
                    } else {
                        Supeco.Alerts.show('الفلاش غير متوفر', 'warning');
                    }
                }
            });

            document.getElementById('manualInputForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const barcode = e.target.elements['barcode'].value;
                this.handleBarcode(barcode);
            });
        },

        async startCamera() {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                this.video.srcObject = this.stream;
                await this.video.play();
                this.scanning = true;
                this.scanLoop();
            } catch (err) {
                console.error('Camera Error:', err);
                Supeco.Alerts.show('تعذر الوصول للكاميرا', 'error');
                const overlay = document.querySelector('.camera-overlay');
                if (overlay) overlay.innerHTML = '<div class="p-4 text-white text-center">الكاميرا غير متوفرة. استخدم الإدخال اليدوي.</div>';
            }
        },

        async scanLoop() {
            if (!this.scanning || !this.detector) return;

            try {
                const barcodes = await this.detector.detect(this.video);
                if (barcodes.length > 0) {
                    const barcode = barcodes[0].rawValue;
                    this.handleBarcode(barcode);
                    return;
                }
            } catch (e) {
                // Ignore
            }

            requestAnimationFrame(() => this.scanLoop());
        },

        handleBarcode(code) {
            this.playBeep();

            const products = Supeco.Database.search(code);

            if (products.length > 0) {
                const p = products[0];
                Supeco.Alerts.show(`تم العثور على: ${p.name}`, 'success');
            } else {
                if (confirm(`المنتج ${code} غير موجود. هل تريد إضافته؟`)) {
                    Supeco.Alerts.show('يرجى الذهاب لصفحة المنتجات للإضافة', 'info');
                }
            }

            setTimeout(() => {
                this.scanning = true;
                this.scanLoop();
            }, 2000);
        },

        playBeep() {
            const audio = new AudioContext();
            const osc = audio.createOscillator();
            const gain = audio.createGain();
            osc.connect(gain);
            gain.connect(audio.destination);
            osc.frequency.value = 1000;
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.00001, audio.currentTime + 0.1);
            setTimeout(() => osc.stop(), 100);
        }
    };
})();
