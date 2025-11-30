# Quick Start Guide - Supeco DLC Manager

## التشغيل السريع

### 1. التشغيل المحلي

ببساطة افتح `index.html` في المتصفح!

**Chrome/Edge:**
- انقر نقراً مزدوجاً على `index.html`
- أو اسحب الملف إلى نافذة المتصفح

**Firefox:**
- File > Open File > اختر `index.html`

**ملاحظة:** للتطوير المحلي، قد تحتاج إلى خادم محلي:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# ثم افتح: http://localhost:8000
```

### 2. الأيقونات المطلوبة

قبل النشر، يجب إنشاء أيقونات PNG:

**الحجم:**
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

**الموقع:**
```
/assets/icons/icon-72.png
/assets/icons/icon-96.png
... إلخ
```

**أدوات إنشاء الأيقونات:**
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator
- أي محرر صور + قالب من `/assets/icons/icon.svg`

### 3. النشر على Cloudflare Pages

**الطريقة 1: GitHub**
1. ارفع الكود إلى GitHub
2. في Cloudflare Dashboard > Pages
3. "Create a project" > "Connect to Git"
4. اختر المستودع
5. Build settings:
   - Build command: (فارغ)
   - Build output: `/`
6. Deploy!

**الطريقة 2: Direct Upload**
1. Cloudflare Pages > "Create a project" > "Upload assets"
2. ارفع جميع الملفات
3. Deploy!

### 4. الاختبار

1. ✅ افتح التطبيق
2. ✅ تحقق من تحميل 10 منتجات تجريبية
3. ✅ أضف منتج جديد
4. ✅ افحص لوحة التحكم
5. ✅ جرب الماسح الضوئي
6. ✅ تصدير/استيراد قاعدة البيانات

### 5. الميزات الرئيسية

- **المنتجات:** إدارة كاملة للمنتجات مع بحث وفلترة
- **لوحة التحكم:** إحصائيات ورسوم بيانية
- **الماسح:** مسح الباركود بكاميرا الجوال
- **الإعدادات:** تصدير/استيراد، تنظيف، تحسين

### 6. دعم المتصفح

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

### 7. ملاحظات مهمة

- **LocalStorage:** البيانات محفوظة محلياً (حد أقصى ~5-10MB)
- **PWA:** يتطلب HTTPS للتثبيت
- **BarcodeDetector:** متوفر في Chrome/Edge (Firefox يحتاج إدخال يدوي)
- **Offline:** يعمل 100% بدون إنترنت بعد أول تحميل

### 8. المشاكل الشائعة

**لا تظهر الأيقونات:**
- تأكد من وجود ملفات PNG في `/assets/icons/`
- تحقق من مسارات الأيقونات في `manifest.json`

**Service Worker لا يعمل:**
- تأكد من HTTPS
- امسح Cache Storage من DevTools

**البحث لا يعمل:**
- تحقق من console للأخطاء
- تأكد من تحميل `database.js`

---

**جاهز للاستخدام! 🚀**

